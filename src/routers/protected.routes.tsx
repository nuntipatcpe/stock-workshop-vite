import { Navigate, Outlet } from "react-router-dom";
import { store } from "../Redux/reducers";
// import { store } from "../main";

const ProtectedRoutes = (props: any) => {
  const auth = store.getState().loginReducer.result;
  // console.log("Protected Routes");
  return auth ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoutes;
