import { createBrowserRouter } from "react-router";
import MainLayout from "./components/Layout/MainLayout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        lazy: async () => {
          const Home = await import("./pages/Home");
          return { Component: Home.default };
        },
      },
      {
        path: "about",
        lazy: async () => {
          const About = await import("./pages/About");
          return { Component: About.default };
        },
      },
      {
        path: "cart",
        lazy: async () => {
          const Cart = await import("./pages/Cart");
          return { Component: Cart.default };
        },
      },
      {
        path: "products/:id",
        lazy: async () => {
          const ProductDetails = await import("./pages/ProductDetails");
          return { Component: ProductDetails.default };
        },
      },
      {
        path: "*",
        lazy: async () => {
          const NotFound404 = await import("./pages/NotFound404");
          return { Component: NotFound404.default };
        },
      },
    ],
  },
]);

export default router;
