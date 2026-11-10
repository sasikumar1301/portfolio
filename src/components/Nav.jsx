import { useState } from "react";
import Offcanvas from "react-bootstrap/Offcanvas";
import { FiDownload, FiMenu, FiMoon, FiSun } from "react-icons/fi";
import { nav, profile, ui } from "../data";
import { isMac, useScrollProgress, useScrollSpy } from "../hooks";

const SPY_IDS = ["top", "tldr", ...nav.map((n) => n.id)];

export default function Nav({ theme, onTheme, onPalette }) {
  const [open, setOpen] = useState(false);
  const active = useScrollSpy(SPY_IDS);
  const bar = useScrollProgress();

  const links = (cls) =>
    nav.map((n) => (
      <li key={n.id}>
        <a href={`#${n.id}`} className={`${cls}${active === n.id ? " active" : ""}`}
          aria-current={active === n.id ? "location" : undefined} onClick={() => setOpen(false)}>
          {n.label}
        </a>
      </li>
    ));

  return (
    <header className="topbar fixed-top">
      <div ref={bar} className="scroll-progress" aria-hidden="true" />
      <nav className="container d-flex align-items-center gap-2" aria-label="Primary">
        <a href="#top" className="logo me-auto" aria-label={`${profile.name}, back to top`}>
          {profile.initials}<span aria-hidden="true">_</span>
        </a>
        <ul className="nav-links d-none d-md-flex list-unstyled m-0 me-2">{links("nav-link-hud")}</ul>
        <button type="button" className="btn-icon" onClick={onPalette} aria-label="Open command palette" aria-keyshortcuts="Control+K Meta+K /">
          <kbd>{isMac ? "⌘" : "Ctrl"} K</kbd>
        </button>
        <button type="button" className="btn-icon" onClick={onTheme} aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}>
          {theme === "dark" ? <FiSun aria-hidden="true" /> : <FiMoon aria-hidden="true" />}
        </button>
        <a className="btn btn-hud btn-sm d-none d-sm-inline-flex" href={profile.resumeUrl} download>{ui.resume}</a>
        <button type="button" className="btn-icon d-md-none" onClick={() => setOpen(true)} aria-label="Open menu" aria-expanded={open} aria-controls="site-menu">
          <FiMenu aria-hidden="true" />
        </button>
      </nav>
      <Offcanvas id="site-menu" show={open} onHide={() => setOpen(false)} placement="end" className="glass-panel"
        aria-labelledby="site-menu-title" restoreFocusOptions={{ preventScroll: true }}>
        <Offcanvas.Header closeButton closeLabel="Close menu">
          <Offcanvas.Title id="site-menu-title" className="kicker m-0">{"// menu"}</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <ul className="list-unstyled d-grid gap-1">{links("menu-link")}</ul>
          <a className="btn btn-hud w-100 mt-3 justify-content-center" href={profile.resumeUrl} download>
            <FiDownload aria-hidden="true" /> {ui.resume}
          </a>
        </Offcanvas.Body>
      </Offcanvas>
    </header>
  );
}
