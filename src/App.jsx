/* eslint-disable no-extra-semi */
import './App.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import Home from './pages/home/Home';
import LoginPage, { action as loginAction } from './pages/authentication/LoginPage';
import { action as logoutAction } from './pages/authentication/Logout';
import { tokenLoader } from './util/auth';
import RegisterPage, { action as registerAction } from './pages/authentication/RegisterPage';
import PropertiesPage from './pages/property/propertiesPage';
import PropertyDetails from './pages/property/propertyDetailsPage';
import Admin from './pages/Admin';
import Dashboard from './pages/admin/Dashboard';
import TableOfProperties from './pages/admin/TableOfProperties';
import PropertyCreate from './components/property/PropertyCreate';
import NotFound from './pages/NotFound/NotFound'
import Main from './pages/Main';
import TableOfTransactions from './pages/admin/TableOfTransactions';
import Profile from './components/Profile';
import ProfilePage from './pages/ProfilePage';
import ProfilePropertiesPage from './pages/ProfilePropertiesPage';
import TableOfSubscriptions from './pages/admin/TableOfSubscriptions';

// import Cart from './components/Cart';
import AboutUs from './pages/AboutUs/AboutUs'
import ContactUs from './pages/ContactUs/contactUs';
const router = createBrowserRouter([
  {
    path: '/',
    element: <Main />,
    id: 'root',
    loader: tokenLoader,
    children: [
      { index: true, element: <Home /> },
      { path: 'auth/login', element: <LoginPage />, action: loginAction },
      { path: 'auth/register', element: <RegisterPage />, action: registerAction },
      { path: 'properties', element: <PropertiesPage /> },
      { path: 'property/:propertyId', element: <PropertyDetails /> },
      { path: 'postProperty', element: <PropertyCreate /> },
      { path: "auth/profile", element: <ProfilePage /> },
      { path: "aboutUs", element: <AboutUs /> },
      { path: "contactUs", element: <ContactUs /> },
      { path: "auth/profileProperties", element: <ProfilePropertiesPage /> },
      { path: 'logout', action: logoutAction },
      { path: '*', element: <NotFound /> }
    ],
  },
  {
    path: '/admin',
    element: <Admin />,
    id: 'admin',
    children: [
      { index: true, element: <Dashboard /> },
      { path: 'properties', element: <TableOfProperties /> },
      { path: 'transactions', element: <TableOfTransactions /> },
      { path: 'subscriptions', element: <TableOfSubscriptions /> },
      { path: '*', element: <NotFound /> }
    ],
  },
]);

export default function App() {
  return (
    <RouterProvider router={router} />
  );
}
