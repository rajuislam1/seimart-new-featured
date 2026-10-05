(function(){
  var search=document.getElementById('orderSearch'), filter=document.getElementById('statusFilter');
  function render(){
    var q=(search.value||'').trim().toLowerCase(), f=filter.value, orders=deliveryOrders().slice().reverse().filter(function(o){var c=o.customer||{};var hay=[o.orderId,c.name,c.phone,c.district,c.area].join(' ').toLowerCase();return (!q||hay.indexOf(q)>=0)&&(f==='all'||String(o.status||'')===f)});
    var el=document.getElementById('ordersTableWrap');
    if(!orders.length){el.innerHTML='<div class="empty">No assigned orders match your search.</div>';return}
    el.innerHTML='<div class="table-wrap"><table><thead><tr><th>Order ID</th><th>Customer</th><th>Address</th><th>Total</th><th>Payment</th><th>Status</th><th>Action</th></tr></thead><tbody>'+orders.map(function(o){var c=o.customer||{};return '<tr><td><strong>'+escapeDelivery(o.orderId||'-')+'</strong><br><small>'+escapeDelivery(o.date||o.createdAt||'')+'</small></td><td>'+escapeDelivery(c.name||'-')+'<br>'+escapeDelivery(c.phone||'-')+'</td><td>'+escapeDelivery([c.address,c.area,c.district].filter(Boolean).join(', ')||'-')+'</td><td><strong>'+formatMoney(o.total)+'</strong></td><td>'+escapeDelivery(o.paymentMethod||'Cash on Delivery')+'</td><td><span class="status">'+escapeDelivery(o.status||'Order Placed')+'</span></td><td><a class="action-btn" href="order-details.html?order='+encodeURIComponent(o.orderId||'')+'">View</a></td></tr>'}).join('')+'</tbody></table></div>';
  }
  search.addEventListener('input',render);filter.addEventListener('change',render);render();
})();
