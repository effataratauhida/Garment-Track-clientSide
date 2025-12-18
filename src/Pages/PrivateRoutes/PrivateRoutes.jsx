import React, { useContext } from 'react';
import { AuthContext } from '../AuthProvider/AuthProvider';
import { Navigate, useLocation } from 'react-router';

const PrivateRoutes = ({ children }) => {
    const { user, loading } = useContext(AuthContext);

    const location = useLocation();
    
    if (loading) {
    return (
        <div className="flex justify-center items-center h-screen bg-[#d2e7d0] py-20">
            <p className="text-4xl font-semibold text-[#f40b0b]">
                L <span className="loading loading-spinner loading-xl"></span> ading...</p>
        </div>
    );
}

if (!user) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }
    return children;
};

export default PrivateRoutes;







    

