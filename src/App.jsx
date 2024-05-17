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
import ProductsCenter from "./pages/ProductsPages/ProductsCenter.jsx";
import Brands from "./components/Brands/Brands.jsx";
import { useSelector } from "react-redux";
import { links } from "./components/HeaderLinks.js";
import ShopCategory from "./components/ShopCategory.jsx";

const Layout = () => {


    return (
        <div>
            <Header />
            <ScrollRestoration />
            <Outlet >
                <Home />
            </Outlet>
            <Footer />
        </div>
    );
};

const AppRouter = () => {

    const selectedSexCategory = useSelector((state) => state.next.sexCategory);

    const submenuOptions = ['clothing', 'shoes', 'bags', 'accessories', 'jewellery']

    const generateSubmenuRoutes = () => {
        return submenuOptions.map((submenuOption) => ({
            path: `/${selectedSexCategory.toLowerCase()}/${submenuOption}`,
            element: <Clothing category={submenuOption} />,
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
                    element: <Home />,
                },
                {
                    path: '/men',
                    element: <Home />,
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
