import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ContextProvider from './assets/components/util/global.context.jsx';
import ProductDetail from "./assets/routes/ProductDetail.jsx";
import AlquilerDetail from "./assets/routes/AlquilerDetail.jsx";
import AgregarProducto from './assets/routes/AgregarProducto.jsx';
import HomeAdministrador from './assets/routes/HomeAdministrador.jsx';
import CrearUsuario from './assets/routes/CrearUsuario.jsx';
import Loguin from './assets/routes/Loguin.jsx';
import Home from './assets/routes/Home.jsx';


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
        <BrowserRouter>
            <ContextProvider>
                <Routes>
                    <Route path="/" element={<App />}>
                        <Route index element={<Home />}/>                        
                        <Route path="home_administrador" element={<HomeAdministrador />} />
                        <Route path="crear_usuario" element={<CrearUsuario />} />
                        <Route path="loguin" element={<Loguin />} />
                        <Route path="alquiler_detail/:id" element={<AlquilerDetail />} />
                        <Route path="product_detail/:id" element={<ProductDetail />} />
                        <Route path="agregar_producto" element={<AgregarProducto />} />
                    </Route>
                </Routes>
                </ContextProvider>
        </BrowserRouter>
    </React.StrictMode>
);
