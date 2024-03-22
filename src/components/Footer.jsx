import Ract from 'react'
import {Link} from 'react-router-dom'

const Footer = () => {
  return (
    <div>
        <footer className='piePagina'>
        <div className="footer">
          <div class="row">
            <ul>
              <li><a href="https://www.facebook.com/" target="_blank"><i className='bx bxl-facebook-circle'></i></a></li>
              <li><a href="https://web.whatsapp.com/" target="_blank"><i className='bx bxl-whatsapp'></i></a></li>
              <li><a href="https://www.instagram.com/" target="_blank"><i className='bx bxl-instagram'></i></a></li>
              <li><a href="https://twitter.com/home" target="_blank"><i className='bx bxl-twitter'></i></a></li>
            </ul>
            
            
            
           
          </div>

          <div className="row">
            <ul>
              <li><a href="#">Contactanos</a></li>
              <li><a href="#">Nuestros servicios</a></li>
              <li><a href="#">Politicas de privacidad</a></li>
              <li><Link to={'/terminosycondiciones'}>Terminos y condiciones</Link></li>
              <li><a href="#">Career</a></li>
            </ul>
          </div>

          <div className="roww">
              <p>Vortex Copyright © 2024 - All rights reserved</p>
          </div>
        </div>
                  


        </footer>
      </div>
  )
}

export default Footer