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

function sendNum(id, frec, web, nombre) {
    for (i = 0; i < sim.length; i++) {
        if (sim[i] === id) {
            setTimeout(function () {
                try {
                    //console.log("Id: " + id + "," + frec + "," + web);
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
                    $.post("https://www.cerebro-frontOffice.com/api/dispositivos?dispositivoId=" + id + "&nombre=" + nombre + "&tipoDeDato=Numerico&medida=" + medida + "&imagenId=", function (res) {
                        console.log(res);
                    });
                    sendNum(id, frec, web, nombre);
                }
                catch (err) {
                    console.log("Div borrado");
                }
            }, frec * 1000);
        }
    }
}

function sendTxt(id, frec, web, nombre) {
    for (i = 0; i < sim.length; i++) {
        if (sim[i] === id) {
            setTimeout(function () {
                try {
                    //console.log("Id: " + id + "," + frec + "," + web);
                    var e = $('#select' + id).dropdown("get value");
                    var medida = "Ok";
                    if (document.getElementById("radio2" + id).checked && e.length > 1) {
                        var max = (e.length - 1);
                        medida = e[Math.floor(Math.random() * (max))];
                    } else if (document.getElementById("radio1" + id).checked && document.getElementById("texto" + id).value != "") {
                        medida = document.getElementById("texto" + id).value;
                    } else {
                        console.log("Debe ingresar al menos una palabra");
                    }
                    //alert(medida);
                    $.post("https://www.cerebro-frontOffice.com/api/dispositivos?dispositivoId=" + id + "&nombre=" + nombre + "&tipoDeDato=Texto&medida=" + medida + "&imagenId=", function (res) {
                        console.log(res);
                    });
                    sendTxt(id, frec, web, nombre);
                }
                catch (err) {
                    console.log("Div borrado");
                }
            }, frec * 1000);
        }
    }
}

function sendVid(id, frec, web, nombre) {
    for (i = 0; i < sim.length; i++) {
        if (sim[i] === id) {
            setTimeout(function () {
                try {
                    var medida = document.getElementById("video" + id).value;
                    $.post("https://www.cerebro-frontOffice.com/api/dispositivos?dispositivoId=" + id + "&nombre=" + nombre + "&tipoDeDato=Video&medida=" + medida + "&imagenId=", function (res) {
                        console.log(res);
                    });
                    sendVid(id, frec, web, nombre);
                }
                catch (err) {
                    console.log("Div borrado");
                }
            }, frec * 1000);
        }
    }
}

function sendImg(id, frec, web, nombre) {
    for (i = 0; i < sim.length; i++) {
        if (sim[i] === id) {
            setTimeout(function () {
                try {
                    //console.log("Id: " + id + "," + frec + "," + web);
                    var num = document.getElementById("inputDiv" + id).getElementsByTagName('FORM').length;
                    var forms = document.getElementById("inputDiv" + id).getElementsByTagName('FORM');
                    //alert(num);
                    var random = Math.floor(Math.random() * (num));
                    if (forms[random][0].files.length !== 0) {
                        jQuery.ajax({
                            url: 'https://www.cerebro-frontOffice.com/api/dispositivos/img',
                            data: new FormData($('form')[random]),
                            cache: false,
                            contentType: false,
                            processData: false,
                            type: 'POST',
                            success: function (data) {
                                var imgID = data;
                                //console.log(imgID);
                                var medida = 0;
                                medida = Math.floor((Math.random() * 100) + 1);
                                //alert(medida);
                                $.post("https://www.cerebro-frontOffice.com/api/dispositivos?dispositivoId=" + id + "&nombre=" + nombre + "&tipoDeDato=Imagen&medida=" + medida + "&imagenId=" + imgID, function (res) {
                                    //console.log(res);
                                });
                                sendImg(id, frec, web, nombre);
                            }
                        });
                    } else {
                        console.log("Falta Imagen");
                    }
                }
                catch (err) {
                    console.log("Div borrado");
                }
            }, frec * 1000);
        }
    }
}


