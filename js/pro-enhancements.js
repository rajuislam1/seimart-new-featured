/* Sei Mart Professional UX Enhancements - frontend/localStorage only */
(function(){
  'use strict';

  function ready(fn){ if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',fn); else fn(); }
  function isSellerPanel(){
    var path=(location.pathname||"").toLowerCase();
    return path.indexOf("seller-portal")>=0 || path.indexOf("seller-login")>=0 || (document.body && document.body.getAttribute("data-panel")==="seller");
  }
  function qs(s){return document.querySelector(s)}
  function qsa(s){return Array.prototype.slice.call(document.querySelectorAll(s))}

  function toast(message, type){
    var wrap=qs('#seiToastWrap');
    if(!wrap){ wrap=document.createElement('div'); wrap.id='seiToastWrap'; wrap.className='sei-toast-wrap'; document.body.appendChild(wrap); }
    var el=document.createElement('div'); el.className='sei-toast '+(type||'success'); el.innerHTML='<span class="sei-toast-icon">'+(type==='error'?'!':'✓')+'</span><span>'+message+'</span>';
    wrap.appendChild(el); setTimeout(function(){el.classList.add('show')},10); setTimeout(function(){el.classList.remove('show');setTimeout(function(){el.remove()},300)},2600);
  }
  window.seiMartToast=toast;


  function installImageFallbacks(){
    document.addEventListener('error',function(e){
      var img=e.target;
      if(!img || img.tagName!=='IMG' || img.dataset.seiFallback==='1') return;
      img.dataset.seiFallback='1';
      img.src='image/products/product-1.png';
      img.style.objectFit='contain';
    },true);
  }

  function enhanceEmptyAndLoadingStates(){
    qsa('.no-products,.empty-cart,.orders-empty').forEach(function(el){
      if(el.dataset.seiStateEnhanced==='1') return;
      el.dataset.seiStateEnhanced='1';
      if(!el.querySelector('.sei-state-icon')){
        var icon=document.createElement('div'); icon.className='sei-state-icon'; icon.textContent=el.classList.contains('empty-cart')?'🛒':'🛍️';
        el.insertBefore(icon,el.firstChild);
      }
    });
  }

  function installSearch(){
    var input=qs('#searchInput'); if(!input) return;
    var box=input.parentElement; if(!box || qs('#seiSearchSuggest')) return;
    box.classList.add('sei-search-shell');
    var suggest=document.createElement('div'); suggest.id='seiSearchSuggest'; suggest.className='sei-search-suggest'; box.appendChild(suggest);
    function products(){ try{return typeof getProducts==='function'?getProducts():[]}catch(e){return []} }
    function render(){
      var q=(input.value||'').trim().toLowerCase(); if(!q){suggest.innerHTML='';suggest.classList.remove('show');return;}
      var matches=products().filter(function(p){return String(p.name||'').toLowerCase().includes(q)||String(p.category||'').toLowerCase().includes(q)}).slice(0,6);
      var cats=['electronics','mobile','fashion','shoes','cosmetics','perfume','watches','home','jewellery','beauty'].filter(function(c){return c.includes(q)}).slice(0,3);
      var html=''; cats.forEach(function(c){html+='<a class="sei-search-cat" href="products.html?category='+encodeURIComponent(c)+'">Browse '+c+'</a>'});
      matches.forEach(function(p){html+='<a class="sei-search-item" href="product-details.html?id='+encodeURIComponent(p.id)+'"><img src="'+(p.image||'image/products/product-1.png')+'" alt=""><span><strong>'+String(p.name||'Product')+'</strong><small>৳'+Number(p.price||0).toLocaleString('en-BD')+'</small></span></a>'});
      if(!html) html='<div class="sei-search-empty">No products found. Try another keyword.</div>';
      suggest.innerHTML=html; suggest.classList.add('show');
    }
    input.addEventListener('input',render); input.addEventListener('focus',function(){if(input.value.trim())render()});
    document.addEventListener('click',function(e){if(!box.contains(e.target))suggest.classList.remove('show')});
  }

  function installMobileNav(){
    if(qs('#seiMobileNav')) return;
    var nav=document.createElement('nav'); nav.id='seiMobileNav'; nav.className='sei-mobile-nav';
    nav.innerHTML='<a href="index.html"><span>⌂</span><small>Home</small></a><a href="products.html"><span>☰</span><small>Categories</small></a><a href="wishlist.html"><span>♡</span><small>Wishlist</small></a><a href="cart.html"><span>🛒</span><small>Cart</small></a><a href="account.html"><span>👤</span><small>Account</small></a>';
    document.body.appendChild(nav);
  }

  function installSupport(){
    if(qs('#seiSupportFab')) return;
    var path=(location.pathname||'').toLowerCase();
    // Contact page already has Live Chat UI — avoid duplicate FAB
    if(path.indexOf('contact')>=0) return;
    if(path.indexOf('admin')>=0 || path.indexOf('seller-portal')>=0 || path.indexOf('seller-login')>=0) return;
    var fab=document.createElement('button'); fab.id='seiSupportFab'; fab.className='sei-support-fab'; fab.setAttribute('aria-label','Customer support'); fab.innerHTML='💬';
    var panel=document.createElement('div'); panel.id='seiSupportPanel'; panel.className='sei-support-panel'; panel.innerHTML='<strong>Need help?</strong><span>We are here for you.</span><a href="contact.html">Contact Support</a><a href="help.html">Help Center</a>';
    document.body.appendChild(panel); document.body.appendChild(fab);
    fab.addEventListener('click',function(){panel.classList.toggle('show')});
  }

  function wrapCart(){
    if(typeof window.addProductToCart!=='function' || window.addProductToCart.__seiWrapped) return;
    var original=window.addProductToCart;
    function wrapped(id){var r=original.apply(this,arguments); toast('Product added to your cart.'); return r;}
    wrapped.__seiWrapped=true; window.addProductToCart=wrapped;
  }

  function homeEnhancements(){
    if(!qs('#seiBestSellersGrid')) return;
    var all=[]; try{all=typeof getProducts==='function'?getProducts():[]}catch(e){}
    function card(p){
      var price=Number(p.price)||0, disc=Number(p.discount)||0, final=disc?Math.round(price*(1-disc/100)):price;
      return '<a class="sei-pro-card" href="product-details.html?id='+encodeURIComponent(p.id)+'"><div class="sei-pro-img">'+(disc?'<b class="sei-pro-badge">-'+disc+'%</b>':'')+'<span class="sei-pro-heart">♡</span><img src="'+(p.image||'image/products/product-1.png')+'" alt="'+String(p.name||'Product').replace(/"/g,'&quot;')+'"></div><div class="sei-pro-body"><small>'+String(p.category||'Featured')+'</small><h3>'+String(p.name||'Product')+'</h3><div class="sei-stars">★★★★★ <em>('+(Number(p.reviews)||0)+')</em></div><strong>৳'+final.toLocaleString('en-BD')+'</strong>'+(disc?'<del>৳'+price.toLocaleString('en-BD')+'</del>':'')+'</div></a>';
    }
    var best=all.slice().sort(function(a,b){return (Number(b.reviews)||0)-(Number(a.reviews)||0)}).slice(0,8);
    var newp=all.filter(function(p){return p.isNew===true}).slice(0,8); if(!newp.length)newp=all.slice().reverse().slice(0,8);
    var bg=qs('#seiBestSellersGrid'), ng=qs('#seiTrendingGrid'); if(bg)bg.innerHTML=best.map(card).join(''); if(ng)ng.innerHTML=newp.map(card).join('');
    var timer=qs('#seiDealTimer'); if(timer){var end=Date.now()+36*60*60*1000; setInterval(function(){var d=Math.max(0,end-Date.now()),h=Math.floor(d/36e5),m=Math.floor(d/6e4)%60,s=Math.floor(d/1e3)%60;timer.textContent=String(h).padStart(2,'0')+' : '+String(m).padStart(2,'0')+' : '+String(s).padStart(2,'0')},1000)}
  }

  ready(function(){ if(isSellerPanel()) return;
    installSearch(); installMobileNav(); installSupport(); installImageFallbacks(); enhanceEmptyAndLoadingStates();
    setTimeout(wrapCart,120);
    homeEnhancements();
    qsa('form').forEach(function(f){ if(f.id && /newsletter/i.test(f.id)) f.addEventListener('submit',function(e){e.preventDefault();toast('Thanks! You are on the Sei Mart updates list.');f.reset()})});
  });
})();
