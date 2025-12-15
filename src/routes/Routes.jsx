import { createBrowserRouter } from "react-router";
import RootLayout from "../RootLayout/RootLayout";
import Home from "../Pages/Home/Home";
import Login from "../Pages/Login/Login";
import Registration from "../Pages/Register/Register";
import AllProducts from "../Pages/AllProducts/AllProducts";
import AboutUs from "../Pages/AboutUs/AboutUs";
import Contact from "../Pages/Contact/Contact";
import ProductDetails from "../Pages/ProductDetails/ProductDetails";
import PrivateRoutes from "../Pages/PrivateRoutes/PrivateRoutes";
import Error from "../Pages/Error/Error";




const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout></RootLayout> ,
    errorElement: <Error></Error> ,
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
        },
        {
            path: '/productDetails/:id',
            element: (
              <PrivateRoutes>
                <ProductDetails></ProductDetails>
              </PrivateRoutes>
                
              
            ) 
        }
    ]
  },
]);

export default router;