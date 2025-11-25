import { createBrowserRouter } from "react-router-dom";
import CatalogPage from "../pages/CatalogPage";
import DetailsPage from "../pages/DetailsPage";

export const router = createBrowserRouter([
    { path: "/", element: <CatalogPage /> },
    { path: "/products/:productId", element: <DetailsPage /> }
]);