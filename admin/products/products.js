/* =====================================================
   SEI MART PRODUCT MANAGEMENT
   STEP 3A - MODULE NAVIGATION
===================================================== */


/* =====================================================
   MODULE CONFIG
===================================================== */

const productModules = {

    "all-products": {
        title: "All Products",
        description: "View and manage your product inventory.",
        module: "all-products-module"
    },

    "add-product": {
        title: "Add Product",
        description: "Add a new product to your Sei Mart inventory.",
        module: "add-product-module"
    },

    "edit-product": {
        title: "Edit Product",
        description: "Update existing product information.",
        module: "edit-product-module"
    },

    "delete-product": {
        title: "Delete Product",
        description: "Remove a product from your inventory.",
        module: "delete-product-module"
    },

    "product-price": {
        title: "Product Price",
        description: "Manage product pricing.",
        module: "product-price-module"
    },

    "product-discount": {
        title: "Product Discount",
        description: "Manage product discounts.",
        module: "product-discount-module"
    },

    "product-stock": {
        title: "Product Stock",
        description: "Manage product stock and inventory quantity.",
        module: "product-stock-module"
    },

    "product-images": {
        title: "Product Images",
        description: "Upload and manage product images.",
        module: "product-images-module"
    },

    "product-coupons": {
        title: "Coupons",
        description: "Create and manage customer discount coupons.",
        module: "product-coupons-module"
    }

};


/* =====================================================
   ELEMENTS
===================================================== */

const productPageTitle =
    document.getElementById(
        "productPageTitle"
    );


const productPageDescription =
    document.getElementById(
        "productPageDescription"
    );


const moduleTitle =
    document.getElementById(
        "moduleTitle"
    );


const moduleDescription =
    document.getElementById(
        "moduleDescription"
    );


const productModuleElements =
    document.querySelectorAll(
        ".product-module"
    );


/* =====================================================
   SHOW PRODUCT MODULE
===================================================== */

function showProductModule(
    moduleName
) {

    const config =
        productModules[moduleName];


    if (!config) {
        return;
    }


    /* =========================================
       HIDE ALL MODULES
    ========================================= */

    productModuleElements.forEach(
        function (module) {

            module.style.display =
                "none";

        }
    );


    /* =========================================
       SHOW SELECTED MODULE
    ========================================= */

    const selectedModule =
        document.getElementById(
            config.module
        );


    if (selectedModule) {

        selectedModule.style.display =
            "block";

    }


    /* =========================================
       UPDATE PAGE TITLE
    ========================================= */

    if (productPageTitle) {

        productPageTitle.textContent =
            config.title;

    }


    if (productPageDescription) {

        productPageDescription.textContent =
            config.description;

    }


    if (moduleTitle) {

        moduleTitle.textContent =
            config.title;

    }


    if (moduleDescription) {

        moduleDescription.textContent =
            config.description;

    }

}


/* =====================================================
   SIDEBAR MODULE LINKS
===================================================== */

const productMenuLinks =
    document.querySelectorAll(
        '[data-module]'
    );


productMenuLinks.forEach(
    function (link) {

        link.addEventListener(
            "click",
            function () {

                const moduleName =
                    link.getAttribute(
                        "data-module"
                    );


                if (
                    productModules[moduleName]
                ) {

                    localStorage.setItem(
                        "seiMartProductModule",
                        moduleName
                    );

                }

            }
        );

    }
);


/* =====================================================
   LOAD SELECTED MODULE
===================================================== */

const savedProductModule =
    localStorage.getItem(
        "seiMartProductModule"
    );


showProductModule(
    savedProductModule ||
    "all-products"
);

/* =====================================================
   ADD PRODUCT BUTTON
===================================================== */

const addProductButton =
    document.getElementById(
        "addProductButton"
    );


if (addProductButton) {

    addProductButton.addEventListener(
        "click",
        function () {

            showProductModule(
                "add-product"
            );

        }
    );

}
/* =====================================================
   SAVE PRODUCT
===================================================== */

const saveProductButton =
    document.getElementById(
        "saveProductButton"
    );


