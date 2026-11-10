import { lazy, Suspense, useEffect, useState } from "react";
import { LazyMotion, domAnimation } from "framer-motion";
import { projects } from "./data";
import { scrollToId, useHash, useTheme } from "./hooks";
import Nav from "./components/Nav";
import Hero from "./components/Hero";
import Tldr from "./components/Tldr";
import Projects from "./components/Projects";
import Skills from "./components/Skills";
import Experience from "./components/Experience";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import NetworkBg from "./components/NetworkBg";

const CaseStudy = lazy(() => import("./components/CaseStudy"));
const Palette = lazy(() => import("./components/Palette"));
const isTyping = (el) => /^(INPUT|TEXTAREA|SELECT)$/.test(el.tagName) || el.isContentEditable;

export default function App() {
  const [theme, toggleTheme] = useTheme();
  const [hash, go] = useHash();
  const [filter, setFilter] = useState(null);
  const [palette, setPalette] = useState(null); // null = never opened, so the chunk isn't loaded yet

  // #/p/<slug> opens a case study; the last one stays mounted so the drawer can animate out.
  const project = projects.find((p) => hash === `#/p/${p.slug}`);
  const [shown, setShown] = useState(project);
  if (project && project !== shown) setShown(project);

  const openProject = (slug) => go(`#/p/${slug}`);
  const goSection = (id) => { go(`#${id}`, true); scrollToId(id); };

  useEffect(() => {
    // Section deep link on first load: content renders after the browser's own jump.
    if (/^#[\w-]+$/.test(window.location.hash)) scrollToId(window.location.hash.slice(1));
    // Ctrl/⌘+K anywhere, or "/" when not typing, toggles the command palette.
    const onKey = (e) => {
      if ((e.key?.toLowerCase() === "k" && (e.metaKey || e.ctrlKey)) || (e.key === "/" && !isTyping(e.target))) {
        e.preventDefault();
        setPalette((open) => !open);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    // Motion components render as plain elements under prefers-reduced-motion (see Reveal, Hero).
    <LazyMotion features={domAnimation} strict>
      <a className="skip-link" href="#main">Skip to content</a>
      <NetworkBg theme={theme} />
      <Nav theme={theme} onTheme={toggleTheme} onPalette={() => setPalette(true)} />
      <main id="main" tabIndex={-1}>
        <Hero />
        <Tldr />
        <Projects filter={filter} setFilter={setFilter} onOpen={openProject} />
        <Skills filter={filter} setFilter={setFilter} />
        <Experience />
        <Contact />
      </main>
      <Footer />
      <Suspense fallback={null}>
        {shown && <CaseStudy project={shown} show={!!project} onClose={() => go("", true)} />}
        {palette !== null && (
          <Palette show={palette} onClose={() => setPalette(false)} actions={{ go: goSection, open: openProject, theme: toggleTheme }} />
        )}
      </Suspense>
    </LazyMotion>
  );
}
