
(function(){
  if (window.seiNotify) return;
  window.seiNotify = function(message, type){
    type = type || "info";
    var host = document.getElementById("seiToastHost");
    if (!host) {
      host = document.createElement("div");
      host.id = "seiToastHost";
      host.style.cssText = "position:fixed;right:16px;bottom:16px;z-index:99999;display:flex;flex-direction:column;gap:10px;max-width:min(360px,92vw);pointer-events:none;";
      document.body.appendChild(host);
    }
    var el = document.createElement("div");
    var bg = type === "error" ? "#c0392b" : (type === "success" ? "#2f644d" : "#17231d");
    el.style.cssText = "pointer-events:auto;background:"+bg+";color:#fff;padding:14px 16px;border-radius:12px;box-shadow:0 12px 32px rgba(0,0,0,.22);font-size:14px;font-weight:700;line-height:1.45;opacity:0;transform:translateY(12px);transition:opacity .25s,transform .25s;";
    el.textContent = String(message==null?"":message);
    host.appendChild(el);
    requestAnimationFrame(function(){ el.style.opacity="1"; el.style.transform="translateY(0)"; });
    setTimeout(function(){ el.style.opacity="0"; setTimeout(function(){ if(el.parentNode) el.remove(); },280); }, 2000);
  };
  var _a = window.alert;
  window.alert = function(msg){
    try { window.seiNotify(msg, /empty|error|invalid|fail|required|cannot|not found/i.test(String(msg))?"error":"info"); }
    catch(e){ if(_a) _a(msg); }
  };
})();

/* =====================================================
   SEI MART ADMIN PANEL
   REAL DATA CONNECTED VERSION
===================================================== */


/* =====================================================
   DATE
===================================================== */

function updateDate() {

    const dateElement =
        document.getElementById("currentDate");

    if (!dateElement) {
        return;
    }

    const now = new Date();

    dateElement.textContent =
        "📅 " +
        now.toLocaleDateString(
            "en-BD",
            {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric"
            }
        );
}


/* =====================================================
   ORDERS
===================================================== */

function getAdminOrders() {

    try {

        const data =
            localStorage.getItem(
                "seiMartOrders"
            );

        if (!data) {
            return [];
        }

        const orders =
            JSON.parse(data);

        return Array.isArray(orders)
            ? orders
            : [];

    } catch (error) {

        console.error(
            "Orders loading error:",
            error
        );

        return [];

    }

}


/* =====================================================
   REVIEWS
===================================================== */

function getAdminProductReviews() {

    try {

        const data =
            localStorage.getItem(
                "seiMartProductReviews"
            );

        if (!data) {
            return {};
        }

        return JSON.parse(data) || {};

    } catch (error) {

        return {};

    }

}


/* =====================================================
   SUPPORT REQUESTS
===================================================== */

function getAdminSupportRequests() {

    try {

        const data =
            localStorage.getItem(
                "seiMartSupportRequests"
            );

        if (!data) {
            return [];
        }

        const requests =
            JSON.parse(data);

        return Array.isArray(requests)
            ? requests
            : [];

    } catch (error) {

        return [];

    }

}


/* =====================================================
   CONTACT MESSAGES
===================================================== */

function getAdminContactMessages() {

    try {

        const data =
            localStorage.getItem(
                "seiMartContactMessages"
            );

        if (!data) {
            return [];
        }

        const messages =
            JSON.parse(data);

        return Array.isArray(messages)
            ? messages
            : [];

    } catch (error) {

        return [];

    }

}


/* =====================================================
   SAFE ELEMENT UPDATE
===================================================== */

function setAdminValue(
    id,
    value
) {

    const element =
        document.getElementById(id);

    if (element) {

        element.textContent =
            value;

    }

}


/* =====================================================
   ESCAPE HTML
===================================================== */

function escapeHTML(value) {

    return String(value ?? "")
        .replace(
            /&/g,
            "&amp;"
        )
        .replace(
            /</g,
            "&lt;"
        )
        .replace(
            />/g,
            "&gt;"
        )
        .replace(
            /"/g,
            "&quot;"
        )
        .replace(
            /'/g,
            "&#039;"
        );

}


/* =====================================================
   ORDER STATUS CLASS
===================================================== */

function getStatusClass(
    status
) {

    const value =
        String(
            status || ""
        ).toLowerCase();


    if (
        value.includes("cancel")
    ) {

        return "cancelled";

    }


    if (
        value.includes("deliver")
    ) {

        return "delivered";

    }


    if (
        value.includes("process") ||
        value.includes("ship")
    ) {

        return "processing";

    }


    if (
        value.includes("confirm")
    ) {

        return "confirmed";

    }


    return "pending";

}


/* =====================================================
   CUSTOMER COUNT
   UNIQUE CUSTOMERS FROM ORDERS
===================================================== */

function getCustomerCount(
    orders
) {

    const customers =
        new Set();


    orders.forEach(
        function(order) {

            const customer =
                order.customer || {};


            const identifier =
                customer.email ||
                customer.phone ||
                customer.name;


            if (identifier) {

                customers.add(
                    String(
                        identifier
                    )
                    .trim()
                    .toLowerCase()
                );

            }

        }
    );


    return customers.size;

}


/* =====================================================
   REVIEW COUNT
===================================================== */

function getReviewCount() {

    const reviews =
        getAdminProductReviews();


    let count = 0;


    Object.values(
        reviews
    ).forEach(
        function(productReviews) {

            if (
                Array.isArray(
                    productReviews
                )
            ) {

                count +=
                    productReviews.length;

            }

        }
    );


    return count;

}


/* =====================================================
   PRODUCT COUNT
   CURRENT CATALOG = 39
===================================================== */

function getProductCount() {
    try {
        var list = JSON.parse(localStorage.getItem("seiMartProducts") || "[]");
        if (Array.isArray(list) && list.length) return list.length;
    } catch (e) {}
    return 0;
}




    // =====================================================
// DASHBOARD DATA
// =====================================================


function renderAdminMiniCharts() {
    var host = document.getElementById("seiAdminChart");
    if (!host) {
        var grid = document.querySelector(".dashboard-grid") || document.getElementById("dashboardModule");
        if (!grid) return;
        host = document.createElement("div");
        host.id = "seiAdminChart";
        host.style.cssText = "grid-column:1/-1;background:#fff;border:1px solid #e3e9e4;border-radius:12px;padding:20px;margin-top:16px;";
        grid.parentNode.insertBefore(host, grid.nextSibling);
    }
    var orders = (typeof getAdminOrders === "function") ? getAdminOrders() : [];
    var statusCount = {};
    var revenue = 0;
    orders.forEach(function(o) {
        var s = o.status || "Order Placed";
        statusCount[s] = (statusCount[s] || 0) + 1;
        revenue += Number(o.total) || 0;
    });
    var max = 1;
    Object.keys(statusCount).forEach(function(k){ if (statusCount[k] > max) max = statusCount[k]; });
    var bars = Object.keys(statusCount).map(function(k) {
        var h = Math.round((statusCount[k] / max) * 100);
        return '<div style="flex:1;min-width:60px;text-align:center;">' +
            '<div style="height:120px;display:flex;align-items:flex-end;justify-content:center;">' +
            '<div style="width:70%;height:' + h + '%;background:linear-gradient(180deg,#3f6f5a,#5a9a7a);border-radius:8px 8px 0 0;" title="' + statusCount[k] + '"></div></div>' +
            '<div style="font-size:11px;margin-top:6px;color:#555;">' + k.replace("Order ","") + '</div>' +
            '<div style="font-weight:700;color:#17231d;font-size:13px;">' + statusCount[k] + '</div></div>';
    }).join("");
    host.innerHTML = '<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px;">' +
        '<h3 style="margin:0;color:#17231d;">Orders by Status</h3>' +
        '<span style="color:#3f6f5a;font-weight:700;">Revenue ৳' + revenue.toLocaleString("en-BD") + '</span></div>' +
        '<div style="display:flex;gap:10px;align-items:flex-end;flex-wrap:wrap;">' + (bars || '<p style="color:#999;">No order data yet</p>') + '</div>';
}

function loadDashboardData() {
    setTimeout(function(){ try { renderAdminMiniCharts(); } catch(e) {} }, 50);


    try {

        const orders =
            getAdminOrders();


        /* =========================================
           TOTAL ORDERS
        ========================================= */

        setAdminValue(
            "totalOrders",
            orders.length
        );


        /* =========================================
           TOTAL SALES
        ========================================= */

        const totalSales =
            orders.reduce(
                function(
                    total,
                    order
                ) {

                    return (
                        total +
                        Number(
                            order.total || 0
                        )
                    );

                },
                0
            );


        setAdminValue(
            "totalSales",
            "৳" +
            totalSales.toLocaleString()
        );


        /* =========================================
           CUSTOMERS
        ========================================= */

        const customerCount =
            getCustomerCount(
                orders
            );


        setAdminValue(
            "totalCustomers",
            customerCount
        );


        /* =========================================
           CUSTOMER LABEL
        ========================================= */

        const customerElement =
            document.getElementById(
                "totalCustomers"
            );


        if (customerElement) {

            const card =
                customerElement.closest(
                    ".stat-card"
                );


            if (card) {

                const label =
                    card.querySelector(
                        ".stat-label"
                    );


                if (label) {

                    label.textContent =
                        "Customers";

                }

            }

        }


        /* =========================================
           PENDING ORDERS
        ========================================= */

        const pending =
            orders.filter(
                function(order) {

                    const status =
                        String(
                            order.status || ""
                        )
                        .trim()
                        .toLowerCase();


                    return (
                        status === "pending" ||
                        status === "order placed"
                    );

                }
            ).length;


        setAdminValue(
            "pendingOrders",
            pending
        );


        /* =========================================
           OPTIONAL STATUS ELEMENTS
        ========================================= */

        setAdminValue(
            "statusPending",
            pending
        );


        /* =========================================
           CONFIRMED ORDERS
        ========================================= */

        const confirmed =
            orders.filter(
                function(order) {

                    const status =
                        String(
                            order.status || ""
                        )
                        .trim()
                        .toLowerCase();


                    return (
                        status === "confirmed" ||
                        status === "order confirmed"
                    );

                }
            ).length;


        setAdminValue(
            "statusConfirmed",
            confirmed
        );


        /* =========================================
           PROCESSING ORDERS
        ========================================= */

        const processing =
            orders.filter(
                function(order) {

                    return (
                        String(
                            order.status || ""
                        )
                        .trim()
                        .toLowerCase()
                        === "processing"
                    );

                }
            ).length;


        setAdminValue(
            "statusProcessing",
            processing
        );


        /* =========================================
           SHIPPED ORDERS
        ========================================= */

        const shipped =
            orders.filter(
                function(order) {

                    return (
                        String(
                            order.status || ""
                        )
                        .trim()
                        .toLowerCase()
                        === "shipped"
                    );

                }
            ).length;


        setAdminValue(
            "statusShipped",
            shipped
        );


        /* =========================================
           DELIVERED ORDERS
        ========================================= */

        const delivered =
            orders.filter(
                function(order) {

                    return (
                        String(
                            order.status || ""
                        )
                        .trim()
                        .toLowerCase()
                        === "delivered"
                    );

                }
            ).length;


        setAdminValue(
            "statusDelivered",
            delivered
        );


        /* =========================================
           CANCELLED ORDERS
        ========================================= */

        const cancelled =
            orders.filter(
                function(order) {

                    return (
                        String(
                            order.status || ""
                        )
                        .trim()
                        .toLowerCase()
                        === "cancelled"
                    );

                }
            ).length;


        setAdminValue(
            "statusCancelled",
            cancelled
        );


        /* =========================================
           COD ORDERS
        ========================================= */

        const cod =
            orders.filter(
                function(order) {

                    return (
                        /cash\s*on\s*delivery|\bcod\b/i.test(String(order.paymentMethod || ""))
                    );

                }
            ).length;


        setAdminValue(
            "codCount",
            cod
        );


        /* =========================================
           BKASH ORDERS
        ========================================= */

        const bkash =
            orders.filter(
                function(order) {

                    return (
                        String(
                            order.paymentMethod || ""
                        )
                        .trim()
                        .toLowerCase()
                        === "bkash"
                    );

                }
            ).length;


        setAdminValue(
            "bkashCount",
            bkash
        );


        /* =========================================
           PRODUCT COUNT
        ========================================= */

        setAdminValue(
            "productCount",
            getProductCount()
        );


        /* =========================================
           CATEGORY COUNT
        ========================================= */

        setAdminValue(
            "categoryCount",
            10
        );


        /* =========================================
           REVIEW COUNT
        ========================================= */

        setAdminValue(
            "reviewCount",
            getReviewCount()
        );


        /* =========================================
           ORDER BADGE
        ========================================= */

        const orderBadges =
            document.querySelectorAll(
                '[data-module="all-orders"] .menu-badge'
            );


        orderBadges.forEach(
            function(badge) {

                badge.textContent =
                    orders.length;

            }
        );


        /* =========================================
           SUPPORT BADGES
        ========================================= */

        const supportRequests =
            getAdminSupportRequests();


        const contactMessages =
            getAdminContactMessages();


        const supportCount =
            supportRequests.length +
            contactMessages.length;


        const supportBadges =
            document.querySelectorAll(
                ".menu-badge.red"
            );


        supportBadges.forEach(
            function(badge) {

                badge.textContent =
                    supportCount;

            }
        );


        /* =========================================
           RECENT ORDERS
        ========================================= */

        renderRecentOrders(
            orders
        );


    } catch (error) {

        console.error(
            "Dashboard error:",
            error
        );

    }

}


/* =====================================================
   ALL ORDERS MODULE
===================================================== */

        try {
            var sellers = JSON.parse(localStorage.getItem("seiMartSellers") || "[]");
            var activeSellers = (sellers || []).filter(function(s){ return !s.status || s.status === "Active"; }).length;
            var elS = document.getElementById("totalSellers");
            if (elS) elS.textContent = String(activeSellers || (sellers && sellers.length) || 0);
        } catch (e) {
            var elS2 = document.getElementById("totalSellers");
            if (elS2) elS2.textContent = "0";
        }

function loadAllOrdersModule() {

    const container =
        document.getElementById(
            "adminModuleContent"
        );


    if (!container) {
        return;
    }


    const orders =
        getAdminOrders();


    container.className =
        "admin-orders-module";


    if (!orders.length) {

        container.innerHTML = `

            <div class="module-empty">

                <div class="placeholder-icon">
                    📦
                </div>

                <h2>
                    No Orders Found
                </h2>

                <p>
                    There are currently no customer
                    orders in Sei Mart.
                </p>

            </div>

        `;

        return;

    }


    container.innerHTML = `

        <div class="orders-module-header">

            <div>

                <h2>
                    All Orders
                </h2>

                <p>
                    Manage all customer orders
                </p>

            </div>


            <div class="orders-count">

                ${orders.length} Orders

            </div>

        </div>


        <div class="orders-table-wrapper">

            <table class="admin-orders-table">

                <thead>

                    <tr>

                        <th>
                            Order ID
                        </th>

                        <th>
                            Date
                        </th>

                        <th>
                            Customer
                        </th>

                        <th>
                            Items
                        </th>

                        <th>
                            Total
                        </th>

                        <th>
                            Payment
                        </th>

                        <th>
                            Payment Status
                        </th>

                        <th>
                            Order Status
                        </th>

                        <th>
                            Action
                        </th>

                    </tr>

                </thead>


                <tbody>

                    ${orders.map(
                        function(order) {

                            const customer =
                                order.customer || {};


                            const customerName =
                                customer.name ||
                                "Guest Customer";


                            const itemCount =
                                (
                                    order.items || []
                                ).reduce(
                                    function(
                                        total,
                                        item
                                    ) {

                                        return (
                                            total +
                                            Number(
                                                item.quantity || 1
                                            )
                                        );

                                    },
                                    0
                                );


                            return `

                                <tr>

                                    <td>

                                        <strong>
                                            ${escapeHTML(
                                                order.orderId || "-"
                                            )}
                                        </strong>

                                    </td>


                                    <td>

                                        ${escapeHTML(
                                            order.date || "-"
                                        )}

                                    </td>


                                    <td>

                                        ${escapeHTML(
                                            customerName
                                        )}

                                    </td>


                                    <td>

                                        ${itemCount}

                                    </td>


                                    <td>

                                        <strong>

                                            ৳${Number(
                                                order.total || 0
                                            ).toLocaleString()}

                                        </strong>

                                    </td>


                                    <td>

                                        ${escapeHTML(
                                            order.paymentMethod || "-"
                                        )}

                                    </td>


                                    <td>

                                        <span
                                            class="admin-status-badge payment">

                                            ${escapeHTML(
                                                order.paymentStatus || "-"
                                            )}

                                        </span>

                                    </td>


                                    <td>

                                        <span
                                            class="admin-status-badge order">

                                            ${escapeHTML(
                                                order.status || "-"
                                            )}

                                        </span>

                                    </td>


                                    <td>

                                        <button
                                            type="button"
                                            class="admin-view-order-btn"
                                            onclick="viewAdminOrder('${String(
                                                order.orderId || ""
                                            ).replace(
                                                /'/g,
                                                "\\'"
                                            )}')">

                                            View

                                        </button>

                                    </td>

                                </tr>

                            `;

                        }
                    ).join("")}

                </tbody>

            </table>

        </div>

    `;

}


/* =====================================================
   VIEW ADMIN ORDER DETAILS
===================================================== */

function viewAdminOrder(orderId) {

    const orders =
        getAdminOrders();


    const order =
        orders.find(
            function(item) {

                return String(
                    item.orderId || ""
                ) === String(orderId || "");

            }
        );


    const container =
        document.getElementById(
            "adminModuleContent"
        );


    if (!container) {
        return;
    }


    /* =========================================
       ORDER NOT FOUND
    ========================================= */

    if (!order) {

        container.className =
            "admin-orders-module";

        container.innerHTML = `

            <div class="module-empty">

                <div class="placeholder-icon">
                    ⚠️
                </div>

                <h2>
                    Order Not Found
                </h2>

                <p>
                    The requested order could not be found.
                </p>

                <button
                    type="button"
                    class="admin-view-order-btn"
                    onclick="loadAllOrdersModule()">

                    ← Back to All Orders

                </button>

            </div>

        `;

        return;

    }


    /* =========================================
       BASIC DATA
    ========================================= */

    const customer =
        order.customer || {};


    const items =
        Array.isArray(order.items)
            ? order.items
            : [];


    const orderStatus =
        order.status ||
        "Order Placed";


    const paymentMethod =
        order.paymentMethod ||
        "-";


    const paymentStatus =
        order.paymentStatus ||
        "-";


    const transactionId =
        order.transactionId ||
        "";


    const subtotal =
        Number(
            order.subtotal || 0
        );


    const total =
        Number(
            order.total || 0
        );


    /* =========================================
       ITEM TOTAL
    ========================================= */

    const itemRows =
        items.length
            ? items.map(
                function(item) {

                    const quantity =
                        Number(
                            item.quantity || 1
                        );


                    const price =
                        Number(
                            item.price || 0
                        );


                    const itemTotal =
                        price * quantity;


                    const productName =
                        item.name ||
                        item.productName ||
                        "Product";


                    return `

                        <tr>

                            <td>

                                <div
                                    class="admin-order-product">

                                    <strong>
                                        ${escapeHTML(
                                            productName
                                        )}
                                    </strong>

                                </div>

                            </td>


                            <td>

                                ৳${price.toLocaleString()}

                            </td>


                            <td>

                                ${quantity}

                            </td>


                            <td>

                                <strong>

                                    ৳${itemTotal.toLocaleString()}

                                </strong>

                            </td>

                        </tr>

                    `;

                }
            ).join("")
            : `

                <tr>

                    <td
                        colspan="4"
                        style="
                            text-align:center;
                            padding:30px;
                            color:#7b877f;
                        ">

                        No items found

                    </td>

                </tr>

            `;


    /* =========================================
       TRANSACTION ID
    ========================================= */

    const transactionHTML =
        transactionId
            ? `

                <div class="admin-detail-row">

                    <span>
                        Transaction ID
                    </span>

                    <strong>
                        ${escapeHTML(
                            transactionId
                        )}
                    </strong>

                </div>

            `
            : "";


    /* =========================================
       CUSTOMER ADDRESS
    ========================================= */

    const customerAddress =
        customer.address ||
        customer.fullAddress ||
        order.address ||
        "-";


    /* =========================================
       RENDER DETAILS
    ========================================= */

    container.className =
        "admin-orders-module";


    container.innerHTML = `

        <div class="orders-module-header">

            <div>

                <h2>
                    Order Details
                </h2>

                <p>
                    Complete information for
                    ${escapeHTML(
                        order.orderId || "-"
                    )}
                </p>

            </div>


            <div class="orders-count">

                ${escapeHTML(
                    order.orderId || "-"
                )}

            </div>

        </div>


        <!-- =====================================
             ORDER INFORMATION
        ====================================== -->

        <div class="admin-detail-card">

            <div class="admin-detail-card-header">

                <h3>
                    Order Information
                </h3>

            </div>


            <div class="admin-detail-grid">

                <div class="admin-detail-row">

                    <span>
                        Order ID
                    </span>

                    <strong>
                        ${escapeHTML(
                            order.orderId || "-"
                        )}
                    </strong>

                </div>


                <div class="admin-detail-row">

                    <span>
                        Order Date
                    </span>

                    <strong>
                        ${escapeHTML(
                            order.date || "-"
                        )}
                    </strong>

                </div>


                <div class="admin-detail-row">

                    <span>
                        Order Status
                    </span>

                    <strong>

                        ${escapeHTML(
                            orderStatus
                        )}

                    </strong>

                </div>


                <div class="admin-detail-row">

                    <span>
                        Payment Method
                    </span>

                    <strong>

                        ${escapeHTML(
                            paymentMethod
                        )}

                    </strong>

                </div>


                <div class="admin-detail-row">

                    <span>
                        Payment Status
                    </span>

                    <strong>

                        ${escapeHTML(
                            paymentStatus
                        )}

                    </strong>

                </div>


                ${transactionHTML}

            </div>

        </div>


        <!-- =====================================
             CUSTOMER INFORMATION
        ====================================== -->

        <div class="admin-detail-card">

            <div class="admin-detail-card-header">

                <h3>
                    Customer Information
                </h3>

            </div>


            <div class="admin-detail-grid">

                <div class="admin-detail-row">

                    <span>
                        Customer Name
                    </span>

                    <strong>

                        ${escapeHTML(
                            customer.name ||
                            "Guest Customer"
                        )}

                    </strong>

                </div>


                <div class="admin-detail-row">

                    <span>
                        Email
                    </span>

                    <strong>

                        ${escapeHTML(
                            customer.email ||
                            "-"
                        )}

                    </strong>

                </div>


                <div class="admin-detail-row">

                    <span>
                        Phone
                    </span>

                    <strong>

                        ${escapeHTML(
                            customer.phone ||
                            customer.mobile ||
                            "-"
                        )}

                    </strong>

                </div>


                <div class="admin-detail-row">

                    <span>
                        Address
                    </span>

                    <strong>

                        ${escapeHTML(
                            customerAddress
                        )}

                    </strong>

                </div>

            </div>

        </div>


        <!-- =====================================
             ORDERED ITEMS
        ====================================== -->

        <div class="admin-detail-card">

            <div class="admin-detail-card-header">

                <h3>
                    Ordered Items
                </h3>

            </div>


            <div class="orders-table-wrapper">

                <table class="admin-orders-table">

                    <thead>

                        <tr>

                            <th>
                                Product
                            </th>

                            <th>
                                Price
                            </th>

                            <th>
                                Quantity
                            </th>

                            <th>
                                Total
                            </th>

                        </tr>

                    </thead>


                    <tbody>

                        ${itemRows}

                    </tbody>

                </table>

            </div>

        </div>


        <!-- =====================================
             ORDER SUMMARY
        ====================================== -->

        <div class="admin-detail-card">

            <div class="admin-detail-card-header">

                <h3>
                    Order Summary
                </h3>

            </div>


            <div class="admin-order-summary">

                <div>

                    <span>
                        Subtotal
                    </span>

                    <strong>
                        ৳${subtotal.toLocaleString()}
                    </strong>

                </div>


                <div class="admin-order-summary-total">

                    <span>
                        Total
                    </span>

                    <strong>
                        ৳${total.toLocaleString()}
                    </strong>

                </div>

            </div>

        </div>


        <!-- =====================================
             BACK BUTTON
        ====================================== -->

        <div
            style="
                margin-top:20px;
                display:flex;
                gap:12px;
                flex-wrap:wrap;
            ">

            <button
                type="button"
                class="admin-view-order-btn"
                onclick="loadAllOrdersModule()">

                ← Back to All Orders

            </button>

        </div>

    `;


    /* =========================================
       UPDATE PAGE TITLE
    ========================================= */

    const pageTitle =
        document.getElementById(
            "pageTitle"
        );


    const pageSubtitle =
        document.getElementById(
            "pageSubtitle"
        );


    if (pageTitle) {

        pageTitle.textContent =
            "Order Details";

    }


    if (pageSubtitle) {

        pageSubtitle.textContent =
            "Complete customer order information";

    }


    /* =========================================
       SCROLL TOP
    ========================================= */

    window.scrollTo(
        {
            top: 0,
            behavior: "smooth"
        }
    );

}

