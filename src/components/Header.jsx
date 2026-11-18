import { useState } from "react";
import { profile } from "../data";

export default function Header() {
  const [theme, setTheme] = useState(() => document.documentElement.dataset.theme || "light");
  const toggleTheme = () => {
    const next = theme === "light" ? "dark" : "light";
    document.documentElement.dataset.theme = next;
    localStorage.setItem("theme", next);
    setTheme(next);
  };

  return (
    <header className="site-header">
      <div className="shell header-inner">
        <a className="name-link" href="#top">{profile.shortName}</a>
        <nav aria-label="Main navigation">
          <a href="#work">Work</a>
          <a href="#experience">Experience</a>
          <a href="#skills">Skills</a>
          <a href="#contact">Contact</a>
          <button type="button" className="theme-toggle" onClick={toggleTheme} aria-label={`Use ${theme === "light" ? "dark" : "light"} theme`}>
            light / dark
          </button>
        </nav>
      </div>
    </header>
  );
}
