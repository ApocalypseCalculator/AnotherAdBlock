const BANNED_SCRIPT_CLASS = ['pmc-admiral', 'admiral'];
const BANNED_SCRIPT_IDS = ['admiral-script']

window.admiral = function() {
    console.log('[AnotherAdBlock]: hijacked admiral call');
}

function removeAdmiralNode(node) {
    if (
        node.tagName === "SCRIPT" &&
        (
            BANNED_SCRIPT_CLASS.some(banned_script =>
                node.classList?.contains(banned_script)
            ) || BANNED_SCRIPT_IDS.some(banned_id =>
                node.id === banned_id
            ) || possibleAdmiralScript(node.text)
        )
    ) {
        node.remove(); // Prevent execution
        console.log(`[AnotherAdBlock]: Blocked admiral script from execution`);
    }
}

new MutationObserver((mutations) => {
    for (const mutation of mutations) {
        for (const node of mutation.addedNodes) {
            removeAdmiralNode(node);
        }
        removeAdmiralNode(mutation.target);
    }
}).observe(document.documentElement, { childList: true, subtree: true, characterData: true, attributes: true });

document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll(
        BANNED_SCRIPT_CLASS.map(script => `script.${script}`)
            .concat(BANNED_SCRIPT_IDS.map(id => `script#${id}`))
            .join(", ")
    ).forEach(s => s.remove());
});

function possibleAdmiralScript(content) {
    if (!content || content == '' || typeof content !== 'string') return false;
    content = content.toLowerCase();
    return (
        content.includes('disable your adblocker') ||
        content.includes('disabling your adblocker') ||
        content.includes('disable my adblocker') ||
        content.includes('continue without supporting us') ||
        content.includes('window.admiral(')
    );
}
