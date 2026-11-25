/* ==========================================================
   Renderer multi-sitio
   Carga un sitio desde /api/v1/sites/{slug}/landing y pinta
   hero, tecnologías, proyectos, videos, certificaciones y contacto.
   ========================================================== */
(() => {
  "use strict";

  const API = window.DevBlogAPI;
  const main = document.querySelector("#site-main");
  const state = document.querySelector("#site-state");
  if (!API || !main) return;

  const params = new URLSearchParams(window.location.search);
  const siteId = params.get("site") || "devblog-project";

  const $ = (selector, ctx = document) => ctx.querySelector(selector);
  const $$ = (selector, ctx = document) => [...ctx.querySelectorAll(selector)];

  function safeUrl(value, { image = false } = {}) {
    const raw = String(value || "").trim();
    if (!raw) return "";
    if (image && /^data:image\//i.test(raw)) return raw;
    if (/^(javascript|vbscript|data):/i.test(raw)) return "";
    return raw;
  }

  function element(tag, className, text) {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text !== undefined && text !== null) node.textContent = String(text);
    return node;
  }

  function link(href, className, text, external = false) {
    const anchor = element("a", className, text);
    const url = safeUrl(href);
    if (url) anchor.href = url;
    if (external || /^https?:/i.test(url)) {
      anchor.target = "_blank";
      anchor.rel = "noopener noreferrer";
    }
    return anchor;
  }

  function applyTheme(theme = {}) {
    const root = document.documentElement;
    const accent = theme.accent || "#3df0a8";
    root.style.setProperty("--green", accent);
    root.style.setProperty("--green-dim", accent);
    if (theme.background) root.style.setProperty("--bg", theme.background);
    if (theme.surface) {
      root.style.setProperty("--bg-soft", theme.surface);
      root.style.setProperty("--panel", theme.surface);
    }
    if (theme.text) root.style.setProperty("--text", theme.text);
    if (theme.muted) root.style.setProperty("--muted", theme.muted);
    const bodyFont = theme.body_font || "Manrope";
    const headingFont = theme.heading_font || bodyFont;
    root.style.setProperty("--sans", `'${String(bodyFont).replace(/^['"]|['"]$/g, "")}', system-ui, sans-serif`);
    root.style.setProperty("--heading-font", `'${String(headingFont).replace(/^['"]|['"]$/g, "")}', system-ui, sans-serif`);
    root.style.setProperty("--radius", `${Number(theme.radius) || 0}px`);
  }

  function sectionShell(id, label, title, content) {
    const section = element("section", "section site-section");
    section.id = id;
    const wrap = element("div", "wrap");
    if (label || title) {
      const head = element("div", "section-head");
      const mono = element("p", "mono-label");
      const strong = element("b", "", "//");
      mono.append(strong, document.createTextNode(label || ""));
      const heading = element("h2", "title", title || label);
      head.append(mono, heading);
      wrap.append(head);
    }
    if (content) wrap.append(content);
    section.append(wrap);
    return section;
  }

  function renderHero(site, content) {
    const hero = content.hero || {};
    const section = element("section", "site-hero");
    section.id = "inicio";
    const wrap = element("div", "wrap site-hero__grid");
    const intro = element("div", "intro");

    const eyebrow = element("p", "eyebrow");
    const number = element("b", "", "//");
    eyebrow.append(number, document.createTextNode(hero.eyebrow || site.name));
    intro.append(eyebrow);

    const h1 = element("h1", "", `${hero.first_name || ""} `);
    const lastName = element("span", "", hero.last_name || "");
    h1.append(lastName);
    intro.append(h1);

    if (hero.role) {
      const role = element("p", "site-hero__role", hero.role);
      if (hero.location) {
        const location = element("em", "", ` ${hero.location}`);
        role.append(location);
      }
      intro.append(role);
    }

    if (hero.tagline) intro.append(element("p", "site-hero__tagline", hero.tagline));

    const cta = element("div", "site-hero__cta");
    if (hero.cta_label) {
      cta.append(link(hero.cta_url || "#contacto", "btn btn--solid", `${hero.cta_label} →`));
    }
    if (hero.note) cta.append(element("small", "", hero.note));
    if (cta.childNodes.length) intro.append(cta);

    wrap.append(intro);

    const photoUrl = safeUrl(hero.photo_url, { image: true });
    if (photoUrl) {
      const figure = element("figure", "site-hero__photo");
      const img = element("img");
      img.src = photoUrl;
      img.alt = `${hero.first_name || site.name} ${hero.last_name || ""}`.trim();
      img.loading = "eager";
      figure.append(img);
      wrap.append(figure);
    } else {
      const panel = element("aside", "site-hero__panel");
      panel.append(
        element("span", "mono-label", "// SITIO ADMINISTRADO"),
        element("strong", "", site.name),
        element("p", "", site.description || "Contenido gestionado desde DevBlog_ CMS."),
        element("small", "", site.domain || "")
      );
      wrap.append(panel);
    }

    section.append(wrap);
    return section;
  }

  function renderTechnologies(content) {
    const items = Array.isArray(content.technologies) ? content.technologies : [];
    if (!items.length) return null;
    const list = element("ul", "tech");
    items.forEach((tech) => {
      const li = element("li");
      const icon = element("span", "tech__icon", tech.icon || String(tech.name || "").slice(0, 2).toUpperCase());
      icon.style.setProperty("--c", tech.color || "var(--green)");
      icon.setAttribute("aria-hidden", "true");
      li.append(icon, document.createTextNode(tech.name || ""));
      list.append(li);
    });
    return sectionShell(
      "tecnologias",
      content.sections?.technologies?.label || "Stack",
      content.sections?.technologies?.title || "Tecnologías",
      list
    );
  }

  function renderProjects(content) {
    const items = Array.isArray(content.projects) ? content.projects : [];
    if (!items.length) return null;
    const grid = element("div", "grid-3");
    items.forEach((project, index) => {
      const card = element(project.url ? "a" : "article", "card");
      if (project.url) {
        const url = safeUrl(project.url);
        if (url) {
          card.href = url;
          card.target = "_blank";
          card.rel = "noopener noreferrer";
        }
      }
      card.style.setProperty("--d", `${index * 0.08}s`);
      const art = element("div", `site-art site-art--${project.art || "dots"}`);
      const lines = element("div", "site-art__lines");
      lines.append(element("i"), element("i"), element("i"));
      art.append(lines);
      const body = element("div", "card__body");
      if (project.badge) body.append(element("span", "badge", project.badge));
      body.append(element("h3", "", project.title || "Proyecto"));
      if (project.description) body.append(element("p", "", project.description));
      if (project.link_label) body.append(element("span", "card__link", `${project.link_label} ↗`));
      card.append(art, body);
      grid.append(card);
    });
    return sectionShell(
      "proyectos",
      content.sections?.projects?.label || "Trabajo",
      content.sections?.projects?.title || "Proyectos",
      grid
    );
  }

  function videoEmbed(url) {
    const youtube = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([\w-]{6,})/i);
    if (youtube) {
      const iframe = element("iframe");
      iframe.src = `https://www.youtube.com/embed/${youtube[1]}`;
      iframe.title = "Video de YouTube";
      iframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture";
      iframe.allowFullscreen = true;
      iframe.loading = "lazy";
      return iframe;
    }
    const vimeo = url.match(/vimeo\.com\/(?:video\/)?(\d+)/i);
    if (vimeo) {
      const iframe = element("iframe");
      iframe.src = `https://player.vimeo.com/video/${vimeo[1]}`;
      iframe.title = "Video de Vimeo";
      iframe.allow = "autoplay; fullscreen; picture-in-picture";
      iframe.allowFullscreen = true;
      iframe.loading = "lazy";
      return iframe;
    }
    const video = element("video");
    video.controls = true;
    video.preload = "metadata";
    video.playsInline = true;
    video.src = url;
    return video;
  }

  function renderVideos(content) {
    const items = Array.isArray(content.videos) ? content.videos : [];
    if (!items.length) return null;
    const grid = element("div", "site-videos");
    items.forEach((video) => {
      const url = safeUrl(video.url);
      if (!url) return;
      const card = element("article", "site-video");
      const aspect = video.aspect === "9:16" ? "is-9-16" : video.aspect === "1:1" ? "is-1-1" : "is-16-9";
      const media = element("div", `site-video__media ${aspect}`);
      const embed = videoEmbed(url);
      if (embed.tagName === "VIDEO") {
        const poster = safeUrl(video.poster, { image: true });
        if (poster) embed.poster = poster;
        if (video.captions_url) {
          const track = element("track");
          track.kind = "captions";
          track.label = "Español";
          track.srclang = "es";
          track.src = safeUrl(video.captions_url);
          track.default = true;
          embed.append(track);
        }
      }
      media.append(embed);
      const body = element("div", "site-video__body");
      body.append(element("h3", "", video.title || "Video"));
      if (video.description) body.append(element("p", "", video.description));
      if (video.cta_label) {
        body.append(link(video.cta_url || "#contacto", "card__link", `${video.cta_label} ↗`));
      }
      card.append(media, body);
      grid.append(card);
    });
    if (!grid.childNodes.length) return null;
    return sectionShell(
      "videos",
      content.sections?.videos?.label || "Video",
      content.sections?.videos?.title || "Videos",
      grid
    );
  }

  function renderCertifications(content) {
    const items = Array.isArray(content.certifications) ? content.certifications : [];
    if (!items.length) return null;
    const grid = element("div", "grid-3");
    items.forEach((cert, index) => {
      const card = element(cert.url ? "a" : "article", "card cert");
      if (cert.url) {
        card.href = safeUrl(cert.url);
        card.target = "_blank";
        card.rel = "noopener noreferrer";
      }
      card.style.setProperty("--d", `${index * 0.06}s`);
      const body = element("div", "card__body");
      if (cert.issuer) body.append(element("p", "cert__issuer", cert.issuer));
      body.append(element("h3", "", cert.title || "Certificación"));
      if (cert.tag) body.append(element("span", "card__link", cert.tag));
      card.append(body);
      grid.append(card);
    });
    return sectionShell(
      "certificaciones",
      content.sections?.certifications?.label || "Certificaciones",
      content.sections?.certifications?.title || "Certificaciones",
      grid
    );
  }

  function renderContact(site, content) {
    const contact = content.contact || {};
    const section = element("section", "section contact");
    section.id = "contacto";
    const wrap = element("div", "wrap");
    if (contact.kicker) wrap.append(element("p", "mono-label contact__kicker", contact.kicker));
    const title = element("h2", "");
    title.append(
      document.createTextNode(contact.title || "¿Tienes una idea? "),
      element("span", "", contact.accent || "Hablemos.")
    );
    wrap.append(title);
    if (contact.message) wrap.append(element("p", "contact__message", contact.message));

    const links = element("div", "contact__links");
    const entries = [];
    if (contact.github) entries.push(["GitHub", contact.github]);
    if (contact.linkedin) entries.push(["LinkedIn", contact.linkedin]);
    if (contact.email) entries.push(["Correo", `mailto:${contact.email}`]);
    entries.forEach(([label, href]) => {
      links.append(link(href, "", label));
    });
    if (entries.length) {
      links.style.gridTemplateColumns = `repeat(${entries.length}, 1fr)`;
      wrap.append(links);
    }

    const footer = element("div", "footer-bar");
    footer.append(
      element("span", "", contact.footer || `© 2026 ${site.name} — creado con intención`),
      element("span", "", "Administrado con DevBlog_ CMS")
    );
    wrap.append(footer);
    section.append(wrap);
    return section;
  }

  function renderNotes(site, content) {
    if (!["blog", "project"].includes(site.kind)) return null;
    const linkUrl = safeUrl(site.kind === "blog" ? `https://${site.domain}` : "https://mi-blog-dev.vercel.app/");
    if (!linkUrl) return null;
    const wrap = element("div");
    const cta = link(linkUrl, "btn btn--ghost site-note-link", "Leer el blog ↗");
    wrap.append(
      element("p", "admin__lead", "Las publicaciones, el CMS y las métricas viven en el sitio del blog."),
      cta
    );
    return sectionShell(
      "notas",
      content.sections?.notes?.label || "Bitácora",
      content.sections?.notes?.title || "Notas y Experimentación",
      wrap
    );
  }

  function renderSite(site, content) {
    applyTheme(site.theme || {});
    document.title = `${site.name} — ${site.description || "Sitio administrado"}`;
    const meta = $('meta[name="description"]');
    if (meta) meta.content = site.description || "Landing administrada con DevBlog_ CMS.";
    const status = $("#site-status");
    if (status) status.textContent = site.name;
    const footerText = $("#site-footer-text");
    if (footerText) footerText.textContent = site.description || "Landing administrada con DevBlog_ CMS.";

    main.replaceChildren();
    main.append(renderHero(site, content));

    const tech = renderTechnologies(content);
    if (tech) main.append(tech);
    const projects = renderProjects(content);
    if (projects) main.append(projects);
    const videos = renderVideos(content);
    if (videos) main.append(videos);
    const certs = renderCertifications(content);
    if (certs) main.append(certs);
    const notes = renderNotes(site, content);
    if (notes) main.append(notes);
    main.append(renderContact(site, content));

    const nav = $("#site-menu");
    if (nav) {
      const has = (id) => Boolean(document.getElementById(id));
      nav.querySelector('a[href="#proyectos"]')?.toggleAttribute("hidden", !has("proyectos"));
      nav.querySelector('a[href="#videos"]')?.toggleAttribute("hidden", !has("videos"));
      const blogLink = nav.querySelector('a[href*="mi-blog-dev"]');
      if (blogLink) blogLink.hidden = !["blog", "project"].includes(site.kind);
    }
  }

  function renderError(error) {
    main.replaceChildren();
    const box = element("div", "site-state");
    box.append(
      element("strong", "", "No se pudo cargar este sitio."),
      element("p", "", String(error?.message || "Revisa la URL o vuelve al portafolio."))
    );
    const back = link("https://mi-landing-devblog.vercel.app/", "btn btn--ghost", "Volver al portafolio");
    box.append(back);
    main.append(box);
  }

  async function load() {
    try {
      const data = await API.publicApi.getSiteLanding(siteId);
      renderSite(data.site, data.content || {});
    } catch (error) {
      console.warn("No se pudo cargar el sitio:", error);
      renderError(error);
    }
  }

  load();
})();
