// ==UserScript==
// @name         chatgptでcmdを使えるようにするprompt
// @namespace    http://tampermonkey.net/
// @version      2024-05-13
// @description  try to take over the world!
// @author       You
// @match        https://chatgpt.com/c/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=chatgpt.com
// @grant        none
// @require      https://raw.githubusercontent.com/yukihirop/refine-chatgpt/master/prompt.js
// @require      https://raw.githubusercontent.com/yukihirop/refine-chatgpt/master/cmd_init.js
// ==/UserScript==

(function () {
  'use strict';
  async function main() {
    try {
      console.log(JSON.stringify(promptData));
      if (typeof cmdInit === 'function') {
        cmdInit(promptData);
      } else {
        console.error("cmdInit is not a function");
      }
    } catch (e) {
      console.error(`ERROR: Execution of script 'chatgptでcmdを使えるようにするprompt v2' failed!`, e);
    }
  }

  main();
})();
