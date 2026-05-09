// ==UserScript==
// @name         Norton Ebook - Clean EPUB View
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Removes fixed width/padding restrictions on the raw EPUB content page for a clean, resizable reading experience
// @author       techiebirb
// @match        https://nerd.wwnorton.com/ebooks/epub/*
// @grant        none
// ==/UserScript==
(function () {
    'use strict';

    const css = `
        body,
        .content,
        .row,
        .page {
            width: 100% !important;
            max-width: 100% !important;
            margin: 0 !important;
            padding: 0 !important;
            float: none !important;
            box-sizing: border-box !important;
            background: #fff !important;
            flex: 0 0 100% !important;
            margin-left: 0 !important;
        }

        .page > * {
            max-width: 90% !important;
            width: 100% !important;
            margin-left: auto !important;
            margin-right: auto !important;
            padding-left: 1.5rem !important;
            padding-right: 1.5rem !important;
            box-sizing: border-box !important;
        }

        figure,
        .figure--oversize,
        .figure--fullwidth {
            max-width: min(900px, 100%) !important;
            width: 100% !important;
            margin: 1.5rem auto !important;
            padding: 0 1.5rem !important;
            box-sizing: border-box !important;
        }

        figure img,
        .figure__image {
            max-width: 100% !important;
            height: auto !important;
            display: block !important;
            margin: 0 auto !important;
        }

        p, li {
            line-height: 1.7 !important;
        }

        span[aria-label^="Page"]::before {
            content: attr(aria-label);
            display: block;
            text-align: right;
            font-size: 0.75rem;
            color: #aaa;
            padding: 0.25rem 0;
            border-top: 1px solid #e0e0e0;
            margin: 1rem 0;
        }
    `;

    const style = document.createElement('style');
    style.id = 'norton-epub-clean';
    style.textContent = css;
    document.head.appendChild(style);

    const PROPS = ['width', 'max-width', 'padding', 'padding-left', 'padding-right', 'margin', 'float'];
    const SELECTORS = '.content, .row, .page, body';

    function stripInlineConstraints() {
        document.querySelectorAll(SELECTORS).forEach(el => {
            PROPS.forEach(p => el.style.removeProperty(p));
        });
    }

    stripInlineConstraints();

    // Re-run after main.js has had time to do its thing
    setTimeout(stripInlineConstraints, 500);
    setTimeout(stripInlineConstraints, 1500);

    const observer = new MutationObserver((mutations) => {
        const relevant = mutations.some(m =>
            m.target.matches?.(SELECTORS) || m.target.querySelector?.(SELECTORS)
        );
        if (relevant) stripInlineConstraints();
    });

    observer.observe(document.documentElement, {
        attributes: true,
        attributeFilter: ['style', 'class'],
        subtree: true,
    });
})();