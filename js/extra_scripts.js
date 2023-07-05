
const flagsToogle = document.querySelectorAll('.flag-toogle-switch');

for (const f of flagsToogle) {
    f.setAttribute('id', 'f-' + f.dataset.function);
}
const funcLibras = getCookie('libras');
if (funcLibras != "") {
    enableFunction('libras', funcLibras);
    if (funcLibras == 'enable') document.querySelector('#f-libras').classList.add('checked');
}

const funcDislexia = getCookie('dislexia');
if (funcDislexia != "") {
    enableFunction('dislexia', funcDislexia);
    if (funcDislexia == 'enable') document.querySelector('#f-dislexia').classList.add('checked');
}

var currentViewMode = 'normal';

function enableFunction(func, action) {
    setCookie(func, action);

    if (func == 'libras') {
        if (action == 'enable') {
            $('#js-btn-libras').show();
        } else {
            $('#js-btn-libras').hide();
        }
    }

    if (func === 'dislexia') {
        if (action == 'enable') {
            document.querySelector('body').classList.add('opendyslexic');
        } else {
            document.querySelector('body').classList.remove('opendyslexic');
        }
    }
    if (func === 'contraste') {
        if (action == 'enable') {
            document.querySelector('#container-general').classList.add('enable-contraste');
            document.querySelector('.container-pre-footer').classList.add('enable-contraste');
            document.querySelector('footer').classList.add('enable-contraste');

            document.querySelector('#container-general').classList.remove('enable-brilho');
            document.querySelector('.container-pre-footer').classList.remove('enable-brilho');
            document.querySelector('footer').classList.remove('enable-brilho');
        } else {
            document.querySelector('#container-general').classList.remove('enable-contraste');
            document.querySelector('.container-pre-footer').classList.remove('enable-contraste');
            document.querySelector('footer').classList.remove('enable-contraste');
        }
    }
    if (func === 'brilho') {
        if (currentViewMode == 'normal') {
            alert('alo');
        }
        if (action == 'enable') {
            document.querySelector('#container-general').classList.add('enable-brilho');
            document.querySelector('.container-pre-footer').classList.add('enable-brilho');
            document.querySelector('footer').classList.add('enable-brilho');

            document.querySelector('#container-general').classList.remove('enable-contraste');
            document.querySelector('.container-pre-footer').classList.remove('enable-contraste');
            document.querySelector('footer').classList.remove('enable-contraste');
            currentViewMode = 'brilho';
        } else {
            document.querySelector('#container-general').classList.remove('enable-brilho');
            document.querySelector('.container-pre-footer').classList.remove('enable-brilho');
            document.querySelector('footer').classList.remove('enable-brilho');
            currentViewMode = 'normal';
        }
    }

    if (func === 'dark-mode') {
        if (currentViewMode == 'normal') {
            alert('oi');
        }
        if (action == 'enable') {
            document.body.classList.add('enable-dark-mode');
            currentViewMode = 'dark';
        } else {
            document.body.classList.remove('enable-dark-mode');
            currentViewMode = 'normal';
        }
    }
}

function addDias(e, t) {
    let o = new Date(e);
    return o.setDate(o.getDate() + t), o;
}
function setCookie(cname, cvalue, exdays) {
    const d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    let expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}
function setCookie2(e, t) {
    let o = new Date(new Date());
    (data = addDias(o, 365)), (data = data.toGMTString()), (t = encodeURI(t)), (document.cookie = e + "=" + t + "; expires=" + data + "; path=/");
}
function getCookie(cname) {
    let name = cname + "=";
    let ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}
function getCookie2(e) {
    let t = " " + e + "=";
    let o = document.cookie;
    console.log(o.indexOf(t));
    console.log(o.substr(o.indexOf(t), o.length));
    return -1 != o.indexOf(t) && (-1 != (o = o.substr(o.indexOf(t), o.length)).indexOf(";") && (o = o.substr(0, o.indexOf(";"))), (o = o.split("=")[1]), decodeURI(o));
}
function getCookie3(e) {
    let t = " " + e + "=";
    let o = document.cookie;
    let a = o.split('=');
    let k = a[0];
    let v = a[1];
    if (e == k) {
        return v;
    }
    return false;
}
function deleteCookie(e) {
    var t = new Date() - 365;
    (t = t.toGMTString()), (document.cookie = e + "=; expires=" + t + "; path=/");
}


var hg_color = 'highlighter-a';

// (function ($) {
//     $.fn.highlighter = function (options) {
//         var settings = $.extend({
//             highlighted: "highlighter"
//         }, options);
//         var getSelText = function () {
//             var sel = window.getSelection ? window.getSelection() : document.selection.createRange(); // FF : IE
//             if (sel.getRangeAt) {
//                 var range = sel.getRangeAt(0);
//                 var newNode = document.createElement("span");
//                 newNode.setAttribute('class', hg_color);
//                 range.surroundContents(newNode);
//             } else {
//                 sel.pasteHTML('<span class="' + hg_color + '">' + sel.htmlText + '</span>');
//             }
//         }

