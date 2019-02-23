import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { Product } from '../interface/product';
import { EmitterVisitorContext } from '@angular/compiler';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  @Input() data: Product;
  @Output() itemButton: EventEmitter<any> = new EventEmitter();
  constructor() {

  }
  ngOnInit() {
  }
  hdAddItemButton(event) {
    event.preventDefault();
    this.itemButton.emit(this.data);
  }
}
