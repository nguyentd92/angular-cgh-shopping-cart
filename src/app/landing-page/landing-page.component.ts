import { Component, OnInit } from '@angular/core';
import { ProductDto } from '../dtos/product.dto';
import { CartService } from '../services/cart.service';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent implements OnInit {
  constructor(
    private productService: ProductService,
    private cartService: CartService
  ) { }

  ngOnInit(): void {
  }

  get products(): ProductDto[] {
    return this.productService.products;
  }

  addToCart(value: ProductDto): void {
    this.cartService.addToCart(value)
  }
}
