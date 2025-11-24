import { createBrowserRouter } from "react-router-dom";
import CatalogPage from "../pages/CatalogPage";

export const router = createBrowserRouter([
    { path: "/", element: <CatalogPage /> },
    // { path: "/products/:productId", element: <ProductDetailsPage /> }
]);