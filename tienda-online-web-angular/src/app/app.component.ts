import { Component, OnInit } from '@angular/core';
import { Logo } from '../app/interface/logo';
import { Nav } from './interface/nav';
import { Product } from './interface/product';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  logoObj: Logo;
  navObjList: Nav[];
  productObjList: Product[];
  constructor() { }
  ngOnInit(): void {
    this.logoObj = { img: 'assets/images/frontend.png', titulo: 'Training' };
    this.navObjList = [
      {
        title: 'Inicio', url: '#', text: 'Mi inicio'
      },
      {
        title: 'Categoria', url: '#', text: 'Mis Categorias',
        subnav: [
          {
            title: 'Producto 1', url: '#', text: 'Producto #1',
          },
          {
            title: 'Producto 2', url: '#', text: 'Producto #2',
          },
          {
            title: 'Producto 3', url: '#', text: 'Producto #3',
          }
        ]
      },
      {
        title: 'Mis Pedidos', url: '#', text: 'Lista de pedidos'
      },
    ];
    this.productObjList = [
      {
        img: 'https://www.miuruguay.com.uy/wp-content/uploads/2018/01/xiaomi-mi-notebook-air-125-gold-01_14460_1469632275.jpg',
        ean13: '51546486544863',
        description: 'NoteBook Air 13.',
        price: 1549,
        id: 15,
        category: { code: '001', description: 'Categoria 1', id: 10 }
      },
      {
        img: 'https://static.digit.in/product/1563_1_0.jpg',
        ean13: '51546486544863',
        description: 'Dell Inspire',
        price: 1119,
        id: 14,
        category: { code: '001', description: 'Categoria 1', id: 10 }
      },
      {
        img: 'http://cdn.laptopmag.com/images/uploads/5540/g/lasus-zenbook-pro-001-lede.jpg',
        ean13: '51546486544863',
        description: 'Asus Zeenbook',
        price: 949,
        id: 17,
        category: { code: '001', description: 'Categoria 1', id: 10 }
      },
      {
        img: 'https://ssl-product-images.www8-hp.com/digmedialib/prodimg/lowres/c05653301.png',
        ean13: '51546486544863',
        description: 'HP Spectre',
        price: 1949,
        id: 13,
        category: { code: '001', description: 'Categoria 1', id: 10 }
      }];
  }
}
