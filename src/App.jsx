import { useState } from 'react'
import React from 'react'
import Header from './components/NavBar/navbar'
import Home from './Routes/Home'
import { Route, Routes } from 'react-router'
import Footer from './components/Footer/Footer'
import Detail from './Routes/Detail'
import PageAdmin from './Routes/PageAdmin'
import { useContextGlobal } from './components/Util/global.context'
import EditarProducto from './Routes/EditarProducto'
import FormCrearCuenta from './components/CrearCuenta/FormCrearCuenta'
import FormLogin from './components/Login/FormLogin'
import PanelCaracteristicas from './Routes/PanelCaracteristicas'
import PanelCategorias from './Routes/PanelCategorias'
import PanelDetallesUsuario from './Routes/PanelDetallesUsuario'
import PanelUsuarios from './Routes/PanelUsuarios'
import Politicas from './components/Politicas'

function App() {
  return (
    <div className="app-container">
      <Header />
      <div className="content">
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/Detail/:id' element={<Detail />} />
          <Route path='/pageAdmin/' element={<PageAdmin />} />
          <Route path='/editProduct/:id' element={<EditarProducto />} />
          <Route path='/FormCrearCuenta/' element={<FormCrearCuenta />} />
          <Route path='/FormLogin/' element={<FormLogin />} />
          <Route path='/pageAdmin/panelCaracteristicas' element={<PanelCaracteristicas />} /> {/*----Ruta al panel de caracteristicas*/}
          <Route path='pageAdmin/panelCategorias' element={<PanelCategorias />} /> {/*<---Ruta al panel de categorias*/}
          <Route path='/pageDetallesUsuario' element={<PanelDetallesUsuario />} />
          <Route path="/pageAdmin/panelUsuarios" element={<PanelUsuarios />} />
          <Route path='/terminosycondiciones' element={<Politicas />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App
