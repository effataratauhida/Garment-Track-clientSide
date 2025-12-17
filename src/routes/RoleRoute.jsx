import { Navigate } from "react-router";
import { useAuth } from "../Hooks/useAuh";


const RoleRoute = ({ allowedRoles, children }) => {
  const { user, loading } = useAuth();

  if (loading) return <p>Loading...</p>;

  if (!user || !allowedRoles.includes(user.role)) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

export default RoleRoute;
