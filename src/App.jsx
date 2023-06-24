import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './pages/home/home.jsx'

import Cart from "./components/Cart";
import Admin from './pages/Admin';

export default function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </BrowserRouter>

    </>
  )
}





