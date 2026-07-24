import type { Metadata } from "next";
import KeepItMinimal from "./KeepItMinimal";

export const metadata: Metadata = {
  title: "Keep It Minimal",
  description:
    "Noise falls. Remove it. Keep what is essential. A game by Freak Minimalism.",
};

export default function GamePage() {
  return (
    <div className="flex w-full flex-col items-center py-6">
      <KeepItMinimal />
    </div>
  );
}
