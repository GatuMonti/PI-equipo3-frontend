import React from 'react'
import { Link } from 'react-router-dom'


const Footer = () => {
  return (
    <div>
        <footer className='piePagina'>
            <div className="derechos">
                <p className="circuloFooter">C</p>
                <h3 className="mensajeFooter">2024 Games</h3>
            </div>
            <Link to={"/Politicas/"}> <p className="linkpoliticas">Politicas de privacidad</p></Link>
           
            <nav className="navegacionFooter">
                <i className='bx bxl-facebook-circle'></i>
                <a style={{ textDecoration: 'none' }} target='_blank' href="https://wa.me/+543855889942"><i className='bx bxl-whatsapp'></i></a>                
                <i className='bx bxl-instagram'></i>
                <i className='bx bxl-twitter'></i>
            </nav>
           


        </footer>
    </div>
  )
}

export default Footer