if (saveProductButton) {

    saveProductButton.addEventListener(
        "click",
        function () {

            const name =
                document.getElementById(
                    "addProductName"
                ).value.trim();


            const category =
                document.getElementById(
                    "addProductCategory"
                ).value;


            const price =
                Number(
                    document.getElementById(
                        "addProductPrice"
                    ).value
                );


            const stock =
                Number(
                    document.getElementById(
                        "addProductStock"
                    ).value
                );


            const status =
                document.getElementById(
                    "addProductStatus"
                ).value;


            const description =
                document.getElementById(
                    "addProductDescription"
                ).value.trim();


            /* =====================================
               VALIDATION
            ===================================== */

            if (!name) {

                alert(
                    "Please enter product name."
                );

                return;

            }


            if (!category) {

                alert(
                    "Please select a category."
                );

                return;

            }


            if (price < 0 || isNaN(price)) {

                alert(
                    "Please enter a valid price."
                );

                return;

            }


            if (stock < 0 || isNaN(stock)) {

                alert(
                    "Please enter a valid stock quantity."
                );

                return;

            }


            /* =====================================
               GET EXISTING PRODUCTS
            ===================================== */

            let products =
                JSON.parse(
                    localStorage.getItem(
                        "seiMartProducts"
                    ) || "[]"
                );


            /* =====================================
               RESOLVE IMAGE
            ===================================== */

            const pathInput = document.getElementById("addProductImagePath");
            const pathVal = pathInput ? pathInput.value.trim() : "";
            if (pathVal) {
                window.__pendingAddImage = pathVal;
            }

            /* =====================================
               CREATE PRODUCT
            ===================================== */

            const product = {

                id:
                    "SM-" +
                    Date.now(),

                name:
                    name,

                category:
                    category,

                price:
                    price,

                stock:
                    stock,

                status:
                    status,
                sellerShop: "Sei Mart",
                sellerName: "Sei Mart",

                description:
                    description,

                image:
                    window.__pendingAddImage || "",

                discountType:
                    "percentage",

                discount:
                    0,

                createdAt:
                    new Date().toISOString()

            };


            /* =====================================
               ADD PRODUCT
            ===================================== */

            products.push(
                product
            );


            /* =====================================
               SAVE
            ===================================== */

            localStorage.setItem(
                "seiMartProducts",
                JSON.stringify(
                    products
                )
            );


            /* =====================================
               SUCCESS
            ===================================== */

            alert(
                "Product added successfully."
            );


            /* =====================================
               CLEAR FORM
            ===================================== */

            document.getElementById(
                "addProductName"
            ).value = "";


            document.getElementById(
                "addProductCategory"
            ).value = "";


            document.getElementById(
                "addProductPrice"
            ).value = "";


            document.getElementById(
                "addProductStock"
            ).value = "";


            document.getElementById(
                "addProductStatus"
            ).value = "active";


            document.getElementById(
                "addProductDescription"
            ).value = "";

            const addPath = document.getElementById("addProductImagePath");
            if (addPath) addPath.value = "";
            const addPrev = document.getElementById("addProductImagePreview");
            if (addPrev) { addPrev.src = ""; addPrev.style.display = "none"; }
            const addFile = document.getElementById("addProductImage");
            if (addFile) addFile.value = "";
            window.__pendingAddImage = "";

            loadProductTable();

            /* =====================================
               GO TO ALL PRODUCTS
            ===================================== */

            showProductModule(
                "all-products"
            );

        }
    );

}
/* =====================================================
   STEP 7
   LOAD PRODUCTS INTO ALL PRODUCTS TABLE
===================================================== */


/* =====================================================
   GET PRODUCTS
===================================================== */

function getSeiMartProducts() {
    // Prefer central getProducts if available (seeds defaults)
    if (typeof getProducts === "function") {
        return getProducts();
    }
    try {
        const data = JSON.parse(localStorage.getItem("seiMartProducts") || "[]");
        if (Array.isArray(data) && data.length) return data;
    } catch (error) {
        console.error("Unable to load products.", error);
    }
    return [];
}


/* =====================================================
   ESCAPE HTML
===================================================== */

function escapeProductHTML(value) {

    return String(value ?? "")
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");

}


/* =====================================================
   FORMAT PRICE
===================================================== */

function formatProductPrice(price) {

    const amount =
        Number(price) || 0;


    return "৳ " +
        amount.toLocaleString(
            "en-BD"
        );

}


/* =====================================================
   LOAD PRODUCT TABLE
===================================================== */

