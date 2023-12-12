try {
    const interval = setInterval(() => {
        let nsfwmodal = document.querySelectorAll('[bundlename="desktop_rpl_nsfw_blocking_modal"]');
        if(nsfwmodal.length > 0) {
            document.querySelectorAll('[bundlename="desktop_rpl_nsfw_blocking_modal"]').item(0).remove();
            document.body.style = "";
            document.querySelectorAll('div[role="presentation"]').item(0).style = "";
            //clearInterval(interval);
        }
        let ads = document.querySelectorAll('shreddit-ad-post'); 
        if(ads.length > 0) {
            ads.forEach(e => {
                e.remove();
            });
        }
    }, 200);
} catch {}