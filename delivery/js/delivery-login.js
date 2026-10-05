(function(){
  if(sessionStorage.getItem('seiMartDeliveryLoggedIn')==='true' && localStorage.getItem('seiMartCurrentDelivery')){ location.href='dashboard.html'; return; }
  var form=document.getElementById('deliveryLoginForm'), error=document.getElementById('loginError');
  function show(msg){error.textContent=msg;error.style.display='block';}
  form.addEventListener('submit',function(e){
    e.preventDefault(); error.style.display='none';
    var username=(document.getElementById('deliveryUsername').value||'').trim().toLowerCase();
    var password=document.getElementById('deliveryPassword').value||'';
    var list=[]; try{list=JSON.parse(localStorage.getItem('seiMartStaff')||'[]')}catch(x){}
    var user=list.find(function(s){return String(s.username||'').toLowerCase()===username});
    if(!user){show('Invalid delivery username or password.');return;}
    if(String(user.role||'').toLowerCase()!=='delivery'){show('This account is not a Delivery account.');return;}
    if(user.status==='Disabled'||user.status==='Suspended'){show('This delivery account is inactive. Please contact Admin.');return;}
    var check=SeiSecurity.checkRecordPassword(user,password);
    if(!check.ok){show('Invalid delivery username or password.');return;}
    if(check.upgraded){localStorage.setItem('seiMartStaff',JSON.stringify(list));}
    var current={name:user.name,username:user.username,role:'delivery',powers:['dashboard','orders','order-status','print-invoice']};
    localStorage.setItem('seiMartCurrentDelivery',JSON.stringify(current));
    sessionStorage.setItem('seiMartDeliveryLoggedIn','true');
    location.href='dashboard.html';
  });
})();
