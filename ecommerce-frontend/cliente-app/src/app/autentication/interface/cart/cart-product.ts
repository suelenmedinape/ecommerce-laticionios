export interface CartProduct {
    id: number;
    productName: string;
    description: string;
    price: number;
    quantity: number;
}

export interface Cart {
    id: number;
    quantity: number;
    unitPrice: number;
    totalPrice: number;
    product: CartProduct;
}