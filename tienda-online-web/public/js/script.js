document.addEventListener("DOMContentLoaded", function () {
    init();
}, false);

function loadData(){
    var xhttp =new XMLHttpRequest();
    xhttp.responseType ='json';
    xhttp.onreadystatechange = function(){
        if(xhttp.readyState==4 || xhttp.status==200){
            dataProductos =this.response;

            loadArticle(dataProductos);
        }
    }
    let url="";

    console.log(dataProductos);
}


var dataProductos;
function init() {
    //Carrito de la compra desplegable
    document.querySelector('.at-shopping-cart-products').addEventListener('click', toggle);
    //Rellenar el container
    loadArticle(dataProductos);
    //Buscador cuando presionas un boton
    document.querySelector('#buscador').addEventListener('keyup', filter);
    //Boton que añade un producto al carrito
    //loadData();
}

function loadArticle(articles) {
    document.querySelector('#contenedorArticulos').innerHTML = '';
    for (let i = 0; i < articles.length; i++) {
        addArticle(articles[i], i);
    }
}

function addArticle(dataProducto, size) {
    const child = document.createElement('li');
    child.innerHTML = 
    `<article class="at-article card ">
    <img src="${dataProducto.img}" alt="Imagen de productos 1" title="Angular img"
        class="at-article-img card-img-top">
        <div class="card-body ">
            <h3 class="card-title">${dataProducto.title}</h3>
            <p class="card-text">${dataProducto.description}</p>
            <div class="d-flex  btn-group-sm" role="group">
                <a type="button" href="#" class="btn btn-secondary p-2 " id="btn-producto-${size}" name="Ver producto">Ver</a>
                <a type="button" herf="#" class="btn btn-secondary p-2 btn-add-carrito " id="btn-add-carrito-${size}"name="Al carrito">Al
                    carrito</a>
                <span class="ml-auto p-2">${dataProducto.price}€</span>
            </div>
        </div>
    </article>`;
    child.classList.add('col-sm-3');
    document.querySelector('#contenedorArticulos').appendChild(child);
    child.querySelector('.btn-add-carrito').addEventListener('click', function(){
        addCarrito(dataProducto,event);
    });
}

function toggle() {
    const carrito = document.querySelector('.at-shopping-cart');
    const anchura = carrito.getBoundingClientRect().width;
    let isOpen = carrito.classList.contains('open');
    if (isOpen) {
        carrito.classList.remove('open');
        carrito.style.right = '-' + anchura + 'px';
    } else {
        carrito.classList.add('open');
        carrito.style.right = 5 + 'px';
    }
}

function filter() {
    //console.log(this.value);
    let result = [];

    result = dataProductos.filter(
        item => item.title.toLowerCase().indexOf(this.value.toLowerCase()) !== -1
    );
    loadArticle(result);
}

const carritoList=[];
let sumCarrito=0;

function addCarrito(producto,event) {
    console.log(this);
    event.preventDefault();
    addProducto(producto);
    precioTotal();
    document.querySelector('.at-shopping-cart-products-number').innerText=carritoList.length;

}
function addProducto(producto) {
    let exist=true;
    for(let i=0;i<carritoList.length && exist==true;i++){
        if(carritoList[i].id===producto.id){
            exist=false;
        }
    }
    if(exist===true){
        carritoList.push(Object.assign(producto, {quantity : 1}));
        creteCarritoHtml(producto);
    }else{
        producto.quantity++;
        document.querySelector('.precio-producto-carrito').innerHTML=(producto.quantity*producto.price).toFixed(2);
    }
    console.log(carritoList);
    
}
function creteCarritoHtml(producto){

    const child = document.createElement('li');
    child.innerHTML= 
    `<a href="shopping-cart.html" title="Producto 1">${producto.title}</a>
    <span class="at-shopping-cart-price precio-producto-carrito" >${producto.price}€</span>
    <button type="button" class="btn btn-primary btn-xs js-delete">X</button>
    `;
    child.classList.add("at-shopping-cart-item");
    document.querySelector('#contenedor-tienda').appendChild(child);
    removeChildProducto(child,producto);
}
function removeChildProducto(child,producto){
    child.querySelector('.js-delete').addEventListener('click',remove);
    function remove(){
        this.parentNode.remove();
        for(let i=0;i<carritoList.length;i++){
            if(carritoList[i].id===producto.id){
                carritoList.splice(i,1);
            }
        }
        document.querySelector('.at-shopping-cart-products-number').innerText=carritoList.length;
        console.log(carritoList);
    }
}
function precioTotal(){
    carritoList.forEach(element => {
        console.log(element.price);
        sumCarrito+=element.price;
    });
    document.querySelector('.at-shopping-cart-total').innerHTML=sumCarrito.toFixed(2)+"€";
}