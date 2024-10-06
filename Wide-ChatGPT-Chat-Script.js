// ==UserScript==
// @name         Wider ChatGPT Chat
// @namespace    https://www.greasespot.net/
// @version      1.0
// @description  Increases the maximum width of the central window on ChatGPT
// @author       Pierpaolo Spadafora
// @match        https://chatgpt.com/*
// @grant        none
// @homepage     https://github.com/PierpaoloSpadafora/wider-chatgpt-chat
// @license      MIT
// ==/UserScript==

(function() {
    'use strict';

    function replaceClasses() {
        const elements = document.querySelectorAll('[class*="md:max-w-3xl"]');
        elements.forEach(el => {
            if (el.classList.contains('md:max-w-3xl')) {
                el.classList.remove('md:max-w-3xl');
                el.classList.add('md:max-w-xxl');
            }
        });
    }

    // wait for the page to load to avoid rewriting classes too early
    window.addEventListener('load', () => {
        setTimeout(() => {
            replaceClasses();
        }, 2000);
    });

    const observer = new MutationObserver((mutationsList) => {
        for (let mutation of mutationsList) {
            if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
                const el = mutation.target;
                if (el.classList.contains('md:max-w-3xl')) {
                    el.classList.remove('md:max-w-3xl');
                    el.classList.add('md:max-w-xxl');
                }
            } else if (mutation.type === 'childList') {
                replaceClasses();
            }
        }
    });

    observer.observe(document.body, { childList: true, subtree: true, attributes: true });
    replaceClasses();

})();
