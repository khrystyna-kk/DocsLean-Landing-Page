// Shared dashboard components — single source of truth.
// Used by dashboard-preview.html (standalone) and index.html (hero's
// HeroCard1/HeroCard2 + the Deep-dive section's full dashboard). Never
// copy this markup by hand into another file — mount it from here instead,
// so a design change here propagates everywhere it's used.

// The "D" mark's path data. Reused below for the dashboard rail's logo.
// The SAME path is also drawn independently in index.html's navbar/footer
// logo and in assets/favicon.svg — those two can't pull from this constant
// (favicon.svg is a static file loaded before any JS runs, and the navbar
// needs to render immediately, not wait on a script) — if this path ever
// changes, update it in all 3 places by hand and keep them pixel-identical.
const LOGO_MARK_PATH_D = 'M0 14.2V0H4.9C7.20667 0 8.98 0.62 10.22 1.86C11.46 3.08667 12.08 4.84 12.08 7.12C12.08 9.38667 12.08 14.2 12.08 14.2C10.5 14.2 7.28667 14.2 5.02 14.2H0ZM3.04 11.64H4.9C6.27333 11.64 7.28667 11.2733 7.94 10.54C8.60667 9.79333 8.94 8.64667 8.94 7.1C8.94 5.55333 8.60667 4.41333 7.94 3.68C7.28667 2.93333 6.27333 2.56 4.9 2.56H3.04V11.64Z';

// animated=true (hero, the default) counts up from 0 on scroll-into-view
// (see script.js's initCountUp). animated=false (used inside dashboardHTML()
// below) renders the plain final value — the same card is static wherever
// it appears as part of the full dashboard (Deep-dive, dashboard-preview.html).
function scoreCardHTML(animated = true) {
  const value = animated
    ? '<span data-count-to="62">0</span>%'
    : '62%';
  return `
    <div class="stat-card stat-card--neutral">
      <i class="ph ph-gauge stat-card__icon" aria-hidden="true"></i>
      <span class="stat-card__label">Health Score</span>
      <span class="stat-card__value">${value}</span>
      <div class="stat-card__bar-track"><span class="stat-card__bar-fill" style="width:62%; background: var(--color-primary);"></span></div>
    </div>
  `;
}

// "Top 5" isn't a literal top-5-by-severity slice of the 40 High-risk pages —
// real prioritization also weighs things like how outdated/how-often-visited
// a page is, so one Medium item (Access control matrix) sitting among mostly
// High ones here is intentional, not a data bug. The colored badges on each
// row are what communicate actual severity at a glance; the panel doesn't
// need to be homogeneous to do that.
function priorityPanelHTML() {
  return `
    <div class="panel">
      <div class="plan-tabs">
        <span class="plan-tab plan-tab--active">Top 5 Tasks</span>
        <span class="plan-tab plan-tab--inactive">Action Plan</span>
      </div>

      <div class="plan-section-head">
        <h4>Priority Action Items</h4>
        <span class="icon-circle-outline"><i class="ph ph-arrow-up-right" aria-hidden="true"></i></span>
      </div>

      <div class="plan-item--expanded task-detail">
        <div class="task-detail__row">
          <span class="mock-checkbox" aria-hidden="true"></span>
          <span class="title">Onboarding: system access</span>
          <span class="badge badge--critical">High</span>
          <i class="ph ph-caret-up chevron" aria-hidden="true"></i>
        </div>
        <div class="task-detail__field--reason">
          <div class="field-label"><i class="ph ph-flag" aria-hidden="true"></i>Reason:</div>
          <p class="task-detail__explain">Conflicts with the Security Policy, which was updated three weeks ago and now requires a different access-request flow.</p>
        </div>
        <div class="task-detail__field--solution">
          <div class="field-label field-label--accent"><i class="ph ph-lightbulb-filament" aria-hidden="true"></i>Solution:</div>
          <ol class="task-detail__solution">
            <li><span class="task-detail__solution-link">Open the flagged file<i class="ph ph-arrow-square-out" aria-hidden="true"></i></span></li>
            <li>Fix each highlighted issue — specific recommendations are included for every one.</li>
            <li>Notify your team once it's updated, so everyone works from the latest version.</li>
          </ol>
        </div>
      </div>

      <div class="plan-item--collapsed">
        <span class="mock-checkbox" aria-hidden="true"></span>
        <span class="title">Incident response runbook</span>
        <span class="badge badge--critical">High</span>
        <i class="ph ph-caret-down chevron" aria-hidden="true"></i>
      </div>
      <div class="plan-item--collapsed">
        <span class="mock-checkbox" aria-hidden="true"></span>
        <span class="title">Security policy review</span>
        <span class="badge badge--critical">High</span>
        <i class="ph ph-caret-down chevron" aria-hidden="true"></i>
      </div>
      <div class="plan-item--collapsed">
        <span class="mock-checkbox" aria-hidden="true"></span>
        <span class="title">Access control matrix</span>
        <span class="badge badge--warning">Medium</span>
        <i class="ph ph-caret-down chevron" aria-hidden="true"></i>
      </div>
      <div class="plan-item--collapsed">
        <span class="mock-checkbox" aria-hidden="true"></span>
        <span class="title">Data retention policy</span>
        <span class="badge badge--critical">High</span>
        <i class="ph ph-caret-down chevron" aria-hidden="true"></i>
      </div>
    </div>
  `;
}

