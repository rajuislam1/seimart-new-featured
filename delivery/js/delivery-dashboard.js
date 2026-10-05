(function(){
  var orders=deliveryOrders();
  document.getElementById('welcomeText').textContent='Welcome, '+(deliveryStaff.name||deliveryStaff.username);
  document.getElementById('assignedCount').textContent=orders.filter(function(o){return !/delivered|cancel/i.test(o.status||'')}).length;
  document.getElementById('processingCount').textContent=orders.filter(function(o){return String(o.status||'').toLowerCase()==='processing'}).length;
  document.getElementById('outCount').textContent=orders.filter(function(o){return String(o.status||'').toLowerCase()==='out for delivery'}).length;
  document.getElementById('deliveredCount').textContent=orders.filter(function(o){return String(o.status||'').toLowerCase()==='delivered'}).length;
  var el=document.getElementById('recentOrders');
  var active=orders.slice().reverse().slice(0,6);
  if(!active.length){el.innerHTML='<div class="empty">No orders are currently assigned to you.</div>';return}
  el.innerHTML=active.map(function(o){var c=o.customer||{};return '<a class="mini-order" href="order-details.html?order='+encodeURIComponent(o.orderId||'')+'"><div><strong>'+escapeDelivery(o.orderId||'Order')+'</strong><small>'+escapeDelivery(c.name||'-')+' · '+escapeDelivery(c.phone||'')+'</small></div><div><span class="status">'+escapeDelivery(o.status||'Order Placed')+'</span><br><small>'+formatMoney(o.total)+'</small></div></a>'}).join('');
})();
