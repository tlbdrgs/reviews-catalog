import { useProducts } from "../service/products";
import ProductCard from "../components/ProductCard/ProductCard";
import ProductCardSkeleton from "../components/ProductCard/ProductCardSkeleton";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";

export default function CatalogPage() {
  const { products, isPending, isError } = useProducts();
  const [searchInput, setSearchInput] = useState("");

  if (isPending) {
    return (
      <div className="bg-stone-100">
        <div className="mx-5 pb-20">
          <h1 className="text-center pt-5 mb-15 text-3xl uppercase font-semibold">
            Product Catalog
          </h1>
          <Skeleton className="w-full max-w-md h-10 mb-10 mx-auto block" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8 xl:gap-10 mt-10">
            {Array.from({ length: 8 }).map((_, i) => (
              <ProductCardSkeleton key={i} />
            ))}
          </div>
        </div>
      </div>
    );
  }

  const filteredProducts = products?.filter((product) => {
    const q = searchInput.toLowerCase();
    return (
      product.name.toLowerCase().includes(q) ||
      product.description.toLowerCase().includes(q)
    );
  });

  return (
    <div className="bg-stone-100">
      <div className="mx-5 pb-20">
        <h1 className="text-center pt-5 mb-15 text-3xl uppercase font-semibold">
          Product Catalog
        </h1>

        <Input
          onChange={(e) => setSearchInput(e.target.value)}
          placeholder="Search products..."
          className="w-full max-w-md mb-10 mx-auto block"
          value={searchInput}
        />

        {isError ? (
          <div className="text-center text-red-600 py-8">
            Failed to load products
          </div>
        ) : (
          <div
            className="
              grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4
              gap-6 lg:gap-8 xl:gap-10
              sm:[&>*]:border-b-2 sm:[&>*]:border-gray-200 sm:[&>*]:pb-6
              sm:[&>*:nth-last-child(-n+2)]:border-b-0
              lg:[&>*:nth-last-child(-n+3)]:border-b-0
              xl:[&>*:nth-last-child(-n+4)]:border-b-0
            "
          >
            {filteredProducts && filteredProducts.length === 0 ? (
              <div className="col-span-full text-center text-gray-500 sm:border-0">
                No products matching: "{searchInput}"
              </div>
            ) : (
              filteredProducts?.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
}
