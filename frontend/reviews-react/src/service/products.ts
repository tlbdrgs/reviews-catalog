import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import type { Product, Review } from "../entity/types";

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

export function useProduct(productId: string | undefined) {
    const {
        data: product,
        isError,
        isPending
    } = useQuery({
        queryKey: ["product", productId],
        queryFn: async () => {
            if (!productId) {
                throw new Error('Product ID is required');
            }
            const response = await fetch(`${BASE_URL}/products/${productId}`);
            if (!response.ok) {
                throw new Error('Failed to fetch product');
            }
            const products = (await response.json()) as Product[];
            return products[0] || null;
        },
        enabled: !!productId,
    });

    return { product, isError, isPending };
}

export function useAddReview(productId: string) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({ text, rating }: { text: string; rating: number }) => {
            try {
            const response = await fetch(`${BASE_URL}/products/${productId}/reviews`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ text, rating }),
            });

            if (!response.ok) {
                throw new Error("Failed to submit review");
            }

            return (await response.json()) as { product: Product };
            } catch (error) {
                if(error instanceof TypeError)
                    throw new Error("Network error: Unable to reach the server");
                throw error;
            }
        },
        onSuccess: (data) => {
            // Update the single product cache
            queryClient.setQueryData(["product", productId], data.product);
            
            // Also update the products list cache if it exists
            queryClient.setQueryData(["products"], (oldData: Product[] | undefined) => {
                if (!oldData) return oldData;
                return oldData.map(p => p.id === productId ? data.product : p);
            });
        },
    });
}