/* =====================================================
   RECENT ORDERS
===================================================== */

function renderRecentOrders(
    orders
) {

    const tbody =
        document.getElementById(
            "recentOrdersBody"
        );


    if (!tbody) {
        return;
    }


    if (
        !Array.isArray(
            orders
        ) ||
        orders.length === 0
    ) {

        tbody.innerHTML = `

            <tr>

                <td
                    colspan="4"
                    style="
                        text-align:center;
                        padding:35px;
                        color:#8b968f;
                    ">

                    📦 No orders yet

                </td>

            </tr>

        `;

        return;

    }


    const recentOrders =
        orders
            .slice()
            .reverse()
            .slice(
                0,
                5
            );


    tbody.innerHTML =
        recentOrders
            .map(
                function(order) {

                    const customer =
                        order.customer || {};


                    const name =
                        customer.name ||
                        "Customer";


                    const email =
                        customer.email ||
                        "";


                    const firstLetter =
                        name
                            .charAt(0)
                            .toUpperCase();


                    const status =
                        order.status ||
                        "Order Placed";


                    const statusClass =
                        getStatusClass(
                            status
                        );


                    return `

                        <tr>

                            <td>

                                <span
                                    class="order-id">

                                    ${escapeHTML(
                                        order.orderId ||
                                        "-"
                                    )}

                                </span>

                            </td>


                            <td>

                                <div
                                    class="customer-cell">

                                    <div
                                        class="customer-mini-avatar">

                                        ${escapeHTML(
                                            firstLetter
                                        )}

                                    </div>

                                    <div>

                                        <div
                                            class="customer-name">

                                            ${escapeHTML(
                                                name
                                            )}

                                        </div>

                                        <div
                                            class="customer-email">

                                            ${escapeHTML(
                                                email
                                            )}

                                        </div>

                                    </div>

                                </div>

                            </td>


                            <td>

                                <strong>

                                    ৳${Number(
                                        order.total || 0
                                    ).toLocaleString()}

                                </strong>

                            </td>


                            <td>

                                <span
                                    class="status ${statusClass}">

                                    ${escapeHTML(
                                        status
                                    )}

                                </span>

                            </td>

                        </tr>

                    `;

                }
            )
            .join("");

}

/* =====================================================
   SUBMENU
===================================================== */

document
    .querySelectorAll(
        ".has-submenu > .menu-link"
    )
    .forEach(
        function(button) {

            button.addEventListener(
                "click",
                function() {

                    const parent =
                        this.parentElement;


                    parent.classList.toggle(
                        "open"
                    );

                }
            );

        }
    );


/* =====================================================
   MODULE TITLES
===================================================== */

const moduleTitles = {

    "dashboard":
        [
            "Dashboard",
            "Overview of your store performance"
        ],

    "all-orders":
        [
            "All Orders",
            "Manage all customer orders"
        ],

    "pending-orders":
        [
            "Pending Orders",
            "Orders waiting for action"
        ],

    "confirmed-orders":
        [
            "Confirmed Orders",
            "Confirmed customer orders"
        ],

    "processing-orders":
        [
            "Processing Orders",
            "Orders currently being prepared"
        ],

    "shipped-orders":
        [
            "Shipped Orders",
            "Orders handed over for delivery"
        ],

    "delivered-orders":
        [
            "Delivered Orders",
            "Successfully delivered orders"
        ],

    "cancelled-orders":
        [
            "Cancelled Orders",
            "Cancelled customer orders"
        ],

    "order-details":
        [
            "Order Details",
            "Detailed order management"
        ],

    "print-invoice":
        [
            "Print Invoice",
            "Generate customer invoices"
        ],

    "all-products":
        [
            "All Products",
            "Manage your product catalog"
        ],

    "add-product":
        [
            "Add Product",
            "Create a new product"
        ],

    "edit-product":
        [
            "Edit Product",
            "Update existing products"
        ],

    "delete-product":
        [
            "Delete Product",
            "Remove products from the store"
        ],

    "product-price":
        [
            "Product Price",
            "Manage product pricing"
        ],

    "product-discount":
        [
            "Product Discount",
            "Manage product discounts"
        ],

    "product-stock":
        [
            "Product Stock",
            "Manage individual stock"
        ],

    "product-images":
        [
            "Product Images",
            "Manage product images"
        ],

    "categories":
        [
            "Categories",
            "Manage product categories"
        ],

    "all-customers":
        [
            "All Customers",
            "Manage customers"
        ],

    "customer-details":
        [
            "Customer Details",
            "View customer information"
        ],

    "customer-orders":
        [
            "Customer Order History",
            "View customer purchase history"
        ],

    "cod-payments":
        [
            "COD Payments",
            "Manage Cash on Delivery payments"
        ],

    "bkash-payments":
        [
            "bKash Payments",
            "Manage bKash payments"
        ],

    "payment-status":
        [
            "Payment Status",
            "Monitor payment status"
        ],

    "transaction-id":
        [
            "Transaction ID",
            "View payment transaction IDs"
        ],

    "coupons":
        [
            "Coupons & Discounts",
            "Manage coupons and promotional discounts"
        ],

    "reviews":
        [
            "Reviews & Ratings",
            "Manage customer reviews and ratings"
        ],

    "inventory-stock":
        [
            "Inventory Stock",
            "View and manage inventory"
        ],

    "low-stock":
        [
            "Low Stock",
            "Products with low inventory"
        ],

    "out-stock":
        [
            "Out of Stock",
            "Products currently unavailable"
        ],

    "sales-report":
        [
            "Sales Report",
            "View sales performance"
        ],

    "orders-report":
        [
            "Order Report",
            "Analyze order activity"
        ],

    "revenue-report":
        [
            "Revenue Report",
            "View revenue information"
        ],

    "top-products":
        [
            "Top Products",
            "View best-performing products"
        ],

    "customer-report":
        [
            "Customer Report",
            "Customer analytics"
        ],

    "customer-messages":
        [
            "Customer Messages",
            "Manage customer messages"
        ],

    "support-requests":
        [
            "Support Requests",
            "Manage support requests"
        ],

    "homepage-banner":
        [
            "Homepage Banner",
            "Manage homepage promotional banners"
        ],

    "todays-deals":
        [
            "Today's Deals",
            "Manage promotional products"
        ],

    "new-arrivals":
        [
            "New Arrivals",
            "Manage new products"
        ],

    "promo-popup":
        [
            "Promotional Popup",
            "Manage promotional popup"
        ],

    "settings":
        [
            "Settings",
            "Manage Sei Mart admin settings"
        ],

    "admin-profile":
        [
            "Admin Profile",
            "Manage administrator profile"
        ]

};


/* =====================================================
   SHOW MODULE
===================================================== */


/* =====================================================
   PROFESSIONAL MODULE SYSTEM
===================================================== */


function showModule(module) {
    // PERMISSION CHECK for staff roles (super admin = no staff session → full access)
    var __staff = (typeof getCurrentStaff === "function") ? getCurrentStaff() : null;
    if (__staff && __staff.role !== "admin" && !(Array.isArray(__staff.powers) && __staff.powers.indexOf("all") >= 0)) {
        var powerMap = {
            "dashboard": "dashboard",
            "all-orders": "orders", "pending-orders": "orders", "confirmed-orders": "orders",
            "processing-orders": "orders", "shipped-orders": "orders", "delivered-orders": "orders",
            "cancelled-orders": "orders", "order-details": "orders", "print-invoice": "print-invoice",
            "cod-payments": "orders", "bkash-payments": "orders", "payment-status": "orders",
            "all-customers": "customers", "customer-details": "customers", "customer-orders": "customers",
            "reviews": "reviews", "customer-messages": "messages", "support-requests": "support",
            "categories": "products", "coupons": "coupons",
            "inventory-stock": "inventory", "low-stock": "inventory", "out-stock": "inventory",
            "sales-report": "reports", "orders-report": "reports", "revenue-report": "reports",
            "top-products": "reports", "customer-report": "reports",
            "homepage-banner": "website", "todays-deals": "website", "new-arrivals": "website", "promo-popup": "website",
            "settings": "settings", "admin-profile": "settings",
            "staff-accounts": "staff", "seller-requests": "sellers", "affiliates": "affiliates", "delivery-management": "orders",
            "returns": "returns", "refunds": "returns", "delivery-management": "orders"
        };
        var need = powerMap[module] || "dashboard";
        var powers = __staff.powers || [];
        var ok = powers.indexOf(need) >= 0 || powers.indexOf("all") >= 0 || powers.indexOf("orders") >= 0 && need === "orders";
        // delivery role: only orders-related
        if (__staff.role === "delivery") {
            ok = need === "orders" || need === "print-invoice" || need === "dashboard" || module === "admin-profile";
        }
        if (!ok) {
            var container = document.getElementById("adminModuleContent");
            if (container) {
                container.innerHTML = '<div class="module-empty"><h2>Access Denied</h2><p>Your role does not have permission for this section.</p></div>';
            }
            return;
        }
    }

    if (!moduleTitles[module]) {
        console.warn("Unknown module:", module);
        return;
    }

    const title = moduleTitles[module][0];
    const subtitle = moduleTitles[module][1];

    const pageTitle = document.getElementById("pageTitle");
    const pageSubtitle = document.getElementById("pageSubtitle");
    const dashboardModule = document.getElementById("dashboardModule");
    const moduleArea = document.getElementById("moduleArea");

    if (pageTitle) pageTitle.textContent = title;
    if (pageSubtitle) pageSubtitle.textContent = subtitle;

    // Close mobile sidebar
    const sidebar = document.getElementById("sidebar");
    const sidebarOverlay = document.getElementById("sidebarOverlay");
    if (sidebar) sidebar.classList.remove("open");
    if (sidebarOverlay) sidebarOverlay.classList.remove("show");
    window.scrollTo({ top: 0, behavior: "smooth" });

    // DASHBOARD
    if (module === "dashboard") {
        if (dashboardModule) dashboardModule.style.display = "block";
        if (moduleArea) moduleArea.style.display = "none";
        loadDashboardData(); try { renderAdminMiniCharts(); } catch(e) {}
        return;
    }

    // Hide dashboard, show module area
    if (dashboardModule) dashboardModule.style.display = "none";
    if (moduleArea) moduleArea.style.display = "block";

    // ORDERS
    if (module === "all-orders") return loadOrdersModule("all");
    if (module === "pending-orders") return loadOrdersModule("pending");
    if (module === "confirmed-orders") return loadOrdersModule("confirmed");
    if (module === "processing-orders") return loadOrdersModule("processing");
    if (module === "shipped-orders") return loadOrdersModule("shipped");
    if (module === "delivered-orders") return loadOrdersModule("delivered");
    if (module === "cancelled-orders") return loadOrdersModule("cancelled");
    if (module === "order-details") return loadOrdersModule("all");
    if (module === "print-invoice") return loadPrintInvoiceModule();
    if (module === "cod-payments") return loadOrdersModule("cod");
    if (module === "bkash-payments") return loadOrdersModule("bkash");
    if (module === "payment-status") return loadOrdersModule("all");
    if (module === "transaction-id") return loadTransactionModule();

    // CUSTOMERS
    if (module === "all-customers") return loadCustomersModule();
    if (module === "customer-details") return loadCustomersModule();
    if (module === "customer-orders") return loadCustomerOrdersModule();

    // REVIEWS / SUPPORT
    if (module === "reviews") return loadReviewsModule();
    if (module === "customer-messages") return loadMessagesModule("contact");
    if (module === "support-requests") return loadMessagesModule("support");
    if (module === "returns" || module === "refunds") return loadReturnsModule();

    // NEW MODULES
    if (module === "categories") return loadCategoriesModule();
    if (module === "coupons") return loadCouponsModule();
    if (module === "inventory-stock") return loadInventoryModule("all");
    if (module === "low-stock") return loadInventoryModule("low");
    if (module === "out-stock") return loadInventoryModule("out");
    if (module === "sales-report" || module === "orders-report" || module === "revenue-report" ||
        module === "top-products" || module === "customer-report")
        return loadReportsModule(module);
    if (module === "homepage-banner" || module === "todays-deals" ||
        module === "new-arrivals" || module === "promo-popup")
        return loadWebsiteContentModule(module);
    if (module === "settings") return loadSettingsModule();
    if (module === "admin-profile") return loadAdminProfileModule();
    if (module === "staff-accounts" || module === "roles" || module === "team") {
        window.location.href = "admin/staff-rules.html";
        return;
    }
    if (module === "seller-requests") return loadSellerRequestsModule();
    if (module === "affiliates") return loadAffiliatesModule();

    // Products → dedicated page
    if (["all-products","add-product","edit-product","delete-product",
         "product-price","product-discount","product-stock","product-images"].includes(module)) {
        window.location.href = "admin/products/products.html";
        return;
    }

    showPlaceholder(title, subtitle);
}

function showPlaceholder(title, subtitle) {
    const container = document.getElementById("adminModuleContent");
    if (!container) return;
    container.className = "module-placeholder";
    container.innerHTML = `
        <div class="placeholder-icon">🧩</div>
        <h2>${escapeHTML(title)}</h2>
        <p>${escapeHTML(subtitle)}</p>
    `;
}

function formatAdminMoney(val) {
    return "৳" + (Number(val) || 0).toLocaleString("en-BD");
}

