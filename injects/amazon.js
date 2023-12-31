console.log('[AnotherAdBlock]: Amazon script injected!');

setInterval(() => {
    try {
        let adlist = document.querySelectorAll(`div.AdHolder,div:has(>div[data-ad-details]),div:has(>div>div>div>div[aria-label="Sponsored Ad"])`);
        if(adlist.length > 0) {
            adlist.forEach(el => {
                // deleting the sponsored ad
                el.remove();
            });
            console.log(`[AnotherAdBlock]: Removed ${adlist.length} sponsored listings from search view`);
        }
    }
    catch { }
}, 100);
