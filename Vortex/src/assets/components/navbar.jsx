import { Link, useNavigate } from "react-router-dom"; // Importa Link desde react-router-dom
import fondoblanco from "/public/fondoblanco.png";

import styles from "../styles/Header.module.css";

const Header = () => {
  const role = localStorage.getItem("role");
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("role");
    navigate("/loguin");
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
      <div className="buttons">
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
    </header>
  );
};

export default Header;
