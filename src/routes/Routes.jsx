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
import DashboardLayout from "../Pages/Dashboard/DashboardLayout";
import MyProfile from "../Pages/Dashboard/buyer/MyProfile";
import MyOrders from "../Pages/Dashboard/buyer/MyOrders"
import TrackOrder from "../Pages/Dashboard/buyer/TrackOrder";
import AddProduct from "../Pages/Dashboard/manager/AddProduct";
import ManageProducts from "../Pages/Dashboard/manager/ManageProducts";
import ApprovedOrders from "../Pages/Dashboard/manager/ApprovedOrders";
import PendingOrders from "../Pages/Dashboard/manager/PendingOrders";
import Profile from "../Pages/Dashboard/manager/Profile";
import ManageUsers from "../Pages/Dashboard/admin/ManageUsers";
import AllProduct from "../Pages/Dashboard/admin/AllProduct";
import AllOrders from "../Pages/Dashboard/admin/AllOrders";
import Booking from "../Pages/Booking/Booking";






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
        },
        {
          path: '/booking/:id',
          Component: Booking
        }
    ]

  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoutes>
        <DashboardLayout></DashboardLayout>
      </PrivateRoutes>
    ),
    children: [
      // buyer
      {path: '/dashboard/myProfile', element: <MyProfile></MyProfile> },
      {path: '/dashboard/myOrders', element: <MyOrders></MyOrders> },
      {path: "/dashboard/trackOrder", element: <TrackOrder></TrackOrder>},
      // manager
      {path: '/dashboard/addProduct', element: <AddProduct></AddProduct> },
      {path: '/dashboard/manageProducts', element: <ManageProducts></ManageProducts>},
      {path: '/dashboard/pendingOrders', element: <PendingOrders></PendingOrders> },
      {path: '/dashboard/ApprovedOrders', element: <ApprovedOrders></ApprovedOrders> },
      {path: '/dashboard/profile', element: <Profile></Profile>},
      //admin
      {path: '/dashboard/manageUsers', element: <ManageUsers></ManageUsers>},
      {path: '/dashboard/allProduct', element: <AllProduct></AllProduct>},
      {path: '/dashboard/allOrders', element: <AllOrders></AllOrders>},
    ]
  }
]);

export default router;