/* =====================================================
   SEI MART ADMIN ACCOUNT
===================================================== */


/* =====================================================
   PROFILE ELEMENTS
===================================================== */

const fullNameInput =
    document.getElementById("adminFullName");

const emailInput =
    document.getElementById("adminAccountEmail");

const phoneInput =
    document.getElementById("adminPhone");

const saveProfileButton =
    document.getElementById("saveAdminProfile");


/* =====================================================
   LOAD SAVED PROFILE
===================================================== */

const savedProfile =
    localStorage.getItem(
        "seiMartAdminAccount"
    );


if (savedProfile) {

    try {

        const profile =
            JSON.parse(savedProfile);


        if (
            fullNameInput &&
            profile.fullName
        ) {

            fullNameInput.value =
                profile.fullName;

        }


        if (
            emailInput &&
            profile.email
        ) {

            emailInput.value =
                profile.email;

        }


        if (
            phoneInput &&
            profile.phone
        ) {

            phoneInput.value =
                profile.phone;

        }

    } catch (error) {

        console.log(
            "Unable to load admin profile."
        );

    }

}


/* =====================================================
   SAVE PROFILE
===================================================== */

if (saveProfileButton) {

    saveProfileButton.addEventListener(
        "click",
        function () {

            const profile = {

                fullName:
                    fullNameInput
                        ? fullNameInput.value.trim()
                        : "",

                email:
                    emailInput
                        ? emailInput.value.trim()
                        : "",

                phone:
                    phoneInput
                        ? phoneInput.value.trim()
                        : ""

            };


            localStorage.setItem(
                "seiMartAdminAccount",
                JSON.stringify(profile)
            );


            alert(
                "Account information saved successfully."
            );

        }
    );

}


/* =====================================================
   CHANGE PASSWORD
===================================================== */

const changePasswordButton =
    document.getElementById(
        "changeAdminPassword"
    );


if (changePasswordButton) {

    changePasswordButton.addEventListener(
        "click",
        function () {

            const currentPassword =
                prompt(
                    "Enter your current password:"
                );


            if (
                currentPassword === null
            ) {

                return;

            }


            const savedPassword =
                localStorage.getItem(
                    "seiMartAdminPassword"
                );

            let currentOk;

            if (!savedPassword) {
                currentOk =
                    currentPassword === "123456";
            } else if (SeiSecurity.isHashed(savedPassword)) {
                currentOk =
                    SeiSecurity.verifyHash(
                        currentPassword,
                        savedPassword
                    );
            } else {
                currentOk =
                    currentPassword === savedPassword;
            }


            if (!currentOk) {

                alert(
                    "Current password is incorrect."
                );

                return;

            }


            const newPassword =
                prompt(
                    "Enter your new password:"
                );


            if (
                newPassword === null
            ) {

                return;

            }


            if (
                newPassword.length < 6
            ) {

                alert(
                    "New password must be at least 6 characters."
                );

                return;

            }


            const confirmPassword =
                prompt(
                    "Confirm your new password:"
                );


            if (
                confirmPassword === null
            ) {

                return;

            }


            if (
                newPassword !==
                confirmPassword
            ) {

                alert(
                    "Passwords do not match."
                );

                return;

            }


            localStorage.setItem(
                "seiMartAdminPassword",
                SeiSecurity.hashPassword(newPassword)
            );


            alert(
                "Password changed successfully."
            );

        }
    );

}


/* =====================================================
   LAST LOGIN
===================================================== */

const lastLoginElement =
    document.getElementById(
        "adminLastLogin"
    );


const savedLastLogin =
    localStorage.getItem(
        "seiMartAdminLastLogin"
    );


if (
    lastLoginElement &&
    savedLastLogin
) {

    lastLoginElement.textContent =
        savedLastLogin;

}


/* =====================================================
   LOGOUT
===================================================== */

const logoutButton =
    document.getElementById(
        "adminLogoutButton"
    );


if (logoutButton) {

    logoutButton.addEventListener(
        "click",
        function () {

            const confirmLogout =
                confirm(
                    "Are you sure you want to logout?"
                );


            if (
                !confirmLogout
            ) {

                return;

            }


            sessionStorage.removeItem(
                "seiMartAdminLoggedIn"
            );


            /*
             * account.html is inside:
             * SeiMart/admin/
             *
             * login.html is also inside:
             * SeiMart/admin/
             *
             * So we stay inside the same folder.
             */

            window.location.href =
                "./login.html";

        }
    );

}