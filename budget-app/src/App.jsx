import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';


import './App.css'
import Menu from './pages/Menu';
import Home from './pages/Home';
import Factura from './pages/PagesFactura';

function App() {
  return (
    <>
      <BrowserRouter>
        <Menu />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/crearFacturas' element={<Factura />}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
