import { Link, useNavigate } from "react-router-dom"; // Importa Link desde react-router-dom
import fondoblanco from "/fondoblanco.png";
import burgerMenu from "/lista.png";

import  { useState } from 'react';

import styles from "../styles/Header.module.css";

const Header = () => {
  const role = localStorage.getItem("role");
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("role");
    navigate("/loguin");
  };

  const [menuVisible, setMenuVisible] = useState(false);
  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  return (
    <header className="container">
      <div className="logo">
        {/* Envuelve solo la imagen con la etiqueta Link */}
        <Link to="/">
          <img className={styles.logo} src={fondoblanco} alt="Logo" />
        </Link>
        <p>Explora, juega y disfruta</p>
      </div>
      <div className={styles.buttons}>
        {role === "admin" ? (
          <>
            <Link to="/agregar_producto">
              <button>Agregar Producto</button>
            </Link>
            <button onClick={handleLogout}>Cerrar Sesión</button>
          </>
        ) : (
          <>
            <button>Crear cuenta</button>
            <Link to="/loguin">
              <button>Iniciar sesión</button>
            </Link>
          </>
        )}
      </div>
      <div className={styles.burgerMenu}>
         {/* Menu hamburguesa */}
        <img src={burgerMenu} alt="menu" onClick={toggleMenu} />
        <ul className={menuVisible ? styles.menuVisible : styles.menuHiden}>
        {role === "admin" ? (
          <>
            <li><Link to="/agregar_producto">
              <a>Agregar Producto</a>
            </Link></li>
            <li><a onClick={handleLogout}>Cerrar Sesión</a></li>
          </>
        ) : (
          <>
            <li><a>Crear cuenta</a></li>
            <li><Link to="/loguin">
              <a>Iniciar sesión</a>
            </Link>
            </li>
          </>
        )}
        </ul>
      </div>
    </header>
  );
};

export default Header;
