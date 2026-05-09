# nortonEbookEnhancer

A pair of browser userscripts that make Norton ebooks easier to share and much nicer to read — wider text, page markers, and unrestricted copy/print access.

## Table of Contents
1. [Description](#description)
2. [Installation](#installation)
3. [Clean EPUB Script](#clean-epub-script)
4. [Open Raw Page Script](#open-raw-page-script)

## Description

When friends lose their textbook or are away from home without the online version (usually because they forgot to register), I'd send them the content the tedious way — digging through inspect element. I eventually got tired of it and wrote a userscript to automate the process, which then inspired a second script to make the online reader itself much more pleasant to use.

These two scripts work together: one extracts the raw page for full copy/print access, and the other cleans up the layout so reading doesn't feel like staring through a mail slot.

> Claude helped with parts of the implementation and this README.md.

## Installation

You'll need a userscript manager. Install one for your browser, then click the script download links to install.

**Google Chrome**: Install [Violentmonkey](https://chrome.google.com/webstore/detail/violentmonkey/jinjaccalgkegednnccohejagnlnfdag) or [Tampermonkey](https://chrome.google.com/webstore/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo).

**Mozilla Firefox**: Install [Greasemonkey](https://addons.mozilla.org/en-US/firefox/addon/greasemonkey/), [Violentmonkey](https://addons.mozilla.org/en-US/firefox/addon/violentmonkey/), or [Tampermonkey](https://addons.mozilla.org/en-US/firefox/addon/tampermonkey/).

**Opera**: Install [this Chrome extension bridge](https://addons.opera.com/en/extensions/details/install-chrome-extensions/) first, then install Violentmonkey or Tampermonkey from the Chrome Web Store.

**Microsoft Edge**: Install [Violentmonkey](https://microsoftedge.microsoft.com/addons/detail/violentmonkey/eeagobfjdenkkddmbclomhiblgggliao) or [Tampermonkey](https://microsoftedge.microsoft.com/addons/detail/tampermonkey/iikmkjmpaadaobahmlepeloendndfphd) from the Edge Add-On Repository.

Once you have a manager installed, click a script link below — your manager will intercept the install and prompt you to confirm.

- [Download Clean EPUB Script](https://github.com/techiebirb/nortonEbookEnhancer/raw/refs/heads/main/Norton%20Ebook%20-%20Clean%20EPUB%20View-1.0.user.js)
- [Download Open Raw Page Script](https://github.com/techiebirb/nortonEbookEnhancer/raw/refs/heads/main/Norton%20Ebook%20-%20Open%20Raw%20Page-1.0.user.js)

## Clean EPUB Script

Improves the default Norton ebook reading experience. Works on both the main reader page and the raw page.

1. Expands text to fill more of the screen — no more cramped narrow columns
2. Adds visual indicators showing where each physical page begins

## Open Raw Page Script

Extracts the iframe's URL from the main Norton reader and opens it directly in a new tab, bypassing the restrictions the outer shell imposes.

This allows for:
1. Copying and pasting without limits
2. Printing without restrictions
3. Saving as a PDF (using Chrome's built-in Print → Save as PDF)
