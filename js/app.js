var calculadora = {
    teclas: document.querySelectorAll('.tecla'),
    pantalla: document.getElementById('display'),
    contenido: "",
    num1: 0,
    num2: 0,
    num3: 0,
    signo: "",
    resultado: 0,
    teclaigual: false,


    init: (function() {
        this.accionTeclas();
        this.calcular();
    }),

    accionTeclas: function() {
        for (var i = 0; i < this.teclas.length; i++) {
            this.teclas[i].onmouseover = this.aumentoTecla;
            this.teclas[i].onmouseleave = this.achicaTecla;
        }
    },

    aumentoTecla: function(evento) {
        calculadora.accionAumentoTecla(evento.target)
    },

    achicaTecla: function(evento) {
        calculadora.accionAchicaTecla(evento.target)
    },

    accionAumentoTecla(el) {
        numteclas = el.id;
        if (numteclas == "0" || numteclas == "1" || numteclas == "2" || numteclas == "3" || numteclas == "igual" || numteclas == "punto") {
            el.style.width = "28%";
            el.style.height = "61.91px";
        } else if (numteclas == "mas") {
            el.style.width = "89%";
            el.style.height = "99%";
        } else {
            el.style.width = "21%";
            el.style.height = "61.91px";
        }
    },


    accionAchicaTecla(el) {
        numteclas = el.id;
        if (numteclas == "0" || numteclas == "1" || numteclas == "2" || numteclas == "3" || numteclas == "igual" || numteclas == "punto") {
            el.style.width = "29%";
            el.style.height = "62.91px";
        } else if (numteclas == "mas") {
            el.style.width = "90%";
            el.style.height = "100%";
        } else {
            el.style.width = "22%";
            el.style.height = "62.91px";
        }
    },

    calcular: function() {
        document.getElementById('0').addEventListener('click', function() { calculadora.agregarNumero('0'); });
        document.getElementById('1').addEventListener('click', function() { calculadora.agregarNumero('1'); });
        document.getElementById('2').addEventListener('click', function() { calculadora.agregarNumero('2'); });
        document.getElementById('3').addEventListener('click', function() { calculadora.agregarNumero('3'); });
        document.getElementById('4').addEventListener('click', function() { calculadora.agregarNumero('4'); });
        document.getElementById('5').addEventListener('click', function() { calculadora.agregarNumero('5'); });
        document.getElementById('6').addEventListener('click', function() { calculadora.agregarNumero('6'); });
        document.getElementById('7').addEventListener('click', function() { calculadora.agregarNumero('7'); });
        document.getElementById('8').addEventListener('click', function() { calculadora.agregarNumero('8'); });
        document.getElementById('9').addEventListener('click', function() { calculadora.agregarNumero('9'); });
        document.getElementById('on').addEventListener('click', function() { calculadora.borrarPantalla(); });
        document.getElementById('sign').addEventListener('click', function() { calculadora.agregarSigno(); });
        document.getElementById('punto').addEventListener('click', function() { calculadora.agregarPunto(); });
        document.getElementById('mas').addEventListener('click', function() { calculadora.agregarOperador("+"); });
        document.getElementById('menos').addEventListener('click', function() { calculadora.agregarOperador("-"); });
        document.getElementById('por').addEventListener('click', function() { calculadora.agregarOperador("*"); });
        document.getElementById('dividido').addEventListener('click', function() { calculadora.agregarOperador("/"); });
        document.getElementById('igual').addEventListener('click', function() { calculadora.agregarResultado(); });
    },

    agregarNumero: function(numero) {
        if (this.contenido.length < 8) {
            if (this.contenido == "0") {
                this.contenido = ""
                this.contenido = this.contenido + numero;
            } else {
                this.contenido = this.contenido + numero;
            }
        }
        this.textoPantalla()

    },

    borrarPantalla: function() {
        this.contenido = "0";
        this.num1 = 0;
        this.num2 = 0;
        this.num3 = 0;
        this.resultado = 0;
        this.signo = "",
            this.textoPantalla()
    },

    agregarSigno: function() {
        if (this.contenido != "0") {
            if (this.contenido.charAt(0) == "-") {
                this.contenido = this.contenido.slice(1)
            } else {
                this.contenido = "-" + this.contenido;
            }
        }
        this.textoPantalla()
    },

    agregarPunto: function() {
        if (this.contenido.indexOf(".") == -1) {
            if (this.contenido == "") {
                this.contenido = this.contenido + "0.";

            } else {

                this.contenido = this.contenido + "."
            }
            this.textoPantalla();
        }

    },



    agregarOperador: function(oper) {
        this.num1 = parseFloat(this.contenido);
        this.signo = oper;
        this.contenido = "";
        this.teclaigual = false;
        this.textoPantalla();

    },

    agregarResultado: function() {

        if (!this.teclaigual) {
            this.num2 = parseFloat(this.contenido);
            this.num3 = this.num2;
            this.crearOperaciones(this.num1, this.num2, this.signo)
        } else {
            this.crearOperaciones(this.num1, this.num3, this.signo)
        }
        this.num1 = this.resultado;

        if (this.resultado.toString().length < 9) {
            this.contenido = this.resultado.toString();
        } else {
            this.contenido = this.resultado.toString().slice(0, 8);
        }
        this.teclaigual = true;
        this.textoPantalla()

    },

    crearOperaciones: function(num1, num2, op) {
        switch (op) {
            case "+":
                this.resultado = num1 + num2;
                break;
            case "-":
                this.resultado = num1 - num2;
                break;
            case "/":
                this.resultado = num1 / num2;
                break;
            case "*":
                this.resultado = num1 * num2;
                break;

        }
    },

    textoPantalla: function() {
        this.pantalla.innerHTML = this.contenido;
    }

}



calculadora.init()