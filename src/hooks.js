import { useEffect, useRef, useState } from "react";

export const reducedMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;
export const isMac = /Mac|iPhone|iPad/.test(navigator.userAgent);
export const copyToClipboard = (text) => navigator.clipboard?.writeText(text) ?? Promise.reject();
export const usesSkill = (project, skill) => project.stack.some((s) => s.toLowerCase() === skill.toLowerCase());
export const scrollToId = (id) => document.getElementById(id)?.scrollIntoView({ behavior: reducedMotion() ? "auto" : "smooth" });

// Card spotlight: feeds the cursor position to CSS as --x / --y.
export function spotlight(e) {
  const r = e.currentTarget.getBoundingClientRect();
  e.currentTarget.style.setProperty("--x", `${e.clientX - r.left}px`);
  e.currentTarget.style.setProperty("--y", `${e.clientY - r.top}px`);
}

// "2025-05" → "1.6+ years" in November 2026 (years.months shorthand).
export function experienceLabel(start, now = new Date()) {
  const [y, m] = start.split("-").map(Number);
  const totalMonths = Math.max((now.getFullYear() - y) * 12 + now.getMonth() + 1 - m, 0);
  if (totalMonths === 0) return "Less than 1 month";

  const years = Math.floor(totalMonths / 12);
  const months = totalMonths % 12;
  if (!years) return `${months}+ month${months === 1 ? "" : "s"}`;
  return `${years}${months ? `.${months}` : ""}+ years`;
}

// Theme lives on <html data-bs-theme>; index.html sets it before paint. Only explicit choices are saved.
export function useTheme() {
  const [theme, setTheme] = useState(() => document.documentElement.getAttribute("data-bs-theme") || "dark");
  useEffect(() => {
    document.documentElement.setAttribute("data-bs-theme", theme);
    document.querySelector('meta[name="theme-color"]')?.setAttribute("content", theme === "dark" ? "#070A12" : "#F6F8FC");
  }, [theme]);
  const toggle = () => {
    const next = theme === "dark" ? "light" : "dark";
    try { localStorage.setItem("theme", next); } catch { /* storage blocked */ }
    setTheme(next);
  };
  return [theme, toggle];
}

// Location hash as state. go(hash, replace) pushes or replaces; back/forward stay in sync.
export function useHash() {
  const [hash, setHash] = useState(() => window.location.hash);
  useEffect(() => {
    const sync = () => setHash(window.location.hash);
    ["hashchange", "popstate"].forEach((ev) => window.addEventListener(ev, sync));
    return () => ["hashchange", "popstate"].forEach((ev) => window.removeEventListener(ev, sync));
  }, []);
  const go = (next, replace = false) => {
    window.history[replace ? "replaceState" : "pushState"](null, "", next || window.location.pathname + window.location.search);
    setHash(window.location.hash);
  };
  return [hash, go];
}

export function useInView(threshold = 0.3) {
  const ref = useRef(null);
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    const io = new IntersectionObserver(([e]) => e.isIntersecting && (setSeen(true), io.disconnect()), { threshold });
    if (ref.current) io.observe(ref.current);
    return () => io.disconnect();
  }, [threshold]);
  return [ref, seen];
}

export function useCountUp(target, run, ms = 1200) {
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!run) return;
    if (reducedMotion()) return setN(target);
    let raf;
    const t0 = performance.now();
    const step = (t) => {
      const p = Math.min((t - t0) / ms, 1);
      setN(Math.round(target * (1 - (1 - p) ** 3))); // ease-out cubic
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [target, run, ms]);
  return n;
}

// Returns a ref whose element is scaled 0→1 with page scroll. Passive listener, one write per frame.
export function useScrollProgress() {
  const ref = useRef(null);
  useEffect(() => {
    let raf = 0;
    const update = () => {
      const h = document.documentElement;
      ref.current.style.transform = `scaleX(${h.scrollTop / Math.max(h.scrollHeight - h.clientHeight, 1)})`;
    };
    const onScroll = () => { cancelAnimationFrame(raf); raf = requestAnimationFrame(update); };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => { cancelAnimationFrame(raf); window.removeEventListener("scroll", onScroll); };
  }, []);
  return ref;
}

export function useScrollSpy(ids) {
  const [active, setActive] = useState("");
  useEffect(() => {
    const io = new IntersectionObserver((es) => es.forEach((e) => e.isIntersecting && setActive(e.target.id)), {
      rootMargin: "-45% 0px -50% 0px",
    });
    ids.forEach((id) => document.getElementById(id) && io.observe(document.getElementById(id)));
    return () => io.disconnect();
  }, [ids]);
  return active;
}
