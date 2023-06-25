import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './pages/home/Home';

// import Cart from "./components/Cart";
import Admin from './pages/Admin';
import PropertiesPage from './pages/property/propertiesPage';

export default function App() {
  return (

    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/property" element={<PropertiesPage />} />
        </Routes>
      </BrowserRouter>
    </>

  )
}





