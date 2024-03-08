import React, { useEffect } from "react";
import logo from '../Images/Logo.png'
import { Link } from 'react-router-dom'
import { useState} from "react";
import { useContextGlobal } from "./Util/global.context";
import avatar from '../Images/avatar.jpg'
import { useNavigate } from "react-router-dom";

const navbar = () => {

    const{state,dispatch}=useContextGlobal()

    
    const [userRole, setUserRole] = useState(localStorage.getItem("userRole")  );

    const navigate = useNavigate();


    console.log({userRole})



    const handleCerrarSesionAdmin = () => {
        localStorage.clear()
        setUserRole(null)  
    }

    

    const handleTheme=(e)=>{
        const newTheme= state.theme==="light" ? state.theme="dark" : state.theme="light";
        dispatch({type: 'change_theme', payload:newTheme})
    }

    const handleLogo=()=>{
      navigate('/');
    }


    return (
        <header className="Header">
        <div className="contenedorLogo">
          <Link to={'/'} onClick={handleLogo} className='logo'><img  className='imagenLogo' src={logo} alt="logo" /></Link>
          <h3 className="lema">Explora, juega y disfruta</h3>
        </div>
      
        <div className="contenedorAvatar">
             <img className="imageAvatar" src={avatar} alt="avatar" />
             <p className="nombreAvatar">
              {localStorage.getItem('nombre') ? localStorage.getItem('nombre').charAt(0) : ''}
              {localStorage.getItem('apellido') ? localStorage.getItem('apellido').charAt(0) : ''}
            </p>
            {localStorage.length !=0 && (
                 <div className="userInfo">
                      <p className="infoUserAvatar"> {localStorage.getItem('nombre')} {localStorage.getItem('apellido')} Rol: {localStorage.getItem('userRole')}</p>
                </div>
            )} 
           
        </div>
        
       
        <div className="botones">
          
          {userRole === null ? (
            <>
              <Link to={'/FormCrearCuenta'}><button className="crear-cuenta">Crear cuenta</button></Link>
              <Link to={'/FormLogin/'}><button  className="iniciar-sesion">Iniciar sesión</button></Link>
            </>
          ) : (
            userRole === "ADMIN" ? (
              <>
                <Link to={'/'}><button onClick={handleCerrarSesionAdmin} className="iniciar-sesion">Cerrar Sesión</button></Link>
                <Link to={'/pageAdmin'}><button  className="iniciar-sesion">Administar</button></Link>
              </>
            ) : (
              <Link to={'/'}><button onClick={handleCerrarSesionAdmin} className="iniciar-sesion">Cerrar Sesión</button></Link>
            )
          )}
          {state.theme === "light" ? <button onClick={handleTheme} className="themeDark">🌙</button> : <button onClick={handleTheme} className="themeLight">☀️</button>}
        </div>
      </header>   
    );
}

export default navbar;
