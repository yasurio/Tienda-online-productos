import { Component, OnInit, Input } from '@angular/core';
import { Logo } from '../interface/logo';
import { Nav } from '../interface/nav';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Input() name: string;
  @Input() username: string;
  @Input() logo: Logo;
  @Input() nav: Nav[];
  constructor() {
    this.name = 'Alberto';
    this.username = 'Amado';
  }
  ngOnInit(): void { }
}
