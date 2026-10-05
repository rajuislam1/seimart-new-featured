/* =====================================================
   SEI MART ADMIN AUTHENTICATION GUARD
   Load this in the <head> of every admin page
   (except admin/login.html). Works from any folder
   depth because the login URL is built from this
   script's own location.
   NOTE: this is a frontend guard only. When the backend
   is added, also verify the session on the server.
===================================================== */
(function () {

    var isLoggedIn = false;

    try {
        isLoggedIn =
            sessionStorage.getItem("seiMartAdminLoggedIn") === "true";
    } catch (e) {
        isLoggedIn = false;
    }

    if (isLoggedIn) {
        return;
    }

    var scriptSrc =
        (document.currentScript && document.currentScript.src) || "";

    var loginUrl =
        scriptSrc
            ? scriptSrc.replace(/js\/admin-auth\.js(\?.*)?$/, "login.html")
            : "admin/login.html";

    // hide page content while redirecting
    document.documentElement.style.display = "none";

    window.location.replace(loginUrl);

})();