/* =====================================================
   ORDERS MODULE
===================================================== */
function loadOrdersModule(filter, searchQuery) {
    const container = document.getElementById("adminModuleContent");
    if (!container) return;
    window.__ordersFilter = filter || "all";
    let orders = getAdminOrders();

    if (filter === "pending")
        orders = orders.filter(o => /placed|pending/i.test(o.status || ""));
    else if (filter === "confirmed")
        orders = orders.filter(o => /confirmed/i.test(o.status || ""));
    else if (filter === "processing")
        orders = orders.filter(o => /processing/i.test(o.status || ""));
    else if (filter === "shipped")
        orders = orders.filter(o => /shipped/i.test(o.status || ""));
    else if (filter === "delivered")
        orders = orders.filter(o => /delivered/i.test(o.status || ""));
    else if (filter === "cancelled")
        orders = orders.filter(o => /cancel/i.test(o.status || ""));
    else if (filter === "cod")
        orders = orders.filter(o => /cash|cod/i.test(o.paymentMethod || ""));
    else if (filter === "bkash")
        orders = orders.filter(o => /bkash/i.test(o.paymentMethod || ""));

    const q = (searchQuery || "").trim().toLowerCase();
    if (q) {
        orders = orders.filter(o => {
            const c = o.customer || {};
            return String(o.orderId || "").toLowerCase().includes(q)
                || String(c.name || "").toLowerCase().includes(q)
                || String(c.phone || "").toLowerCase().includes(q)
                || String(c.email || "").toLowerCase().includes(q);
        });
    }

    container.className = "admin-orders-module";
    const label = filter === "all" ? "All Orders" : filter.charAt(0).toUpperCase() + filter.slice(1) + " Orders";
    var statuses = ["Order Placed","Order Confirmed","Processing","Shipped","Delivered","Cancelled"];
    // Delivery staff: only delivery-related statuses (no Shipped/Cancelled)
    try {
        var __st = JSON.parse(localStorage.getItem("seiMartCurrentStaff") || "null");
        if (__st && __st.role === "delivery") {
            statuses = ["Processing","Out for Delivery","Delivered"];
            orders = orders.filter(function(o){ return String(o.deliveryStaffUsername || "") === String(__st.username || ""); });
        }
    } catch(e) {}

    container.innerHTML = `
        <div class="orders-module-header">
            <div><h2>${escapeHTML(label)}</h2><p>Search by Order ID, then update status</p></div>
            <div class="orders-count">${orders.length} Orders</div>
        </div>
        <div style="background:#fff;border:1px solid #e3e9e4;border-radius:10px;padding:14px 16px;margin-bottom:16px;display:flex;gap:10px;flex-wrap:wrap;align-items:center;">
            <input type="text" id="adminOrderSearch" placeholder="Search Order ID, name, phone..." value="${escapeHTML(searchQuery||"")}"
                style="flex:1;min-width:220px;padding:10px 12px;border:1px solid #ccc;border-radius:8px;">
            <button type="button" class="admin-view-order-btn" style="background:#3f6f5a;color:#fff;" onclick="runAdminOrderSearch()">Search</button>
            <button type="button" class="admin-view-order-btn" onclick="loadOrdersModule(window.__ordersFilter||'all','')">Clear</button>
        </div>
        ${!orders.length ? `<div class="module-empty"><div class="placeholder-icon">📦</div><h2>No Orders Found</h2><p>No orders match this filter/search.</p></div>` : `
        <div class="orders-table-wrapper">
            <table class="admin-orders-table">
                <thead><tr>
                    <th>Order ID</th><th>Date</th><th>Customer</th><th>Items</th>
                    <th>Total</th><th>Payment</th><th>Status</th><th>Action</th>
                </tr></thead>
                <tbody>
                    ${orders.map(order => {
                        const c = order.customer || {};
                        const items = order.items || [];
                        const itemCount = items.reduce((s,i) => s + (Number(i.quantity)||1), 0);
                        const oid = String(order.orderId||"").replace(/'/g,"\\'");
                        const cur = order.status || "Order Placed";
                        return `<tr>
                            <td><strong>${escapeHTML(order.orderId||"-")}</strong></td>
                            <td>${escapeHTML(order.date||order.createdAt||"-")}</td>
                            <td>${escapeHTML(c.name||order.customerName||"-")}<br><small style="color:#7b877f">${escapeHTML(c.phone||"")}</small></td>
                            <td>${itemCount}</td>
                            <td><strong>${formatAdminMoney(order.total)}</strong></td>
                            <td>${escapeHTML(order.paymentMethod||"-")}</td>
                            <td><span class="admin-status-badge order">${escapeHTML(cur)}</span></td>
                            <td>
                                <div style="display:flex;flex-direction:column;gap:6px;min-width:160px;">
                                    <select id="status-sel-${escapeHTML(order.orderId||"")}" style="padding:6px 8px;border-radius:6px;border:1px solid #ccc;font-size:12px;">
                                        ${statuses.map(s => `<option value="${s}" ${cur===s?"selected":""}>${s}</option>`).join("")}
                                    </select>
                                    <div style="display:flex;gap:4px;flex-wrap:wrap;">
                                        <button type="button" class="admin-view-order-btn" style="background:#3f6f5a;color:#fff;font-size:11px;padding:5px 8px;" onclick="updateStatusFromSelect('${oid}')">Update Status</button>
                                        <button type="button" class="admin-view-order-btn" style="font-size:11px;padding:5px 8px;" onclick="viewAdminOrder('${oid}')">View</button>
                                    </div>
                                </div>
                            </td>
                        </tr>`;
                    }).join("")}
                </tbody>
            </table>
        </div>`}`;
}

function runAdminOrderSearch() {
    const q = (document.getElementById("adminOrderSearch") || {}).value || "";
    loadOrdersModule(window.__ordersFilter || "all", q);
}

function updateStatusFromSelect(orderId) {
    const sel = document.getElementById("status-sel-" + orderId);
    if (!sel) return;
    var st = sel.value;
    try {
        var staff = JSON.parse(localStorage.getItem("seiMartCurrentStaff") || "null");
        if (staff && staff.role === "delivery") {
            var allowed = ["Processing", "Out for Delivery", "Delivered"];
            if (allowed.indexOf(st) < 0) {
                alert("Delivery account can only set: Processing, Out for Delivery, Delivered");
                return;
            }
        }
    } catch(e) {}
    quickSetOrderStatus(orderId, st);
    try {
        var id = getLoggedAdminIdentity();
        logAdminActivity("Order status → " + st, "Order " + orderId + " updated by " + id.name, { to: "superadmin" });
    } catch (e) {}
}

function viewAdminOrder(orderId) {
    const orders = getAdminOrders();
    const order = orders.find(o => String(o.orderId) === String(orderId));
    const container = document.getElementById("adminModuleContent");
    if (!container) return;
    if (!order) {
        container.innerHTML = `<div class="module-empty"><h2>Order not found</h2></div>`;
        return;
    }
    const customer = order.customer || {};
    const items = order.items || [];
    const statuses = ["Order Placed","Order Confirmed","Processing","Shipped","Delivered","Cancelled"];
    const payStatuses = ["Pending","Paid","Failed","Refunded"];

    container.className = "admin-orders-module";
    container.innerHTML = `
        <div class="orders-module-header">
            <div><h2>Order ${escapeHTML(order.orderId)}</h2><p>Full order details & status management</p></div>
            <div style="display:flex;gap:10px;flex-wrap:wrap;">
                <button type="button" class="admin-view-order-btn" onclick="loadOrdersModule('all')">← Back to Orders</button>
                <button type="button" class="admin-view-order-btn" style="background:#d4a017;color:#fff;"
                    onclick="printOrderReceipt('${String(order.orderId||"").replace(/'/g,"\\'")}')">🧾 Print Receipt</button>
            </div>
        </div>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:24px;margin-top:20px;">
            <div style="background:#fff;border:1px solid #e3e9e4;border-radius:12px;padding:20px;">
                <h3 style="margin-bottom:12px;">Customer</h3>
                <p><strong>Name:</strong> ${escapeHTML(customer.name||"-")}</p>
                <p><strong>Email:</strong> ${escapeHTML(customer.email||"-")}</p>
                <p><strong>Phone:</strong> ${escapeHTML(customer.phone||"-")}</p>
                <p><strong>Address:</strong> ${escapeHTML([customer.address,customer.area,customer.district,customer.postCode].filter(Boolean).join(", ")||"-")}</p>
            </div>
            <div style="background:#fff;border:1px solid #e3e9e4;border-radius:12px;padding:20px;">
                <h3 style="margin-bottom:12px;">Order Info</h3>
                <p><strong>Date:</strong> ${escapeHTML(order.date||order.createdAt||"-")}</p>
                <p><strong>Payment:</strong> ${escapeHTML(order.paymentMethod||"-")}</p>
                <p><strong>Txn ID:</strong> ${escapeHTML(order.transactionId||order.trxId||"-")}</p>
                <p><strong>Total:</strong> <strong style="color:#3f6f5a">${formatAdminMoney(order.total)}</strong></p>
            </div>
        </div>
        <div style="background:#fff;border:1px solid #e3e9e4;border-radius:12px;padding:20px;margin-top:20px;">
            <h3 style="margin-bottom:14px;">Items</h3>
            <table class="admin-orders-table">
                <thead><tr><th>Product</th><th>Price</th><th>Qty</th><th>Subtotal</th></tr></thead>
                <tbody>
                    ${items.map(it => `<tr>
                        <td>${escapeHTML(it.name||it.id||"Product")}</td>
                        <td>${formatAdminMoney(it.price)}</td>
                        <td>${it.quantity||1}</td>
                        <td>${formatAdminMoney((Number(it.price)||0)*(Number(it.quantity)||1))}</td>
                    </tr>`).join("") || "<tr><td colspan='4'>No items</td></tr>"}
                </tbody>
            </table>
        </div>
        <div style="background:#fff;border:1px solid #e3e9e4;border-radius:12px;padding:20px;margin-top:20px;">
            <h3 style="margin-bottom:14px;">Status Timeline</h3>
            ${typeof buildStatusTimelineHTML === "function" ? buildStatusTimelineHTML(order) : ""}
        </div>
        <div style="background:#fff;border:1px solid #e3e9e4;border-radius:12px;padding:20px;margin-top:20px;">
            <h3 style="margin-bottom:14px;">Courier & Tracking (Steadfast)</h3>
            <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:12px;margin-bottom:18px;">
                <label style="font-size:13px;">Courier<br>
                    <select id="adminCourier" style="width:100%;margin-top:4px;padding:8px 12px;border-radius:6px;border:1px solid #ccc;">
                        <option value="">Select</option>
                        <option value="Steadfast" ${(order.courier||"")==="Steadfast"||(!(order.courier)&&/steadfast|cash on delivery/i.test(order.paymentMethod||""))?"selected":""}>Steadfast</option>
                        <option value="Pathao" ${(order.courier||"")==="Pathao"?"selected":""}>Pathao</option>
                        <option value="RedX" ${(order.courier||"")==="RedX"?"selected":""}>RedX</option>
                        <option value="Other" ${(order.courier||"")==="Other"?"selected":""}>Other</option>
                    </select>
                </label>
                <label style="font-size:13px;">Tracking / Consignment ID<br>
                    <input id="adminTrackingId" type="text" value="${escapeHTML(order.trackingId||order.consignmentId||"")}" placeholder="e.g. SF123456789" style="width:100%;margin-top:4px;padding:8px 12px;border-radius:6px;border:1px solid #ccc;box-sizing:border-box;">
                </label>
                <label style="font-size:13px;">Courier note<br>
                    <input id="adminCourierNote" type="text" value="${escapeHTML(order.courierNote||"")}" placeholder="Optional" style="width:100%;margin-top:4px;padding:8px 12px;border-radius:6px;border:1px solid #ccc;box-sizing:border-box;">
                </label>
            </div>
            <p style="font-size:13px;color:#7b877f;margin:0 0 16px;">Customer sees courier + tracking on Order Tracking page.</p>
            <h3 style="margin-bottom:14px;">Update Status</h3>
            <div style="display:flex;flex-wrap:wrap;gap:12px;align-items:center;">
                <label>Order Status:
                    <select id="adminOrderStatus" style="margin-left:8px;padding:8px 12px;border-radius:6px;border:1px solid #ccc;">
                        ${statuses.map(s => `<option value="${s}" ${(order.status||"")===s?"selected":""}>${s}</option>`).join("")}
                    </select>
                </label>
                <label>Payment Status:
                    <select id="adminPayStatus" style="margin-left:8px;padding:8px 12px;border-radius:6px;border:1px solid #ccc;">
                        ${payStatuses.map(s => `<option value="${s}" ${(order.paymentStatus||"")===s?"selected":""}>${s}</option>`).join("")}
                    </select>
                </label>
                <button type="button" class="admin-view-order-btn" style="background:#3f6f5a;color:#fff;padding:10px 18px;"
                    onclick="saveOrderStatusUpdate('${String(order.orderId).replace(/'/g,"\\'")}')">Save Changes</button>
            </div>
            <p id="orderUpdateMsg" style="margin-top:12px;color:#3f8c5a;display:none;">Status updated successfully.</p>
        </div>
        <div style="background:#fff;border:1px solid #e3e9e4;border-radius:12px;padding:20px;margin-top:20px;text-align:center;">
            <h3 style="margin-bottom:12px;">Documents</h3>
            <button type="button" class="admin-view-order-btn" style="background:#d4a017;color:#fff;padding:12px 24px;font-size:15px;"
                onclick="printOrderReceipt('${String(order.orderId||"").replace(/'/g,"\\'")}')">🧾 Print Invoice / Challan</button>
        </div>`;
}


function printOrderReceipt(orderId) {
    var orders = getAdminOrders();
    var order = orders.find(function (o) { return String(o.orderId) === String(orderId); });
    if (!order) { alert("Order not found."); return; }

    var customer = order.customer || {};
    var items = order.items || [];
    var storeName = "Sei Mart";
    try {
        var s = JSON.parse(localStorage.getItem("seiMartSettings") || "{}");
        if (s.storeName) storeName = s.storeName;
    } catch (e) {}

    var rows = items.map(function (it, i) {
        var qty = Number(it.quantity) || 1;
        var price = Number(it.price) || 0;
        return "<tr>" +
            "<td style='padding:8px;border-bottom:1px solid #eee;'>" + (i + 1) + "</td>" +
            "<td style='padding:8px;border-bottom:1px solid #eee;'>" + escapeHTML(it.name || it.id || "Product") + "</td>" +
            "<td style='padding:8px;border-bottom:1px solid #eee;text-align:center;'>" + qty + "</td>" +
            "<td style='padding:8px;border-bottom:1px solid #eee;text-align:right;'>" + formatAdminMoney(price) + "</td>" +
            "<td style='padding:8px;border-bottom:1px solid #eee;text-align:right;'>" + formatAdminMoney(price * qty) + "</td>" +
            "</tr>";
    }).join("") || "<tr><td colspan='5' style='padding:12px;text-align:center;'>No items</td></tr>";

    var address = [customer.address, customer.area, customer.district, customer.postCode].filter(Boolean).join(", ");

    var html = "<!DOCTYPE html><html><head><meta charset='UTF-8'><title>Receipt - " + escapeHTML(order.orderId || "") + "</title>" +
        "<style>" +
        "@page{size:A4;margin:12mm;}" +
        "body{font-family:Segoe UI,Arial,sans-serif;color:#17231d;margin:0;padding:24px;}" +
        ".top{display:flex;justify-content:space-between;border-bottom:3px solid #3f6f5a;padding-bottom:16px;margin-bottom:20px;}" +
        ".brand h1{margin:0;color:#3f6f5a;font-size:28px;}" +
        ".brand p{margin:4px 0 0;color:#7b877f;}" +
        ".meta{text-align:right;}" +
        ".grid{display:grid;grid-template-columns:1fr 1fr;gap:20px;margin-bottom:24px;}" +
        ".box{background:#f5f7f5;border:1px solid #e3e9e4;border-radius:8px;padding:14px 16px;}" +
        ".box h3{margin:0 0 10px;font-size:13px;text-transform:uppercase;letter-spacing:1px;color:#3f6f5a;}" +
        ".box p{margin:4px 0;font-size:14px;}" +
        "table{width:100%;border-collapse:collapse;margin-bottom:20px;}" +
        "th{background:#3f6f5a;color:#fff;padding:10px 8px;text-align:left;font-size:13px;}" +
        ".totals{margin-left:auto;width:280px;}" +
        ".totals .row{display:flex;justify-content:space-between;padding:6px 0;font-size:14px;}" +
        ".totals .grand{border-top:2px solid #3f6f5a;margin-top:8px;padding-top:10px;font-size:18px;font-weight:700;color:#3f6f5a;}" +
        ".footer{margin-top:36px;text-align:center;color:#7b877f;font-size:12px;border-top:1px dashed #ccc;padding-top:16px;}" +
        ".stamp{margin-top:28px;display:flex;justify-content:space-between;}" +
        ".stamp div{text-align:center;width:40%;}" +
        ".stamp .line{border-top:1px solid #333;margin-top:48px;padding-top:6px;font-size:12px;}" +
        "@media print{body{padding:0;}}" +
        "</style></head><body><div class='receipt'>" +
        "<div class='top'><div class='brand'><h1>" + escapeHTML(storeName) + "</h1>" +
        "<p>Official Invoice · Delivery Challan</p></div>" +
        "<div class='meta'><strong>" + escapeHTML(order.orderId || "-") + "</strong><br>" +
        "Date: " + escapeHTML(order.date || order.createdAt || "-") + "<br>" +
        "Status: " + escapeHTML(order.status || "-") + "</div></div>" +
        "<div class='grid'><div class='box'><h3>Customer / Ship To</h3>" +
        "<p><strong>" + escapeHTML(customer.name || order.customerName || "-") + "</strong></p>" +
        "<p>Phone: " + escapeHTML(customer.phone || "-") + "</p>" +
        "<p>Email: " + escapeHTML(customer.email || "-") + "</p>" +
        "<p>Address: " + escapeHTML(address || "-") + "</p></div>" +
        "<div class='box'><h3>Payment Info</h3>" +
        "<p>Method: " + escapeHTML(order.paymentMethod || "-") + "</p>" +
        "<p>Payment Status: " + escapeHTML(order.paymentStatus || "-") + "</p>" +
        "<p>Txn ID: " + escapeHTML(order.transactionId || order.trxId || "-") + "</p></div></div>" +
        "<table><thead><tr><th>#</th><th>Product</th><th style='text-align:center;'>Qty</th>" +
        "<th style='text-align:right;'>Price</th><th style='text-align:right;'>Subtotal</th></tr></thead>" +
        "<tbody>" + rows + "</tbody></table>" +
        "<div class='totals'>" +
        "<div class='row'><span>Total</span><span>" + formatAdminMoney(order.total) + "</span></div>" +
        "<div class='row grand'><span>Grand Total</span><span>" + formatAdminMoney(order.total) + "</span></div>" +
        "</div>" +
        "<div class='stamp'><div><div class='line'>Customer Signature</div></div>" +
        "<div><div class='line'>Authorized Signature</div></div></div>" +
        "<div class='footer'>Thank you for shopping with " + escapeHTML(storeName) + ".<br>" +
        "This is a computer-generated receipt / delivery challan.</div>" +
        "</div><scr" + "ipt>window.onload=function(){window.print();}</scr" + "ipt></body></html>";

    var w = window.open("", "_blank", "width=900,height=700");
    if (!w) { alert("Please allow popups to print the receipt."); return; }
    w.document.open();
    w.document.write(html);
    w.document.close();
}


function saveOrderStatusUpdate(orderId) {
    const status = document.getElementById("adminOrderStatus")?.value;
    const payStatus = document.getElementById("adminPayStatus")?.value;
    let orders = getAdminOrders();
    const idx = orders.findIndex(o => String(o.orderId) === String(orderId));
    if (idx < 0) return;
    if (typeof appendOrderStatus === "function") {
        orders[idx] = appendOrderStatus(orders[idx], status, "Updated by admin");
    } else {
        orders[idx].status = status;
        if (!Array.isArray(orders[idx].statusHistory)) orders[idx].statusHistory = [];
        orders[idx].statusHistory.push({
            status: status,
            at: new Date().toISOString(),
            label: new Date().toLocaleString("en-BD"),
            note: "Updated by admin"
        });
    }
    orders[idx].paymentStatus = payStatus;
    if (String(status).toLowerCase() === "delivered" && !orders[idx].deliveredAt) {
        orders[idx].deliveredAt = new Date().toISOString();
    }
    var courierEl = document.getElementById("adminCourier");
    var trackEl = document.getElementById("adminTrackingId");
    var noteEl = document.getElementById("adminCourierNote");
    if (courierEl) orders[idx].courier = courierEl.value || orders[idx].courier || "";
    if (trackEl) {
        orders[idx].trackingId = trackEl.value.trim();
        orders[idx].consignmentId = trackEl.value.trim();
    }
    if (noteEl) orders[idx].courierNote = noteEl.value.trim();
    if (typeof saveAdminOrders === "function") saveAdminOrders(orders);
    else localStorage.setItem("seiMartOrders", JSON.stringify(orders));
    try {
        if (typeof logAdminActivity === "function") {
            logAdminActivity("Courier/tracking updated", "Order " + orderId + " · " + (orders[idx].courier||"") + " " + (orders[idx].trackingId||""), { to: "superadmin" });
        }
    } catch(e) {}
    const msg = document.getElementById("orderUpdateMsg");
    if (msg) { msg.style.display = "block"; msg.textContent = "Status & courier info saved."; setTimeout(() => msg.style.display = "none", 2500); }
    if (typeof loadDashboardData === "function") loadDashboardData();
}

function quickSetOrderStatus(orderId, status) {
    try {
        var __d = JSON.parse(localStorage.getItem("seiMartCurrentStaff") || "null");
        if (__d && __d.role === "delivery") {
            var allow = ["Processing", "Out for Delivery", "Delivered"];
            if (allow.indexOf(status) < 0) {
                alert("Delivery account cannot set status: " + status);
                return;
            }
        }
    } catch(e) {}

    let orders = getAdminOrders();
    const idx = orders.findIndex(o => String(o.orderId) === String(orderId));
    if (idx < 0) {
        alert("Order not found");
        return;
    }
    if (String(status).toLowerCase() === "delivered" && !orders[idx].deliveredAt) {
        orders[idx].deliveredAt = new Date().toISOString();
    }
    if (typeof appendOrderStatus === "function") {
        orders[idx] = appendOrderStatus(orders[idx], status, "Marked by staff");
        try { logAdminActivity("Order status → " + status, "Order " + orderId + " updated", { to: "superadmin" }); } catch(e) {}
    } else {
        orders[idx].status = status;
        if (!Array.isArray(orders[idx].statusHistory)) orders[idx].statusHistory = [];
        orders[idx].statusHistory.push({
            status: status,
            at: new Date().toISOString(),
            label: new Date().toLocaleString("en-BD"),
            note: "Marked by staff"
        });
        try { logAdminActivity("Order status → " + status, "Order " + orderId + " updated", { to: "superadmin" }); } catch(e) {}
    }
    if (typeof saveAdminOrders === "function") saveAdminOrders(orders);
    else localStorage.setItem("seiMartOrders", JSON.stringify(orders));
    if (typeof loadDashboardData === "function") loadDashboardData();
    // refresh current list view
    const title = (document.getElementById("pageTitle") || {}).textContent || "";
    if (/pending/i.test(title)) loadOrdersModule("pending");
    else if (/confirm/i.test(title)) loadOrdersModule("confirmed");
    else if (/process/i.test(title)) loadOrdersModule("processing");
    else if (/ship/i.test(title)) loadOrdersModule("shipped");
    else if (/deliver/i.test(title)) loadOrdersModule("delivered");
    else if (/cancel/i.test(title)) loadOrdersModule("cancelled");
    else loadOrdersModule("all");
}

function loadTransactionModule() {
    const container = document.getElementById("adminModuleContent");
    if (!container) return;
    const orders = getAdminOrders().filter(o => o.transactionId || o.trxId || /bkash/i.test(o.paymentMethod||""));
    container.className = "admin-orders-module";
    if (!orders.length) {
        container.innerHTML = `<div class="module-empty"><div class="placeholder-icon">💳</div><h2>No Transactions</h2><p>bKash / online payment transactions will appear here.</p></div>`;
        return;
    }
    container.innerHTML = `
        <div class="orders-module-header"><div><h2>Transaction IDs</h2><p>Payment transaction records</p></div><div class="orders-count">${orders.length}</div></div>
        <div class="orders-table-wrapper"><table class="admin-orders-table">
            <thead><tr><th>Order ID</th><th>Customer</th><th>Method</th><th>Txn ID</th><th>Amount</th><th>Status</th></tr></thead>
            <tbody>${orders.map(o => {
                const c = o.customer||{};
                return `<tr>
                    <td><strong>${escapeHTML(o.orderId||"-")}</strong></td>
                    <td>${escapeHTML(c.name||"-")}</td>
                    <td>${escapeHTML(o.paymentMethod||"-")}</td>
                    <td><code>${escapeHTML(o.transactionId||o.trxId||"-")}</code></td>
                    <td>${formatAdminMoney(o.total)}</td>
                    <td>${escapeHTML(o.paymentStatus||"-")}</td>
                </tr>`;
            }).join("")}</tbody>
        </table></div>`;
}

/* =====================================================
   CUSTOMERS
===================================================== */

function loadPrintInvoiceModule() {
    const container = document.getElementById("adminModuleContent");
    if (!container) return;
    const orders = getAdminOrders();
    container.className = "admin-orders-module";
    container.innerHTML = `
        <div class="orders-module-header">
            <div><h2>Print Invoice</h2><p>Search order and print challan / invoice</p></div>
            <div class="orders-count">${orders.length} Orders</div>
        </div>
        <div style="background:#fff;border:1px solid #e3e9e4;border-radius:10px;padding:14px 16px;margin-bottom:16px;display:flex;gap:10px;flex-wrap:wrap;">
            <input type="text" id="printInvoiceSearch" placeholder="Enter Order ID..." style="flex:1;min-width:220px;padding:10px 12px;border:1px solid #ccc;border-radius:8px;">
            <button type="button" class="admin-view-order-btn" style="background:#3f6f5a;color:#fff;" onclick="searchPrintInvoice()">Find & Print</button>
        </div>
        <div class="orders-table-wrapper"><table class="admin-orders-table">
            <thead><tr><th>Order ID</th><th>Customer</th><th>Date</th><th>Total</th><th>Status</th><th>Action</th></tr></thead>
            <tbody>
                ${orders.slice().reverse().slice(0,50).map(o => {
                    const c = o.customer || {};
                    const oid = String(o.orderId||"").replace(/'/g,"\\'");
                    return `<tr>
                        <td><strong>${escapeHTML(o.orderId||"-")}</strong></td>
                        <td>${escapeHTML(c.name||"-")}</td>
                        <td>${escapeHTML(o.date||o.createdAt||"-")}</td>
                        <td>${formatAdminMoney(o.total)}</td>
                        <td>${escapeHTML(o.status||"-")}</td>
                        <td>
                            <button type="button" class="admin-view-order-btn" style="background:#d4a017;color:#fff;" onclick="printOrderReceipt('${oid}')">Print Invoice</button>
                            <button type="button" class="admin-view-order-btn" onclick="viewAdminOrder('${oid}')">View</button>
                        </td>
                    </tr>`;
                }).join("") || "<tr><td colspan='6'>No orders</td></tr>"}
            </tbody>
        </table></div>`;
}

function searchPrintInvoice() {
    const q = ((document.getElementById("printInvoiceSearch")||{}).value || "").trim();
    if (!q) { alert("Enter Order ID"); return; }
    const orders = getAdminOrders();
    const order = orders.find(o => String(o.orderId).toLowerCase() === q.toLowerCase() || String(o.orderId).toLowerCase().includes(q.toLowerCase()));
    if (!order) { alert("Order not found"); return; }
    if (typeof printOrderReceipt === "function") printOrderReceipt(order.orderId);
    else viewAdminOrder(order.orderId);
}

function loadCustomerOrdersModule() {
    // Show all customers with focus on order counts - reuse customers then prompt
    loadCustomersModule();
    setTimeout(function(){
        const t = document.getElementById("pageTitle");
        const s = document.getElementById("pageSubtitle");
        if (t) t.textContent = "Customer Order History";
        if (s) s.textContent = "Click Details on any customer to see their orders";
    }, 50);
}

function loadCustomersModule(searchQuery) {
    const container = document.getElementById("adminModuleContent");
    if (!container) return;
    const orders = getAdminOrders();
    const map = {};
    orders.forEach(o => {
        const c = o.customer || {};
        const key = (c.email || c.phone || c.name || "unknown").toLowerCase();
        if (!map[key]) {
            map[key] = {
                name: c.name || o.customerName || "Customer",
                email: c.email || "",
                phone: c.phone || "",
                address: [c.address, c.area, c.district].filter(Boolean).join(", "),
                orders: [],
                totalSpent: 0
            };
        }
        map[key].orders.push(o);
        map[key].totalSpent += Number(o.total) || 0;
    });
    let customers = Object.values(map);
    const q = (searchQuery || "").trim().toLowerCase();
    if (q) {
        customers = customers.filter(c =>
            String(c.name).toLowerCase().includes(q) ||
            String(c.email).toLowerCase().includes(q) ||
            String(c.phone).toLowerCase().includes(q)
        );
    }

    container.className = "admin-orders-module";
    container.innerHTML = `
        <div class="orders-module-header">
            <div><h2>Customers</h2><p>Search and view customer details</p></div>
            <div class="orders-count">${customers.length} Customers</div>
        </div>
        <div style="background:#fff;border:1px solid #e3e9e4;border-radius:10px;padding:14px 16px;margin-bottom:16px;display:flex;gap:10px;flex-wrap:wrap;">
            <input type="text" id="adminCustomerSearch" placeholder="Search name, email, phone..." value="${escapeHTML(searchQuery||"")}"
                style="flex:1;min-width:220px;padding:10px 12px;border:1px solid #ccc;border-radius:8px;">
            <button type="button" class="admin-view-order-btn" style="background:#3f6f5a;color:#fff;" onclick="runAdminCustomerSearch()">Search</button>
            <button type="button" class="admin-view-order-btn" onclick="loadCustomersModule('')">Clear</button>
        </div>
        ${!customers.length ? `<div class="module-empty"><div class="placeholder-icon">👥</div><h2>No Customers</h2><p>No customers match your search.</p></div>` : `
        <div class="orders-table-wrapper"><table class="admin-orders-table">
            <thead><tr><th>Name</th><th>Email</th><th>Phone</th><th>Orders</th><th>Total Spent</th><th>Action</th></tr></thead>
            <tbody>${customers.map((c, i) => `
                <tr>
                    <td><strong>${escapeHTML(c.name)}</strong></td>
                    <td>${escapeHTML(c.email||"-")}</td>
                    <td>${escapeHTML(c.phone||"-")}</td>
                    <td>${c.orders.length}</td>
                    <td><strong>${formatAdminMoney(c.totalSpent)}</strong></td>
                    <td><button type="button" class="admin-view-order-btn" onclick="viewCustomerDetails(${i}, '${escapeHTML((searchQuery||"").replace(/'/g,"\\'"))}')">Details</button></td>
                </tr>`).join("")}
            </tbody>
        </table></div>`}`;

    window.__customerListCache = customers;
}

function runAdminCustomerSearch() {
    const q = (document.getElementById("adminCustomerSearch") || {}).value || "";
    loadCustomersModule(q);
}

function viewCustomerDetails(index, searchQuery) {
    const list = window.__customerListCache || [];
    const c = list[index];
    const container = document.getElementById("adminModuleContent");
    if (!c || !container) return;

    container.innerHTML = `
        <div class="orders-module-header">
            <div><h2>Customer Details</h2><p>${escapeHTML(c.name)}</p></div>
            <button type="button" class="admin-view-order-btn" onclick="loadCustomersModule('${escapeHTML((searchQuery||"").replace(/'/g,"\\'"))}')">← Back</button>
        </div>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px;margin-bottom:20px;">
            <div style="background:#fff;border:1px solid #e3e9e4;border-radius:12px;padding:20px;">
                <h3 style="margin-bottom:10px;">Profile</h3>
                <p><strong>Name:</strong> ${escapeHTML(c.name)}</p>
                <p><strong>Email:</strong> ${escapeHTML(c.email||"-")}</p>
                <p><strong>Phone:</strong> ${escapeHTML(c.phone||"-")}</p>
                <p><strong>Address:</strong> ${escapeHTML(c.address||"-")}</p>
                <p><strong>Total Spent:</strong> ${formatAdminMoney(c.totalSpent)}</p>
            </div>
            <div style="background:#fff;border:1px solid #e3e9e4;border-radius:12px;padding:20px;">
                <h3 style="margin-bottom:10px;">Summary</h3>
                <p><strong>Total Orders:</strong> ${c.orders.length}</p>
            </div>
        </div>
        <div style="background:#fff;border:1px solid #e3e9e4;border-radius:12px;padding:20px;">
            <h3 style="margin-bottom:12px;">Order History</h3>
            <table class="admin-orders-table">
                <thead><tr><th>Order ID</th><th>Date</th><th>Total</th><th>Status</th><th>Action</th></tr></thead>
                <tbody>
                    ${c.orders.map(o => `
                        <tr>
                            <td><strong>${escapeHTML(o.orderId||"-")}</strong></td>
                            <td>${escapeHTML(o.date||o.createdAt||"-")}</td>
                            <td>${formatAdminMoney(o.total)}</td>
                            <td>${escapeHTML(o.status||"-")}</td>
                            <td><button type="button" class="admin-view-order-btn" onclick="viewAdminOrder('${String(o.orderId||"").replace(/'/g,"\\'")}')">View</button></td>
                        </tr>`).join("") || "<tr><td colspan='5'>No orders</td></tr>"}
                </tbody>
            </table>
        </div>`;
}

