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
                    }
                }
                catch { }
            }
        }, 500);
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
    }, 200);
} catch { }