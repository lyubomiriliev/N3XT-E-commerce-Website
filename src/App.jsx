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
import Sale from "./components/Sale.jsx";

const Layout = () => {
  return (
    <div>
      <Header />
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
        path: "/product/:id",
        element: <Product />,
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
        element: <Sale />
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
