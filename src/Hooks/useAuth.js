import { useContext } from "react";
import { AuthContext } from "../Pages/AuthProvider/AuthProvider";


export const useAuth = () => {
  return useContext(AuthContext);
};
