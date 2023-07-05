import { Outlet } from "react-router-dom";
import Wrapper from "../components/admin/Wrapper";
import useIsAdmin from "../hooks/useAdmin";
import Loading from '../components/Loading';

const Admin = () => {
  const isAdmin = useIsAdmin();

  if (!isAdmin) {
    return (
      <Loading />
    );
  }
  return (
    <Wrapper>
      <Outlet />
    </Wrapper>
  );
};

export default Admin;