function pagesTableRowsHTML() {
  const rows = [
    ['Onboarding: system access', '620 words', 'Engineering', 'critical', 'High', 'Mar 12, 2026'],
    ['Incident response runbook', '1,840 words', 'Engineering', 'critical', 'High', 'Jan 28, 2026'],
    ['Security policy review', '980 words', 'Security', 'critical', 'High', 'May 30, 2026'],
    ['Access control matrix', '540 words', 'Security', 'warning', 'Medium', 'Feb 9, 2026'],
    ['Data retention policy', '760 words', 'Security', 'critical', 'High', 'Apr 22, 2026'],
    ['Disaster recovery plan', '2,100 words', 'Engineering', 'warning', 'Medium', 'Dec 3, 2025'],
  ];
  const rowHTML = ([name, words, space, level, levelLabel, edited]) => `
    <tr>
      <td><span class="page-name"><i class="ph ph-file" aria-hidden="true"></i><span class="meta"><span class="page-name__title">${name}</span><span class="word-count">${words}</span></span></span></td>
      <td class="page-space">${space}</td>
      <td><span class="badge badge--${level}">${levelLabel}</span></td>
      <td class="page-edited">${edited}</td>
      <td><div class="actions-row"><span class="icon-btn" title="Add to plan"><i class="ph ph-list-plus" aria-hidden="true"></i></span><span class="icon-btn"><i class="ph ph-arrow-square-out" aria-hidden="true"></i></span><span class="icon-btn"><i class="ph ph-trash" aria-hidden="true"></i></span></div></td>
    </tr>
  `;
  const ghostRow = `
    <tr class="pages-ghost-row">
      <td><span class="page-name"><i class="ph ph-file" aria-hidden="true"></i><span class="meta"><span class="page-name__title">Employee onboarding guide</span><span class="word-count">1,120 words</span></span></span></td>
      <td class="page-space">Engineering</td>
      <td><span class="badge badge--good">Low</span></td>
      <td class="page-edited">Jun 6, 2026</td>
      <td><div class="actions-row"><span class="icon-btn" title="Add to plan"><i class="ph ph-list-plus" aria-hidden="true"></i></span><span class="icon-btn"><i class="ph ph-arrow-square-out" aria-hidden="true"></i></span><span class="icon-btn"><i class="ph ph-trash" aria-hidden="true"></i></span></div></td>
    </tr>
  `;
  return rows.map(rowHTML).join('') + ghostRow;
}

