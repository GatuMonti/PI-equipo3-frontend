import { Link } from "react-router-dom";
import styles from '../styles/Card.module.css';


const Card = () => {
  return (
    <Link className={styles.container} to= "/product_detail/1">        
        <img
                className={styles.img}
                src="https://uvejuegos.com/img/caratulas/44926/zelda.jpg"
                alt="Portada del juego"
        />
        <h3 className={styles.precio}>US$15</h3>      
    </Link>
  );
}

export default Card; 

