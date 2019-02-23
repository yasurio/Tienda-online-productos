(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Cart = /** @class */ (function () {
    function Cart(data) {
        this.carrito = document.querySelector('.at-shopping-cart');
        this.anchuraCarrito = this.carrito.getBoundingClientRect().width;
        this.currentCart = [];
        this.totalPrecio = 0;
        this.totalItems = 0;
        this.data = data;
    }
    // Funcionalidad para abrir/cerrar el carrito.
    Cart.prototype.toggleCart = function () {
        var _this = this;
        this.carrito.querySelector('.at-shopping-cart-products').addEventListener('click', function (event) { return _this.handlerToggle(event); });
    };
    Cart.prototype.handlerToggle = function (event) {
        event.preventDefault();
        var isOpen = this.carrito.classList.contains('open');
        if (isOpen) {
            this.carrito.classList.remove('open');
            this.carrito.style.right = '-' + this.anchuraCarrito + 'px';
        }
        else {
            this.carrito.classList.add('open');
            this.carrito.style.right = 5 + 'px';
        }
    };
    // Función que recorre el array de productos y llama a createArticles por cada posicion del array.
    Cart.prototype.loadArticles = function (articles) {
        // Vacia el ul (padre comun de ariculos)
        document.querySelector('#contenedorArticulos').innerHTML = '';
        // Reccorre el array pasado por parametros y llama a createArticles pasando cada articulo y el indice del array.
        for (var i = 0; i < articles.length; i++) {
            this.createArticle(articles[i], i);
        }
    };
    // Función que se encarga de crear articulos a traves de un template string y luego los añade al padre comun (ul).
    Cart.prototype.createArticle = function (article, index) {
        var _this = this;
        // Crea el elemento articulo a traves del template string.
        var padre = document.querySelector('#contenedorArticulos');
        var hijo = document.createElement('div');
        hijo.innerHTML = "\n            <article class=\"at-article mb-4\">\n                <div class=\"card\">\n                    <img src=\"" + article.imagen + "\" class=\"card-img-top at-article-img\" alt=\"...\">\n                    <div class=\"card-body\">\n                        <h5 class=\"card-title\">" + article.descripcion + "</h5>\n                        <p class=\"card-text\">" + article.ean13 + "</p>\n                        <div class=\"d-flex justify-content-between\">\n                            <div class=\"btn-group\" role=\"group\" aria-label=\"Basic example\">\n                                <a href=\"#\" class=\"btn btn-outline-danger\">Ver</a>\n                                <a href=\"#\" class=\"btn btn-outline-danger js-addCart\" id=\"addCart-" + index + "\">Al carrito</a>\n                            </div>\n                            <span class=\"card-text\"><small class=\"text-muted\">" + article.precio + "</small></span>\n                        </div>\n                    </div>\n                </div>\n            </article>\n        ";
        // Añade al hijo creado la clase del grid.
        hijo.classList.add('col-sm-3');
        // Añade el hijo creado al padre comun.
        padre.appendChild(hijo);
        // Asigna el evento click al botón: Añadir al carrito.            
        hijo.querySelector('.js-addCart').addEventListener('click', function (event) {
            // Quitamos al enlace (<a>) la funcionalidad por defecto de navegar
            event.preventDefault();
            // Cuando el boton es pulsado se ejecuta el método addCart pasandole el articulo.
            _this.addCart(article);
        });
    };
    // Función para añadir al carrito, se ejecuta al pulsar en el boton añadir al carrito de cualquier producto, recibe el articulo pulsado.
    Cart.prototype.addCart = function (article) {
        var exist = this.currentCart.find(function (element) { return element.id === article.id; });
        if (!exist) {
            // Añade el articulo al array currentCart
            this.currentCart.push(article);
            // Actualiza el carrito
            this.refreshItemsCart();
        }
    };
    // Función que recarga el carrito de la compra recorriendo el array de currentCart.
    Cart.prototype.refreshItemsCart = function () {
        var _this = this;
        var padre = document.querySelector('.at-shopping-cart-list');
        // Reinicia la lista y precio total
        padre.innerHTML = '';
        this.totalPrecio = 0;
        var _loop_1 = function (i) {
            // Crea el elemento li (item de lista)
            var hijo = document.createElement('li');
            // Añade al hijo creado (li) la clase del item.
            hijo.classList.add('at-shopping-cart-item');
            // Añade al li el template con el producto (a) y botón de borrar (button).
            hijo.innerHTML = "\n                <a href=\"shopping-cart.html\" title=\"Producto\">" + this_1.currentCart[i].descripcion + "</a><span class=\"at-shopping-cart-price\">" + this_1.currentCart[i].precio + "\u20AC</span>\n                <button type=\"button\" class=\"btn btn-danger btn-sm ml-2 js-delete\">Borrar</button>\n            ";
            // Añade el evento click al botón borrar.
            hijo.querySelector('.js-delete').addEventListener('click', function (event) {
                // Elimina el item del array currentCart.
                var elementButton = event.target;
                _this.removeArticle(elementButton, i);
            });
            // Añade el item creado a la lista
            padre.appendChild(hijo);
            // Actualiza el precio con un sumatorio
            this_1.totalPrecio += this_1.currentCart[i].precio;
        };
        var this_1 = this;
        // Recorre el array del currentCart
        for (var i = 0; i < this.currentCart.length; i++) {
            _loop_1(i);
        }
        // Cuando termina el bucle actualiza el precio total y el total de articulos en html
        document.querySelector('#totalPrice').textContent = this.totalPrecio.toString();
        document.querySelector('#totalProducts').textContent = this.currentCart.length.toString();
        document.querySelector('#emptyCart').style.display = (this.currentCart.length === 0) ? 'block' : 'none';
    };
    // Funcion que elimina un articulo del carrito
    Cart.prototype.removeArticle = function (element, index) {
        // Borra el item (li), es el padre del boton borrar por eso accede al parent.
        var parent = element.parentNode;
        parent.remove();
        // Llama a la funcion que muestra el mensaje pasandole el articulo.
        this.showToast(this.currentCart[index]);
        // Actualiza el precio total y añade el cambio en el html
        this.totalPrecio = this.totalPrecio - this.currentCart[index].precio;
        document.querySelector('#totalPrice').textContent = this.totalPrecio.toString();
        // Eliminamos el item del currentCart
        this.currentCart.splice(index, 1);
        // Actualiza el carrito
        this.refreshItemsCart();
    };
    // Funcion que muestra el toast.
    Cart.prototype.showToast = function (article) {
        // Añade el mensaje al toast
        document.querySelector('#textToast').textContent = 'Elemento: ' + article.descripcion + ' ha sido borrado';
        // Ejecuta el metodo mostrar del toast de bootstrap instanciado al principio.
        $('.toast').toast('show');
    };
    // Funcionalidad filtro
    Cart.prototype.filter = function (event) {
        var result = [];
        var element = event.target;
        result = this.data.filter(function (article) {
            return article.descripcion.toLowerCase().indexOf(element.value.toLowerCase()) != -1;
        });
        this.loadArticles(result);
    };
    Cart.prototype.init = function () {
        var _this = this;
        // Inicializo el filtro
        var buscador = document.querySelector('#buscador');
        buscador.addEventListener('input', function (event) { return _this.filter(event); });
        // Inicializo la funcionalidad de toggle
        this.toggleCart();
        // Refresco el carrito
        this.refreshItemsCart();
        // Incializo articulos
        this.loadArticles(this.data);
    };
    return Cart;
}());
exports.Cart = Cart;
},{}],2:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Service = /** @class */ (function () {
    function Service(url) {
        this.url = url;
        this.data = [];
    }
    Service.prototype.loadData = function (callback) {
        var xhttp = new XMLHttpRequest();
        xhttp.responseType = 'json';
        var self = this; // This de la clase
        xhttp.onreadystatechange = function () {
            self.dataReady(this, callback); // This del objeto xhttp
        };
        xhttp.open("GET", this.url, true);
        xhttp.send();
    };
    Service.prototype.dataReady = function (xhttp, callback) {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            this.data = xhttp.response;
            callback(xhttp.response);
        }
    };
    return Service;
}());
exports.Service = Service;
},{}],3:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var service_1 = require("./components/service");
var cart_1 = require("./components/cart");
var s = new service_1.Service('http://localhost:8080/tienda/producto/findAll');
s.loadData(function (data) { return init(); });
function init() {
    $('.toast').toast({
        autohide: true,
        delay: 5000
    });
    var cart = new cart_1.Cart(s.data);
    cart.init();
}
},{"./components/cart":1,"./components/service":2}]},{},[3])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJ0cy9jb21wb25lbnRzL2NhcnQudHMiLCJ0cy9jb21wb25lbnRzL3NlcnZpY2UudHMiLCJ0cy9pbml0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7QUNFQTtJQVFJLGNBQVksSUFBZTtRQUN2QixJQUFJLENBQUMsT0FBTyxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsbUJBQW1CLENBQUMsQ0FBQztRQUMzRCxJQUFJLENBQUMsY0FBYyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMscUJBQXFCLEVBQUUsQ0FBQyxLQUFLLENBQUM7UUFDakUsSUFBSSxDQUFDLFdBQVcsR0FBRyxFQUFFLENBQUM7UUFDdEIsSUFBSSxDQUFDLFdBQVcsR0FBRyxDQUFDLENBQUM7UUFDckIsSUFBSSxDQUFDLFVBQVUsR0FBRyxDQUFDLENBQUM7UUFDcEIsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7SUFDckIsQ0FBQztJQUVELDhDQUE4QztJQUV2Qyx5QkFBVSxHQUFqQjtRQUFBLGlCQUVDO1FBREcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUMsNEJBQTRCLENBQUMsQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUUsVUFBQyxLQUFLLElBQUssT0FBQSxLQUFJLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxFQUF6QixDQUF5QixDQUFDLENBQUM7SUFDN0gsQ0FBQztJQUVPLDRCQUFhLEdBQXJCLFVBQXNCLEtBQVk7UUFDOUIsS0FBSyxDQUFDLGNBQWMsRUFBRSxDQUFDO1FBQ3ZCLElBQUksTUFBTSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUNyRCxJQUFJLE1BQU0sRUFBRTtZQUNSLElBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUN0QyxJQUFJLENBQUMs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Q0FBQztBQUNoQixDQUFDIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24oKXtmdW5jdGlvbiByKGUsbix0KXtmdW5jdGlvbiBvKGksZil7aWYoIW5baV0pe2lmKCFlW2ldKXt2YXIgYz1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlO2lmKCFmJiZjKXJldHVybiBjKGksITApO2lmKHUpcmV0dXJuIHUoaSwhMCk7dmFyIGE9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitpK1wiJ1wiKTt0aHJvdyBhLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsYX12YXIgcD1uW2ldPXtleHBvcnRzOnt9fTtlW2ldWzBdLmNhbGwocC5leHBvcnRzLGZ1bmN0aW9uKHIpe3ZhciBuPWVbaV1bMV1bcl07cmV0dXJuIG8obnx8cil9LHAscC5leHBvcnRzLHIsZSxuLHQpfXJldHVybiBuW2ldLmV4cG9ydHN9Zm9yKHZhciB1PVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmUsaT0wO2k8dC5sZW5ndGg7aSsrKW8odFtpXSk7cmV0dXJuIG99cmV0dXJuIHJ9KSgpIiwiaW1wb3J0IHsgUHJvZHVjdCB9IGZyb20gXCIuLi9pbnRlcmZhY2VzL3Byb2R1Y3RcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBDYXJ0IHtcclxuICAgIHB1YmxpYyBjYXJyaXRvOiBIVE1MRWxlbWVudDtcclxuICAgIHB1YmxpYyBhbmNodXJhQ2Fycml0bzogbnVtYmVyO1xyXG4gICAgcHVibGljIGN1cnJlbnRDYXJ0OiBQcm9kdWN0W107XHJcbiAgICBwdWJsaWMgdG90YWxQcmVjaW86IG51bWJlcjtcclxuICAgIHB1YmxpYyB0b3RhbEl0ZW1zOiBudW1iZXI7XHJcbiAgICBkYXRhOiBQcm9kdWN0W107XHJcblxyXG4gICAgY29uc3RydWN0b3IoZGF0YTogUHJvZHVjdFtdKSB7XHJcbiAgICAgICAgdGhpcy5jYXJyaXRvID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmF0LXNob3BwaW5nLWNhcnQnKTtcclxuICAgICAgICB0aGlzLmFuY2h1cmFDYXJyaXRvID0gdGhpcy5jYXJyaXRvLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLndpZHRoO1xyXG4gICAgICAgIHRoaXMuY3VycmVudENhcnQgPSBbXTtcclxuICAgICAgICB0aGlzLnRvdGFsUHJlY2lvID0gMDtcclxuICAgICAgICB0aGlzLnRvdGFsSXRlbXMgPSAwO1xyXG4gICAgICAgIHRoaXMuZGF0YSA9IGRhdGE7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gRnVuY2lvbmFsaWRhZCBwYXJhIGFicmlyL2NlcnJhciBlbCBjYXJyaXRvLlxyXG5cclxuICAgIHB1YmxpYyB0b2dnbGVDYXJ0KCkge1xyXG4gICAgICAgIHRoaXMuY2Fycml0by5xdWVyeVNlbGVjdG9yKCcuYXQtc2hvcHBpbmctY2FydC1wcm9kdWN0cycpLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGV2ZW50KSA9PiB0aGlzLmhhbmRsZXJUb2dnbGUoZXZlbnQpKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGhhbmRsZXJUb2dnbGUoZXZlbnQ6IEV2ZW50KSB7XHJcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICBsZXQgaXNPcGVuID0gdGhpcy5jYXJyaXRvLmNsYXNzTGlzdC5jb250YWlucygnb3BlbicpO1xyXG4gICAgICAgIGlmIChpc09wZW4pIHtcclxuICAgICAgICAgICAgdGhpcy5jYXJyaXRvLmNsYXNzTGlzdC5yZW1vdmUoJ29wZW4nKTtcclxuICAgICAgICAgICAgdGhpcy5jYXJyaXRvLnN0eWxlLnJpZ2h0ID0gJy0nICsgdGhpcy5hbmNodXJhQ2Fycml0byArICdweCc7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5jYXJyaXRvLmNsYXNzTGlzdC5hZGQoJ29wZW4nKTtcclxuICAgICAgICAgICAgdGhpcy5jYXJyaXRvLnN0eWxlLnJpZ2h0ID0gNSArICdweCc7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8vIEZ1bmNpw7NuIHF1ZSByZWNvcnJlIGVsIGFycmF5IGRlIHByb2R1Y3RvcyB5IGxsYW1hIGEgY3JlYXRlQXJ0aWNsZXMgcG9yIGNhZGEgcG9zaWNpb24gZGVsIGFycmF5LlxyXG5cclxuICAgIHB1YmxpYyBsb2FkQXJ0aWNsZXMoYXJ0aWNsZXM6IFByb2R1Y3RbXSkge1xyXG4gICAgICAgIC8vIFZhY2lhIGVsIHVsIChwYWRyZSBjb211biBkZSBhcmljdWxvcylcclxuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjY29udGVuZWRvckFydGljdWxvcycpLmlubmVySFRNTCA9ICcnO1xyXG5cclxuICAgICAgICAvLyBSZWNjb3JyZSBlbCBhcnJheSBwYXNhZG8gcG9yIHBhcmFtZXRyb3MgeSBsbGFtYSBhIGNyZWF0ZUFydGljbGVzIHBhc2FuZG8gY2FkYSBhcnRpY3VsbyB5IGVsIGluZGljZSBkZWwgYXJyYXkuXHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBhcnRpY2xlcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICB0aGlzLmNyZWF0ZUFydGljbGUoYXJ0aWNsZXNbaV0sIGkpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvLyBGdW5jacOzbiBxdWUgc2UgZW5jYXJnYSBkZSBjcmVhciBhcnRpY3Vsb3MgYSB0cmF2ZXMgZGUgdW4gdGVtcGxhdGUgc3RyaW5nIHkgbHVlZ28gbG9zIGHDsWFkZSBhbCBwYWRyZSBjb211biAodWwpLlxyXG5cclxuICAgIHByaXZhdGUgY3JlYXRlQXJ0aWNsZShhcnRpY2xlOiBQcm9kdWN0LCBpbmRleDogbnVtYmVyKSB7XHJcbiAgICAgICAgLy8gQ3JlYSBlbCBlbGVtZW50byBhcnRpY3VsbyBhIHRyYXZlcyBkZWwgdGVtcGxhdGUgc3RyaW5nLlxyXG4gICAgICAgIGNvbnN0IHBhZHJlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2NvbnRlbmVkb3JBcnRpY3Vsb3MnKTtcclxuICAgICAgICBsZXQgaGlqbyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgICAgIGhpam8uaW5uZXJIVE1MID0gYFxyXG4gICAgICAgICAgICA8YXJ0aWNsZSBjbGFzcz1cImF0LWFydGljbGUgbWItNFwiPlxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNhcmRcIj5cclxuICAgICAgICAgICAgICAgICAgICA8aW1nIHNyYz1cIiR7YXJ0aWNsZS5pbWFnZW59XCIgY2xhc3M9XCJjYXJkLWltZy10b3AgYXQtYXJ0aWNsZS1pbWdcIiBhbHQ9XCIuLi5cIj5cclxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY2FyZC1ib2R5XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxoNSBjbGFzcz1cImNhcmQtdGl0bGVcIj4ke2FydGljbGUuZGVzY3JpcGNpb259PC9oNT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPHAgY2xhc3M9XCJjYXJkLXRleHRcIj4ke2FydGljbGUuZWFuMTN9PC9wPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZC1mbGV4IGp1c3RpZnktY29udGVudC1iZXR3ZWVuXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiYnRuLWdyb3VwXCIgcm9sZT1cImdyb3VwXCIgYXJpYS1sYWJlbD1cIkJhc2ljIGV4YW1wbGVcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8YSBocmVmPVwiI1wiIGNsYXNzPVwiYnRuIGJ0bi1vdXRsaW5lLWRhbmdlclwiPlZlcjwvYT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8YSBocmVmPVwiI1wiIGNsYXNzPVwiYnRuIGJ0bi1vdXRsaW5lLWRhbmdlciBqcy1hZGRDYXJ0XCIgaWQ9XCJhZGRDYXJ0LSR7aW5kZXh9XCI+QWwgY2Fycml0bzwvYT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJjYXJkLXRleHRcIj48c21hbGwgY2xhc3M9XCJ0ZXh0LW11dGVkXCI+JHthcnRpY2xlLnByZWNpb308L3NtYWxsPjwvc3Bhbj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgPC9hcnRpY2xlPlxyXG4gICAgICAgIGA7XHJcblxyXG4gICAgICAgIC8vIEHDsWFkZSBhbCBoaWpvIGNyZWFkbyBsYSBjbGFzZSBkZWwgZ3JpZC5cclxuICAgICAgICBoaWpvLmNsYXNzTGlzdC5hZGQoJ2NvbC1zbS0zJyk7XHJcblxyXG4gICAgICAgIC8vIEHDsWFkZSBlbCBoaWpvIGNyZWFkbyBhbCBwYWRyZSBjb211bi5cclxuICAgICAgICBwYWRyZS5hcHBlbmRDaGlsZChoaWpvKTtcclxuXHJcbiAgICAgICAgLy8gQXNpZ25hIGVsIGV2ZW50byBjbGljayBhbCBib3TDs246IEHDsWFkaXIgYWwgY2Fycml0by4gICAgICAgICAgICBcclxuICAgICAgICBoaWpvLnF1ZXJ5U2VsZWN0b3IoJy5qcy1hZGRDYXJ0JykuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZXZlbnQpID0+IHtcclxuICAgICAgICAgICAgLy8gUXVpdGFtb3MgYWwgZW5sYWNlICg8YT4pIGxhIGZ1bmNpb25hbGlkYWQgcG9yIGRlZmVjdG8gZGUgbmF2ZWdhclxyXG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cclxuICAgICAgICAgICAgLy8gQ3VhbmRvIGVsIGJvdG9uIGVzIHB1bHNhZG8gc2UgZWplY3V0YSBlbCBtw6l0b2RvIGFkZENhcnQgcGFzYW5kb2xlIGVsIGFydGljdWxvLlxyXG4gICAgICAgICAgICB0aGlzLmFkZENhcnQoYXJ0aWNsZSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gRnVuY2nDs24gcGFyYSBhw7FhZGlyIGFsIGNhcnJpdG8sIHNlIGVqZWN1dGEgYWwgcHVsc2FyIGVuIGVsIGJvdG9uIGHDsWFkaXIgYWwgY2Fycml0byBkZSBjdWFscXVpZXIgcHJvZHVjdG8sIHJlY2liZSBlbCBhcnRpY3VsbyBwdWxzYWRvLlxyXG5cclxuICAgIHB1YmxpYyBhZGRDYXJ0KGFydGljbGU6IFByb2R1Y3QpIHtcclxuICAgICAgICBjb25zdCBleGlzdCA9IHRoaXMuY3VycmVudENhcnQuZmluZCgoZWxlbWVudCkgPT4gZWxlbWVudC5pZCA9PT0gYXJ0aWNsZS5pZCk7XHJcbiAgICAgICAgaWYgKCFleGlzdCkge1xyXG4gICAgICAgICAgICAvLyBBw7FhZGUgZWwgYXJ0aWN1bG8gYWwgYXJyYXkgY3VycmVudENhcnRcclxuICAgICAgICAgICAgdGhpcy5jdXJyZW50Q2FydC5wdXNoKGFydGljbGUpO1xyXG5cclxuICAgICAgICAgICAgLy8gQWN0dWFsaXphIGVsIGNhcnJpdG9cclxuICAgICAgICAgICAgdGhpcy5yZWZyZXNoSXRlbXNDYXJ0KCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8vIEZ1bmNpw7NuIHF1ZSByZWNhcmdhIGVsIGNhcnJpdG8gZGUgbGEgY29tcHJhIHJlY29ycmllbmRvIGVsIGFycmF5IGRlIGN1cnJlbnRDYXJ0LlxyXG5cclxuICAgIHB1YmxpYyByZWZyZXNoSXRlbXNDYXJ0KCkge1xyXG4gICAgICAgIGNvbnN0IHBhZHJlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmF0LXNob3BwaW5nLWNhcnQtbGlzdCcpO1xyXG5cclxuICAgICAgICAvLyBSZWluaWNpYSBsYSBsaXN0YSB5IHByZWNpbyB0b3RhbFxyXG4gICAgICAgIHBhZHJlLmlubmVySFRNTCA9ICcnO1xyXG4gICAgICAgIHRoaXMudG90YWxQcmVjaW8gPSAwO1xyXG5cclxuICAgICAgICAvLyBSZWNvcnJlIGVsIGFycmF5IGRlbCBjdXJyZW50Q2FydFxyXG5cclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuY3VycmVudENhcnQubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgLy8gQ3JlYSBlbCBlbGVtZW50byBsaSAoaXRlbSBkZSBsaXN0YSlcclxuICAgICAgICAgICAgbGV0IGhpam8gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsaScpO1xyXG5cclxuICAgICAgICAgICAgLy8gQcOxYWRlIGFsIGhpam8gY3JlYWRvIChsaSkgbGEgY2xhc2UgZGVsIGl0ZW0uXHJcbiAgICAgICAgICAgIGhpam8uY2xhc3NMaXN0LmFkZCgnYXQtc2hvcHBpbmctY2FydC1pdGVtJyk7XHJcblxyXG4gICAgICAgICAgICAvLyBBw7FhZGUgYWwgbGkgZWwgdGVtcGxhdGUgY29uIGVsIHByb2R1Y3RvIChhKSB5IGJvdMOzbiBkZSBib3JyYXIgKGJ1dHRvbikuXHJcbiAgICAgICAgICAgIGhpam8uaW5uZXJIVE1MID0gYFxyXG4gICAgICAgICAgICAgICAgPGEgaHJlZj1cInNob3BwaW5nLWNhcnQuaHRtbFwiIHRpdGxlPVwiUHJvZHVjdG9cIj4ke3RoaXMuY3VycmVudENhcnRbaV0uZGVzY3JpcGNpb259PC9hPjxzcGFuIGNsYXNzPVwiYXQtc2hvcHBpbmctY2FydC1wcmljZVwiPiR7dGhpcy5jdXJyZW50Q2FydFtpXS5wcmVjaW994oKsPC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJidG4gYnRuLWRhbmdlciBidG4tc20gbWwtMiBqcy1kZWxldGVcIj5Cb3JyYXI8L2J1dHRvbj5cclxuICAgICAgICAgICAgYDtcclxuXHJcbiAgICAgICAgICAgIC8vIEHDsWFkZSBlbCBldmVudG8gY2xpY2sgYWwgYm90w7NuIGJvcnJhci5cclxuICAgICAgICAgICAgaGlqby5xdWVyeVNlbGVjdG9yKCcuanMtZGVsZXRlJykuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZXZlbnQ6IEV2ZW50KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAvLyBFbGltaW5hIGVsIGl0ZW0gZGVsIGFycmF5IGN1cnJlbnRDYXJ0LlxyXG4gICAgICAgICAgICAgICAgbGV0IGVsZW1lbnRCdXR0b24gPSAoPEhUTUxJbnB1dEVsZW1lbnQ+ZXZlbnQudGFyZ2V0KTtcclxuICAgICAgICAgICAgICAgIHRoaXMucmVtb3ZlQXJ0aWNsZShlbGVtZW50QnV0dG9uLCBpKTtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAvLyBBw7FhZGUgZWwgaXRlbSBjcmVhZG8gYSBsYSBsaXN0YVxyXG4gICAgICAgICAgICBwYWRyZS5hcHBlbmRDaGlsZChoaWpvKTtcclxuXHJcbiAgICAgICAgICAgIC8vIEFjdHVhbGl6YSBlbCBwcmVjaW8gY29uIHVuIHN1bWF0b3Jpb1xyXG4gICAgICAgICAgICB0aGlzLnRvdGFsUHJlY2lvICs9IHRoaXMuY3VycmVudENhcnRbaV0ucHJlY2lvO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gQ3VhbmRvIHRlcm1pbmEgZWwgYnVjbGUgYWN0dWFsaXphIGVsIHByZWNpbyB0b3RhbCB5IGVsIHRvdGFsIGRlIGFydGljdWxvcyBlbiBodG1sXHJcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3RvdGFsUHJpY2UnKS50ZXh0Q29udGVudCA9IHRoaXMudG90YWxQcmVjaW8udG9TdHJpbmcoKTtcclxuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjdG90YWxQcm9kdWN0cycpLnRleHRDb250ZW50ID0gdGhpcy5jdXJyZW50Q2FydC5sZW5ndGgudG9TdHJpbmcoKTtcclxuXHJcbiAgICAgICAgKDxIVE1MRWxlbWVudD5kb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjZW1wdHlDYXJ0JykpLnN0eWxlLmRpc3BsYXkgPSAodGhpcy5jdXJyZW50Q2FydC5sZW5ndGggPT09IDApID8gJ2Jsb2NrJyA6ICdub25lJztcclxuICAgIH1cclxuXHJcbiAgICAvLyBGdW5jaW9uIHF1ZSBlbGltaW5hIHVuIGFydGljdWxvIGRlbCBjYXJyaXRvXHJcblxyXG4gICAgcHVibGljIHJlbW92ZUFydGljbGUoZWxlbWVudDogSFRNTEVsZW1lbnQsIGluZGV4OiBudW1iZXIpIHtcclxuICAgICAgICAvLyBCb3JyYSBlbCBpdGVtIChsaSksIGVzIGVsIHBhZHJlIGRlbCBib3RvbiBib3JyYXIgcG9yIGVzbyBhY2NlZGUgYWwgcGFyZW50LlxyXG4gICAgICAgIGxldCBwYXJlbnQ6IGFueSA9IGVsZW1lbnQucGFyZW50Tm9kZTtcclxuICAgICAgICBwYXJlbnQucmVtb3ZlKCk7XHJcblxyXG4gICAgICAgIC8vIExsYW1hIGEgbGEgZnVuY2lvbiBxdWUgbXVlc3RyYSBlbCBtZW5zYWplIHBhc2FuZG9sZSBlbCBhcnRpY3Vsby5cclxuICAgICAgICB0aGlzLnNob3dUb2FzdCh0aGlzLmN1cnJlbnRDYXJ0W2luZGV4XSk7XHJcblxyXG4gICAgICAgIC8vIEFjdHVhbGl6YSBlbCBwcmVjaW8gdG90YWwgeSBhw7FhZGUgZWwgY2FtYmlvIGVuIGVsIGh0bWxcclxuICAgICAgICB0aGlzLnRvdGFsUHJlY2lvID0gdGhpcy50b3RhbFByZWNpbyAtIHRoaXMuY3VycmVudENhcnRbaW5kZXhdLnByZWNpbztcclxuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjdG90YWxQcmljZScpLnRleHRDb250ZW50ID0gdGhpcy50b3RhbFByZWNpby50b1N0cmluZygpO1xyXG5cclxuICAgICAgICAvLyBFbGltaW5hbW9zIGVsIGl0ZW0gZGVsIGN1cnJlbnRDYXJ0XHJcbiAgICAgICAgdGhpcy5jdXJyZW50Q2FydC5zcGxpY2UoaW5kZXgsIDEpO1xyXG5cclxuICAgICAgICAvLyBBY3R1YWxpemEgZWwgY2Fycml0b1xyXG4gICAgICAgIHRoaXMucmVmcmVzaEl0ZW1zQ2FydCgpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIEZ1bmNpb24gcXVlIG11ZXN0cmEgZWwgdG9hc3QuXHJcblxyXG4gICAgcHVibGljIHNob3dUb2FzdChhcnRpY2xlOiBQcm9kdWN0KSB7XHJcbiAgICAgICAgLy8gQcOxYWRlIGVsIG1lbnNhamUgYWwgdG9hc3RcclxuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjdGV4dFRvYXN0JykudGV4dENvbnRlbnQgPSAnRWxlbWVudG86ICcgKyBhcnRpY2xlLmRlc2NyaXBjaW9uICsgJyBoYSBzaWRvIGJvcnJhZG8nO1xyXG5cclxuICAgICAgICAvLyBFamVjdXRhIGVsIG1ldG9kbyBtb3N0cmFyIGRlbCB0b2FzdCBkZSBib290c3RyYXAgaW5zdGFuY2lhZG8gYWwgcHJpbmNpcGlvLlxyXG4gICAgICAgICQoJy50b2FzdCcpLnRvYXN0KCdzaG93Jyk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gRnVuY2lvbmFsaWRhZCBmaWx0cm9cclxuXHJcbiAgICBwcml2YXRlIGZpbHRlcihldmVudDogS2V5Ym9hcmRFdmVudCkge1xyXG5cclxuICAgICAgICBsZXQgcmVzdWx0ID0gW107XHJcbiAgICAgICAgbGV0IGVsZW1lbnQgPSAoPEhUTUxJbnB1dEVsZW1lbnQ+ZXZlbnQudGFyZ2V0KTtcclxuICAgICAgICByZXN1bHQgPSB0aGlzLmRhdGEuZmlsdGVyKGFydGljbGUgPT4ge1xyXG4gICAgICAgICAgICByZXR1cm4gYXJ0aWNsZS5kZXNjcmlwY2lvbi50b0xvd2VyQ2FzZSgpLmluZGV4T2YoZWxlbWVudC52YWx1ZS50b0xvd2VyQ2FzZSgpKSAhPSAtMTtcclxuICAgICAgICB9KTtcclxuICAgICAgICB0aGlzLmxvYWRBcnRpY2xlcyhyZXN1bHQpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBpbml0KCkge1xyXG4gICAgICAgIC8vIEluaWNpYWxpem8gZWwgZmlsdHJvXHJcbiAgICAgICAgbGV0IGJ1c2NhZG9yID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2J1c2NhZG9yJyk7XHJcbiAgICAgICAgYnVzY2Fkb3IuYWRkRXZlbnRMaXN0ZW5lcignaW5wdXQnLCAoZXZlbnQ6IEtleWJvYXJkRXZlbnQpID0+IHRoaXMuZmlsdGVyKGV2ZW50KSk7XHJcblxyXG4gICAgICAgIC8vIEluaWNpYWxpem8gbGEgZnVuY2lvbmFsaWRhZCBkZSB0b2dnbGVcclxuICAgICAgICB0aGlzLnRvZ2dsZUNhcnQoKTtcclxuXHJcbiAgICAgICAgLy8gUmVmcmVzY28gZWwgY2Fycml0b1xyXG4gICAgICAgIHRoaXMucmVmcmVzaEl0ZW1zQ2FydCgpO1xyXG5cclxuICAgICAgICAvLyBJbmNpYWxpem8gYXJ0aWN1bG9zXHJcbiAgICAgICAgdGhpcy5sb2FkQXJ0aWNsZXModGhpcy5kYXRhKTtcclxuICAgIH1cclxufSIsImltcG9ydCB7IFByb2R1Y3QgfSBmcm9tIFwiLi4vaW50ZXJmYWNlcy9wcm9kdWN0XCI7XHJcblxyXG5leHBvcnQgY2xhc3MgU2VydmljZSB7XHJcbiAgICB1cmw6IHN0cmluZztcclxuICAgIGRhdGE6IFByb2R1Y3RbXTtcclxuICAgIGNvbnN0cnVjdG9yKHVybDogc3RyaW5nKSB7XHJcbiAgICAgICAgdGhpcy51cmwgPSB1cmw7XHJcbiAgICAgICAgdGhpcy5kYXRhID0gW107XHJcbiAgICB9XHJcbiAgICBsb2FkRGF0YShjYWxsYmFjazogRnVuY3Rpb24pOiB2b2lkIHtcclxuICAgICAgICB2YXIgeGh0dHAgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcclxuICAgICAgICB4aHR0cC5yZXNwb25zZVR5cGUgPSAnanNvbic7XHJcbiAgICAgICAgbGV0IHNlbGYgPSB0aGlzOyAvLyBUaGlzIGRlIGxhIGNsYXNlXHJcbiAgICAgICAgeGh0dHAub25yZWFkeXN0YXRlY2hhbmdlID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBzZWxmLmRhdGFSZWFkeSh0aGlzLCBjYWxsYmFjayk7IC8vIFRoaXMgZGVsIG9iamV0byB4aHR0cFxyXG4gICAgICAgIH07XHJcbiAgICAgICAgeGh0dHAub3BlbihcIkdFVFwiLCB0aGlzLnVybCwgdHJ1ZSk7XHJcbiAgICAgICAgeGh0dHAuc2VuZCgpO1xyXG4gICAgfVxyXG4gICAgcHJpdmF0ZSBkYXRhUmVhZHkoeGh0dHA6IFhNTEh0dHBSZXF1ZXN0LCBjYWxsYmFjazogRnVuY3Rpb24pOiBhbnkge1xyXG4gICAgICAgIGlmICh4aHR0cC5yZWFkeVN0YXRlID09IDQgJiYgeGh0dHAuc3RhdHVzID09IDIwMCkge1xyXG4gICAgICAgICAgICB0aGlzLmRhdGEgPSB4aHR0cC5yZXNwb25zZTtcclxuICAgICAgICAgICAgY2FsbGJhY2soeGh0dHAucmVzcG9uc2UpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufSIsImltcG9ydCBqUXVlcnkgPSByZXF1aXJlKCdqcXVlcnknKTtcclxuaW1wb3J0IHsgU2VydmljZSB9IGZyb20gXCIuL2NvbXBvbmVudHMvc2VydmljZVwiO1xyXG5pbXBvcnQgeyBDYXJ0IH0gZnJvbSBcIi4vY29tcG9uZW50cy9jYXJ0XCI7XHJcbmltcG9ydCB7IFByb2R1Y3QgfSBmcm9tIFwiLi9pbnRlcmZhY2VzL3Byb2R1Y3RcIjtcclxuXHJcbmxldCBzID0gbmV3IFNlcnZpY2UoJ2h0dHA6Ly9sb2NhbGhvc3Q6ODA4MC90aWVuZGEvcHJvZHVjdG8vZmluZEFsbCcpO1xyXG5cclxucy5sb2FkRGF0YSgoZGF0YTogUHJvZHVjdFtdKSA9PiBpbml0KCkpO1xyXG5cclxuXHJcblxyXG5mdW5jdGlvbiBpbml0KCkge1xyXG4gICAgJCgnLnRvYXN0JykudG9hc3Qoe1xyXG4gICAgICAgIGF1dG9oaWRlOiB0cnVlLFxyXG4gICAgICAgIGRlbGF5OiA1MDAwXHJcbiAgICB9KTtcclxuICAgIFxyXG4gICAgbGV0IGNhcnQgPSAgbmV3IENhcnQocy5kYXRhKTtcclxuICAgIGNhcnQuaW5pdCgpO1xyXG59Il19
