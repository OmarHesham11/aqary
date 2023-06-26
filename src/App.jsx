import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './pages/home/home.jsx'
import Admin from './pages/Admin';
import Dashboard from './pages/admin/dashboard';
import PropertiesPage from './pages/property/propertiesPage';

export default function App() {
  return (

    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/properties" element={<PropertiesPage />} />
          <Route path="/admin" element={<Admin />}>
            <Route index={true} element={<Dashboard />} />
            <Route path="hello" element={<h1>Hello world</h1>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>

  )
}





