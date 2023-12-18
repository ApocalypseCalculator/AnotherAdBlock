try {
    const clear = (() => {
        const defined = v => v !== null && v !== undefined;
        const timeout = setInterval(() => {
            const ad = [...document.querySelectorAll('.ad-showing')][0];
            if (defined(ad)) {
                const video = document.querySelectorAll('video');
                try {
                    if (video.length > 0) {
                        video[video.length - 1].currentTime = video[video.length - 1].duration;
                        console.log('Skipped an ad video!');
                    }
                }
                catch { }
            }
            let skipbtn = document.querySelector("button.ytp-ad-skip-button-modern");
            if(defined(skipbtn)) {
                skipbtn.click();
                console.log('Clicked skip button!');
            }
        }, 300);
        return function () {
            clearTimeout(timeout);
        }
    })();

    const interval = setInterval(() => {
        let ads = document.querySelectorAll('ytd-search-pyv-renderer,ytd-ad-slot-renderer,div[id="player-ads"]');
        if (ads.length > 0) {
            ads.forEach(e => {
                e.remove();
            });
        }
    }, 300);
} catch { }