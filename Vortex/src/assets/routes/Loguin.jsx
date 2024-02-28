import React, { useState} from "react";
import { useNavigate } from "react-router-dom";
import styles from "../styles/Login.module.css";

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
      <h2>Iniciar sesión</h2>
      <form onSubmit={handleLogin}>
        <div className={styles.imputContainer}>
          <label htmlFor="username">Usuario:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className={styles.imputContainer}>
          <label htmlFor="password">Contraseña:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">Iniciar sesión</button>
      </form>
    </div>
  );
};

export default Login;
