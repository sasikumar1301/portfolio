// Single source of truth for every word on the site.
// Edit here; cards, case-study drawer, command palette and skill filters update automatically.

const BASE = import.meta.env.BASE_URL; // "/" on Vercel, "/<repo>/" on GitHub Pages

export const profile = {
  name: "Sasi Kumar Karikuti",
  shortName: "Sasi Kumar",
  initials: "SK",
  role: "Software Engineer",
  headline: "Software Engineer, Full-Stack and Backend (Python, React)",
  location: "Ananthapur, India",
  email: "karikutisasikumar1301@gmail.com",
  phone: "9390252572",
  phoneHref: "+919390252572",
  linkedin: "https://www.linkedin.com/in/sasikumar1301/",
  github: "https://github.com/sasikumar1301",
  resumeUrl: `${BASE}resume.pdf`,
  photo: `${BASE}images/Sasikumar_k.jpeg`,
  startDate: "2025-05",
  showCompany: true, // set false to hide the employer name in Experience
  workStyle: "Remote-friendly",
  availability: "Open to remote roles",
  coreStack: ["Python", "FastAPI", "PostgreSQL", "React", "YOLO"],
};

export const hero = {
  kicker: "01 — hello world",
  status: "online — open to remote roles",
  lead: "I build systems that",
  accent: "see, schedule, and report.",
  sub: "Software Engineer: Python backends, edge vision AI, and React interfaces for the process industry.",
  roles: ["Backend Engineer", "Vision AI at the edge", "Full-Stack (React)"],
  chips: ["FastAPI", "PostgreSQL", "YOLO", "Jetson", "React"],
  photoAlt: "Portrait of Sasi Kumar Karikuti",
};

export const about = [
  "Software Engineer with {experience} of experience building Python/FastAPI backends, React front ends, and automated data pipelines on PostgreSQL and SQLite.",
  "Deploys and troubleshoots services on Linux and edge devices (Raspberry Pi, NVIDIA Jetson Orin Nano).",
  "Owns work end to end, from data validation to deployment. Open to remote roles.",
];

export const nav = [
  { id: "projects", label: "Work" },
  { id: "skills", label: "Skills" },
  { id: "experience", label: "Experience" },
  { id: "contact", label: "Contact" },
];

export const sections = {
  tldr: { kicker: "02 — tl;dr", title: "Recruiter TL;DR" },
  projects: { kicker: "03 — selected work", title: "Selected work" },
  skills: { kicker: "04 — toolbox", title: "Skills" },
  experience: { kicker: "05 — experience", title: "Experience" },
  contact: { kicker: "06 — contact", title: "Let's talk" },
};

// Interface microcopy (buttons, labels, messages).
export const ui = {
  ctas: { work: "View work", resume: "Download resume", contact: "Contact" },
  resume: "Resume",
  confidential: "Industry projects, details generalized for confidentiality",
  openCase: "Open case study",
  copyLink: "Copy link",
  linkCopied: "Link copied",
  earlierTitle: "Earlier work · React, 2024",
  filterOn: "Highlighting",
  skillsHint: "Click a skill to highlight the projects that use it. Click again to clear.",
  skillMatches: (n, skill) => `${n} project${n === 1 ? " uses" : "s use"} ${skill}, highlighted in Selected work.`,
  projectCount: (n) => `${n} project${n === 1 ? "" : "s"}`,
  caseLabels: { problem: "Problem", approach: "Approach", result: "Result", stack: "Stack" },
  terminalTitle: "sample run · synthetic data",
  education: "Education",
  certifications: "Certifications",
  contactBlurb: "Looking for a software engineer who can own problems end to end—from architecture and backend systems to AI-powered features and polished user experiences? Send a message or reach out directly.",
  form: { name: "Name", email: "Email", message: "Message", send: "Send message", sending: "Sending…", copy: "Copy email address", copied: "Email copied" },
  errors: { name: "Please enter your name.", email: "Please enter a valid email address.", message: "Please write at least 10 characters." },
  mailSubject: (name) => `Portfolio contact from ${name}`,
  sent: "Thanks. Your message is on its way.",
  failed: "Couldn't send right now. Please email me directly at",
  mailtoNote: "Opening your email app…",
  top: "Back to top",
  footer: {
    tagline: "Building reliable software from idea to production.",
    cta: "Start a conversation",
    explore: "Explore",
    connect: "Connect",
    rights: "All rights reserved.",
  },
  palette: {
    placeholder: "Type a command or search…", empty: "No matches", go: "Go to", open: "Project", act: "Action",
    resume: "Download resume", email: "Copy email", theme: "Toggle theme", linkedin: "Open LinkedIn", github: "Open GitHub",
  },
};

