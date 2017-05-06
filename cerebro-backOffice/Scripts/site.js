function toggleFunction() {
    "use strict";
    var x = document.getElementById("navMobile");
    if (x.className.indexOf("w3-show") === -1) {
        x.className += " w3-show";
    } else {
        x.className = x.className.replace(" w3-show", "");
    }
}
function changeTab(evt, tab) {
	"use strict";
  	var i, x, tablinks;
	x = document.getElementsByClassName("tab");
	for (i = 0; i < x.length; i++) {
	  x[i].style.display = "none";
	}
	tablinks = document.getElementsByClassName("tabButtons");
	for (i = 0; i < x.length; i++) {
	  tablinks[i].className = tablinks[i].className.replace(" w3-light-grey w3-text-cerebro-red", "");
	}
	document.getElementById(tab).style.display = "block";
	evt.currentTarget.className += " w3-light-grey w3-text-cerebro-red";
}
function dispositivo() {
    "use strict";
    var disp = document.createElement("cerebro-dispositivo");
    var node = document.getElementById("main");
    while (node.hasChildNodes()) {
        node.removeChild(node.lastChild);
    }
    node.appendChild(disp);
}
function usuario() {
    "use strict";
    var disp = document.createElement("cerebro-usuario");
    var node = document.getElementById("main");
    while (node.hasChildNodes()) {
        node.removeChild(node.lastChild);
    }
    node.appendChild(disp);
}
function estadistica() {
    "use strict";
    var disp = document.createElement("cerebro-estadistica");
    var node = document.getElementById("main");
    while (node.hasChildNodes()) {
        node.removeChild(node.lastChild);
    }
    node.appendChild(disp);
}
function evento() {
    "use strict";
    var disp = document.createElement("cerebro-evento");
    var node = document.getElementById("main");
    while (node.hasChildNodes()) {
        node.removeChild(node.lastChild);
    }
    node.appendChild(disp);
}
function tipo() {
    "use strict";
    var disp = document.createElement("cerebro-tipo-de-fuente-de-dato");
    var node = document.getElementById("main");
    while (node.hasChildNodes()) {
        node.removeChild(node.lastChild);
    }
    node.appendChild(disp);
}