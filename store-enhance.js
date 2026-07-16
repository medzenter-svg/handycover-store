(()=>{
  const body=document.body;
  if(!body)return;

  const main=document.querySelector('main')||body;
  const path=(location.pathname||'/').replace(/index\.html$/,'');
  const isHome=path==='/'||path==='';
  body.classList.add(isHome?'hc-home':'hc-subpage');

  const amazonLinks=[...document.querySelectorAll('a[href*="amazon.de"]')];
  const firstAmazon=amazonLinks[0]||null;

  if(!document.querySelector('.hc-store-bar')){
    const bar=document.createElement('div');
    bar.className='hc-store-bar';
    bar.textContent='Unabhängige Produktauswahl · Partnerlinks ohne Mehrkosten · Kauf und Versand direkt über Amazon';
    body.prepend(bar);
  }

  amazonLinks.forEach((a,index)=>{
    a.setAttribute('rel','sponsored nofollow noopener');
    a.setAttribute('target','_blank');
    a.dataset.hcAffiliate='true';
    if(!a.getAttribute('aria-label'))a.setAttribute('aria-label',(a.textContent.trim()||'Produkt')+' bei Amazon ansehen');
    const text=a.textContent.trim().toLowerCase();
    if(!text||text==='mehr'||text==='ansehen'||text.includes('kaufen'))a.textContent='Preis bei Amazon prüfen';
    const card=a.closest('article,[class*="product"],[class*="card"]');
    if(card){
      card.classList.add('hc-sales-card');
      if(!card.id)card.id='produkt-'+(index+1);
    }
  });

  document.querySelectorAll('img').forEach(img=>{
    if(!img.hasAttribute('loading'))img.loading='lazy';
    img.decoding='async';
  });

  const headings=[...document.querySelectorAll('h1')];
  const h1=headings[0]||null;

  if(isHome&&h1&&!document.querySelector('.hc-hero-shell')){
    const shell=h1.closest('section')||h1.closest('div')||h1.parentElement;
    if(shell&&shell!==body){
      shell.classList.add('hc-hero-shell');
      const inner=document.createElement('div');
      inner.className='hc-hero-inner';
      const left=document.createElement('div');
      left.className='hc-hero-copy';
      const right=document.createElement('div');
      right.className='hc-hero-visual';
      const existing=[...shell.childNodes];
      existing.forEach(node=>left.appendChild(node));

      const kicker=document.createElement('div');
      kicker.className='hc-hero-kicker';
      kicker.textContent='HandyCover Auswahl';
      left.insertBefore(kicker,left.firstChild);

      h1.textContent='Finde schneller das passende Zubehör';
      const copy='Handyhüllen, Displayschutz, Ladegeräte und MagSafe-Zubehör übersichtlich ausgewählt. Vergleiche die wichtigsten Vorteile und prüfe Preis sowie Verfügbarkeit direkt bei Amazon.';
      const paragraph=left.querySelector('p');
      if(paragraph)paragraph.textContent=copy;
      else{
        const p=document.createElement('p');
        p.textContent=copy;
        left.appendChild(p);
      }

      const actions=document.createElement('div');
      actions.className='hc-hero-actions';
      const primary=document.createElement('a');
      primary.className='hc-primary-cta';
      primary.href='#hc-products';
      primary.textContent='Produkte entdecken';
      const secondary=document.createElement('a');
      secondary.className='hc-secondary-cta';
      secondary.href='#hc-guide';
      secondary.textContent='So wählen wir aus';
      actions.append(primary,secondary);
      left.appendChild(actions);

      const proof=document.createElement('div');
      proof.className='hc-mini-proof';
      proof.innerHTML='<span>✓ Klare Auswahl</span><span>✓ Direkter Preischeck</span><span>✓ Kein Aufpreis</span>';
      left.appendChild(proof);

      const imgs=[...document.querySelectorAll('img')].filter(img=>{
        const src=img.currentSrc||img.src||'';
        return src&&!left.contains(img)&&!src.startsWith('data:');
      }).slice(0,3);
      const glow=document.createElement('div');
      glow.className='hc-hero-glow';
      right.appendChild(glow);
      const chip=document.createElement('div');
      chip.className='hc-hero-chip';
      chip.textContent='Ausgewählte Bestseller';
      right.appendChild(chip);
      imgs.forEach((img,index)=>{
        const shot=document.createElement('div');
        shot.className='hc-hero-shot hc-hero-shot-'+(index+1);
        const pic=document.createElement('img');
        pic.src=img.currentSrc||img.src;
        pic.alt=img.alt||'Ausgewähltes Smartphone-Zubehör';
        shot.appendChild(pic);
        right.appendChild(shot);
      });
      const caption=document.createElement('div');
      caption.className='hc-hero-caption';
      caption.innerHTML='<strong>Weniger suchen. Besser auswählen.</strong><span>Die wichtigsten Produktvorteile auf einen Blick.</span>';
      right.appendChild(caption);
      inner.append(left,right);
      shell.appendChild(inner);
    }
  }

  if(!isHome&&h1){
    const shell=h1.closest('section')||h1.closest('div')||h1.parentElement;
    if(shell&&shell!==body){
      shell.classList.add('hc-subpage-intro');
      const eyebrow=document.createElement('div');
      eyebrow.className='hc-subpage-eyebrow';
      eyebrow.textContent='HandyCover Kaufberatung';
      shell.insertBefore(eyebrow,h1);

      const firstParagraph=shell.querySelector('p');
      if(firstParagraph)firstParagraph.classList.add('hc-subpage-lead');

      const jump=document.createElement('div');
      jump.className='hc-subpage-actions';
      jump.innerHTML='<a class="hc-primary-cta" href="#hc-products">Empfehlungen ansehen</a><a class="hc-secondary-cta" href="#hc-guide">Kaufhilfe</a>';
      if(firstParagraph)firstParagraph.insertAdjacentElement('afterend',jump);else shell.appendChild(jump);
    }

    const normalise=s=>s.toLowerCase().replace(/[^a-z0-9äöüß]+/g,' ').trim();
    headings.slice(1).forEach(extra=>{
      if(normalise(extra.textContent)===normalise(h1.textContent)){
        const duplicateBlock=extra.closest('section')||extra.parentElement;
        if(duplicateBlock)duplicateBlock.classList.add('hc-duplicate-heading-block');
      }
    });
  }

  if(!document.querySelector('.hc-category-nav')){
    const nav=document.createElement('section');
    nav.className='hc-category-nav';
    nav.setAttribute('aria-label','Beliebte Kategorien');
    nav.innerHTML='<div class="hc-section-heading"><span>Schnelle Auswahl</span><h2>Was suchst du?</h2></div><div class="hc-category-pills"><a href="#hc-products">Handyhüllen</a><a href="#hc-products">Displayschutz</a><a href="#hc-products">MagSafe</a><a href="#hc-products">Ladegeräte & Kabel</a><a href="#hc-products">Powerbanks</a><a href="#hc-products">Auto-Zubehör</a></div>';
    const intro=isHome?document.querySelector('.hc-hero-shell'):document.querySelector('.hc-subpage-intro');
    if(intro)intro.insertAdjacentElement('afterend',nav);else main.prepend(nav);
  }

  const firstCard=amazonLinks.map(a=>a.closest('article,[class*="product"],[class*="card"]')).find(Boolean);
  if(firstCard){
    firstCard.classList.add('hc-featured-card');
    if(!firstCard.querySelector('.hc-badge')){
      const badge=document.createElement('div');
      badge.className='hc-badge';
      badge.textContent='Empfehlung';
      firstCard.prepend(badge);
    }
    const productArea=firstCard.parentElement;
    if(productArea&&!productArea.id)productArea.id='hc-products';
  }

  if(!document.querySelector('.hc-trust')){
    const trust=document.createElement('section');
    trust.className='hc-trust';
    trust.id='hc-guide';
    trust.setAttribute('aria-label','So funktioniert HandyCover');
    trust.innerHTML='<div><strong>1. Bedarf wählen</strong><span>Schutz, Laden, MagSafe oder Zubehör passend zum Alltag.</span></div><div><strong>2. Vorteile vergleichen</strong><span>Relevante Merkmale und Einsatzbereiche auf einen Blick.</span></div><div><strong>3. Bei Amazon prüfen</strong><span>Aktueller Preis, Verfügbarkeit, Versand und Rückgabe direkt beim Anbieter.</span></div>';
    const category=document.querySelector('.hc-category-nav');
    if(category)category.insertAdjacentElement('afterend',trust);else main.prepend(trust);
  }

  if(isHome&&!document.querySelector('.hc-buying-guide')){
    const guide=document.createElement('section');
    guide.className='hc-buying-guide';
    guide.innerHTML='<div class="hc-guide-copy"><span class="hc-eyebrow">Kaufberatung</span><h2>Die richtige Wahl in drei Fragen</h2><p><strong>Passt es exakt zu deinem Modell?</strong> Prüfe Modellbezeichnung und Größe. <strong>Brauchst du starken Schutz oder ein dünnes Design?</strong> Verstärkte Ecken schützen besser, schlanke Hüllen tragen weniger auf. <strong>Nutzt du MagSafe?</strong> Dann sollte der Magnetring ausdrücklich kompatibel sein.</p></div><div class="hc-guide-points"><div><b>Modell</b><span>Exakte Gerätebezeichnung prüfen</span></div><div><b>Schutz</b><span>Kamera, Display und Ecken beachten</span></div><div><b>Funktion</b><span>MagSafe, Band oder Kartenfach wählen</span></div></div>';
    const trust=document.querySelector('.hc-trust');
    if(trust)trust.insertAdjacentElement('afterend',guide);else main.appendChild(guide);
  }

  if(!document.querySelector('.hc-affiliate-note')){
    const note=document.createElement('div');
    note.className='hc-affiliate-note';
    note.textContent='Als Amazon-Partner verdienen wir an qualifizierten Verkäufen. Für Käufer entstehen dadurch keine Mehrkosten. Preis, Verfügbarkeit, Versand und Rückgabe richten sich nach dem jeweiligen Angebot auf Amazon.de.';
    const footer=document.querySelector('footer');
    if(footer)footer.parentNode.insertBefore(note,footer);else body.append(note);
  }

  if(firstAmazon&&!document.querySelector('.hc-mobile-cta')){
    const sticky=document.createElement('div');
    sticky.className='hc-mobile-cta';
    sticky.innerHTML='<div><strong>Passendes Zubehör finden</strong><span>Preis und Verfügbarkeit bei Amazon prüfen</span></div><a href="#hc-products">Auswahl ansehen</a>';
    body.appendChild(sticky);
  }
})();