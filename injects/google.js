console.log('[AnotherAdBlock]: Google script injected!');

try {
	let ads = document.querySelectorAll('#tvcap,#atvcap,#rhsads,.commercial-unit-desktop-rhs');
	if(ads.length > 0) {
		ads.forEach(e => {
			e.remove();
		});
		console.log(`[AnotherAdBlock]: Removed ${ads.length} sponsored listings from page view`);
	}
	document.getElementById("res").className = document.getElementById("res").className.split(/\s+/g)[0]; //eqAnXb, the class name for main search results without ads
} catch { }
