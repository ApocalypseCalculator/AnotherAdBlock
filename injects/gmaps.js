console.log('[AnotherAdBlock]: Google Maps script injected!');

setInterval(() => {
    try {
        let adlist = document.querySelectorAll(`div>div>div>div>div>h1[aria-label="Sponsored"]`)
        if(adlist.length > 0) {
            adlist.forEach(el => {
                // deleting the sponsored ad
                el.parentElement.parentElement.parentElement.parentElement.parentElement.remove();
            });
            console.log(`[AnotherAdBlock]: Removed ${adlist.length} sponsored listings from search view`);
        }
    }
    catch { }
}, 100);
