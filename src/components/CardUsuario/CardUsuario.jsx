import React, { useState } from 'react';
import Avatar from 'react-avatar';
//import styles from './CardUsuario.module.css';
import './cardUsuario.css';
import Dropdown from 'react-bootstrap/Dropdown';
import { useContextGlobal } from "../Util/global.context";
import { useNavigate } from 'react-router-dom';

const CardUsuario = ({ userRole, setUserRole }) => {
  const [showMenu, setShowMenu] = useState(false);
  const { state, dispatch } = useContextGlobal();
  const navigate = useNavigate();

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const handleCerrarSesionAdmin = () => {//Pase el handlres de cerrar sesion para este componente
    localStorage.clear()
    setUserRole(null)
  }

  const onClickFavs = () => {
    dispatch({ type: "set_isFavorite", payload: true })
    navigate('/');
  }

  return (
    <div>
      <Dropdown show={showMenu} onToggle={toggleMenu} >
        <Dropdown.Toggle as="div" variant="success" id="dropdown-basic">
          <Avatar color="#ceb0d1" fgColor="#FFF" className='user-avatar' size="4.5rem"
            round={true} name={localStorage.getItem("nombre") + " " +
              localStorage.getItem("apellido")} />
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.Item href="/pageDetallesUsuario">Ver Perfil</Dropdown.Item>
          <Dropdown.Item onClick={onClickFavs}>Mis favoritos</Dropdown.Item>
          <Dropdown.Item href="/panelReservas">Mis reservas</Dropdown.Item>
          {userRole === "ADMIN" && (
            <Dropdown.Item href="/pageAdmin">Administrar</Dropdown.Item>
          )}
          <Dropdown.Item href="/" onClick={handleCerrarSesionAdmin}>Cerrar Sesion</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>

    </div>

  );
};

export default CardUsuario;





