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
function blurBackground(){
	"use strict";
	$( "#backgr" ).animate({ opacity: 0.30, }, 4000, function() { 
		$( "#backgr" ).animate({ opacity: 1.00, }, 3000, function() { 
			blurBackground(); 
		});
	});
};
function addNavbarTop() {
    "use strict";
    var navbar = document.getElementById("nav");
    if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
        navbar.className = "w3-bar" + " w3-card-2" + " w3-animate-top" + " w3-cerebro-blue";
    } else {
        navbar.className = navbar.className.replace(" w3-card-2 w3-animate-top w3-cerebro-blue", "");
    }
}
window.onscroll = function () {
    "use strict";
    addNavbarTop();
};
var sidebar = document.getElementById("sidebar");
function w3_open() {
    if (document.getElementById("sidebar").style.display === 'block') {
        document.getElementById("sidebar").style.display = 'none';
    } else {
        document.getElementById("sidebar").style.display = 'block';
    }
}
function w3_close() {
    document.getElementById("sidebar").style.display = "none";
}
function iniciarSesion() {
    $.post("https://localhost:44332/api/login", "email=" + document.getElementById("email").value + "&password=" + document.getElementById("password").value, function (response) {

    });
}