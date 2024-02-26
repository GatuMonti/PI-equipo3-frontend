import React from "react";
import logo from '../Images/Logo.png'
import { Link } from 'react-router-dom'
import { useState} from "react";
import { useContextGlobal } from "./Util/global.context";

const navbar = () => {

    const{state,dispatch}=useContextGlobal()
    
    const [userRole, setUserRole] = useState(localStorage.getItem("role") || 'user');

    const handleInicioAdmin = () => {
        localStorage.setItem("role", 'admin');
        setUserRole('admin');
    }

    const handleCerrarSesionAdmin = () => {
        localStorage.setItem("role", 'user');
        setUserRole('user');
    }

    const handleTheme=(e)=>{
        const newTheme= state.theme==="light" ? state.theme="dark" : state.theme="light";
        dispatch({type: 'change_theme', payload:newTheme})
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
                {state.theme==="light" ? <button onClick={handleTheme} className="themeDark">🌙</button> : <button onClick={handleTheme} className="themeLight">☀️</button>}
               

            </div>
            
        </header>
    );
}

export default navbar;
