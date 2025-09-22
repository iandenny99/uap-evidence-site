document.addEventListener('DOMContentLoaded', () => {
  const baseMeta = document.querySelector('meta[name="site-base"]');
  const siteUrlMeta = document.querySelector('meta[name="site-url"]');
  const base = (baseMeta ? baseMeta.getAttribute('content') : '/') || '/';
  const b = base.endsWith('/') ? base.slice(0, -1) : base; // e.g. "/uap-evidence-site"
  const siteUrl = siteUrlMeta ? siteUrlMeta.getAttribute('content') : location.origin;

  // ---- analytics helper (FREE: GoatCounter) ----
  function ping(path, title) {
    if (window.goatcounter && typeof window.goatcounter.count === 'function') {
      window.goatcounter.count({ path, title });
    }
  }
  function trackEmailCTA() { ping('/action/email-cta', 'Email CTA'); }
  function trackShareX() { ping('/action/share-x', 'Share: X'); }
  function trackShareFB() { ping('/action/share-fb', 'Share: Facebook'); }
  function trackShareWA() { ping('/action/share-whatsapp', 'Share: WhatsApp'); }
  function trackShareTG() { ping('/action/share-telegram', 'Share: Telegram'); }
  function trackShareMail() { ping('/action/share-email', 'Share: Email'); }
  function trackCopy() { ping('/action/share-copy', 'Share: Copy link'); }

  // ---- build CTA wherever <div data-cta> appears ----
  const blocks = document.querySelectorAll('[data-cta]');
  if (!blocks.length) return;

  const headline = 'Read Enough? Ready to put your weight behind the push for the BBC to investigate?';
  const btnText  = 'Email Panorama in one click';

  // Rotate a few subject lines to avoid simple filters (you can edit/add)
  const subjectOptions = [
    'Programme proposal: Panorama investigation into UAP (Unidentified Anomalous Phenomena)',
    'Story tip for Panorama: evidence-led UAP investigation',
    'Panorama investigation request: UAP primary sources & sworn testimony',
    'Public-interest proposal for Panorama: UAP evidence review'
  ];
  const defaultSubject = subjectOptions[Math.floor(Math.random() * subjectOptions.length)];

  blocks.forEach(el => {
    // ----- main CTA card -----
    const card = document.createElement('section');
    card.className = 'card';

    const h3 = document.createElement('h3');
    h3.textContent = headline;

    const p = document.createElement('p');
    p.textContent = 'Add a short personal intro (optional). You can also edit the email subject below before it opens in your mail app.';

    // Editable subject
    const subjLabel = document.createElement('label');
    subjLabel.setAttribute('for', 'cta-subject');
    subjLabel.style.display = 'block';
    subjLabel.style.margin = '8px 0 4px';
    subjLabel.textContent = 'Email subject (you can edit):';

    const subjInput = document.createElement('input');
    subjInput.id = 'cta-subject';
    subjInput.type = 'text';
    subjInput.value = defaultSubject;
    subjInput.style.width = '100%';
    subjInput.style.padding = '8px';
    subjInput.style.borderRadius = '8px';
    subjInput.style.border = '1px solid #24283a';
    subjInput.style.background = '#0b0c12';
    subjInput.style.color = '#e6e6e6';

    // Personal intro box
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

      const intro   = (textarea.value || '').trim();
      const subject = (subjInput.value || defaultSubject).trim();

      // NEW: send to Panorama
      const to = 'panorama.reply@bbc.co.uk';

      // Build the Panorama-focused email body
      const bodyLines = [
        'Hello Panorama team,',
        ''
      ];
      if (intro) bodyLines.push(intro, '');

      bodyLines.push(
        'I’m writing to ask Panorama to undertake an evidence-led investigation into UAP (Unidentified Anomalous Phenomena). There is now a critical mass of primary sources and sworn testimony that warrants Panorama’s rigorous, public-interest reporting.',
        '',
        'A single hub with the key documents and sources is here:',
        siteUrl,
        '',
        'Highlights you can verify directly from official records linked on that page:',
        '- UAP Disclosure Act (2023–2025): official texts modelled on the JFK Records Act, including an eminent-domain clause in early drafts; the strongest provisions were pared back — the legislative trail is documented.',
        '- Sworn testimony (2023–2025): three U.S. House oversight hearings with certified transcripts, videos and prepared statements from military/intelligence witnesses and journalists.',
        '- Instrumented encounters: DoD/Navy-released FLIR/ATFLIR videos (FLIR1, GIMBAL, GOFAST) and AARO’s official imagery page, with pointers to radar/sensor logs.',
        '- FOI/FOIA repositories: UK National Archives (historic MoD files) and ODNI/NARA/AARO/NASA in the U.S., plus filing guidance.',
        '',
        'For a UK starting point, the site lists recommended contacts (e.g., Christopher Sharp at Liberation Times for UK leads and policy context), alongside witnesses, scientists, and named gatekeepers with source links.',
        '',
        'I believe the public interest merits Panorama-level scrutiny — in the open, with documents — whichever way the facts fall.',
        '',
        'If this reaches the wrong inbox, please forward to the appropriate editor/producer and let me know whom I should address.',
        '',
        'Many thanks,',
        '[Your name]',
        '[Town/City]',
        '[Phone (optional)]',
        '[I’m happy to be contacted by the BBC about this]'
      );

      const mailto = `mailto:${to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(bodyLines.join('\n'))}`;
      window.location.href = mailto;

      // After opening the mail client, send visitors to the complaint helper (optional)
      setTimeout(() => { window.location.href = `${b}/complaint-helper/`; }, 600);
    });

    card.appendChild(h3);
    card.appendChild(p);
    card.appendChild(subjLabel);
    card.appendChild(subjInput);
    card.appendChild(label);
    card.appendChild(textarea);
    card.appendChild(hint);
    card.appendChild(btn);

    // ----- Share block (kept) -----
    const share = document.createElement('section');
    share.className = 'card';
    const sh = document.createElement('h3');
    sh.textContent = 'Share this campaign (1 tap)';
    const sp = document.createElement('p');
    sp.textContent = 'Help this reach more people. These buttons open your app ready to share.';

    const row = document.createElement('p');

    function makeLink(text, href, onClick) {
      const a = document.createElement('a');
      a.className = 'badge';
      a.textContent = text;
      a.href = href;
      a.target = '_blank';
      a.rel = 'noopener';
      a.style.marginRight = '8px';
      a.addEventListener('click', onClick);
      return a;
    }

    const shareText = 'Please ask the BBC (Panorama) to investigate UAP with primary sources and sworn testimony:';
    const u = encodeURIComponent(siteUrl);
    const t = encodeURIComponent(shareText);

    row.appendChild(makeLink('X / Twitter', `https://twitter.com/intent/tweet?text=${t}&url=${u}`, trackShareX));
    row.appendChild(makeLink('Facebook', `https://www.facebook.com/sharer/sharer.php?u=${u}`, trackShareFB));
    row.appendChild(makeLink('WhatsApp', `https://api.whatsapp.com/send?text=${t}%20${u}`, trackShareWA));
    row.appendChild(makeLink('Telegram', `https://t.me/share/url?url=${u}&text=${t}`, trackShareTG));
    row.appendChild(makeLink('Email', `mailto:?subject=${encodeURIComponent('Please read: Panorama UAP proposal')}&body=${t}%0A%0A${u}`, trackShareMail));

    const copyBtn = document.createElement('button');
    copyBtn.className = 'badge';
    copyBtn.type = 'button';
    copyBtn.textContent = 'Copy link';
    copyBtn.style.marginLeft = '8px';
    copyBtn.addEventListener('click', async () => {
      try {
        await navigator.clipboard.writeText(siteUrl);
        copyBtn.textContent = 'Copied!';
        trackCopy();
        setTimeout(() => (copyBtn.textContent = 'Copy link'), 1400);
      } catch {}
    });

    share.appendChild(sh);
    share.appendChild(sp);
    share.appendChild(row);
    share.appendChild(copyBtn);

    // insert both cards
    const wrapper = document.createElement('div');
    wrapper.appendChild(card);
    wrapper.appendChild(share);
    el.replaceWith(wrapper);
  });
});
