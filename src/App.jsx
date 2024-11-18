import Header from "./components/Header";
import Footer from "./components/Footer";
import {
  createBrowserRouter,
  Navigate,
  Outlet,
  RouterProvider,
  ScrollRestoration,
} from "react-router-dom";
import { useSelector } from "react-redux";

import {
  generateStaticRoutes,
  generateSubmenuRoutes,
  linksMenuRoute,
} from "./utils/routes.jsx";
import { ToastContainer } from "react-toastify";

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

const AppRouter = () => {
  const selectedSexCategory = useSelector((state) => state.next.sexCategory);

  try {
    if (!selectedSexCategory) {
      return <div>Loading...</div>; // Fallback UI if selectedSexCategory is not set yet
    }

    const router = createBrowserRouter([
      {
        path: "/",
        element: <Layout />,
        children: [
          {
            path: "/",
            element: <Navigate to="/women" replace />,
          },
          ...generateStaticRoutes(selectedSexCategory), // Generates static routes for men/women
          ...generateSubmenuRoutes(selectedSexCategory), // Generates dynamic submenu routes
          ...linksMenuRoute(selectedSexCategory), // Generates dynamic links from HeaderLinks.js
        ],
      },
    ]);

    return <RouterProvider router={router} />;
  } catch (error) {
    console.error("Error in AppRouter: ", error); // Log the error for debugging
    return <div>Error: Something went wrong. Please try again.</div>; // Fallback UI in case of error
  }
};

function App() {
  return (
    <div>
      <AppRouter />
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </div>
  );
}

export default App;
