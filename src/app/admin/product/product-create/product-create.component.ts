import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ProductDto } from 'src/app/dtos/product.dto';
import { AdminProductService } from '../../services/admin-product.service';

const toBase64 = (file: File) => new Promise<string>((resolve, reject) => {
  const reader = new FileReader();
  reader.readAsDataURL(file);
  // @ts-ignore
  reader.onload = () => resolve(reader.result);
  reader.onerror = error => reject(error);
});

const initFormValue = {
  name: '',
  price_each: 0,
  size: 'M',
  image_url: ''
}

@Component({
  selector: 'app-product-create',
  template: `
    <form [formGroup]='form' (ngSubmit)='submit()'>
      <div class="form-group">
        <label for="exampleFormControlInput1">Name</label>

        <input type="text" class="form-control" formControlName='name' id="formName" placeholder="name@example.com">
        <span class="text-danger" *ngIf='form?.controls?.name?.dirty && form?.controls?.name?.errors'>
          {{ form?.controls?.name?.errors?.required ? 'This field is required' : 'Name must less or equals than 30' }}
        </span>
      </div>

      <div class="form-group">
        <label for="exampleFormControlSelect1">Price Each</label>

        <input type="number" class="form-control" formControlName='price_each' id="exampleFormControlInput1" placeholder="name@example.com">
        <span class="text-danger" *ngIf='form?.controls?.price_each?.dirty && form?.controls?.price_each?.errors'>
          {{ form?.controls?.price_each?.errors?.required ? 'This field is required' : 'Name must less or equals than 30' }}
        </span>
      </div>

      <div class="form-group">
        <label for="exampleFormControlSelect2">Size</label>
        <select class="form-control" formControlName='size'>
          <option>XS</option>
          <option>S</option>
          <option>M</option>
          <option>L</option>
          <option>XL</option>
          <option>XXL</option>
        </select>
      </div>

      <input type='file' (change)="handleChangeImage($event)" #inputImage />

      <button (click)="inputImage.click()" class="btn btn-primary btn-sm">Choose cover image</button>

      <figure *ngIf='form?.controls?.image_url?.value'>
        <img class="d-block" src="{{ form?.controls?.image_url?.value }}" />
      </figure>

      <button class="btn btn-primary d-block mt-4">Submit</button>
    </form>

    <pre>{{ form.value | json }}</pre>
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
  form!: FormGroup;

  constructor(
    private productService: AdminProductService,
    private formBuilder: FormBuilder,
    private toastrService: ToastrService
  ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: ['', [Validators.required, Validators.maxLength(30)]], // Tuple [string, Array]
      price_each: [0, [Validators.required, Validators.min(1)]],
      size: ['M', [Validators.required]],
      image_url: ['']
    })
  }

  async handleChangeImage(event: any) {
    console.log(event.target.files)

    this.form.patchValue({
      image_url: await toBase64(event.target.files[0]),
      price_each: 10000000
    })
  }

  submit() {
    Object.keys(this.form.controls) // ['name', 'price_each', 'size', 'image_url']
      .forEach(key => this.form.controls[key].markAsDirty())

    if (this.form.invalid)
      return

    // DRY
    // Don't repeat yourself

    const { name, price_each, size, image_url } = this.form.value;

    const dto: ProductDto = {
      name: name,
      price_each: price_each,
      size: size,
      image_url: image_url
    } as ProductDto

    // Send post data to server
    // When response is success, reset form
    // When error then alert error
    this.productService.add(dto)
      .subscribe(
        res => {
          this.toastrService.success('Create successfully!', dto.name)
          this.form.reset(),
          this.form.patchValue(initFormValue)
        },
        error => alert(error.message)
      )
  }
}