function loadProductTable() {

    const tableBody =
        document.getElementById(
            "productsTableBody"
        );


    if (!tableBody) {
        return;
    }


    const products =
        getSeiMartProducts();


    /* =========================================
       NO PRODUCTS
    ========================================= */

    if (
        !Array.isArray(products) ||
        products.length === 0
    ) {

        tableBody.innerHTML = `

            <tr>

                <td
                    colspan="7"
                    class="products-empty"
                >
                    No products available.
                </td>

            </tr>

        `;

        updateProductSummary(
            []
        );

        return;

    }


    /* =========================================
       PRODUCT ROWS
    ========================================= */

    tableBody.innerHTML =
        products.map(
            function (product) {

                const status =
                    product.status ||
                    "active";


                const stock =
                    Number(
                        product.stock
                    ) || 0;


                const statusClass =
                    status === "active"
                        ? "product-status-active"
                        : "product-status-inactive";


                let imgSrc = product.image || "";
                if (imgSrc && imgSrc.startsWith("image/")) {
                    imgSrc = "../../" + imgSrc;
                }
                if (!imgSrc) {
                    imgSrc = "https://placehold.co/80x80?text=No+Image";
                }

                return `

                    <tr>

                        <td>
                            <div style="display:flex;align-items:center;gap:10px;">
                                <img src="${escapeProductHTML(imgSrc)}" alt="" style="width:44px;height:44px;object-fit:cover;border-radius:6px;border:1px solid #e3e9e4;background:#f5f7f5;" onerror="this.src='https://placehold.co/80x80?text=No+Image'">
                                <strong>
                                    ${escapeProductHTML(
                                        product.name
                                    )}
                                </strong>
                            </div>
                        </td>


                        <td>

                            ${escapeProductHTML(
                                product.category ||
                                "Uncategorized"
                            )}

                        </td>


                        <td>

                            ${formatProductPrice(
                                product.price
                            )}

                        </td>


                        <td>

                            ${stock}

                        </td>


                        <td>
                            <strong style="color:#2f644d;font-size:13px;">
                                ${escapeProductHTML(product.sellerShop || product.sellerName || (product.sellerId ? "Seller" : "Sei Mart"))}
                            </strong>
                            <div style="font-size:11px;color:#7b877f;">
                                ${product.sellerId ? "Marketplace seller" : "Platform shop"}
                            </div>
                        </td>

                        <td>

                            <span
                                class="${statusClass}"
                            >

                                ${escapeProductHTML(
                                    status
                                )}

                            </span>

                        </td>


                        <td>

                            <div
                                class="product-table-actions"
                            >

                                <button
                                    type="button"
                                    class="product-view-button"
                                    data-product-id="${escapeProductHTML(
                                        product.id
                                    )}"
                                >
                                    View
                                </button>


                                <button
                                    type="button"
                                    class="product-edit-button"
                                    data-product-id="${escapeProductHTML(
                                        product.id
                                    )}"
                                >
                                    Edit
                                </button>


                                <button
                                    type="button"
                                    class="product-delete-button"
                                    data-product-id="${escapeProductHTML(
                                        product.id
                                    )}"
                                >
                                    Delete
                                </button>

                            </div>

                        </td>

                    </tr>

                `;

            }
        ).join("");


    updateProductSummary(
        products
    );


    attachProductTableActions();

}


/* =====================================================
   UPDATE SUMMARY
===================================================== */

function updateProductSummary(
    products
) {

    const totalProducts =
        document.getElementById(
            "totalProducts"
        );


    const activeProducts =
        document.getElementById(
            "activeProducts"
        );


    const totalStock =
        document.getElementById(
            "totalStock"
        );


    const lowStockProducts =
        document.getElementById(
            "lowStockProducts"
        );


    const safeProducts =
        Array.isArray(products)
            ? products
            : [];


    const total =
        safeProducts.length;


    const active =
        safeProducts.filter(
            function (product) {
                // Active = listed for sale (missing status counts as active)
                var st = String(product.status || "active").toLowerCase();
                return st === "active" || st === "";
            }
        ).length;


    const stock =
        safeProducts.reduce(
            function (totalStockValue, product) {

                return (
                    totalStockValue +
                    (
                        Number(
                            product.stock
                        ) || 0
                    )
                );

            },
            0
        );


    const lowStock =
        safeProducts.filter(
            function (product) {

                return (
                    (
                        Number(
                            product.stock
                        ) || 0
                    ) <= 5
                );

            }
        ).length;


    if (totalProducts) {

        totalProducts.textContent =
            total;

    }


    if (activeProducts) {

        activeProducts.textContent =
            active;

    }


    if (totalStock) {

        totalStock.textContent =
            stock;

    }


    if (lowStockProducts) {

        lowStockProducts.textContent =
            lowStock;

    }

}


/* =====================================================
   TABLE ACTIONS
===================================================== */

function attachProductTableActions() {


    /* =========================================
       VIEW
    ========================================= */

    const viewButtons =
        document.querySelectorAll(
            ".product-view-button"
        );


    viewButtons.forEach(
        function (button) {

            button.addEventListener(
                "click",
                function () {

                    const productId =
                        button.getAttribute(
                            "data-product-id"
                        );


                    viewProduct(
                        productId
                    );

                }
            );

        }
    );


    /* =========================================
       EDIT
    ========================================= */

    const editButtons =
        document.querySelectorAll(
            ".product-edit-button"
        );


    editButtons.forEach(
        function (button) {

            button.addEventListener(
                "click",
                function () {

                    const productId =
                        button.getAttribute(
                            "data-product-id"
                        );


                    editProductFromTable(
                        productId
                    );

                }
            );

        }
    );


    /* =========================================
       DELETE
    ========================================= */

    const deleteButtons =
        document.querySelectorAll(
            ".product-delete-button"
        );


    deleteButtons.forEach(
        function (button) {

            button.addEventListener(
                "click",
                function () {

                    const productId =
                        button.getAttribute(
                            "data-product-id"
                        );


                    deleteProductFromTable(
                        productId
                    );

                }
            );

        }
    );

}


