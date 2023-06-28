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

export default function App() {
  return (

    <>

      <BrowserRouter>

        <NavBar />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/properties" element={<PropertiesPage />} />
          <Route path="/property/:id" element={<PropertyDetails />} />
          <Route path="/admin" element={<Admin />}>
            <Route index={true} element={<Dashboard />} />
            <Route path="properties" element={<TableOfProperties />} />
            <Route path="hello" element={<h1>Hello world</h1>} />
          </Route>
        </Routes>

        <Footer />

      </BrowserRouter>

    </>

  )
};