//         return this.each(function () {
//             var flag = 0,
//                 element = this;
//             element.addEventListener("mousedown", function () {
//                 flag = 0;
//             }, false);
//             element.addEventListener("mousemove", function () {
//                 flag = 1;
//             }, false);
//             element.addEventListener("mouseup", function () {
//                 if (flag === 0) {
//                     console.log("click");
//                 } else if (flag === 1) {
//                     getSelText();
//                 }
//             }, false);
//         });
//     };
// }(jQuery));

(function ($) {
    $.fn.highlighter = function (options) {
        var settings = $.extend({
            highlighted: "highlighter"
        }, options);

        var getSelText = function () {
            var sel = window.getSelection ? window.getSelection() : document.selection.createRange(); // FF : IE
            if (sel.getRangeAt) {
                var range = sel.getRangeAt(0);
                var newNode = document.createElement("span");
                newNode.setAttribute('class', hg_color);
                console.log(hg_color)
                range.surroundContents(newNode);
            } else {
                sel.pasteHTML('<span class="' + hg_color + '">' + sel.htmlText + '</span>');
            }
        };

        var removeHighlightSelected = function() {
            var sel = window.getSelection ? window.getSelection() : document.selection.createRange(); // FF : IE
            if (sel.anchorNode != null) {
                var parent = $(sel.anchorNode.parentElement);
                if (parent.hasClass('highlighter-y')) {
                    parent.replaceWith(parent.text());
                }
            }
        };

        return this.each(function () {
            var flag = 0,
                element = this;
            element.addEventListener("mousedown", function () {
                flag = 0;
            }, false);
            element.addEventListener("mousemove", function () {
                flag = 1;
            }, false);
            element.addEventListener("mouseup", function () {
                if (flag === 0) {
                    console.log("click");
                } else if (flag === 1) {
                    getSelText();
                }
            }, false);
        });
    };

    $(document).ready(function() {
        var hg_color = '';
        var hg_color_paused = false;
        var last_active_hg_el = null;
    
        var style = '<style type="text/css">' +
            '.highlighter { background-color: #FFFFFF00; }' +
            '.highlighter { background-color: #FFFFFF00; }' +
            '</style>';
    
        $('html > head').append(style);
    
        $('.highlighter-color').click(function() {
            if (!hg_color_paused) {
                $('.highlighter-a').contents().unwrap();
                restoreHLCcolors();
                hg_color = $(this).data('color');
                last_active_hg_el = this;
                $(".highlight-target").highlighter({ highlighted: hg_color });
                $('.highlighter-color').removeClass('hg-active');
                $(this).addClass('hg-active');
            }
        });
    
        $('.remove-highlight').on('click', function() {
            removeHighlightSelected();
        });
    
        function restoreHLCcolors() {
            $('.highlighter-color').each(function() {
                $(this).addClass($(this).data('color'));
            });
        }
    });
}(jQuery));


$(".highlight-target").highlighter({ highlighted: hg_color });

function limpaHL() {
    $(".highlighter-y").contents().unwrap();
    $(".highlighter-g").contents().unwrap();
    $(".highlighter-a").contents().unwrap();
    $(".highlighter-b").contents().unwrap();
    $(".highlighter-s").contents().unwrap();
}

function restoreHLCcolors() {
    // $('.highlighter').css('background', 'yellow');
    $('.highlighter-y').css('background', 'yellow');
    $('.highlighter-y').css('color', '#222');
    $('.highlighter-g').css('background', '#6bb866');
    $('.highlighter-b').css('background', '#61c0bc');
    $('.highlighter-s').css('background', '#e6791f');
    $('.highlighter-t').css('background', 'transparent');
}


