chrome.runtime.getPackageDirectoryEntry(function (root) {
    root.getFile("./data/list.json", {}, function (fileEntry) {
        fileEntry.file(function (file) {
            var reader = new FileReader();
            reader.onloadend = function (e) {
                let parsed = JSON.parse(this.result);
                chrome.webRequest.onBeforeRequest.addListener(
                    function (details) { return { cancel: true }; },
                    { urls: parsed.blockedSites },
                    ["blocking"]
                );
                chrome.webRequest.onBeforeSendHeaders.addListener(
                    function (details) {
                        for (var i = details.requestHeaders.length - 1; i >= 0; i--) {
                            if (parsed.blockedHeaders.includes(`${details.requestHeaders[i].name}`.toLowerCase())) {
                              details.requestHeaders.splice(i, 1);
                            }
                        }
                        return { requestHeaders: details.requestHeaders };
                    },
                    {urls: ['<all_urls>']},
                    ['blocking', 'requestHeaders']
                );
                /*chrome.webRequest.onHeadersReceived.addListener(
                    function (details) {
                        // check Set Cookie headers for tracker cookies
                        return { responseHeaders: details.responseHeaders };
                    },
                    {urls: ['<all_urls>']},
                    ['blocking', 'responseHeaders']
                )*/
                chrome.browserAction.setBadgeText({ text: 'ON' });
                chrome.browserAction.setBadgeBackgroundColor({ color: '#4688F1' });
                chrome.browserAction.setTitle({ title: "Another Ad Block is Active." });
            };
            reader.readAsText(file);
        });
    });
})