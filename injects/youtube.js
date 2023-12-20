console.log('[AnotherAdBlock]: YouTube script injected!');

try {
    const defined = v => v !== null && v !== undefined;
    setInterval(() => {
        const ad = [...document.querySelectorAll('.ad-showing')][0];
        if (defined(ad)) {
            const video = document.querySelectorAll('video');
            try {
                if (video.length > 0) {
                    video[video.length - 1].currentTime = video[video.length - 1].duration;
                    console.log('[AnotherAdBlock]: Skipped an ad video!');
                }
            }
            catch { }
        }
        let skipbtn = document.querySelector("button.ytp-ad-skip-button-modern");
        if (defined(skipbtn)) {
            skipbtn.click();
            console.log('[AnotherAdBlock]: Clicked skip button!');
        }
    }, 100);

    setInterval(() => {
        let ads = document.querySelectorAll('ytd-search-pyv-renderer,ytd-ad-slot-renderer,div[id="player-ads"]');
        if (ads.length > 0) {
            ads.forEach(e => {
                e.remove();
            });
            console.log(`[AnotherAdBlock]: Removed ${ads.length} ad videos from page view`);
        }
    }, 200);
} catch { }