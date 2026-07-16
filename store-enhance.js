(()=>{
  const body=document.body;
  if(!body)return;

  if(!document.querySelector('.hc-store-bar')){
    const bar=document.createElement('div');
    bar.className='hc-store-bar';
    bar.innerHTML='Unabhängige Auswahl für Handyhüllen & Smartphone-Zubehör · Preise und Verfügbarkeit direkt bei Amazon prüfen';
    body.prepend(bar);
  }

  const main=document.querySelector('main')||body;

  if(!document.querySelector('.hc-trust')){
    const trust=document.createElement('section');
    trust.className='hc-trust';
    trust.setAttribute('aria-label','Vorteile');
    trust.innerHTML='<div><strong>Gezielt ausgewählt</strong><span>Übersichtliche Empfehlungen statt endloser Produktlisten.</span></div><div><strong>Direkt zu Amazon</strong><span>Kein eigener Verkauf, kein Warenlager und keine Bestellung auf dieser Website.</span></div><div><strong>Transparent</strong><span>Affiliate-Links sind gekennzeichnet; der Preis für Käufer ändert sich nicht.</span></div>';
    const first=main.firstElementChild;
    if(first&&first.nextSibling)main.insertBefore(trust,first.nextSibling);else main.prepend(trust);
  }

  if(!document.querySelector('.hc-affiliate-note')){
    const note=document.createElement('div');
    note.className='hc-affiliate-note';
    note.textContent='Als Amazon-Partner verdienen wir an qualifizierten Verkäufen. Preis, Verfügbarkeit, Versand und Rückgabe richten sich nach dem jeweiligen Angebot auf Amazon.de.';
    const footer=document.querySelector('footer');
    if(footer)footer.parentNode.insertBefore(note,footer);else body.append(note);
  }

  document.querySelectorAll('a[href*="amazon.de"]').forEach(a=>{
    a.setAttribute('rel','sponsored nofollow noopener');
    a.setAttribute('target','_blank');
    if(!a.getAttribute('aria-label'))a.setAttribute('aria-label',(a.textContent.trim()||'Produkt')+' bei Amazon ansehen');
  });

  document.querySelectorAll('img').forEach(img=>{
    if(!img.hasAttribute('loading'))img.loading='lazy';
    img.decoding='async';
  });

  const h1=document.querySelector('h1');
  if(h1&&!document.querySelector('.hc-hero-shell')){
    const shell=h1.closest('section')||h1.closest('div')||h1.parentElement;
    if(shell&&shell!==body){
      shell.classList.add('hc-hero-shell');

      const inner=document.createElement('div');
      inner.className='hc-hero-inner';
      const left=document.createElement('div');
      left.className='hc-hero-copy';
      const right=document.createElement('div');
      right.className='hc-hero-visual';

      const kicker=document.createElement('div');
      kicker.className='hc-hero-kicker';
      kicker.textContent='Amazon Affiliate Auswahl';

      const allChildren=[...shell.childNodes];
      allChildren.forEach(node=>left.appendChild(node));
      left.insertBefore(kicker,left.firstChild);

      h1.textContent='Schöne Handyhüllen & smartes Zubehör';

      const paragraph=left.querySelector('p');
      const copy='Ausgewählte Handyhüllen, Displayschutz, Ladegeräte und MagSafe-Zubehör in einer hellen, klaren Übersicht. Finde schneller passende Produkte und prüfe den aktuellen Preis direkt bei Amazon.';
      if(paragraph)paragraph.textContent=copy;
      else{
        const p=document.createElement('p');
        p.textContent=copy;
        left.appendChild(p);
      }

      const imgs=[...document.querySelectorAll('img')].filter(img=>{
        const src=img.currentSrc||img.src||'';
        return src&&!left.contains(img)&&!src.startsWith('data:');
      }).slice(0,3);

      const glow=document.createElement('div');
      glow.className='hc-hero-glow';
      right.appendChild(glow);

      const chip=document.createElement('div');
      chip.className='hc-hero-chip';
      chip.textContent='Helle, moderne Auswahl';
      right.appendChild(chip);

      imgs.forEach((img,index)=>{
        const shot=document.createElement('div');
        shot.className='hc-hero-shot hc-hero-shot-'+(index+1);
        const pic=document.createElement('img');
        pic.src=img.currentSrc||img.src;
        pic.alt=img.alt||'Produktbild';
        shot.appendChild(pic);
        right.appendChild(shot);
      });

      const caption=document.createElement('div');
      caption.className='hc-hero-caption';
      caption.innerHTML='<strong>Schneller das Richtige finden</strong><span>Klare Auswahl, relevante Produkte und direkter Preischeck bei Amazon.</span>';
      right.appendChild(caption);

      inner.append(left,right);
      shell.appendChild(inner);
    }
  }
})();