import { Product } from "../interfaces/product";

export class Cart {
    public carrito: HTMLElement;
    public anchuraCarrito: number;
    public currentCart: Product[];
    public totalPrecio: number;
    public totalItems: number;
    data: Product[];

    constructor(data: Product[]) {
        this.carrito = document.querySelector('.at-shopping-cart');
        this.anchuraCarrito = this.carrito.getBoundingClientRect().width;
        this.currentCart = [];
        this.totalPrecio = 0;
        this.totalItems = 0;
        this.data = data;
    }

    // Funcionalidad para abrir/cerrar el carrito.

    public toggleCart() {
        this.carrito.querySelector('.at-shopping-cart-products').addEventListener('click', (event) => this.handlerToggle(event));
    }

    private handlerToggle(event: Event) {
        event.preventDefault();
        let isOpen = this.carrito.classList.contains('open');
        if (isOpen) {
            this.carrito.classList.remove('open');
            this.carrito.style.right = '-' + this.anchuraCarrito + 'px';
        } else {
            this.carrito.classList.add('open');
            this.carrito.style.right = 5 + 'px';
        }
    }

    // Función que recorre el array de productos y llama a createArticles por cada posicion del array.

    public loadArticles(articles: Product[]) {
        // Vacia el ul (padre comun de ariculos)
        document.querySelector('#contenedorArticulos').innerHTML = '';

        // Reccorre el array pasado por parametros y llama a createArticles pasando cada articulo y el indice del array.
        for (let i = 0; i < articles.length; i++) {
            this.createArticle(articles[i], i);
        }
    }

    // Función que se encarga de crear articulos a traves de un template string y luego los añade al padre comun (ul).

    private createArticle(article: Product, index: number) {
        // Crea el elemento articulo a traves del template string.
        const padre = document.querySelector('#contenedorArticulos');
        let hijo = document.createElement('div');
        hijo.innerHTML = `
            <article class="at-article mb-4">
                <div class="card">
                    <img src="${article.imagen}" class="card-img-top at-article-img" alt="...">
                    <div class="card-body">
                        <h5 class="card-title">${article.descripcion}</h5>
                        <p class="card-text">${article.ean13}</p>
                        <div class="d-flex justify-content-between">
                            <div class="btn-group" role="group" aria-label="Basic example">
                                <a href="#" class="btn btn-outline-danger">Ver</a>
                                <a href="#" class="btn btn-outline-danger js-addCart" id="addCart-${index}">Al carrito</a>
                            </div>
                            <span class="card-text"><small class="text-muted">${article.precio}</small></span>
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
            this.addCart(article);
        });
    }

    // Función para añadir al carrito, se ejecuta al pulsar en el boton añadir al carrito de cualquier producto, recibe el articulo pulsado.

    public addCart(article: Product) {
        const exist = this.currentCart.find((element) => element.id === article.id);
        if (!exist) {
            // Añade el articulo al array currentCart
            this.currentCart.push(article);

            // Actualiza el carrito
            this.refreshItemsCart();
        }
    }

    // Función que recarga el carrito de la compra recorriendo el array de currentCart.

    public refreshItemsCart() {
        const padre = document.querySelector('.at-shopping-cart-list');

        // Reinicia la lista y precio total
        padre.innerHTML = '';
        this.totalPrecio = 0;

        // Recorre el array del currentCart

        for (let i = 0; i < this.currentCart.length; i++) {
            // Crea el elemento li (item de lista)
            let hijo = document.createElement('li');

            // Añade al hijo creado (li) la clase del item.
            hijo.classList.add('at-shopping-cart-item');

            // Añade al li el template con el producto (a) y botón de borrar (button).
            hijo.innerHTML = `
                <a href="shopping-cart.html" title="Producto">${this.currentCart[i].descripcion}</a><span class="at-shopping-cart-price">${this.currentCart[i].precio}€</span>
                <button type="button" class="btn btn-danger btn-sm ml-2 js-delete">Borrar</button>
            `;

            // Añade el evento click al botón borrar.
            hijo.querySelector('.js-delete').addEventListener('click', (event: Event) => {
                // Elimina el item del array currentCart.
                let elementButton = (<HTMLInputElement>event.target);
                this.removeArticle(elementButton, i);
            });

            // Añade el item creado a la lista
            padre.appendChild(hijo);

            // Actualiza el precio con un sumatorio
            this.totalPrecio += this.currentCart[i].precio;
        }

        // Cuando termina el bucle actualiza el precio total y el total de articulos en html
        document.querySelector('#totalPrice').textContent = this.totalPrecio.toString();
        document.querySelector('#totalProducts').textContent = this.currentCart.length.toString();

        (<HTMLElement>document.querySelector('#emptyCart')).style.display = (this.currentCart.length === 0) ? 'block' : 'none';
    }

    // Funcion que elimina un articulo del carrito

    public removeArticle(element: HTMLElement, index: number) {
        // Borra el item (li), es el padre del boton borrar por eso accede al parent.
        let parent: any = element.parentNode;
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
    }

    // Funcion que muestra el toast.

    public showToast(article: Product) {
        // Añade el mensaje al toast
        document.querySelector('#textToast').textContent = 'Elemento: ' + article.descripcion + ' ha sido borrado';

        // Ejecuta el metodo mostrar del toast de bootstrap instanciado al principio.
        $('.toast').toast('show');
    }

    // Funcionalidad filtro

    private filter(event: KeyboardEvent) {

        let result = [];
        let element = (<HTMLInputElement>event.target);
        result = this.data.filter(article => {
            return article.descripcion.toLowerCase().indexOf(element.value.toLowerCase()) != -1;
        });
        this.loadArticles(result);
    }

    public init() {
        // Inicializo el filtro
        let buscador = document.querySelector('#buscador');
        buscador.addEventListener('input', (event: KeyboardEvent) => this.filter(event));

        // Inicializo la funcionalidad de toggle
        this.toggleCart();

        // Refresco el carrito
        this.refreshItemsCart();

        // Incializo articulos
        this.loadArticles(this.data);
    }
}