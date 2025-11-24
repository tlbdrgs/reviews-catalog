import { useQuery } from "@tanstack/react-query";
import type { Product } from "../entity/types";

const BASE_URL = import.meta.env.VITE_BACKEND_URL;

export function useProducts() {
    const {
        data: products,
        isError,
        isPending
    } = useQuery({
        queryKey: ["products"],
        queryFn: async () => {
            const response = await fetch(`${BASE_URL}/products`);
            if (!response.ok) {
                throw new Error('Failed to fetch products');
            }
            return (await response.json()) as Product[];
        },
    });

    return { products, isError, isPending };
}