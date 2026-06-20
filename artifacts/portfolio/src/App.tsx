import { useEffect, useRef } from "react";
import { Mail, FileText, ArrowUpRight, Github, Linkedin } from "lucide-react";

/* ─────────────────────────────────────────────────────────────────────────────
   EDIT YOUR INFO HERE
   ───────────────────────────────────────────────────────────────────────────── */

const PROFILE_IMAGE = ""; // ← paste a URL or drop a photo into the project (e.g. "/photo.jpg") and put the path here

const NAME = "Ian Martinez Work"; // ← your full name
const TAGLINE = "Building Across Borders · Strategy, Data & Technology"; // ← one-line intro

const GITHUB_URL = "https://github.com/ianamwork"; // ← your GitHub URL
const LINKEDIN_URL = "https://linkedin.com/in/ian-martinez-work/"; // ← your LinkedIn URL
const EMAIL = "iwork@berkeley.edu"; // ← your email address
const RESUME_URL = "https://ian-martinez-work.tiiny.site"; // ← link to your resume PDF

const ABOUT_TEXT = `I think in systems and operate across borders. Fluent in English, Spanish, and French, I've built my career around connecting people, markets, and technology across Latin America, the U.S., and Europe.
I'm a UC Berkeley Economics graduate with experience at high-growth startups — FP&A and automation work at Mechanical Orchard, and now payments expansion across Latin America on the Global Payments team at TikTok/ByteDance. I'm AI-native: I use Python, SQL, and Claude Code to build and direct ML workflows, and I'm increasingly focused on orchestrating multiple AI agents toward a single outcome.
Four years co-captaining Cal Men's Club Soccer taught me what strategy decks miss — execution depends on trust and people who know their roles. I'm looking for work in growth, strategy, data, and strategic finance, where global fluency and technical range actually compound.`;
// ← edit the paragraph above with your own bio

const PROJECTS = [
  {
    title: "2026 FIFA World Cup Prediction Model",
    description:
      "Full prediction pipeline for the 2026 FIFA World Cup — a calibrated XGBoost model trained on 15,507 international matches, layered on a Poisson GLM baseline to simulate the tournament 10,000 times. Includes a separate X-Factor analysis on 3.25M Wyscout match events to identify playing-style features that distinguish winners beyond Elo ratings.",
    tags: ["Python", "XGBoost", "Poisson GLM", "Pandas", "Sports Analytics"],
    links: [
      {
        label: "GitHub",
        url: "https://wc2026-scanner.vercel.app/",
      },
    ],
  },
  {
    title: "Sovereign Credit Rating Model and Colonial Impact",
    description:
      "Project predicts S&P sovereign ratings from macroeconomic fundamentals using ordered logit and XGBoost across 118 countries. Extended the original with colonial history variables and regional deviation analysis.",
    tags: ["Python", "Econometrics", "Machine Learning"],
    links: [
      {
        label: "GitHub",
        url: "https://github.com/ianamwork/sovereign-credit-ratings",
      },
      // { label: "Report", url: "https://your-report-link.com" }, // ← uncomment to add a second link
    ],
  },
  {
    title: "ROSTR",
    description:
      "Co-founding a SaaS workforce management platform for event security staffing. Automates guard deployment, shift filling, and California labor compliance — replacing the spreadsheets and group chats ops managers rely on today.",
    tags: ["SaaS", "Operations", "Startup"],
    links: [
      { label: "App v1", url: "https://tryrostr.lovable.app/" },
      { label: "App v2", url: "https://rostrapp.lovable.app/" }, // ← second link!
    ],
  },
  {
    title: "Contador",
    description:
      "A personal finance tracker that connects to your bank via Plaid, auto-categorizes transactions into spending buckets, and shows a running monthly balance with charts and weekly summaries. (Message me for password)",
    tags: ["React", "Plaid API", "Finance"],
    links: [{ label: "Live", url: "https://perfix.replit.app" }],
  },
  {
    title: "Finance-Lab",
    description:
      "**WIP** FinanceLab is a financial modeling practice tool for college students preparing for data and finance interviews, featuring guided quiz challenges across DCF, comps, and statement analysis using real data from 12 public companies.",
    tags: ["FPnA", "Data Science", "Economics"],
    links: [
      // { label: "Live", url: "https://your-link.com" }, // ← uncomment when ready
    ],
  },
];
// ← add or remove objects in the array above to add/remove project cards

