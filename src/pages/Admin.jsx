import { Outlet } from "react-router-dom";
import Wrapper from "../components/admin/Wrapper";
import useIsAdmin from "../hooks/useAdmin";

const Admin = () => {
  const isAdmin = useIsAdmin();
  if (!isAdmin) {
    return (
      <h1>404 Not Found</h1>
    );
  }
  return (
    <Wrapper>
      <Outlet />
    </Wrapper>
  );
};

export default Admin;