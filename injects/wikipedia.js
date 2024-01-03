console.log('[AnotherAdBlock]: Wikipedia script injected!');

setInterval(() => {
    try {
        let adbanner = document.querySelector(`.cn-fundraising`);
        if(adbanner) {
            adbanner.remove();
            console.log(`[AnotherAdBlock]: Removed ad banner`);
            // although wikipedia is a free public encyclopedia that 
            // relies on donations, I feel it is not right to push 
            // these ads onto peoples faces when these donations
            // are used to pay out an 800k salary to the executive director
            // (source: https://meta.wikimedia.org/wiki/Wikimedia_Foundation_salaries)
            // along with other absurd amounts for other execs, 
            // when many of the readers are literally just trying to survive. 
        }
    }
    catch { }
}, 100);
