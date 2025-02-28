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
                parsed.blockedRegex = parsed.blockedRegex.map((regex) => {
                    return new RegExp(regex);
                });
                chrome.webRequest.onBeforeRequest.addListener(
                    function (details) {
                        for(let i = 0; i < parsed.blockedRegex.length; i++) {
                            if (parsed.blockedRegex[i].test(details.url)) {
                                return { cancel: true };
                            }
                        }
                        return { cancel: false };
                    },
                    { urls: ["<all_urls>"] },
                    ["blocking"]
                );
                chrome.browserAction.setBadgeText({ text: 'ON' });
                chrome.browserAction.setBadgeBackgroundColor({ color: '#4688F1' });
                chrome.browserAction.setTitle({ title: "Another Ad Block is Active." });
            };
            reader.readAsText(file);
        });
    });
})