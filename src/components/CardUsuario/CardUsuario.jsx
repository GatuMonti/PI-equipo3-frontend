import React, { useState } from 'react';
import Avatar from 'react-avatar';
import styles from './CardUsuario.module.css';
import Dropdown from 'react-bootstrap/Dropdown';
import { useContextGlobal } from "../Util/global.context";
import { useNavigate } from 'react-router-dom';

const CardUsuario = ({ userRole, setUserRole }) => {
  const [showMenu, setShowMenu] = useState(false);
   const {state, dispatch} = useContextGlobal();
   const navigate = useNavigate();

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const handleCerrarSesionAdmin = () => {//Pase el handlres de cerrar sesion para este componente
    localStorage.clear()
    setUserRole(null)  
}

const onClickFavs = ()=>{
    dispatch({type: "set_isFavorite", payload: true})
    navigate('/');
}

  return (
    <div className={styles.container}>
      <Dropdown show={showMenu} onToggle={toggleMenu} >
      <Dropdown.Toggle as="div" id="dropdown-basic" className={styles.dropdownToggle}>
        <div className={styles.cardUsuario} onClick={toggleMenu}>
          <Avatar name={localStorage.getItem("nombre")+" "+localStorage.getItem("apellido")} round={true} className={styles.imageContainer} />
          <div className={styles.userInfo}>
            <p className={styles.userName}>{localStorage.getItem("nombre")+" "+localStorage.getItem("apellido")}</p>
            <p className={styles.userType}>{localStorage.getItem("userRole")=="ADMIN"?"Administrador":"Usuario"}</p>
          </div>
        </div>
      </Dropdown.Toggle>

      <Dropdown.Menu className={`${styles.dropdownMenu}`}>
        <Dropdown.Item href="/pageDetallesUsuario">Ver Perfil</Dropdown.Item>
        <Dropdown.Item onClick={onClickFavs}>Mis favoritos</Dropdown.Item>
        <Dropdown.Item href="/panelReservas">Mis reservas</Dropdown.Item>
        {userRole === "ADMIN" && (
          <Dropdown.Item href="/pageAdmin">Administrar</Dropdown.Item>
        )}
        <Dropdown.Item href="/" onClick={handleCerrarSesionAdmin} className={styles.cerrarSesion}>Cerrar Sesion</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>

    </div>
    
  );
};

export default CardUsuario;





