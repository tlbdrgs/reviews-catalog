import { useProducts } from "../service/products";
import ProductCard from "../components/ProductCard/ProductCard";
import ProductCardSkeleton from "../components/ProductCard/ProductCardSkeleton";
import { useState, useEffect, Fragment } from "react";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";

export default function CatalogPage() {
  const { products, isPending, isError } = useProducts();
  const [searchInput, setSearchInput] = useState("");
  const [columns, setColumns] = useState(1); // how many cards per row at current width

  // Simple breakpoint logic matching Tailwind:
  // grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4
  useEffect(() => {
    if (typeof window === "undefined") return;

    const updateColumns = () => {
      const width = window.innerWidth;
      if (width >= 1280) setColumns(4); // xl
      else if (width >= 1024) setColumns(3); // lg
      else if (width >= 640) setColumns(2); // sm
      else setColumns(1); // default
    };

    updateColumns();
    window.addEventListener("resize", updateColumns);
    return () => window.removeEventListener("resize", updateColumns);
  }, []);

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

  if (isError) {
    return <div>Failed to load products</div>;
  }

  function handleSearch(event: React.ChangeEvent<HTMLInputElement>) {
    setSearchInput(event.target.value);
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
          onChange={handleSearch}
          placeholder="Search products..."
          className="w-full max-w-md mb-10 mx-auto block"
          value={searchInput}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8 xl:gap-10">
          {filteredProducts && filteredProducts.length === 0 ? (
            <div className="col-span-full text-center text-gray-500">
              No products matching: "{searchInput}"
            </div>
          ) : (
            filteredProducts?.map((product, index) => {
              const isLastItem = index === filteredProducts.length - 1;
              const isEndOfRow = (index + 1) % columns === 0;
              const shouldShowLine = isEndOfRow && !isLastItem;

              return (
                <Fragment key={product.id}>
                  <ProductCard product={product} />
                  {shouldShowLine && (
                    <div className="col-span-full my-8 border-b-2 border-gray-200" />
                  )}
                </Fragment>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