function dashboardHTML() {
  return `
    <div class="dashboard">
      <nav class="rail" aria-label="Primary">
        <div class="rail__top">
          <div class="rail__logo" aria-hidden="true">
            <svg viewBox="0 0 13 15" width="14" height="16"><path d="${LOGO_MARK_PATH_D}" fill="currentColor"/></svg>
          </div>
          <!-- Text wordmark shown only on mobile (rail collapses to a
               horizontal top bar there) — the icon-only mark alone reads
               ambiguous once it's no longer next to the vertical icon rail
               giving it "app nav" context, same reasoning as the landing
               page's own navbar using the full wordmark. -->
          <div class="rail__logo-text" aria-hidden="true">
            <svg viewBox="0 0 13 15" width="13" height="15"><path d="${LOGO_MARK_PATH_D}" fill="currentColor"/></svg><span>ocsLean</span>
          </div>
          <!-- Decorative only — the whole dashboard is a static mockup, so
               this doesn't open a real sidebar. It represents where mobile
               nav access would live in the real product. -->
          <span class="rail__menu-btn" aria-hidden="true"><i class="ph ph-list" aria-hidden="true"></i></span>
        </div>
        <div class="rail__nav">
          <span class="rail__icon rail__icon--active" title="Dashboard" aria-label="Dashboard"><i class="ph ph-squares-four" aria-hidden="true"></i></span>
          <span class="rail__icon" title="All Pages" aria-label="All Pages"><i class="ph ph-file-text" aria-hidden="true"></i></span>
          <span class="rail__icon" title="Plan" aria-label="Plan"><i class="ph ph-list-checks" aria-hidden="true"></i></span>
          <span class="rail__divider" aria-hidden="true"></span>
          <span class="rail__icon" title="Settings" aria-label="Settings"><i class="ph ph-gear" aria-hidden="true"></i></span>
          <span class="rail__icon" title="Help" aria-label="Help"><i class="ph ph-chat-circle-text" aria-hidden="true"></i></span>
          <span class="rail__spacer"></span>
        </div>
      </nav>

      <div class="dashboard__main">
        <div class="dashboard__header">
          <h1 class="page-title">Dashboard</h1>
          <div class="dashboard__header-right">
            <div class="search">
              <i class="ph ph-magnifying-glass" aria-hidden="true"></i>
              <span class="search__field">Search pages...</span>
            </div>
            <div class="header-group">
              <span class="header-icon"><i class="ph ph-bell" aria-hidden="true"></i><span class="dot"></span></span>
              <div class="avatar">OM</div>
            </div>
          </div>
        </div>

        <div class="dashboard__body">
          <h2 class="section-heading">Documentation Health Overview</h2>
          <p class="stats-subtitle">Based on 184 pages, auto-scanned every week</p>

          <div class="stats-row">
            ${scoreCardHTML(false)}
            <div class="stat-card stat-card--critical">
              <i class="ph ph-warning-circle stat-card__icon" aria-hidden="true"></i>
              <span class="stat-card__label">High-risk pages</span>
              <span class="stat-card__value">40</span>
              <div class="stat-card__bar-track"><span class="stat-card__bar-fill" style="width:22%"></span></div>
            </div>
            <div class="stat-card stat-card--warning">
              <i class="ph ph-warning stat-card__icon" aria-hidden="true"></i>
              <span class="stat-card__label">Medium-risk pages</span>
              <span class="stat-card__value">60</span>
              <div class="stat-card__bar-track"><span class="stat-card__bar-fill" style="width:33%"></span></div>
            </div>
            <div class="stat-card stat-card--good">
              <i class="ph ph-check-circle stat-card__icon" aria-hidden="true"></i>
              <span class="stat-card__label">Low-risk pages</span>
              <span class="stat-card__value">84</span>
              <div class="stat-card__bar-track"><span class="stat-card__bar-fill" style="width:45%"></span></div>
            </div>
          </div>

          <div class="dashboard__cols">
            <div class="panel">
              <div class="panel__head">
                <div>
                  <h3>All Pages <span class="count-inline">184 found</span></h3>
                  <div class="panel__subtitle">Ranked by risk, updated after every scan.</div>
                </div>
                <div class="toolbar">
                  <span class="pill-btn"><i class="ph ph-funnel" aria-hidden="true"></i>Filter</span>
                  <span class="pill-btn"><i class="ph ph-arrows-down-up" aria-hidden="true"></i>Sort</span>
                  <span class="icon-btn icon-btn--framed"><i class="ph ph-dots-three" aria-hidden="true"></i></span>
                </div>
              </div>
              <div class="table-frame">
                <div class="table-sides">
                  <table class="pages">
                    <thead>
                      <tr><th>Name</th><th>Teamspace</th><th>Risk</th><th>Edited</th><th>Actions</th></tr>
                    </thead>
                    <tbody>
                      ${pagesTableRowsHTML()}
                    </tbody>
                  </table>
                </div>
                <div class="panel__footer"><span>View all 184 pages<i class="ph ph-arrow-right" aria-hidden="true"></i></span></div>
              </div>
            </div>

            ${priorityPanelHTML()}
          </div>
        </div>
      </div>
    </div>
  `;
}

// .dashboard's internal nowrap table content doesn't reflow to fit a
// container narrower than its native ~1440px — max-width:100% alone just
// clips it (see .dashboard-frame's comment in main.css). This measures
// each .dashboard-frame and scales its .dashboard-frame__scale child down
// to fit, only at desktop widths — below the 1025px breakpoint,
// dashboard.css's own responsive rules restructure the layout for real
// instead of shrinking a miniature.
const DESKTOP_BREAKPOINT = 1025;
function fitScaledDashboards() {
  document.querySelectorAll('.dashboard-frame__scale').forEach((scaleEl) => {
    const frame = scaleEl.closest('.dashboard-frame');
    if (!frame) return;
    if (window.innerWidth < DESKTOP_BREAKPOINT) {
      scaleEl.style.transform = '';
      frame.style.height = '';
      return;
    }
    const ratio = frame.clientWidth / 1440;
    scaleEl.style.transform = `scale(${ratio})`;
    frame.style.height = `${scaleEl.offsetHeight * ratio}px`;
  });
}