/* ─────────────────────────────────────────────────────────────────────────────
   INTERACTIVE BACKGROUND
   ───────────────────────────────────────────────────────────────────────────── */

function useMouseGlow() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mouse = useRef({ x: -999, y: -999 });
  const glows = useRef<
    { x: number; y: number; life: number; maxLife: number; size: number }[]
  >([]);
  const animRef = useRef<number>(0);

  useEffect(() => {
    const canvas = document.getElementById("glow-canvas") as HTMLCanvasElement;
    if (!canvas) return;
    canvasRef.current = canvas;
    const ctx = canvas.getContext("2d")!;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    let lastSpawn = 0;
    const onMouseMove = (e: MouseEvent) => {
      mouse.current = { x: e.clientX, y: e.clientY };
      const now = Date.now();
      if (now - lastSpawn > 28) {
        lastSpawn = now;
        glows.current.push({
          x: e.clientX + (Math.random() - 0.5) * 40,
          y: e.clientY + (Math.random() - 0.5) * 40,
          life: 0,
          maxLife: 90 + Math.random() * 60,
          size: 80 + Math.random() * 220,
        });
        if (glows.current.length > 48) glows.current.splice(0, 1);
      }
    };
    window.addEventListener("mousemove", onMouseMove);

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      /* static ambient blobs */
      const ambients = [
        { x: canvas.width * 0.15, y: canvas.height * 0.2, r: 360, a: 0.045 },
        { x: canvas.width * 0.82, y: canvas.height * 0.65, r: 280, a: 0.035 },
        { x: canvas.width * 0.5, y: canvas.height * 0.85, r: 220, a: 0.028 },
      ];
      for (const b of ambients) {
        const g = ctx.createRadialGradient(b.x, b.y, 0, b.x, b.y, b.r);
        g.addColorStop(0, `rgba(40,160,70,${b.a})`);
        g.addColorStop(1, "rgba(0,0,0,0)");
        ctx.fillStyle = g;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }

      /* mouse-following glow orbs */
      for (const glow of glows.current) {
        glow.life++;
        const t = glow.life / glow.maxLife;
        const ease = t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
        const opacity = Math.sin(Math.PI * t) * 0.22;
        const gr = ctx.createRadialGradient(
          glow.x,
          glow.y,
          0,
          glow.x,
          glow.y,
          glow.size * (0.6 + ease * 0.4),
        );
        gr.addColorStop(0, `rgba(60,200,90,${opacity})`);
        gr.addColorStop(0.45, `rgba(30,130,55,${opacity * 0.38})`);
        gr.addColorStop(1, "rgba(0,0,0,0)");
        ctx.fillStyle = gr;
        ctx.beginPath();
        ctx.arc(glow.x, glow.y, glow.size * (0.6 + ease * 0.4), 0, Math.PI * 2);
        ctx.fill();
      }
      glows.current = glows.current.filter((g) => g.life < g.maxLife);

      /* persistent cursor bloom */
      if (mouse.current.x > 0) {
        const mx = mouse.current.x,
          my = mouse.current.y;
        const cg = ctx.createRadialGradient(mx, my, 0, mx, my, 120);
        cg.addColorStop(0, "rgba(80,220,100,0.11)");
        cg.addColorStop(0.5, "rgba(40,160,70,0.05)");
        cg.addColorStop(1, "rgba(0,0,0,0)");
        ctx.fillStyle = cg;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }

      animRef.current = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouseMove);
      cancelAnimationFrame(animRef.current);
    };
  }, []);
}

/* ─────────────────────────────────────────────────────────────────────────────
   CUSTOM CURSOR
   ───────────────────────────────────────────────────────────────────────────── */
