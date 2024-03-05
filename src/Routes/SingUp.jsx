import React, { useState} from "react";
import { useNavigate } from "react-router-dom";
import styles from "../components/styles/Singup.module.css"
import { Link } from 'react-router-dom'

const Singup = () => {
 /* 
    const [usuarioNuevo, setUsuarioNuevo]= useState ({
    nombre: "",
    apellido: "",
    email: "",
    usuario: "",
    password: ""

  })
  

 */ 
  

  return (
    <div className={styles.containerFather}>

        <h1>Bievenido a la comunidad de juegos mas grande de latinoamerica</h1>

        <div className={styles.container}>

        <img className={styles.banner} src="../src//Images/2.jpg"/>
        <img className={styles.logo} src="../src/Images/fondoblanco.png"/>

        <h2>Bienvenid@ a Vortex</h2>
        <form>
        <div className={styles.inputName}>
            <div className={styles.inputNombre}>
            <label htmlFor="username"><b>Nombre: </b></label>
            <input
                type="text"
                id="user"
                
            />

            </div>
            <div className={styles.inputApellido}>
            <label htmlFor="username"><b>Apellido: </b></label>
            <input
                type="text"
                id="user"
                
            />
            </div>
            
            
        </div>
        
        <div className={styles.imputContainer}>
            <label htmlFor="username"><b>Email:</b></label>
            <input
            type="text"
            id="username"
            
            />
        </div>

        <div className={styles.imputContainer}>
            <label htmlFor="username"><b>Usuario:</b></label>
            <input
            type="text"
            id="username"
            
            />
        </div>
        <div className={styles.imputContainer}>
            <label className={styles.password} htmlFor="password"><b>Contraseña:</b></label>
            <input
            type="password"
            id="password"
            
            
            />
        </div>
        <button type="submit">Crear usuario </button>
        </form>
        <div className={styles.footer}><Link to={'/loguin'}> <span>Iniciar Sesion </span> </Link> <span>¿Olvidaste tu contraseña?</span></div>
        </div>

    </div>

        
        
    );
    };

export default Singup;