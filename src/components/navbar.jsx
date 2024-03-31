import React, { useEffect } from "react";
import logo from '../Images/Logo.png'
import { Link } from 'react-router-dom'
import { useState} from "react";
import { useContextGlobal } from "./Util/global.context";
import avatar from '../Images/avatar.jpg'
import { useNavigate } from "react-router-dom";



const navbar = () => {

    const{state,dispatch}=useContextGlobal()

    //Estado para cambiar la clase del contenedor avatar y me muestre info del user
    const [isActive, setIsActive] = useState(false);

    
    const [userRole, setUserRole] = useState(localStorage.getItem("userRole")  );

    const navigate = useNavigate();


    console.log({userRole})



    const handleCerrarSesionAdmin = () => {
        localStorage.clear()
        setUserRole(null)
        window.location.reload();
    }

    

    const handleTheme=(e)=>{
        const newTheme= state.theme==="light" ? state.theme="dark" : state.theme="light";
        dispatch({type: 'change_theme', payload:newTheme})
    }

    const handleLogo=()=>{
      useEffect(()=>{
      },[])
      navigate('/');
    }

    const handleOnclickFavoritos=()=>{
      dispatch({type: 'set_isFavorite', payload:true})
      navigate('/');
    }

    const handleOnclickReservas=()=>{
      navigate('/listarReservas/');
    }

    const handleOnclickAvatar=()=>{
      setIsActive(!isActive);
    }
    
  
    return (
        <header className="Header">
        <div className="contenedorLogo">
          <Link to={'/'} onClick={handleLogo} className='logo'><img  className='imagenLogo' src={logo} alt="logo" /></Link>
          <h3 className="lema">Explora, juega y disfruta</h3>
        </div>
      
        <div onClick={handleOnclickAvatar}className="contenedorAvatar">
             <img className="imageAvatar" src={avatar} alt="avatar" />
             <p className="nombreAvatar">
              {localStorage.getItem('nombre') ? localStorage.getItem('nombre').charAt(0) : ''}
              {localStorage.getItem('apellido') ? localStorage.getItem('apellido').charAt(0) : ''}
             
            </p>
            {localStorage.length !=0 && (
                 <div className={isActive ? "userInfo active" : "userInfo"}>
                      <p className="infoUserAvatar"> {localStorage.getItem('nombre')} {localStorage.getItem('apellido')} Rol: {localStorage.getItem('userRole')}</p>
                      <a  onClick={handleOnclickFavoritos} className="enlaceFavoritos">Favoritos</a>
                      <a  onClick={handleOnclickReservas}  className="enlaceReservas">Reservas</a>
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