/* =====================================================
   VIEW PRODUCT
===================================================== */

function viewProduct(
    productId
) {

    const products =
        getSeiMartProducts();


    const product =
        products.find(
            function (item) {

                return (
                    String(item.id) ===
                    String(productId)
                );

            }
        );


    if (!product) {

        alert(
            "Product not found."
        );

        return;

    }


    alert(

        "Product Details\n\n" +

        "Name: " +
        (product.name || "") +

        "\nCategory: " +
        (product.category || "") +

        "\nPrice: " +
        formatProductPrice(
            product.price
        ) +

        "\nStock: " +
        (
            Number(
                product.stock
            ) || 0
        ) +

        "\nStatus: " +
        (
            product.status || ""
        )

    );

}


/* =====================================================
   EDIT FROM TABLE
===================================================== */

function editProductFromTable(
    productId
) {

    const products =
        getSeiMartProducts();


    const product =
        products.find(
            function (item) {

                return (
                    String(item.id) ===
                    String(productId)
                );

            }
        );


    if (!product) {

        alert(
            "Product not found."
        );

        return;

    }


    showProductModule(
        "edit-product"
    );


    setTimeout(
        function () {
            // ensure dropdown is populated first
            if (typeof window.__populateEditSelect === "function") {
                window.__populateEditSelect("");
            }

            const editSelect =
                document.getElementById(
                    "editProductSelect"
                );


            if (editSelect) {

                editSelect.value =
                    product.id;

                editSelect.dispatchEvent(
                    new Event(
                        "change"
                    )
                );

            }

        },
        80
    );

}


/* =====================================================
   DELETE FROM TABLE
===================================================== */

function deleteProductFromTable(
    productId
) {

    const products =
        getSeiMartProducts();


    const product =
        products.find(
            function (item) {

                return (
                    String(item.id) ===
                    String(productId)
                );

            }
        );


    if (!product) {

        alert(
            "Product not found."
        );

        return;

    }


    const confirmDelete =
        confirm(

            "Are you sure you want to delete\n\n" +

            product.name +

            "\n\nThis action cannot be undone."

        );


    if (!confirmDelete) {

        return;

    }


    const updatedProducts =
        products.filter(
            function (item) {

                return (
                    String(item.id) !==
                    String(productId)
                );

            }
        );


    localStorage.setItem(
        "seiMartProducts",
        JSON.stringify(
            updatedProducts
        )
    );


    loadProductTable();


    alert(
        "Product deleted successfully."
    );

}


/* =====================================================
   SEARCH PRODUCTS
===================================================== */

const productSearchInput =
    document.getElementById(
        "productSearch"
    );


if (productSearchInput) {

    productSearchInput.addEventListener(
        "input",
        function () {

            filterProductTable();

        }
    );

}


/* =====================================================
   CATEGORY FILTER
===================================================== */

const productCategoryFilter =
    document.getElementById(
        "productCategoryFilter"
    );


if (productCategoryFilter) {

    productCategoryFilter.addEventListener(
        "change",
        function () {

            filterProductTable();

        }
    );

}


/* =====================================================
   STATUS FILTER
===================================================== */

const productStatusFilter =
    document.getElementById(
        "productStatusFilter"
    );


if (productStatusFilter) {

    productStatusFilter.addEventListener(
        "change",
        function () {

            filterProductTable();

        }
    );

}


/* =====================================================
   FILTER TABLE
===================================================== */

function filterProductTable() {

    const tableBody =
        document.getElementById(
            "productsTableBody"
        );


    if (!tableBody) {
        return;
    }


    const products =
        getSeiMartProducts();


    const search =
        productSearchInput
            ? productSearchInput.value
                .trim()
                .toLowerCase()
            : "";


    const category =
        productCategoryFilter
            ? productCategoryFilter.value
            : "all";


    const status =
        productStatusFilter
            ? productStatusFilter.value
            : "all";


    const filteredProducts =
        products.filter(
            function (product) {

                const productName =
                    String(
                        product.name || ""
                    ).toLowerCase();


                const productCategory =
                    String(
                        product.category || ""
                    );


                const productStatus =
                    String(
                        product.status || ""
                    );


                const matchesSearch =
                    !search ||
                    productName.includes(
                        search
                    );


                const matchesCategory =
                    category === "all" ||
                    productCategory ===
                    category;


                const matchesStatus =
                    status === "all" ||
                    productStatus ===
                    status;


                return (
                    matchesSearch &&
                    matchesCategory &&
                    matchesStatus
                );

            }
        );


    renderFilteredProducts(
        filteredProducts
    );

}


