import jQuery = require('jquery');
import { Service } from "./components/service";
import { Cart } from "./components/cart";
import { Product } from "./interfaces/product";

let s = new Service('http://localhost:8080/tienda/producto/findAll');

s.loadData((data: Product[]) => init());



function init() {
    $('.toast').toast({
        autohide: true,
        delay: 5000
    });
    
    let cart =  new Cart(s.data);
    cart.init();
}