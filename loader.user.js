// ==UserScript==
// @name         Mega Redirect Loader
// @namespace    loader.system
// @version      1.0
// @match        *://*/*
// @run-at       document-start
// @grant        none
// ==/UserScript==

(async () => {

    'use strict';

    const CONFIG =
    'https://raw.githubusercontent.com/dnqkVN/tool-uptolink/main/config.json?t=' + Date.now();

    const MAIN =
    'https://raw.githubusercontent.com/dnqkVN/tool-uptolink/main/main.js?t=' + Date.now();

    try {

        console.log('[LOADER] START');

        const cfg = await fetch(CONFIG).then(r => r.json());

        console.log('[CONFIG]', cfg);

        if (cfg.st === 'ds') {

            console.log('[SCRIPT] DISABLED');

            return;
        }

        if (cfg.st === 'el') {

            console.log('[SCRIPT] ENABLED');

            const code = await fetch(MAIN).then(r => r.text());

            console.log('[MAIN LOADED]');

            eval(code);

        }

    } catch (e) {

        console.error('[LOADER ERROR]', e);

    }

})();
