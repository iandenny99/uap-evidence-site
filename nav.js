document.addEventListener('DOMContentLoaded', () => {
  const baseMeta = document.querySelector('meta[name="site-base"]');
  const siteUrlMeta = document.querySelector('meta[name="site-url"]');
  const base = (baseMeta ? baseMeta.getAttribute('content') : '/') || '/';
  const b = base.endsWith('/') ? base.slice(0, -1) : base; // e.g. "/uap-evidence-site"
  const domain = siteUrlMeta ? new URL(siteUrlMeta.getAttribute('content')).host : location.hostname;

  // 1) Build the nav (centralized)
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

  // 2) Inject Plausible (privacy-friendly) based on your site hostname
  //    Create a site in Plausible for your host (e.g., iandenny99.github.io) and you’re set.
  (function injectPlausible() {
    if (document.querySelector('script[src*="plausible.io/js/script"]')) return;
    const s = document.createElement('script');
    s.defer = true;
    s.setAttribute('data-domain', domain); // e.g., "iandenny99.github.io"
    s.src = 'https://plausible.io/js/script.js';
    document.head.appendChild(s);
  })();
});
