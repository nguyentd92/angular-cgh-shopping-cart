import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin',
  template: `
   <div class="d-flex justify-between">
      <div class="p-2">
        <ul class="list-group">
          <li class="list-group-item"><a routerLinkActive='text-danger' routerLink='/admin/product'>Product</a></li>
          <li class="list-group-item"><a routerLinkActive='text-danger' routerLink='/admin/category'>Category</a></li>
          <li class="list-group-item">Morbi leo risus</li>
          <li class="list-group-item">Porta ac consectetur ac</li>
          <li class="list-group-item">Vestibulum at eros</li>
        </ul>
      </div>

      <div class='px-3 py-2 flex-grow-1'>
        <router-outlet></router-outlet>
      </div>
    </div>
  `,
  styles: [
  ]
})
export class AdminComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
