import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomeCliente from "./assets/routes/HomeCliente.jsx"
import ProductDetail from "./assets/routes/ProductDetail.jsx";
import AlquilerDetail from "./assets/routes/AlquilerDetail.jsx";
import ContextProvider from "./assets/components/util/global.context.jsx";
import HomeAdministrador from './assets/routes/HomeAdministrador.jsx';
import CrearUsuario from './assets/routes/CrearUsuario.jsx';
import Loguin from './assets/routes/Loguin.jsx';
import Home from './assets/routes/Home.jsx';


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
        <BrowserRouter>
            {/*<ContextProvider> aqui abre el context provider cuando lo tengan listo al global context*/}
                <Routes>
                    <Route path="/" element={<App />}>
                        <Route index element={<Home />}/>
                        <Route path="home_cliente" element={<HomeCliente />} />
                        <Route path="home_administrador" element={<HomeAdministrador />} />
                        <Route path="crear_usuario" element={<CrearUsuario />} />
                        <Route path="loguin" element={<Loguin />} />
                        <Route path="alquiler_detail/:id" element={<AlquilerDetail />} />
                        <Route path="product_detail/:id" element={<ProductDetail />} />
                    </Route>
                </Routes>
            {/*</ContextProvider> aqui cierra el context provider*/}
        </BrowserRouter>
    </React.StrictMode>
);