function loadReviewsModule() {
    const container = document.getElementById("adminModuleContent");
    if (!container) return;
    let allReviews = {};
    try { allReviews = JSON.parse(localStorage.getItem("seiMartProductReviews") || "{}"); } catch(e) {}
    const rows = [];
    Object.keys(allReviews).forEach(pid => (allReviews[pid]||[]).forEach(r => rows.push({ productId: pid, ...r })));
    container.className = "admin-orders-module";
    if (!rows.length) {
        container.innerHTML = `<div class="module-empty"><div class="placeholder-icon">⭐</div><h2>No Reviews Yet</h2><p>Customer reviews will show here.</p></div>`;
        return;
    }
    container.innerHTML = `
        <div class="orders-module-header"><div><h2>Reviews & Ratings</h2><p>All product reviews</p></div><div class="orders-count">${rows.length} Reviews</div></div>
        <div class="orders-table-wrapper"><table class="admin-orders-table">
            <thead><tr><th>Product</th><th>User</th><th>Rating</th><th>Comment</th><th>Date</th></tr></thead>
            <tbody>${rows.map(r => `<tr>
                <td>${escapeHTML(r.productId)}</td>
                <td>${escapeHTML(r.name||r.user||"Anonymous")}</td>
                <td>${"★".repeat(Number(r.rating)||0)}${"☆".repeat(5-(Number(r.rating)||0))}</td>
                <td>${escapeHTML(r.comment||r.text||"-")}</td>
                <td>${escapeHTML(r.date||"-")}</td>
            </tr>`).join("")}</tbody>
        </table></div>`;
}

/* =====================================================
   MESSAGES / SUPPORT
===================================================== */

function loadReturnsModule() {
    const container = document.getElementById("adminModuleContent");
    if (!container) return;
    let list = [];
    try { list = JSON.parse(localStorage.getItem("seiMartReturns") || "[]"); } catch (e) {}
    const statuses = ["Requested","Approved","Pickup Scheduled","Received","Inspecting","Refund Approved","Refunded","Rejected"];
    container.className = "admin-orders-module";
    container.innerHTML = `
        <div class="orders-module-header"><div><h2>Return / Refund Requests</h2><p>Customer requests after delivery — inspect, approve and complete refund.</p></div>
        <div class="orders-count">${list.length}</div></div>
        ${!list.length ? `<div class="module-empty"><h2>No return requests</h2><p>Return requests will appear here only after a customer receives a delivered order.</p></div>` : `
        <div class="orders-table-wrapper"><table class="admin-orders-table">
            <thead><tr><th>ID</th><th>Order</th><th>Customer</th><th>Products</th><th>Reason</th><th>Status</th><th>Action</th></tr></thead>
            <tbody>${list.map((r,i) => {
                const customer = r.customer || {};
                const items = (r.items || []).map(it => `${escapeHTML(it.name||it.id||"Product")} ×${Number(it.quantity||1)}`).join("<br>") || "—";
                const opts = statuses.map(st => `<option value="${escapeHTML(st)}" ${String(r.status)===st?"selected":""}>${st}</option>`).join("");
                return `<tr>
                    <td><strong>${escapeHTML(r.id||"-")}</strong><br><small>${escapeHTML(r.createdAt||"").slice(0,10)}</small></td>
                    <td><strong>${escapeHTML(r.orderId||"-")}</strong></td>
                    <td>${escapeHTML(customer.name||"-")}<br><small>${escapeHTML(customer.phone||customer.email||"")}</small></td>
                    <td>${items}<br><small>Return value: ${formatAdminMoney(r.total||0)}</small></td>
                    <td>${escapeHTML(r.reason||"-")}<br><small>${escapeHTML(r.details||"")}</small></td>
                    <td>${escapeHTML(r.status||"Requested")}</td>
                    <td><select id="return-status-${i}" style="padding:6px;border-radius:6px;border:1px solid #ccc;">${opts}</select><br><button type="button" class="admin-view-order-btn" style="background:#3f8c5a;color:#fff;margin-top:5px;" onclick="updateReturnStatus(${i}, document.getElementById('return-status-${i}').value)">Save</button></td>
                </tr>`;
            }).join("")}</tbody>
        </table></div>`}`;
}

function updateReturnStatus(index, status) {
    let list = [];
    try { list = JSON.parse(localStorage.getItem("seiMartReturns") || "[]"); } catch (e) {}
    if (!list[index]) return;
    const r = list[index];
    r.status = status;
    r.updatedAt = new Date().toISOString();
    if (!Array.isArray(r.history)) r.history = [];
    r.history.push({ status: status, at: new Date().toISOString(), label: new Date().toLocaleString("en-BD"), note: "Updated by admin/staff" });
    localStorage.setItem("seiMartReturns", JSON.stringify(list));
    if (status === "Refunded") {
        let orders = getAdminOrders();
        const oi = orders.findIndex(o => String(o.orderId) === String(r.orderId));
        if (oi >= 0) {
            orders[oi].paymentStatus = "Refunded";
            if (typeof saveAdminOrders === "function") saveAdminOrders(orders);
            else localStorage.setItem("seiMartOrders", JSON.stringify(orders));
        }
    }
    try { logAdminActivity("Return status → " + status, "Return " + r.id + " · Order " + r.orderId, { to: "superadmin" }); } catch(e) {}
    loadReturnsModule();
}

function loadMessagesModule(type) {
    const container = document.getElementById("adminModuleContent");
    if (!container) return;
    const isContact = type === "contact";
    const key = isContact ? "seiMartContactMessages" : "seiMartSupportRequests";
    // Also merge live chat into contact messages view
    let list = [];
    try { list = JSON.parse(localStorage.getItem(key) || "[]"); } catch(e) { list = []; }
    if (!Array.isArray(list)) list = [];

    if (isContact) {
        try {
            const chats = JSON.parse(localStorage.getItem("seiMartLiveChat") || "[]");
            if (Array.isArray(chats) && chats.length) {
                // show chat threads as messages
                const byUser = {};
                chats.forEach(m => {
                    const uid = m.userId || m.email || "guest";
                    if (!byUser[uid]) byUser[uid] = { name: m.name || "Guest", email: m.email || uid, messages: [], date: m.at };
                    byUser[uid].messages.push(m);
                    byUser[uid].date = m.at;
                });
                Object.keys(byUser).forEach(uid => {
                    const thr = byUser[uid];
                    list.unshift({
                        id: "chat-" + uid,
                        name: thr.name,
                        email: thr.email,
                        subject: "Live Chat",
                        message: thr.messages.map(x => (x.from === "admin" ? "Admin: " : "Customer: ") + (x.text || "")).join(" | "),
                        date: thr.date,
                        isChat: true,
                        chatUserId: uid,
                        chatMessages: thr.messages
                    });
                });
            }
        } catch(e) {}
    }

    const title = isContact ? "Customer Messages" : "Support Requests";
    container.className = "admin-orders-module";
    container.innerHTML = `
        <div class="orders-module-header"><div><h2>${title}</h2><p>${isContact ? "Contact form + Live chat" : "Support request form submissions"}</p></div>
        <div class="orders-count">${list.length}</div></div>
        ${!list.length ? `<div class="module-empty"><div class="placeholder-icon">✉️</div><h2>No ${title}</h2><p>Nothing yet.</p></div>` : `
        <div class="orders-table-wrapper"><table class="admin-orders-table">
            <thead><tr><th>Name</th><th>Email</th><th>Message</th><th>Date</th><th>Reply</th></tr></thead>
            <tbody>${list.map((m, i) => `
                <tr>
                    <td><strong>${escapeHTML(m.name||"-")}</strong>${m.isChat ? ' <span style="font-size:11px;color:#3976a8;">Chat</span>' : ''}</td>
                    <td>${escapeHTML(m.email||m.phone||"-")}</td>
                    <td style="max-width:280px;">${escapeHTML(m.subject ? m.subject + " — " : "")}${escapeHTML((m.message||m.text||"").slice(0,120))}</td>
                    <td>${escapeHTML(m.date||m.createdAt||"-")}</td>
                    <td>
                        <button type="button" class="admin-view-order-btn" onclick="openMessageReply('${isContact ? "contact" : "support"}', ${i})">Reply</button>
                        ${m.adminReply ? '<div style="font-size:11px;color:#3f8c5a;margin-top:4px;">Replied</div>' : ''}
                    </td>
                </tr>`).join("")}
            </tbody>
        </table></div>`}`;
    window.__msgListCache = { type: type, list: list };
}

function openMessageReply(type, index) {
    const cache = window.__msgListCache;
    if (!cache || !cache.list[index]) return;
    const m = cache.list[index];
    const container = document.getElementById("adminModuleContent");
    const isChat = !!m.isChat;

    let threadHtml = "";
    if (isChat && Array.isArray(m.chatMessages)) {
        threadHtml = m.chatMessages.map(msg =>
            `<div style="margin:8px 0;padding:10px 12px;border-radius:8px;background:${msg.from==="admin"?"#eaf2ed":"#f5f7f5"};max-width:90%;${msg.from==="admin"?"margin-left:auto;":""}">
                <div style="font-size:11px;color:#7b877f;">${msg.from==="admin"?"Admin":"Customer"} · ${escapeHTML(msg.label||msg.at||"")}</div>
                <div>${escapeHTML(msg.text||"")}</div>
            </div>`
        ).join("");
    } else {
        threadHtml = `<div style="padding:12px;background:#f5f7f5;border-radius:8px;margin-bottom:12px;">${escapeHTML(m.message||m.text||"-")}</div>
            ${m.adminReply ? `<div style="padding:12px;background:#eaf2ed;border-radius:8px;margin-bottom:12px;"><strong>Admin reply:</strong><br>${escapeHTML(m.adminReply)}</div>` : ""}`;
    }

    container.innerHTML = `
        <div class="orders-module-header">
            <div><h2>Reply to ${escapeHTML(m.name||"Customer")}</h2><p>${escapeHTML(m.email||"")}</p></div>
            <button type="button" class="admin-view-order-btn" onclick="loadMessagesModule(window.__msgListCache && window.__msgListCache.type === 'support' ? 'support' : 'contact')">← Back</button>
        </div>
        <div style="background:#fff;border:1px solid #e3e9e4;border-radius:12px;padding:20px;max-width:640px;">
            <div style="max-height:320px;overflow:auto;margin-bottom:16px;">${threadHtml}</div>
            <textarea id="adminReplyText" rows="4" placeholder="Type your reply..." style="width:100%;padding:12px;border:1px solid #ccc;border-radius:8px;box-sizing:border-box;"></textarea>
            <button type="button" class="admin-view-order-btn" style="background:#3f6f5a;color:#fff;margin-top:12px;padding:10px 18px;"
                onclick="sendAdminReply('${type}', ${index}, ${isChat ? "true" : "false"}, '${escapeHTML((m.chatUserId||"").replace(/'/g,"\\'"))}')">Send Reply</button>
            <p id="replyMsg" style="display:none;color:#3f8c5a;margin-top:10px;">Reply sent.</p>
        </div>`;
}

function sendAdminReply(type, index, isChat, chatUserId) {
    const text = ((document.getElementById("adminReplyText") || {}).value || "").trim();
    if (!text) { alert("Write a reply first."); return; }

    if (isChat || String(isChat) === "true") {
        let chats = [];
        try { chats = JSON.parse(localStorage.getItem("seiMartLiveChat") || "[]"); } catch(e) {}
        chats.push({
            userId: chatUserId || "guest",
            name: "Admin",
            from: "admin",
            text: text,
            at: new Date().toISOString(),
            label: new Date().toLocaleString("en-BD")
        });
        localStorage.setItem("seiMartLiveChat", JSON.stringify(chats));
    } else {
        const key = type === "contact" ? "seiMartContactMessages" : "seiMartSupportRequests";
        let list = [];
        try { list = JSON.parse(localStorage.getItem(key) || "[]"); } catch(e) {}
        // find matching by content roughly using cache
        const cache = window.__msgListCache;
        if (cache && cache.list[index] && !cache.list[index].isChat) {
            const target = cache.list[index];
            const idx = list.findIndex(m =>
                (m.email === target.email && m.message === target.message) ||
                (m.createdAt && m.createdAt === target.createdAt)
            );
            if (idx >= 0) {
                list[idx].adminReply = text;
                list[idx].repliedAt = new Date().toISOString();
            } else if (list[index]) {
                list[index].adminReply = text;
                list[index].repliedAt = new Date().toISOString();
            }
            localStorage.setItem(key, JSON.stringify(list));
        }
    }
    const msg = document.getElementById("replyMsg");
    if (msg) msg.style.display = "block";
    setTimeout(function(){ loadMessagesModule(type === "support" ? "support" : "contact"); }, 800);
}

function loadCategoriesModule() {
    const container = document.getElementById("adminModuleContent");
    if (!container) return;
    const products = (typeof getProducts === "function") ? getProducts() : [];
    const counts = {};
    products.forEach(p => {
        const cat = p.category || "uncategorized";
        counts[cat] = (counts[cat] || 0) + 1;
    });
    const cats = Object.keys(counts).sort();
    container.className = "admin-orders-module";
    container.innerHTML = `
        <div class="orders-module-header"><div><h2>Categories</h2><p>Product categories from inventory</p></div><div class="orders-count">${cats.length} Categories</div></div>
        <div class="orders-table-wrapper"><table class="admin-orders-table">
            <thead><tr><th>Category</th><th>Products</th><th>Action</th></tr></thead>
            <tbody>${cats.map(c => `<tr>
                <td><strong>${escapeHTML(c)}</strong></td>
                <td>${counts[c]}</td>
                <td><a href="products.html?category=${encodeURIComponent(c)}" target="_blank" class="admin-view-order-btn" style="text-decoration:none;display:inline-block;">View on Store</a></td>
            </tr>`).join("") || "<tr><td colspan='3'>No categories</td></tr>"}</tbody>
        </table></div>
        <p style="margin-top:16px;color:#7b877f;font-size:14px;">Categories are derived from products. Add products with new category names to expand the list.</p>`;
}

/* =====================================================
   COUPONS
===================================================== */
function getCoupons() {
    try { return JSON.parse(localStorage.getItem("seiMartCoupons") || "[]"); } catch(e) { return []; }
}
function saveCoupons(list) {
    localStorage.setItem("seiMartCoupons", JSON.stringify(list || []));
}

function loadCouponsModule() {
    const container = document.getElementById("adminModuleContent");
    if (!container) return;
    const coupons = getCoupons();
    container.className = "admin-orders-module";
    container.innerHTML = `
        <div class="orders-module-header">
            <div><h2>Coupons & Discounts</h2><p>Create and manage promo codes</p></div>
            <div class="orders-count">${coupons.length} Coupons</div>
        </div>
        <div style="background:#fff;border:1px solid #e3e9e4;border-radius:12px;padding:20px;margin-bottom:20px;">
            <h3 style="margin-bottom:12px;">Add New Coupon</h3>
            <div style="display:flex;flex-wrap:wrap;gap:12px;align-items:flex-end;">
                <label>Code<br><input id="couponCodeInput" placeholder="e.g. SAVE10" style="padding:8px 12px;border:1px solid #ccc;border-radius:6px;width:140px;"></label>
                <label>Type<br>
                    <select id="couponTypeInput" style="padding:8px 12px;border:1px solid #ccc;border-radius:6px;">
                        <option value="percent">Percent %</option>
                        <option value="fixed">Fixed ৳</option>
                    </select>
                </label>
                <label>Value<br><input id="couponValueInput" type="number" placeholder="10" style="padding:8px 12px;border:1px solid #ccc;border-radius:6px;width:100px;"></label>
                <label>Min Order ৳<br><input id="couponMinInput" type="number" placeholder="0" style="padding:8px 12px;border:1px solid #ccc;border-radius:6px;width:100px;"></label>
                <label>Expires<br><input id="couponExpiresInput" type="date" style="padding:8px 12px;border:1px solid #ccc;border-radius:6px;"></label>
                <label>Total Usage Limit<br><input id="couponUsageLimitInput" type="number" placeholder="0 = unlimited" style="padding:8px 12px;border:1px solid #ccc;border-radius:6px;width:120px;"></label>
                <label>Per User Limit<br><input id="couponPerUserInput" type="number" placeholder="0 = unlimited" style="padding:8px 12px;border:1px solid #ccc;border-radius:6px;width:120px;"></label>
                <button type="button" class="admin-view-order-btn" style="background:#3f6f5a;color:#fff;padding:10px 18px;" onclick="addCoupon()">Add Coupon</button>
            </div>
            <p id="couponMsg" style="margin-top:10px;display:none;"></p>
        </div>
        <div class="orders-table-wrapper"><table class="admin-orders-table">
            <thead><tr><th>Code</th><th>Type</th><th>Value</th><th>Min</th><th>Expires</th><th>Used/Limit</th><th>Status</th><th>Action</th></tr></thead>
            <tbody id="couponTableBody">
                ${coupons.length ? coupons.map((c,i) => `<tr>
                    <td><strong>${escapeHTML(c.code)}</strong></td>
                    <td>${c.type === "percent" ? "Percent" : "Fixed"}</td>
                    <td>${c.type === "percent" ? c.value + "%" : formatAdminMoney(c.value)}</td>
                    <td>${formatAdminMoney(c.minOrder||0)}</td>
                    <td>${escapeHTML(c.expires||"—")}</td>
                    <td>${Number(c.usedCount)||0}${c.usageLimit?("/"+c.usageLimit):"/∞"}</td>
                    <td>${c.active !== false ? "✅ Active" : "❌ Off"}</td>
                    <td>
                        <button type="button" class="admin-view-order-btn" onclick="toggleCoupon(${i})">${c.active !== false ? "Disable" : "Enable"}</button>
                        <button type="button" class="admin-view-order-btn" style="background:#d9534f;color:#fff;margin-left:6px;" onclick="deleteCoupon(${i})">Delete</button>
                    </td>
                </tr>`).join("") : "<tr><td colspan='8'>No coupons yet. Add one above.</td></tr>"}
            </tbody>
        </table></div>`;
}

