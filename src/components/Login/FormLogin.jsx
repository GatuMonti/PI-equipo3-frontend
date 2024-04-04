import axios from 'axios';
import React, { useState } from 'react'
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import styles from './login.module.css'
import { urlBackend } from '../../App';
import imagenLogin from '../../Images/imagen_login_3.webp';
import imagenLogo from '../../Images/fondoblanco.png';




const FormLogin = () => {

    const [usuarioAutenticar, setUsuarioAutenticar] = useState({
        username: "",
        password: ""
    })

    const endPointLogin = urlBackend + "auth/login";

    // Función para decodificar el token JWT
    //  const parseJwt = (token) => {
    //     try {
    //         return JSON.parse(atob(token.split('.')[1]));
    //     } catch (e) {
    //         return null;
    //     }
    // };

    // Función para decodificar el token JWT

    function parseJwt(token) {
        var base64Url = token.split('.')[1];
        var base64 = base64Url.replace('-', '+').replace('_', '/');
        return JSON.parse(window.atob(base64));
    };


    const handleChangeUserNameLogin = (e) => {
        setUsuarioAutenticar((prevState) => ({ ...prevState, username: e.target.value.trimStart() }))
    }
    const handleChangePasswordLogin = (e) => {
        setUsuarioAutenticar((prevState) => ({ ...prevState, password: e.target.value.trimStart() }))
    }

    const navigate = useNavigate();


    const handleSubmitLogin = async (e) => {
        e.preventDefault()
        const regexPassword = /^.{4,}$/; //Minimo 8 caracteres
        try {
            if (usuarioAutenticar.username === "" || usuarioAutenticar.password === "") {
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
            else if (!regexPassword.test(usuarioAutenticar.password)) {
                Swal.fire({
                    title: "Registro fallo",
                    text: "La contraseña debe contener minimo 8 caracteres",
                    icon: "error",
                    confirmButtonColor: "#ff00008f",
                    confirmButtonText: "Aceptar",
                    customClass: {
                        popup: 'textFalla'
                    }
                });
            }
            else {
                const response = await axios.post(endPointLogin, usuarioAutenticar)
                console.log(response.data.token)
                const token = response.data.token
                const tokenDecodificado = parseJwt(token) // Decodificar el token para obtener la información

                console.log(tokenDecodificado);
                localStorage.setItem("userRole", tokenDecodificado.role); // Guardar el rol en el localStorage
                localStorage.setItem("nombre", tokenDecodificado.nombre);
                localStorage.setItem("apellido", tokenDecodificado.apellido);
                localStorage.setItem("username", tokenDecodificado.sub);
                console.log(localStorage.getItem("userRole"))


                setTimeout(() => {
                    navigate('/'); // Redirige al home 
                    window.location.reload()
                }, 2000)

                Swal.fire({
                    title: "Logueado",
                    text: "El usuario se ha logueado",
                    icon: "success",
                    confirmButtonColor: "#008000a9",
                    customClass: {
                        popup: 'textExito'
                    }
                });
                setUsuarioAutenticar({
                    username: "",
                    password: ""
                })
            }
        } catch (error) {
            if (error.response.status === 403) {
                Swal.fire({
                    title: "Error",
                    text: "El correo electrónico o la contraseña son incorrectos",
                    icon: "error",
                    confirmButtonColor: "#ff00008f",
                    customClass: {
                        popup: 'textFallaServer'
                    }
                });
            } else {
                console.error('Error:', error.message);
                Swal.fire({
                    title: "Error",
                    text: error.message,
                    icon: "error",
                    confirmButtonColor: "#ff00008f",
                    customClass: {
                        popup: 'textFallaServer'
                    }
                });
            }

            setUsuarioAutenticar({
                username: "",
                password: ""
            });
        }
    }

    return (
        <div className={styles.pageFormLogin}>
            <form className={styles.formLogin}>
                <img className={styles.banner} src={imagenLogin} />
                <img className={styles.logoLoguin} src={imagenLogo} />

                <h2 className={styles.titleFormLogin}>Iniciar sesión en Vortex</h2>

                <div className={styles.etiquetaUserNameLogin}>
                    <label >Email </label>
                    <input className={styles.inputUserNameLogin} value={usuarioAutenticar.username} onChange={handleChangeUserNameLogin} />
                </div>

                <div className={styles.etiquetaPasswordLogin}>
                    <label >Contraseña </label>
                    <input type='password' className={styles.inputPasswordLogin} value={usuarioAutenticar.password} onChange={handleChangePasswordLogin} />
                </div>

                <button className={styles.botonLogin} onClick={handleSubmitLogin}>Entrar</button>
                <div className={styles.footerLoguin}><Link to={'/FormCrearCuenta/'}> <span> Registar usuario </span> </Link> <span>¿Olvidaste tu contraseña?</span></div>
            </form>
        </div>
    )
}

export default FormLogin