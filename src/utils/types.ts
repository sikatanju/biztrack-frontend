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