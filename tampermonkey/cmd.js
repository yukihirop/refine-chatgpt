// ==UserScript==
// @name         Script to enable the use of CMD with ChatGPT
// @namespace    http://tampermonkey.net/
// @version      2024-05-13
// @description  try to take over the world!
// @author       You
// @match        https://chatgpt.com/c/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=chatgpt.com
// @grant        none
// @require      https://raw.githubusercontent.com/yukihirop/refine-chatgpt/master/prompts/ja.js
// @require      https://raw.githubusercontent.com/yukihirop/refine-chatgpt/master/scripts/cmd.js
// ==/UserScript==

(function () {
  'use strict';
  async function main() {
    try {
      if (typeof cmd === 'function') {
        cmd(ja_promptData);
      } else {
        console.error("cmd is not a function");
      }
    } catch (e) {
      console.error(`ERROR: Execution of script 'Script to enable the use of CMD with ChatGPT' failed!`, e);
    }
  }

  main();
})();
