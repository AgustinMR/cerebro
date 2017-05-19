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


(function (d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) return;
    js = d.createElement(s); js.id = id;
    js.src = "//connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));

// Here we run a very simple test of the Graph API after login is
// successful.  See statusChangeCallback() for when this call is made.
function testAPI() {
    console.log('Welcome!  Fetching your information.... ');
    FB.api('/me', function (response) {
        console.log('Successful login for: ' + response.name);
        document.getElementById('status').innerHTML =
            'Thanks for logging in, ' + response.name + '!';
    });
}
function registrarFacebook() {
    FB.login(function (response) {
        if (response.authResponse) {
            console.log('Welcome!  Fetching your information.... ');
            FB.api('/me', function (response) {
                console.log('Good to see you, ' + response.name + '.');
            });
        } else {
            console.log('User cancelled login or did not fully authorize.');
        }
    });
}