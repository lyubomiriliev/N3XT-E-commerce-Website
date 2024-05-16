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
import { useEffect, useState } from "react";
import ProductsCenter from "./pages/ProductsPages/ProductsCenter.jsx";
import Brands from "./components/Brands/Brands.jsx";
import { useSelector } from "react-redux";
import { links } from "./components/HeaderLinks.js";
import ShopCategory from "./components/ShopCategory.jsx";

const Layout = () => {

    const [products, setProducts] = useState([]);
    const selectedSexCategory = useSelector((state) => state.next.sexCategory)

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
            <Outlet >
                <Home category={`${selectedSexCategory}`} />
            </Outlet>
            <Footer />
        </div>
    );
};

const AppRouter = () => {

    const [products, setProducts] = useState([]);
    const selectedSexCategory = useSelector((state) => state.next.sexCategory);


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

    const submenuOptions = ['clothing', 'shoes', 'bags', 'accessories', 'jewellery']

    const generateSubmenuRoutes = () => {
        return submenuOptions.map((submenuOption) => ({
            path: `/${selectedSexCategory.toLowerCase()}/${submenuOption}`,
            element: <Clothing category={submenuOption} />,
            loader: productsData,
        }));
    };


    const linksMenuRoute = () => {
        return links.flatMap((link) => {
            if (link.submenu) {
                return link.sublinks.map((sublink) => ({
                    path: `/${selectedSexCategory.toLowerCase()}${link.dir}/${sublink.name.toLowerCase()}`,
                    element: <ShopCategory />,
                }))
            } else {
                return []
            }
        })
    }

    const router = createBrowserRouter([
        {
            path: "/",
            element: <Layout />,
            children: [
                {
                    path: '/women',
                    element: <Home products={products} />,
                },
                {
                    path: '/men',
                    element: <Home products={products} />,
                },
                ...generateSubmenuRoutes(),
                ...linksMenuRoute(),
                {
                    path: "/product/:id",
                    element: <Product />,
                },
                {
                    path: `/${selectedSexCategory}/brands`,
                    element: <Brands />
                },
                {
                    path: `/${selectedSexCategory}/brands`,
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
                    path: `/${selectedSexCategory}/sale`,
                    element: <ProductsCenter />,
                    loader: productsData,
                }
            ]
        }
    ]);

    return <RouterProvider router={router} />

}



function App() {

    return (
        <AppRouter />
    )
}

export default App
