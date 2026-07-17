(()=>{
  document.querySelectorAll('a[href*="amazon.de"]').forEach(a=>{
    a.setAttribute('rel','sponsored nofollow noopener');
    a.setAttribute('target','_blank');
    if(!a.getAttribute('aria-label'))a.setAttribute('aria-label',(a.textContent.trim()||'Produkt')+' bei Amazon ansehen');
  });

  document.querySelectorAll('img').forEach(img=>{
    if(!img.hasAttribute('loading'))img.loading='lazy';
    img.decoding='async';
  });

  const ratgeberNodes=[...document.querySelectorAll('a,button')].filter(el=>(el.textContent||'').trim().toLowerCase()==='ratgeber');
  ratgeberNodes.forEach(el=>{
    if(el.tagName==='A'){
      el.setAttribute('href','/ratgeber/');
      el.removeAttribute('target');
      el.setAttribute('aria-label','Zum Smartphone-Zubehör-Ratgeber');
    }else{
      el.addEventListener('click',()=>{location.href='/ratgeber/';});
      el.setAttribute('aria-label','Zum Smartphone-Zubehör-Ratgeber');
    }
  });

  const path=(location.pathname||'/').replace(/index\.html$/,'');
  if(path!=='/'&&path!=='')return;

  const leaves=[...document.querySelectorAll('body *')].filter(el=>el.children.length===0);
  const leafByText=(needle)=>leaves.find(el=>(el.textContent||'').trim().toLowerCase().includes(needle.toLowerCase()));

  const smallestProductCard=(needle)=>{
    const leaf=leafByText(needle);
    if(!leaf)return null;
    let node=leaf;
    let best=null;
    for(let i=0;i<9&&node&&node!==document.body;i++,node=node.parentElement){
      const links=node.querySelectorAll?.('a[href*="amazon.de"]')?.length||0;
      const imgs=node.querySelectorAll?.('img')?.length||0;
      const text=(node.textContent||'').trim();
      if(links===1&&imgs>=1&&imgs<=3&&text.length<260)best=node;
    }
    return best;
  };

  const watch=smallestProductCard('Apple Watch S11')||smallestProductCard('Apple Watch');
  const airpods=smallestProductCard('Silikon Hülle')||smallestProductCard('AirPods Pro 3');
  const samsung=smallestProductCard('Glitzer Hülle A15');
  const featured=smallestProductCard('iPhone Hülle Astronaut Design');

  if(watch&&airpods&&!document.querySelector('.hc-feature-pair')){
    const parent=watch.parentElement;
    const pair=document.createElement('div');
    pair.className='hc-feature-pair';
    parent.insertBefore(pair,watch);
    pair.append(watch,airpods);
    watch.classList.add('hc-feature-card');
    airpods.classList.add('hc-feature-card');

    if(samsung){
      const otherCards=[...document.querySelectorAll('a[href*="amazon.de"]')]
        .map(a=>{
          let n=a;
          let best=null;
          for(let i=0;i<7&&n&&n!==document.body;i++,n=n.parentElement){
            const links=n.querySelectorAll?.('a[href*="amazon.de"]')?.length||0;
            const imgs=n.querySelectorAll?.('img')?.length||0;
            const text=(n.textContent||'').trim();
            if(links===1&&imgs>=1&&imgs<=3&&text.length<300)best=n;
          }
          return best;
        })
        .filter((c,i,a)=>c&&a.indexOf(c)===i&&!pair.contains(c)&&c!==featured&&c!==samsung);

      const grid=otherCards.map(c=>c.parentElement).find(p=>p&&[...p.children].filter(ch=>otherCards.includes(ch)).length>=3);
      if(grid){grid.appendChild(samsung);samsung.classList.add('hc-relocated-card');}
      else samsung.style.display='none';
    }

    if(featured){
      const lowestCommon=(a,b)=>{
        const seen=new Set();
        for(let n=a;n;n=n.parentElement)seen.add(n);
        for(let n=b;n;n=n.parentElement)if(seen.has(n))return n;
        return null;
      };
      const hero=lowestCommon(pair,featured);
      if(hero&&hero!==document.body){
        hero.classList.add('hc-home-hero-compact');
        const directChild=(ancestor,node)=>{let n=node;while(n&&n.parentElement!==ancestor)n=n.parentElement;return n;};
        directChild(hero,pair)?.classList.add('hc-home-left-column');
        directChild(hero,featured)?.classList.add('hc-home-right-column');
      }
    }
  }

  const shelter=leaves.find(el=>/tierheim/i.test(el.textContent||''));
  if(shelter){
    let bar=shelter;
    for(let i=0;i<4&&bar.parentElement&&bar.parentElement!==document.body;i++){
      if((bar.parentElement.textContent||'').trim().length<180)bar=bar.parentElement;
    }
    bar.classList.add('hc-shelter-note');
  }
})();