function addCoupon() {
    const code = (document.getElementById("couponCodeInput")?.value || "").trim().toUpperCase();
    const type = document.getElementById("couponTypeInput")?.value || "percent";
    const value = Number(document.getElementById("couponValueInput")?.value) || 0;
    const minOrder = Number(document.getElementById("couponMinInput")?.value) || 0;
    const expires = (document.getElementById("couponExpiresInput")?.value || "").trim();
    const usageLimit = Number(document.getElementById("couponUsageLimitInput")?.value) || 0;
    const perUserLimit = Number(document.getElementById("couponPerUserInput")?.value) || 0;
    const msg = document.getElementById("couponMsg");
    if (!code || value <= 0) {
        if (msg) { msg.style.display="block"; msg.style.color="#d9534f"; msg.textContent="Enter valid code and value."; }
        return;
    }
    const list = getCoupons();
    if (list.some(c => c.code === code)) {
        if (msg) { msg.style.display="block"; msg.style.color="#d9534f"; msg.textContent="Coupon code already exists."; }
        return;
    }
    list.push({
        code, type, value, minOrder,
        expires: expires || "",
        usageLimit: usageLimit,
        perUserLimit: perUserLimit,
        usedCount: 0,
        usedBy: [],
        active: true,
        createdAt: new Date().toISOString().slice(0,10)
    });
    saveCoupons(list);
    loadCouponsModule();
}

function toggleCoupon(index) {
    const list = getCoupons();
    if (!list[index]) return;
    list[index].active = !(list[index].active !== false);
    saveCoupons(list);
    loadCouponsModule();
}

function deleteCoupon(index) {
    const list = getCoupons();
    list.splice(index, 1);
    saveCoupons(list);
    loadCouponsModule();
}

/* =====================================================
   INVENTORY
===================================================== */
function loadInventoryModule(filter, searchQuery) {
    const container = document.getElementById("adminModuleContent");
    if (!container) return;
    window.__invFilter = filter || "all";
    let products = (typeof getProducts === "function") ? getProducts() : [];
    if (filter === "low") { var __set = (typeof getSeiMartSettings === "function") ? getSeiMartSettings() : {lowStockThreshold:10}; var __thr = Number(__set.lowStockThreshold)||10; products = products.filter(p => (Number(p.stock)||0) > 0 && (Number(p.stock)||0) <= __thr); }
    else if (filter === "out") products = products.filter(p => (Number(p.stock)||0) <= 0);

    const q = (searchQuery || "").trim().toLowerCase();
    if (q) {
        products = products.filter(p =>
            String(p.name||"").toLowerCase().includes(q) ||
            String(p.category||"").toLowerCase().includes(q) ||
            String(p.id||"").toLowerCase().includes(q)
        );
    }

    const title = filter === "low" ? "Low Stock" : filter === "out" ? "Out of Stock" : "Inventory Stock";
    container.className = "admin-orders-module";
    container.innerHTML = `
        <div class="orders-module-header"><div><h2>${title}</h2><p>Manage product stock levels</p></div><div class="orders-count">${products.length} Products</div></div>
        <div style="background:#fff;border:1px solid #e3e9e4;border-radius:10px;padding:14px 16px;margin-bottom:16px;display:flex;gap:10px;flex-wrap:wrap;">
            <input type="text" id="adminInventorySearch" placeholder="Search product name, category, ID..." value="${escapeHTML(searchQuery||"")}"
                style="flex:1;min-width:220px;padding:10px 12px;border:1px solid #ccc;border-radius:8px;">
            <button type="button" class="admin-view-order-btn" style="background:#3f6f5a;color:#fff;" onclick="runInventorySearch()">Search</button>
            <button type="button" class="admin-view-order-btn" onclick="loadInventoryModule(window.__invFilter||'all','')">Clear</button>
        </div>
        ${!products.length ? `<div class="module-empty"><div class="placeholder-icon">📦</div><h2>No Products</h2><p>No products match this filter.</p></div>` : `
        <div class="orders-table-wrapper"><table class="admin-orders-table">
            <thead><tr><th>Product</th><th>Category</th><th>Price</th><th>Stock</th><th>Status</th><th>Update Stock</th></tr></thead>
            <tbody>${products.map(p => {
                const stock = Number(p.stock)||0;
                const __set2 = (typeof getSeiMartSettings === "function") ? getSeiMartSettings() : {lowStockThreshold:10}; const __thr2 = Number(__set2.lowStockThreshold)||10; const status = stock <= 0 ? "Out of Stock" : stock <= __thr2 ? "Low Stock" : "In Stock";
                const color = stock <= 0 ? "#d9534f" : stock <= 10 ? "#d89b20" : "#3f8c5a";
                return `<tr>
                    <td><strong>${escapeHTML(p.name)}</strong></td>
                    <td>${escapeHTML(p.category||"-")}</td>
                    <td>${formatAdminMoney(p.price)}</td>
                    <td id="stock-val-${escapeHTML(p.id)}">${stock}</td>
                    <td style="color:${color};font-weight:600;">${status}</td>
                    <td>
                        <input type="number" id="stock-input-${escapeHTML(p.id)}" value="${stock}" min="0" style="width:70px;padding:6px;border:1px solid #ccc;border-radius:4px;">
                        <button type="button" class="admin-view-order-btn" style="margin-left:6px;" onclick="updateProductStock('${String(p.id).replace(/'/g,"\\'")}')">Save</button>
                    </td>
                </tr>`;
            }).join("")}</tbody>
        </table></div>`}`;
}

function runInventorySearch() {
    const q = (document.getElementById("adminInventorySearch") || {}).value || "";
    loadInventoryModule(window.__invFilter || "all", q);
}

function updateProductStock(productId) {
    const input = document.getElementById("stock-input-" + productId);
    if (!input) return;
    const newStock = Math.max(0, Number(input.value) || 0);
    let products = (typeof getProducts === "function") ? getProducts() : [];
    const idx = products.findIndex(p => String(p.id) === String(productId));
    if (idx < 0) return;
    products[idx].stock = newStock;
    if (typeof saveProducts === "function") saveProducts(products);
    else localStorage.setItem("seiMartProducts", JSON.stringify(products));
    const valEl = document.getElementById("stock-val-" + productId);
    if (valEl) valEl.textContent = newStock;
    // soft refresh current view
    const pageTitle = document.getElementById("pageTitle")?.textContent || "";
    if (/low/i.test(pageTitle)) loadInventoryModule("low");
    else if (/out/i.test(pageTitle)) loadInventoryModule("out");
    else loadInventoryModule("all");
}

/* =====================================================
   REPORTS & ANALYTICS
===================================================== */
function loadReportsModule(type) {
    const container = document.getElementById("adminModuleContent");
    if (!container) return;
    const orders = getAdminOrders();
    const products = (typeof getProducts === "function") ? getProducts() : [];

    const totalSales = orders.reduce((s,o) => s + (Number(o.total)||0), 0);
    const totalOrders = orders.length;
    const avgOrder = totalOrders ? totalSales / totalOrders : 0;

    // top products by qty sold
    const soldMap = {};
    orders.forEach(o => (o.items||[]).forEach(it => {
        const key = it.name || it.id || "Unknown";
        if (!soldMap[key]) soldMap[key] = { name: key, qty: 0, revenue: 0 };
        soldMap[key].qty += Number(it.quantity)||1;
        soldMap[key].revenue += (Number(it.price)||0) * (Number(it.quantity)||1);
    }));
    const topProducts = Object.values(soldMap).sort((a,b) => b.qty - a.qty).slice(0, 10);

    // customers
    const custMap = {};
    orders.forEach(o => {
        const c = o.customer || {};
        const key = (c.email||c.phone||c.name||"unknown").toLowerCase();
        if (!custMap[key]) custMap[key] = { name: c.name||"Customer", orders: 0, spent: 0 };
        custMap[key].orders += 1;
        custMap[key].spent += Number(o.total)||0;
    });
    const topCustomers = Object.values(custMap).sort((a,b) => b.spent - a.spent).slice(0, 10);

    const statusCounts = {};
    orders.forEach(o => {
        const st = o.status || "Unknown";
        statusCounts[st] = (statusCounts[st]||0) + 1;
    });

    container.className = "admin-orders-module";
    let body = "";

    if (type === "sales-report" || type === "revenue-report") {
        body = `
            <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(180px,1fr));gap:16px;margin-bottom:24px;">
                <div style="background:#fff;border:1px solid #e3e9e4;border-radius:12px;padding:20px;text-align:center;">
                    <div style="color:#7b877f;font-size:13px;">Total Revenue</div>
                    <div style="font-size:28px;font-weight:700;color:#3f6f5a;margin-top:6px;">${formatAdminMoney(totalSales)}</div>
                </div>
                <div style="background:#fff;border:1px solid #e3e9e4;border-radius:12px;padding:20px;text-align:center;">
                    <div style="color:#7b877f;font-size:13px;">Total Orders</div>
                    <div style="font-size:28px;font-weight:700;color:#17231d;margin-top:6px;">${totalOrders}</div>
                </div>
                <div style="background:#fff;border:1px solid #e3e9e4;border-radius:12px;padding:20px;text-align:center;">
                    <div style="color:#7b877f;font-size:13px;">Avg Order Value</div>
                    <div style="font-size:28px;font-weight:700;color:#d4a017;margin-top:6px;">${formatAdminMoney(avgOrder)}</div>
                </div>
                <div style="background:#fff;border:1px solid #e3e9e4;border-radius:12px;padding:20px;text-align:center;">
                    <div style="color:#7b877f;font-size:13px;">Products</div>
                    <div style="font-size:28px;font-weight:700;color:#17231d;margin-top:6px;">${products.length}</div>
                </div>
            </div>`;
    }

    if (type === "orders-report") {
        body += `<div class="orders-table-wrapper"><table class="admin-orders-table">
            <thead><tr><th>Status</th><th>Count</th></tr></thead>
            <tbody>${Object.keys(statusCounts).map(s => `<tr><td>${escapeHTML(s)}</td><td><strong>${statusCounts[s]}</strong></td></tr>`).join("") || "<tr><td colspan='2'>No data</td></tr>"}</tbody>
        </table></div>`;
    }

    if (type === "top-products" || type === "sales-report") {
        body += `<h3 style="margin:20px 0 12px;">Top Products by Quantity Sold</h3>
        <div class="orders-table-wrapper"><table class="admin-orders-table">
            <thead><tr><th>#</th><th>Product</th><th>Qty Sold</th><th>Revenue</th></tr></thead>
            <tbody>${topProducts.map((p,i) => `<tr>
                <td>${i+1}</td><td><strong>${escapeHTML(p.name)}</strong></td>
                <td>${p.qty}</td><td>${formatAdminMoney(p.revenue)}</td>
            </tr>`).join("") || "<tr><td colspan='4'>No sales data yet</td></tr>"}</tbody>
        </table></div>`;
    }

    if (type === "customer-report") {
        body += `<div class="orders-table-wrapper"><table class="admin-orders-table">
            <thead><tr><th>#</th><th>Customer</th><th>Orders</th><th>Total Spent</th></tr></thead>
            <tbody>${topCustomers.map((c,i) => `<tr>
                <td>${i+1}</td><td><strong>${escapeHTML(c.name)}</strong></td>
                <td>${c.orders}</td><td>${formatAdminMoney(c.spent)}</td>
            </tr>`).join("") || "<tr><td colspan='4'>No customer data</td></tr>"}</tbody>
        </table></div>`;
    }

    if (type === "revenue-report" && !body.includes("Top Products")) {
        body += `<h3 style="margin:20px 0 12px;">Revenue by Top Products</h3>
        <div class="orders-table-wrapper"><table class="admin-orders-table">
            <thead><tr><th>Product</th><th>Revenue</th></tr></thead>
            <tbody>${topProducts.map(p => `<tr><td>${escapeHTML(p.name)}</td><td><strong>${formatAdminMoney(p.revenue)}</strong></td></tr>`).join("") || "<tr><td colspan='2'>No data</td></tr>"}</tbody>
        </table></div>`;
    }

    const titles = {
        "sales-report": "Sales Report",
        "orders-report": "Orders Report",
        "revenue-report": "Revenue Report",
        "top-products": "Top Products",
        "customer-report": "Customer Report"
    };

    container.innerHTML = `
        <div class="orders-module-header">
            <div><h2>${titles[type]||"Report"}</h2><p>Analytics based on live order data</p></div>
        </div>
        ${body}`;
}

/* =====================================================
   WEBSITE CONTENT
===================================================== */
function getWebsiteContent() {
    try {
        return JSON.parse(localStorage.getItem("seiMartWebsiteContent") || "{}");
    } catch(e) { return {}; }
}
function saveWebsiteContent(data) {
    localStorage.setItem("seiMartWebsiteContent", JSON.stringify(data || {}));
}

function loadWebsiteContentModule(type) {
    const container = document.getElementById("adminModuleContent");
    if (!container) return;
    const data = getWebsiteContent();
    const products = (typeof getProducts === "function") ? getProducts() : [];

    if (type === "homepage-banner") {
        const banner = data.banner || {
            eyebrow: "WELCOME TO",
            title: "SEI MART",
            titleHighlight: "MART",
            subtitle: "Shop Smart. Shop with Sei Mart.",
            description: "Discover quality products at affordable prices. From electronics and fashion to beauty and lifestyle, find everything you need in one place.",
            buttonText: "Shop Now",
            buttonLink: "products.html",
            image: "image/banners/hero.jpg"
        };
        container.className = "admin-orders-module";
        container.innerHTML = `
            <div class="orders-module-header"><div><h2>Homepage Banner / Hero</h2><p>Edit hero section (same green + gold colors)</p></div></div>
            <div style="background:#fff;border:1px solid #e3e9e4;border-radius:12px;padding:24px;max-width:640px;">
                <label style="display:block;margin-bottom:12px;">Eyebrow (small top text)<br>
                    <input id="bannerEyebrow" value="${escapeHTML(banner.eyebrow||"")}" style="width:100%;padding:10px;border:1px solid #ccc;border-radius:6px;margin-top:4px;">
                </label>
                <label style="display:block;margin-bottom:12px;">Title<br>
                    <input id="bannerTitle" value="${escapeHTML(banner.title||"")}" style="width:100%;padding:10px;border:1px solid #ccc;border-radius:6px;margin-top:4px;">
                </label>
                <label style="display:block;margin-bottom:12px;">Title highlight word (gold)<br>
                    <input id="bannerTitleHighlight" value="${escapeHTML(banner.titleHighlight||"MART")}" style="width:100%;padding:10px;border:1px solid #ccc;border-radius:6px;margin-top:4px;">
                </label>
                <label style="display:block;margin-bottom:12px;">Subtitle<br>
                    <input id="bannerSubtitle" value="${escapeHTML(banner.subtitle||"")}" style="width:100%;padding:10px;border:1px solid #ccc;border-radius:6px;margin-top:4px;">
                </label>
                <label style="display:block;margin-bottom:12px;">Description<br>
                    <textarea id="bannerDesc" rows="3" style="width:100%;padding:10px;border:1px solid #ccc;border-radius:6px;margin-top:4px;">${escapeHTML(banner.description||"")}</textarea>
                </label>
                <label style="display:block;margin-bottom:12px;">Button Text<br>
                    <input id="bannerBtnText" value="${escapeHTML(banner.buttonText||"")}" style="width:100%;padding:10px;border:1px solid #ccc;border-radius:6px;margin-top:4px;">
                </label>
                <label style="display:block;margin-bottom:12px;">Button Link<br>
                    <input id="bannerBtnLink" value="${escapeHTML(banner.buttonLink||"")}" style="width:100%;padding:10px;border:1px solid #ccc;border-radius:6px;margin-top:4px;">
                </label>
                <label style="display:block;margin-bottom:12px;">Banner Image path (put file in <code>image/banners/</code>)<br>
                    <input id="bannerImage" value="${escapeHTML(banner.image||"")}" placeholder="image/banners/hero.jpg" style="width:100%;padding:10px;border:1px solid #ccc;border-radius:6px;margin-top:4px;">
                </label>
                <p style="font-size:12px;color:#7b877f;margin-bottom:12px;">Example: copy photo to <code>image/banners/hero.jpg</code> then enter that path.</p>
                <button type="button" class="admin-view-order-btn" style="background:#3f6f5a;color:#fff;padding:10px 20px;" onclick="saveBannerContent()">Save Banner</button>
                <p id="bannerMsg" style="margin-top:10px;color:#3f8c5a;display:none;">Saved — open Homepage to see changes.</p>
            </div>`;
        return;
    }

    if (type === "todays-deals" || type === "new-arrivals") {
        const isDeals = type === "todays-deals";
        const list = isDeals ? products.filter(p => p.deal) : products.slice(0, 8);
        container.className = "admin-orders-module";
        container.innerHTML = `
            <div class="orders-module-header">
                <div><h2>${isDeals ? "Today's Deals" : "New Arrivals"}</h2>
                <p>${isDeals ? "Products marked as deals" : "Recently listed products"}</p></div>
                <div class="orders-count">${list.length} Products</div>
            </div>
            <div class="orders-table-wrapper"><table class="admin-orders-table">
                <thead><tr><th>Product</th><th>Category</th><th>Price</th><th>${isDeals?"Discount":"Stock"}</th><th>Toggle Deal</th></tr></thead>
                <tbody>${list.map(p => `<tr>
                    <td><strong>${escapeHTML(p.name)}</strong></td>
                    <td>${escapeHTML(p.category||"-")}</td>
                    <td>${formatAdminMoney(p.price)}</td>
                    <td>${isDeals ? (p.discount||0)+"%" : (p.stock||0)}</td>
                    <td>
                        <button type="button" class="admin-view-order-btn" onclick="toggleProductDeal('${String(p.id).replace(/'/g,"\\'")}')">
                            ${p.deal ? "Remove Deal" : "Mark as Deal"}
                        </button>
                    </td>
                </tr>`).join("") || "<tr><td colspan='5'>No products</td></tr>"}</tbody>
            </table></div>
            ${!isDeals ? `<p style="margin-top:12px;"><button type="button" class="admin-view-order-btn" onclick="loadWebsiteContentModule('todays-deals')">View Deals Only</button></p>` : ""}`;
        return;
    }

    if (type === "promo-popup") {
        const popup = Object.assign({
            enabled: true,
            title: "Special Offer!",
            message: "Get 10% off with code WELCOME10",
            offerTitle: "FREE DELIVERY",
            offerCode: "৳1500+ ORDER",
            shopText: "🚚 Shop ৳1500+ and get FREE DELIVERY",
            note: "Spend ৳1500 or more in one order and your standard ৳120 delivery fee is automatically waived.",
            buttonText: "Browse Products"
        }, data.popup || {});
        container.className = "admin-orders-module";
        container.innerHTML = `
            <div class="orders-module-header"><div><h2>Promotional Popup / Campaign</h2><p>Edit the campaign text shown on the customer Home page. Changes are saved to localStorage and appear on the homepage.</p></div></div>
            <div style="background:#fff;border:1px solid #e3e9e4;border-radius:12px;padding:24px;max-width:720px;">
                <label style="display:flex;align-items:center;gap:8px;margin-bottom:18px;">
                    <input type="checkbox" id="popupEnabled" ${popup.enabled!==false?"checked":""}> Enable Home Page Campaign Popup
                </label>
                <div style="background:#f7f9f7;border:1px solid #e3e9e4;border-radius:10px;padding:14px;margin-bottom:18px;">
                    <strong style="display:block;margin-bottom:10px;color:#3f6f5a;">Campaign Content</strong>
                    <label style="display:block;margin-bottom:12px;">Main Title<br>
                        <input id="popupTitle" value="${escapeHTML(popup.title||"")}" placeholder="e.g. Special Offer!" style="width:100%;padding:10px;border:1px solid #ccc;border-radius:6px;margin-top:4px;box-sizing:border-box;">
                    </label>
                    <label style="display:block;margin-bottom:12px;">Subtitle / Message<br>
                        <textarea id="popupMessage" rows="2" placeholder="e.g. Get 10% off with code WELCOME10" style="width:100%;padding:10px;border:1px solid #ccc;border-radius:6px;margin-top:4px;box-sizing:border-box;">${escapeHTML(popup.message||"")}</textarea>
                    </label>
                    <label style="display:block;margin-bottom:12px;">Offer Heading<br>
                        <input id="popupOfferTitle" value="${escapeHTML(popup.offerTitle||"")}" placeholder="e.g. FREE DELIVERY" style="width:100%;padding:10px;border:1px solid #ccc;border-radius:6px;margin-top:4px;box-sizing:border-box;">
                    </label>
                    <label style="display:block;margin-bottom:12px;">Offer Badge / Amount<br>
                        <input id="popupOfferCode" value="${escapeHTML(popup.offerCode||"")}" placeholder="e.g. ৳1500+ ORDER" style="width:100%;padding:10px;border:1px solid #ccc;border-radius:6px;margin-top:4px;box-sizing:border-box;">
                    </label>
                    <label style="display:block;margin-bottom:12px;">Campaign Line<br>
                        <textarea id="popupShopText" rows="2" placeholder="e.g. 🚚 Shop ৳1500+ and get FREE DELIVERY" style="width:100%;padding:10px;border:1px solid #ccc;border-radius:6px;margin-top:4px;box-sizing:border-box;">${escapeHTML(popup.shopText||"")}</textarea>
                    </label>
                    <label style="display:block;margin-bottom:12px;">Bottom Note<br>
                        <textarea id="popupNote" rows="3" placeholder="e.g. Spend ৳1500 or more in one order..." style="width:100%;padding:10px;border:1px solid #ccc;border-radius:6px;margin-top:4px;box-sizing:border-box;">${escapeHTML(popup.note||"")}</textarea>
                    </label>
                    <label style="display:block;margin-bottom:16px;">Button Text<br>
                        <input id="popupBtn" value="${escapeHTML(popup.buttonText||"")}" placeholder="e.g. Browse Products" style="width:100%;padding:10px;border:1px solid #ccc;border-radius:6px;margin-top:4px;box-sizing:border-box;">
                    </label>
                </div>
                <button type="button" class="admin-view-order-btn" style="background:#3f6f5a;color:#fff;padding:10px 20px;" onclick="savePopupContent()">Save Campaign</button>
                <p id="popupMsg" style="margin-top:10px;color:#3f8c5a;display:none;">Campaign saved successfully. Refresh Home page to see the update.</p>
            </div>`;
        return;
    }
}

