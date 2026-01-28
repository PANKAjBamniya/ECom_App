export interface Product {
    id: number;
    title: string;
    price: number;
    thumbnail?: string;
}

export interface OrderItem {
    id: number;
    title: string;
    price: number;
    quantity: number;
    thumbnail: string;
}

export interface Order {
    orderId: string;
    items: OrderItem[];
    totalAmount: number;
    createdAt: string;
}

