import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-product',
  template: `
    <div><a class="btn btn-primary mb-3" routerLink='create'>Add</a></div>
    <div>
      <router-outlet></router-outlet>
    </div>
  `,
  styles: [
  ]
})
export class ProductComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
}
