// ==UserScript==
// @name         Script to enable export in ChatGPT
// @namespace    http://tampermonkey.net/
// @version      2024-05-13
// @description  try to take over the world!
// @author       You
// @match        https://chatgpt.com/c/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=chatgpt.com
// @grant        none
// @require      https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js
// @require      https://raw.githubusercontent.com/yukihirop/refine-chatgpt/master/scripts/exports.js
// ==/UserScript==

(function () {
  'use strict';
  async function main() {
    try {
      if (typeof exports === 'function') {
        exports();
      } else {
        console.error("cmd is not a function");
      }
    } catch (e) {
      console.error(`ERROR: Execution of script 'Script to enable export in ChatGPT' failed!`, e);
    }
  }

  main();
})();
