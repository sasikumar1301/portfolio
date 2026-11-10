import { useEffect, useRef } from "react";
import { reducedMotion } from "../hooks";

// Drifting particle network. Fewer nodes on mobile, paused in hidden tabs, off for reduced motion.
export default function NetworkBg({ theme }) {
  const ref = useRef(null);
  useEffect(() => {
    if (reducedMotion()) return;
    const c = ref.current, ctx = c.getContext("2d");
    const rgb = theme === "dark" ? "34,211,238" : "14,116,144", R = 130;
    let w, h, raf;
    const size = () => { w = c.width = innerWidth; h = c.height = innerHeight; };
    size();
    const pts = Array.from({ length: innerWidth < 768 ? 18 : 42 }, () => ({
      x: Math.random() * w, y: Math.random() * h, vx: (Math.random() - 0.5) * 0.3, vy: (Math.random() - 0.5) * 0.3,
    }));
    const tick = () => {
      ctx.clearRect(0, 0, w, h);
      ctx.fillStyle = `rgba(${rgb},.55)`;
      pts.forEach((a, i) => {
        a.x = (a.x + a.vx + w) % w; a.y = (a.y + a.vy + h) % h;
        ctx.fillRect(a.x - 1, a.y - 1, 2, 2);
        for (const b of pts.slice(i + 1)) {
          const d = Math.hypot(a.x - b.x, a.y - b.y);
          if (d > R) continue;
          ctx.strokeStyle = `rgba(${rgb},${(1 - d / R) * 0.22})`;
          ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
        }
      });
      raf = requestAnimationFrame(tick);
    };
    const onVis = () => { cancelAnimationFrame(raf); if (!document.hidden) raf = requestAnimationFrame(tick); };
    const boot = setTimeout(onVis, 1500); // start after first paint settles, keeping load lean
    addEventListener("resize", size);
    document.addEventListener("visibilitychange", onVis);
    return () => { clearTimeout(boot); cancelAnimationFrame(raf); removeEventListener("resize", size); document.removeEventListener("visibilitychange", onVis); };
  }, [theme]);
  return <canvas ref={ref} className="net-bg" aria-hidden="true" />;
}
