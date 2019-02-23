import { Component, OnInit , Input} from '@angular/core';
import { Product } from '../interface/product';

@Component({
  selector: 'app-container-products',
  templateUrl: './container-products.component.html',
  styleUrls: ['./container-products.component.scss']
})
export class ContainerProductsComponent implements OnInit {

  @Input() product: Product[];
  constructor() { }

  ngOnInit() {
    console.log(this.product);
  }

}
