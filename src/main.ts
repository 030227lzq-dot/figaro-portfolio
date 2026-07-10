import "./styles/styles.css";
import { profile, projects, type Locale } from "./content/portfolio";
import { createLightPillar } from "./three/lightPillar";

const app = document.querySelector<HTMLDivElement>("#app");
const sceneCanvas = document.querySelector<HTMLCanvasElement>("#scene-canvas");

if (!app || !sceneCanvas) {
  throw new Error("页面挂载节点或背景画布缺失");
}

const lightPillar = createLightPillar(sceneCanvas);
window.addEventListener("pagehide", () => lightPillar.dispose(), { once: true });

const labels = {
  zh: {
    navWork: "作品",
    navArchive: "档案",
    navContact: "联系",
    selected: "作品影像库",
    category: "作品板块",
    ritual: "个人信息图",
    contact: "合作联系",
    role: "职责",
    tools: "工具",
    year: "年份",
    duration: "时长",
    language: "EN",
    videoWork: "视频作品",
    featured: "精选"
  },
  en: {
    navWork: "Work",
    navArchive: "Archive",
    navContact: "Contact",
    selected: "Video Work Library",
    category: "Sections",
    ritual: "Ritual Infographic",
    contact: "Contact",
    role: "Role",
    tools: "Tools",
    year: "Year",
    duration: "Duration",
    language: "中文",
    videoWork: "Video Work",
    featured: "Featured"
  }
};

let locale: Locale = "zh";
let videoObserver: IntersectionObserver | undefined;
let blurObserver: IntersectionObserver | undefined;
let borderGlowController: AbortController | undefined;

function text(value: Record<Locale, string>) {
  return value[locale];
}

function assetUrl(path: string) {
  return `${import.meta.env.BASE_URL}${path.replace(/^\/+/, "")}`;
}

function render() {
  const copy = labels[locale];
  const orderedProjects = [...projects].sort(
    (a, b) => Number(a.media.orientation === "wide") - Number(b.media.orientation === "wide")
  );
  document.documentElement.lang = locale === "zh" ? "zh-CN" : "en";

  app.innerHTML = `
    <a class="skip-link" href="#work">${locale === "zh" ? "跳到作品" : "Skip to work"}</a>
    <header class="site-header" aria-label="${locale === "zh" ? "站点导航" : "Site navigation"}">
      <a class="brand-mark" href="#top" aria-label="${text(profile.name)}">
        <span class="brand-sigil">
          <img src="${assetUrl("/media/figaro-logo.png")}" alt="" />
        </span>
        <span>${locale === "zh" ? "Figaro个人视觉档案" : "Figaro Visual Archive"}</span>
      </a>
      <nav class="nav-links">
        <a href="#work">${copy.navWork}</a>
        <a href="#archive">${copy.navArchive}</a>
        <a href="#contact">${copy.navContact}</a>
      </nav>
      <button class="language-toggle" type="button" data-language-toggle aria-label="${locale === "zh" ? "切换到英文" : "Switch to Chinese"}">
        <span>${copy.language}</span>
      </button>
    </header>

    <main id="top">
      <section class="hero-section" aria-labelledby="hero-title">
        <div class="hero-copy">
          <h1 id="hero-title">${locale === "zh" ? "个人艺术档案馆" : "Personal Art Archive"}</h1>
          <p class="hero-title">${text(profile.title)}</p>
        </div>
        <aside class="hero-index" aria-label="${locale === "zh" ? "视觉关键词" : "Visual keywords"}">
          <span>GOTHIC</span>
          <span>MEDIEVAL</span>
          <span>RITUAL</span>
          <span>3D VISUAL</span>
        </aside>
      </section>

      <section class="content-band projects-band" id="work" aria-labelledby="projects-title">
        <div class="section-heading">
          <h2 id="projects-title">${copy.selected}</h2>
        </div>
        <div class="project-grid">
          ${orderedProjects
            .map((project, index) => {
              const displayTitle = locale === "zh" ? `案例V${index + 1}` : `Case V${index + 1}`;
              return `
                <article class="project-card ${project.featured ? "is-featured" : ""}" style="--project-index: ${index}">
                  <div class="project-media project-media-${project.media.orientation}">
                    <video
                      class="project-video"
                      data-src="${assetUrl(project.media.src)}"
                      poster="${assetUrl(project.media.poster)}"
                      muted
                      loop
                      playsinline
                      preload="none"
                      controls
                      aria-label="${displayTitle}"
                    ></video>
                    <div class="media-overlay">
                      <span>${copy.videoWork}</span>
                      ${project.featured ? `<strong>${copy.featured}</strong>` : ""}
                    </div>
                  </div>
                  <div class="project-content">
                    <div class="project-meta">
                      <span>${copy.duration} ${project.media.duration}</span>
                    </div>
                    <h3>${displayTitle}</h3>
                    <p>${locale === "zh" ? "动态视觉短片" : "Dynamic Visual Short Film"}</p>
                    <dl>
                      <div>
                        <dt>${copy.tools}</dt>
                        <dd>${project.tools.join(" / ")}</dd>
                      </div>
                    </dl>
                  </div>
                </article>
              `;
            })
            .join("")}
        </div>
      </section>

      <section class="content-band archive-band" id="archive" aria-label="${copy.ritual}">
        <div class="service-stack" aria-label="${copy.ritual}">
          <p class="service-line service-line-primary">
            ${locale === "zh" ? "三维视觉设计" : "3D Visual Design"}
          </p>
          <p class="service-line service-line-secondary">
            ${locale === "zh" ? "暗黑系视觉设计" : "Dark Visual Design"}
          </p>
          <p class="service-line service-line-tertiary">
            ${locale === "zh" ? "动态LOGO设计" : "Motion Logo Design"}
          </p>
        </div>
      </section>

      <section class="contact-section" id="contact" aria-labelledby="contact-title">
        <div>
          <p class="eyebrow">${copy.contact}</p>
          <h2 id="contact-title">${locale === "zh" ? "Wechat：Figaro0216" : "Wechat: Figaro0216"}</h2>
          <p>${text(profile.contact.availability)}</p>
        </div>
        <address class="contact-panel">
          ${profile.socials
            .map(
              (social) => `
                <span>${social.label}${locale === "zh" ? "：" : ": "}${social.value}</span>
              `
            )
            .join("")}
        </address>
      </section>
    </main>
  `;

  const languageButton = document.querySelector<HTMLButtonElement>("[data-language-toggle]");
  languageButton?.addEventListener("click", () => {
    locale = locale === "zh" ? "en" : "zh";
    render();
  });

  hydrateVideos();
  hydrateBlurText();
  hydrateBorderGlow();
}

