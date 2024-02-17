import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomeCliente from "./Routes/Home";

import ProductDetail from "./assets/routes/Detail.jsx";
import AlquilerDetail from "./assets/routes/AlquilerDetail.jsx";
import ContextProvider from "./Components/utils/global.context";
import HomeAdministrador from './assets/routes/HomeAdministrador.jsx';
import CrearUsuario from './assets/routes/CrearUsuario.jsx';
import Loguin from './assets/routes/Loguin.jsx';


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
        <BrowserRouter>
            <ContextProvider>
                <Routes>
                    <Route path="/" element={<App />}>
                        <Route index element={<HomeCliente />} />
                        <Route index element={<HomeAdministrador />} />
                        <Route path="crear_usuario" element={<CrearUsuario />} />
                        <Route path="loguin" element={<Loguin />} />
                        <Route path="alquiler_detail/:id" element={<AlquilerDetail />} />
                        <Route path="product_detail/:id" element={<ProductDetail />} />
                    </Route>
                </Routes>
            </ContextProvider>
        </BrowserRouter>
    </React.StrictMode>
);
