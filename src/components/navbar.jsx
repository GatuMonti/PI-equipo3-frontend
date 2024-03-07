import React, { useEffect } from "react";
import logo from '../Images/Logo.png'
import { Link } from 'react-router-dom'
import { useState} from "react";
import { useContextGlobal } from "./Util/global.context";
import CardUsuario from './CardUsuario/CardUsuario'

const navbar = () => {

    const{state,dispatch}=useContextGlobal()

    
    const [userRole, setUserRole] = useState(localStorage.getItem("userRole")  );

    console.log({userRole})   

    

    const handleTheme=(e)=>{
        const newTheme= state.theme==="light" ? state.theme="dark" : state.theme="light";
        dispatch({type: 'change_theme', payload:newTheme})
    }


    return (
        <header className="Header">
        <div className="contenedorLogo">
          <Link to={'/'} className='logo'><img  className='imagenLogo' src={logo} alt="logo" /></Link>
          <h3 className="lema">Explora, juega y disfruta</h3>
        </div>
        <div className="botones">
        {state.theme === "light" ? <button onClick={handleTheme} className="themeDark">🌙</button> : <button onClick={handleTheme} className="themeLight">☀️</button>}
          {userRole === null ? (
            <>
              <Link to={'/FormCrearCuenta'}><button className="crear-cuenta">Crear cuenta</button></Link>
              <Link to={'/FormLogin/'}><button  className="iniciar-sesion">Iniciar sesión</button></Link>
            </>
          ) : (                       
          <CardUsuario userRole={userRole} setUserRole={setUserRole}/> //<---- Eliminar el lin de cerrar secion y poner el componente de card              
          )}
          
        </div>
      </header>   
    );
}

export default navbar;

