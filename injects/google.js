document.getElementById("tvcap").innerHTML = ""; //remove sponsored section
document.getElementById("res").className = document.getElementById("res").className.split(/\s+/g)[0]; //eqAnXb, the class name for main search results without ads
let sponsored = document.getElementsByClassName("cu-container");
for(let i = 0; i < sponsored.length; i++){
	sponsored.item(i).innerHTML = "";
}
