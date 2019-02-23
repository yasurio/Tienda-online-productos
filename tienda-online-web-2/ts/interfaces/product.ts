import { Category } from "./category";

export interface Product {
    imagen: string;
    descripcion: string;
    ean13: string;
    id: number;
    precio: number;
    categoria: Category
}