try {
    const clear = (() => {
        const defined = v => v !== null && v !== undefined;
        const timeout = setInterval(() => {
            const ad = [...document.querySelectorAll('.ad-showing')][0];
            if (defined(ad)) {
                const video = document.querySelector('video');
                if (defined(video)) {
                    video.currentTime = video.duration;
                }
            }
        }, 500);
        return function () {
            clearTimeout(timeout);
        }
    })();
    
    const interval = setInterval(() => {
        let ads = document.querySelectorAll('ytd-search-pyv-renderer,ytd-ad-slot-renderer,div[id="player-ads"]');
        if(ads.length > 0) {
            ads.forEach(e => {
                e.remove();
            });
        }
    }, 200);
} catch {}