function useCursorRing() {
  useEffect(() => {
    const ring = document.getElementById("cursor-ring");
    if (!ring) return;
    let raf = 0;
    let tx = -100,
      ty = -100;
    let cx = -100,
      cy = -100;

    const onMove = (e: MouseEvent) => {
      tx = e.clientX;
      ty = e.clientY;
    };
    window.addEventListener("mousemove", onMove);

    const animate = () => {
      cx += (tx - cx) * 0.18;
      cy += (ty - cy) * 0.18;
      ring.style.left = cx + "px";
      ring.style.top = cy + "px";
      raf = requestAnimationFrame(animate);
    };
    animate();
    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);
}

/* ─────────────────────────────────────────────────────────────────────────────
   NAV
   ───────────────────────────────────────────────────────────────────────────── */
function Nav() {
  return (
    <nav data-testid="nav" className="fixed top-0 left-0 right-0 z-50">
      <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
        <a
          href="#hero"
          className="font-serif text-sm font-medium text-moss"
          data-testid="nav-logo"
        >
          {NAME.split(" ")[0]}
        </a>
        <div className="hidden sm:flex items-center gap-8">
          <a href="#about" className="nav-link" data-testid="nav-about">
            About
          </a>
          <a href="#projects" className="nav-link" data-testid="nav-projects">
            Projects
          </a>
          <a href="#contact" className="nav-link" data-testid="nav-contact">
            Contact
          </a>
        </div>
        <a
          href={RESUME_URL}
          className="btn-primary py-1.5 px-4 text-xs"
          data-testid="nav-resume"
        >
          Resume <FileText size={13} />
        </a>
      </div>
    </nav>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   HERO
   ───────────────────────────────────────────────────────────────────────────── */
function Hero() {
  return (
    <section
      id="hero"
      className="relative z-10 min-h-screen flex flex-col justify-center px-6 pt-16 pb-16 max-w-5xl mx-auto"
      data-testid="section-hero"
    >
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-12">
        {/* Text */}
        <div className="flex-1">
          <p className="section-label mb-6 fade-up fade-up-1">Portfolio</p>
          <h1 className="hero-name mb-5 fade-up fade-up-2">{NAME}</h1>
          <p className="text-sage text-lg leading-relaxed max-w-xl mb-10 fade-up fade-up-3">
            {TAGLINE}
          </p>
          <div className="flex flex-wrap gap-3 fade-up fade-up-4">
            <a
              href={GITHUB_URL}
              className="btn-primary"
              data-testid="hero-github"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Github size={15} /> GitHub
            </a>
            <a
              href={LINKEDIN_URL}
              className="btn-secondary"
              data-testid="hero-linkedin"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Linkedin size={15} /> LinkedIn
            </a>
            <a
              href={RESUME_URL}
              className="btn-secondary"
              data-testid="hero-resume"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FileText size={15} /> Resume
            </a>
          </div>
        </div>
        {/* Profile photo — only shown when PROFILE_IMAGE is set */}
        {PROFILE_IMAGE && (
          <div className="fade-up fade-up-2 shrink-0 flex justify-center md:justify-end">
            <div
              className="rounded-2xl overflow-hidden"
              style={{
                width: 220,
                height: 260,
                border: "1px solid rgba(74,140,74,0.20)",
                boxShadow: "0 0 40px rgba(74,160,74,0.08)",
              }}
            >
              <img
                src={PROFILE_IMAGE}
                alt={NAME}
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   ABOUT
   ───────────────────────────────────────────────────────────────────────────── */
function About() {
  return (
    <section
      id="about"
      className="relative z-10 py-24 px-6 max-w-5xl mx-auto"
      data-testid="section-about"
    >
      <hr className="divider mb-20" />
      <div className="grid md:grid-cols-[1fr_2fr] gap-16 items-start">
        <div>
          <p className="section-label mb-3">About</p>
          <h2 className="font-serif text-3xl font-medium text-foreground leading-snug">
            Who I Am
          </h2>
        </div>
        <div className="space-y-4">
          <p
            className="text-muted-foreground leading-relaxed text-[0.95rem]"
            style={{ color: "hsl(130, 8%, 62%)" }}
          >
            {ABOUT_TEXT}
          </p>
          <div className="flex flex-wrap gap-2 pt-2">
            {[
              "Finance",
              "Strategy",
              "Startups",
              "AI",
              "Data",
              "Technology",
              "Economics",
            ].map((t) => (
              <span
                key={t}
                className="tag"
                data-testid={`tag-${t.toLowerCase()}`}
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   PROJECTS
   ───────────────────────────────────────────────────────────────────────────── */
function Projects() {
  return (
    <section
      id="projects"
      className="relative z-10 py-24 px-6 max-w-5xl mx-auto"
      data-testid="section-projects"
    >
      <hr className="divider mb-20" />
      <div className="mb-14">
        <p className="section-label mb-3">Work</p>
        <h2 className="font-serif text-3xl font-medium text-foreground leading-snug">
          What I'm Building
        </h2>
      </div>
      <div className="grid sm:grid-cols-2 gap-5">
        {PROJECTS.map((p, i) => (
          <div
            key={i}
            className="glass-card rounded-xl p-7 flex flex-col"
            data-testid={`card-project-${i}`}
          >
            <h3 className="font-serif text-lg font-medium text-foreground mb-3">
              {p.title}
            </h3>
            <p
              className="text-sm leading-relaxed mb-5 flex-1"
              style={{ color: "hsl(130, 8%, 54%)" }}
            >
              {p.description}
            </p>
            <div className="flex flex-wrap gap-1.5 mb-4">
              {p.tags.map((tag) => (
                <span key={tag} className="tag">
                  {tag}
                </span>
              ))}
            </div>
            {p.links.length > 0 && (
              <div
                className="flex flex-wrap gap-2 pt-3"
                style={{ borderTop: "1px solid rgba(74,140,74,0.10)" }}
              >
                {p.links.map((lnk) => (
                  <a
                    key={lnk.label}
                    href={lnk.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs font-medium px-3 py-1.5 rounded-md transition-all duration-200"
                    style={{
                      color: "hsl(142, 48%, 52%)",
                      border: "1px solid rgba(74,140,74,0.20)",
                      background: "transparent",
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLElement).style.background =
                        "rgba(74,160,74,0.10)";
                      (e.currentTarget as HTMLElement).style.borderColor =
                        "rgba(74,160,74,0.40)";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLElement).style.background =
                        "transparent";
                      (e.currentTarget as HTMLElement).style.borderColor =
                        "rgba(74,140,74,0.20)";
                    }}
                    data-testid={`link-project-${i}-${lnk.label}`}
                  >
                    {lnk.label} <ArrowUpRight size={11} />
                  </a>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   CONTACT / FOOTER
   ───────────────────────────────────────────────────────────────────────────── */
function Contact() {
  return (
    <footer
      id="contact"
      className="relative z-10 py-24 px-6 max-w-5xl mx-auto"
      data-testid="section-contact"
    >
      <hr className="divider mb-20" />
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-10">
        <div>
          <p className="section-label mb-3">Contact</p>
          <h2 className="font-serif text-3xl font-medium text-foreground mb-3">
            Get In Touch
          </h2>
          <a
            href={`mailto:${EMAIL}`}
            className="text-sage text-sm hover:text-moss transition-colors duration-200"
            data-testid="contact-email"
          >
            {EMAIL}
          </a>
        </div>
        <div className="flex items-center gap-3">
          <a
            href={GITHUB_URL}
            className="social-btn"
            aria-label="GitHub"
            data-testid="contact-github"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Github size={17} />
          </a>
          <a
            href={LINKEDIN_URL}
            className="social-btn"
            aria-label="LinkedIn"
            data-testid="contact-linkedin"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Linkedin size={17} />
          </a>
          <a
            href={`mailto:${EMAIL}`}
            className="social-btn"
            aria-label="Email"
            data-testid="contact-email-btn"
          >
            <Mail size={17} />
          </a>
          <a
            href={RESUME_URL}
            className="social-btn"
            aria-label="Resume"
            data-testid="contact-resume"
          >
            <FileText size={17} />
          </a>
        </div>
      </div>
      <div
        className="mt-16 pt-6 border-t"
        style={{ borderColor: "rgba(74,140,74,0.09)" }}
      >
        <p className="text-xs" style={{ color: "hsl(130,8%,35%)" }}>
          © {new Date().getFullYear()} {NAME}
        </p>
      </div>
    </footer>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   ROOT
   ───────────────────────────────────────────────────────────────────────────── */
export default function App() {
  useMouseGlow();
  useCursorRing();

  return (
    <>
      {/* Interactive background canvas */}
      <canvas id="glow-canvas" aria-hidden="true" />

      {/* Custom cursor ring */}
      <div id="cursor-ring" aria-hidden="true" />

      <main>
        <Hero />
        <About />
        <Projects />
        <Contact />
      </main>
    </>
  );
}
