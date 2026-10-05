// Staff role login support (hashed passwords)
function tryStaffLogin(username, password) {
    var list = [];
    try { list = JSON.parse(localStorage.getItem("seiMartStaff") || "[]"); } catch (e) {}
    var user = list.find(function (s) {
        return String(s.username).toLowerCase() === String(username).toLowerCase();
    });
    if (!user) return null;
    if (user.status === "Disabled" || user.status === "Suspended") return null;

    var check = SeiSecurity.checkRecordPassword(user, password);
    if (!check.ok) return null;
    if (check.upgraded) {
        // old plain-text staff account -> now hashed
        localStorage.setItem("seiMartStaff", JSON.stringify(list));
    }

    localStorage.setItem("seiMartCurrentStaff", JSON.stringify({
        name: user.name,
        username: user.username,
        role: user.role,
        powers: user.powers || []
    }));
    sessionStorage.setItem("seiMartAdminLoggedIn", "true");
    return user;
}

/* =====================================================
   SEI MART ADMIN LOGIN
===================================================== */


/* =====================================================
   LOGIN ELEMENTS
===================================================== */

const adminLoginForm =
    document.getElementById("adminLoginForm");


const adminEmail =
    document.getElementById("adminEmail");


const adminPassword =
    document.getElementById("adminPassword");


const toggleAdminPassword =
    document.getElementById("toggleAdminPassword");


const rememberAdmin =
    document.getElementById("rememberAdmin");


const adminLoginError =
    document.getElementById("adminLoginError");


const forgotAdminPassword =
    document.getElementById("forgotAdminPassword");


/* =====================================================
   ADMIN LOGIN DETAILS
===================================================== */

const ADMIN_EMAIL =
    "admin@seimart.com";


const DEFAULT_ADMIN_PASSWORD =
    "123456";


/*
   The admin password is stored as a salted hash in
   localStorage ("seiMartAdminPassword"). Until the admin
   changes it, the default password above is accepted and
   the admin is reminded to change it after login.
*/
function adminPasswordIsDefault() {
    return !localStorage.getItem("seiMartAdminPassword");
}

function checkAdminPassword(entered) {

    var saved =
        localStorage.getItem("seiMartAdminPassword");

    if (!saved) {
        return entered === DEFAULT_ADMIN_PASSWORD;
    }

    if (SeiSecurity.isHashed(saved)) {
        return SeiSecurity.verifyHash(entered, saved);
    }

    // old plain-text saved password -> verify, then upgrade
    if (entered === saved) {
        localStorage.setItem(
            "seiMartAdminPassword",
            SeiSecurity.hashPassword(entered)
        );
        return true;
    }

    return false;
}


/* =====================================================
   SHOW PASSWORD
===================================================== */

if (toggleAdminPassword) {

    toggleAdminPassword.addEventListener(
        "click",
        function () {

            if (
                adminPassword.type ===
                "password"
            ) {

                adminPassword.type =
                    "text";

                toggleAdminPassword.textContent =
                    "Hide";

            } else {

                adminPassword.type =
                    "password";

                toggleAdminPassword.textContent =
                    "Show";

            }

        }
    );

}


/* =====================================================
   LOGIN ERROR
===================================================== */

function showLoginError(message) {

    if (!adminLoginError) {
        return;
    }


    adminLoginError.textContent =
        message;


    adminLoginError.style.display =
        "block";

}


function hideLoginError() {

    if (!adminLoginError) {
        return;
    }


    adminLoginError.textContent =
        "";


    adminLoginError.style.display =
        "none";

}


/* =====================================================
   REMEMBER ADMIN
===================================================== */

if (adminLoginForm) {

    adminLoginForm.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();


            hideLoginError();


            const email =
                adminEmail.value.trim();


            const password =
                adminPassword.value;


            /* =========================================
               EMAIL VALIDATION
            ========================================= */

            if (!email) {

                showLoginError(
                    "Please enter your email address."
                );

                adminEmail.focus();

                return;

            }


            /* =========================================
               PASSWORD VALIDATION
            ========================================= */

            if (!password) {

                showLoginError(
                    "Please enter your password."
                );

                adminPassword.focus();

                return;

            }


            /* =========================================
               STAFF LOGIN (username or email field)
               DELIVERY ACCOUNTS MUST USE DELIVERY LOGIN
            ========================================= */

            var staffList = [];
            try {
                staffList = JSON.parse(
                    localStorage.getItem("seiMartStaff") || "[]"
                );
            } catch (e) {
                staffList = [];
            }

            var matchingStaff = staffList.find(function (s) {
                return String(s.username || "").toLowerCase() ===
                    String(email).toLowerCase();
            });

            if (matchingStaff &&
                String(matchingStaff.role || "").toLowerCase() === "delivery") {
                showLoginError(
                    "This is a Delivery account. Please use Delivery Login."
                );
                return;
            }

            var staffUser = tryStaffLogin(email, password);
            if (staffUser) {
                sessionStorage.setItem("seiMartAdminLoggedIn", "true");
                localStorage.setItem(
                    "seiMartAdminLastLogin",
                    new Date().toLocaleString("en-GB")
                );
                window.location.href = "../admin.html";
                return;
            }

            /* =========================================
               SUPER ADMIN LOGIN
            ========================================= */

            if (
                email.toLowerCase() ===
                    ADMIN_EMAIL.toLowerCase()
                &&
                checkAdminPassword(password)
            ) {

                var usingDefaultPassword =
                    adminPasswordIsDefault();

                // clear staff session for full admin
                localStorage.removeItem("seiMartCurrentStaff");



                /* =====================================
                   LOGIN SESSION
                ===================================== */

                sessionStorage.setItem(
                    "seiMartAdminLoggedIn",
                    "true"
                );


                /* =====================================
                   LAST LOGIN
                ===================================== */

                const loginDate =
                    new Date();


                const formattedLoginDate =
                    loginDate.toLocaleString(
                        "en-GB",
                        {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                            hour: "2-digit",
                            minute: "2-digit"
                        }
                    );


                localStorage.setItem(
                    "seiMartAdminLastLogin",
                    formattedLoginDate
                );


                /* =====================================
                   REMEMBER LOGIN
                ===================================== */

                if (
                    rememberAdmin &&
                    rememberAdmin.checked
                ) {

                    localStorage.setItem(
                        "seiMartRememberAdmin",
                        "true"
                    );

                } else {

                    localStorage.removeItem(
                        "seiMartRememberAdmin"
                    );

                }


                /* =====================================
                   DASHBOARD
                ===================================== */

                if (usingDefaultPassword) {
                    alert(
                        "Security reminder: you are using the default admin password. " +
                        "Please open Account and change it now."
                    );
                }

                window.location.href =
                    "../admin.html";


                return;

            }


            /* =========================================
               INVALID LOGIN
            ========================================= */

            showLoginError(
                "Invalid login. Use admin email or staff username + password."
            );

        }
    );

}


/* =====================================================
   FORGOT PASSWORD
===================================================== */

if (forgotAdminPassword) {

    forgotAdminPassword.addEventListener(
        "click",
        function (event) {

            event.preventDefault();


            showLoginError(
                "Password recovery will be added later. Please contact the Sei Mart administrator."
            );

        }
    );

}   