/* =====================================================
   RENDER FILTERED PRODUCTS
===================================================== */

function renderFilteredProducts(
    products
) {

    const tableBody =
        document.getElementById(
            "productsTableBody"
        );


    if (!tableBody) {
        return;
    }


    if (
        !Array.isArray(products) ||
        products.length === 0
    ) {

        tableBody.innerHTML = `

            <tr>

                <td
                    colspan="6"
                    class="products-empty"
                >
                    No matching products found.
                </td>

            </tr>

        `;

        return;

    }


    tableBody.innerHTML =
        products.map(
            function (product) {

                const stock =
                    Number(
                        product.stock
                    ) || 0;


                const status =
                    product.status ||
                    "active";


                const statusClass =
                    status === "active"
                        ? "product-status-active"
                        : "product-status-inactive";


                return `

                    <tr>

                        <td>

                            <strong>
                                ${escapeProductHTML(
                                    product.name
                                )}
                            </strong>

                        </td>


                        <td>

                            ${escapeProductHTML(
                                product.category ||
                                "Uncategorized"
                            )}

                        </td>


                        <td>

                            ${formatProductPrice(
                                product.price
                            )}

                        </td>


                        <td>

                            ${stock}

                        </td>


                        <td>

                            <span
                                class="${statusClass}"
                            >
                                ${escapeProductHTML(
                                    status
                                )}
                            </span>

                        </td>


                        <td>

                            <div
                                class="product-table-actions"
                            >

                                <button
                                    type="button"
                                    class="product-view-button"
                                    data-product-id="${escapeProductHTML(
                                        product.id
                                    )}"
                                >
                                    View
                                </button>


                                <button
                                    type="button"
                                    class="product-edit-button"
                                    data-product-id="${escapeProductHTML(
                                        product.id
                                    )}"
                                >
                                    Edit
                                </button>


                                <button
                                    type="button"
                                    class="product-delete-button"
                                    data-product-id="${escapeProductHTML(
                                        product.id
                                    )}"
                                >
                                    Delete
                                </button>

                            </div>

                        </td>

                    </tr>

                `;

            }
        ).join("");


    attachProductTableActions();

}


/* =====================================================
   LOAD CATEGORIES
===================================================== */

function loadProductCategories() {

    const products =
        getSeiMartProducts();


    const categories =
        [
            ...new Set(
                products
                    .map(
                        function (product) {

                            return product.category;

                        }
                    )
                    .filter(Boolean)
            )
        ];


    if (productCategoryFilter) {

        productCategoryFilter.innerHTML = `

            <option value="all">
                All Categories
            </option>

        `;


        categories.forEach(
            function (category) {

                const option =
                    document.createElement(
                        "option"
                    );


                option.value =
                    category;


                option.textContent =
                    category;


                productCategoryFilter.appendChild(
                    option
                );

            }
        );

    }

}


/* =====================================================
   INITIAL LOAD
===================================================== */

loadProductCategories();

loadProductTable();


/* =====================================================
   IMAGE HELPERS (File → DataURL or folder path)
===================================================== */

window.__pendingAddImage = "";
window.__pendingEditImage = "";

function readImageFile(file, callback) {
    if (!file) {
        callback("");
        return;
    }
    if (file.size > 2 * 1024 * 1024) {
        alert("Image is too large. Please use an image under 2MB, or put it in image/products/ folder and enter the path.");
        callback("");
        return;
    }
    const reader = new FileReader();
    reader.onload = function (e) {
        callback(e.target.result || "");
    };
    reader.onerror = function () {
        alert("Could not read image file.");
        callback("");
    };
    reader.readAsDataURL(file);
}

function setImagePreview(imgId, src) {
    const img = document.getElementById(imgId);
    if (!img) return;
    if (src) {
        img.src = src;
        img.style.display = "block";
    } else {
        img.src = "";
        img.style.display = "none";
    }
}

function resolveImagePath(path) {
    if (!path) return "";
    path = String(path).trim();
    // Allow relative folder paths
    if (path.startsWith("image/") || path.startsWith("./image/") || path.startsWith("../")) {
        return path;
    }
    // Bare filename → assume image/products/
    if (!path.includes("/") && !path.startsWith("data:") && !path.startsWith("http")) {
        return "image/products/" + path;
    }
    return path;
}

