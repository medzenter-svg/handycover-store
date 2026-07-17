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

  const donationLeaf=[...document.querySelectorAll('body *')].find(el=>{
    if(el.closest('footer')||el.children.length)return false;
    const text=(el.textContent||'').trim().toLowerCase();
    return text.includes('tierheim')&&text.includes('spenden');
  });

  if(donationLeaf){
    const banner=donationLeaf.closest('section,aside,div')||donationLeaf;
    banner.classList.add('hc-shelter-banner');
    donationLeaf.classList.add('hc-shelter-text');
    donationLeaf.textContent='🐾 15 % unserer eigenen Affiliate-Einnahmen spenden wir an Tierheime.';
  }
})();