/* =====================================================
   SEI MART
   ORDER DETAILS MODULE
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


    /* =================================================
       ORDER DATA
    ================================================= */

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


    /* =================================================
       ORDER ITEMS
    ================================================= */

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


    /* =================================================
       TRANSACTION
    ================================================= */

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


    /* =================================================
       CUSTOMER ADDRESS
    ================================================= */

    const customerAddress =
        customer.address ||
        customer.fullAddress ||
        order.address ||
        "-";


    /* =================================================
       RENDER
    ================================================= */

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


        <!-- ORDER INFORMATION -->

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


        <!-- CUSTOMER INFORMATION -->

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


        <!-- ORDERED ITEMS -->

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


        <!-- ORDER SUMMARY -->

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


        <!-- BACK BUTTON -->

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


    /* =================================================
       PAGE HEADER
    ================================================= */

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


    /* =================================================
       SCROLL TOP
    ================================================= */

    window.scrollTo({

        top: 0,

        behavior: "smooth"

    });

}


/* =====================================================
   GLOBAL ACCESS
===================================================== */

window.viewAdminOrder =
    viewAdminOrder;