import { LayoutDashboard } from "lucide-react";
import React, { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../AuthProvider/AuthProvider";
import { HiScissors } from "react-icons/hi";

const Sidebar = () => {

  const { role } = useContext(AuthContext);
  
  //console.log("SIDEBAR ROLE", role);

  const roleLabel = role
  ? role.charAt(0).toUpperCase() + role.slice(1)
  : "User";
  
  let links = [];

  if(role === "buyer") {
    links = [
      
      { name: "My Orders", to: "/dashboard/myOrders" },
      { name: "Track Order", to: "/dashboard/trackOrder" },
      { name: "My Profile", to: "/dashboard/myProfile" },
    ];
  } else if(role === "manager") {
    links = [
      { name: "Add Product", to: "/dashboard/addProduct" },
      { name: "Manage Products", to: "/dashboard/manageProducts" },
      { name: "Pending Orders", to: "/dashboard/pendingOrders" },
      { name: "Approved Orders", to: "/dashboard/approvedOrders" },
      { name: "My Profile", to: "/dashboard/profile" },
      
    ];
  } else if(role === "admin") {
    links = [
      
      { name: "Manage Users", to: "/dashboard/manageUsers" },
      { name: "All Product", to: "/dashboard/allProduct" },
      { name: "All Orders", to: "/dashboard/allOrders" },
   
    ];
  }

  
  // const handleLogout = () => { 
  //       signOutUser()
  //       .then(() => {
  //           toast.success("Logged out successfully!");
  //           navigate("/");
  //       })
  //       .catch(err => 
  //           console.log(err));
  //   };

  return (
    <div className="w-64 max-w-11/12 mx-auto bg-gray-200 shadow-md min-h-screen p-4 flex flex-col">
      <div>
      
      {/* logo */}
      {/* <Link to='/' className="flex items-center hover:scale-105 ">
                    <span className="text-black"><HiScissors className='h-7 w-7'  /></span>
                    <h2 className='text-gray-800 font-bold text-2xl'>
                     Garment<span className='text-[#F83600]'>Track</span>
                    </h2>
                     
        </Link> */}
        <p className="text-base font-semibold text-gray-600 mt-2 mb-4 text-center">
           {roleLabel} Dashboard
        </p>

        <div className="text-gray-600">
          <hr />
        </div>
      </div>
      
      {/* Links */}
      <ul className="space-y-2 mt-3">
        {links.map(link => (
          <li key={link.to}>
            <NavLink
              to={link.to}
             style={({ isActive }) => ({
          background: isActive
            ? "linear-gradient(90deg,#F83600,#F9D423) "
            : "transparent",
          color: isActive ? "white" : "#F83600",
          fontWeight: isActive ? "700" : "500",
          padding: "8px 50px",
          borderRadius: "18px",
        })}
        className="block"
              
            >
              {link.name}
            </NavLink>
          </li>
        ))}
      </ul>


        {/* logout btn
         <div className="mt-auto pb-5 text-center">
          <button
          onClick={handleLogout}
          className="py-2 px-18  cursor-pointer 
             rounded-sm font-semibold text-sm sm:text-base 
             bg-[linear-gradient(90deg,rgba(248,54,0,1),rgba(249,212,35,1))] hover:bg-transparent
             hover:scale-110 text-white"
          >Logout
        </button>
         </div> */}
        
    </div>
  );
};

export default Sidebar;
