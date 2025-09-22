document.addEventListener('DOMContentLoaded', () => {
  const baseMeta = document.querySelector('meta[name="site-base"]');
  const siteUrlMeta = document.querySelector('meta[name="site-url"]');
  const base = (baseMeta ? baseMeta.getAttribute('content') : '/') || '/';
  const b = base.endsWith('/') ? base.slice(0, -1) : base; // e.g. "/uap-evidence-site"
  const siteUrl = siteUrlMeta ? siteUrlMeta.getAttribute('content') : location.origin;

  // --- analytics helper (now logs to GoatCounter as a normal "page" so it's easy to see) ---
  function trackEmailCTA() {
    // Plausible (if you ever add it)
    if (typeof window.plausible === 'function') window.plausible('Email CTA Click');
    // GoatCounter (FREE): show as a normal page so it appears under "Top pages"
    if (window.goatcounter && typeof window.goatcounter.count === 'function') {
      window.goatcounter.count({
        path: '/action/email-cta',   // <-- you'll see THIS in GoatCounter's "Top pages" list
        title: 'Email CTA'
        // note: no "event: true" here on purpose, so it shows in Top pages
      });
    }
    // GA4 fallback (if you ever add it)
    if (typeof window.gtag === 'function') window.gtag('event', 'email_cta_click', { page_location: location.href, page_title: document.title });
  }

  // build CTA wherever <div data-cta> appears
  const blocks = document.querySelectorAll('[data-cta]');
  if (!blocks.length) return;

  const headline = 'Read Enough? Ready to put your weight behind the push for the BBC to investigate?';
  const btnText  = 'Get your email started with a single click';

  blocks.forEach(el => {
    const card = document.createElement('section');
    card.className = 'card';

    const h3 = document.createElement('h3');
    h3.textContent = headline;

    const p = document.createElement('p');
    p.textContent = 'Add a short personal intro (optional), then we’ll open your email app with the rest pre-filled. We’ll also show a ready-made BBC complaint on the next page if you prefer that route.';

    // personal intro box
    const label = document.createElement('label');
    label.setAttribute('for', 'cta-intro');
    label.style.display = 'block';
    label.style.margin = '8px 0 4px';
    label.textContent = 'Your personal intro (optional):';

    const textarea = document.createElement('textarea');
    textarea.id = 'cta-intro';
    textarea.rows = 4;
    textarea.placeholder = 'Why this matters to you (e.g., climate/energy, transparency, public safety, scientific curiosity)…';
    textarea.style.width = '100%';
    textarea.style.padding = '8px';
    textarea.style.borderRadius = '8px';
    textarea.style.border = '1px solid #24283a';
    textarea.style.background = '#0b0c12';
    textarea.style.color = '#e6e6e6';

    const hint = document.createElement('p');
    hint.className = 'muted';
    hint.style.marginTop = '6px';
    hint.textContent = 'Tip: one or two sentences is perfect. You can edit more in your email app.';

    const btn = document.createElement('button');
    btn.className = 'btn';
    btn.id = 'cta-email-bbc';
    btn.type = 'button';
    btn.style.marginTop = '12px';
    btn.textContent = btnText;

    btn.addEventListener('click', (e) => {
      e.preventDefault();
      trackEmailCTA();

      const intro = (textarea.value || '').trim();

      const to = 'newsonline@bbc.co.uk';
      const subject = 'Request for investigation: Unidentified Anomalous Phenomena (UAP) evidence';

      const bodyLines = [
        'Hello BBC News team,',
        '',
      ];

      if (intro) {
        bodyLines.push(intro, '');
      }

      bodyLines.push(
        'I’m writing to ask the BBC to assign an investigative team to the UAP (Unidentified Anomalous Phenomena) topic.',
        'This site collates primary sources, sworn testimony, and official documents to help jump-start your review:',
        siteUrl,
        '',
        'Key items include: the UAP Disclosure Act text & negotiations, sworn testimony (2023–2025) with certified transcripts, official Navy/DoD imagery and records, and UK/US FOIA repositories.',
        '',
        'I believe the public interest merits Watergate-level rigour—whichever way the facts fall.',
        '',
        'Many thanks,',
        '[Your name]'
      );

      const mailto = `mailto:${encodeURIComponent(to)}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(bodyLines.join('\n'))}`;

      // Open email, then route to complaint-helper for the optional complaint text
      window.location.href = mailto;
      setTimeout(() => {
        window.location.href = `${b}/complaint-helper/`;
      }, 600);
    });

    card.appendChild(h3);
    card.appendChild(p);
    card.appendChild(label);
    card.appendChild(textarea);
    card.appendChild(hint);
    card.appendChild(btn);

    el.replaceWith(card);
  });
});
