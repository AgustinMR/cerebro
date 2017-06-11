function blurBackground() {
    "use strict";
    $("#backgr").animate({ opacity: 0.30, }, 4000, function () {
        $("#backgr").animate({ opacity: 1.00, }, 3000, function () {
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
var sim = [];
var env = [];

function sendNum(id, frec, web, tipo) {
    for (i = 0; i < sim.length; i++) {
        if (sim[i] === id) {
            setTimeout(function () {
                console.log("Id: " + id + "," + frec + "," + web);
                var medida = 0;
                if (document.getElementById("desde" + id).value !== "" && document.getElementById("hasta" + id).value !== "") {
                    try {
                        var max = Number(document.getElementById("hasta" + id).value) + 1;
                        var min = Number(document.getElementById("desde" + id).value); 
                        var tmp = Math.floor(Math.random() * (max - min));
                        medida = tmp + min;
                    }
                    catch (err) {
                        console.log("Input error");
                    }
                } else {
                    medida = Math.floor((Math.random() * 100) + 1);
                }                
                //alert(medida);
                $.post("https://www.cerebro-frontOffice.com/api/dispositivos?dispositivoId=" + id + "&tipoDeDato=" + tipo + "&medida=" + medida +"&imagenId=", function (res) {
                    alert(res);
                });
                sendNum(id, frec, web, tipo);
            }, frec * 1000);
        }        
    }
}

function newDispositivoNumerico(dispositivo) {
    "use strict";
    var bool = true;
    for (var i = 0; i < sim.length; i++) {
        //alert(sim[i] +" "+ dispositivo.Id);
        if (sim[i] === dispositivo.Id) {
            bool = false;
        }
    }

    if (bool) {
        sim[sim.length] = dispositivo.Id;
        $.get("https://www.cerebro-serviceLayer.com/api/tipos/" + dispositivo.tipo, function (res) {
            if (res !== null) {
                var frec = res.frecuenciaLectura;
                var web = res.uriWebService;
                //alert(frec + " " + web);

                var segments = document.createElement("div");
                segments.className = "ui segments";
                segments.id = "dispositivo" + dispositivo.Id;
                var segment1 = document.createElement("div");
                segment1.className = "ui secondary grey segment";
                var segment2 = document.createElement("div");
                segment2.className = "ui segment";
                var segment3 = document.createElement("div");
                segment3.className = "ui right aligned segment";
                // ****************** segment 1 **********************//
                var h4_1 = document.createElement("h4");
                h4_1.className = "ui left aligned header w3-left";
                h4_1.style.marginTop = "-10px";
                h4_1.innerHTML = dispositivo.municipalidad;
                var h4_2 = document.createElement("h4");
                h4_2.className = "ui left aligned header w3-left w3-text-cerebro-red";
                h4_2.style.marginTop = "-10px";
                h4_2.style.marginLeft = "7px";
                h4_2.innerHTML = dispositivo.nombre;
                var button = document.createElement("button");
                button.className = "ui icon button very small compact w3-right";
                button.style.marginTop = "-14px";
                button.style.marginRight = "-14px";
                button.addEventListener("click", function () {
                    for (var h = 0; h < sim.length; h++) {
                        if (sim[h] === dispositivo.Id) {
                            //alert(dispositivo.Id);
                            sim[h] = 0;
                        }
                    }
                    for (var f = 0; f < env.length; f++) {
                        if (env[f] === dispositivo.Id) {
                            //alert(dispositivo.Id);
                            env[f] = 0;
                        }
                    }
                    document.getElementById("main").removeChild(segments);
                });
                var i1 = document.createElement("i");
                i1.className = "remove icon w3-text-cerebro-red";
                button.appendChild(i1);
                segment1.appendChild(h4_1);
                segment1.appendChild(h4_2);
                segment1.appendChild(button);
                // ****************** segment 2 **********************//
                var divInput1 = document.createElement("div");
                divInput1.className = "ui labeled input";
                var label1 = document.createElement("div");
                label1.className = "ui label";
                label1.innerHTML = "Desde:";
                var input1 = document.createElement("input");
                input1.placeholder = "datos comenzando...";
                input1.type = "text";
                input1.id = "desde" + dispositivo.Id;
                divInput1.appendChild(label1);
                divInput1.appendChild(input1);
                var h4_3 = document.createElement("h4");
                h4_3.className = "ui vertical divider text header";
                h4_3.innerHTML = "Datos a enviar";
                var divInput2 = document.createElement("div");
                divInput2.className = "ui labeled input w3-right";
                var label2 = document.createElement("div");
                label2.className = "ui label";
                label2.innerHTML = "Hasta:";
                var input2 = document.createElement("input");
                input2.placeholder = "datos hasta...";
                input2.type = "text";
                input2.id = "hasta" + dispositivo.Id;
                divInput2.appendChild(label2);
                divInput2.appendChild(input2);
                segment2.appendChild(divInput1);
                segment2.appendChild(h4_3);
                segment2.appendChild(divInput2);
                // ****************** segment 3 **********************//
                var divPlay = document.createElement("div");
                divPlay.className = "ui inverted icon buttons";
                var play = document.createElement("button");
                play.className = "ui button";
                play.addEventListener("click", function () {
                    var t = true;
                    for (var j = 0; j < env.length; j++) {
                        if (env[j] === dispositivo.Id) {
                            t = false;
                        }
                    }
                    if (t) {
                        env[env.length] = dispositivo.Id;
                        sendNum(dispositivo.Id, frec, web, "Numerico");
                    }
                });
                var iPlay = document.createElement("i");
                iPlay.className = "play green icon";
                play.appendChild(iPlay);
                divPlay.appendChild(play);
                segment3.appendChild(divPlay);

                segments.appendChild(segment1);
                segments.appendChild(segment2);
                segments.appendChild(segment3);
                document.getElementById("main").insertBefore(segments, document.getElementById("main").firstChild);
            }
        });
    }    
}
function newDispositivoTexto(dispositivo, tipo, x) {
    "use strict";
    var segments = document.createElement("div");
    segments.className = "ui segments";
    segments.id = "dispositivo" + x;
    var segment1 = document.createElement("div");
    segment1.className = "ui secondary grey segment";
    var segment2 = document.createElement("div");
    segment2.className = "ui segment";
    var segment3 = document.createElement("div");
    segment3.className = "ui right aligned segment";
    // ****************** segment 1 **********************//
    var h4_1 = document.createElement("h4");
    h4_1.className = "ui left aligned header w3-left";
    h4_1.style.marginTop = "-10px";
    h4_1.innerHTML = dispositivo.municipalidad;
    var h4_2 = document.createElement("h4");
    h4_2.className = "ui left aligned header w3-left w3-text-cerebro-red";
    h4_2.style.marginTop = "-10px";
    h4_2.style.marginLeft = "7px";
    h4_2.innerHTML = dispositivo.nombre;
    var button = document.createElement("button");
    button.className = "ui icon button very small compact w3-right";
    button.style.marginTop = "-14px";
    button.style.marginRight = "-14px";
    button.addEventListener("click", function () {
        document.getElementById("main").removeChild(segments);
    });
    var i1 = document.createElement("i");
    i1.className = "remove icon w3-text-cerebro-red";
    button.appendChild(i1);
    segment1.appendChild(h4_1);
    segment1.appendChild(h4_2);
    segment1.appendChild(button);
    // ****************** segment 2 **********************//
    var h4_3 = document.createElement("h4");
    h4_3.className = "ui horizontal divider text header";
    h4_3.innerHTML = "Datos a enviar";
    var field1 = document.createElement("div");
    field1.className = "field";
    var divCheck1 = document.createElement("div");
    divCheck1.className = "ui slider checkbox";
    var input1 = document.createElement("input");
    input1.name = "radio" + x;
    input1.checked = "checked";
    input1.type = "radio";
    divCheck1.appendChild(input1);
    var label1 = document.createElement("label");
    label1.innerHTML = "Texto ingresado";
    divCheck1.appendChild(label1);
    field1.appendChild(divCheck1);
    var field2 = document.createElement("div");
    field2.className = "field";
    var divCheck2 = document.createElement("div");
    divCheck2.className = "ui slider checkbox";
    var input2 = document.createElement("input");
    input2.name = "radio" + x;
    input2.type = "radio";
    divCheck2.appendChild(input2);
    var label2 = document.createElement("label");
    label2.innerHTML = "Texto aleatorio con palabras claves";
    divCheck2.appendChild(label2);
    field2.appendChild(divCheck2);
    var divInput = document.createElement("div");
    divInput.className = "ui labeled input fluid w3-margin-top";
    var label3 = document.createElement("div");
    label3.className = "ui label";
    label3.innerHTML = "Texto:";
    var input3 = document.createElement("input");
    input3.type = "text";
    input3.placeholder = "texto a ser enviado por el dispositivo simulado...";
    divInput.appendChild(label3);
    divInput.appendChild(input3);
    var select = document.createElement("select");
    select.className = "ui dropdown search fluid w3-margin-top";
    select.multiple = "true";
    var option = document.createElement("option");
    option.value = "";
    option.innerHTML = "palabras claves a ser enviadas junto con texto aleatorio...";
    option.selected = "true";
    option.disabled = "true";
    select.appendChild(option);
    segment2.appendChild(h4_3);
    segment2.appendChild(divCheck1);
    segment2.appendChild(divCheck2);
    segment2.appendChild(divInput);
    segment2.appendChild(select);
    //****************** segment 3 **********************//
    var divPlay = document.createElement("div");
    divPlay.className = "ui inverted icon buttons";
    var play = document.createElement("button");
    play.className = "ui button";
    play.addEventListener("click", function () {
        alert(dispositivo.Id);
    });
    var iPlay = document.createElement("i");
    iPlay.className = "play green icon";
    play.appendChild(iPlay);
    divPlay.appendChild(play);
    segment3.appendChild(divPlay);

    segments.appendChild(segment1);
    segments.appendChild(segment2);
    segments.appendChild(segment3);
    document.getElementById("main").insertBefore(segments, document.getElementById("main").firstChild);
}

function newDispositivoImagen(dispositivo, tipo, x) {
    "use strict";
    var segments = document.createElement("div");
    segments.className = "ui segments";
    segments.id = "dispositivo" + x;
    var segment1 = document.createElement("div");
    segment1.className = "ui secondary grey segment";
    var segment2 = document.createElement("div");
    segment2.className = "ui segment";
    var segment3 = document.createElement("div");
    segment3.className = "ui right aligned segment";
    // ****************** segment 1 **********************//
    var h4_1 = document.createElement("h4");
    h4_1.className = "ui left aligned header w3-left";
    h4_1.style.marginTop = "-10px";
    h4_1.innerHTML = dispositivo.municipalidad;
    var h4_2 = document.createElement("h4");
    h4_2.className = "ui left aligned header w3-left w3-text-cerebro-red";
    h4_2.style.marginTop = "-10px";
    h4_2.style.marginLeft = "7px";
    h4_2.innerHTML = dispositivo.nombre;
    var button = document.createElement("button");
    button.className = "ui icon button very small compact w3-right";
    button.style.marginTop = "-14px";
    button.style.marginRight = "-14px";
    button.addEventListener("click", function () {
        document.getElementById("main").removeChild(segments);
    });
    var i1 = document.createElement("i");
    i1.className = "remove icon w3-text-cerebro-red";
    button.appendChild(i1);
    segment1.appendChild(h4_1);
    segment1.appendChild(h4_2);
    segment1.appendChild(button);
    // ****************** segment 2 **********************//
    var h4_3 = document.createElement("h4");
    h4_3.className = "ui horizontal divider text header";
    h4_3.innerHTML = "Imagenes a enviar";
    var span = document.createElement("span");
    span.className = "ui horizontal divider";
    var i = document.createElement("i");
    i.className = "ui circular add green link icon";
    span.appendChild(i);
    var list = document.createElement("div");
    list.className = "ui middle aligned divided list";
    segment2.appendChild(h4_3);
    segment2.appendChild(span);
    segment2.appendChild(list);
    //****************** segment 3 **********************//
    var divPlay = document.createElement("div");
    divPlay.className = "ui inverted icon buttons";
    var play = document.createElement("button");
    play.className = "ui button";
    play.addEventListener("click", function () {
        sendNum(dispositivo.Id);
    });
    var iPlay = document.createElement("i");
    iPlay.className = "play green icon";
    play.appendChild(iPlay);
    divPlay.appendChild(play);
    segment3.appendChild(divPlay);
    segments.appendChild(segment1);
    segments.appendChild(segment2);
    segments.appendChild(segment3);
    document.getElementById("main").insertBefore(segments, document.getElementById("main").firstChild);
}