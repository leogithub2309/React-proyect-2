import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';


import './App.css'
import Menu from './pages/Menu';
import Home from './pages/Home';
import Factura from './pages/PagesFactura';
import PageProveedor from './pages/PagesProveedor';
import PagesListProveedores from './pages/PagesListProveedores';

function App() {
  return (
    <>
      <BrowserRouter>
        <Menu />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/crearFacturas' element={<Factura />}/>
          <Route path='/crearProveedor' element={<PageProveedor /> }/>
          <Route path='/listaProveedores' element={<PagesListProveedores />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
