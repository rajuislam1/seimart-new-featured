(function(){
  function current(){try{return JSON.parse(localStorage.getItem('seiMartCurrentDelivery')||'null')}catch(e){return null}}
  var staff=current();
  var live=null; try { var list=JSON.parse(localStorage.getItem('seiMartStaff')||'[]'); live=list.find(function(s){return String(s.username||'').toLowerCase()===String(staff&&staff.username||'').toLowerCase()}); } catch(e) {}
  if(sessionStorage.getItem('seiMartDeliveryLoggedIn')!=='true'||!staff||staff.role!=='delivery'||!live||String(live.role||'').toLowerCase()!=='delivery'||live.status==='Disabled'||live.status==='Suspended'){sessionStorage.removeItem('seiMartDeliveryLoggedIn');localStorage.removeItem('seiMartCurrentDelivery');location.replace('login.html');return}
  staff={name:live.name,username:live.username,role:'delivery',powers:['dashboard','orders','order-status','print-invoice']}; localStorage.setItem('seiMartCurrentDelivery',JSON.stringify(staff));
  window.deliveryStaff=staff;
  window.deliveryOrders=function(){var a=[];try{a=JSON.parse(localStorage.getItem('seiMartOrders')||'[]')}catch(e){}return Array.isArray(a)?a.filter(function(o){return String(o.deliveryStaffUsername||'').toLowerCase()===String(staff.username||'').toLowerCase()}):[]};
  window.saveDeliveryOrders=function(all){localStorage.setItem('seiMartOrders',JSON.stringify(all||[]))};
  window.escapeDelivery=function(v){return String(v==null?'':v).replace(/[&<>"']/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]})};
  window.deliveryLogout=function(){sessionStorage.removeItem('seiMartDeliveryLoggedIn');localStorage.removeItem('seiMartCurrentDelivery');location.href='login.html'};
  window.formatMoney=function(v){return '৳'+(Number(v)||0).toLocaleString('en-BD')};
  window.statusAllowed=function(status){return ['Processing','Out for Delivery','Delivered'].indexOf(status)>=0};
  window.setDeliveryStatus=function(orderId,status){
    if(!statusAllowed(status)){alert('Invalid delivery status.');return false}
    var all=[];try{all=JSON.parse(localStorage.getItem('seiMartOrders')||'[]')}catch(e){}
    var i=all.findIndex(function(o){return String(o.orderId||o.id)===String(orderId)});
    if(i<0){alert('Order not found.');return false}
    var o=all[i];
    if(String(o.deliveryStaffUsername||'').toLowerCase()!==String(staff.username||'').toLowerCase()){alert('You can only update your assigned orders.');return false}
    var old=o.status||'Order Placed';
    if(old==='Delivered' && status!=='Delivered'){alert('A delivered order cannot be moved back by Delivery.');return false}
    o.status=status;o.statusUpdatedAt=new Date().toISOString();o.updatedAt=o.statusUpdatedAt;
    if(status==='Delivered'&&!o.deliveredAt)o.deliveredAt=o.statusUpdatedAt;
    if(!Array.isArray(o.statusHistory))o.statusHistory=[];
    o.statusHistory.push({status:status,at:o.statusUpdatedAt,label:new Date(o.statusUpdatedAt).toLocaleString('en-BD'),note:'Updated by delivery staff: '+staff.name});
    all[i]=o;saveDeliveryOrders(all);return true;
  };
  var chip=document.getElementById('staffChip');if(chip)chip.textContent='🚚 '+(staff.name||staff.username);
})();
