console.log('[AnotherAdBlock]: YouTube script injected!');

try {
    const defined = v => v !== null && v !== undefined;
    setInterval(() => {
        let ad = document.querySelector('.ad-showing')
        if (defined(ad)) {
            console.log('[AnotherAdBlock]: Detected an ad video!');
            let video = ad.querySelectorAll('video');
            if(video.length > 0) {
                video.forEach(vid => {
                    try {
                        vid.currentTime = Math.max(vid.duration - 1, 0);
                        console.log('[AnotherAdBlock]: Skipped an ad video!');
                    }
                    catch{}
                });
            }
        }
        let skipbtn = document.querySelectorAll("button.ytp-ad-skip-button-modern");
        if (defined(skipbtn)) {
            skipbtn.forEach(btn => btn.click());
            console.log('[AnotherAdBlock]: Clicked skip button(s)!');
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