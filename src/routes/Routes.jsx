import { createBrowserRouter } from "react-router";
import RootLayout from "../RootLayout/RootLayout";
import Home from "../Pages/Home/Home";
import Login from "../Pages/Login/Login";
import Registration from "../Pages/Register/Register";
import AllProducts from "../Pages/AllProducts/AllProducts";
import AboutUs from "../Pages/AboutUs/AboutUs";
import Contact from "../Pages/Contact/Contact";


const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout></RootLayout> ,
    children:[
        {
            path: '/',
            Component: Home
        },
        {
          path: '/allProducts',
          Component: AllProducts
        },
        {
          path: '/aboutUs',
          Component: AboutUs
        },
        {
          path: '/contact',
          Component: Contact
        },
        {
            path: '/login',
            Component: Login
        },
        {
            path: '/register',
            Component: Registration
        }
    ]
  },
]);

export default router;