let banned_scripts = ['pmc-admiral', 'admiral'];

new MutationObserver((mutations) => {
    for (const mutation of mutations) {
        for (const node of mutation.addedNodes) {
            if (
                node.tagName === "SCRIPT" &&
                banned_scripts.some(banned_script =>
                    node.classList?.contains(banned_script)
                )
            ) {
                node.remove(); // Prevent execution
                console.log(`[AnotherAdBlock]: Blocked admiral script from execution`);
            }
        }
    }
}).observe(document.documentElement, { childList: true, subtree: true });

document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll(banned_scripts.map(script => `script.${script}`).join(", ")).forEach(s => s.remove());
});
