import { FiArrowUp, FiArrowUpRight, FiDownload, FiGithub, FiLinkedin, FiMail } from "react-icons/fi";
import { nav, profile, ui } from "../data";

export default function Footer() {
  const year = new Date().getFullYear();
  const ext = { target: "_blank", rel: "noopener noreferrer" };

  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-shell">
          <div className="footer-intro">
            <div className="footer-identity">
              <a className="footer-monogram" href="#top" aria-label={`${profile.name} — home`}>
                {profile.initials}<span>.</span>
              </a>
              <div>
                <p className="footer-name">{profile.name}</p>
                <p className="footer-role">{profile.role} · {profile.location}</p>
              </div>
            </div>
            <p className="footer-tagline">{ui.footer.tagline}</p>
            <a className="btn btn-hud" href={`mailto:${profile.email}`}>
              <FiMail aria-hidden="true" /> {ui.footer.cta}
            </a>
          </div>

          <div className="footer-directory">
            <nav aria-label="Footer navigation">
              <p className="footer-label">{ui.footer.explore}</p>
              <div className="footer-links">
                {nav.map(({ id, label }) => <a key={id} href={`#${id}`}>{label}</a>)}
              </div>
            </nav>
            <div>
              <p className="footer-label">{ui.footer.connect}</p>
              <div className="footer-links">
                <a href={profile.github} {...ext}><FiGithub aria-hidden="true" /> GitHub <FiArrowUpRight aria-hidden="true" /></a>
                <a href={profile.linkedin} {...ext}><FiLinkedin aria-hidden="true" /> LinkedIn <FiArrowUpRight aria-hidden="true" /></a>
                <a href={profile.resumeUrl} download><FiDownload aria-hidden="true" /> Resume</a>
              </div>
            </div>
          </div>

          <div className="footer-bottom">
            <p>© {year} {profile.name}. {ui.footer.rights}</p>
            <a href="#top" className="footer-top-link">
              {ui.top} <FiArrowUp aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
