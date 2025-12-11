import { createBrowserRouter } from "react-router";
import RootLayout from "../RootLayout/RootLayout";
import Home from "../Pages/Home/Home";
import Login from "../Pages/Login/Login";
import Registration from "../Pages/Register/Register";


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