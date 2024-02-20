import React from 'react';
import axios from 'axios';
import styles from '../styles/CardTable.module.css';

const CardTabla = ({ name, consola, id, cargarProductos}) => {
  
  const handleEliminar = () => {        
    axios.delete(`http://localhost:8080/products/delete-product/${id}`)
        .then(response => {                   
            console.log(response.data); 
            cargarProductos();           
        })
        .catch(error => console.error('Error, no se pudo eliminar el producto:', error));
};

return (
  
  <div className={styles.card}>
    <div className={styles.cardContent}>
      <p>{name}</p>
      <p>{consola}</p>
    </div>
    <div className={styles.buttonContainer}>
      <button
        className={styles.button}
        onClick={() => console.log("Modificar")}
      >
        ✏️
      </button>
      <button
        className={styles.button}
        onClick={handleEliminar}
      >
        ❌
      </button>
    </div>
  </div>
);
};

export default CardTabla;

