import React from "react";
import fondoblanco from "/public/fondoblanco.png" 

const Header = () => {
    return (
        <header className="container">
            <div className="logo">
                <img src={fondoblanco} alt="" />
                <p>Explora, juega y disfruta</p>
            </div>
            <div className="buttons">
                <button>Crear cuenta</button>
                <button>Iniciar sesión</button>
            </div>
        </header>
    );
}

export default Header;
