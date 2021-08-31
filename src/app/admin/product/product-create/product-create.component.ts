import { Component, OnInit } from '@angular/core';
import { ProductDto } from 'src/app/dtos/product.dto';

const toBase64 = (file: File) => new Promise<string>((resolve, reject) => {
  const reader = new FileReader();
  reader.readAsDataURL(file);
  // @ts-ignore
  reader.onload = () => resolve(reader.result);
  reader.onerror = error => reject(error);
});

@Component({
  selector: 'app-product-create',
  template: `
    <form>
      <div class="form-group">
        <label for="exampleFormControlInput1">Name</label>
        <input type="email" class="form-control" id="exampleFormControlInput1" placeholder="name@example.com">
      </div>

      <div class="form-group">
        <label for="exampleFormControlSelect1">Price Each</label>

        <input type="number" class="form-control" id="exampleFormControlInput1" placeholder="name@example.com">
      </div>

      <div class="form-group">
        <label for="exampleFormControlSelect2">Size</label>
        <select multiple class="form-control" id="exampleFormControlSelect2">
          <option>XS</option>
          <option>S</option>
          <option>M</option>
          <option>L</option>
          <option>XL</option>
          <option>XXL</option>
        </select>
      </div>

      <input type='file' (click)="this.dto.image_url = ''" (change)="handleChangeImage($event)" #inputImage />

      <button (click)="inputImage.click()" class="btn btn-primary btn-sm">Choose cover image</button>

      <figure>
        <img class="d-block" *ngIf='dto.image_url' src="{{ dto.image_url }}" />
      </figure>

      <button class="btn btn-primary d-block mt-4">Submit</button>
    </form>
  `,
  styles: [
    `
      figure {
        width: 200px;
        height: 200px;
        overflow: hidden;
      }

      figure img {
        object-fit: cover;
        height: 100%;
        width: 100%;
      }
    `
  ]
})
export class ProductCreateComponent implements OnInit {
  dto: ProductDto = {
    id: 1,
    name: 'Test',
    price_each: 20,
    size: 'M',
    image_url: ''
  }

  constructor() { }

  ngOnInit(): void {
  }

  async handleChangeImage(event: any) {
    console.log(event.target.files)

    this.dto.image_url = await toBase64(event.target.files[0])
  }
}
