import styles from './footer.module.css'
import { Link } from 'react-router-dom'
//La única manera que encontré de pasar estos estilos fue poniendolos en 
//un .css a parte. Dan probelmas con el module.css.
import './socialMediaIcons.css'

const Footer = () => {
  return (
    <footer className={styles.piePagina}>
      <div className={styles.footerRedes}>
        <a style={{ textDecoration: 'none' }} target='_blank' href="https://www.facebook.com"><i className='bx bxl-facebook-circle'></i></a>
        <a style={{ textDecoration: 'none' }} target='_blank' href="https://wa.me/+543855889942"><i className='bx bxl-whatsapp'></i></a>
        <a href="https://www.instagram.com"><i className='bx bxl-instagram'></i></a>
        <a href="https://www.twitter.com"><i className='bx bxl-twitter'></i></a>
      </div>
      
      <div className={styles.footerLinks}>
        <Link to="https://wa.me/+543855889942">Contactanos</Link>
        <Link to="#">Nuestros servicios</Link>
        <Link to={'/terminosycondiciones'}>Politicas de privacidad</Link>
        <Link to={'/terminosycondiciones'}>Terminos y condiciones</Link>
        <Link to="#">Career</Link>
      </div>

      <div className={styles.footerRights}>
        <p>Vortex Copyright © 2024 - All rights reserved</p>
      </div>

    </footer>
  )
}

export default Footer