function saveBannerContent() {
    const data = getWebsiteContent();
    data.banner = {
        eyebrow: document.getElementById("bannerEyebrow")?.value || "WELCOME TO",
        title: document.getElementById("bannerTitle")?.value || "SEI MART",
        titleHighlight: document.getElementById("bannerTitleHighlight")?.value || "MART",
        subtitle: document.getElementById("bannerSubtitle")?.value || "",
        description: document.getElementById("bannerDesc")?.value || "",
        buttonText: document.getElementById("bannerBtnText")?.value || "Shop Now",
        buttonLink: document.getElementById("bannerBtnLink")?.value || "products.html",
        image: document.getElementById("bannerImage")?.value || ""
    };
    saveWebsiteContent(data);
    const msg = document.getElementById("bannerMsg");
    if (msg) { msg.style.display = "block"; setTimeout(() => msg.style.display = "none", 2500); }
}

function savePopupContent() {
    const data = getWebsiteContent();
    data.popup = {
        enabled: !!document.getElementById("popupEnabled")?.checked,
        title: document.getElementById("popupTitle")?.value.trim() || "Special Offer!",
        message: document.getElementById("popupMessage")?.value.trim() || "",
        offerTitle: document.getElementById("popupOfferTitle")?.value.trim() || "FREE DELIVERY",
        offerCode: document.getElementById("popupOfferCode")?.value.trim() || "৳1500+ ORDER",
        shopText: document.getElementById("popupShopText")?.value.trim() || "🚚 Shop ৳1500+ and get FREE DELIVERY",
        note: document.getElementById("popupNote")?.value.trim() || "",
        buttonText: document.getElementById("popupBtn")?.value.trim() || "Browse Products"
    };
    saveWebsiteContent(data);
    const msg = document.getElementById("popupMsg");
    if (msg) { msg.style.display = "block"; setTimeout(() => msg.style.display = "none", 2000); }
}

function toggleProductDeal(productId) {
    let products = (typeof getProducts === "function") ? getProducts() : [];
    const idx = products.findIndex(p => String(p.id) === String(productId));
    if (idx < 0) return;
    products[idx].deal = !products[idx].deal;
    if (products[idx].deal && !products[idx].discount) products[idx].discount = 10;
    if (typeof saveProducts === "function") saveProducts(products);
    else localStorage.setItem("seiMartProducts", JSON.stringify(products));
    loadWebsiteContentModule("todays-deals");
}

/* =====================================================
   SETTINGS
===================================================== */
function loadSettingsModule() {
    const container = document.getElementById("adminModuleContent");
    if (!container) return;
    let settings = {};
    try { settings = JSON.parse(localStorage.getItem("seiMartSettings") || "{}"); } catch(e) {}
    settings = Object.assign({
        storeName: "Sei Mart",
        currency: "BDT",
        lowStockThreshold: 10,
        enableCOD: true,
        enableBkash: true,
        shippingFee: 120
    }, settings);

    container.className = "admin-orders-module";
    container.innerHTML = `
        <div class="orders-module-header"><div><h2>Settings</h2><p>Store configuration</p></div></div>
        <div style="background:#fff;border:1px solid #e3e9e4;border-radius:12px;padding:24px;max-width:520px;">
            <label style="display:block;margin-bottom:12px;">Store Name<br>
                <input id="setStoreName" value="${escapeHTML(settings.storeName)}" style="width:100%;padding:10px;border:1px solid #ccc;border-radius:6px;margin-top:4px;">
            </label>
            <label style="display:block;margin-bottom:12px;">Currency<br>
                <input id="setCurrency" value="${escapeHTML(settings.currency)}" style="width:100%;padding:10px;border:1px solid #ccc;border-radius:6px;margin-top:4px;">
            </label>
            <label style="display:block;margin-bottom:12px;">Low Stock Threshold<br>
                <input id="setLowStock" type="number" value="${settings.lowStockThreshold}" style="width:100%;padding:10px;border:1px solid #ccc;border-radius:6px;margin-top:4px;">
            </label>
            <label style="display:block;margin-bottom:12px;">Default Shipping Fee (৳)<br>
                <input id="setShipping" type="number" value="${settings.shippingFee}" style="width:100%;padding:10px;border:1px solid #ccc;border-radius:6px;margin-top:4px;">
            </label>
            <label style="display:flex;align-items:center;gap:8px;margin-bottom:10px;">
                <input type="checkbox" id="setCOD" ${settings.enableCOD?"checked":""}> Enable Cash on Delivery
            </label>
            <label style="display:flex;align-items:center;gap:8px;margin-bottom:16px;">
                <input type="checkbox" id="setBkash" ${settings.enableBkash?"checked":""}> Enable bKash
            </label>
            <button type="button" class="admin-view-order-btn" style="background:#3f6f5a;color:#fff;padding:10px 20px;" onclick="saveSettings()">Save Settings</button>
            <p id="settingsMsg" style="margin-top:10px;color:#3f8c5a;display:none;">Settings saved.</p>
        </div>
        <div style="background:#fff;border:1px solid #e3e9e4;border-radius:12px;padding:20px;max-width:1000px;margin-top:20px;">
          <div style="display:flex;justify-content:space-between;align-items:center;gap:12px;flex-wrap:wrap;">
            <div><h3 style="margin:0 0 5px;">Delivery Campaigns</h3><p style="margin:0;color:#7b877f;font-size:13px;">Control free-delivery offers from the admin panel. Normal delivery is ৳120.</p></div>
            <span style="background:#f7f0d7;color:#765b00;border-radius:20px;padding:7px 11px;font-size:12px;font-weight:700;">Customer website connected via localStorage</span>
          </div>
          <div style="display:flex;flex-wrap:wrap;gap:10px;align-items:flex-end;margin-top:16px;">
            <label>Campaign Name<br><input id="deliveryCampaignName" placeholder="e.g. Eid Free Delivery" style="padding:9px 11px;border:1px solid #ccc;border-radius:7px;width:190px;"></label>
            <label>Condition<br><select id="deliveryCampaignType" style="padding:9px 11px;border:1px solid #ccc;border-radius:7px;">
              <option value="min-order">Minimum Order</option><option value="category">Category</option><option value="product">Selected Product</option>
            </select></label>
            <label id="deliveryMinWrap">Min Order ৳<br><input id="deliveryCampaignMin" type="number" value="1500" min="0" style="padding:9px 11px;border:1px solid #ccc;border-radius:7px;width:120px;"></label>
            <label id="deliveryCategoryWrap" style="display:none;">Category<br><select id="deliveryCampaignCategory" style="padding:9px 11px;border:1px solid #ccc;border-radius:7px;">${Object.keys((typeof getProducts === "function" ? getProducts() : []).reduce((o,p)=>{o[p.category]=1;return o;},{})).sort().map(c=>`<option value="${escapeHTML(c)}">${escapeHTML(c)}</option>`).join("")}</select></label>
            <label id="deliveryProductWrap" style="display:none;">Product IDs<br><input id="deliveryCampaignProducts" placeholder="id1,id2" style="padding:9px 11px;border:1px solid #ccc;border-radius:7px;width:180px;"></label>
            <label>Start<br><input id="deliveryCampaignStart" type="date" style="padding:9px 11px;border:1px solid #ccc;border-radius:7px;"></label>
            <label>End<br><input id="deliveryCampaignEnd" type="date" style="padding:9px 11px;border:1px solid #ccc;border-radius:7px;"></label>
            <label>Delivery Fee<br><input id="deliveryCampaignFee" type="number" value="0" min="0" style="padding:9px 11px;border:1px solid #ccc;border-radius:7px;width:110px;"></label>
            <button type="button" class="admin-view-order-btn" style="background:#3f6f5a;color:#fff;padding:10px 16px;" onclick="addDeliveryCampaign()">Create Campaign</button>
          </div>
          <p style="font-size:12px;color:#888;margin:10px 0 14px;">Set Delivery Fee to <b>0</b> for FREE delivery. Example: Minimum Order ৳1500 → FREE delivery.</p>
          <div class="orders-table-wrapper"><table class="admin-orders-table"><thead><tr><th>Campaign</th><th>Condition</th><th>Period</th><th>Fee</th><th>Status</th><th>Action</th></tr></thead><tbody id="deliveryCampaignTable"></tbody></table></div>
        </div>`;
    renderDeliveryCampaignsAdmin();
    const typeEl=document.getElementById("deliveryCampaignType");
    if(typeEl) typeEl.addEventListener("change", function(){
      const min=document.getElementById("deliveryMinWrap"), cat=document.getElementById("deliveryCategoryWrap");
      if(min) min.style.display=this.value==="min-order"?"block":"none";
      if(cat) cat.style.display=this.value==="category"?"block":"none";
      const prod=document.getElementById("deliveryProductWrap");
      if(prod) prod.style.display=this.value==="product"?"block":"none";
    });

}

function getAdminDeliverySettings() {
    try { return JSON.parse(localStorage.getItem("seiMartDeliverySettings") || "{\"defaultFee\":120,\"campaigns\":[]}"); } catch(e) { return {defaultFee:120,campaigns:[]}; }
}
function saveAdminDeliverySettings(data) {
    localStorage.setItem("seiMartDeliverySettings", JSON.stringify(data));
}
function renderDeliveryCampaignsAdmin() {
    const body=document.getElementById("deliveryCampaignTable"); if(!body) return;
    const data=getAdminDeliverySettings(); const list=Array.isArray(data.campaigns)?data.campaigns:[];
    body.innerHTML=list.length?list.map((c,i)=>`<tr><td><strong>${escapeHTML(c.name||"Campaign")}</strong></td><td>${c.type==="min-order"?"Order ≥ "+formatAdminMoney(c.minOrder||0):c.type==="category"?"Category: "+escapeHTML(c.category||""):"Selected product(s)"}</td><td>${escapeHTML(c.startDate||"Any")} → ${escapeHTML(c.endDate||"Any")}</td><td>${Number(c.feeOverride||0)===0?"FREE":formatAdminMoney(c.feeOverride)}</td><td>${c.active!==false?"✅ Active":"❌ Off"}</td><td><button type="button" class="admin-view-order-btn" onclick="toggleDeliveryCampaign(${i})">${c.active!==false?"Disable":"Enable"}</button><button type="button" class="admin-view-order-btn" style="background:#d9534f;color:#fff;margin-left:6px;" onclick="deleteDeliveryCampaign(${i})">Delete</button></td></tr>`).join(""):`<tr><td colspan="6" style="padding:20px;color:#777;">No delivery campaigns. Create one above.</td></tr>`;
}
function addDeliveryCampaign(){
    const name=(document.getElementById("deliveryCampaignName")?.value||"").trim();
    const type=document.getElementById("deliveryCampaignType")?.value||"min-order";
    const minOrder=Number(document.getElementById("deliveryCampaignMin")?.value)||0;
    const category=document.getElementById("deliveryCampaignCategory")?.value||"";
    const productIds=(document.getElementById("deliveryCampaignProducts")?.value||"").split(",").map(x=>x.trim()).filter(Boolean);
    const startDate=document.getElementById("deliveryCampaignStart")?.value||"";
    const endDate=document.getElementById("deliveryCampaignEnd")?.value||"";
    const feeOverride=Math.max(0,Number(document.getElementById("deliveryCampaignFee")?.value)||0);
    if(!name){alert("Please enter campaign name.");return;}
    if(type==="min-order" && minOrder<=0){alert("Enter a minimum order amount.");return;}
    const data=getAdminDeliverySettings(); data.defaultFee=Math.max(0,Number(data.defaultFee)||120); data.campaigns=Array.isArray(data.campaigns)?data.campaigns:[];
    data.campaigns.push({id:"DC"+Date.now(),name,type,minOrder,category,productIds:productIds,startDate,endDate,feeOverride,freeDelivery:feeOverride===0,active:true,createdAt:new Date().toISOString()});
    saveAdminDeliverySettings(data); renderDeliveryCampaignsAdmin();
    const n=document.getElementById("deliveryCampaignName"); if(n)n.value="";
}
function toggleDeliveryCampaign(i){const d=getAdminDeliverySettings();if(!d.campaigns||!d.campaigns[i])return;d.campaigns[i].active=!(d.campaigns[i].active!==false);saveAdminDeliverySettings(d);renderDeliveryCampaignsAdmin();}
function deleteDeliveryCampaign(i){const d=getAdminDeliverySettings();if(!d.campaigns)return;d.campaigns.splice(i,1);saveAdminDeliverySettings(d);renderDeliveryCampaignsAdmin();}

function saveSettings() {
    const settings = {
        storeName: document.getElementById("setStoreName")?.value || "Sei Mart",
        currency: document.getElementById("setCurrency")?.value || "BDT",
        lowStockThreshold: Number(document.getElementById("setLowStock")?.value) || 10,
        shippingFee: Number(document.getElementById("setShipping")?.value) || 120,
        enableCOD: !!document.getElementById("setCOD")?.checked,
        enableBkash: !!document.getElementById("setBkash")?.checked
    };
    localStorage.setItem("seiMartSettings", JSON.stringify(settings));
    var deliverySettings = getAdminDeliverySettings();
    deliverySettings.defaultFee = settings.shippingFee;
    saveAdminDeliverySettings(deliverySettings);
    const msg = document.getElementById("settingsMsg");
    if (msg) { msg.style.display = "block"; setTimeout(() => msg.style.display = "none", 2000); }
}

/* =====================================================
   ADMIN PROFILE
===================================================== */

/* =====================================================
   STAFF / ROLES (Admin, Moderator, Delivery, Maintenance)
===================================================== */
var SEI_ROLE_POWERS = {
    admin: ["dashboard","orders","products","customers","coupons","inventory","reports","messages","support","returns","website","settings","staff","all"],
    moderator: ["dashboard","orders","products","customers","reviews","messages","support"],
    delivery: ["dashboard","orders","order-status","print-invoice"],
    maintenance: ["dashboard","inventory","products","website","settings"]
};

function getStaffList() {
    try { return JSON.parse(localStorage.getItem("seiMartStaff") || "[]"); } catch(e) { return []; }
}
function saveStaffList(list) {
    localStorage.setItem("seiMartStaff", JSON.stringify(list || []));
}
function getCurrentStaff() {
    try { return JSON.parse(localStorage.getItem("seiMartCurrentStaff") || "null"); } catch(e) { return null; }
}
function staffHasPower(power) {
    var s = getCurrentStaff();
    if (!s) return true; // legacy open admin
    if (s.role === "admin") return true;
    var powers = s.powers || SEI_ROLE_POWERS[s.role] || [];
    return powers.indexOf(power) >= 0 || powers.indexOf("all") >= 0;
}


function loadSellerRequestsModule() {
    const container = document.getElementById("adminModuleContent");
    if (!container) return;
    let list = [];
    try { list = JSON.parse(localStorage.getItem("seiMartSellerApplications") || "[]"); } catch(e) {}
    container.className = "admin-orders-module";
    container.innerHTML = `
      <div class="orders-module-header">
        <div><h2>Seller Requests</h2><p>Sell with Sei Mart applications · Public form: <a href="sell-with-seimart.html" target="_blank" style="color:#3f6f5a;">sell-with-seimart.html</a></p></div>
        <div class="orders-count">${list.length}</div>
      </div>
      ${!list.length ? `<div class="module-empty"><h2>No seller requests yet</h2><p>When someone applies on Sell with Sei Mart, it appears here.</p></div>` : `
      <div class="orders-table-wrapper"><table class="admin-orders-table">
        <thead><tr><th>Shop</th><th>Name</th><th>Phone</th><th>Email</th><th>Category</th><th>Date</th><th>Status</th><th>Action</th></tr></thead>
        <tbody>
          ${list.map((s,i) => `<tr>
            <td><strong>${escapeHTML(s.shop||"-")}</strong></td>
            <td>${escapeHTML(s.name||"-")}</td>
            <td>${escapeHTML(s.phone||"-")}</td>
            <td>${escapeHTML(s.email||"-")}</td>
            <td>${escapeHTML(s.category||"-")}</td>
            <td>${escapeHTML(s.date||"-")}</td>
            <td>${escapeHTML(s.status||"Pending")}</td>
            <td>
              <button type="button" class="admin-view-order-btn" style="background:#3f8c5a;color:#fff;" onclick="updateSellerStatus(${i},'Approved')">Approve</button>
              <button type="button" class="admin-view-order-btn" style="background:#d9534f;color:#fff;" onclick="updateSellerStatus(${i},'Rejected')">Reject</button>
            </td>
          </tr>
          <tr><td colspan="8" style="color:#666;font-size:13px;">About: ${escapeHTML(s.about||"-")}</td></tr>`).join("")}
        </tbody>
      </table></div>`}`;
}

function updateSellerStatus(index, status) {
    let list = [];
    try { list = JSON.parse(localStorage.getItem("seiMartSellerApplications") || "[]"); } catch(e) {}
    if (!list[index]) return;
    list[index].status = status;
    list[index].updatedAt = new Date().toISOString();
    localStorage.setItem("seiMartSellerApplications", JSON.stringify(list));
    loadSellerRequestsModule();
}

function loadAffiliatesModule() {
    const container = document.getElementById("adminModuleContent");
    if (!container) return;
    let list = [];
    try { list = JSON.parse(localStorage.getItem("seiMartAffiliates") || "[]"); } catch(e) {}
    container.className = "admin-orders-module";
    container.innerHTML = `
      <div class="orders-module-header">
        <div><h2>Affiliates</h2><p>Public page: <a href="affiliate.html" target="_blank" style="color:#3f6f5a;">affiliate.html</a> · Share seimart.com/affiliate style link with partners</p></div>
        <div class="orders-count">${list.length}</div>
      </div>
      ${!list.length ? `<div class="module-empty"><h2>No affiliates yet</h2><p>Users can register at affiliate.html</p></div>` : `
      <div class="orders-table-wrapper"><table class="admin-orders-table">
        <thead><tr><th>Name</th><th>Username</th><th>Email</th><th>Phone</th><th>Code</th><th>Status</th><th>Action</th></tr></thead>
        <tbody>
          ${list.map((a,i) => `<tr>
            <td><strong>${escapeHTML(a.name||"-")}</strong></td>
            <td>${escapeHTML(a.username||"-")}</td>
            <td>${escapeHTML(a.email||"-")}</td>
            <td>${escapeHTML(a.phone||"-")}</td>
            <td><code>${escapeHTML(a.code||"-")}</code></td>
            <td>${escapeHTML(a.status||"Active")}</td>
            <td>
              <button type="button" class="admin-view-order-btn" onclick="toggleAffiliate(${i})">${a.status==="Disabled"?"Enable":"Disable"}</button>
              <button type="button" class="admin-view-order-btn" style="background:#d9534f;color:#fff;" onclick="deleteAffiliate(${i})">Delete</button>
            </td>
          </tr>`).join("")}
        </tbody>
      </table></div>`}`;
}

function toggleAffiliate(i) {
    let list = [];
    try { list = JSON.parse(localStorage.getItem("seiMartAffiliates") || "[]"); } catch(e) {}
    if (!list[i]) return;
    list[i].status = list[i].status === "Disabled" ? "Active" : "Disabled";
    localStorage.setItem("seiMartAffiliates", JSON.stringify(list));
    loadAffiliatesModule();
}
function deleteAffiliate(i) {
    let list = [];
    try { list = JSON.parse(localStorage.getItem("seiMartAffiliates") || "[]"); } catch(e) {}
    list.splice(i, 1);
    localStorage.setItem("seiMartAffiliates", JSON.stringify(list));
    loadAffiliatesModule();
}

