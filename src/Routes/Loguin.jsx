import React, { useState} from "react";
import { useNavigate } from "react-router-dom";
import styles from "../components/styles/Login.module.css"
import { Link } from 'react-router-dom'


const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  

  const handleLogin = () => {
    // Simulación de autenticación exitosa
    if ((username === "admin" && password === "admin") || (username === "usuario" && password === "usuario")) {
      const userRole = username === "admin" ? "admin" : "user";
      // Almacena el estado de la sesión en el localStorage
      localStorage.setItem("role", userRole);
      // Redirige al usuario según su rol
      if (userRole === "admin") {
        navigate("/home_administrador");
      } else {
        navigate("/home_cliente");
      }
    } else {
      alert("Usuario o contraseña incorrectos");
    }
  };

  
  

  return (
    <div className={styles.container}>
      <img className={styles.banner} src="https://cdn.hobbyconsolas.com/sites/navi.axelspringer.es/public/media/image/2023/07/ea-sports-fc-24-todo-sabemos-sucesor-fifa-24-3084248.jpg?tf=3840x"/>
      <img className={styles.logo} src="../src/Images/fondoblanco.png"/>
      <h2>Iniciar sesión en Vortex</h2>
      <form onSubmit={handleLogin}>
        <div className={styles.imputContainer}>
          <label htmlFor="username"><b>Usuario:</b></label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className={styles.imputContainer}>
          <label className={styles.password} htmlFor="password"><b>Contraseña:</b></label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">Iniciar sesión</button>
      </form>
      <div className={styles.footer}><Link to={'/signup'}> <span> Registar usuario </span> </Link> <span>¿Olvidaste tu contraseña?</span></div>
    </div>
  );
};

export default Login;