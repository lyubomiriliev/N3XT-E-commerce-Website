import Home from "./pages/Home"
import Header from "./components/Header.jsx"
import {
    createBrowserRouter,
    Outlet,
    RouterProvider,
    ScrollRestoration,
} from "react-router-dom";
import Footer from "./components/Footer.jsx";
import Cart from "./pages/Cart.jsx";
import { productsData } from "./api/Api.js";
import Product from "./components/Product.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Clothing from "./pages/ProductsPages/Clothing.jsx";
import Shoes from "./pages/ProductsPages/Shoes.jsx";
import Jewellery from "./pages/ProductsPages/Jewellery.jsx";
import Bags from "./pages/ProductsPages/Bags.jsx";
import Accessories from "./pages/ProductsPages/Accessories.jsx";
import { ToastContainer } from "react-toastify";
import { useEffect, useState } from "react";
import Shop from "./components/Shop/Shop.jsx";
import ProductsCenter from "./pages/ProductsPages/ProductsCenter.jsx";
import Brands from "./components/Brands/Brands.jsx";

const Layout = () => {

    const [products, setProducts] = useState([]);

    useEffect(() => {
        async function fetchData() {
            try {
                const data = await productsData();
                setProducts(data.data);
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        }

        fetchData();
    }, []);

    return (
        <div>
            <Header products={products} />
            <ScrollRestoration />
            <Outlet />
            <Footer />
        </div>
    );
};

const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        children: [
            {
                path: "/",
                element: <Home />,
                loader: productsData,
            },
            {
                path: "/women",
                element: <Home category="women" />,
                loader: productsData,
            },
            {
                path: "/men",
                element: <Home category="men" />,
                loader: productsData,
            },
            {
                path: "/product/:id",
                element: <Product />,
            },
            {
                path: "/products/:category/:id",
                element: <Clothing />,
                loader: productsData,
            },
            {
                path: "/products/clothing/product/:id",
                element: <Product />,
            },
            {
                path: "/shop",
                element: <Shop />,
                loader: productsData,
            },
            {
                path: "/products/clothing",
                element: <Clothing category="clothing" />,
                loader: productsData,
            },
            {
                path: "/products/jackets",
                element: <Clothing category="clothing" />,
                loader: productsData,
            },
            {
                path: "/products/t-shirts",
                element: <Clothing category="clothing" />,
                loader: productsData,
            },
            {
                path: "/products/shoes",
                element: <Clothing category="shoes" />,
                loader: productsData,
            },
            {
                path: "/products/accessories",
                element: <Clothing category="accessories" />,
                loader: productsData,
            },
            {
                path: "/products/bags",
                element: <Clothing category="bags" />,
                loader: productsData,
            },
            {
                path: "/products/jewellery",
                element: <Clothing category="jewellery" />,
                loader: productsData,
            },
            {
                path: "/products/shoes",
                element: <Shoes />
            },
            {
                path: "/products/accessories",
                element: <Accessories />
            },
            {
                path: "/products/bags",
                element: <Bags />
            },
            {
                path: "/products/Jewellery",
                element: <Jewellery />
            },
            {
                path: "/brands/",
                element: <Brands />
            },
            {
                path: "/cart",
                element: <Cart />,
            },
            {
                path: "/login",
                element: <Login />,
            },
            {
                path: "/register",
                element: <Register />
            },
            {
                path: "/sale",
                element: <ProductsCenter />,
                loader: productsData,
            }
        ]
    }
])

function App() {

    return (
        <RouterProvider router={router} />
    )
}

export default App