function loadStaffModule() {
    var container = document.getElementById("adminModuleContent");
    if (!container) return;
    var list = getStaffList();
    container.className = "admin-orders-module";
    container.innerHTML = `
      <div class="orders-module-header">
        <div><h2>Staff Accounts & Access</h2><p>Create Moderator, Delivery, Maintenance accounts and set powers</p></div>
        <div class="orders-count">${list.length} Staff</div>
      </div>
      <div style="background:#fff;border:1px solid #e3e9e4;border-radius:12px;padding:20px;margin-bottom:18px;max-width:720px;">
        <h3 style="margin-top:0;">Add Staff Account</h3>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;">
          <label>Name<br><input id="staffName" style="width:100%;padding:10px;border:1px solid #ccc;border-radius:8px;"></label>
          <label>Username<br><input id="staffUser" style="width:100%;padding:10px;border:1px solid #ccc;border-radius:8px;"></label>
          <label>Password<br><input id="staffPass" type="password" style="width:100%;padding:10px;border:1px solid #ccc;border-radius:8px;"></label>
          <label>Role<br>
            <select id="staffRole" onchange="onStaffRoleChange()" style="width:100%;padding:10px;border:1px solid #ccc;border-radius:8px;">
              <option value="moderator">Moderator</option>
              <option value="delivery">Delivery Man</option>
              <option value="maintenance">Maintenance</option>
              <option value="admin">Admin (full)</option>
            </select>
          </label>
        </div>
        <div style="margin-top:14px;">
          <strong>Powers (access)</strong>
          <div id="staffPowers" style="display:grid;grid-template-columns:repeat(auto-fill,minmax(140px,1fr));gap:8px;margin-top:8px;"></div>
        </div>
        <button type="button" class="admin-view-order-btn" style="background:#3f6f5a;color:#fff;margin-top:14px;padding:10px 18px;" onclick="addStaffAccount()">Create Account</button>
        <p id="staffMsg" style="display:none;margin-top:10px;color:#3f8c5a;"></p>
      </div>
      <div class="orders-table-wrapper"><table class="admin-orders-table">
        <thead><tr><th>Name</th><th>Username</th><th>Role</th><th>Powers</th><th>Action</th></tr></thead>
        <tbody>
          ${list.length ? list.map((s,i) => `<tr>
            <td><strong>${escapeHTML(s.name||"-")}</strong></td>
            <td>${escapeHTML(s.username||"-")}</td>
            <td>${escapeHTML(s.role||"-")}</td>
            <td style="font-size:12px;max-width:240px;">${escapeHTML((s.powers||[]).join(", "))}</td>
            <td><button type="button" class="admin-view-order-btn" style="background:#d9534f;color:#fff;" onclick="deleteStaff(${i})">Delete</button></td>
          </tr>`).join("") : "<tr><td colspan='5'>No staff yet. Create accounts above.</td></tr>"}
        </tbody>
      </table></div>`;
    onStaffRoleChange();
}

function onStaffRoleChange() {
    var role = (document.getElementById("staffRole") || {}).value || "moderator";
    var defaults = SEI_ROLE_POWERS[role] || [];
    var allPowers = ["dashboard","orders","order-status","print-invoice","products","customers","coupons","inventory","reports","reviews","messages","support","returns","website","settings","staff"];
    var box = document.getElementById("staffPowers");
    if (!box) return;
    var locked = role === "delivery";
    box.innerHTML = allPowers.map(function(p) {
        var checked = defaults.indexOf(p) >= 0 || defaults.indexOf("all") >= 0 ? "checked" : "";
        var disabled = locked ? "disabled" : "";
        return '<label style="font-size:13px;display:flex;gap:6px;align-items:center;'+(locked?'opacity:.72;cursor:not-allowed;':'')+'"><input type="checkbox" class="staff-power-cb" value="'+p+'" '+checked+' '+disabled+'> '+p+'</label>';
    }).join("");
    var noteId = "deliveryPowerLockNote";
    var oldNote = document.getElementById(noteId);
    if (oldNote) oldNote.remove();
    if (locked) {
        box.insertAdjacentHTML("afterend", '<div id="'+noteId+'" style="margin-top:8px;font-size:12px;color:#7b877f;">Delivery permissions are automatic and locked to Dashboard, Orders, Order Status and Print Invoice. Delivery staff can only work with their assigned orders.</div>');
    }
}

function addStaffAccount() {
    var name = (document.getElementById("staffName") || {}).value || "";
    var username = ((document.getElementById("staffUser") || {}).value || "").trim().toLowerCase();
    var password = (document.getElementById("staffPass") || {}).value || "";
    var role = (document.getElementById("staffRole") || {}).value || "moderator";
    name = name.trim();
    if (!name || !username || !password) { alert("Fill name, username, password"); return; }
    var powers = [];
    document.querySelectorAll(".staff-power-cb:checked").forEach(function(cb){ powers.push(cb.value); });
    if (role === "delivery") {
        powers = SEI_ROLE_POWERS.delivery.slice();
    }
    var list = getStaffList();
    if (list.some(function(s){ return String(s.username).toLowerCase() === username; })) {
        alert("Username already exists"); return;
    }
    list.push({ name: name, username: username, passwordHash: SeiSecurity.hashPassword(password), role: role, powers: powers, status: "Active", createdAt: new Date().toISOString() });
    saveStaffList(list);
    var msg = document.getElementById("staffMsg");
    if (msg) { msg.style.display = "block"; msg.textContent = "Staff account created."; }
    loadStaffModule();
}

function deleteStaff(i) {
    var list = getStaffList();
    list.splice(i, 1);
    saveStaffList(list);
    loadStaffModule();
}

function loadAdminProfileModule() {
    const container = document.getElementById("adminModuleContent");
    if (!container) return;
    let profile = {};
    try { profile = JSON.parse(localStorage.getItem("seiMartAdminProfile") || "{}"); } catch(e) {}
    profile = Object.assign({
        name: "Admin",
        email: "admin@seimart.com",
        phone: "",
        role: "Super Admin"
    }, profile);
    // If staff logged in, show their account info
    try {
        var staff = JSON.parse(localStorage.getItem("seiMartCurrentStaff") || "null");
        if (staff && staff.username) {
            profile = {
                name: staff.name || staff.username,
                email: staff.username + " (login id)",
                phone: staff.phone || "",
                role: (staff.role || "staff").toUpperCase(),
                powers: (staff.powers || []).join(", "),
                username: staff.username
            };
        }
    } catch(e) {}

    container.className = "admin-orders-module";
    container.innerHTML = `
        <div class="orders-module-header"><div><h2>Admin Profile</h2><p>Your administrator account</p></div></div>
        <div style="background:#fff;border:1px solid #e3e9e4;border-radius:12px;padding:24px;max-width:480px;">
            <div style="text-align:center;margin-bottom:20px;">
                <div style="width:80px;height:80px;border-radius:50%;background:#3f6f5a;color:#fff;display:inline-flex;align-items:center;justify-content:center;font-size:32px;">👤</div>
                <div style="margin-top:8px;font-weight:600;">${escapeHTML(profile.role)}</div>
            </div>
            <label style="display:block;margin-bottom:12px;">Name<br>
                <input id="adminName" value="${escapeHTML(profile.name)}" style="width:100%;padding:10px;border:1px solid #ccc;border-radius:6px;margin-top:4px;">
            </label>
            <label style="display:block;margin-bottom:12px;">Email<br>
                <input id="adminEmail" value="${escapeHTML(profile.email)}" style="width:100%;padding:10px;border:1px solid #ccc;border-radius:6px;margin-top:4px;">
            </label>
            <label style="display:block;margin-bottom:12px;">Phone<br>
                <input id="adminPhone" value="${escapeHTML(profile.phone)}" style="width:100%;padding:10px;border:1px solid #ccc;border-radius:6px;margin-top:4px;">
            </label>
            <label style="display:block;margin-bottom:16px;">Role<br>
                <input id="adminRole" value="${escapeHTML(profile.role)}" ${profile.username ? "readonly" : ""} style="width:100%;padding:10px;border:1px solid #ccc;border-radius:6px;margin-top:4px;">
            </label>
            ${profile.username ? `<label style="display:block;margin-bottom:12px;">Username<br>
                <input value="${escapeHTML(profile.username)}" readonly style="width:100%;padding:10px;border:1px solid #ccc;border-radius:6px;margin-top:4px;background:#f5f7f5;">
            </label>
            <label style="display:block;margin-bottom:16px;">Allowed Powers<br>
                <textarea readonly rows="3" style="width:100%;padding:10px;border:1px solid #ccc;border-radius:6px;margin-top:4px;background:#f5f7f5;">${escapeHTML(profile.powers||"")}</textarea>
            </label>
            <p style="color:#7b877f;font-size:13px;">Staff profiles are managed from Staff Rules. Contact super admin to change access.</p>` : `
            <button type="button" class="admin-view-order-btn" style="background:#3f6f5a;color:#fff;padding:10px 20px;" onclick="saveAdminProfile()">Save Profile</button>`}
            <p id="profileMsg" style="margin-top:10px;color:#3f8c5a;display:none;">Profile saved.</p>
        </div>`;
}

function saveAdminProfile() {
    const profile = {
        name: document.getElementById("adminName")?.value || "Admin",
        email: document.getElementById("adminEmail")?.value || "",
        phone: document.getElementById("adminPhone")?.value || "",
        role: document.getElementById("adminRole")?.value || "Super Admin"
    };
    localStorage.setItem("seiMartAdminProfile", JSON.stringify(profile));
    const msg = document.getElementById("profileMsg");
    if (msg) { msg.style.display = "block"; setTimeout(() => msg.style.display = "none", 2000); }
    // update sidebar name if present
    const sideName = document.querySelector(".admin-info h4, .sidebar-profile h4");
    if (sideName) sideName.textContent = profile.name;
}

/* =====================================================
   MODULE BUTTONS
===================================================== */
document.querySelectorAll("[data-module]").forEach(function(element) {
    element.addEventListener("click", function(event) {
        event.preventDefault();
        const module = this.dataset.module || this.getAttribute("data-module");
        if (!module) return;

        if (["all-products","add-product","edit-product","delete-product",
             "product-price","product-discount","product-stock","product-images"].includes(module)) {
            window.location.href = "admin/products/products.html";
            return;
        }

        if (module === "staff-accounts" || module === "roles" || module === "team") {
            window.location.href = "admin/staff-rules.html";
            return;
        }
        if (module === "seller-requests") {
            window.location.href = "admin/seller-requests.html";
            return;
        }
        if (module === "affiliates") {
            window.location.href = "admin/affiliates-manage.html";
            return;
        }

        // Update page title if elements exist
        var titles = {
            "seller-requests": "Seller Requests",
            "affiliates": "Affiliates",
            "dashboard": "Dashboard"
        };
        var pageTitle = document.getElementById("pageTitle");
        var pageSubtitle = document.getElementById("pageSubtitle");
        if (pageTitle && titles[module]) pageTitle.textContent = titles[module];
        if (pageSubtitle && module === "seller-requests") pageSubtitle.textContent = "Sell with Sei Mart applications";
        if (pageSubtitle && module === "affiliates") pageSubtitle.textContent = "Affiliate partners";

        showModule(module);

        document.querySelectorAll(".menu-link").forEach(function(l) { l.classList.remove("active"); });
        const btn = this.closest(".menu-item") && this.closest(".menu-item").querySelector(".menu-link") || this;
        if (btn && btn.classList) btn.classList.add("active");
    });
});


/* =====================================================
   LOGOUT
===================================================== */
(function() {
    var logoutBtn = document.getElementById("logoutBtn");
    if (logoutBtn) {
        logoutBtn.addEventListener("click", function(e) {
            e.preventDefault();
            try {
                sessionStorage.removeItem("seiMartAdminLoggedIn");
                localStorage.removeItem("seiMartAdminLoggedIn");
                localStorage.removeItem("seiMartCurrentStaff");
                localStorage.removeItem("seiMartRememberAdmin");
            } catch (err) {}
            window.location.href = "admin/login.html";
        });
    }
})();


/* =====================================================
   LOGGED-IN IDENTITY + ADMIN NOTIFICATIONS
===================================================== */
function getLoggedAdminIdentity() {
    try {
        var staff = JSON.parse(localStorage.getItem("seiMartCurrentStaff") || "null");
        if (staff && staff.username) {
            return {
                name: staff.name || staff.username,
                role: (staff.role || "staff"),
                roleLabel: String(staff.role || "staff").replace(/-/g, " ").replace(/\b\w/g, function(c){ return c.toUpperCase(); }),
                username: staff.username,
                isStaff: true,
                powers: staff.powers || []
            };
        }
    } catch (e) {}
    var profile = {};
    try { profile = JSON.parse(localStorage.getItem("seiMartAdminProfile") || "{}"); } catch (e) {}
    return {
        name: profile.name || "Administrator",
        role: "admin",
        roleLabel: profile.role || "Super Admin",
        username: "superadmin",
        isStaff: false,
        powers: ["all"]
    };
}

function applyLoggedInIdentity() {
    var id = getLoggedAdminIdentity();
    var el;
    el = document.getElementById("sidebarUserName");
    if (el) el.textContent = id.name;
    el = document.getElementById("topUserName");
    if (el) el.textContent = id.name;
    el = document.getElementById("topUserRole");
    if (el) el.textContent = id.roleLabel;
    el = document.getElementById("headerWelcomeSub");
    if (el) el.textContent = "Welcome back, " + id.name;
    el = document.getElementById("welcomeUserName");
    if (el) el.textContent = "Welcome back, " + id.name;
    var av = document.querySelector(".admin-avatar");
    if (av) av.textContent = (id.name || "A").charAt(0).toUpperCase();
    var tav = document.querySelector(".top-avatar");
    if (tav) tav.textContent = (id.name || "A").charAt(0).toUpperCase();
}

function getAdminNotifications() {
    try { return JSON.parse(localStorage.getItem("seiMartAdminNotifications") || "[]"); } catch (e) { return []; }
}
function saveAdminNotifications(list) {
    localStorage.setItem("seiMartAdminNotifications", JSON.stringify((list || []).slice(0, 120)));
}
function pushAdminNotification(payload) {
    var list = getAdminNotifications();
    list.unshift(Object.assign({
        id: "N" + Date.now(),
        at: new Date().toISOString(),
        label: new Date().toLocaleString("en-BD"),
        readBy: []
    }, payload));
    saveAdminNotifications(list);
    updateAdminNotifDot();
}
function notificationsForCurrentUser() {
    var id = getLoggedAdminIdentity();
    var all = getAdminNotifications();
    if (!id.isStaff || id.role === "admin") {
        // super admin sees everything
        return all;
    }
    // staff: own activity + targeted to them + broadcast
    return all.filter(function (n) {
        var to = String(n.to || "");
        return to === id.username || to === "*" || to === id.role ||
            String(n.from || "") === id.username ||
            (Array.isArray(n.mentions) && n.mentions.indexOf(id.username) >= 0);
    });
}
function updateAdminNotifDot() {
    var id = getLoggedAdminIdentity();
    var list = notificationsForCurrentUser();
    var unread = list.filter(function (n) {
        return !Array.isArray(n.readBy) || n.readBy.indexOf(id.username) < 0;
    }).length;
    var dot = document.getElementById("adminNotifDot");
    if (dot) dot.style.display = unread > 0 ? "block" : "none";
}
function toggleAdminNotifPanel(e) {
    if (e) e.stopPropagation();
    var panel = document.getElementById("adminNotifPanel");
    if (!panel) return;
    if (panel.style.display === "block") {
        panel.style.display = "none";
        return;
    }
    var id = getLoggedAdminIdentity();
    var list = notificationsForCurrentUser();
    list.forEach(function (n) {
        if (!Array.isArray(n.readBy)) n.readBy = [];
        if (n.readBy.indexOf(id.username) < 0) n.readBy.push(id.username);
    });
    saveAdminNotifications(getAdminNotifications().map(function (n) {
        var u = list.find(function (x) { return x.id === n.id; });
        return u || n;
    }));
    updateAdminNotifDot();
    if (!list.length) {
        panel.innerHTML = '<p style="color:#999;margin:8px;font-size:14px;">No notifications.</p>';
    } else {
        panel.innerHTML = '<div style="font-weight:700;margin-bottom:8px;color:#17231d;">Notifications</div>' +
            list.slice(0, 25).map(function (n) {
                return '<div style="padding:10px 6px;border-bottom:1px solid #eee;">' +
                    '<strong style="display:block;color:#17231d;font-size:13px;">' + String(n.title || "").replace(/</g, "") + '</strong>' +
                    '<span style="font-size:11px;color:#7b877f;">' + String(n.label || "") + (n.from ? (" · " + n.from) : "") + '</span>' +
                    '<p style="margin:4px 0 0;font-size:13px;color:#555;">' + String(n.body || "").replace(/</g, "") + '</p></div>';
            }).join("");
    }
    panel.style.display = "block";
}
document.addEventListener("click", function (e) {
    var panel = document.getElementById("adminNotifPanel");
    var btn = document.getElementById("adminNotifBtn");
    if (!panel || panel.style.display !== "block") return;
    if (panel.contains(e.target) || (btn && btn.contains(e.target))) return;
    panel.style.display = "none";
});

// Log activity helper used across admin
function logAdminActivity(title, body, opts) {
    opts = opts || {};
    var id = getLoggedAdminIdentity();
    pushAdminNotification({
        title: title,
        body: body || "",
        from: id.username,
        to: opts.to || "superadmin",
        mentions: opts.mentions || []
    });
    // also mirror to actor's feed
    if (id.isStaff) {
        pushAdminNotification({
            title: title,
            body: body || "",
            from: id.username,
            to: id.username,
            mentions: []
        });
    }
}


/* =====================================================
   INITIAL LOAD
===================================================== */
updateDate();
loadDashboardData();
try { applyLoggedInIdentity(); updateAdminNotifDot(); } catch(e) {}


/* Filter sidebar by staff powers */
(function applyStaffSidebar() {
    var staff = null;
    try { staff = JSON.parse(localStorage.getItem("seiMartCurrentStaff") || "null"); } catch(e) {}
    if (!staff || !staff.powers) return;
    if (staff.role === "admin" || (staff.powers && staff.powers.indexOf("all") >= 0)) return;

    var powerMap = {
        "dashboard": "dashboard",
        "all-orders": "orders", "pending-orders": "orders", "confirmed-orders": "orders",
        "processing-orders": "orders", "shipped-orders": "orders", "delivered-orders": "orders",
        "cancelled-orders": "orders", "order-details": "orders", "print-invoice": "print-invoice",
        "cod-payments": "orders", "bkash-payments": "orders", "payment-status": "orders",
        "all-customers": "customers", "customer-details": "customers", "customer-orders": "customers",
        "reviews": "reviews", "customer-messages": "messages", "support-requests": "support",
        "categories": "products", "coupons": "coupons",
        "inventory-stock": "inventory", "low-stock": "inventory", "out-stock": "inventory",
        "sales-report": "reports", "orders-report": "reports", "revenue-report": "reports",
        "top-products": "reports", "customer-report": "reports",
        "homepage-banner": "website", "todays-deals": "website", "new-arrivals": "website", "promo-popup": "website",
        "settings": "settings", "admin-profile": "settings",
        "staff-accounts": "staff", "seller-requests": "sellers", "affiliates": "affiliates", "delivery-management": "orders"
    };
    var powers = staff.powers || [];
    function allowed(mod) {
        var need = powerMap[mod] || mod;
        return powers.indexOf(need) >= 0 || powers.indexOf("all") >= 0;
    }
    document.querySelectorAll("[data-module]").forEach(function(el) {
        var mod = el.getAttribute("data-module");
        if (!mod) return;
        if (!allowed(mod)) {
            var item = el.closest(".menu-item");
            if (item) item.style.display = "none";
            else el.style.display = "none";
        }
    });
    // hide submenus that have no visible children
    document.querySelectorAll(".menu-item.has-submenu").forEach(function(item) {
        var links = item.querySelectorAll("[data-module]");
        var any = false;
        links.forEach(function(l) {
            var mod = l.getAttribute("data-module");
            if (mod && allowed(mod)) any = true;
        });
        if (!any) item.style.display = "none";
    });
    // show role badge
    var info = document.querySelector(".admin-info h4, .sidebar-profile h4, .admin-name");
    if (info) info.textContent = (staff.name || staff.username) + " (" + staff.role + ")";
})();

