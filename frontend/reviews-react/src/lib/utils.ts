import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import type { Review } from "@/entities/types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function calculateAverageRating(reviews: Review[]): number {
  if (reviews.length === 0) return 0;
  return reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length;
}

export function generateImageId(productId: string): number {
  return productId.split("-").reduce((acc, part) => acc + part.charCodeAt(0), 0);
}
