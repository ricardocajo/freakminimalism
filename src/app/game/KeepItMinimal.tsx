"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  CLUTTER_FORGIVE_EVERY,
  COMBO_MAX,
  COMBO_STEP,
  FIELD_H,
  FIELD_W,
  HIGH_SCORE_KEY,
  MAX_CLUTTER,
  MUTED_KEY,
  NOISE_R,
  POINTS_PER_CLEAR,
  PRODUCT_R,
  SPRITES,
  type Sprite,
  fallSpeed,
  productChance,
  spawnInterval,
} from "./data";

type Phase = "loading" | "menu" | "playing" | "over";
type Cause = "product" | "clutter";

interface Entity {
  id: number;
  kind: "noise" | "product";
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  rot: number;
  vrot: number;
  glyph: number;
  sprite?: Sprite;
  /** Seconds remaining of the removal animation; undefined while alive. */
  dying?: number;
}

const GLYPH_COUNT = 6;

const comboFor = (streak: number) =>
  Math.min(COMBO_MAX, 1 + Math.floor(streak / COMBO_STEP));

/** Draws one piece of noise, centred on the origin and already rotated. */
const drawGlyph = (ctx: CanvasRenderingContext2D, glyph: number, r: number) => {
  ctx.beginPath();
  switch (glyph) {
    case 0:
      ctx.rect(-r * 0.62, -r * 0.62, r * 1.24, r * 1.24);
      break;
    case 1:
      ctx.moveTo(0, -r * 0.72);
      ctx.lineTo(r * 0.68, r * 0.5);
      ctx.lineTo(-r * 0.68, r * 0.5);
      ctx.closePath();
      break;
    case 2:
      ctx.arc(0, 0, r * 0.66, 0, Math.PI * 2);
      break;
    case 3:
      ctx.moveTo(-r * 0.6, -r * 0.6);
      ctx.lineTo(r * 0.6, r * 0.6);
      ctx.moveTo(r * 0.6, -r * 0.6);
      ctx.lineTo(-r * 0.6, r * 0.6);
      break;
    case 4:
      ctx.moveTo(-r * 0.7, -r * 0.45);
      ctx.lineTo(-r * 0.2, r * 0.2);
      ctx.lineTo(r * 0.2, -r * 0.35);
      ctx.lineTo(r * 0.7, r * 0.45);
      break;
    default:
      ctx.moveTo(-r * 0.7, 0);
      ctx.lineTo(r * 0.7, 0);
      ctx.moveTo(0, -r * 0.7);
      ctx.lineTo(0, r * 0.7);
      ctx.moveTo(-r * 0.5, -r * 0.5);
      ctx.lineTo(r * 0.5, r * 0.5);
      break;
  }
  ctx.stroke();
};

