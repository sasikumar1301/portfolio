import { FiArrowUp } from "react-icons/fi";
import { ui } from "../data";

/* global __BUILD_DATE__ */
export default function Footer() {
  return (
    <footer className="footer container">
      <p className="mb-0">{ui.credit}</p>
      <p className="mb-0 mono small">
        {ui.updated} <time dateTime={__BUILD_DATE__}>{__BUILD_DATE__}</time>
      </p>
      <a href="#top" className="btn-icon" aria-label={ui.top}>
        <FiArrowUp aria-hidden="true" />
      </a>
    </footer>
  );
}
