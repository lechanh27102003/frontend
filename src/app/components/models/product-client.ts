export interface ProductClient {
    id: string;
    name: string;
    price: number;
    description: string;
    image: string;
    categoryId: string;
    status: number;
    stock: number;
    deleteDate: Date | null;
    updateDate: Date | null;
    __v: number;
    rating: number;
}