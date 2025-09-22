document.addEventListener('DOMContentLoaded', () => {
  const siteBase = (document.querySelector('meta[name="site-base"]')?.getAttribute('content') || '/');
  const siteUrl  = (document.querySelector('meta[name="site-url"]')?.getAttribute('content') || 'https://YOUR-SITE-URL/');

  const TO = 'newsonline@bbc.co.uk';
  const SUBJECT = 'Please Investigate the Evidence on Unidentified Aerial Phenomena';
  const STANDARD = (
`There is a growing body of credible, documented evidence suggesting that governments have withheld or downplayed information about unidentified aerial phenomena (UAP). This spans historical records, whistleblower testimony, peer-reviewed research, and official statements.

This site assembles verifiable sources with citations and links to primary documents. The public deserves a serious, transparent investigation.

I respectfully ask the BBC to assign investigative resources to examine this evidence with the same rigour applied to major public-interest scandals.

Evidence overview:
${siteUrl}evidence

Kind regards,
A concerned viewer/licence-payer`
  ).trim();

  document.querySelectorAll('[data-cta]').forEach((mount) => {
    const cta = document.createElement('section');
    cta.className = 'cta card';
    cta.innerHTML = `
      <h3>Read Enough? Ready to put your weight behind the push for the BBC to investigate?</h3>
      <p>Get your email started with a single click. Add an optional personal intro; we’ll open your email app, then bring you to a quick complaint helper.</p>
      <label for="intro">(Optional) Your introduction</label>
      <textarea id="intro" rows="4" placeholder="Why this matters to you..."></textarea>
      <div style="margin-top:12px; display:flex; gap:12px; flex-wrap:wrap;">
        <button class="btn" id="sendEmail">Get Your Email Started</button>
        <a class="badge" href="#complaint" id="toHelper">Go to Complaint Helper</a>
      </div>
    `;
    mount.appendChild(cta);

    const intro = cta.querySelector('#intro');
    const btn   = cta.querySelector('#sendEmail');
    const help  = cta.querySelector('#toHelper');

    function goToHelper() {
      const url = siteBase.replace(/\/+$/, '') + '/complaint-helper/';
      window.location.href = url;
    }

    btn.addEventListener('click', () => {
      const userIntro = (intro.value || '').trim();
      const body = (userIntro ? userIntro + '\n\n—\n\n' : '') + STANDARD;
      const mailto = 'mailto:' + encodeURIComponent(TO)
        + '?subject=' + encodeURIComponent(SUBJECT)
        + '&body=' + encodeURIComponent(body);
      window.location.href = mailto;     // opens the user’s email app
      setTimeout(goToHelper, 400);       // then jump to complaint helper
    });

    help.addEventListener('click', (e) => {
      e.preventDefault();
      goToHelper();
    });
  });
});