/* Add product image file change */
(function () {
    const fileInput = document.getElementById("addProductImage");
    if (fileInput) {
        fileInput.addEventListener("change", function () {
            const file = this.files && this.files[0];
            readImageFile(file, function (dataUrl) {
                window.__pendingAddImage = dataUrl;
                setImagePreview("addProductImagePreview", dataUrl);
                const pathInput = document.getElementById("addProductImagePath");
                if (pathInput) pathInput.value = "";
            });
        });
    }
    const pathInput = document.getElementById("addProductImagePath");
    if (pathInput) {
        pathInput.addEventListener("input", function () {
            const val = resolveImagePath(this.value);
            window.__pendingAddImage = val;
            let previewSrc = val;
            if (val && val.startsWith("image/")) previewSrc = "../../" + val;
            setImagePreview("addProductImagePreview", previewSrc);
        });
    }
})();

/* Edit product image file change */
(function () {
    const fileInput = document.getElementById("editProductImage");
    if (fileInput) {
        fileInput.addEventListener("change", function () {
            const file = this.files && this.files[0];
            readImageFile(file, function (dataUrl) {
                window.__pendingEditImage = dataUrl;
                setImagePreview("editProductImagePreview", dataUrl);
            });
        });
    }
    const pathInput = document.getElementById("editProductImagePath");
    if (pathInput) {
        pathInput.addEventListener("input", function () {
            const val = resolveImagePath(this.value);
            window.__pendingEditImage = val;
            let previewSrc = val;
            if (val.startsWith("image/")) previewSrc = "../../" + val;
            setImagePreview("editProductImagePreview", previewSrc);
        });
    }
})();

/* =====================================================
   EDIT PRODUCT - SELECT CHANGE (load form)
===================================================== */

(function () {
    const editSelect = document.getElementById("editProductSelect");
    if (!editSelect) return;

    function fillEditForm(product) {
        if (!product) return;

        const form = document.getElementById("editProductForm");
        if (form) form.style.display = "block";

        const setVal = function (id, val) {
            const el = document.getElementById(id);
            if (el) el.value = val != null ? val : "";
        };

        // Category options first
        const catSelect = document.getElementById("editProductCategory");
        if (catSelect) {
            const cats = ["electronics","mobile","fashion","shoes","cosmetics","perfume","watches","home","jewellery","beauty"];
            if (catSelect.options.length <= 1) {
                catSelect.innerHTML = '<option value="">Select category</option>';
                cats.forEach(function (c) {
                    const opt = document.createElement("option");
                    opt.value = c;
                    opt.textContent = c.charAt(0).toUpperCase() + c.slice(1);
                    catSelect.appendChild(opt);
                });
            }
        }

        setVal("editProductName", product.name);
        setVal("editProductCategory", product.category);
        setVal("editProductPrice", product.price);
        setVal("editProductStock", product.stock);
        setVal("editProductStatus", product.status || "active");
        setVal("editProductDescription", product.description || "");

        window.__pendingEditImage = product.image || "";
        const pathEl = document.getElementById("editProductImagePath");
        if (pathEl) {
            pathEl.value = (product.image && !String(product.image).startsWith("data:")) ? product.image : "";
        }
        let previewSrc = product.image || "";
        if (previewSrc && previewSrc.startsWith("image/")) previewSrc = "../../" + previewSrc;
        setImagePreview("editProductImagePreview", previewSrc);

        // Scroll form into view
        if (form) form.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }

    function populateEditSelect(filterText) {
        const products = getSeiMartProducts();
        const current = editSelect.value;
        const q = (filterText || "").toLowerCase().trim();

        let list = products;
        if (q) {
            list = products.filter(function (p) {
                return (
                    String(p.name || "").toLowerCase().includes(q) ||
                    String(p.category || "").toLowerCase().includes(q) ||
                    String(p.id || "").toLowerCase().includes(q)
                );
            });
        }

        editSelect.innerHTML = '<option value="">' +
            (list.length ? "Select a product (" + list.length + " found)" : "No products found") +
            '</option>';

        list.forEach(function (p) {
            const opt = document.createElement("option");
            opt.value = p.id;
            opt.textContent = p.name + " (" + p.id + ")";
            editSelect.appendChild(opt);
        });

        // restore selection if still in list
        if (current && list.some(function (p) { return String(p.id) === String(current); })) {
            editSelect.value = current;
        }
    }

    // Override populate used on module show
    window.__populateEditSelect = populateEditSelect;

    const originalShow = window.showProductModule;
    if (typeof originalShow === "function") {
        window.showProductModule = function (key) {
            originalShow(key);
            if (key === "edit-product") {
                setTimeout(function () {
                    populateEditSelect("");
                    const search = document.getElementById("editProductSearch");
                    if (search) search.value = "";
                    const form = document.getElementById("editProductForm");
                    if (form) form.style.display = "none";
                }, 30);
            }
            if (key === "all-products") {
                setTimeout(function () {
                    if (typeof loadProductTable === "function") loadProductTable();
                }, 30);
            }
        };
    }

    // Search filter
    const searchInput = document.getElementById("editProductSearch");
    if (searchInput) {
        searchInput.addEventListener("input", function () {
            populateEditSelect(this.value);
        });
        searchInput.addEventListener("keydown", function (e) {
            if (e.key === "Enter") {
                e.preventDefault();
                // auto-select if only one result
                if (editSelect.options.length === 2) {
                    editSelect.selectedIndex = 1;
                    editSelect.dispatchEvent(new Event("change"));
                }
            }
        });
    }

    editSelect.addEventListener("change", function () {
        const productId = this.value;
        const form = document.getElementById("editProductForm");

        if (!productId) {
            if (form) form.style.display = "none";
            return;
        }

        const products = getSeiMartProducts();
        const product = products.find(function (item) {
            return String(item.id) === String(productId);
        });

        if (!product) {
            if (form) form.style.display = "none";
            return;
        }

        fillEditForm(product);
    });
})();

