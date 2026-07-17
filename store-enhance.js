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

  const isHome=(location.pathname||'/').replace(/index\.html$/,'')==='/';
  if(!isHome)return;

  const findByText=(needle)=>[...document.querySelectorAll('body *')].find(el=>{
    if(el.children.length>0)return false;
    return (el.textContent||'').trim().toLowerCase().includes(needle.toLowerCase());
  });

  const getCard=(label)=>{
    const leaf=findByText(label);
    return leaf?.closest('article,[class*="card"],[class*="product"],li,div');
  };

  const watchCard=getCard('Apple Watch S11')||getCard('Apple Watch');
  const airpodsCard=getCard('Silikon Hülle')||getCard('AirPods Pro 3');
  const samsungCard=getCard('Glitzer Hülle A15')||getCard('Samsung');

  const heroCards=[watchCard,airpodsCard,samsungCard].filter(Boolean);
  if(heroCards.length<2)return;

  const commonParent=heroCards.reduce((parent,card)=>{
    if(!parent)return card.parentElement;
    let node=card.parentElement;
    while(node&&!node.contains(parent))node=node.parentElement;
    return node||parent;
  },null);

  const cardsParent=watchCard?.parentElement===airpodsCard?.parentElement?watchCard.parentElement:commonParent;
  if(cardsParent){
    cardsParent.classList.add('hc-home-featured-pair');
    watchCard?.classList.add('hc-home-feature-card');
    airpodsCard?.classList.add('hc-home-feature-card');
  }

  if(samsungCard){
    samsungCard.classList.remove('hc-home-feature-card');
    const amazonCards=[...document.querySelectorAll('a[href*="amazon.de"]')]
      .map(a=>a.closest('article,[class*="card"],[class*="product"],li'))
      .filter((card,index,list)=>card&&list.indexOf(card)===index&&!heroCards.includes(card));

    const productGrid=amazonCards.map(card=>card.parentElement).find(parent=>{
      if(!parent)return false;
      const children=[...parent.children];
      return children.filter(child=>amazonCards.includes(child)).length>=2;
    });

    if(productGrid){
      productGrid.appendChild(samsungCard);
      samsungCard.classList.add('hc-moved-product-card');
    }else{
      samsungCard.style.display='none';
    }
  }
})();