export default function KeepItMinimal() {
  const { t, i18n } = useTranslation();
  const lang = i18n.language?.startsWith("en") ? "en" : "pt";

  const [phase, setPhase] = useState<Phase>("loading");
  const [best, setBest] = useState(0);
  const [finalScore, setFinalScore] = useState(0);
  const [cause, setCause] = useState<Cause>("clutter");
  const [killed, setKilled] = useState<Sprite | null>(null);
  const [muted, setMuted] = useState(false);
  const [isNewBest, setIsNewBest] = useState(false);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const scoreElRef = useRef<HTMLSpanElement>(null);
  const comboElRef = useRef<HTMLSpanElement>(null);
  const meterElRef = useRef<HTMLDivElement>(null);

  // Everything the 60fps loop touches lives in refs — putting it in React
  // state would re-render the whole tree every frame.
  const phaseRef = useRef<Phase>("loading");
  const entsRef = useRef<Entity[]>([]);
  const nextIdRef = useRef(0);
  const elapsedRef = useRef(0);
  const spawnTimerRef = useRef(0);
  const scoreRef = useRef(0);
  const streakRef = useRef(0);
  const clutterRef = useRef(0);
  const clearedRef = useRef(0);
  const flashRef = useRef(0);
  const imagesRef = useRef<Map<string, HTMLImageElement>>(new Map());
  const mutedRef = useRef(false);
  const audioRef = useRef<AudioContext | null>(null);
  /** Lets the boot effect call startGame, which is declared further down. */
  const startRef = useRef<() => void>(() => {});

  const setPhaseBoth = useCallback((p: Phase) => {
    phaseRef.current = p;
    setPhase(p);
  }, []);

  /* ----------------------------- audio ----------------------------- */

  const blip = useCallback(
    (freq: number, dur = 0.09, type: OscillatorType = "sine") => {
      if (mutedRef.current) return;
      try {
        let ac = audioRef.current;
        if (!ac) {
          const Ctor =
            window.AudioContext ??
            (window as unknown as { webkitAudioContext?: typeof AudioContext })
              .webkitAudioContext;
          if (!Ctor) return;
          ac = new Ctor();
          audioRef.current = ac;
        }
        if (ac.state === "suspended") void ac.resume();
        const osc = ac.createOscillator();
        const gain = ac.createGain();
        osc.type = type;
        osc.frequency.value = freq;
        gain.gain.setValueAtTime(0.07, ac.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.0001, ac.currentTime + dur);
        osc.connect(gain).connect(ac.destination);
        osc.start();
        osc.stop(ac.currentTime + dur);
      } catch {
        // Audio is a nice-to-have; never let it break the game.
      }
    },
    [],
  );

  /* --------------------------- boot / assets --------------------------- */

  useEffect(() => {
    setBest(Number(localStorage.getItem(HIGH_SCORE_KEY) ?? 0) || 0);
    const m = localStorage.getItem(MUTED_KEY) === "1";
    setMuted(m);
    mutedRef.current = m;

    let cancelled = false;
    let settled = false;

    const begin = () => {
      if (settled || cancelled) return;
      settled = true;
      // ?play=1 drops straight into a run — that is the link a QR code on a
      // hangtag or on packaging should point at. Read off location rather than
      // useSearchParams() so the page needs no Suspense boundary.
      if (new URLSearchParams(window.location.search).get("play") === "1") {
        startRef.current();
      } else {
        setPhaseBoth("menu");
      }
    };

    // Packshots are decoded up front so the first product to fall doesn't pop
    // in a frame late — but a slow phone connection must never leave the user
    // staring at a spinner. Whichever comes first wins; stragglers keep
    // loading and draw as soon as they arrive (draw() falls back to an
    // outline until then).
    const failsafe = setTimeout(begin, 2500);

    Promise.all(
      SPRITES.map(
        (s) =>
          new Promise<void>((resolve) => {
            const img = new Image();
            img.onload = () => {
              imagesRef.current.set(s.id, img);
              resolve();
            };
            img.onerror = () => resolve();
            img.src = s.thumb;
          }),
      ),
    ).then(begin);

    return () => {
      cancelled = true;
      clearTimeout(failsafe);
    };
  }, [setPhaseBoth]);

  /* ------------------------------ helpers ------------------------------ */

  const syncHud = useCallback(() => {
    if (scoreElRef.current) {
      scoreElRef.current.textContent = String(scoreRef.current);
    }
    if (comboElRef.current) {
      const m = comboFor(streakRef.current);
      comboElRef.current.textContent = m > 1 ? `×${m}` : "";
    }
    if (meterElRef.current) {
      const pct = Math.min(100, (clutterRef.current / MAX_CLUTTER) * 100);
      meterElRef.current.style.width = `${pct}%`;
      meterElRef.current.style.background =
        pct > 75 ? "#ff4d4d" : pct > 45 ? "#ffb020" : "#e5e1f2";
    }
  }, []);

  const spawn = useCallback((allowProducts: boolean) => {
    const el = elapsedRef.current;
    const isProduct =
      allowProducts && SPRITES.length > 0 && Math.random() < productChance(el);
    const r = isProduct ? PRODUCT_R : NOISE_R;
    const speed = fallSpeed(el) * (0.85 + Math.random() * 0.3);

    entsRef.current.push({
      id: nextIdRef.current++,
      kind: isProduct ? "product" : "noise",
      x: r + Math.random() * (FIELD_W - r * 2),
      y: -r - 10,
      vx: (Math.random() - 0.5) * 26,
      vy: speed,
      r,
      rot: Math.random() * Math.PI * 2,
      vrot: (Math.random() - 0.5) * 1.1,
      glyph: Math.floor(Math.random() * GLYPH_COUNT),
      sprite: isProduct
        ? SPRITES[Math.floor(Math.random() * SPRITES.length)]
        : undefined,
    });
  }, []);

  const endGame = useCallback(
    (why: Cause, sprite: Sprite | null) => {
      const score = scoreRef.current;
      setFinalScore(score);
      setCause(why);
      setKilled(sprite);

      const prev = Number(localStorage.getItem(HIGH_SCORE_KEY) ?? 0) || 0;
      if (score > prev) {
        localStorage.setItem(HIGH_SCORE_KEY, String(score));
        setBest(score);
        setIsNewBest(true);
      } else {
        setIsNewBest(false);
      }

      blip(160, 0.35, "sawtooth");
      setPhaseBoth("over");
    },
    [blip, setPhaseBoth],
  );

  const startGame = useCallback(() => {
    entsRef.current = [];
    elapsedRef.current = 0;
    spawnTimerRef.current = 0;
    scoreRef.current = 0;
    streakRef.current = 0;
    clutterRef.current = 0;
    clearedRef.current = 0;
    flashRef.current = 0;
    setKilled(null);
    setIsNewBest(false);
    syncHud();
    blip(660, 0.1);
    setPhaseBoth("playing");
  }, [blip, setPhaseBoth, syncHud]);

  startRef.current = startGame;

  /* ------------------------------ the loop ------------------------------ */

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf = 0;
    let last = performance.now();

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
    };
    resize();

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    const update = (dt: number) => {
      const p = phaseRef.current;
      if (p !== "playing" && p !== "menu") return;
      const playing = p === "playing";

      if (playing) elapsedRef.current += dt;
      if (flashRef.current > 0) flashRef.current = Math.max(0, flashRef.current - dt);

      spawnTimerRef.current -= dt;
      if (spawnTimerRef.current <= 0) {
        // The menu runs the same field as an ambient backdrop, but slower and
        // without products — nothing there is tappable.
        spawnTimerRef.current = playing
          ? spawnInterval(elapsedRef.current)
          : 0.9 + Math.random() * 0.6;
        spawn(playing);
      }

      const alive: Entity[] = [];
      for (const e of entsRef.current) {
        if (e.dying !== undefined) {
          e.dying -= dt;
          if (e.dying > 0) alive.push(e);
          continue;
        }

        e.y += e.vy * dt * (playing ? 1 : 0.45);
        e.x += e.vx * dt;
        e.rot += e.vrot * dt;

        if (e.x < e.r) {
          e.x = e.r;
          e.vx = Math.abs(e.vx);
        } else if (e.x > FIELD_W - e.r) {
          e.x = FIELD_W - e.r;
          e.vx = -Math.abs(e.vx);
        }

        if (e.y - e.r > FIELD_H) {
          // Products are meant to pass through — they are the essentials.
          // Noise that reaches the bottom got into your life: that is clutter.
          if (playing && e.kind === "noise") {
            clutterRef.current += 1;
            streakRef.current = 0;
            flashRef.current = 0.3;
            blip(190, 0.12, "square");
            syncHud();
            if (clutterRef.current >= MAX_CLUTTER) {
              endGame("clutter", null);
              return;
            }
          }
          continue;
        }

        alive.push(e);
      }
      entsRef.current = alive;
    };

    const draw = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const scale = (canvas.width / dpr) / FIELD_W;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, canvas.width / dpr, canvas.height / dpr);
      ctx.save();
      ctx.scale(scale, scale);

      // Near-opaque: the site's background artwork behind the canvas would
      // otherwise compete with the glyphs and wreck readability at speed.
      ctx.fillStyle = "rgba(7,7,10,0.94)";
      ctx.fillRect(0, 0, FIELD_W, FIELD_H);

      if (flashRef.current > 0) {
        ctx.fillStyle = `rgba(255,60,60,${flashRef.current * 0.35})`;
        ctx.fillRect(0, 0, FIELD_W, FIELD_H);
      }

      for (const e of entsRef.current) {
        const dieT = e.dying !== undefined ? Math.max(0, e.dying / 0.25) : 1;
        const alpha = e.dying !== undefined ? dieT : 1;
        const grow = e.dying !== undefined ? 1 + (1 - dieT) * 0.8 : 1;

        ctx.save();
        ctx.translate(e.x, e.y);
        ctx.globalAlpha = alpha;

        if (e.kind === "noise") {
          ctx.rotate(e.rot);
          ctx.scale(grow, grow);
          ctx.strokeStyle = "#e5e1f2";
          ctx.lineWidth = 2.2;
          ctx.lineCap = "round";
          ctx.lineJoin = "round";
          drawGlyph(ctx, e.glyph, e.r);
        } else {
          const img = e.sprite ? imagesRef.current.get(e.sprite.id) : undefined;
          const size = e.r * 2 * grow;

          // A soft halo marks the essentials, so they stay readable once the
          // field gets fast and busy.
          ctx.save();
          ctx.globalAlpha = alpha * 0.5;
          const glow = ctx.createRadialGradient(0, 0, size * 0.2, 0, 0, size * 0.8);
          glow.addColorStop(0, "rgba(0,179,255,0.45)");
          glow.addColorStop(1, "rgba(0,179,255,0)");
          ctx.fillStyle = glow;
          ctx.beginPath();
          ctx.arc(0, 0, size * 0.8, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();

          if (img && img.complete && img.naturalWidth > 0) {
            const ratio = img.naturalWidth / img.naturalHeight;
            const w = ratio >= 1 ? size : size * ratio;
            const h = ratio >= 1 ? size / ratio : size;
            // Packshots are photos on solid backgrounds, so a hard rectangle
            // reads as a glitch against the black field. Round it off.
            ctx.save();
            if (typeof ctx.roundRect === "function") {
              ctx.beginPath();
              ctx.roundRect(-w / 2, -h / 2, w, h, Math.min(w, h) * 0.16);
              ctx.clip();
            }
            ctx.drawImage(img, -w / 2, -h / 2, w, h);
            ctx.restore();
          } else {
            ctx.strokeStyle = "#00b3ff";
            ctx.lineWidth = 2.5;
            ctx.strokeRect(-size / 2, -size / 2, size, size);
          }

          if (e.sprite && e.dying === undefined) {
            ctx.globalAlpha = alpha * 0.85;
            ctx.fillStyle = "#e5e1f2";
            ctx.font = "600 11px Quicksand, system-ui, sans-serif";
            ctx.textAlign = "center";
            ctx.fillText(e.sprite.name[lang], 0, e.r + 14, FIELD_W * 0.6);
          }
        }

        ctx.restore();
      }

      ctx.restore();
    };

    const loop = (now: number) => {
      raf = requestAnimationFrame(loop);
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;
      update(dt);
      draw();
    };
    raf = requestAnimationFrame(loop);

    // A backgrounded tab would otherwise resume with a huge accumulated dt.
    const onVisible = () => {
      last = performance.now();
    };
    document.addEventListener("visibilitychange", onVisible);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      document.removeEventListener("visibilitychange", onVisible);
    };
  }, [blip, endGame, lang, spawn, syncHud]);

  /* ------------------------------- input ------------------------------- */

  const onPointerDown = (ev: React.PointerEvent<HTMLCanvasElement>) => {
    if (phaseRef.current !== "playing") return;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const scale = rect.width / FIELD_W;
    const x = (ev.clientX - rect.left) / scale;
    const y = (ev.clientY - rect.top) / scale;

    // Topmost entity wins, so overlapping targets resolve the way they look.
    for (let i = entsRef.current.length - 1; i >= 0; i--) {
      const e = entsRef.current[i];
      if (e.dying !== undefined) continue;
      const dx = x - e.x;
      const dy = y - e.y;
      if (dx * dx + dy * dy > e.r * e.r) continue;

      if (e.kind === "product") {
        e.dying = 0.25;
        endGame("product", e.sprite ?? null);
        return;
      }

      e.dying = 0.25;
      streakRef.current += 1;
      clearedRef.current += 1;
      scoreRef.current += POINTS_PER_CLEAR * comboFor(streakRef.current);

      if (clearedRef.current % CLUTTER_FORGIVE_EVERY === 0) {
        clutterRef.current = Math.max(0, clutterRef.current - 1);
      }

      blip(520 + Math.min(streakRef.current, 20) * 18, 0.06, "triangle");
      syncHud();
      return;
    }
  };

  const toggleMute = () => {
    const next = !muted;
    setMuted(next);
    mutedRef.current = next;
    localStorage.setItem(MUTED_KEY, next ? "1" : "0");
  };

  /* ------------------------------- render ------------------------------- */

  const overlay = phase !== "playing";

  return (
    <div className="mx-auto flex w-full max-w-md flex-col items-center gap-3">
      <div className="flex w-full items-center justify-between text-sm text-[#e5e1f2]">
        <div className="flex items-baseline gap-2">
          <span className="text-xs uppercase tracking-widest opacity-60">
            {t("game.score", "Score")}
          </span>
          <span ref={scoreElRef} className="text-xl font-semibold tabular-nums">
            0
          </span>
          <span ref={comboElRef} className="text-sm font-semibold text-[#00b3ff]" />
        </div>
        <div className="flex items-center gap-3">
          <span className="text-xs opacity-60">
            {t("game.best", "Best")} {best}
          </span>
          <button
            type="button"
            onClick={toggleMute}
            aria-label={muted ? t("game.unmute", "Unmute") : t("game.mute", "Mute")}
            className="rounded border border-white/20 px-2 py-1 text-xs opacity-70 transition hover:opacity-100"
          >
            {muted ? "♪̸" : "♪"}
          </button>
        </div>
      </div>

      <div className="h-1 w-full overflow-hidden rounded bg-white/10">
        <div
          ref={meterElRef}
          className="h-full w-0 rounded transition-[width] duration-150"
          style={{ background: "#e5e1f2" }}
        />
      </div>

      {/* Height-first sizing: the whole field must fit on screen without
        * scrolling, so height drives width via the aspect ratio, and max-width
        * takes over on narrow phones. */}
      <div
        className="fm-game-field relative mx-auto overflow-hidden rounded-xl border border-white/15"
        style={{
          aspectRatio: `${FIELD_W} / ${FIELD_H}`,
          maxWidth: "100%",
        }}
      >
        <canvas
          ref={canvasRef}
          onPointerDown={onPointerDown}
          className="block h-full w-full"
          style={{ touchAction: "none" }}
        />

        {overlay && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-black/70 px-6 text-center backdrop-blur-sm">
            {phase === "loading" && (
              <p className="text-sm opacity-70">{t("game.loading", "Loading…")}</p>
            )}

            {phase === "menu" && (
              <>
                <h1 className="text-3xl font-bold tracking-tight">
                  {t("game.title", "KEEP IT MINIMAL")}
                </h1>
                <p className="max-w-xs text-sm leading-relaxed opacity-75">
                  {t(
                    "game.tagline",
                    "Noise falls. Remove it. Keep what is essential.",
                  )}
                </p>

                <div className="flex flex-col gap-2 text-left text-xs opacity-80">
                  <div className="flex items-center gap-3">
                    <svg width="26" height="26" viewBox="-13 -13 26 26" aria-hidden>
                      <rect
                        x="-8"
                        y="-8"
                        width="16"
                        height="16"
                        fill="none"
                        stroke="#e5e1f2"
                        strokeWidth="2"
                      />
                    </svg>
                    <span>{t("game.ruleNoise", "Tap the noise to clear it")}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="flex h-[26px] w-[26px] items-center justify-center rounded-full bg-[#00b3ff]/25 text-[#00b3ff]">
                      ✦
                    </span>
                    <span>
                      {t("game.ruleProduct", "Never tap a product — let it pass")}
                    </span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={startGame}
                  className="mt-1 rounded-full bg-[#e5e1f2] px-8 py-3 text-sm font-semibold uppercase tracking-widest text-black transition hover:bg-white"
                >
                  {t("game.play", "Play")}
                </button>
              </>
            )}

            {phase === "over" && (
              <>
                <p className="text-xs uppercase tracking-widest opacity-60">
                  {cause === "product"
                    ? t("game.overProduct", "You deleted something essential")
                    : t("game.overClutter", "Too much noise")}
                </p>

                <div className="text-5xl font-bold tabular-nums">{finalScore}</div>
                {isNewBest ? (
                  <p className="text-sm font-semibold text-[#00b3ff]">
                    {t("game.newBest", "New personal best")}
                  </p>
                ) : (
                  <p className="text-xs opacity-60">
                    {t("game.best", "Best")} {best}
                  </p>
                )}

                {killed && (
                  <Link
                    href={killed.href}
                    className="group mt-1 flex items-center gap-3 rounded-lg border border-white/15 bg-white/5 p-2 pr-4 transition hover:border-white/40"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={killed.src}
                      alt={killed.name[lang]}
                      className="h-12 w-12 object-contain"
                    />
                    <span className="text-left text-xs leading-tight">
                      <span className="block opacity-60">
                        {t("game.ownItInstead", "Own it instead")}
                      </span>
                      <span className="font-semibold underline-offset-2 group-hover:underline">
                        {killed.name[lang]}
                      </span>
                    </span>
                  </Link>
                )}

                <div className="mt-1 flex flex-wrap items-center justify-center gap-2">
                  <button
                    type="button"
                    onClick={startGame}
                    className="rounded-full bg-[#e5e1f2] px-6 py-2.5 text-sm font-semibold uppercase tracking-widest text-black transition hover:bg-white"
                  >
                    {t("game.again", "Again")}
                  </button>
                  <Link
                    href="/"
                    className="rounded-full border border-white/25 px-6 py-2.5 text-sm font-semibold uppercase tracking-widest transition hover:border-white/60"
                  >
                    {t("game.shop", "Shop")}
                  </Link>
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