/* =====================================================
   UPDATE PRODUCT BUTTON
===================================================== */

(function () {
    const btn = document.getElementById("updateProductButton");
    if (!btn) return;

    btn.addEventListener("click", function () {
        const select = document.getElementById("editProductSelect");
        const productId = select ? select.value : "";
        if (!productId) {
            alert("Please select a product to edit.");
            return;
        }

        const name = (document.getElementById("editProductName") || {}).value;
        const category = (document.getElementById("editProductCategory") || {}).value;
        const price = Number((document.getElementById("editProductPrice") || {}).value);
        const stock = Number((document.getElementById("editProductStock") || {}).value);
        const status = (document.getElementById("editProductStatus") || {}).value || "active";
        const description = ((document.getElementById("editProductDescription") || {}).value || "").trim();

        if (!name || !String(name).trim()) {
            alert("Please enter product name.");
            return;
        }
        if (!category) {
            alert("Please select a category.");
            return;
        }
        if (isNaN(price) || price < 0) {
            alert("Please enter a valid price.");
            return;
        }
        if (isNaN(stock) || stock < 0) {
            alert("Please enter a valid stock quantity.");
            return;
        }

        // Resolve image
        const pathInput = document.getElementById("editProductImagePath");
        const pathVal = pathInput ? pathInput.value.trim() : "";
        let image = window.__pendingEditImage || "";
        if (pathVal) {
            image = resolveImagePath(pathVal);
        }

        let products = getSeiMartProducts();
        const idx = products.findIndex(function (item) {
            return String(item.id) === String(productId);
        });
        if (idx < 0) {
            alert("Product not found.");
            return;
        }

        products[idx] = Object.assign({}, products[idx], {
            name: String(name).trim(),
            category: category,
            price: price,
            stock: stock,
            status: status,
            description: description,
            image: image,
            updatedAt: new Date().toISOString()
        });

        if (typeof saveProducts === "function") {
            saveProducts(products);
        } else {
            localStorage.setItem("seiMartProducts", JSON.stringify(products));
        }

        alert("Product updated successfully.");
        window.__pendingEditImage = "";
        loadProductTable();
        showProductModule("all-products");
    });
})();

/* =====================================================
   PRODUCT IMAGES MODULE
===================================================== */

