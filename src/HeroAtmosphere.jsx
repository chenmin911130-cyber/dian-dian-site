import { useEffect, useState } from "react";

export function HeroAtmosphere() {
  const [motion, setMotion] = useState(false);

  useEffect(() => {
    if (typeof window.matchMedia !== "function") {
      setMotion(true);
      return undefined;
    }

    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setMotion(!media.matches);
    sync();
    media.addEventListener?.("change", sync);
    return () => media.removeEventListener?.("change", sync);
  }, []);

  return (
    <div
      className={
        motion ? "hero-atmosphere hero-atmosphere--live" : "hero-atmosphere"
      }
      data-testid="hero-atmosphere"
      aria-hidden="true"
    >
      <img
        className="hero-atmosphere__photo"
        src="/images/hero-wanaka.jpg"
        alt=""
      />
      <div className="hero-atmosphere__mist" />
      <div className="hero-atmosphere__rays" />
      <div className="hero-atmosphere__motes" />
    </div>
  );
}
