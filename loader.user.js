// ==UserScript==
// @name         MC
// @namespace    loader.system
// @version      1.0
// @description  Private Loader
// @match        *://*/*
// @run-at       document-start
// @grant        GM_xmlhttpRequest
// @connect      raw.githubusercontent.com
// ==/UserScript==

(async () => {

    'use strict';

    // =========================
    // FILE LINKS
    // =========================

    const CONFIG =
    'https://raw.githubusercontent.com/USERNAME/REPO/main/config.json?t=' + Date.now();

    const MAIN =
    'https://raw.githubusercontent.com/USERNAME/REPO/main/main.js?t=' + Date.now();

    try {

        // =========================
        // LOAD CONFIG
        // =========================

        const cfgRes = await fetch(CONFIG, {
            cache: 'no-store'
        });

        if (!cfgRes.ok) {

            console.log('[LOADER] CONFIG ERROR');

            return;

        }

        const cfg = await cfgRes.json();

        // =========================
        // DISABLED
        // =========================

        if (cfg.st === 'ds') {

            console.log('[LOADER] SCRIPT DISABLED');

            return;

        }

        // =========================
        // ENABLED
        // =========================

        if (cfg.st === 'el') {

            console.log('[LOADER] SCRIPT ENABLED');

            const mainRes = await fetch(MAIN, {
                cache: 'no-store'
            });

            if (!mainRes.ok) {

                console.log('[LOADER] MAIN ERROR');

                return;

            }

            const code = await mainRes.text();

            // =========================
            // EXECUTE
            // =========================

            eval(code);

            return;

        }

        // =========================
        // INVALID STATUS
        // =========================

        console.log('[LOADER] INVALID CONFIG');

    } catch (err) {

        console.error('[LOADER ERROR]', err);

    }

})();
