import { Component, OnInit, Input, Output } from '@angular/core';
import { Product } from '../interface/product';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {
  @Input() product: Product[];
  @Output() result: Product[];
  constructor() { }

  ngOnInit() {
  }
  onKeySearch(event: any) {
    this.result = this.product.filter(article => {
      return article.description.toLowerCase().indexOf(event.target.value.toLowerCase()) !== -1;
    });
  }
}
