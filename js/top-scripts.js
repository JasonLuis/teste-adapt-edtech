var currentMode = 'normal';

function strReplace(haystack = '', needle, replacement) {
      var temp = haystack.split(needle);
      return temp.join(replacement);
    }
    $(document).ready(function () {
      const f = 'grayscale(0%) brightness(100%) contrast(100%)'
      $('body').children().css('filter', f)
      const filters = $('a.toogle-switch').data('filter', f)
      filters.off().on('click', (e) => {
        const t = $(e.currentTarget)
        const ball = t.find('.toogle-switch-before')
        const back = t.find('.toogle-switch-checked')
        let filter

        if (Math.round(ball.position().left) === 4) {
          

          if (t.data('id') === 'moon') {
            
            if (currentMode == 'normal') {

              gsap.to(ball[0], { left: 24, duration: 0.2 })
              gsap.to(back[0], { backgroundColor: 'rgb(48,48,48)', duration: 0.2 })
              //alert('AQUI pb liga');
              filter = t.data('filter').replace(/grayscale\(\d+\%\)/, 'grayscale(100%)')
              currentMode = 'pb';
            }

          } else if (t.data('id') === 'sun') {
            
            if (currentMode == 'normal') {
              
              gsap.to(ball[0], { left: 24, duration: 0.2 })
              gsap.to(back[0], { backgroundColor: 'rgb(48,48,48)', duration: 0.2 })
              //alert('AQUI dark liga');
              const element = document.body;
              element.classList.toggle("dark-mode");
              currentMode = 'dark';
            }
          }

        } else {
          gsap.to(ball[0], { left: 4, duration: 0.2 })
          gsap.to(back[0], { backgroundColor: '#898989', duration: 0.2 })

          if (t.data('id') === 'moon') {
            
            //alert('AQUI pb desliga');
            filter = t.data('filter').replace(/grayscale\(\d+\%\)/, 'grayscale(0%)')
            currentMode = 'normal';

          } else if (t.data('id') === 'sun') {

            //alert('AQUI dark desliga');
            const element = document.body;
            $(element).removeClass('dark-mode')
            currentMode = 'normal';
          }
        }

        filters.data('filter', filter)
        gsap.to($('body').children(), { filter, duration: 0.2 })

      })

      $('body').removeAttr('style')

      const menubt = $('.dropdown-trigger').data('open', false)
      const menu = $('.nav-menu')

      menubt.off().on('click', () => {
        if (!menubt.data('open')) {
          menubt.data('open', true)
          gsap.fromTo(menu, { display: 'block' }, { autoAlpha: 1, duration: 0.3 })

          $(window).off('pointerdown').on('pointerdown', (e) => {
            const mouseX = e.clientX;
            const mouseY = e.clientY;

            const bounds = menu[0].getBoundingClientRect();

            if (
              mouseX < bounds.x ||
              mouseY < bounds.y ||
              mouseX > bounds.x + bounds.width ||
              mouseY > bounds.y + bounds.height
            ) {
              menuClose()
            }
          })
        }
      })

      function darkMode() {
        const element = document.body;
        element.classList.toggle("dark-mode");
      }
      /*
      function highlightSelection() {
        let selection;

        //Get the selected stuff
        if (window.getSelection) {
          selection = window.getSelection();
        } else if (typeof document.selection != "undefined") {
          selection = document.selection;
        }

        //Get a the selected content, in a range object
        let range = selection.getRangeAt(0);

        //If the range spans some text, and inside a tag, set its css class.
        if (range && !selection.isCollapsed) {
          if (selection.anchorNode.parentNode == selection.focusNode.parentNode) {
            const timestamp = +new Date();
            let span = document.createElement('span');
            span.className = 'highlight';
            span.setAttribute('id', 'ts-' + timestamp);

            const colorHighlight = document.querySelector('body').getAttribute('data-highlighter-color');
            span.setAttribute('style', 'background: ' + colorHighlight + ';');
            span.textContent = selection.toString();
            selection.deleteFromDocument();
            range.insertNode(span);
            //                        range.surroundContents(span);

            const tsId = document.querySelector('#ts-' + timestamp);
            tsId.parentNode.classList.add('has-marked-text');

            let getIdParentNode = tsId.parentNode.getAttribute('id');
            if (getIdParentNode == null) {
              tsId.parentNode.setAttribute('id', timestamp);
              tsId.parentNode.setAttribute('data-timestamp', timestamp);
            }
            getIdParentNode = tsId.parentNode.getAttribute('id');

            const htmlMarked = document.getElementById(getIdParentNode).innerHTML;
            setCookie('highlight-' + getIdParentNode, htmlMarked);
          } else {
            console.log('Você não pode fazer marcações de texto em parágrafos diferentes. " +\n' +
              '                    "Faça as marcações em um parágrafo e havendo a nessecidadade ' +
              'de marcar texto em outro, " +\n' +
              '                    "faça separadamente.');
            alert("Oops!\n\nVocê não pode fazer marcações de texto em parágrafos diferentes. " +
              "Faça as marcações em um parágrafo e havendo a nessecidadade de marcar texto em outro, " +
              "faça separadamente.");
          }
        }
      }

      document.addEventListener('mouseup', event => {

        const getClassHighlighter = document.getElementsByClassName('enable-highlighter');
        if (getClassHighlighter.length > 0) {

          let highlighted = false;
          let selection = window.getSelection();
          let selectedText = selection.toString();
          let startPoint = window.getSelection().getRangeAt(0).startOffset;
          let endPoint = window.getSelection().getRangeAt(0).endOffset;
          let anchorTag = selection.anchorNode.parentNode;
          let focusTag = selection.focusNode.parentNode;

          if (selectedText.length === (endPoint - startPoint)) {
            highlighted = true;

            if (anchorTag.className !== "highlight") {
              highlightSelection();
            } else {
              console.log(selectedText);
              let afterText = selectedText + "<span class = 'highlight'>" + anchorTag.innerHTML.substr(endPoint) + "</span>";
              anchorTag.innerHTML = anchorTag.innerHTML.substr(0, startPoint);
              anchorTag.insertAdjacentHTML('afterend', afterText);
            }

          } else {
            if (anchorTag.className !== "highlight" && focusTag.className !== "highlight") {
              highlightSelection();
              highlighted = true;
            }

          }

          if (anchorTag.className === "highlight" && focusTag.className === 'highlight' && !highlighted) {
            highlighted = true;

            let afterHtml = anchorTag.innerHTML.substr(startPoint);
            let outerHtml = selectedText.substr(afterHtml.length, selectedText.length - endPoint - afterHtml.length);
            let anchorInnerhtml = anchorTag.innerHTML.substr(0, startPoint);
            let focusInnerHtml = focusTag.innerHTML.substr(endPoint);
            let focusBeforeHtml = focusTag.innerHTML.substr(0, endPoint);
            selection.deleteFromDocument();
            anchorTag.innerHTML = anchorInnerhtml;
            focusTag.innerHTml = focusInnerHtml;
            let anchorafterHtml = afterHtml + outerHtml + focusBeforeHtml;
            anchorTag.insertAdjacentHTML('afterend', anchorafterHtml);
          }

          if (anchorTag.className === "highlight" && !highlighted) {
            highlighted = true;
            let Innerhtml = anchorTag.innerHTML.substr(0, startPoint);
            let afterHtml = anchorTag.innerHTML.substr(startPoint);
            let outerHtml = selectedText.substr(afterHtml.length, selectedText.length);
            selection.deleteFromDocument();
            anchorTag.innerHTML = Innerhtml;
            anchorTag.insertAdjacentHTML('afterend', afterHtml + outerHtml);
          }

          if (focusTag.className === 'highlight' && !highlighted) {
            highlighted = true;
            let beforeHtml = focusTag.innerHTML.substr(0, endPoint);
            let outerHtml = selectedText.substr(0, selectedText.length - beforeHtml.length);
            selection.deleteFromDocument();
            focusTag.innerHTml = focusTag.innerHTML.substr(endPoint);
            outerHtml += beforeHtml;
            focusTag.insertAdjacentHTML('beforebegin', outerHtml);


          }
          if (!highlighted) {
            highlightSelection();
          }
          $('.highlight').each(function () {
            if ($(this).html() == '') {
              $(this).remove();
            }
          });
          selection.removeAllRanges();
        }
      });

      let highlighters = document.querySelectorAll('.highlighter-color');
      for (const highlighter of highlighters) {
        highlighter.addEventListener('click', (e) => {
          const current = e.currentTarget;
          const color = current.dataset.color;

          // desativa cores

          for (const highlighterD of highlighters) {
            highlighterD.classList.remove('active');
          }

          current.classList.add('active');

          if (color != '') {
            document.body.classList.add('enable-highlighter');
            document.body.setAttribute('data-highlighter-color', color);

          } else {
            document.body.classList.remove('enable-highlighter');
            document.body.removeAttribute('data-highlighter-color');
          }
        });
      }

      const getClassHighlighter = document.getElementsByClassName('enable-highlighter');
      if (getClassHighlighter.length > 0) {
        console.log('ok');
      }
    */
      const body = document.querySelector('body');
      const flags = document.querySelectorAll('.flag-toogle-switch');
      for (const flag of flags) {
        flag.addEventListener('click', (e) => {
          const current = e.currentTarget;
          const dataFunction = current.dataset.function;

          if (current.classList.contains('checked')) {
            current.classList.remove('checked');
            current.classList.add('unchecked');

            enableFunction(dataFunction, 'disable', current);


            //alert('disable');

          } else {
            current.classList.remove('unchecked');
            current.classList.add('checked');

            if (dataFunction == 'contraste') {

              const flagBrilho = document.querySelector('#f-brilho');
              if (flagBrilho.classList.contains('checked')) {
                flagBrilho.classList.add('unchecked');
              }
            }

            if (dataFunction == 'brilho') {

              const flagContraste = document.querySelector('#f-contraste');
              if (flagContraste.classList.contains('checked')) {
                flagContraste.classList.add('unchecked');
              }
            }

            enableFunction(dataFunction, 'enable', current);
            
            //alert('enable');

          }
        });
      }


      function menuClose() {
        $(window).off('pointerdown')
        gsap.to(menu, {
          autoAlpha: 0, duration: 0.3, onComplete: () => {
            menu.css('display', 'none')
            menubt.data('open', false)
          }
        })
      }


      var maxClickDecreaseFont = 3;
      var maxClickIncreaseFont = 6;
      var clickIncreaseFont = 0;
      var clickDecreaseFont = 0;
      var theFontSize = 1;
      var theLineHeight = 1;

      var div = '#content-1, #capa-modulo',
        contador = 0,
        obj_tratados = [
          div,
          div + ' p',
          div + ' h1',
          div + ' h2',
          div + ' h3',
          div + ' h4',
          div + ' h5',
          div + ' h6',
          'h1',
          'h2',
          'h3',
          'h4',
          'h5',
          'h6',
          'ul',
          'ol',
          '.titulo-cursoi'
        ],
        reset_fonte = [],
        reset_linha = [];
      setDefaultZoom(obj_tratados, reset_fonte, reset_linha, contador);
      $('#a_mais,#a_menos,#a_reset').on('click', function () {
        var id = $(this).attr('id');
        var min = 6;
        var max = 30;

        
        switch (id) {
            case 'a_mais':
              if (clickDecreaseFont > 0) {
                clickDecreaseFont--;
                theFontSize += 0.1;
                theLineHeight += 0.1;
                $('#content-1').css(
                  {'fontSize': theFontSize + 'em', 'lineHeight': theLineHeight + 'em'}
                );
                $('.main-capa').css(
                  {'fontSize': theFontSize + 'em', 'lineHeight': theLineHeight + 'em'}
                );
                $('.bg-final1').css(
                  {'fontSize': theFontSize + 'em', 'lineHeight': theLineHeight + 'em'}
                );
                $('.titulo-cursoi').css(
                  {'fontSize': theFontSize + 'em', 'lineHeight': theLineHeight + 'em'}
                );

              } else if (clickIncreaseFont < maxClickIncreaseFont) {
                clickIncreaseFont++;
                theFontSize += 0.1;
                theLineHeight += 0.1;
                $('#content-1').css(
                  {'fontSize': theFontSize + 'em', 'lineHeight': theLineHeight + 'em'}
                );
                $('.main-capa').css(
                  {'fontSize': theFontSize + 'em', 'lineHeight': theLineHeight + 'em'}
                );
                $('.bg-final1').css(
                  {'fontSize': theFontSize + 'em', 'lineHeight': theLineHeight + 'em'}
                );
                $('.titulo-cursoi').css(
                  {'fontSize': theFontSize + 'em', 'lineHeight': theLineHeight + 'em'}
                );
              }
              break;

            case 'a_menos':
              if (clickIncreaseFont > 0) {
                clickIncreaseFont--;
                theFontSize -= 0.1;
                theLineHeight -= 0.1;
                $('#content-1').css(
                  {'fontSize': theFontSize + 'em', 'lineHeight': theLineHeight + 'em'}
                );
                $('.main-capa').css(
                  {'fontSize': theFontSize + 'em', 'lineHeight': theLineHeight + 'em'}
                );
                $('.bg-final1').css(
                  {'fontSize': theFontSize + 'em', 'lineHeight': theLineHeight + 'em'}
                );
                $('.titulo-cursoi').css(
                  {'fontSize': theFontSize + 'em', 'lineHeight': theLineHeight + 'em'}
                );
              } else if (clickDecreaseFont < maxClickDecreaseFont) {
                clickDecreaseFont++;
                theFontSize -= 0.1;
                theLineHeight -= 0.1;
                $('#content-1').css(
                  {'fontSize': theFontSize + 'em', 'lineHeight': theLineHeight + 'em'}
                );
                $('.main-capa').css(
                  {'fontSize': theFontSize + 'em', 'lineHeight': theLineHeight + 'em'}
                );
                $('.bg-final1').css(
                  {'fontSize': theFontSize + 'em', 'lineHeight': theLineHeight + 'em'}
                );
                $('.titulo-cursoi').css(
                  {'fontSize': theFontSize + 'em', 'lineHeight': theLineHeight + 'em'}
                );
              }
              break;
            case 'a_reset':
              // resetar 
              clickIncreaseFont = 0;
              clickDecreaseFont = 0;
              theFontSize = 1;
              theLineHeight = 1;
              $('#content-1').css(
                {'fontSize': '1em', 'lineHeight': '1em'}
              );
              $('.main-capa').css(
                {'fontSize': '1em', 'lineHeight': '1em'}
              );
              $('.bg-final1').css(
                  {'fontSize': theFontSize + 'em', 'lineHeight': theLineHeight + 'em'}
                );
              $('.titulo-cursoi').css(
                  {'fontSize': theFontSize + 'em', 'lineHeight': theLineHeight + 'em'}
                );
              break;
          }
        
        /*
        for (var i in obj_tratados) {
          var tratados = $(obj_tratados[i]);
          var tamanho_fonte = strReplace(tratados.css('fontSize'), 'px', '');
          //var tamanho_entrelinha = strReplace(tratados.css('lineHeight'), 'px', '');
          switch (id) {
            case 'a_mais':
              
              if (tamanho_fonte <= max && clickIncreaseFont < maxClickIncreaseFont) {
                tamanho_fonte++;
                //clickIncreaseFont++;
                // tamanho entrelinha aumento
                tamanho_entrelinha = (tamanho_fonte * 1.8);
                tamanho_entrelinha++;
                contador++;
              }
              break;
            case 'a_menos':
              if (tamanho_fonte >= min && clickIncreaseFont > 0) {
                tamanho_fonte--;
                //clickIncreaseFont--;
                // tamanho entrelinha redução;
                var val = tamanho_entrelinha - (tamanho_entrelinha * 3 / 100);
                // tamanho_entrelinha = arredondarValor(val);
                tamanho_entrelinha = (tamanho_fonte * 1.8);
                tamanho_entrelinha--;
                contador++;
              }
              break;
            case 'a_reset':
            default:
              // resetar 
              tamanho_fonte = reset_fonte[i];
              tamanho_entrelinha = reset_linha[i];
              break;
          }
          
          tratados.css(
            {
              //'fontSize': tamanho_fonte + 'px'//,
              //'lineHeight': tamanho_entrelinha + 'px'
            }
          );
        }
        */
        //cancel a click event
        return false;
      });

      function setDefaultZoom(obj_tratados, reset_fonte, reset_linha, contador) {
        for (var i in obj_tratados) {
          var tratados = $(obj_tratados[i]);
          if (contador == 0) {
            reset_fonte[i] = strReplace(tratados.css('fontSize'), 'px', '');
            reset_linha[i] = strReplace(tratados.css('lineHeight'), 'px', '');
          }
        }
      }
    });

    window.onscroll = function () { myFunction() };

    function myFunction() {
      var winScroll = document.body.scrollTop || document.documentElement.scrollTop;
      var height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      var scrolled = (winScroll / height) * 100;
      document.getElementById("myBar").style.width = scrolled + "%";
    }







function abrirJanela(pagina, largura, altura) {
      // Definindo centro da tela
      var esquerda = (screen.width - largura) / 2;
      var topo = (screen.height - altura) / 2;
      // Abre a nova janela
      minhaJanela = window.open(pagina, '', 'height=' + altura + ', width=' + largura + ', top=' + topo + ', left=' + esquerda);
    }