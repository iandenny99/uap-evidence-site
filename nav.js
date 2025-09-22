document.addEventListener('DOMContentLoaded', () => {
  const baseMeta = document.querySelector('meta[name="site-base"]');
  const base = (baseMeta ? baseMeta.getAttribute('content') : '/') || '/';
  const b = base.endsWith('/') ? base.slice(0, -1) : base; // e.g. "/uap-evidence-site"

  // Build the top menu
  const items = [
    { text: 'UAP Evidence', href: b + '/', brand: true },
    { text: 'Start Here',   href: b + '/start-here/' },
    { text: 'Evidence',     href: b + '/evidence/' },
    { text: 'Witnesses',    href: b + '/people/witnesses/' },
    { text: 'Scientists',   href: b + '/people/scientists/' },
    { text: 'Journalists',  href: b + '/people/journalists/' },
    { text: 'Gatekeepers',  href: b + '/people/gatekeepers/' },
    { text: 'Toolkit',      href: b + '/toolkit/' },
    { text: 'Contribute',   href: b + '/contribute/' },
    { text: 'About',        href: b + '/about/' },
  ];
  document.querySelectorAll('.nav').forEach(nav => {
    const frag = document.createDocumentFragment();
    items.forEach(it => {
      const a = document.createElement('a');
      a.textContent = it.text;
      a.href = it.href;
      if (it.brand) a.className = 'brand';
      frag.appendChild(a);
    });
    nav.innerHTML = '';
    nav.appendChild(frag);
  });

  // Load GoatCounter (FREE) – this is YOUR address; no edits needed
  (function injectGoatCounter() {
    if (document.querySelector('script[src*="gc.zgo.at/count.js"]')) return;
    const s = document.createElement('script');
    s.async = true;
    s.src = 'https://gc.zgo.at/count.js';
    s.setAttribute('data-goatcounter', 'https://iandenny.goatcounter.com/count');
    document.head.appendChild(s);
  })();
});
