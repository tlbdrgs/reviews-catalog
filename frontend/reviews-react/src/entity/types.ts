export type Review = {
    id: string;
    text: string;
    rating: number;
    createdAt: string;
};

export type Product = {
    id: string;
    name: string;
    description: string;
    image: string;
    reviews: Review[];
}