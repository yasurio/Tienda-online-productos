
// Variables globales

const currentCart = [];
let totalPrecio = 0;
let totalItems = 0;

// Declaro evento que es disparado al cargar el DOM por completo.

document.addEventListener("DOMContentLoaded", init);

// Funcion que se ejecuta al cargar el DOM, aquí debemos tener todo el codigo que trabaje con el DOM.

function init() {

    // Instanciamos el componente toast de bootstrap.

    $('.toast').toast({
        autohide: true,
        delay: 5000
    });

    // Carga todos los articulos al incio, pasandole el array data completo.

    loadArticles(data);

    // Comprueba al inicio el estado del carrito.

    refreshItemsCart();

    // Funcionalidad para abrir/cerrar el carrito.

    const carrito = document.querySelector('.at-shopping-cart');
    const anchura = carrito.getBoundingClientRect().width;
    document.querySelector('.at-shopping-cart-products').addEventListener('click', toggle);
    function toggle(event) {
        event.preventDefault();
        let isOpen = carrito.classList.contains('open');
        if (isOpen) {
            carrito.classList.remove('open');
            carrito.style.right = '-' + anchura + 'px';
        } else {
            carrito.classList.add('open');
            carrito.style.right = 5 + 'px';
        }
    }

    // Función que recorre el array de productos y llama a createArticles por cada posicion del array.

    function loadArticles(articles) {
        // Vacia el ul (padre comun de ariculos)
        document.querySelector('#contenedorArticulos').innerHTML = '';

        // Reccorre el array pasado por parametros y llama a createArticles pasando cada articulo y el indice del array.
        for (let i = 0; i < articles.length; i++) {
            createArticle(articles[i], i);
        }
    }

    // Función que se encarga de crear articulos a traves de un template string y luego los añade al padre comun (ul).

    function createArticle(article, index) {
        // Crea el elemento articulo a traves del template string.
        const padre = document.querySelector('#contenedorArticulos');
        let hijo = document.createElement('div');
        hijo.innerHTML = `
            <article class="at-article mb-4">
                <div class="card">
                    <img src="${article.img}" class="card-img-top at-article-img" alt="...">
                    <div class="card-body">
                        <h5 class="card-title">${article.title}</h5>
                        <p class="card-text">${article.description}</p>
                        <div class="d-flex justify-content-between">
                            <div class="btn-group" role="group" aria-label="Basic example">
                                <a href="#" class="btn btn-outline-danger">Ver</a>
                                <a href="#" class="btn btn-outline-danger js-addCart" id="addCart-${index}">Al carrito</a>
                            </div>
                            <span class="card-text"><small class="text-muted">${article.price}</small></span>
                        </div>
                    </div>
                </div>
            </article>
        `;

        // Añade al hijo creado la clase del grid.
        hijo.classList.add('col-sm-3');

        // Añade el hijo creado al padre comun.
        padre.appendChild(hijo);

        // Asigna el evento click al botón: Añadir al carrito.            
        hijo.querySelector('.js-addCart').addEventListener('click', (event) => {
            // Quitamos al enlace (<a>) la funcionalidad por defecto de navegar
            event.preventDefault();

            // Cuando el boton es pulsado se ejecuta el método addCart pasandole el articulo.
            addCart(article);
        });
    }

    // Función para añadir al carrito, se ejecuta al pulsar en el boton añadir al carrito de cualquier producto, recibe el articulo pulsado.

    function addCart(article) {
        const exist = currentCart.find((element) => element.id === article.id);
        if (!exist) {
            // Añade el articulo al array currentCart
            currentCart.push(article);

            // Actualiza el carrito
            refreshItemsCart();
        }
    }

    // Función que recarga el carrito de la compra recorriendo el array de currentCart.

    function refreshItemsCart() {
        const padre = document.querySelector('.at-shopping-cart-list');

        // Reinicia la lista y precio total
        padre.innerHTML = '';
        totalPrecio = 0;

        // Recorre el array del currentCart

        for (let i = 0; i < currentCart.length; i++) {
            // Crea el elemento li (item de lista)
            let hijo = document.createElement('li');

            // Añade al hijo creado (li) la clase del item.
            hijo.classList.add('at-shopping-cart-item');

            // Añade al li el template con el producto (a) y botón de borrar (button).
            hijo.innerHTML = `
                <a href="shopping-cart.html" title="Producto">${currentCart[i].title}</a><span class="at-shopping-cart-price">${currentCart[i].price}€</span>
                <button type="button" class="btn btn-danger btn-sm ml-2 js-delete">Borrar</button>
            `;

            // Añade el evento click al botón borrar.
            hijo.querySelector('.js-delete').addEventListener('click', function () {
                // Elimina el item del array currentCart.
                removeArticle(this, i);
            });

            // Añade el item creado a la lista
            padre.appendChild(hijo);

            // Actualiza el precio con un sumatorio
            totalPrecio += currentCart[i].price;
        }

        // Cuando termina el bucle actualiza el precio total y el total de articulos en html
        document.querySelector('#totalPrice').textContent = totalPrecio;
        document.querySelector('#totalProducts').textContent = currentCart.length;

        document.querySelector('#emptyCart').style.display = (currentCart.length === 0) ? 'block' : 'none';
    }

    // Funcion que elimina un articulo del carrito

    function removeArticle(element, index) {
        // Borra el item (li), es el padre del boton borrar por eso accede al parent.
        element.parentNode.remove();

        // Llama a la funcion que muestra el mensaje pasandole el articulo.
        showToast(currentCart[index]);

        // Actualiza el precio total y añade el cambio en el html
        totalPrecio = totalPrecio - currentCart[index].price;
        document.querySelector('#totalPrice').textContent = totalPrecio;

        // Eliminamos el item del currentCart
        currentCart.splice(index, 1);

        // Actualiza el carrito
        refreshItemsCart();
    }

    // Funcion que muestra el toast.

    function showToast(article) {
        // Añade el mensaje al toast
        document.querySelector('#textToast').textContent = 'Elemento: ' + article.title + ' ha sido borrado';

        // Ejecuta el metodo mostrar del toast de bootstrap instanciado al principio.
        $('.toast').toast('show');
    }

    // Funcionalidad filtro

    function filter() {
        let result = [];
        result = data.filter(article => {
            return article.title.toLowerCase().indexOf(this.value.toLowerCase()) != -1;
        });
        loadArticles(result);
    }

    document.querySelector('#buscador').addEventListener('input', filter);
}