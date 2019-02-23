export interface Category{
    id:number;
    imagen: string;
    descripcion: string;
    ean13: string;
    precio: number;
    categoria : Category;
}