import styles from './footer.module.css'
import {Link} from 'react-router-dom'
//La única manera que encontré de pasar estos estilos fue poniendolos en 
//un .css a parte. Dan probelmas con el module.css.
import './socialMediaIcons.css'

const Footer = () => {
  return (
    <div>
        <footer className={styles.piePagina}>
          <div className={styles.footerRedes}>
            <a href="#"><i className='bx bxl-facebook-circle'></i></a>
            <a href="#"><i className='bx bxl-whatsapp'></i></a>
            <a href="#"><i className='bx bxl-instagram'></i></a>
            <a href="#"><i className='bx bxl-twitter'></i></a>
          </div>

          <div className={styles.footerLinks}>
            <a href="#">Contactanos</a>
            <a href="#">Nuestros servicios</a>
            <a href="#">Politicas de privacidad</a>
            <li><Link to={'/terminosycondiciones'}>Terminos y condiciones</Link></li>
            <a href="#">Career</a>
          </div>

          <div className={styles.footerRights}>
            <p>Vortex Copyright © 2024 - All rights reserved</p>
        </div>

        </footer>
      </div>
  )
}

export default Footer