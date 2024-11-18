// routes.js
import Product from "../components/Product";
import Cart from "../pages/Cart";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Clothing from "../pages/ProductsPages/Clothing";
import Brands from "../components/Brands/Brands";
import Sale from "../pages/Sale";
import { links } from "../components/HeaderLinks";
import Home from "../pages/Home";
import Wishlist from "../pages/Wishlist";
import UserProfile from "../pages/UserProfile";
import Completed from "../components/Completed";

// Dynamic Submenu Routes
export const generateSubmenuRoutes = (selectedSexCategory) => {
  const submenuOptions = [
    "clothing",
    "shoes",
    "bags",
    "accessories",
    "jewellery",
  ];
  return submenuOptions.map((submenuOption) => ({
    path: `/${selectedSexCategory.toLowerCase()}/${submenuOption}`,
    element: <Clothing />,
  }));
};

// Dynamic Links Menu Routes
export const linksMenuRoute = (selectedSexCategory) => {
  return links.flatMap((link) => {
    if (link.submenu) {
      return link.sublinks.map((sublink) => ({
        path: `/${selectedSexCategory.toLowerCase()}${
          link.dir
        }/${sublink.name.toLowerCase()}`,
        element: <Clothing />,
      }));
    }
    return [];
  });
};

// Static Routes
export const generateStaticRoutes = (selectedSexCategory) => [
  { path: "/men", element: <Home /> },
  { path: "/women", element: <Home /> },
  { path: "/product/:id", element: <Product /> },
  { path: `/${selectedSexCategory}/brands`, element: <Brands /> },
  { path: "/profile", element: <UserProfile /> },
  { path: "/cart", element: <Cart /> },
  { path: "/wishlist", element: <Wishlist /> },
  { path: "/login", element: <Login /> },
  { path: "/register", element: <Register /> },
  { path: "/order-completed", element: <Completed /> },
  { path: `/${selectedSexCategory}/sale`, element: <Sale /> },
];
