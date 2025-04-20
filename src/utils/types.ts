export interface CategoryInf {
    id: number;
    title: string;
    created_at: string;
    updated_at: string;
    user_id: string;
}

export interface CustomerInf {
    id: number;
    name: string;
    email: string;
    phone: string;
    user_id: number;
    created_at: string;
    updated_at: string;
}

export interface InvoiceInf {
    id: number;
    total: string;
    discount: string;
    vat: string;
    payable: string;
    user_id: number;
    customer: CustomerInf;
}

export interface ProductInf {
    id: number;
    user_id: number;
    category_id: number;
    title: string;
    price: string;
    unit: string;
    image: ProductImageInf;
    created_at: string;
    updated_at: string;
}

interface ProductImageInf {
    id: number;
    image: string;
}