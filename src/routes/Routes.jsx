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
import RoleRoute from "./RoleRoute";






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
          element: (
          <PrivateRoutes>
            <Booking />
          </PrivateRoutes>
        ),
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
      {path: 'myProfile', 
      element: ( <RoleRoute allowedRoles={['buyer']}>
        <MyProfile></MyProfile>
        </RoleRoute> ) },

      {path: 'myOrders', 
        element: ( <RoleRoute allowedRoles={['buyer']}>
          <MyOrders></MyOrders>
        </RoleRoute>
        ) },

      {path: "trackOrder", 
        element: (<RoleRoute allowedRoles={['buyer']}>
          <TrackOrder></TrackOrder>
        </RoleRoute>)
        },


      // manager
      {path: 'addProduct', 
        element: (<RoleRoute allowedRoles={['manager']}>
          <AddProduct></AddProduct>
        </RoleRoute>)
         },

      {path: 'manageProducts', 
        element: (<RoleRoute allowedRoles={['manager']}>
          <ManageProducts></ManageProducts>
        </RoleRoute>)
        },
      
      {path: 'pendingOrders', 
        element: (<RoleRoute allowedRoles={['manager']}>
          <PendingOrders></PendingOrders>
        </RoleRoute>)  },

      {path: 'ApprovedOrders', 
        element: (<RoleRoute allowedRoles={['manager']}>
          <ApprovedOrders></ApprovedOrders>
        </RoleRoute>)  },

      {path: 'profile', 
        element: (<RoleRoute allowedRoles={['manager']}>
          <Profile></Profile>
        </RoleRoute>) },

      
      //admin
      {path: 'manageUsers', element: <ManageUsers></ManageUsers>},
      {path: 'allProduct', element: <AllProduct></AllProduct>},
      {path: 'allOrders', element: <AllOrders></AllOrders>},
    ]
  }
]);

export default router;