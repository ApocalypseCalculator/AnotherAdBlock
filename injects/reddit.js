console.log('[AnotherAdBlock]: Reddit script injected!');

try {
    const interval = setInterval(() => {
        // remove ads
        let ads = document.querySelectorAll('shreddit-ad-post, shreddit-comments-page-ad, shreddit-sidebar-ad'); 
        if(ads.length > 0) {
            ads.forEach(e => {
                e.remove();
            });
            console.log(`[AnotherAdBlock]: Removed ${ads.length} ads from page view`);
        }

        // unblock NSFW
        // note: at this time it seems to be slightly broken
        // when browsing posts where one image may suddenly get duplicated in 1 or 2 other posts

        //remove NSFW modal
        let nsfwmodal = document.querySelectorAll('[bundlename="desktop_rpl_nsfw_blocking_modal"]');
        if(nsfwmodal.length > 0) {
            document.querySelectorAll('[bundlename="desktop_rpl_nsfw_blocking_modal"]').item(0).remove();
            document.body.style = "";
            document.querySelectorAll('div[role="presentation"]').item(0).style = "";
            console.log(`[AnotherAdBlock]: Removed NSFW popup modal`);
        }

        let nsfwcalc = document.querySelectorAll('shreddit-aspect-ratio');
        if(nsfwcalc.length > 0) {
            nsfwcalc.item(0).removeAttribute("is-nsfw-blocked");
            nsfwcalc.item(0).removeAttribute("nsfw");
        }

        let mediael = document.querySelectorAll('xpromo-nsfw-blocking-container>shreddit-blurred-container>div[slot="blurred"]>div');
        let mediael2 = document.querySelectorAll(`shreddit-blurred-container>div[slot="blurred"]>div>a>faceplate-img`);
        if(mediael.length > 0) {
            // sampled from a random reddit post, hopefully this works for all
            // this is when the "use our app to view!" thing pops up
            mediael.item(0).className = "max-h-[100vw] h-full w-full object-contain overflow-hidden relative bg-black";
            document.querySelector("xpromo-nsfw-blocking-container").outerHTML = mediael.item(0).outerHTML.replace(/\/preview\.redd\.it/g, "/i.redd.it");
            if(nsfwcalc.length > 0) {
                nsfwcalc.item(0).parentElement.outerHTML += "Post unblocked by AnotherAdBlock!";
            }
            console.log(`[AnotherAdBlock]: Unblocked app promotion NSFW block`);
        }
        else if(mediael2.length > 0) {
            // this is when there is nothing but a blur on the image
            // in this case the original template is not present so we must inject it again
            // since this is kinda hacky this will fail if reddit slightly modifies things
            try {
                let img = mediael2.item(0).shadowRoot.querySelector("div>img");
                document.querySelector('shreddit-blurred-container').outerHTML = blurtemplate(img.naturalHeight/img.naturalWidth, img.src.replace(/preview\.redd\.it/g, "i.redd.it"), img.alt);
                document.querySelector("shreddit-aspect-ratio").parentElement.outerHTML += "Post unblocked by AnotherAdBlock!";
                console.log(`[AnotherAdBlock]: Unblocked image blur NSFW block`);
            }
            catch {}
        }
        
        //unblur the previews on the sidebar
        let sidebarpreviews = document.querySelectorAll(`ul>li>reddit-pdp-right-rail-post>div>faceplate-tracker>div>div>div>a>faceplate-img`);
        if(sidebarpreviews.length > 0) {
            sidebarpreviews.forEach(e => {
                e.style = "";
            });
            console.log(`[AnotherAdBlock]: Unblurred ${sidebarpreviews.length} previews`);
        }
    }, 200);
} catch {}


function blurtemplate(aratio, newurl, alt) {
    return blurposttemplate.replace("{{ASPECTRATIO}}", aratio).replace("{{ALT}}", alt).replace(/\{\{IMGURL\}\}/g, newurl); 
}

const blurposttemplate = 
`
<shreddit-aspect-ratio id="t3_idontthinkthisidmatters-aspect-ratio" style="
    --aspect-ratio: {{ASPECTRATIO}};
    --max-height: min(
        100%,
        calc(100vh - calc(var(--shreddit-header-height) + 250px))
      );
  ">
    <div class="max-h-[100vw] h-full w-full object-contain overflow-hidden relative bg-black">
        <img alt="" role="presentation"
            class="absolute top-0 top-1/2 -translate-y-1/2 w-full opacity-30 object-cover scale-[1.2] post-background-image-filter"
            loading="eager"
            src="{{IMGURL}}"
            style="">
        <img id="post-image" alt="{{ALT}}"
            class="max-h-[100vw] h-full w-full object-contain relative" loading="eager" fetchpriority="high"
            src="{{IMGURL}}"
            style="">
    </div>
</shreddit-aspect-ratio>
`
