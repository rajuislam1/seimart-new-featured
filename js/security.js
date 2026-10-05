/* =====================================================
   SEI MART - SECURITY HELPERS (frontend only)
   -----------------------------------------------------
   * Passwords are never stored in plain text. They are
     salted and hashed (iterated SHA-256) before saving.
   * Old plain-text accounts are upgraded automatically
     the first time that user logs in.
   * NOTE: Without a server this is still only a
     "best effort" protection. When you add your backend,
     move hashing (bcrypt/argon2) and login checks to the
     server and delete the localStorage account data.
===================================================== */
(function (global) {

    /* ---------- pure JS SHA-256 (works on http/file too) ---------- */
    var K = [
        0x428a2f98, 0x71374491, 0xb5c0fbcf, 0xe9b5dba5, 0x3956c25b, 0x59f111f1, 0x923f82a4, 0xab1c5ed5,
        0xd807aa98, 0x12835b01, 0x243185be, 0x550c7dc3, 0x72be5d74, 0x80deb1fe, 0x9bdc06a7, 0xc19bf174,
        0xe49b69c1, 0xefbe4786, 0x0fc19dc6, 0x240ca1cc, 0x2de92c6f, 0x4a7484aa, 0x5cb0a9dc, 0x76f988da,
        0x983e5152, 0xa831c66d, 0xb00327c8, 0xbf597fc7, 0xc6e00bf3, 0xd5a79147, 0x06ca6351, 0x14292967,
        0x27b70a85, 0x2e1b2138, 0x4d2c6dfc, 0x53380d13, 0x650a7354, 0x766a0abb, 0x81c2c92e, 0x92722c85,
        0xa2bfe8a1, 0xa81a664b, 0xc24b8b70, 0xc76c51a3, 0xd192e819, 0xd6990624, 0xf40e3585, 0x106aa070,
        0x19a4c116, 0x1e376c08, 0x2748774c, 0x34b0bcb5, 0x391c0cb3, 0x4ed8aa4a, 0x5b9cca4f, 0x682e6ff3,
        0x748f82ee, 0x78a5636f, 0x84c87814, 0x8cc70208, 0x90befffa, 0xa4506ceb, 0xbef9a3f7, 0xc67178f2
    ];

    function utf8Bytes(str) {
        return unescape(encodeURIComponent(String(str)));
    }

    function sha256(str) {
        var msg = utf8Bytes(str);
        var l = msg.length;
        var words = [];
        var i, j;
        for (i = 0; i < l; i++) {
            words[i >> 2] |= msg.charCodeAt(i) << (24 - (i % 4) * 8);
        }
        words[l >> 2] |= 0x80 << (24 - (l % 4) * 8);
        words[(((l + 8) >> 6) + 1) * 16 - 1] = l * 8;
        for (i = 0; i < words.length; i++) { if (words[i] === undefined) words[i] = 0; }

        var H = [0x6a09e667, 0xbb67ae85, 0x3c6ef372, 0xa54ff53a, 0x510e527f, 0x9b05688c, 0x1f83d9ab, 0x5be0cd19];
        var w = new Array(64);

        for (j = 0; j < words.length; j += 16) {
            var a = H[0], b = H[1], c = H[2], d = H[3], e = H[4], f = H[5], g = H[6], h = H[7];
            for (i = 0; i < 64; i++) {
                if (i < 16) {
                    w[i] = words[j + i] | 0;
                } else {
                    var g0 = w[i - 15], g1 = w[i - 2];
                    var s0 = ((g0 >>> 7) | (g0 << 25)) ^ ((g0 >>> 18) | (g0 << 14)) ^ (g0 >>> 3);
                    var s1 = ((g1 >>> 17) | (g1 << 15)) ^ ((g1 >>> 19) | (g1 << 13)) ^ (g1 >>> 10);
                    w[i] = (w[i - 16] + s0 + w[i - 7] + s1) | 0;
                }
                var S1 = ((e >>> 6) | (e << 26)) ^ ((e >>> 11) | (e << 21)) ^ ((e >>> 25) | (e << 7));
                var ch = (e & f) ^ (~e & g);
                var t1 = (h + S1 + ch + K[i] + w[i]) | 0;
                var S0 = ((a >>> 2) | (a << 30)) ^ ((a >>> 13) | (a << 19)) ^ ((a >>> 22) | (a << 10));
                var maj = (a & b) ^ (a & c) ^ (b & c);
                var t2 = (S0 + maj) | 0;
                h = g; g = f; f = e; e = (d + t1) | 0;
                d = c; c = b; b = a; a = (t1 + t2) | 0;
            }
            H[0] = (H[0] + a) | 0; H[1] = (H[1] + b) | 0; H[2] = (H[2] + c) | 0; H[3] = (H[3] + d) | 0;
            H[4] = (H[4] + e) | 0; H[5] = (H[5] + f) | 0; H[6] = (H[6] + g) | 0; H[7] = (H[7] + h) | 0;
        }
        var out = "";
        for (i = 0; i < 8; i++) { out += ("00000000" + (H[i] >>> 0).toString(16)).slice(-8); }
        return out;
    }

    /* ---------- salted + iterated password hash ---------- */
    var ITERATIONS = 2000;
    var PREFIX = "sm1";

    function randomSalt() {
        var out = "";
        try {
            var arr = new Uint8Array(16);
            global.crypto.getRandomValues(arr);
            for (var i = 0; i < arr.length; i++) { out += ("0" + arr[i].toString(16)).slice(-2); }
            return out;
        } catch (e) {
            for (var j = 0; j < 32; j++) { out += Math.floor(Math.random() * 16).toString(16); }
            return out;
        }
    }

    function derive(password, salt) {
        var h = sha256(salt + ":" + password);
        for (var i = 0; i < ITERATIONS; i++) { h = sha256(h + salt); }
        return h;
    }

    function hashPassword(password) {
        var salt = randomSalt();
        return PREFIX + "$" + salt + "$" + derive(String(password), salt);
    }

    function isHashed(value) {
        return typeof value === "string" && value.indexOf(PREFIX + "$") === 0;
    }

    function verifyHash(password, stored) {
        if (!isHashed(stored)) return false;
        var parts = stored.split("$");
        if (parts.length !== 3) return false;
        var calc = derive(String(password), parts[1]);
        // constant-time style compare
        var diff = calc.length ^ parts[2].length;
        for (var i = 0; i < calc.length; i++) { diff |= calc.charCodeAt(i) ^ (parts[2].charCodeAt(i) || 0); }
        return diff === 0;
    }

    /*
       Check a record that may be new-style ({passwordHash})
       or old-style ({password}).
       Returns: { ok: true/false, upgraded: true/false }
       When ok and the record was old-style, the record is
       upgraded IN PLACE (plain password removed).
    */
    function checkRecordPassword(record, password) {
        if (!record) return { ok: false, upgraded: false };
        if (record.passwordHash) {
            return { ok: verifyHash(password, record.passwordHash), upgraded: false };
        }
        if (typeof record.password === "string" && record.password !== "") {
            if (record.password === String(password)) {
                record.passwordHash = hashPassword(password);
                delete record.password;
                return { ok: true, upgraded: true };
            }
        }
        return { ok: false, upgraded: false };
    }

    /* Remove anything secret before putting a user in a session */
    function publicUser(record) {
        var copy = {};
        for (var k in record) {
            if (Object.prototype.hasOwnProperty.call(record, k) && k !== "password" && k !== "passwordHash") {
                copy[k] = record[k];
            }
        }
        return copy;
    }

    /* Escape text before putting it into innerHTML */
    function escapeHTML(value) {
        return String(value == null ? "" : value)
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#39;");
    }

    global.SeiSecurity = {
        sha256: sha256,
        hashPassword: hashPassword,
        verifyHash: verifyHash,
        isHashed: isHashed,
        checkRecordPassword: checkRecordPassword,
        publicUser: publicUser,
        escapeHTML: escapeHTML
    };

})(window);
