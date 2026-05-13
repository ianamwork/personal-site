import { useEffect, useRef } from "react";
import { Mail, FileText, ArrowUpRight, Github, Linkedin } from "lucide-react";

/* ─────────────────────────────────────────────────────────────────────────────
   EDIT YOUR INFO HERE
   ───────────────────────────────────────────────────────────────────────────── */

const NAME = "Ian Martinez Work"; // ← your full name
const TAGLINE = "Building · Finance, Strategy & Technology"; // ← one-line intro

const GITHUB_URL = "https://github.com/ianamwork"; // ← your GitHub URL
const LINKEDIN_URL = "https://linkedin.com/in/ian-martinez-work/"; // ← your LinkedIn URL
const EMAIL = "iwork@berkeley.edu"; // ← your email address
const RESUME_URL = "https://ian-martinez-work.tiiny.site"; // ← link to your resume PDF

const ABOUT_TEXT = `I'm a builder at heart — studying Economics at UC Berkeley and Sciences Po Paris has taught me to think rigorously about systems, but what I really love is making things. Whether it's a payments product, a workforce platform, or a market model, I'm drawn to the moment when an idea becomes something real. I'm currently focused on payments infrastructure in Latin America and building Rostr, a workforce management platform for event security. Always working on something.`;
// ← edit the paragraph above with your own bio

const PROJECTS = [
  {
    title: "Sovereign Credit Rating Model and Colonial Impact",
      description:
        "Project predicts S&P sovereign ratings from macroeconomic fundamentals using ordered logit and XGBoost across 118 countries. Extended the original with colonial history variables and regional deviation analysis.",
      tags: ["Python", "Econometrics", "Machine Learning"],
      link: "https://github.com/ianamwork/sovereign-credit-ratings", // ← link to your GitHub repo or the report PDF
  },
  {
    title: "ROSTR",
    description:
      "Co-founding a SaaS workforce management platform for event security staffing. Automates guard deployment, shift filling, and California labor compliance — replacing the spreadsheets and group chats ops managers rely on today.",
    tags: ["SaaS", "Operations", "Startup"],
    link: "https://tryrostr.lovable.app/",
  },
  {
    title: "Contador",
      description:
        "A personal finance tracker that connects to your bank via Plaid, auto-categorizes transactions into spending buckets, and shows a running monthly balance with charts and weekly summaries.",
      tags: ["React", "Plaid API", "Finance"],
      link: "https://perfix.replit.app", // ← link to the app or repo
  },
  {
    title: "Finance-Lab",
      description:
        "FinanceLab is a financial modeling practice tool for college students preparing for data and finance interviews, featuring guided quiz challenges across DCF, comps, and statement analysis using real data from 12 public companies. It also includes a free-form spreadsheet workbench for hands-on modeling practice, with optional sign-in to track scores and progress over time.",
      tags: ["FPnA", "Data Science", "Economics"],
      link: "underconstruction", // ← link to a GitHub repo or portfolio page
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
      className="relative z-10 min-h-screen flex flex-col justify-center px-6 pt-24 pb-16 max-w-5xl mx-auto"
      data-testid="section-hero"
    >
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
          <a
            key={i}
            href={p.link}
            target="_blank"
            rel="noopener noreferrer"
            className="glass-card rounded-xl p-7 block group"
            data-testid={`card-project-${i}`}
          >
            <div className="flex items-start justify-between mb-4">
              <h3 className="font-serif text-lg font-medium text-foreground group-hover:text-moss transition-colors duration-200">
                {p.title}
              </h3>
              <ArrowUpRight
                size={16}
                className="text-muted-foreground group-hover:text-moss transition-colors duration-200 mt-0.5 shrink-0"
              />
            </div>
            <p
              className="text-sm leading-relaxed mb-5"
              style={{ color: "hsl(130, 8%, 54%)" }}
            >
              {p.description}
            </p>
            <div className="flex flex-wrap gap-1.5">
              {p.tags.map((tag) => (
                <span key={tag} className="tag">
                  {tag}
                </span>
              ))}
            </div>
          </a>
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

      <Nav />
      <main>
        <Hero />
        <About />
        <Projects />
        <Contact />
      </main>
    </>
  );
}
