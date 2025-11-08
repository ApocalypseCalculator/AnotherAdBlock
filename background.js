async function checkStaticRules() {
    const rules = await chrome.declarativeNetRequest.getEnabledRulesets();
    console.log(`${rules.length} static rules active`);
    return rules.length;
}

async function checkDynamicRules() {
    const rules = await chrome.declarativeNetRequest.getDynamicRules();
    console.log(`${rules.length} dynamic rules active`);
    return rules.length;
}

// rules need to be cleared, otherwise they can have conflicts with extension reloads
async function clearSessionRules() {
    const rules = await chrome.declarativeNetRequest.getSessionRules();
    await chrome.declarativeNetRequest.updateSessionRules({
        removeRuleIds: rules.map(rule => rule.id)
    });
    console.log(`Cleared ${rules.length} existing session rules`);
}

// note: we assume remote content is a basic text list of domains
function fetchRemoteRules(urls) {
    return Promise.all(urls.map(async (url) => {
        let response = await fetch(url);
        if(response.ok) {
            let result = (await response.text()).trim().split('\n').map(e => e.trim());
            console.log(`Fetched ${result.length} remote rules from ${url}`);
            return result;
        }
        else {
            console.log(`Failed to fetch ${url}: ${response.statusText}`);
            return [];
        }
    }));
}

async function loadSessionUrlBlockers() {
    const enabledStaticRuleCount = await checkStaticRules();
    const enabledDynamicRuleCount = await checkDynamicRules();
    const url = chrome.runtime.getURL('data/session_rules.json');
    const response = await fetch(url);
    const config = await response.json();

    const remoteRules = await fetchRemoteRules(config.remote_rules || []);

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
    ).concat(
        remoteRules.map(domains => {
            return {
                content: domains,
                type: "domains"
            }
        })
    )

    await chrome.declarativeNetRequest.updateSessionRules({
        addRules: totalrules.map((url, i) => ({
            id: enabledStaticRuleCount + enabledDynamicRuleCount + i, // prevent ID conflicts with static rules
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
                ],
                ... (url.type === "domains" ? { requestDomains: url.content } : {})
            }
        }))
    });

    console.log(`Loaded ${totalrules.length} session rules`);
}

async function run() {
    await clearSessionRules();
    await loadSessionUrlBlockers();
    chrome.action.setBadgeText({ text: 'ON' });
    chrome.action.setBadgeBackgroundColor({ color: '#4688F1' });
    chrome.action.setTitle({ title: "Another Ad Block is Active." });
}

run();
