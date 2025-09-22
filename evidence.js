document.addEventListener('DOMContentLoaded', async () => {
  const baseMeta = document.querySelector('meta[name="site-base"]');
  const base = (baseMeta ? baseMeta.getAttribute('content') : '/') || '/';
  const b = base.endsWith('/') ? base.slice(0, -1) : base; // e.g. "/uap-evidence-site"
  const grid = document.getElementById('evidence-grid');
  if (!grid) return;

  const url = `${b}/evidence/registry.json`;
  try {
    const res = await fetch(url, { cache: 'no-store' });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const items = await res.json();

    items.forEach(item => {
      const card = document.createElement('div');
      card.className = 'card';

      const h3 = document.createElement('h3');
      h3.textContent = item.title;

      const p = document.createElement('p');
      p.textContent = item.summary;

      const tagP = document.createElement('p');
      if (Array.isArray(item.tags)) {
        item.tags.forEach(t => {
          const span = document.createElement('span');
          span.className = 'badge';
          span.textContent = t;
          tagP.appendChild(span);
          tagP.appendChild(document.createTextNode(' '));
        });
      }

      const link = document.createElement('a');
      link.href = `${b}/evidence/${item.slug}/`;
      link.textContent = 'Open »';
      link.className = 'badge';
      link.style.marginLeft = '8px';

      card.appendChild(h3);
      card.appendChild(p);
      card.appendChild(tagP);
      card.appendChild(link);

      grid.appendChild(card);
    });
  } catch (err) {
    const msg = document.createElement('p');
    msg.className = 'card';
    msg.textContent = 'Could not load evidence list. Please refresh.';
    grid.parentNode.insertBefore(msg, grid);
  }
});
