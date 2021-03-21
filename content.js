var script = document.createElement('script');
script.src = chrome.extension.getURL('inject.js');
(document.head || document.documentElement).appendChild(script);