import { CartProduct } from "./cart-product";

export interface Cart {
    id: number;
    quantity: number;
    unitPrice: number;
    totalPrice: number;
    product: CartProduct;
}