// The table panel and the plan panel ("All Pages" / "Priority Action
// Items") must match heights, but CSS align-items:stretch used to force
// the SHORTER plan panel up to the TALLER table panel's height, leaving
// unused space after its last row. This measures the plan panel's own
// natural height instead and applies it to the table panel — the table
// panel's existing flex-grow (.table-frame) + margin-top:auto
// (.panel__footer) already know how to absorb a target height gracefully,
// so reusing that (just driven by a different number) needs no new CSS.
function fitDashboardColumns() {
  document.querySelectorAll('.dashboard__cols').forEach((cols) => {
    const [tablePanel, planPanel] = cols.querySelectorAll(':scope > .panel');
    if (!tablePanel || !planPanel) return;
    if (window.innerWidth < DESKTOP_BREAKPOINT) {
      tablePanel.style.height = '';
      return;
    }
    tablePanel.style.height = `${planPanel.offsetHeight}px`;
  });
}

// HeroCard1 (.hero-card--score, its real unscaled size) and HeroCard2
// (.hero-card--panel, shrunk to HALF its real size via transform:scale —
// a true proportional shrink, like Figma's scale tool, not a narrower
// column) form an asymmetric cluster: HeroCard1 sits mostly to HeroCard2's
// left/outside, with only HeroCard1's own right portion overlapping
// HeroCard2's lower-left quadrant.
//
// Measured, not guessed: .hero-card--panel's offsetWidth/offsetHeight
// report its TRUE pre-transform size (CSS transforms never change the
// layout box), so the scaled size and the composition math below both
// come from the actual rendered content, not a constant that would drift
// the moment the panel's copy changes.
// 0.5 (half size) x 1.5 (requested increase) = 0.75 of true size.
// (The extra -15%/"start at content's middle" composition was tried and
// reverted — this is back to the prior, stable version.)
const HERO_CARD_SCALE = 0.75;
// Must match .hero-card--score's transform:scale() in main.css exactly.
const SCORE_CARD_SCALE = 0.85;
const HERO_OVERHANG = 140; // how much of the score card sits left of/outside the panel
function layoutHeroCards() {
  const visual = document.querySelector('.hero__visual');
  const wrap = document.querySelector('.hero-card--panel-wrap');
  const panel = wrap?.querySelector('.hero-card--panel');
  const score = document.querySelector('.hero-card--score');
  if (!visual || !wrap || !panel || !score) return;

  if (window.innerWidth < DESKTOP_BREAKPOINT) {
    // Let the ≤1024px media query's own static/stacked rules take over —
    // clear every inline style this function sets at desktop width.
    [visual, wrap, panel, score].forEach((el) => {
      el.style.width = '';
      el.style.height = '';
      el.style.top = '';
      el.style.left = '';
      el.style.transform = '';
    });
    return;
  }

  const panelW = panel.offsetWidth;   // true size — transform doesn't affect this
  const panelH = panel.offsetHeight;
  const wrapW = panelW * HERO_CARD_SCALE;
  const wrapH = panelH * HERO_CARD_SCALE;
  wrap.style.width = `${wrapW}px`;
  wrap.style.height = `${wrapH}px`;

  const scoreH = score.offsetHeight;
  // Vertically centered on the panel's BOTTOM half (its "closed tasks"
  // region): that half spans wrapH/2..wrapH, center = wrapH * 0.75.
  const scoreTop = (wrapH * 0.75) - (scoreH / 2);
  score.style.top = `${scoreTop}px`;
  score.style.left = '0px';

  visual.style.width = `${HERO_OVERHANG + wrapW}px`;
  visual.style.height = `${Math.max(wrapH, scoreTop + scoreH)}px`;
}

// Mounts every [data-component] placeholder found in the current page.
function mountDashboardComponents() {
  document.querySelectorAll('[data-component="score-card"]').forEach((el) => {
    el.innerHTML = scoreCardHTML();
  });
  document.querySelectorAll('[data-component="priority-panel"]').forEach((el) => {
    el.innerHTML = priorityPanelHTML();
  });
  document.querySelectorAll('[data-component="dashboard"]').forEach((el) => {
    el.innerHTML = dashboardHTML();
  });
  // Any [data-count-to] just added to the DOM needs the count-up hookup
  // (see script.js) — dispatched so script.js can stay the one place
  // that owns that animation, instead of duplicating it here too.
  document.dispatchEvent(new CustomEvent('dashboard-components-mounted'));
  fitScaledDashboards();
  layoutHeroCards();
  fitDashboardColumns();
}

window.addEventListener('resize', fitScaledDashboards);
window.addEventListener('resize', layoutHeroCards);
window.addEventListener('resize', fitDashboardColumns);

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', mountDashboardComponents);
} else {
  mountDashboardComponents();
}