export const projects = [
  {
    slug: "vision-ai",
    title: "Industrial Vision AI: Defect and Object Detection",
    tag: "Computer Vision · Edge AI",
    summary: "Camera-to-dashboard inspection pipelines (capture, training, inference, review) running 24/7 on Raspberry Pi 5 and Jetson Orin Nano.",
    problem: "Production lines need defect and object detection that runs around the clock on small edge devices and feeds a human review step.",
    result: "Inspection pipelines run 24/7 on Raspberry Pi 5 and Jetson Orin Nano, with the deployment config chosen from on-device benchmarks.", // TODO: add p95 latency / accuracy once cleared for publication
    pipeline: [
      { name: "Capture", note: "multi-camera, GPIO-triggered" },
      { name: "Preprocess", note: "grayscale, CLAHE, ROI" },
      { name: "Tile", note: "256×256, 64 px overlap" },
      { name: "YOLO", note: "batched inference" },
      { name: "Merge", note: "restore coords, full-image NMS" },
      { name: "Review", note: "dashboard" },
    ],
    highlights: [
      "Cut inference workload with per-camera ROI selection while keeping original full-image coordinates.",
      "Benchmarked FP32 vs FP16 and shared vs per-line process layouts on-device (latency p95, peak RAM, detection agreement) to choose the deployment config.",
      "Built a durable manual inference On/Off policy with an audit trail and fail-closed defaults.",
      "Kept source images immutable, with atomic writes and file locks.",
      "Covered object detection and multi-object tracking (YOLO + ByteTrack), dataset preparation, and training.",
    ],
    stack: ["Python", "YOLO", "OpenCV", "ByteTrack", "NCNN", "ONNX", "Streamlit", "systemd", "Raspberry Pi 5", "Jetson Orin Nano"],
    terminal: [
      "$ systemctl start inspect@line-a",
      "[capture] gpio trigger → 2 frames",
      "[prep] gray → CLAHE → ROI crop",
      "[tile] 256×256, overlap 64 → 12 tiles",
      "[yolo] batch=12 fp16 → 3 boxes",
      "[merge] coords restored · NMS → 2 kept → review queue",
    ],
  },
  {
    slug: "decision-support",
    title: "Full-Stack AI Decision Support for Blast Furnace Operations",
    tag: "Full-Stack · AI",
    summary: "A web app that delivers AI-generated recommendations and interactive visualizations to plant operators.",
    problem: "Blast furnace operators need AI recommendations and current process data in one place, without manual data handling.",
    result: "Operators get recommendations and interactive visualizations in React dashboards, fed by ingestion jobs that keep data current without manual work.", // TODO: add refresh interval / users if shareable
    pipeline: [
      { name: "Sources", note: "process data" },
      { name: "Ingest", note: "systemd jobs" },
      { name: "Validate", note: "schema + rules" },
      { name: "PostgreSQL", note: "storage" },
      { name: "Engine", note: "recommendations" },
      { name: "FastAPI", note: "REST" },
      { name: "React", note: "dashboards" },
    ],
    highlights: [
      "Built the React front end and the FastAPI backend.",
      "Automated data pipelines as systemd jobs so data stays current without manual work.",
      "Built interactive visualizations of process data for operators.",
    ],
    stack: ["Python", "FastAPI", "React", "PostgreSQL", "systemd", "Linux"],
    terminal: [
      "$ systemctl start ingest.timer",
      "[ingest] sources fetched",
      "[validate] schema ok · 0 rows rejected",
      "[db] upsert → postgres ok",
      "[engine] recommendations refreshed",
      "[api] GET /recommendations → 200",
    ],
  },
  {
    slug: "orchestrator",
    title: "Durable Job Orchestration Platform",
    tag: "Backend · Distributed Systems",
    summary: "A PostgreSQL-backed scheduler, executor, and result-delivery system.",
    problem: "Scheduled jobs and their results must survive crashes and restarts without running work twice or sending a result twice.",
    result: "Three independently deployable services coordinate only through PostgreSQL and run under memory-capped systemd units on a Jetson.", // TODO: add jobs/day or uptime if shareable
    pipeline: [
      { name: "Events", note: "source events" },
      { name: "Controller", note: "reconcile, schedule" },
      { name: "Execution", note: "claim, lease, retry" },
      { name: "Delivery", note: "persist intent, send" },
    ],
    highlights: [
      "Three independently deployable services coordinating only through PostgreSQL, with no HTTP call chain.",
      "Durable event discovery with per-consumer receipts; LISTEN/NOTIFY is only a wake-up hint, never needed for correctness.",
      "FOR UPDATE SKIP LOCKED claims, leases, heartbeats, retries, and stale-writer fencing.",
      "Idempotent operator APIs: the idempotency record and the mutation commit in one transaction.",
      "Delivery persists intent before provider I/O; unknown sends are never auto-replayed.",
      "Runs natively under memory-capped systemd units on a Jetson, with a filesystem-only fallback runner.",
    ],
    stack: ["Python", "FastAPI", "PostgreSQL", "psycopg", "Alembic", "asyncio", "Pydantic", "systemd", "uv"],
    terminal: [
      "$ controller reconcile",
      "[controller] 1 job due → scheduled",
      "[exec] claim (SKIP LOCKED) → lease 30s",
      "[exec] heartbeat ok · attempt 1/3",
      "[delivery] intent persisted → sending",
      "[delivery] provider ack · receipt stored",
    ],
  },
  {
    slug: "reporting",
    title: "Shift Reporting and Media Automation",
    tag: "Automation · Data",
    summary: "Scheduled production reports for multiple plant lines.",
    problem: "Each production line needs verified shift reports, diagnosis sheets, and videos delivered on schedule, without double-counting records or filling the disk.",
    result: "One config-driven pipeline builds and delivers reports for every line on shift-based and hourly triggers.", // TODO: add number of lines / manual time saved
    pipeline: [
      { name: "SQLite", note: "records" },
      { name: "Raw CSV", note: "export" },
      { name: "Verified CSV", note: "rule-based" },
      { name: "XLSX", note: "diagnosis" },
      { name: "Video", note: "overlay + shift" },
      { name: "Drive", note: "upload" },
      { name: "Email", note: "SMTP" },
      { name: "Cleanup", note: "safe" },
    ],
    highlights: [
      "Config-driven multi-line setup with shift-based and hourly triggers; half-open time windows so no record is counted twice.",
      "Verification rules with ordered fallbacks.",
      "Destructive cleanup runs only after a successful video build.",
      "Per-run state files for debugging and recovery.",
      "Retention policies and disk-usage alerts.",
    ],
    stack: ["Python", "SQLite", "OpenCV", "CSV/XLSX", "rclone", "SMTP", "systemd", "Linux", "Jetson"],
    terminal: [
      "$ report run --line A --window [06:00,14:00)",
      "[csv] raw export ok",
      "[verify] rules passed (fallback 1 used)",
      "[xlsx] diagnosis written",
      "[video] overlay + shift video built",
      "[upload] drive ok · mail sent · cleanup done",
    ],
  },
  {
    slug: "delivery-cli",
    title: "Multi-Channel Delivery CLI",
    tag: "Tooling",
    summary: "Sends a message with attachments over Email, Slack, Telegram, or WhatsApp.",
    problem: "Automated jobs need one dependable way to send results over several channels and to know exactly what happened.",
    result: "A single CLI call returns one JSON result with exit codes 0/1/2, so callers can branch on success, partial, or failure.",
    pipeline: [
      { name: "CLI", note: "args + YAML" },
      { name: "Validate", note: "dry-run" },
      { name: "Adapter", note: "per provider" },
      { name: "Result", note: "JSON + exit code" },
    ],
    highlights: [
      "One synchronous JSON result with exit codes 0/1/2 for success/partial/failure.",
      "WhatsApp automation via a locked, persistent browser profile (Playwright).",
      "Rotating logs with secret redaction.",
      "Per-service YAML config; secrets come only from environment variables.",
    ],
    stack: ["Python", "Playwright", "SMTP", "Slack API", "Telegram API", "YAML"],
    terminal: [
      "$ deliver --channel slack --file report.xlsx --dry-run",
      "[validate] config ok · secrets from env",
      "$ deliver --channel slack --file report.xlsx",
      "[slack] 1 attachment uploaded",
      '{"ok": true, "channel": "slack", "status": "sent"}',
      "exit 0",
    ],
  },
  {
    slug: "ingestion",
    title: "Industrial Data Ingestion Pipeline",
    tag: "Data Engineering",
    summary: "Automates download, parsing, transformation, and storage of six report types.",
    problem: "Six report types, each with its own layout, must be downloaded, parsed, transformed, and stored consistently.",
    result: "Reports land in Excel and a serverless PostgreSQL database; adding a report type is mostly YAML configuration.", // TODO: add hours saved per week if measured
    pipeline: [
      { name: "Download", note: "Selenium" },
      { name: "Reader", note: "parse" },
      { name: "Processor", note: "YAML mapping" },
      { name: "Repository", note: "persist" },
      { name: "Service", note: "orchestrate" },
      { name: "Output", note: "Excel + PostgreSQL" },
    ],
    highlights: [
      "Selectable modes and date ranges from the CLI.",
      "YAML-driven column and material mapping, so a new report type is mostly configuration.",
      "Layered reader / processor / repository / service design.",
      "Writes to a serverless PostgreSQL database.",
    ],
    stack: ["Python", "Selenium", "PostgreSQL", "YAML", "uv", "cron"],
    terminal: [
      "$ ingest --mode daily --from 2026-01-01 --to 2026-01-07",
      "[download] 6 report types queued",
      "[reader] sheet parsed",
      "[processor] YAML column map applied",
      "[repo] upsert → postgres ok · excel saved",
      "done",
    ],
  },
];

