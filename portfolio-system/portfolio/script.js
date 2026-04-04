// ============================================================
//  script.js — Renderer. Do NOT edit to update content.
//              Edit data/profile.js, services.js, projects.js
// ============================================================

(function () {
  "use strict";

  /* ── HELPERS ── */
  const $ = (sel) => document.querySelector(sel);
  const $$ = (sel) => document.querySelectorAll(sel);

  function waLink(number, message) {
    return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
  }

  function escHtml(str) {
    return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  }

  /* ── HIGHLIGHT HEADLINE ── */
  function buildHeadline(headline, highlight) {
    if (!highlight) return escHtml(headline);
    const escaped = escHtml(headline);
    const escapedHL = escHtml(highlight);
    return escaped.replace(
      escapedHL,
      `<span class="underline-green">${escapedHL}</span>`
    );
  }

  /* ── RENDER: NAV ── */
  function renderNav() {
    const { initials, contact } = PROFILE;
    $(".nav-logo").innerHTML = `${escHtml(initials)}<span>.</span>`;
    $(".nav-cta").href = waLink(contact.whatsapp, "Hi Luqman, I'd like to hire you for a GIS project.");
  }

  /* ── RENDER: HERO ── */
  function renderHero() {
    const { tagline, headline, headlineHighlight, subheadline, contact, mapBadge, mapStat } = PROFILE;

    $(".hero-tag").innerHTML = `<span class="hero-dot"></span>${escHtml(tagline)}`;
    $(".hero-headline").innerHTML = buildHeadline(headline, headlineHighlight);
    $(".hero-sub").textContent = subheadline;

    $(".btn-hire").href = waLink(contact.whatsapp, "Hi Luqman, I'd like to hire you for a GIS project.");
    $(".map-label").textContent = mapBadge;
    $(".map-stat").textContent = mapStat;
  }

  /* ── RENDER: SERVICES ── */
  function renderServices() {
    const grid = $(".services-grid");
    if (!grid) return;

    grid.innerHTML = SERVICES.map((s) => `
      <a href="${waLink(PROFILE.contact.whatsapp, s.waMessage)}"
         target="_blank"
         rel="noopener noreferrer"
         class="service-card reveal">
        <div class="service-icon">${s.icon}</div>
        <div class="service-title">${escHtml(s.title)}</div>
        <div class="service-benefit">${escHtml(s.benefit)}</div>
        <div class="service-price">
          ${escHtml(s.price)} · Delivery: ${escHtml(s.delivery)}
          <span class="wa-badge">💬 Chat on WhatsApp</span>
        </div>
      </a>
    `).join("");
  }

  /* ── RENDER: STATS ── */
  function renderStats() {
    const row = $(".stats-row");
    if (!row) return;
    row.innerHTML = PROFILE.stats.map((s) => `
      <div class="stat-item reveal">
        <div class="stat-num">${escHtml(s.value)}</div>
        <div class="stat-label">${escHtml(s.label)}</div>
      </div>
    `).join("");
  }

  /* ── PROJECT VISUAL THEMES ── */
  const VISUALS = {
    map: `
      <div class="pv-overlay"></div>
      <div class="pv-content">
        <div class="pv-dot-grid">
          ${Array.from({length:20}, (_,i) =>
            `<span class="${[0,2,4,6,8,10,12,13,16,19].includes(i) ? 'active' : ''}"></span>`
          ).join("")}
        </div>
      </div>
      <div class="pv-line" style="top:40%;left:0;right:0;"></div>
      <div class="pv-line" style="top:65%;left:0;right:0;opacity:0.3;"></div>`,

    chart: `
      <div class="pv-overlay"></div>
      <div class="pv-content" style="flex-direction:column;gap:4px;padding:16px;">
        <div style="display:flex;gap:4px;align-items:flex-end;">
          ${[30,50,40,65,35,55].map((h,i) =>
            `<div class="pv-bar" style="height:${h}px;${i===1||i===3?'background:var(--green);opacity:0.9;':''}"></div>`
          ).join("")}
        </div>
      </div>`,

    dashboard: `
      <div class="pv-overlay"></div>
      <div class="pv-content">
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:6px;padding:16px;">
          ${[
            {e:"📋",c:"rgba(56,189,248",b:"0.1",br:"0.2"},
            {e:"📈",c:"rgba(52,211,153",b:"0.1",br:"0.2"},
            {e:"🗂️",c:"rgba(245,158,11",b:"0.1",br:"0.2"},
            {e:"🎯",c:"rgba(56,189,248",b:"0.1",br:"0.2"},
          ].map(d =>
            `<div style="background:${d.c},${d.b});border:1px solid ${d.c},${d.br});border-radius:6px;height:40px;display:flex;align-items:center;justify-content:center;font-size:1.2rem;">${d.e}</div>`
          ).join("")}
        </div>
      </div>`,
  };

  /* ── RENDER: PROJECTS ── */
  function renderProjects() {
    const grid = $(".projects-grid");
    if (!grid) return;

    grid.innerHTML = PROJECTS.map((p) => {
      const hasImage = p.image && p.image.trim() !== "";
      const visualContent = hasImage
        ? `<img src="${p.image}" alt="${escHtml(p.title)}" style="width:100%;height:100%;object-fit:cover;">`
        : `<div class="pv-sim v-${p.visualTheme}">${VISUALS[p.visualTheme] || VISUALS.map}</div>`;

      const linkHtml = p.link
        ? `<a href="${p.link}" target="_blank" rel="noopener noreferrer" class="project-link">View Project →</a>`
        : "";

      return `
        <div class="project-card reveal">
          <div class="project-visual">${visualContent}</div>
          <div class="project-info">
            <div class="project-tag">${escHtml(p.tag)}</div>
            <div class="project-title">${escHtml(p.title)}</div>
            <div class="project-result">${escHtml(p.description)}</div>
            <div class="project-stack">
              ${p.tools.map(t => `<span class="stack-chip">${escHtml(t)}</span>`).join("")}
            </div>
            ${linkHtml}
          </div>
        </div>`;
    }).join("");
  }

  /* ── RENDER: TOOLS ── */
  function renderTools() {
    const row = $(".tools-row");
    if (!row) return;
    row.innerHTML = PROFILE.tools.map((t) => `
      <div class="tool-item reveal">
        <span class="tool-icon">${t.icon}</span> ${escHtml(t.name)}
      </div>
    `).join("");
  }

  /* ── RENDER: CTA ── */
  function renderCta() {
    const { contact, name } = PROFILE;
    const wa = waLink(contact.whatsapp, `Hi ${name}, I'd like to start a project with you.`);

    $(".btn-start").href = wa;

    const links = [
      { icon: "💬", label: "WhatsApp", href: wa, target: "_blank" },
      { icon: "🌐", label: "Fiverr",   href: contact.fiverr,   target: "_blank" },
      { icon: "💼", label: "LinkedIn", href: contact.linkedin, target: "_blank" },
      { icon: "💻", label: "GitHub",   href: contact.github,   target: "_blank" },
      { icon: "✉️", label: "Email",    href: `mailto:${contact.email}`, target: "_self" },
    ];

    $(".cta-links").innerHTML = links.map((l) => `
      <a href="${l.href}" target="${l.target}" rel="noopener noreferrer" class="link-chip">
        <span>${l.icon}</span> ${l.label}
      </a>
    `).join("");
  }

  /* ── RENDER: FOOTER ── */
  function renderFooter() {
    const { name, footerYear, footerTagline } = PROFILE;
    $(".footer-copy").textContent = `© ${footerYear} ${name} · GIS & Location Intelligence · Malaysia`;
    $(".footer-tagline").textContent = footerTagline;
  }

  /* ── SCROLL REVEAL ── */
  function initReveal() {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          setTimeout(() => entry.target.classList.add("visible"), i * 60);
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08 });

    // Re-query after render
    $$(".reveal").forEach((el) => obs.observe(el));
  }

  /* ── INIT ── */
  function init() {
    renderNav();
    renderHero();
    renderServices();
    renderStats();
    renderProjects();
    renderTools();
    renderCta();
    renderFooter();
    // Reveal runs after DOM is populated
    requestAnimationFrame(initReveal);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