function changeHLC(colorName, el) {

    $('.remove-highlight').on('click', function() {
        removeHighlightSelected();
    });

    // Remove as marcações definitivamente
    if (colorName == '#2') {
        hg_color = 'highlighter-a';
        $('.highlighter-a').contents().unwrap();
        $('.highlighter-y').contents().unwrap();
        $('.highlighter-a').contents().unwrap();
        $('.highlighter-g').contents().unwrap();
        $('.highlighter-b').contents().unwrap();
        $('.highlighter-s').contents().unwrap();
        last_active_hg_el = el;
        $(".highlight-target").highlighter({ highlighted: hg_color });
        $('.highlighter-color').removeClass('hg-active');
        $(el).addClass('hg-active');
    }

    else if (colorName =="#3") {
        $(document).ready(function () {
            function removeHighlightSelected() {
                var sel = window.getSelection ? window.getSelection() : document.selection.createRange(); // FF : IE
                if (sel.anchorNode != null) {
                    var parent = $(sel.anchorNode.parentElement);
                    if (parent.hasClass('highlighter')) {
                        parent.replaceWith(parent.text());
                    }
                }
            }
        
            // Adiciona um listener de evento de clique ao botão "Remover Marcação"
            $('#btn-remover-marcacao').on('click', function () {
                removeHighlightSelected();
            });
        });
    }
    // Pausa as marcações
    else if (colorName == '#4') {
        $('.highlighter-a').contents().unwrap();
        if (hg_color_paused) {
            hg_color_paused = false;
            hg_color = hg_color_before_pause;
            restoreHLCcolors();
            $(".highlight-target").highlighter({ highlighted: hg_color });
            //$(el).removeClass('hg-active');
            $('.highlighter-color').removeClass('hg-active');
            $(last_active_hg_el).addClass('hg-active');

        } else {
            hg_color_paused = true;
            hg_color_before_pause = hg_color;
            hg_color = 'highlighter-a';
            // $('.highlighter').css('background', 'transparent');
            // $('.highlighter-y').css('background', 'transparent');
            // $('.highlighter-y').css('color', 'inherit');
            // $('.highlighter-g').css('background', 'transparent');
            // $('.highlighter-b').css('background', 'transparent');
            // $('.highlighter-s').css('background', 'transparent');
            //last_active_hg_el = el;
            $(".highlight-target").highlighter({ highlighted: hg_color });
            $('.highlighter-color').removeClass('hg-active');
            $(el).addClass('hg-active');
        }
    }
    // Muda as cores
    else if (colorName == '#eae13a') {
        hg_color_paused = false;
        hg_color = 'highlighter-y';
        $('.highlighter-a').contents().unwrap();
        restoreHLCcolors();
        last_active_hg_el = el;
        $(".highlight-target").highlighter({ highlighted: hg_color });
        $('.highlighter-color').removeClass('hg-active');
        $(el).addClass('hg-active');
    }

    else if (colorName == 'transparent') {
        hg_color_paused = false;
        hg_color = 'highlighter-t';
        $('.highlighter-t').contents().unwrap();
        restoreHLCcolors();
        last_active_hg_el = el;
        $(".highlight-target").highlighter({ highlighted: hg_color });
        $('.highlighter-color').removeClass('hg-active');
        $(el).addClass('hg-active');
    }

    else if (colorName == '#6bb866') {
        hg_color_paused = false;
        hg_color = 'highlighter-g';
        $('.highlighter-a').contents().unwrap();
        restoreHLCcolors();
        last_active_hg_el = el;
        $(".highlight-target").highlighter({ highlighted: hg_color });
        $('.highlighter-color').removeClass('hg-active');
        $(el).addClass('hg-active');
    }

    else if (colorName == '#61c0bc') {
        hg_color_paused = false;
        hg_color = 'highlighter-b';
        $('.highlighter-a').contents().unwrap();
        restoreHLCcolors();
        last_active_hg_el = el;
        $(".highlight-target").highlighter({ highlighted: hg_color });
        $('.highlighter-color').removeClass('hg-active');
        $(el).addClass('hg-active');
    }

    else if (colorName == '#e6791f') {
        hg_color_paused = false;
        hg_color = 'highlighter-s';
        $('.highlighter-a').contents().unwrap();
        restoreHLCcolors();
        last_active_hg_el = el;
        $(".highlight-target").highlighter({ highlighted: hg_color });
        $('.highlighter-color').removeClass('hg-active');
        $(el).addClass('hg-active');
    }

}

function abreMarcaTexto() {
    var subMenu = document.querySelector('.botoes');
    if (subMenu.style.display === 'none') {
    subMenu.style.display = 'flex';
    document.querySelector('.marcacao').style.backgroundColor = '#777';
    document.querySelector('.marcacao').style.width = '260px';
    } else {
    subMenu.style.display = 'none';
    document.querySelector('.marcacao').style.backgroundColor = 'unset';
    document.querySelector('.marcacao').style.width = '70px';
    }
}

function salvarResposta() {
    // recupera os valores dos campos do formulário
    var score = document.querySelector('input[name="score"]:checked').value;
    var comentario = document.querySelector('input[name="comentario"]').value;
  
    // salva os valores em cookies
    document.cookie = "score=" + score;
    document.cookie = "comentario=" + comentario;
  
    // retorna "true" para enviar o formulário normalmente
    return true;
  }

  function salvarResposta() {
    // recupera os valores dos campos do formulário
    var score = document.querySelector('input[name="score"]:checked').value;
    var comentario = document.querySelector('input[name="comentario"]').value;
  
    // salva os valores em cookies
    document.cookie = "score=" + score;
    document.cookie = "comentario=" + comentario;
  
    // retorna "true" para enviar o formulário normalmente
    return true;
  }