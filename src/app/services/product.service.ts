import { Injectable } from '@angular/core';
import { ProductDto } from '../dtos/product.dto';

const initialProducts: ProductDto[] = [
  {
    id: 1,
    name: `Women's Blouse`,
    price_each: 16,
    size: 'M',
    image_url: '/assets/images/bags/bag_1.jpeg'
  },
  {
    id: 2,
    name: `Men's Plain TShirt`,
    price_each: 16,
    size: 'M',
    image_url: '/assets/images/bags/bag_2.jpeg'
  },
  {
    id: 3,
    name: `Women's Blouse`,
    price_each: 16,
    size: 'M',
    image_url: '/assets/images/bags/bag_3.jpeg'
  },
  {
    id: 4,
    name: `Men's Blouse`,
    price_each: 20,
    size: 'M',
    image_url: '/assets/images/bags/bag_4.jpeg'
  }
]

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private _products: ProductDto[] = initialProducts;

  public get products(): ProductDto[] {
    return [...this._products];
  }

  public set products(value: ProductDto[]) {
    this._products = value;
  }
}
