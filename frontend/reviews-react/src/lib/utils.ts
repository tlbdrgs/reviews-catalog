import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import type { Review } from "@/entities/types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Calculate the average rating from an array of reviews
 * @param reviews - Array of review objects
 * @returns Average rating or 0 if no reviews
 */
export function calculateAverageRating(reviews: Review[]): number {
  if (reviews.length === 0) return 0;
  return reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length;
}

/**
 * Generate a deterministic image ID from a product ID
 * @param productId - The product ID string
 * @returns A numeric image ID
 */
export function generateImageId(productId: string): number {
  return productId.split("-").reduce((acc, part) => acc + part.charCodeAt(0), 0);
}
