import { Outlet } from "react-router-dom";
import Wrapper from "../components/admin/Wrapper";

const Admin  = () => {
  return (
    <Wrapper>
      <Outlet />
    </Wrapper>
  );
  };

export default Admin;