import { Component } from '@angular/core';
import { CartItemDto } from '../dtos/cart-item.dto';
import { ProductDto } from '../dtos/product.dto';
import { CartService, Coupon } from '../services/cart.service';

@Component({
  selector: 'app-cart',
  styleUrls: ['./cart.component.scss'],
  templateUrl: './cart.component.html'
})
export class CartComponent {
  code = '';

  constructor(private cartService: CartService) { }

  get cartItems(): CartItemDto[] {
    return this.cartService.cartItems
  }

  get selectedCoupon(): Coupon | undefined {
    return this.cartService.selectedCoupon
  }

  check() {
    if (this.cartService.checkCoupon(this.code)) {
      this.cartService.setSelectedCoupon(this.code)
      return;
    }

    alert('Your code is not valid!')
  }

  get discountValue(): number {
    return this.cartService.discountValue
  }

  get cartTotal(): number {
    return this.cartService.total;
  }

  get cartTotalPrice(): number {
    return this.cartService.totalPrice
  }

  removeItemFromCart(product: ProductDto): void {
    this.cartService.removeFromCart(product)
  }

  changeQuantity(product: ProductDto, event: any): void {
    const value = event.target.value;

    this.cartService.setQuantity(product, value)
  }
}
