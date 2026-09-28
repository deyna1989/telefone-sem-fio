// ==========================================
// MODO CLARO / MODO ESCURO
// ==========================================

const botaoTema = document.getElementById("botao-tema");
const iconeTema = document.getElementById("icone-tema");
const textoTema = document.getElementById("texto-tema");


// Verifica se existe um tema salvo

const temaSalvo = localStorage.getItem("tema");


// Se o usuário já escolheu modo escuro

if (temaSalvo === "escuro") {

    document.body.classList.add("modo-escuro");

    if (iconeTema) {
        iconeTema.textContent = "☀️";
    }

    if (textoTema) {
        textoTema.textContent = "Modo claro";
    }

}


// Caso contrário, mantém o modo claro

else {

    if (iconeTema) {
        iconeTema.textContent = "🌙";
    }

    if (textoTema) {
        textoTema.textContent = "Modo escuro";
    }

}


// Clique no botão de tema

if (botaoTema) {

    botaoTema.addEventListener("click", function () {

        document.body.classList.toggle("modo-escuro");


        const modoEscuro =
            document.body.classList.contains("modo-escuro");


        if (modoEscuro) {

            if (iconeTema) {
                iconeTema.textContent = "☀️";
            }

            if (textoTema) {
                textoTema.textContent = "Modo claro";
            }

            localStorage.setItem("tema", "escuro");

        }


        else {

            if (iconeTema) {
                iconeTema.textContent = "🌙";
            }

            if (textoTema) {
                textoTema.textContent = "Modo escuro";
            }

            localStorage.setItem("tema", "claro");

        }

    });

}



// ==========================================
// MENU MOBILE
// ==========================================

const botaoMenu = document.getElementById("botao-menu");

const menu = document.getElementById("menu");


// Verifica se os elementos existem

if (botaoMenu && menu) {


    // Abrir / fechar menu

    botaoMenu.addEventListener("click", function () {

        menu.classList.toggle("menu-aberto");


        const menuAberto =
            menu.classList.contains("menu-aberto");


        botaoMenu.setAttribute(
            "aria-expanded",
            menuAberto
        );


        // Troca o símbolo

        if (menuAberto) {

            botaoMenu.textContent = "✕";

        }

        else {

            botaoMenu.textContent = "☰";

        }

    });


    // Fecha o menu quando clicar em algum link

    const linksMenu =
        menu.querySelectorAll("a");


    linksMenu.forEach(function (link) {

        link.addEventListener("click", function () {

            menu.classList.remove("menu-aberto");

            botaoMenu.textContent = "☰";

            botaoMenu.setAttribute(
                "aria-expanded",
                "false"
            );

        });

    });

}

// ==========================================
// CARROSSEL DE FOTOS - ENCONTROS
// ==========================================

const carrossel = document.getElementById(
    "carrossel-encontros"
);


if (carrossel) {

    const slides =
        carrossel.querySelectorAll(".slide");

    const indicadores =
        carrossel.querySelectorAll(".indicador");

    const botaoAnterior =
        document.getElementById("carrossel-anterior");

    const botaoProximo =
        document.getElementById("carrossel-proximo");


    let slideAtual = 0;

    let intervalo;


    // ==========================================
    // MOSTRAR SLIDE
    // ==========================================

    function mostrarSlide(numero) {

        slides.forEach(function(slide) {

            slide.classList.remove("ativo");

        });


        indicadores.forEach(function(indicador) {

            indicador.classList.remove("ativo");

        });


        slides[numero].classList.add("ativo");

        indicadores[numero].classList.add("ativo");


        slideAtual = numero;

    }


    // ==========================================
    // PRÓXIMA FOTO
    // ==========================================

    function proximoSlide() {

        let proximo = slideAtual + 1;


        if (proximo >= slides.length) {

            proximo = 0;

        }


        mostrarSlide(proximo);

    }


    // ==========================================
    // FOTO ANTERIOR
    // ==========================================

    function slideAnterior() {

        let anterior = slideAtual - 1;


        if (anterior < 0) {

            anterior = slides.length - 1;

        }


        mostrarSlide(anterior);

    }


    // ==========================================
    // BOTÃO PRÓXIMO
    // ==========================================

    botaoProximo.addEventListener(
        "click",
        function() {

            proximoSlide();

            reiniciarIntervalo();

        }
    );


    // ==========================================
    // BOTÃO ANTERIOR
    // ==========================================

    botaoAnterior.addEventListener(
        "click",
        function() {

            slideAnterior();

            reiniciarIntervalo();

        }
    );


    // ==========================================
    // INDICADORES
    // ==========================================

    indicadores.forEach(
        function(indicador, indice) {

            indicador.addEventListener(
                "click",
                function() {

                    mostrarSlide(indice);

                    reiniciarIntervalo();

                }
            );

        }
    );


    // ==========================================
    // TROCA AUTOMÁTICA
    // ==========================================

    function iniciarIntervalo() {

        intervalo = setInterval(
            proximoSlide,
            5000
        );

    }


    // ==========================================
    // REINICIAR CONTADOR
    // ==========================================

    function reiniciarIntervalo() {

        clearInterval(intervalo);

        iniciarIntervalo();

    }


    // Inicia o carrossel

    iniciarIntervalo();


    // ==========================================
    // PAUSAR AO PASSAR O MOUSE
    // ==========================================

    carrossel.addEventListener(
        "mouseenter",
        function() {

            clearInterval(intervalo);

        }
    );


    carrossel.addEventListener(
        "mouseleave",
        function() {

            iniciarIntervalo();

        }
    );

}

// ==========================================
// VISUALIZAÇÃO DA FOTO EM TELA CHEIA
// ==========================================

const visualizadorFoto = document.getElementById("visualizador-foto");
const fotoAmpliada = document.getElementById("foto-ampliada");
const fecharVisualizador = document.getElementById("fechar-visualizador");

const fotosCarrossel = document.querySelectorAll("#carrossel-encontros .slide img");

fotosCarrossel.forEach(function (foto) {

    foto.addEventListener("click", function () {

        fotoAmpliada.src = foto.src;
        fotoAmpliada.alt = foto.alt;

        visualizadorFoto.classList.add("aberto");

        document.body.style.overflow = "hidden";
    });

});


// Fechar clicando no X

fecharVisualizador.addEventListener("click", function () {

    visualizadorFoto.classList.remove("aberto");

    document.body.style.overflow = "";
});


// Fechar clicando fora da foto

visualizadorFoto.addEventListener("click", function (evento) {

    if (evento.target === visualizadorFoto) {

        visualizadorFoto.classList.remove("aberto");

        document.body.style.overflow = "";
    }

});


// Fechar apertando ESC no computador

document.addEventListener("keydown", function (evento) {

    if (evento.key === "Escape") {

        visualizadorFoto.classList.remove("aberto");

        document.body.style.overflow = "";
    }

});