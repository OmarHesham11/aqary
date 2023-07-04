import { useEffect } from 'react';
import { Outlet, useLoaderData, useSubmit } from 'react-router-dom';
import { getTokenDuration } from '../util/auth';
import Footer from './home/Footer';
import NavBar from './home/NavBar';
import './style.css';
import GotoDashboard from '../components/GotoDashboard';

function Main() {

  const token = useLoaderData();
  const submit = useSubmit();

  useEffect(() => {
    if (!token) {
      return;
    }

    if (token === 'EXPIRED') {
      submit(null, { action: '/logout', method: 'post' });
      return;
    }

    const tokenDuration = getTokenDuration();

    setTimeout(() => {
      submit(null, { action: '/logout', method: 'post' });
    }, tokenDuration);
  }, [token, submit]);


  return (
    <>
      <NavBar />

      <Outlet />
      <GotoDashboard />
      <Footer />
    </>
  );
}

export default Main;