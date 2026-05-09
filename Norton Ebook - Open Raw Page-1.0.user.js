// ==UserScript==
// @name         Norton Ebook - Open Raw Page
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Adds a button to the navigation bar that opens the main iframe content in a new tab
// @author       techiebirb
// @match        https://wwnorton.com/nerd/*
// @match        https://digital.wwnorton.com/nerd/*
// @match        *://*/nerd/*
// @grant        none
// ==/UserScript==

(function () {
    'use strict';

    const BUTTON_ID = 'open-raw-iframe-btn';

    function getIframeSrc() {
        const iframe = document.getElementById('iframe-content')
            || document.querySelector('iframe.frame-content')
            || document.querySelector('#frame_container iframe');
        return iframe ? iframe.src : null;
    }

    function createButton(src) {
        const btn = document.createElement('button');
        btn.id = BUTTON_ID;
        btn.type = 'button';
        btn.title = 'Open raw page content in a new tab';
        btn.setAttribute('data-hotspotid', 'open-raw-page-button');

        // Match Norton's existing button style
        btn.className = 'nds-button--ghost nds-button--navy nds-button print-button';

        btn.innerHTML = `
            <svg viewBox="0 0 24 24" height="1.25em" width="1.25em"
                 class="nds-icon nds-button__icon"
                 aria-hidden="true" focusable="false" role="img"
                 fill="currentColor" xmlns="http://www.w3.org/2000/svg"
                 style="min-width:1.25em;">
                <path d="M19 19H5V5h7V3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0
                         2-2v-7h-2v7zM14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3h-7z"/>
            </svg>
            <span class="nds-button__text">Open Page</span>
        `;

        btn.addEventListener('click', () => {
            const currentSrc = getIframeSrc();
            if (currentSrc) {
                window.open(currentSrc, '_blank');
            } else {
                alert('Could not find the iframe source. The page may still be loading.');
            }
        });

        return btn;
    }

    function injectButton() {
        // Don't inject twice
        if (document.getElementById(BUTTON_ID)) return;

        const src = getIframeSrc();

        // Find the container that holds the Print button
        const printContainer = document.querySelector('.navigation-print-listen-container');
        if (!printContainer) return;

        const btn = createButton(src);
        printContainer.appendChild(btn);
    }

    // Try immediately, then observe for dynamic renders
    injectButton();

    const observer = new MutationObserver(() => {
        injectButton();
    });

    observer.observe(document.body, { childList: true, subtree: true });

    // Also re-run on navigation (SPA page changes update the iframe src)
    window.addEventListener('popstate', () => {
        // Remove old button so it re-renders with updated iframe src
        const old = document.getElementById(BUTTON_ID);
        if (old) old.remove();
        setTimeout(injectButton, 500);
    });
})();
