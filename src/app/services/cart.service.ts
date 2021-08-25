import { Injectable } from "@angular/core";
import { CartItemDto } from "../dtos/cart-item.dto";
import { ProductDto } from "../dtos/product.dto";

const initialCart = []

@Injectable({ providedIn: 'root' })
export class CartService {
    private _cartItemsMap: Map<ProductDto, number> = new Map();

    public get cartItems(): CartItemDto[] {
        return Array.from(this._cartItemsMap.entries()).map(([product, quantity]) => ({
            product: product,
            quantity: quantity
        }))
    }

    public set cartItems(value: CartItemDto[]) {
        this._cartItemsMap = new Map(value.map(({ product, quantity }) => [product, quantity]))
    }

    public get countItems(): number {
        // Logic: Dem so phan tu trong map
        return this._cartItemsMap.size;

        // Logic: Tong quantity
        // return Array.from(this._cartItemsMap.values()).reduce((r, c) => r + c, 0)
    }

    public addToCart(product: ProductDto): void {
        alert('call service')
        this._cartItemsMap.set(product, (this._cartItemsMap.get(product) || 0) + 1)
    }
}