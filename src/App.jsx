/* eslint-disable no-extra-semi */
import './App.css'

import Home from './pages/home/Home'
import PropertiesPage from './pages/property/propertiesPage';
import PropertyDetails from './pages/property/propertyDetailsPage';
import Admin from './pages/Admin';
import Dashboard from './pages/admin/Dashboard';
import TableOfProperties from './pages/admin/TableOfProperties';
import PropertyCreate from './components/property/PropertyCreate';
import AuthPage from './pages/Authentication';
import Main from './pages/Main';
import TableOfTransactions from './pages/admin/TableOfTransactions';

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Cart from './components/Cart';


export default function App() {
  return (

    <>

      <BrowserRouter>

        <Routes>
          <Route path="/" element={<Main />}>
            <Route index={true} element={<Home />} />
            <Route path="/properties" element={<PropertiesPage />} />
            <Route path="/property/:propertyId" element={<PropertyDetails />} />
            <Route path='/auth' element={<AuthPage />} />
            <Route path="/postProperty" element={<PropertyCreate />} />


          </Route>


          <Route path="/admin" element={<Admin />}>
            <Route index={true} element={<Dashboard />} />
            <Route path="properties" element={<TableOfProperties />} />
            <Route path="hello" element={<h1>Hello world</h1>} />
            <Route path="transactions" element={<TableOfTransactions />} />

          </Route>
        </Routes>
      </BrowserRouter>

    </>

  )
};


