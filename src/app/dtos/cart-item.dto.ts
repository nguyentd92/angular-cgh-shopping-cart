import { ProductDto } from "./product.dto";

export type CartItemDto = {
    product: ProductDto;

    quantity: number;

    total: number;
}