import { useEffect, useState } from "react";

export function HeroVideo() {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setEnabled(!media.matches);
    sync();
    media.addEventListener?.("change", sync);
    return () => media.removeEventListener?.("change", sync);
  }, []);

  if (!enabled) {
    return null;
  }

  return (
    <video
      className="hero-video"
      data-testid="hero-video"
      autoPlay
      muted
      loop
      playsInline
      preload="metadata"
      poster="/images/hero-coast.png"
      aria-hidden="true"
    >
      <source src="/videos/hero-coast.mp4" type="video/mp4" />
    </video>
  );
}
