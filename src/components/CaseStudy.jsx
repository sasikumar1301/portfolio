import { useEffect, useState } from "react";
import Offcanvas from "react-bootstrap/Offcanvas";
import { FiCheck, FiLink } from "react-icons/fi";
import { ui } from "../data";
import { copyToClipboard, reducedMotion } from "../hooks";
import Pipeline from "./Pipeline";

// Synthetic log: lines type in one by one; all at once under reduced motion.
function Terminal({ lines }) {
  const still = reducedMotion();
  const [n, setN] = useState(still ? lines.length : 0);
  useEffect(() => {
    if (n >= lines.length) return;
    const t = setTimeout(() => setN(n + 1), 450);
    return () => clearTimeout(t);
  }, [n, lines.length]);
  return (
    <figure className="terminal">
      <figcaption className="term-bar mono"><i aria-hidden="true" />{ui.terminalTitle}</figcaption>
      <pre className="mono"><code>
        {lines.slice(0, n).map((l, i) => (
          <span key={i} className={`term-line${l.startsWith("$") ? " cmd" : ""}`}>{l}</span>
        ))}
        <span className="cursor" aria-hidden="true">▋</span>
      </code></pre>
    </figure>
  );
}

const H = ({ children }) => <h3 className="case-h mono">{children}</h3>;

export default function CaseStudy({ project: p, show, onClose }) {
  const [copied, setCopied] = useState(false);
  const copyLink = () => copyToClipboard(window.location.href).then(() => setCopied(true), () => {});

  return (
    <Offcanvas show={show} onHide={onClose} onExited={() => setCopied(false)} placement="end" className="glass-panel case-drawer"
      aria-labelledby="case-title" restoreFocusOptions={{ preventScroll: true }}>
      <Offcanvas.Header closeButton closeLabel="Close case study" className="align-items-start">
        <div>
          <p className="mono tag mb-1">{p.tag}</p>
          <Offcanvas.Title as="h2" id="case-title" className="h4 mb-0">{p.title}</Offcanvas.Title>
        </div>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <p className="case-summary">{p.summary}</p>
        <H>{ui.caseLabels.problem}</H>
        <p>{p.problem}</p>
        <H>{ui.caseLabels.approach}</H>
        <Pipeline stages={p.pipeline} label={`${p.title}: pipeline`} />
        <ul className="case-list">
          {p.highlights.map((h) => <li key={h}>{h}</li>)}
        </ul>
        <H>{ui.caseLabels.result}</H>
        <p>{p.result}</p>
        <H>{ui.caseLabels.stack}</H>
        <ul className="chips">
          {p.stack.map((s) => <li key={s} className="chip">{s}</li>)}
        </ul>
        <Terminal key={p.slug} lines={p.terminal} />
        <button type="button" className="btn btn-ghost btn-sm mt-3" onClick={copyLink}>
          {copied ? <FiCheck aria-hidden="true" /> : <FiLink aria-hidden="true" />} {copied ? ui.linkCopied : ui.copyLink}
        </button>
      </Offcanvas.Body>
    </Offcanvas>
  );
}