(function () {
    const select = document.getElementById("imageProductSelect");
    if (!select) return;

    function populateImageSelect() {
        const products = getSeiMartProducts();
        const current = select.value;
        select.innerHTML = '<option value="">Select a product</option>';
        products.forEach(function (p) {
            const opt = document.createElement("option");
            opt.value = p.id;
            opt.textContent = p.name;
            select.appendChild(opt);
        });
        if (current) select.value = current;
    }

    const originalShow2 = window.showProductModule;
    if (typeof originalShow2 === "function") {
        const prev = window.showProductModule;
        window.showProductModule = function (key) {
            prev(key);
            if (key === "product-images") {
                setTimeout(populateImageSelect, 30);
            }
        };
    } else {
        populateImageSelect();
    }

    select.addEventListener("change", function () {
        const productId = this.value;
        const products = getSeiMartProducts();
        const product = products.find(function (p) { return String(p.id) === String(productId); });
        const preview = document.querySelector(".product-image-preview img, #imagePreviewImg");
        let previewBox = document.querySelector(".product-image-preview");
        if (product && previewBox) {
            let src = product.image || "";
            if (src.startsWith("image/")) src = "../../" + src;
            previewBox.innerHTML = src
                ? '<img src="' + src.replace(/"/g, "&quot;") + '" alt="" style="max-width:200px;max-height:200px;border-radius:8px;">'
                : '<div style="color:#7b877f;padding:20px;">No image</div>';
        }
    });

    const imgFile = document.getElementById("productImageUpload") || document.querySelector("#product-images-module input[type=file]");
    if (imgFile) {
        imgFile.addEventListener("change", function () {
            const productId = select.value;
            if (!productId) {
                alert("Select a product first.");
                this.value = "";
                return;
            }
            const file = this.files && this.files[0];
            readImageFile(file, function (dataUrl) {
                if (!dataUrl) return;
                let products = getSeiMartProducts();
                const idx = products.findIndex(function (p) { return String(p.id) === String(productId); });
                if (idx < 0) return;
                products[idx].image = dataUrl;
                if (typeof saveProducts === "function") saveProducts(products);
                else localStorage.setItem("seiMartProducts", JSON.stringify(products));
                select.dispatchEvent(new Event("change"));
                alert("Image saved for product.");
            });
        });
    }
})();

/* =====================================================
   FIX TABLE IMAGE DISPLAY
===================================================== */

(function () {
    // Patch loadProductTable image rendering if needed - ensure relative paths work from admin/products/
    const _origLoad = window.loadProductTable;
    // loadProductTable is function declaration, already hoisted - we enhance via CSS/HTML in table builder
})();



/* =====================================================
   COUPON MODULE
===================================================== */
(function(){
  var host=document.getElementById("product-coupons-module"); if(!host)return;
  function coupons(){try{var x=JSON.parse(localStorage.getItem("seiMartCoupons")||"[]");return Array.isArray(x)?x:[];}catch(e){return[];}}
  function save(x){localStorage.setItem("seiMartCoupons",JSON.stringify(x));}
  function render(){var list=coupons();host.querySelector("#couponList").innerHTML=list.length?list.map(function(c,i){return '<tr><td><b>'+String(c.code||"")+'</b></td><td>'+String(c.type||"percent")+'</td><td>'+String(c.value||0)+(c.type==="percent"?"%":"")+'</td><td>৳'+Number(c.minOrder||0).toLocaleString("en-BD")+'</td><td>'+ (c.active===false?"Disabled":"Active")+'</td><td><button type="button" class="product-primary-button" data-coupon-index="'+i+'">Toggle</button> <button type="button" class="product-primary-button" data-coupon-delete="'+i+'">Delete</button></td></tr>';}).join(""): '<tr><td colspan="6" style="text-align:center;color:#888;">No coupons yet.</td></tr>'; }
  host.querySelector("#saveCouponBtn").addEventListener("click",function(){var code=host.querySelector("#couponCode").value.trim().toUpperCase();var type=host.querySelector("#couponType").value;var value=Number(host.querySelector("#couponValue").value)||0;var min=Number(host.querySelector("#couponMin").value)||0;if(!code||value<=0){alert("Enter a valid coupon code and value.");return;}var list=coupons();if(list.some(function(c){return String(c.code).toUpperCase()===code;})){alert("Coupon code already exists.");return;}list.push({code:code,type:type,value:value,minOrder:min,active:true,usedCount:0,usedBy:[],createdAt:new Date().toISOString()});save(list);host.querySelector("#couponCode").value="";host.querySelector("#couponValue").value="";host.querySelector("#couponMin").value="";render();alert("Coupon created successfully.");});
  host.addEventListener("click",function(e){var ti=e.target.getAttribute("data-coupon-index");if(ti!==null){var list=coupons();list[Number(ti)].active=list[Number(ti)].active===false;save(list);render();}var di=e.target.getAttribute("data-coupon-delete");if(di!==null&&confirm("Delete this coupon?")){var list=coupons();list.splice(Number(di),1);save(list);render();}});
  render();
})();

/* Dynamic category catalog from Admin → Categories */
(function(){
  function esc(v){return String(v==null?'':v).replace(/[&<>"']/g,function(c){return ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'})[c]})}
  function getCats(){
    try{var x=JSON.parse(localStorage.getItem('seiMartCategories')||'[]');if(Array.isArray(x)&&x.length)return x.filter(function(c){return c.active!==false}).sort(function(a,b){return Number(a.sort||0)-Number(b.sort||0)});}catch(e){}
    return [];
  }
  function fill(){
    var cats=getCats();
    ['addProductCategory','editProductCategory','productCategoryFilter'].forEach(function(id){
      var el=document.getElementById(id);if(!el)return;
      var current=el.value;
      var first=id==='productCategoryFilter'?'<option value="">All Categories</option>':'<option value="">Select Category</option>';
      el.innerHTML=first+cats.map(function(c){return '<option value="'+esc(c.slug||c.id)+'">'+esc(c.name)+'</option>'}).join('');
      if(current)el.value=current;
    });
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',fill);else fill();
  window.addEventListener('storage',fill);
})();
