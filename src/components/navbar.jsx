import React from "react";
import logo from '../Images/Logo.png'
import { Link } from 'react-router-dom'
import { useState} from "react";

const navbar = () => {

    
    const [userRole, setUserRole] = useState(localStorage.getItem("role") || 'user');

    const handleInicioAdmin = () => {
        localStorage.setItem("role", 'admin');
        setUserRole('admin');
    }

    const handleCerrarSesionAdmin = () => {
        localStorage.setItem("role", 'user');
        setUserRole('user');
    }


    return (
        <header className="Header">
            <div className="contenedorLogo">
                <Link to={'/'}className='logo'><img onClick={handleCerrarSesionAdmin}className='imagenLogo'src={logo} alt="logo" /></Link>
                <h3 className="lema">Explora, juega y disfruta</h3>
            </div>
            <div className="botones">
                { userRole !='admin' ?(
                <>
                <button className="crear-cuenta">Crear cuenta</button>
                <Link to={'/pageAdmin/'} > <button onClick={handleInicioAdmin} className="iniciar-sesion">Iniciar sesión</button></Link>
                </>):(
                <>
               
                <Link to={'/'} > <button onClick={handleCerrarSesionAdmin} className="iniciar-sesion">Cerrar Sesion</button></Link>
                </>

                )}
               
            </div>
            
        </header>
    );
}

export default navbar;
