import { Outlet } from 'react-router-dom';
import Footer from './home/Footer';
import NavBar from './home/NavBar';
import './style.css'
function Main() {

  return (
    <>
      <NavBar />
      <div className="content-container">
        <Outlet />
      </div>
      <Footer />
    </>
  );
}

export default Main;