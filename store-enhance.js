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
})();