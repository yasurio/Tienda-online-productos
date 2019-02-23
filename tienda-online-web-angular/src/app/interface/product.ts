import { Category } from './category';

export interface Product {
    img: string;
    ean13: string;
    description: string;
    price: number;
    id: number;
    category: Category;
}