export const facts = [
  { label: "Role", value: profile.headline },
  { label: "Experience", since: profile.startDate }, // auto-computed from startDate, e.g. "1.5+ yrs"
  { label: "Location", value: profile.location },
  { label: "Work style", value: profile.workStyle },
  { label: "Core stack", value: profile.coreStack.join(" · ") },
  { label: "Availability", value: profile.availability },
];

export const stats = [
  { value: projects.length, label: "industry projects" },
  { value: 4, label: "delivery channels", hint: "Email, Slack, Telegram, WhatsApp" },
  { value: 3, label: "edge targets", hint: "Raspberry Pi 5, Jetson Orin Nano, Linux servers" },
  { value: 6, label: "report pipelines" },
];

// Set public: false on any item to hide it.
export const earlierWork = [
  { title: "Nxt Trenz App", url: "https://ntap.ccbp.tech/login" },
  { title: "Appointments App", url: "https://rapo.ccbp.tech/" },
  { title: "App Store", url: "https://ap03.ccbp.tech/" },
  { title: "Money Manager", url: "https://rbal.ccbp.tech/" },
  { title: "Emoji Game", url: "https://rejg.ccbp.tech/" },
  { title: "Company website", note: "React, Bootstrap, EmailJS, Hostinger", url: "https://v-optimai.com", public: true },
];

