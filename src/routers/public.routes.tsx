import { Navigate, Outlet } from "react-router-dom";
import { store } from "../main";

const PublicRoutes = (props: any) => {
  const auth = store.getState().loginReducer.result;
  console.log("PublicRoutes");
  return auth ? <Navigate to="/stock" /> : <Outlet />;
};

export default PublicRoutes;
