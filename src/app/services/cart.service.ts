import { Injectable } from "@angular/core";
import { CartItemDto } from "../dtos/cart-item.dto";
import { ProductDto } from "../dtos/product.dto";

const initialCart = []

export type Coupon = {
    code: string;
    formulae: string;
    title: string;
}

@Injectable({ providedIn: 'root' })
export class CartService {
    private coupons: Coupon[] = [
        {
            code: 'aMaWWRTmf8fkT2yS',
            formulae: '{total}-5',
            title: 'Discount value 5$'
        },
        {
            code: 'Yt9mHzEs9t9UA43L',
            formulae: '{total} * 95 / 100',
            title: 'Discount 5%'
        },
        {
            code: '4CEJF2AKFTNTvmP6',
            formulae: '{total} * 70 / 100',
            title: 'Discount 30%'
        }
    ]

    private _selectedCoupon!: Coupon | undefined;

    private _cartItemsMap: Map<ProductDto, number> = new Map();

    constructor() {
        this._cartItemsMap = new Map<ProductDto, number>(
            localStorage.getItem('CART') ? JSON.parse(localStorage.getItem('CART') || '') : []);
    }

    get discountValue(): number {
        return this.total - this.totalPrice
    }

    public get selectedCoupon(): Coupon | undefined {
        return this._selectedCoupon;
    }

    public setSelectedCoupon(code: string) {
        this._selectedCoupon = this.couponMap.get(code);
    }

    checkCoupon(code: string): boolean {
        return this.couponMap.has(code);
    }

    get couponMap(): Map<string, Coupon> {
        return new Map(this.coupons.map((c) => [c.code, c]))
    }

    public get cartItems(): CartItemDto[] {
        return Array.from(this._cartItemsMap.entries()).map(([product, quantity]) => ({
            product: product,
            quantity: quantity,
            total: product.price_each * quantity
        }))
    }

    get total(): number {
        return !this._selectedCoupon ? this.totalPrice :
            eval(this._selectedCoupon.formulae.replace('{total}', this.totalPrice.toString()))
    }

    get totalPrice(): number {
        return this.cartItems.reduce((r, c) => r + c.total, 0)
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
        this._cartItemsMap.set(product, (this._cartItemsMap.get(product) || 0) + 1)

        this._saveToLC();
    }

    public removeFromCart(product: ProductDto): void {
        this._cartItemsMap.delete(product);

        this._saveToLC();
    }

    public setQuantity(product: ProductDto, quantity: number): void {
        if (quantity < 1) {
            this.removeFromCart(product);
            return;
        }

        this._cartItemsMap.set(product, quantity);

        this._saveToLC();
    }

    private _saveToLC(): void {
        console.log(this._cartItemsMap.entries())
        localStorage.setItem('CART', JSON.stringify(Array.from(this._cartItemsMap.entries())))
    }
}