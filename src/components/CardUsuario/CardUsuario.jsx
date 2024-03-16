import React, { useState } from 'react';
import Avatar from 'react-avatar';
import Dropdown from 'react-bootstrap/Dropdown';
import styles from './CardUsuario.module.css';//hasta el momento no puedo usar .module.css
import './cardUsuario.css' //Uso este archivo hasta que resuelva cambiar estilos de Componentes Boostrap con .mosule.css

const CardUsuario = ({ userRole, setUserRole }) => {
  const [showMenu, setShowMenu] = useState(false);


  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const handleCerrarSesionAdmin = () => {//Pase el handlres de cerrar sesion para este componente
    localStorage.clear()
    setUserRole(null)
  }

  return (
    <div>
      <Dropdown>
        <Dropdown.Toggle as="div" variant="success" id="dropdown-basic">
        <Avatar  color="#ceb0d1" fgColor="#FFF" className='user-avatar' size="4.5rem" round={true} name={localStorage.getItem("nombre") + " " + localStorage.getItem("apellido")} />
        </Dropdown.Toggle >

        <Dropdown.Menu>
          <Dropdown.Item href="/pageDetallesUsuario">Ver Perfil</Dropdown.Item>
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





