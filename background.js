async function checkStaticRules() {
    const rules = await chrome.declarativeNetRequest.getEnabledRulesets();
    console.log(`${rules.length} static rules active`);
    return rules.length;
}

// rules need to be cleared, otherwise they can have conflicts with extension reloads
async function clearRules() {
    const rules = await chrome.declarativeNetRequest.getSessionRules();
    await chrome.declarativeNetRequest.updateSessionRules({
        removeRuleIds: rules.map(rule => rule.id)
    });
    console.log(`Cleared ${rules.length} existing session rules`);
}

async function loadUrlBlockers() {
    const enabledRuleCount = await checkStaticRules();
    const url = chrome.runtime.getURL('data/session_rules.json');
    const response = await fetch(url);
    const config = await response.json();

    let totalrules = config.segments.map(segment => {
        return {
            content: segment,
            type: "urlFilter"
        }
    }).concat(
        config.regex.map(regex => {
            return {
                content: regex,
                type: "regexFilter"
            }
        })
    )

    await chrome.declarativeNetRequest.updateSessionRules({
        addRules: totalrules.map((url, i) => ({
            id: enabledRuleCount + i, // prevent ID conflicts with static rules
            action: { type: 'block' },
            condition: {
                ... (url.type === "urlFilter" ? { urlFilter: url.content } : {}),
                ... (url.type === "regexFilter" ? { regexFilter: url.content } : {}),
                resourceTypes: [
                    "main_frame",
                    "sub_frame",
                    "stylesheet",
                    "script",
                    "image",
                    "font",
                    "object",
                    "xmlhttprequest",
                    "ping",
                    "csp_report",
                    "media",
                    "websocket",
                    "webtransport",
                    "webbundle",
                    "other"
                ]
            }
        }))
    });

    console.log(`Loaded ${totalrules.length} session rules`);
}

async function run() {
    await clearRules();
    await loadUrlBlockers();
    chrome.action.setBadgeText({ text: 'ON' });
    chrome.action.setBadgeBackgroundColor({ color: '#4688F1' });
    chrome.action.setTitle({ title: "Another Ad Block is Active." });
}

run();
