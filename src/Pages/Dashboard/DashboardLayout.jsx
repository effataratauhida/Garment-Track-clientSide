import React, { useContext } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import { AuthContext } from "../AuthProvider/AuthProvider";

const DashboardLayout = () => {
 //const { user } = useContext(AuthContext);
  const { userRole } = useContext(AuthContext); 

  return (
    <div className="flex min-h-screen ">
      {/* Sidebar */}
      <Sidebar role={userRole} />

      {/* Main content */}
      <div className="flex-1 p-6 bg-gray-50">
        <Outlet />
      </div>
    </div>
  );
};

export default DashboardLayout;




