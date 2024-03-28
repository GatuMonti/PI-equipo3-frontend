import React, { useEffect } from "react";
import logo from '../../Images/fondoblanco.png'
import { Link } from 'react-router-dom'
import { useState} from "react";
import { useContextGlobal } from "../Util/global.context";
import CardUsuario from '../CardUsuario/CardUsuario'
import styles from './navBar.module.css'

const navbar = () => {

    const{state,dispatch}=useContextGlobal()

    
    const [userRole, setUserRole] = useState(localStorage.getItem("userRole")  );

    // console.log({userRole})   

    

    // const handleTheme=(e)=>{
    //     const newTheme= state.theme==="light" ? state.theme="dark" : state.theme="light";
    //     dispatch({type: 'change_theme', payload:newTheme})
    // }


    return (
        <header className={styles.header}>
        <div className={styles.contenedorLogo}>
          <Link to={'/'} className={styles.logo}><img  className={styles.imagenLogo} src={logo} alt="logo" /></Link>
          <h3 className={styles.lema}>Explora, juega y disfruta</h3>
        </div>
        <div className={styles.botones}>
        {/* {state.theme === "light" ? <button onClick={handleTheme} className="botonHeader circulo">🌙</button> : <button onClick={handleTheme} className="themeLight">☀️</button>} */}
          {userRole === null ? (
            <div className={styles.botonera}>
              <Link to={'/FormCrearCuenta'}><button className={styles.botonHeader}>Crear cuenta</button></Link>
              <Link to={'/FormLogin/'}><button  className={styles.botonHeader}>Iniciar sesión</button></Link>
            </div>
          ) : (                       
          <CardUsuario userRole={userRole} setUserRole={setUserRole}/> //<---- Eliminar el lin de cerrar secion y poner el componente de card              
          )}
          
        </div>
      </header>   
    );
}

export default navbar;

