import { Outlet } from 'react-router-dom';
import Footer from './home/Footer';
import NavBar from './home/NavBar';

function Main() {

  return (
    <>
      <NavBar />
      <Outlet />
      <Footer />
    </>
  );
}

export default Main;