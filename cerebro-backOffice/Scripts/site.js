function toggleMenu() {
    if (document.getElementById("menuSmall").style.display == "block") {
        document.getElementById("menuSmall").style.display = "none";
    } else {
        document.getElementById("menuSmall").style.display = "block";
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
        tablinks[i].className = tablinks[i].className.replace(" active w3-text-cerebro-red", "");
    }
    document.getElementById(tab).style.display = "block";
    evt.currentTarget.className += " active w3-text-cerebro-red";
}
function blurBackground() {
    "use strict";
    $("#backgr").animate({ opacity: 0.30, }, 4000, function () {
        $("#backgr").animate({ opacity: 1.00, }, 3000, function () {
            blurBackground();
        });
    });
};