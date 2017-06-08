function blurBackground(){
	"use strict";
	$( "#backgr" ).animate({ opacity: 0.30, }, 4000, function() { 
		$( "#backgr" ).animate({ opacity: 1.00, }, 3000, function() { 
			blurBackground(); 
		});
	});
};
function toggleTipoUsuario() {
	"use strict";
    if (document.getElementById("visitante").style.display === "block") {
        document.getElementById("visitante").style.display = "none";
        document.getElementById("operador").style.display = "block";
    } else {
        document.getElementById("visitante").style.display = "block";
        document.getElementById("operador").style.display = "none";
    }
}