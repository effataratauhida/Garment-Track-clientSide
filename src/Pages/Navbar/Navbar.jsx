import React, { useContext, useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router';
//import { AuthContext } from '../../Pages/Provider/AuthProvider';
import { FcBusinessman } from 'react-icons/fc'; 
import '../Navbar/Navbar.css'
import toast from 'react-hot-toast';
import { AuthContext } from '../AuthProvider/AuthProvider';


const Navbar = () => {

    const { user, signOutUser } = useContext(AuthContext); 
    const [dropdownOpen, setDropdownOpen] = useState(false);
      const navigate = useNavigate();

    const handleLogout = () => { 
        signOutUser()
        .then(() => {
            toast.success("Logged out successfully!");
            navigate("/");
        })
        .catch(err => 
            console.log(err));
    };

    return (
        <div>
            <div className='bg-gray-100 shadow-sm'>
            <div className="navbar max-w-11/12 mx-auto">

                <div className="navbar-start">
                    <div className="dropdown">
                <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden text-[#F83600] ">
                 <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-menu-icon lucide-menu"><path d="M4 5h16"/><path d="M4 12h16"/><path d="M4 19h16"/></svg>
                </div>
        <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                <li >
                    <NavLink to='/' >Home</NavLink>
                </li>
                <li>
                    <NavLink to='/availableFoods' >All Product</NavLink>
                </li>
                <li>
                    <NavLink to='/availableFoods' >About Us</NavLink>
                </li>
                <li>
                    <NavLink to='/availableFoods' >Contact</NavLink>
                </li>
                
        </ul>
                    </div>
                    <Link to='/' className="flex items-center gap-1 hover:scale-105 ">
                    <h2 className='text-gray-800 font-bold text-2xl'>
                     Garment<span className='text-[#F83600]'>Track</span>
                    </h2>
                     
                    </Link>
                </div>

                {/* <div className="navbar-center hidden lg:flex">
                    <ul className="flex items-center gap-8 ">
                        <li >
                            <NavLink to='/' >Home</NavLink>
                        </li>
                        <li>
                    <NavLink to='/availableFoods' >All-Product</NavLink>
                </li>
                <li>
                    <NavLink to='/availableFoods' >About Us</NavLink>
                </li>
                <li>
                    <NavLink to='/availableFoods' >Contact</NavLink>
                </li>
                    
                    </ul>
                </div> */}

                <div className="navbar-end gap-3">

                            <ul className="items-center gap-8 hidden lg:flex">
                        <li >
                            <NavLink to='/' >Home</NavLink>
                        </li>
                        <li>
                    <NavLink to='/availableFoods' >All Product</NavLink>
                </li>
                <li>
                    <NavLink to='/availableFoods' >About Us</NavLink>
                </li>
                <li>
                    <NavLink to='/availableFoods' >Contact</NavLink>
                </li>
                    
                    </ul>
                     <Link
                        to="/login" 
                         
                        className='py-1 px-3 sm:py-2 sm:px-6   cursor-pointer 
                        rounded-sm font-semibold text-sm sm:text-base bg-[linear-gradient(90deg,rgba(248,54,0,1),rgba(249,212,35,1))] hover:bg-transparent
                           hover:scale-110
                        text-white  
                        '>
                         Login
                    </Link>
                     <Link
                        to="/register" 
                        className='py-1 px-3   sm:py-2 sm:px-6  cursor-pointer 
                        rounded-sm font-semibold text-sm sm:text-base  
                        border-[#F83600] hover:border-[#F83600] border-2 hover:scale-110
                        text-[#F83600] 
                        '>
                         Register
                    </Link>
                    
                </div>
            </div>
        </div>

        </div>
    );
};

export default Navbar;