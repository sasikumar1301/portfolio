import { useState } from "react";
import Offcanvas from "react-bootstrap/Offcanvas";
import { FiCommand, FiGithub, FiLinkedin, FiMail, FiMenu, FiMoon, FiSun } from "react-icons/fi";
import { nav, profile } from "../data";
import { isMac } from "../hooks";

const external = { target: "_blank", rel: "noopener noreferrer" };

function NavLinks({ active, onSelect }) {
  return (
    <ul className="section-nav list-unstyled">
      {nav.map((item) => (
        <li key={item.id}>
          <a href={`#${item.id}`} className={active === item.id ? "active" : undefined}
            aria-current={active === item.id ? "location" : undefined} onClick={onSelect}>
            <span aria-hidden="true" />{item.label}
          </a>
        </li>
      ))}
    </ul>
  );
}

function SocialLinks() {
  return (
    <div className="social-links" role="group" aria-label="Social links">
      <a href={profile.github} aria-label="GitHub" {...external}><FiGithub aria-hidden="true" /></a>
      <a href={profile.linkedin} aria-label="LinkedIn" {...external}><FiLinkedin aria-hidden="true" /></a>
      <a href={`mailto:${profile.email}`} aria-label="Email"><FiMail aria-hidden="true" /></a>
    </div>
  );
}

function ThemeButton({ theme, onTheme }) {
  return (
    <button type="button" className="icon-button" onClick={onTheme}
      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}>
      {theme === "dark" ? <FiSun aria-hidden="true" /> : <FiMoon aria-hidden="true" />}
    </button>
  );
}

export default function Sidebar({ active, theme, onTheme, onPalette }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const shortcut = `${isMac ? "⌘" : "Ctrl"}K`;

  return (
    <>
      <header className="mobile-bar d-lg-none">
        <a href="#top" className="mobile-name">{profile.shortName}</a>
        <div className="d-flex gap-2">
          <ThemeButton theme={theme} onTheme={onTheme} />
          <button type="button" className="icon-button" onClick={() => setMenuOpen(true)}
            aria-label="Open menu" aria-expanded={menuOpen} aria-controls="site-menu">
            <FiMenu aria-hidden="true" />
          </button>
        </div>
      </header>

      <aside className="sidebar d-none d-lg-flex">
        <div>
          <a href="#top" className="intro-link">
            <h1>{profile.name}</h1>
          </a>
          <p className="role">{profile.role}</p>
          <p className="pitch">{profile.pitch}</p>
          <nav aria-label="Primary"><NavLinks active={active} /></nav>
        </div>
        <div className="sidebar-footer">
          <SocialLinks />
          <div className="sidebar-actions">
            <ThemeButton theme={theme} onTheme={onTheme} />
            <button type="button" className="command-button" onClick={onPalette}
              aria-label="Open command palette" aria-keyshortcuts="Control+K Meta+K /">
              <FiCommand aria-hidden="true" /><span>{shortcut}</span>
            </button>
          </div>
        </div>
      </aside>

      <section id="top" className="mobile-intro d-lg-none" aria-labelledby="mobile-intro-title">
        <h1 id="mobile-intro-title">{profile.name}</h1>
        <p className="role">{profile.role}</p>
        <p className="pitch">{profile.pitch}</p>
        <SocialLinks />
      </section>

      <Offcanvas id="site-menu" show={menuOpen} onHide={() => setMenuOpen(false)} placement="end"
        className="site-menu" aria-labelledby="site-menu-title" restoreFocusOptions={{ preventScroll: true }}>
        <Offcanvas.Header closeButton closeLabel="Close menu">
          <Offcanvas.Title id="site-menu-title">Menu</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <nav aria-label="Mobile primary"><NavLinks active={active} onSelect={() => setMenuOpen(false)} /></nav>
          <button type="button" className="command-button mt-4" onClick={() => { setMenuOpen(false); onPalette(); }}>
            <FiCommand aria-hidden="true" /> Command palette <span>{shortcut}</span>
          </button>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}