/* =====================================================
   PHASE 1–3 PROFESSIONAL ENHANCEMENTS
   Existing localStorage architecture preserved.
===================================================== */
(function(){
  function _read(k,d){try{var v=JSON.parse(localStorage.getItem(k)||'null');return v==null?d:v}catch(e){return d}}
  function _write(k,v){localStorage.setItem(k,JSON.stringify(v));}
  function _esc(v){return typeof escapeHTML==='function'?escapeHTML(v==null?'':v):String(v==null?'':v).replace(/[&<>"']/g,function(c){return ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'})[c]})}
  function _money(v){return typeof formatAdminMoney==='function'?formatAdminMoney(v):'৳'+Number(v||0).toLocaleString('en-BD')}

  /* ---------- Categories CRUD ---------- */
  function catList(){
    var cats=_read('seiMartCategories',null);
    if(!Array.isArray(cats)||!cats.length){
      cats=[['electronics','Electronics'],['mobile','Mobile'],['fashion','Fashion'],['shoes','Shoes'],['cosmetics','Cosmetics'],['perfume','Perfume'],['watches','Watches'],['home','Home'],['jewellery','Jewellery'],['beauty','Beauty']].map(function(x,i){return {id:x[0],name:x[1],slug:x[0],active:true,sort:i+1,createdAt:new Date().toISOString()}});
      _write('seiMartCategories',cats);
    }
    return cats;
  }
  function saveCats(c){_write('seiMartCategories',c)}
  window.loadCategoriesModule=function(){
    var el=document.getElementById('adminModuleContent'); if(!el)return;
    var cats=catList().sort(function(a,b){return Number(a.sort||0)-Number(b.sort||0)});
    var products=typeof getProducts==='function'?getProducts():[];
    var count={}; products.forEach(function(p){var k=String(p.category||'').toLowerCase();count[k]=(count[k]||0)+1});
    el.className='admin-orders-module';
    el.innerHTML='<div class="orders-module-header"><div><h2>Categories</h2><p>Create, edit, activate and organize store categories.</p></div><div class="orders-count">'+cats.length+' Categories</div></div>'+
      '<div style="background:#fff;border:1px solid #e3e9e4;border-radius:12px;padding:20px;margin-bottom:18px;max-width:760px;">'+
      '<h3 style="margin-top:0;">Add Category</h3><div style="display:grid;grid-template-columns:1fr 1fr 120px;gap:10px;align-items:end;">'+
      '<label>Name<input id="catName" style="width:100%;padding:10px;border:1px solid #ccc;border-radius:8px;box-sizing:border-box;"></label>'+
      '<label>Slug<input id="catSlug" placeholder="auto" style="width:100%;padding:10px;border:1px solid #ccc;border-radius:8px;box-sizing:border-box;"></label>'+
      '<label>Order<input id="catSort" type="number" value="'+(cats.length+1)+'" style="width:100%;padding:10px;border:1px solid #ccc;border-radius:8px;box-sizing:border-box;"></label></div>'+
      '<button type="button" class="admin-view-order-btn" style="margin-top:12px;background:#3f6f5a;color:#fff;padding:10px 18px;" onclick="seiAddCategory()">Add Category</button></div>'+
      '<div class="orders-table-wrapper"><table class="admin-orders-table"><thead><tr><th>Category</th><th>Slug</th><th>Products</th><th>Order</th><th>Status</th><th>Actions</th></tr></thead><tbody>'+
      (cats.length?cats.map(function(c,i){return '<tr><td><strong>'+_esc(c.name)+'</strong></td><td>'+_esc(c.slug||c.id)+'</td><td>'+Number(count[String(c.slug||c.id).toLowerCase()]||0)+'</td><td>'+Number(c.sort||0)+'</td><td>'+((c.active!==false)?'✅ Active':'⛔ Off')+'</td><td><button class="admin-view-order-btn" onclick="seiEditCategory('+i+')">Edit</button> <button class="admin-view-order-btn" onclick="seiToggleCategory('+i+')">'+(c.active!==false?'Disable':'Enable')+'</button> <button class="admin-view-order-btn" style="background:#d9534f;color:#fff;" onclick="seiDeleteCategory('+i+')">Delete</button></td></tr>'}).join(''):'<tr><td colspan="6">No categories.</td></tr>')+'</tbody></table></div>';
  };
  window.seiAddCategory=function(){
    var name=(document.getElementById('catName')||{}).value||''; name=name.trim();
    var slug=((document.getElementById('catSlug')||{}).value||name).trim().toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'');
    var sort=Number((document.getElementById('catSort')||{}).value)||1;
    if(!name||!slug){alert('Category name is required.');return}
    var cats=catList(); if(cats.some(function(c){return String(c.slug||c.id).toLowerCase()===slug})){alert('Category already exists.');return}
    cats.push({id:slug,name:name,slug:slug,sort:sort,active:true,createdAt:new Date().toISOString()});saveCats(cats);loadCategoriesModule();
  };
  window.seiEditCategory=function(i){var cats=catList();var c=cats[i];if(!c)return;var name=prompt('Category name:',c.name);if(name===null)return;name=name.trim();if(!name)return;var slug=prompt('Category slug:',c.slug||c.id);if(slug===null)return;slug=slug.trim().toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'');if(!slug)return; c.name=name;c.slug=slug;c.id=slug;saveCats(cats);loadCategoriesModule()};
  window.seiToggleCategory=function(i){var cats=catList();if(!cats[i])return;cats[i].active=cats[i].active===false;saveCats(cats);loadCategoriesModule()};
  window.seiDeleteCategory=function(i){var cats=catList();var c=cats[i];if(!c)return;var products=typeof getProducts==='function'?getProducts():[];var used=products.some(function(p){return String(p.category||'').toLowerCase()===String(c.slug||c.id).toLowerCase()});if(used){alert('This category is used by products. Move those products to another category first.');return}if(!confirm('Delete '+c.name+'?'))return;cats.splice(i,1);saveCats(cats);loadCategoriesModule()};

  /* ---------- Reviews moderation ---------- */
  window.loadReviewsModule=function(){
    var el=document.getElementById('adminModuleContent');if(!el)return;var all=_read('seiMartProductReviews',{}),rows=[];
    Object.keys(all||{}).forEach(function(pid){(Array.isArray(all[pid])?all[pid]:[]).forEach(function(r,idx){rows.push({pid:pid,idx:idx,r:r})})});
    var products=typeof getProducts==='function'?getProducts():[];var names={};products.forEach(function(p){names[p.id]=p.name});
    var pending=rows.filter(function(x){return x.r.status==='pending'}).length;
    el.className='admin-orders-module';el.innerHTML='<div class="orders-module-header"><div><h2>Reviews & Ratings</h2><p>Moderate customer reviews before publishing.</p></div><div class="orders-count">'+rows.length+' Reviews · '+pending+' Pending</div></div>'+
      '<div class="orders-table-wrapper"><table class="admin-orders-table"><thead><tr><th>Product</th><th>Customer</th><th>Rating</th><th>Review</th><th>Status</th><th>Action</th></tr></thead><tbody>'+
      (rows.length?rows.map(function(x){var r=x.r;var st=r.status||'approved';return '<tr><td><strong>'+_esc(names[x.pid]||x.pid)+'</strong></td><td>'+_esc(r.name||'Customer')+'</td><td>'+('★'.repeat(Math.max(0,Math.min(5,Number(r.rating)||0))))+'</td><td style="max-width:300px;">'+_esc(r.comment||r.text||'')+'</td><td>'+ (st==='approved'?'✅ Approved':st==='rejected'?'❌ Rejected':'🕒 Pending')+'</td><td>'+ (st==='pending'?'<button class="admin-view-order-btn" onclick="seiReviewAction(\''+x.pid+'\','+x.idx+',\'approved\')">Approve</button> <button class="admin-view-order-btn" style="background:#d9534f;color:#fff;" onclick="seiReviewAction(\''+x.pid+'\','+x.idx+',\'rejected\')">Reject</button>':'<button class="admin-view-order-btn" onclick="seiReviewAction(\''+x.pid+'\','+x.idx+',\''+(st==='approved'?'rejected':'approved')+'\')">'+(st==='approved'?'Hide':'Publish')+'</button> <button class="admin-view-order-btn" style="background:#d9534f;color:#fff;" onclick="seiDeleteReview(\''+x.pid+'\','+x.idx+')">Delete</button>')+'</td></tr>'}).join(''):'<tr><td colspan="6">No reviews yet.</td></tr>')+'</tbody></table></div>';
  };
  window.seiReviewAction=function(pid,idx,status){var all=_read('seiMartProductReviews',{});if(!all[pid]||!all[pid][idx])return;all[pid][idx].status=status;all[pid][idx].moderatedAt=new Date().toISOString();_write('seiMartProductReviews',all);loadReviewsModule()};
  window.seiDeleteReview=function(pid,idx){var all=_read('seiMartProductReviews',{});if(!all[pid])return;if(!confirm('Delete this review?'))return;all[pid].splice(idx,1);if(!all[pid].length)delete all[pid];_write('seiMartProductReviews',all);loadReviewsModule()};

  /* ---------- Inventory history / adjustments ---------- */
  var oldInventory=window.updateProductStock;
  window.updateProductStock=function(productId){
    var products=typeof getProducts==='function'?getProducts():[];var p=products.find(function(x){return String(x.id)===String(productId)});if(!p)return;var before=Number(p.stock)||0;var input=document.getElementById('stock-input-'+productId);var after=Math.max(0,Number(input&&input.value)||0);if(before===after){alert('No stock change.');return}if(typeof oldInventory==='function')oldInventory(productId);else{p.stock=after;if(typeof saveProducts==='function')saveProducts(products);else _write('seiMartProducts',products)};var logs=_read('seiMartInventoryHistory',[]);logs.unshift({id:'IH'+Date.now(),productId:productId,productName:p.name,type:after>before?'adjustment-in':'adjustment-out',quantity:Math.abs(after-before),before:before,after:after,at:new Date().toISOString(),note:'Manual admin stock adjustment'});_write('seiMartInventoryHistory',logs.slice(0,500));loadInventoryModule(window.__invFilter||'all','');
  };

  /* ---------- Reports: exclude cancelled/refunded from revenue and add operational KPIs ---------- */
  window.loadReportsModule=function(type){
    var el=document.getElementById('adminModuleContent');if(!el)return;var orders=typeof getAdminOrders==='function'?getAdminOrders():[];var products=typeof getProducts==='function'?getProducts():[];
    var valid=orders.filter(function(o){return !/cancel/i.test(o.status||'') && !/refunded/i.test(o.paymentStatus||'')});
    var revenue=valid.reduce(function(s,o){return s+(Number(o.total)||0)},0), delivered=orders.filter(function(o){return /delivered/i.test(o.status||'')}).length, returns=_read('seiMartReturns',[]).length;
    var sold={};valid.forEach(function(o){(o.items||[]).forEach(function(it){var k=it.id||it.name; if(!sold[k])sold[k]={name:it.name||it.id,qty:0,revenue:0};sold[k].qty+=Number(it.quantity)||1;sold[k].revenue+=(Number(it.price)||0)*(Number(it.quantity)||1)})});
    var top=Object.values(sold).sort(function(a,b){return b.qty-a.qty}).slice(0,10);var status={};orders.forEach(function(o){status[o.status||'Unknown']=(status[o.status||'Unknown']||0)+1});
    var body='<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(170px,1fr));gap:14px;margin-bottom:20px;">'+[['Net Revenue',_money(revenue)],['Orders',orders.length],['Delivered',delivered],['Returns',returns],['Products',products.length]].map(function(x){return '<div style="background:#fff;border:1px solid #e3e9e4;border-radius:12px;padding:18px;"><small style="color:#7b877f;">'+x[0]+'</small><div style="font-size:25px;font-weight:700;color:#3f6f5a;margin-top:5px;">'+x[1]+'</div></div>'}).join('')+'</div>';
    if(type==='top-products') body+='<div class="orders-table-wrapper"><table class="admin-orders-table"><thead><tr><th>Product</th><th>Qty Sold</th><th>Revenue</th></tr></thead><tbody>'+top.map(function(x){return '<tr><td>'+_esc(x.name)+'</td><td>'+x.qty+'</td><td>'+_money(x.revenue)+'</td></tr>'}).join('')+'</tbody></table></div>';
    else if(type==='orders-report') body+='<div class="orders-table-wrapper"><table class="admin-orders-table"><thead><tr><th>Status</th><th>Orders</th></tr></thead><tbody>'+Object.keys(status).map(function(k){return '<tr><td>'+_esc(k)+'</td><td>'+status[k]+'</td></tr>'}).join('')+'</tbody></table></div>';
    else if(type==='customer-report'){var cm={};valid.forEach(function(o){var c=o.customer||{},k=(c.email||c.phone||c.name||'unknown').toLowerCase();if(!cm[k])cm[k]={name:c.name||'Customer',orders:0,spent:0};cm[k].orders++;cm[k].spent+=Number(o.total)||0});var topc=Object.values(cm).sort(function(a,b){return b.spent-a.spent}).slice(0,10);body+='<div class="orders-table-wrapper"><table class="admin-orders-table"><thead><tr><th>Customer</th><th>Orders</th><th>Spent</th></tr></thead><tbody>'+topc.map(function(x){return '<tr><td>'+_esc(x.name)+'</td><td>'+x.orders+'</td><td>'+_money(x.spent)+'</td></tr>'}).join('')+'</tbody></table></div>'}
    else body+='<div class="orders-table-wrapper"><table class="admin-orders-table"><thead><tr><th>Metric</th><th>Value</th></tr></thead><tbody><tr><td>Net Revenue</td><td>'+_money(revenue)+'</td></tr><tr><td>Average Order</td><td>'+_money(orders.length?revenue/orders.length:0)+'</td></tr><tr><td>Cancelled Orders</td><td>'+orders.filter(function(o){return /cancel/i.test(o.status||'')}).length+'</td></tr><tr><td>Refunded Payments</td><td>'+orders.filter(function(o){return /refund/i.test(o.paymentStatus||'')}).length+'</td></tr></tbody></table></div>';
    el.className='admin-orders-module';el.innerHTML='<div class="orders-module-header"><div><h2>'+_esc((moduleTitles[type]||['Report',''])[0])+'</h2><p>Operational and financial overview</p></div></div>'+body;
  };

  /* ---------- Delivery management ---------- */
  window.loadDeliveryManagementModule=function(){
    var el=document.getElementById('adminModuleContent');if(!el)return;var orders=typeof getAdminOrders==='function'?getAdminOrders():[];var staff=_read('seiMartStaff',[]).filter(function(s){return s.role==='delivery'&&s.status!=='Disabled'});
    el.className='admin-orders-module';el.innerHTML='<div class="orders-module-header"><div><h2>Delivery Management</h2><p>Assign delivery staff and monitor delivery progress.</p></div><div class="orders-count">'+orders.filter(function(o){return !/delivered|cancel/i.test(o.status||'')}).length+' Active</div></div>'+
      '<div class="orders-table-wrapper"><table class="admin-orders-table"><thead><tr><th>Order</th><th>Customer</th><th>Status</th><th>Delivery Staff</th><th>Tracking</th><th>Action</th></tr></thead><tbody>'+
      orders.filter(function(o){return !/cancel/i.test(o.status||'')}).map(function(o){var c=o.customer||{};return '<tr><td><strong>'+_esc(o.orderId)+'</strong></td><td>'+_esc(c.name||'-')+'<br><small>'+_esc(c.phone||'')+'</small></td><td>'+_esc(o.status||'-')+'</td><td><select id="delstaff-'+_esc(o.orderId)+'" style="padding:7px;border:1px solid #ccc;border-radius:7px;"><option value="">Unassigned</option>'+staff.map(function(s){return '<option value="'+_esc(s.username)+'" '+(String(o.deliveryStaffUsername||'')===String(s.username)?'selected':'')+'>'+_esc(s.name||s.username)+'</option>'}).join('')+'</select></td><td>'+_esc(o.trackingId||'-')+'</td><td><button class="admin-view-order-btn" style="background:#3f6f5a;color:#fff;" onclick="seiAssignDelivery(\''+String(o.orderId).replace(/'/g,"\\'")+'\')">Save</button></td></tr>'}).join('')+'</tbody></table></div>';
  };
  window.seiAssignDelivery=function(orderId){var sel=document.getElementById('delstaff-'+orderId),orders=typeof getAdminOrders==='function'?getAdminOrders():[];var i=orders.findIndex(function(o){return String(o.orderId)===String(orderId)});if(i<0)return;var username=sel?sel.value:'';var st=_read('seiMartStaff',[]).find(function(s){return String(s.username)===String(username)});orders[i].deliveryStaffUsername=username;orders[i].deliveryStaffName=st?st.name:'';orders[i].deliveryAssignedAt=username?new Date().toISOString():'';if(typeof saveAdminOrders==='function')saveAdminOrders(orders);else _write('seiMartOrders',orders);try{logAdminActivity('Delivery assignment','Order '+orderId+' → '+(st?st.name:'Unassigned'),{to:'superadmin'})}catch(e){};loadDeliveryManagementModule()};

  /* ---------- Return/Refund operational fields ---------- */
  var _oldReturn=window.updateReturnStatus;
  window.updateReturnStatus=function(index,status){if(typeof _oldReturn==='function')_oldReturn(index,status);var list=_read('seiMartReturns',[]);var r=list[index];if(r){r.updatedAt=new Date().toISOString();r.assignedAt=r.assignedAt||'';if(status==='Pickup Scheduled'&&!r.assignedAt)r.assignedAt=new Date().toISOString();_write('seiMartReturns',list)}};

  /* ---------- Staff management: edit, enable/disable ---------- */
  window.seiToggleStaff=function(i){var list=getStaffList();if(!list[i])return;list[i].status=list[i].status==='Disabled'?'Active':'Disabled';saveStaffList(list);loadStaffModule()};
  window.seiEditStaff=function(i){var list=getStaffList(),s=list[i];if(!s)return;var name=prompt('Staff name:',s.name||'');if(name===null)return;var role=prompt('Role (moderator/delivery/maintenance/admin):',s.role||'moderator');if(role===null)return;var powers=prompt('Powers comma-separated:',(s.powers||[]).join(','));if(powers===null)return;s.name=name.trim()||s.name;s.role=role.trim()||s.role;s.powers=powers.split(',').map(function(x){return x.trim()}).filter(Boolean);saveStaffList(list);loadStaffModule()};
  var _oldLoadStaff=window.loadStaffModule;
  if(typeof _oldLoadStaff==='function'){
    window.loadStaffModule=function(){_oldLoadStaff();var rows=document.querySelectorAll('#adminModuleContent table tbody tr');var list=getStaffList();rows.forEach(function(row,i){var cell=row.lastElementChild;if(!cell||!list[i])return;cell.innerHTML='<button type="button" class="admin-view-order-btn" onclick="seiEditStaff('+i+')">Edit</button> <button type="button" class="admin-view-order-btn" onclick="seiToggleStaff('+i+')">'+(list[i].status==='Disabled'?'Enable':'Disable')+'</button> <button type="button" class="admin-view-order-btn" style="background:#d9534f;color:#fff;" onclick="deleteStaff('+i+')">Delete</button>'})};
  }

  /* Extend existing showModule without replacing existing behavior. */
  var _show=window.showModule;
  window.showModule=function(module){
    if(module==='delivery-management'){
      var st=getCurrentStaff&&getCurrentStaff();if(st&&st.role!=='admin'&&(st.powers||[]).indexOf('all')<0&&(st.powers||[]).indexOf('orders')<0){var c=document.getElementById('adminModuleContent');if(c)c.innerHTML='<div class="module-empty"><h2>Access Denied</h2><p>Your role does not have delivery-management access.</p></div>';return}
      document.getElementById('dashboardModule').style.display='none';document.getElementById('moduleArea').style.display='block';document.getElementById('pageTitle').textContent='Delivery Management';document.getElementById('pageSubtitle').textContent='Assign and monitor delivery staff';loadDeliveryManagementModule();return;
    }
    return _show(module);
  };
})();

/* Return/Refund operational controls: refund method, pickup owner, restock decision */
(function(){
  function rrRead(){try{return JSON.parse(localStorage.getItem('seiMartReturns')||'[]')}catch(e){return[]}}
  function rrWrite(v){localStorage.setItem('seiMartReturns',JSON.stringify(v||[]))}
  function esc(v){return typeof escapeHTML==='function'?escapeHTML(v==null?'':v):String(v==null?'':v)}
  function money(v){return typeof formatAdminMoney==='function'?formatAdminMoney(v):'৳'+Number(v||0).toLocaleString('en-BD')}
  window.loadReturnsModule=function(){
    var el=document.getElementById('adminModuleContent');if(!el)return;var list=rrRead();var statuses=['Requested','Approved','Pickup Scheduled','Received','Inspecting','Refund Approved','Refunded','Rejected'];
    el.className='admin-orders-module';el.innerHTML='<div class="orders-module-header"><div><h2>Return / Refund Requests</h2><p>Approve, schedule pickup, inspect, refund and decide whether returned stock goes back to inventory.</p></div><div class="orders-count">'+list.length+' Requests</div></div>'+
    '<div class="orders-table-wrapper"><table class="admin-orders-table"><thead><tr><th>Request</th><th>Order / Customer</th><th>Products</th><th>Reason</th><th>Refund</th><th>Restock</th><th>Status</th><th>Action</th></tr></thead><tbody>'+
    (list.length?list.map(function(r,i){var c=r.customer||{};var items=(r.items||[]).map(function(x){return esc(x.name||x.id)+' ×'+(Number(x.quantity)||1)}).join('<br>')||'-';var opts=statuses.map(function(st){return '<option value="'+esc(st)+'" '+(String(r.status||'Requested')===st?'selected':'')+'>'+st+'</option>'}).join('');return '<tr><td><strong>'+esc(r.id||'-')+'</strong><br><small>'+esc((r.createdAt||'').slice(0,10))+'</small></td><td><strong>'+esc(r.orderId||'-')+'</strong><br>'+esc(c.name||'-')+'<br><small>'+esc(c.phone||c.email||'')+'</small></td><td>'+items+'<br><small>'+money(r.total||0)+'</small></td><td>'+esc(r.reason||'-')+'<br><small>'+esc(r.details||'')+'</small></td><td><select id="rr-method-'+i+'" style="padding:5px;border:1px solid #ccc;border-radius:6px;"><option value="Original Payment" '+(r.refundMethod==='Original Payment'?'selected':'')+'>Original Payment</option><option value="bKash" '+(r.refundMethod==='bKash'?'selected':'')+'>bKash</option><option value="Cash" '+(r.refundMethod==='Cash'?'selected':'')+'>Cash</option></select><br><input id="rr-amount-'+i+'" type="number" min="0" value="'+Number(r.refundAmount!=null?r.refundAmount:(r.total||0))+'" style="width:95px;margin-top:5px;padding:5px;border:1px solid #ccc;border-radius:6px;"></td><td><select id="rr-restock-'+i+'" style="padding:5px;border:1px solid #ccc;border-radius:6px;"><option value="Pending" '+(r.restockDecision==='Pending'||!r.restockDecision?'selected':'')+'>Pending</option><option value="Restock" '+(r.restockDecision==='Restock'?'selected':'')+'>Restock</option><option value="Damaged" '+(r.restockDecision==='Damaged'?'selected':'')+'>Damaged / No restock</option></select></td><td><select id="rr-status-'+i+'" style="padding:5px;border:1px solid #ccc;border-radius:6px;">'+opts+'</select></td><td><button class="admin-view-order-btn" style="background:#3f6f5a;color:#fff;" onclick="seiSaveReturnRequest('+i+')">Save</button></td></tr>'}).join(''):'<tr><td colspan="8">No return requests.</td></tr>')+'</tbody></table></div>';
  };
  window.seiSaveReturnRequest=function(i){var list=rrRead(),r=list[i];if(!r)return;r.refundMethod=(document.getElementById('rr-method-'+i)||{}).value||'Original Payment';r.refundAmount=Math.max(0,Number((document.getElementById('rr-amount-'+i)||{}).value)||0);r.restockDecision=(document.getElementById('rr-restock-'+i)||{}).value||'Pending';var st=(document.getElementById('rr-status-'+i)||{}).value||r.status||'Requested';r.status=st;r.updatedAt=new Date().toISOString();r.history=Array.isArray(r.history)?r.history:[];r.history.push({status:st,at:r.updatedAt,label:new Date().toLocaleString('en-BD'),note:'Return controls updated'});if(st==='Pickup Scheduled'&&!r.pickupScheduledAt)r.pickupScheduledAt=r.updatedAt;if(st==='Refunded'){var orders=typeof getAdminOrders==='function'?getAdminOrders():[];var oi=orders.findIndex(function(o){return String(o.orderId)===String(r.orderId)});if(oi>=0){orders[oi].paymentStatus='Refunded';if(typeof saveAdminOrders==='function')saveAdminOrders(orders);else localStorage.setItem('seiMartOrders',JSON.stringify(orders));}}rrWrite(list);loadReturnsModule()};
})();
