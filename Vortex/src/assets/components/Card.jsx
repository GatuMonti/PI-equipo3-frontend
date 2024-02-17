import styles from '../styles/Card.module.css'


const Card = () => {
  return (
    <div className={styles.container}>        
        <img
                className={styles.img}
                src="https://uvejuegos.com/img/caratulas/44926/zelda.jpg"
                alt="Portada del juego"
        />
        <h3 className={styles.precio}>US$15</h3>
        
      
    </div>
  );
}

export default Card; 

