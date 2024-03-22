import React from 'react'
import Header from './components/NavBar/navbar'
import Home from './Routes/Home'
import { Route, Routes } from 'react-router'
import Footer from './components/Footer/Footer'
import Detail from './Routes/Detail'
import PageAdmin from './Routes/PageAdmin'
import FormCrearCuenta from './components/CrearCuenta/FormCrearCuenta'
import FormLogin from './components/Login/FormLogin'
import PanelDetallesUsuario from './Routes/PanelDetallesUsuario'
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
          <Route path='/FormCrearCuenta/' element={<FormCrearCuenta />} />
          <Route path='/FormLogin/' element={<FormLogin />} />
          <Route path='/pageDetallesUsuario' element={<PanelDetallesUsuario />} />
          <Route path='/terminosycondiciones' element={<Politicas />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App
