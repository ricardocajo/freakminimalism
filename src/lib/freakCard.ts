/**
 * Reads the identity cookie published by the FREAK CARD app
 * (cliente.freak-minimalism.com) on the shared `.freak-minimalism.com` domain.
 *
 * The cookie carries identity only — never auth tokens — so it is safe to read
 * from the storefront. It is a *hint* used to attribute loyalty points: the
 * worst a forged value can do is award points to someone else's account, which
 * was already true of the free-text email field it replaces.
 */

export interface FreakCardMember {
  id: string;
  email: string;
}

const COOKIE_NAME = "fc_member";
const COOKIE_DOMAIN = ".freak-minimalism.com";
const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export function readMemberCookie(): FreakCardMember | null {
  if (typeof document === "undefined") return null;

  const entry = document.cookie
    .split("; ")
    .find((c) => c.startsWith(`${COOKIE_NAME}=`));
  if (!entry) return null;

  try {
    const parsed = JSON.parse(atob(entry.slice(COOKIE_NAME.length + 1)));
    if (typeof parsed?.id !== "string" || !UUID_RE.test(parsed.id)) return null;
    if (typeof parsed?.email !== "string" || !parsed.email.includes("@")) return null;
    return { id: parsed.id, email: parsed.email.trim().toLowerCase() };
  } catch {
    return null;
  }
}

/** "Not me" — drop the shared cookie so the shopper can check out as someone else. */
export function clearMemberCookie(): void {
  if (typeof document === "undefined") return;
  // Written by the card app with an explicit domain, so it must be expired the same way.
  document.cookie = `${COOKIE_NAME}=; domain=${COOKIE_DOMAIN}; path=/; max-age=0; secure; samesite=lax`;
  // Fall back to a host-only expiry too, in case of a localhost/dev cookie.
  document.cookie = `${COOKIE_NAME}=; path=/; max-age=0`;
}
