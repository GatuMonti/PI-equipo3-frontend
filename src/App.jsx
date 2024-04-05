import { useState } from 'react'
import React from 'react'
import { Route, Routes } from 'react-router'
import Header from './components/NavBar/navbar'
import Home from './components/Home/Home'
import Footer from './components/Footer/Footer'
import Detail from './Routes/Detail/Detail'
import PageAdmin from './Routes/PageAdmin'
import { useContextGlobal } from './components/Util/global.context'
import EditarProducto from './components/AgregarProducto/EditarProducto'
import FormCrearCuenta from './components/CrearCuenta/FormCrearCuenta'
import FormLogin from './components/Login/FormLogin'
import PanelDetallesUsuario from './Routes/DetalleUsuario/PanelDetallesUsuario'
import PanelUsuarios from './Routes/PanelUsuarios'
import Politicas from './components/Politicas/Politicas'
import PanelReservas from './Routes/PanelReservas'

const urlBackend = import.meta.env.VITE_URL_BACKEND;
//const urlBackend = 'http://localhost:8080/';

function App() {

  const { state } = useContextGlobal()

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
            <Route path='/pageDetallesUsuario' element={<PanelDetallesUsuario />} />
            <Route path="/pageAdmin/panelUsuarios" element={<PanelUsuarios />} />
            <Route path='/terminosycondiciones' element={<Politicas />} />
            <Route path='/panelReservas' element={<PanelReservas />} />
          </Routes>
        </div>
        <Footer />
      </div>
  )
}

export { urlBackend };
export default App;
