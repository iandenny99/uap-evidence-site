document.addEventListener('DOMContentLoaded', () => {
  const baseMeta = document.querySelector('meta[name="site-base"]');
  const siteUrlMeta = document.querySelector('meta[name="site-url"]');
  const base = (baseMeta ? baseMeta.getAttribute('content') : '/') || '/';
  const b = base.endsWith('/') ? base.slice(0, -1) : base; // e.g. "/uap-evidence-site"
  const siteUrl = siteUrlMeta ? siteUrlMeta.getAttribute('content') : location.origin;

  // --- Helper: track analytics events if provider is present ---
  function trackEmailCTA() {
    // Plausible (privacy-friendly)
    if (typeof window.plausible === 'function') {
      window.plausible('Email CTA Click');
    }
    // GoatCounter fallback (optional; add its script separately if you ever want it)
    if (window.goatcounter && typeof window.goatcounter.count === 'function') {
      window.goatcounter.count({ path: 'email-cta', title: document.title, event: true });
    }
    // GA4 fallback (if gtag present)
    if (typeof window.gtag === 'function') {
      window.gtag('event', 'email_cta_click', { page_location: location.href, page_title: document.title });
    }
  }

  // --- Build CTA block wherever <div data-cta> appears ---
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
    p.textContent = 'We’ve drafted the core message. Add your intro, then send via your email app. A companion “complaint” text is ready too.';

    const btn = document.createElement('button');
    btn.className = 'btn';
    btn.id = 'cta-email-bbc';
    btn.type = 'button';
    btn.textContent = btnText;

    btn.addEventListener('click', (e) => {
      e.preventDefault();
      trackEmailCTA(); // <<— counts the click

      const to = 'newsonline@bbc.co.uk';
      const subject = 'Request for investigation: Unidentified Anomalous Phenomena (UAP) evidence';
      const bodyLines = [
        'Hello BBC News team,',
        '',
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
      ];
      const mailto = `mailto:${encodeURIComponent(to)}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(bodyLines.join('\n'))}`;

      // Open email, then route to complaint-helper for the optional complaint text
      // Using a small delay helps mail clients open first.
      window.location.href = mailto;
      setTimeout(() => {
        window.location.href = `${b}/complaint-helper/`;
      }, 600);
    });

    card.appendChild(h3);
    card.appendChild(p);
    card.appendChild(btn);
    el.replaceWith(card);
  });
});
