import authStore from "../store/store.js";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const currentUser = authStore((state) => state.currentUser);

  if (!currentUser) {
    return <Navigate to="/signin"></Navigate>;
  }
  return children;
};

export default PrivateRoute;
