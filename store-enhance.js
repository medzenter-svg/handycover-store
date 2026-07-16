(()=>{
  const body=document.body;
  if(!body)return;
  const main=document.querySelector('main')||body;
  const path=(location.pathname||'/').replace(/index\.html$/,'');
  const isHome=path==='/'||path==='';
  body.classList.add(isHome?'hc-home':'hc-subpage');

  const emergency=document.createElement('style');
  emergency.textContent=`
    body.hc-subpage h1{font-size:clamp(2rem,4vw,3.35rem)!important;line-height:1.08!important;max-width:900px!important;background:none!important;color:#111827!important;-webkit-text-fill-color:#111827!important;margin:0 0 14px!important}
    body.hc-subpage h2{font-size:clamp(1.55rem,2.8vw,2.35rem)!important;line-height:1.15!important}
    body.hc-subpage .hc-subpage-intro{max-width:1180px!important;margin:20px auto 14px!important;padding:26px 30px!important;min-height:0!important;background:linear-gradient(135deg,#fff,#f7f8ff)!important;border:1px solid #e6ebf3!important;border-radius:24px!important;box-shadow:0 12px 34px rgba(17,24,39,.055)!important;overflow:hidden!important}
    body.hc-subpage .hc-subpage-intro *{max-width:900px}
    body.hc-subpage .hc-subpage-eyebrow{font-size:12px;font-weight:850;letter-spacing:.09em;text-transform:uppercase;color:#6a31ee;margin-bottom:8px}
    body.hc-subpage .hc-subpage-lead{font-size:1rem!important;line-height:1.65!important;margin:0 0 16px!important;color:#5f6b7a!important}
    body.hc-subpage .hc-subpage-actions{display:flex;flex-wrap:wrap;gap:10px;margin-top:14px}
    body.hc-subpage .hc-subpage-actions a{padding:11px 16px!important;font-size:14px!important}
    body.hc-subpage .hc-duplicate-heading-block{display:none!important}
    body.hc-subpage .hc-category-nav{margin-top:14px!important}
    body.hc-subpage .hc-section-heading h2{font-size:clamp(1.45rem,2.4vw,2rem)!important}
    body.hc-subpage section:first-of-type:not(.hc-subpage-intro){min-height:0!important}
    @media(max-width:800px){body.hc-subpage .hc-subpage-intro{margin:12px 10px!important;padding:20px 18px!important;border-radius:20px!important}body.hc-subpage h1{font-size:clamp(1.8rem,9vw,2.55rem)!important}.hc-subpage-actions{display:grid!important}.hc-subpage-actions a{width:100%!important}}
  `;
  document.head.appendChild(emergency);

  if(!document.querySelector('.hc-store-bar')){
    const bar=document.createElement('div');
    bar.className='hc-store-bar';
    bar.textContent='Unabhängige Produktauswahl · Partnerlinks ohne Mehrkosten · Kauf und Versand direkt über Amazon';
    body.prepend(bar);
  }

  const amazonLinks=[...document.querySelectorAll('a[href*="amazon.de"]')];
  amazonLinks.forEach((a,index)=>{
    a.setAttribute('rel','sponsored nofollow noopener');
    a.setAttribute('target','_blank');
    const text=a.textContent.trim().toLowerCase();
    if(!text||text==='mehr'||text==='ansehen'||text.includes('kaufen'))a.textContent='Preis bei Amazon prüfen';
    const card=a.closest('article,[class*="product"],[class*="card"]');
    if(card){card.classList.add('hc-sales-card');if(!card.id)card.id='produkt-'+(index+1)}
  });

  document.querySelectorAll('img').forEach(img=>{if(!img.hasAttribute('loading'))img.loading='lazy';img.decoding='async'});

  const headings=[...document.querySelectorAll('h1')];
  const h1=headings[0]||null;

  if(!isHome&&h1){
    const shell=h1.closest('section')||h1.closest('div')||h1.parentElement;
    if(shell&&shell!==body){
      shell.classList.add('hc-subpage-intro');
      if(!shell.querySelector('.hc-subpage-eyebrow')){
        const eyebrow=document.createElement('div');
        eyebrow.className='hc-subpage-eyebrow';
        eyebrow.textContent='HandyCover Kaufberatung';
        shell.insertBefore(eyebrow,h1);
      }
      const firstParagraph=shell.querySelector('p');
      if(firstParagraph)firstParagraph.classList.add('hc-subpage-lead');
      if(!shell.querySelector('.hc-subpage-actions')){
        const actions=document.createElement('div');
        actions.className='hc-subpage-actions';
        actions.innerHTML='<a class="hc-primary-cta" href="#hc-products">Empfehlungen ansehen</a><a class="hc-secondary-cta" href="#hc-guide">Kaufhilfe</a>';
        if(firstParagraph)firstParagraph.insertAdjacentElement('afterend',actions);else shell.appendChild(actions);
      }
    }

    const norm=s=>s.toLowerCase().replace(/[^a-z0-9äöüß]+/g,' ').trim();
    const base=norm(h1.textContent);
    headings.slice(1).forEach(extra=>{
      const t=norm(extra.textContent);
      const similar=t===base||t.includes(base)||base.includes(t)||(t.split(' ').filter(w=>base.includes(w)).length>=Math.min(5,t.split(' ').length));
      if(similar){
        const block=extra.closest('section')||extra.parentElement;
        if(block&&block!==shell)block.classList.add('hc-duplicate-heading-block');
      }
    });
  }

  if(!document.querySelector('.hc-category-nav')){
    const nav=document.createElement('section');
    nav.className='hc-category-nav';
    nav.innerHTML='<div class="hc-section-heading"><span>Schnelle Auswahl</span><h2>Was suchst du?</h2></div><div class="hc-category-pills"><a href="#hc-products">Handyhüllen</a><a href="#hc-products">Displayschutz</a><a href="#hc-products">MagSafe</a><a href="#hc-products">Ladegeräte & Kabel</a><a href="#hc-products">Powerbanks</a><a href="#hc-products">Auto-Zubehör</a></div>';
    const intro=document.querySelector('.hc-subpage-intro')||document.querySelector('.hc-hero-shell');
    if(intro)intro.insertAdjacentElement('afterend',nav);else main.prepend(nav);
  }

  const firstCard=amazonLinks.map(a=>a.closest('article,[class*="product"],[class*="card"]')).find(Boolean);
  if(firstCard){
    const area=firstCard.parentElement;
    if(area&&!area.id)area.id='hc-products';
  }

  if(!document.querySelector('.hc-trust')){
    const trust=document.createElement('section');
    trust.className='hc-trust';
    trust.id='hc-guide';
    trust.innerHTML='<div><strong>1. Bedarf wählen</strong><span>Schutz, Laden, MagSafe oder Zubehör passend zum Alltag.</span></div><div><strong>2. Vorteile vergleichen</strong><span>Relevante Merkmale kompakt prüfen.</span></div><div><strong>3. Bei Amazon ansehen</strong><span>Preis, Verfügbarkeit, Versand und Rückgabe direkt beim Anbieter.</span></div>';
    const category=document.querySelector('.hc-category-nav');
    if(category)category.insertAdjacentElement('afterend',trust);else main.prepend(trust);
  }

  if(!document.querySelector('.hc-affiliate-note')){
    const note=document.createElement('div');
    note.className='hc-affiliate-note';
    note.textContent='Als Amazon-Partner verdienen wir an qualifizierten Verkäufen. Für Käufer entstehen dadurch keine Mehrkosten.';
    const footer=document.querySelector('footer');
    if(footer)footer.parentNode.insertBefore(note,footer);else body.append(note);
  }
})();