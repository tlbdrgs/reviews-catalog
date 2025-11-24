import { Link } from "react-router-dom";
import { useProducts } from "../service/products";

export default function CatalogPage() {
    const { products, isPending, isError } = useProducts();

    if (isPending) {
        return <div className="loading">Loading products...</div>;
    }

    if (isError) {
        return <div className="error">Failed to load products</div>;
    }

    return (
        <div className="catalog">
            <h1>Product Catalog</h1>
            <div className="products-grid">
                {products?.map((product) => (
                    <Link 
                        key={product.id} 
                        to={`/products/${product.id}`}
                        className="product-card"
                    >
                        <img 
                            src={product.image} 
                            alt={product.name}
                            className="product-image"
                        />
                        <h2>{product.name}</h2>
                        <p>{product.description}</p>
                        <div className="reviews-count">
                            {product.reviews.length} review{product.reviews.length !== 1 ? 's' : ''}
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}