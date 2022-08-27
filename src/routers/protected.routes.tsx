import { Navigate, Outlet } from "react-router-dom";
import { store } from "../main";

const ProtectedRoutes = (props: any) => {
  const auth = store.getState().loginReducer.result;
  console.log("ProtectedRoutes");
  return auth ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoutes;