// Names match project `stack` strings exactly, which powers the cross-filter.
export const skills = [
  { group: "Languages", items: ["Python", "JavaScript", "SQL", "Bash", "HTML", "CSS"] },
  { group: "Backend & Data", items: ["FastAPI", "REST APIs", "PostgreSQL", "SQLite", "Alembic", "Pydantic", "asyncio", "Selenium", "Playwright", "CSV/XLSX"] },
  { group: "Frontend", items: ["React", "Bootstrap", "Streamlit"] },
  { group: "Edge & Ops", items: ["Linux", "systemd", "cron", "Raspberry Pi 5", "Jetson Orin Nano", "rclone", "uv", "Git"] },
  { group: "Vision & ML", items: ["YOLO", "OpenCV", "ByteTrack", "NCNN", "ONNX", "dataset preparation"] },
];

export const experience = [
  {
    role: "Software Engineer",
    company: "V-Optimaise Climate Tech Solutions",
    period: "May 2025 – Present",
    since: profile.startDate,
    points: [
      "Built and maintain a Python data automation platform that ingests, validates, and stores multi-source data in PostgreSQL, using profile-based workflows for each source format.",
      "Designed PostgreSQL and SQLite schemas and SQL queries; integrated REST APIs between internal systems and external data sources.",
      "Automated scheduled CSV/XLSX reporting with retries and failure handling.",
      "Prepared and validated datasets from multiple sources for machine-learning and predictive-analytics workflows.",
      "Deploy and maintain Python services on Linux, Raspberry Pi, and NVIDIA Jetson Orin Nano, including log monitoring and troubleshooting; collaborate via Git branches and code reviews.",
    ],
  },
];

export const education = [
  { title: "B.Tech, Electrical and Electronics Engineering", org: "G. Pulla Reddy Engineering College, Kurnool", period: "2019–2023", note: "CGPA 7.21/10" },
];

export const certifications = [
  { title: "Programming with Python", org: "NxtWave CCBP 4.0" },
  { title: "SQL", org: "NxtWave CCBP 4.0" },
  { title: "React JS", org: "NxtWave CCBP 4.0" },
  { title: "JavaScript Essentials", org: "NxtWave CCBP 4.0" },
  { title: "Software Architecture and Design of Modern Large Scale Systems", org: "Udemy", period: "Aug 2026" },
];
