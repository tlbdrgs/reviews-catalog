import { useProducts } from "../service/products";
import ProductCard from "../components/ProductCard";
import { Fragment } from "react";
import { Input } from "@/components/input";

export default function CatalogPage() {
    const { products, isPending, isError } = useProducts();

    if (isPending) {
        return <div>Loading products...</div>;
    }

    if (isError) {
        return <div>Failed to load products</div>;
    }

    return (
        <>
        <div>
            <div className="mx-5 mb-20">
                <h1 className="text-center mb-15 text-3xl uppercase font-semibold">Product Catalog</h1>
                <Input placeholder="Search products..." className="w-full max-w-md mb-10 mx-auto block" />
                <div className="grid grid-cols-4 gap-10">
                    {products?.map((product, index) => (
                        <Fragment key={product.id}>
                            <ProductCard product={product} />
                            {(index + 1) % 4 === 0 && index !== products.length - 1 && (
                                <div className='col-span-4 my-8 border-b-2 border-gray-200'></div>
                            )}
                        </Fragment>
                    ))}
                </div>
            </div>
        </div></>
    );
}