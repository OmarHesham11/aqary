import './App.css'
import NavBar from './pages/home/NavBar';
import Footer from './pages/home/Footer';
import Home from './pages/home/Home'
import PropertiesPage from './pages/property/propertiesPage';
import PropertyDetails from './pages/property/propertyDetailsPage';
import Admin from './pages/Admin';
import Dashboard from './pages/admin/Dashboard';
import TableOfProperties from './pages/admin/TableOfProperties';

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Main from './pages/Main';

export default function App() {
  return (

    <>

      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Main />}>
            <Route index={true} element={<Home />} />
            <Route path="/properties" element={<PropertiesPage />} />
            <Route path="/property/:id" element={<PropertyDetails />} />
          </Route>


          <Route path="/admin" element={<Admin />}>
            <Route index={true} element={<Dashboard />} />
            <Route path="properties" element={<TableOfProperties />} />
            <Route path="hello" element={<h1>Hello world</h1>} />
          </Route>
        </Routes>
      </BrowserRouter>

    </>

  )
};