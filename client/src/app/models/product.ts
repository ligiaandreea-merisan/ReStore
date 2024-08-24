export interface Product {
    id: number;
    name: string;
    descriprion: string;
    price: number;
    pictureUrl: string;
    type?: string;
    brand: string;
    quantityInStock?: number;
}