function newDispositivoNumerico(dispositivo) {
    "use strict";
    var bool = true;
    for (var i = 0; i < sim.length; i++) {
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
                var nombre = dispositivo.nombre;

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
                            sim[h] = 0;
                        }
                    }
                    for (var f = 0; f < env.length; f++) {
                        if (env[f] === dispositivo.Id) {
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
                        sendNum(dispositivo.Id, frec, web, nombre);
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
function newDispositivoTexto(dispositivo) {
    "use strict";
    var bool = true;
    for (var i = 0; i < sim.length; i++) {
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
                var nombre = dispositivo.nombre;

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
                            sim[h] = 0;
                        }
                    }
                    for (var f = 0; f < env.length; f++) {
                        if (env[f] === dispositivo.Id) {
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
                var h4_3 = document.createElement("h4");
                h4_3.className = "ui horizontal divider text header";
                h4_3.innerHTML = "Datos a enviar";
                var field1 = document.createElement("div");
                field1.className = "field";
                var divCheck1 = document.createElement("div");
                divCheck1.className = "ui slider checkbox";
                var input1 = document.createElement("input");
                input1.name = "radio" + dispositivo.Id;
                input1.id = "radio1" + dispositivo.Id;
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
                input2.name = "radio" + dispositivo.Id;
                input2.id = "radio2" + dispositivo.Id;
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
                input3.id = "texto" + dispositivo.Id;
                input3.placeholder = "texto a ser enviado por el dispositivo simulado...";
                divInput.appendChild(label3);
                divInput.appendChild(input3);
                var select = document.createElement("select");
                select.id = "select" + dispositivo.Id;
                select.className = "ui dropdown search fluid w3-margin-top";
                select.multiple = true;
                var option = document.createElement("option");
                option.value = "";
                option.innerHTML = "palabras o frases a ser enviadas aleatoreamente...";
                option.selected = "true";
                option.disabled = "true";
                select.appendChild(option);
                segment2.appendChild(h4_3);
                segment2.appendChild(field1);
                segment2.appendChild(field2);
                segment2.appendChild(divInput);
                segment2.appendChild(select);
                //****************** segment 3 **********************//
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
                        sendTxt(dispositivo.Id, frec, web, nombre);
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
                $('.ui.dropdown').dropdown('setting', 'allowAdditions', true);
            }
        });
    }
}

function newDispositivoImagen(dispositivo, tipo, x) {
    "use strict";
    var bool = true;
    for (var i = 0; i < sim.length; i++) {
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
                var nombre = dispositivo.nombre;

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
                            sim[h] = 0;
                        }
                    }
                    for (var f = 0; f < env.length; f++) {
                        if (env[f] === dispositivo.Id) {
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
                var h4_3 = document.createElement("h4");
                h4_3.className = "ui horizontal divider text header";
                h4_3.innerHTML = "Imagenes a enviar";
                var span = document.createElement("span");
                span.className = "ui horizontal divider";
                span.addEventListener("click", function () {
                    var inputDiv = document.getElementById("inputDiv" + dispositivo.Id);

                    var inpDivN = document.createElement("div");

                    var formImpN = document.createElement("form");
                    formImpN.enctype = "multipart/form-data";

                    var impN = document.createElement("input");
                    impN.name = "files";
                    impN.type = "file";

                    inpDivN.appendChild(formImpN);
                    formImpN.appendChild(impN);
                    inputDiv.appendChild(inpDivN);
                });
                var i = document.createElement("i");
                i.className = "ui circular add green link icon";
                span.appendChild(i);
                var list = document.createElement("div");
                list.className = "ui middle aligned divided list";
                list.id = "inputDiv" + dispositivo.Id;

                var inpDiv = document.createElement("div");
                var formImp = document.createElement("form");
                formImp.enctype = "multipart/form-data";
                var imp = document.createElement("input");
                imp.name = "files";
                imp.type = "file";
                inpDiv.appendChild(formImp);
                formImp.appendChild(imp);
                list.appendChild(inpDiv);

                segment2.appendChild(h4_3);
                segment2.appendChild(span);
                segment2.appendChild(list);
                //****************** segment 3 **********************//
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
                        sendImg(dispositivo.Id, frec, web, nombre);
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

function newDispositivoVideo(dispositivo) {
    "use strict";
    var bool = true;
    for (var i = 0; i < sim.length; i++) {
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
                var nombre = dispositivo.nombre;

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
                            sim[h] = 0;
                        }
                    }
                    for (var f = 0; f < env.length; f++) {
                        if (env[f] === dispositivo.Id) {
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
                var h4_3 = document.createElement("h4");
                h4_3.className = "ui horizontal divider text header";
                h4_3.innerHTML = "Datos a enviar";
                var divInput = document.createElement("div");
                divInput.className = "ui labeled input fluid w3-margin-top";
                var label3 = document.createElement("div");
                label3.className = "ui label";
                label3.innerHTML = "Video:";
                var input3 = document.createElement("input");
                input3.type = "text";
                input3.id = "video" + dispositivo.Id;
                input3.placeholder = "url del video a ser enviado por el dispositivo simulado...";
                divInput.appendChild(label3);
                divInput.appendChild(input3);
                segment2.appendChild(divInput);
                //****************** segment 3 **********************//
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
                        sendVid(dispositivo.Id, frec, web, nombre);
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
                $('.ui.dropdown').dropdown('setting', 'allowAdditions', true);
            }
        });
    }
}