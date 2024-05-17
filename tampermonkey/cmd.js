// ==UserScript==
// @name         Script to enable the use of CMD with ChatGPT
// @namespace    http://tampermonkey.net/
// @version      2024-05-13
// @description  try to take over the world!
// @author       You
// @match        https://chatgpt.com/c/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=chatgpt.com
// @grant        GM.xmlHttpRequest
// @grant        GM_xmlhttpRequest
// @require      https://raw.githubusercontent.com/yukihirop/refine-chatgpt/master/scripts/cmd.js
// ==/UserScript==

(function () {
  'use strict';
  async function main() {
    try {
      if (typeof cmd === 'function') {

        const url = "https://raw.githubusercontent.com/yukihirop/refine-chatgpt/master/dist/prompts/ja.json";

        GM.xmlHttpRequest({
          method: "GET",
          url: url,
          onload: function (response) {
            if (response.status === 200) {
              try {
                const ja_promptData = JSON.parse(response.responseText);
                cmd(ja_promptData);
              } catch (error) {
                console.error("JSONの解析中にエラーが発生しました:", error);
              }
            } else {
              console.error("データの取得に失敗しました:", response.status, response.statusText);
            }
          },
          onerror: function (error) {
            console.error("リクエスト中にエラーが発生しました:", error);
          }
        });
      } else {
        console.error("cmd is not a function");
      }
    } catch (e) {
      console.error(`ERROR: Execution of script 'Script to enable the use of CMD with ChatGPT' failed!`, e);
    }
  }

  main();
})();
