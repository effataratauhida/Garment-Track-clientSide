import React, { useContext } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import { AuthContext } from "../AuthProvider/AuthProvider";
import Navbar from "../Navbar/Navbar";
import { div } from "framer-motion/client";
import Footer from "../Footer/Footer";

const DashboardLayout = () => {
 //const { user } = useContext(AuthContext);
  const { userRole } = useContext(AuthContext); 
  const { loading } = useContext(AuthContext);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }
  
  return (
      <div >
        <Navbar></Navbar>

    <div className="flex  mt-16 ">
      
      {/* Sidebar */}
      <Sidebar role={userRole} />
     
      {/* Main content */}
      <div className="flex-1 md:p-6 overflow-x-hidden p-3 bg-gray-50">
        <Outlet />
      </div>

    </div>
    <Footer></Footer>
    </div>
  );
};

export default DashboardLayout;




