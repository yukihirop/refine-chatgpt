function cmd(promptData) {
  function _cmdInit(data) {
    const styleElement = document.createElement('style');
    styleElement.innerHTML = `
  form {
    position: relative;
  }
  .chat-prompt-cmd-preview {
    width: 100%;
    height: content;
    margin-bottom: 10px;
    resize: none;
    overflow: hidden;
    border: solid 1px rgb(150,150,150);
    border-radius: 5px;
    box-sizing: border-box;
    position: absolute;
    bottom: 160px;
    overflow: auto;
    background-color: #fff;
  }
  .chat-prompt-cmd-preview > p {
    font-size: 16px;
    margin: 14px;
    line-height: 24px;
  }
  .chat-prompt-cmd-list {
    position: absolute;
    bottom: 60px;
    max-height: 100px;
    width: 100%;
    overflow: auto;
    z-index: 9999;
    border: solid 1px rgb(150,150,150);
    border-radius: 5px;
    box_sizing: border-box;
  }
  .chat-prompt-cmd-list>div {
    background-color: #fff;
  }
  html.dark .chat-prompt-cmd-list>div {
    background-color: #4a4a4a;
  }
  html.dark .chat-prompt-cmd-list .cmd-item {
    border-color: #666;
  }
  html.dark .chat-prompt-cmd-list .cmd-item b {
    color: #e8e8e8;
  }
  html.dark .chat-prompt-cmd-list .cmd-item i {
    color: #999;
  }
  html.dark .chat-prompt-cmd-list .cmd-item.selected {
    background: rgba(59,130,246,.5);
  }
  .chat-prompt-cmd-list .cmd-item {
    font-size: 12px;
    border-bottom: solid 1px rgba(80,80,80,.2);
    padding: 4px;
    display: flex;
    user-select: none;
    cursor: pointer;
    justify-content: space-between;
  }
  .chat-prompt-cmd-list .cmd-item:last-child {
    border-bottom: none;
  }
  .chat-prompt-cmd-list .cmd-item.selected {
    background: rgba(59,130,246,.3);
  }
  .chat-prompt-cmd-list .cmd-item b {
    display: inline-block;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    border-radius: 4px;
    margin-right: 10px;
    color: #2a2a2a;
  }
  .chat-prompt-cmd-list .cmd-item i {
    width: 100%;
    max-width: 300px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    text-align: right;
    color: #888;
  }
  .chatappico {
    width: 1rem;
    height: 1rem;
  }
  .chatappico.png {
    width: 0.8rem;
    height: 0.9rem;
  }
  #download-markdown-button,
  #download-png-button,
  #download-pdf-button,
  #refresh-page-button {
    border: none;
  }
  @media screen and (max-width: 767px) {
    #download-png-button, #download-pdf-button, #download-html-button {
      display: none;
    }
  }
`;


    document.head.append(styleElement);

    if (window.formInterval) {
      clearInterval(window.formInterval);
    }
    window.formInterval = setInterval(() => {
      const formElement = document.querySelector('form textarea');
      if (!formElement) return;
      clearInterval(window.formInterval);
      initiateCmdTip();
      new MutationObserver((mutationsList) => {
        for (const mutation of mutationsList) {
          if (mutation.target.getAttribute('id') === '__next') {
            initializeDom();
            initiateCmdTip();
          }
          if (mutation.target.getAttribute('class') === 'chat-prompt-cmd-list') {
            const searchContainer = document.querySelector('form .chat-prompt-cmd-list>div');
            const searchInput = document.querySelector('form textarea');
            if (!searchContainer) return;
            searchContainer.addEventListener('click', (event) => {
              const item = event.target.closest('div');
              if (item) {
                const value = decodeURIComponent(item.getAttribute('data-prompt'));
                const previewElement = document.querySelector('.chat-prompt-cmd-preview');
                searchInput.value = value;
                if (previewElement) {
                  previewElement.innerHTML = `<p>${value}</p>`;
                  previewElement.style.display = 'block';
                }
                document.querySelector('form textarea').focus();
                initializeDom();
              }
            });
          }
          if (mutation.type === 'childList' && mutation.removedNodes.length) {
            for (let node of mutation.removedNodes) {
              if (node && typeof node.querySelector === "function" && node.querySelector('form textarea')) {
                initializeDom();
                initiateCmdTip();
                //   (async function () {
                //    async function getPlatform() {
                //      return invoke('platform', {
                //        __tauriModule: 'Os',
                //        message: { cmd: 'platform' },
                //      });
                //    }
                //    if (__TAURI_METADATA__.__currentWindow.label !== 'tray') {
                //      const platform = await getPlatform();
                //      const chatConfig = (await invoke('get_app_conf')) || {};
                //      if (/darwin/.test(platform) && !chatConfig.titlebar) {
                //        const nav = document.body.querySelector('nav');
                //        if (nav) {
                //          nav.style.paddingTop = '25px';
                //        }
                //      }
                //    }
                //  })();
              }
            }
          }
        }
      }).observe(document.body, {
        childList: true,
        subtree: true,
      });
    }, 300);

    // dataはグローバルで定義
    async function initiateCmdTip() {
      initializeDom();
      //const chatPromptData = (await invoke('get_chat_prompt_cmd')) || {};
      //const data = chatPromptData.data;

      if (data.length <= 0) return;

      let previewElement = document.querySelector('.chat-prompt-cmd-preview');
      if (!previewElement) {
        const divElement_preview = document.createElement('div');
        divElement_preview.classList.add('chat-prompt-cmd-preview');
        document.querySelector('form').appendChild(divElement_preview);
        previewElement = document.querySelector('.chat-prompt-cmd-preview');
        if (previewElement) {
          previewElement.style.display = 'none';
        }
      }

      let promptElement = document.querySelector('.chat-prompt-cmd-list');
      if (!promptElement) {
        const divElement_cmdList = document.createElement('div');
        divElement_cmdList.classList.add('chat-prompt-cmd-list');
        document.querySelector('form').appendChild(divElement_cmdList);
        promptElement = document.querySelector('.chat-prompt-cmd-list');
        if (promptElement) {
          promptElement.style.display = 'none';
        }

        /**
        if (__TAURI_METADATA__.__currentWindow.label === 'tray') {
           promptElement.style.bottom = '54px';
         }
        */

        const convertToSafeHtml = (value) => {
          return JSON.stringify(value, null, 2)
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#39;');
        };

        const createItemElement = (item) =>
          `<div class="cmd-item" title="${convertToSafeHtml(item.prompt)}" data-cmd="${item.cmd
          }" data-prompt="${encodeURIComponent(item.prompt)}"><b title="${item.cmd}">/${item.cmd}</b><i>${item.act
          }</i></div>`;
        const renderList = (items) => {
          initializeDom();
          promptElement.innerHTML = `<div>${items.map(createItemElement).join('')}</div>`;
          promptElement.style.display = 'block';
          window.__CHAT_CMD_PROMPT__ = items[0]?.prompt.trim();
          window.__CHAT_CMD__ = items[0]?.cmd.trim();
          window.__cmd_list = promptElement.querySelectorAll('.cmd-item');
          window.__cmd_index = 0;
          window.__cmd_list[window.__cmd_index].classList.add('selected');
          previewElement.innerHTML = `<p>${window.__CHAT_CMD_PROMPT__}</p>`;
          previewElement.style.display = 'block';
        };
        const setPrompt = (value = '') => {
          if (value.trim()) {
            window.__CHAT_CMD_PROMPT__ = window.__CHAT_CMD_PROMPT__?.replace(
              /\{([^{}]*)\}/,
              `{${value.trim()}}`,
            );
          }
        };
        const searchInput = document.querySelector('form textarea');

        function handleCmdKeydown(event) {
          if (!window.__CHAT_CMD_PROMPT__) {
            /*       if (
              !event.shiftKey &&
              event.keyCode === 13 &&
              __TAURI_METADATA__.__currentWindow.label === 'tray'
            ) {
              const button = document.querySelector('form button');
              if (button) button.click();
              event.preventDefault();
            } */
            return;
          }

          // 上矢印
          if (event.key === "ArrowUp" && window.__cmd_index > 0) {
            window.__cmd_list[window.__cmd_index].classList.remove('selected');
            window.__cmd_index -= 1;
            window.__cmd_list[window.__cmd_index].classList.add('selected');
            window.__CHAT_CMD_PROMPT__ = decodeURIComponent(
              window.__cmd_list[window.__cmd_index].getAttribute('data-prompt'),
            );
            searchInput.value = `/${window.__cmd_list[window.__cmd_index].getAttribute('data-cmd')}`;
            if (previewElement) {
              previewElement.innerHTML = `<p>${window.__CHAT_CMD_PROMPT__}</p>`;
              previewElement.style.display = 'block';
            }
            event.preventDefault();
          }

          // 下矢印
          if (event.key === "ArrowDown" && window.__cmd_index < window.__cmd_list.length - 1) {
            window.__cmd_list[window.__cmd_index].classList.remove('selected');
            window.__cmd_index += 1;
            window.__cmd_list[window.__cmd_index].classList.add('selected');
            window.__CHAT_CMD_PROMPT__ = decodeURIComponent(
              window.__cmd_list[window.__cmd_index].getAttribute('data-prompt'),
            );
            searchInput.value = `/${window.__cmd_list[window.__cmd_index].getAttribute('data-cmd')}`;
            if (previewElement) {
              previewElement.innerHTML = `<p>${window.__CHAT_CMD_PROMPT__}</p>`;
              previewElement.style.display = 'block';
            }
            event.preventDefault();
          }

          const containerHeight = promptElement.offsetHeight;
          const itemHeight = window.__cmd_list[0].offsetHeight + 1;

          const itemTop = window.__cmd_list[window.__cmd_index].offsetTop;
          const itemBottom = itemTop + itemHeight;
          if (itemTop < promptElement.scrollTop || itemBottom > promptElement.scrollTop + containerHeight) {
            promptElement.scrollTop = itemTop;
          }

          if (event.key === 'Tab' && !window.__CHAT_STATUS__) {
            const strGroup = window.__CHAT_CMD_PROMPT__.match(/\{([^{}]*)\}/) || [];

            if (strGroup[1]) {
              searchInput.value = `/${window.__CHAT_CMD__}` + ` {${strGroup[1]}}` + ' |-> ';
              window.__CHAT_STATUS__ = 1;
            } else {
              searchInput.value = window.__CHAT_CMD_PROMPT__;
              initializeDom();
            }
            event.preventDefault();
          }

          if (window.__CHAT_STATUS__ === 1 && event.key === 'Tab') {
            const data = searchInput.value.split('|->');
            if (data[1]?.trim()) {
              setPrompt(data[1]);
              window.__CHAT_STATUS__ = 2;
            }
            event.preventDefault();
          }

          if (window.__CHAT_STATUS__ === 2 && event.key === 'Tab') {
            searchInput.value = window.__CHAT_CMD_PROMPT__;
            promptElement.innerHTML = '';
            promptElement.style.display = 'none';
            delete window.__CHAT_STATUS__;
            event.preventDefault();
          }

          if (event.key === 'Space') {
            searchInput.value = window.__CHAT_CMD_PROMPT__;
            promptElement.innerHTML = '';
            promptElement.style.display = 'none';
            delete window.__CHAT_CMD_PROMPT__;
          }

          if (event.key === "Enter" && event.isComposing === false && window.__CHAT_CMD_PROMPT__) {
            event.preventDefault();
            const data = searchInput.value.split('|->');
            setPrompt(data[1]);

            searchInput.value = window.__CHAT_CMD_PROMPT__;
            document.querySelector('form textarea').focus()

            initializeDom();
          }
        }
        searchInput.removeEventListener('keydown', handleCmdKeydown, { capture: true });
        searchInput.addEventListener('keydown', handleCmdKeydown, { capture: true });

        function handleCmdInput() {
          if (searchInput.value === '') {
            initializeDom();
          }

          if (window.__CHAT_STATUS__) return;

          const query = searchInput.value;
          if (!query || !/^\//.test(query)) {
            initializeDom();
            return;
          }

          if (query === '/') {
            renderList(data);
            return;
          }

          const result = data.filter((i) => new RegExp(query.substring(1)).test(i.cmd));
          if (result.length > 0) {
            renderList(result);
          } else {
            initializeDom();
          }
        }
        searchInput.removeEventListener('input', handleCmdInput);
        searchInput.addEventListener('input', handleCmdInput);
      }
    }

    function initializeDom() {
      const previewElement = document.querySelector('.chat-prompt-cmd-preview');
      if (previewElement) {
        previewElement.innerHTML = '';
        previewElement.style.display = 'none';
      }
      const promptElement = document.querySelector('.chat-prompt-cmd-list');
      if (promptElement) {
        promptElement.innerHTML = '';
        promptElement.style.display = 'none';
      }

      delete window.__CHAT_CMD_PROMPT__;
      delete window.__CHAT_CMD__;
      delete window.__CHAT_STATUS__;
      delete window.__cmd_list;
      delete window.__cmd_index;
    }
  }

  function autoResize() {
    const textarea = document.getElementById('prompt-textarea');
    textarea.style.height = 'auto'; // Reset the height to auto to calculate the new height
    textarea.style.height = textarea.scrollHeight + 'px'; // Set the height to the scrollHeight
  }

  function updatePreviewBottom() {
    const listElement = document.querySelector('.chat-prompt-cmd-list');
    if (listElement) {
      const listHeight = listElement.offsetHeight;
      const previewElement = document.querySelector('.chat-prompt-cmd-preview');
      if (previewElement) {
        if (listHeight === 0) {
          // バグ
          previewElement.style.bottom = `160px`;
        } else {
          previewElement.style.bottom = `${listHeight + 60}px`;
        }
      }
    }
  }

  function _promptTextareaInit() {
    const textarea = document.getElementById('prompt-textarea');
    textarea.addEventListener('input', function () {
      autoResize()
      updatePreviewBottom()
    });
  }

  function _previewBottomInit() {
    // リサイズイベントを監視して更新
    window.addEventListener('resize', updatePreviewBottom);
  }

  if (document.readyState === 'complete' || document.readyState === 'interactive') {
    _cmdInit(promptData);
    _promptTextareaInit();
    _previewBottomInit()
  } else {
    document.addEventListener('DOMContentLoaded', function () {
      _cmdInit()
      _promptTextareaInit()
      _previewBottomInit()
    });
  }
}
