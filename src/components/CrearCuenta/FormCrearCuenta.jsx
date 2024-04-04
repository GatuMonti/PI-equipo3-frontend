import React, { useState } from 'react'
import axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom';
import styles from './crearCuenta.module.css'
import { urlBackend } from '../../App';
import imagenLogin from '../../Images/imagen_login_3.webp';
import imagenLogo from '../../Images/fondoblanco.png';


const FormCrearCuenta = () => {


    const endPointRegister = urlBackend + "auth/register";

    const [usuarioRegistrar, setUsuarioRegistrar] = useState({
        username: "",
        password: "",
        nombre: "",
        apellido: "",
        direccion: ""
    })

    const navigate = useNavigate();

    const handleSubmitRegister = async (e) => {
        e.preventDefault()
        const regexSoloLetras = /^[A-Za-z]+$/;
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        const regexPassword = /^.{8,}$/; //Minimo 8 caracteres
        try {
            if (usuarioRegistrar.username.trim() === "" || usuarioRegistrar.password.trim() === "" || usuarioRegistrar.nombre.trim() === "" || usuarioRegistrar.apellido.trim() === "" || usuarioRegistrar.direccion.trim() === "") {
                Swal.fire({
                    title: "Registro fallo",
                    text: "Todos los campos son obligatorios",
                    icon: "error",
                    confirmButtonColor: "#ff00008f",
                    confirmButtonText: "Aceptar",
                    customClass: {
                        popup: 'textFalla'
                    }
                });
            }
            else if (!regexSoloLetras.test(usuarioRegistrar.nombre) || !regexSoloLetras.test(usuarioRegistrar.apellido)) {
                Swal.fire({
                    title: "Registro fallo",
                    text: "El nombre y apellido deben ser solo letras",
                    icon: "error",
                    confirmButtonColor: "#ff00008f",
                    confirmButtonText: "Aceptar",
                    customClass: {
                        popup: 'textFalla'
                    }
                });
            }
            else if (!emailRegex.test(usuarioRegistrar.username)) {
                Swal.fire({
                    title: "Registro fallo",
                    text: "Formarto de correo incorrecto",
                    icon: "error",
                    confirmButtonColor: "#ff00008f",
                    confirmButtonText: "Aceptar",
                    customClass: {
                        popup: 'textFalla'
                    }
                });
            }
            else if (!regexPassword.test(usuarioRegistrar.password)) {
                Swal.fire({
                    title: "Registro fallo",
                    text: "La contraseña debe contener minimo 4 caracteres",
                    icon: "error",
                    confirmButtonColor: "#ff00008f",
                    confirmButtonText: "Aceptar",
                    customClass: {
                        popup: 'textFalla'
                    }
                });
            }
            else {
                const response = await axios.post(endPointRegister, usuarioRegistrar)
                console.log(response)
                Swal.fire({
                    title: "Registrado",
                    text: "El usuario ha sido registrado, se a enviado un mail a" + usuarioRegistrar.username,
                    icon: "success",
                    confirmButtonColor: "#008000a9",
                    customClass: {
                        popup: 'textExito'
                    }
                });
                setUsuarioRegistrar({
                    username: "",
                    password: "",
                    nombre: "",
                    apellido: "",
                    direccion: ""
                })
                setTimeout(() => {
                    navigate('/'); // Redirige al home   
                }, 2000)
            }
        }
        catch (error) {
            console.error('Error:', error.message);
            Swal.fire({
                title: "Error!",
                text: error.message,
                icon: "error",
                confirmButtonColor: "#ff00008f",
                customClass: {
                    popup: 'textFallaServer'
                }
            });
            setUsuarioRegistrar({
                username: "",
                password: "",
                nombre: "",
                apellido: "",
                direccion: ""
            })
        }
    }



    const handleChangeUserName = (e) => {
        setUsuarioRegistrar((prevState) => ({ ...prevState, username: e.target.value.trimStart() }))
    }
    const handleChangePassword = (e) => {
        setUsuarioRegistrar((prevState) => ({ ...prevState, password: e.target.value.trimStart() }))
    }
    const handleChangeFirstName = (e) => {
        setUsuarioRegistrar((prevState) => ({ ...prevState, nombre: e.target.value.trimStart() }))
    }
    const handleChangeLastName = (e) => {
        setUsuarioRegistrar((prevState) => ({ ...prevState, apellido: e.target.value.trimStart() }))
    }
    const handleChangeEmail = (e) => {
        setUsuarioRegistrar((prevState) => ({ ...prevState, direccion: e.target.value.trimStart() }))
    }


    return (
        <div className={styles.pageFormCrearcuenta}>
            <form className={styles.formRegister}>
                <img className={styles.bannerRegister}  src={imagenLogin}/>
                <img className={styles.logoLoguin} src={imagenLogo} />
                <h2 className={styles.titleFormLoguin}>Bienvenido a Vortex Games</h2>
                <div className={styles.etiquetaUserName}>
                    <label >Email *</label>
                    <input className={styles.inputUserName} value={usuarioRegistrar.username} onChange={handleChangeUserName} />

                </div>
                <div className={styles.etiquetaPassword}>
                    <label> Contraseña *</label>
                    <input placeholder="Minimo 8 caracteres" className={styles.inputPassword} type='password' value={usuarioRegistrar.password} onChange={handleChangePassword} />

                </div>
                <div className={styles.etiquetaName}>
                    <label> Nombre *</label>
                    <input className={styles.inputNameRegister} value={usuarioRegistrar.nombre} onChange={handleChangeFirstName} />
                </div>
                <div>

                </div>
                <div className={styles.etiquetaApellido}>
                    <label >Apellido *</label>
                    <input className={styles.inputApellido} value={usuarioRegistrar.apellido} onChange={handleChangeLastName} />
                </div>
                <div className={styles.etiquetaEmail}>
                    <label >Dirección *</label>
                    <input className={styles.inputEmail} value={usuarioRegistrar.direccion} onChange={handleChangeEmail} />
                </div>

                <button className={styles.crearCuenta} onClick={handleSubmitRegister}>Crear Cuenta</button>
                <div className={styles.footerLoguin}><Link to={'/FormLogin/'}> <span> Iniciar sesion </span> </Link> <span>¿Olvidaste tu contraseña?</span></div>
            </form>

        </div>


    )
}

export default FormCrearCuenta