function hydrateVideos() {
  videoObserver?.disconnect();
  const videos = Array.from(document.querySelectorAll<HTMLVideoElement>(".project-video"));

  const loadVideo = (video: HTMLVideoElement) => {
    if (!video.dataset.src || video.src) {
      return;
    }
    video.src = video.dataset.src;
    video.load();
  };

  if ("IntersectionObserver" in window) {
    videoObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.target instanceof HTMLVideoElement) {
            loadVideo(entry.target);
            videoObserver?.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "420px 0px" }
    );
    videos.forEach((video) => videoObserver?.observe(video));
  } else {
    videos.forEach(loadVideo);
  }

  videos.forEach((video) => {
    video.addEventListener("pointerenter", () => {
      loadVideo(video);
      video.play().catch(() => undefined);
    });
    video.addEventListener("pointerleave", () => {
      if (!video.paused) {
        video.pause();
      }
    });
  });
}

function hydrateBlurText() {
  blurObserver?.disconnect();

  const targets = Array.from(
    document.querySelectorAll<HTMLElement>(
      "#hero-title, .hero-title, .hero-intro, #projects-title, .project-card h3, .project-content > p, .service-line, #contact-title, .contact-section p"
    )
  );

  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  targets.forEach((target) => {
    const rawText = (target.textContent ?? "").trim();
    target.classList.add("blur-text");
    target.setAttribute("aria-label", rawText);
    target.innerHTML = Array.from(rawText)
      .map((char, index) => {
        const content = char === " " ? "&nbsp;" : escapeHtml(char);
        return `<span class="blur-char" aria-hidden="true" style="--blur-index: ${index}">${content}</span>`;
      })
      .join("");
  });

  if (prefersReducedMotion || !("IntersectionObserver" in window)) {
    targets.forEach((target) => target.classList.add("is-visible"));
    return;
  }

  blurObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && entry.target instanceof HTMLElement) {
          entry.target.classList.add("is-visible");
          blurObserver?.unobserve(entry.target);
        }
      });
    },
    { rootMargin: "0px 0px -8% 0px", threshold: 0.15 }
  );

  targets.forEach((target) => blurObserver?.observe(target));
}

function hydrateBorderGlow() {
  borderGlowController?.abort();
  borderGlowController = new AbortController();
  const { signal } = borderGlowController;
  const cards = Array.from(document.querySelectorAll<HTMLElement>(".project-card"));
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  cards.forEach((card) => {
    if (prefersReducedMotion) {
      return;
    }

    card.addEventListener("pointermove", (event) => {
      const rect = card.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      const nearestEdge = Math.min(x, rect.width - x, y, rect.height - y);
      const edgeRange = Math.min(rect.width, rect.height) * 0.42;
      const edgeStrength = 1 - Math.min(Math.max(nearestEdge / edgeRange, 0), 1);

      card.style.setProperty("--glow-x", `${(x / rect.width) * 100}%`);
      card.style.setProperty("--glow-y", `${(y / rect.height) * 100}%`);
      card.style.setProperty("--glow-opacity", `${0.28 + edgeStrength * 0.72}`);
      card.classList.add("has-border-glow");
    }, { signal });

    card.addEventListener("pointerleave", () => {
      card.classList.remove("has-border-glow");
      card.style.setProperty("--glow-opacity", "0");
    }, { signal });

    card.addEventListener("focusin", () => {
      card.style.setProperty("--glow-x", "50%");
      card.style.setProperty("--glow-y", "0%");
      card.style.setProperty("--glow-opacity", "0.78");
      card.classList.add("has-border-glow");
    }, { signal });

    card.addEventListener("focusout", () => {
      card.classList.remove("has-border-glow");
      card.style.setProperty("--glow-opacity", "0");
    }, { signal });
  });

  document.addEventListener("pointermove", (event) => {
    const activeCard = event.target instanceof Element
      ? event.target.closest<HTMLElement>(".project-card")
      : null;

    cards.forEach((card) => {
      if (card !== activeCard && !card.matches(":focus-within")) {
        card.classList.remove("has-border-glow");
        card.style.setProperty("--glow-opacity", "0");
      }
    });
  }, { passive: true, signal });
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

render();
