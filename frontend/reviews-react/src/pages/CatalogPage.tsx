import { useProducts } from "../service/products";
import ProductCard from "../components/ProductCard";
import { useState } from "react";
import { Fragment } from "react";
import { Input } from "@/components/input";

export default function CatalogPage() {
    const { products, isPending, isError } = useProducts();
    const [searchInput, setSearchInput] = useState("");

    if (isPending) {
        return <div>Loading products...</div>;
    }

    if (isError) {
        return <div>Failed to load products</div>;
    }

    function handleSearch(event: React.ChangeEvent<HTMLInputElement>) {
        setSearchInput(event.target.value);
    }
    
    const filteredProducts = products?.filter((product) => {
        return product.name.toLowerCase().includes(searchInput.toLowerCase()) ||
               product.description.toLowerCase().includes(searchInput.toLowerCase());
    });

    return (
        <>
        <div className="bg-stone-100">
            <div className="mx-5 pb-20">
                <h1 className="text-center mb-15 text-3xl uppercase font-semibold">Product Catalog</h1>
                <Input onChange={handleSearch} placeholder="Search products..." className="w-full max-w-md mb-10 mx-auto block"/>
                <div className="grid grid-cols-4 gap-10">
                    {filteredProducts && filteredProducts.length === 0 ? (
                        <div className="col-span-4 text-center text-gray-500">No products matching: "{searchInput}"</div>
                    ) : (
                        filteredProducts?.map((product, index) => (
                            <Fragment key={product.id}>
                                <ProductCard product={product} />
                                {(index + 1) % 4 === 0 && index !== filteredProducts.length - 1 && (
                                    <div className='col-span-4 my-8 border-b-2 border-gray-200'></div>
                                )}
                            </Fragment>
                        ))
                    )}
                </div>
            </div>
        </div></>
    );
}