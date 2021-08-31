import { Component, OnInit } from '@angular/core';
import { ProductDto } from 'src/app/dtos/product.dto';
import { AdminProductService } from '../../services/admin-product.service';

@Component({
  selector: 'app-product-list',
  template: `
    <table class="table">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Name</th>
          <th scope="col">Price Each</th>
          <th scope="col">Size</th>
          <th scope="col">Image</th>
          <th scope="col">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr *ngFor="let dto of dtos; index as i">
          <th scope="row">{{ i + 1 }}</th>
          <td>{{ dto.name }}</td>
          <td>{{ dto.price_each }}</td>
          <td>{{ dto.size }}</td>
          <td>
            <figure>
              <img src="{{ dto.image_url }}"/>
            </figure>
          </td>
          <td>
            <button class='btn btn-primary mr-1 btn-sm'>Edit</button>
            <button class='btn btn-danger btn-sm' (click)='delete(dto)'>Remove</button>
          </td>
        </tr>
        
      </tbody>
    </table>
  `,
  styles: [
    `
      figure {
        width: 100px;
        height: 100px;
        overflow: hidden;
      }

      figure img {
        object-fit: cover;
        width: 100%;
        height: 100%;
      }
    `
  ]
})
export class ProductListComponent implements OnInit {
  dtos: ProductDto[] = []

  constructor(private service: AdminProductService) { }

  ngOnInit(): void {
    this.loadDtos();
  }

  loadDtos(): void {
    this.service.getList().subscribe(
      res => this.dtos = res
    )
  }

  delete(dto: ProductDto): void {
    if (confirm('Are you sure?')) {
      this.service.delete(dto.id).subscribe(
        res => this.dtos = this.dtos.filter(d => d != dto),
        error => alert('Error!')
      )      
    }
  }
}
