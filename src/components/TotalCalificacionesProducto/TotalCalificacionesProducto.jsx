// TotalCalificacionesProducto.jsx

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './TotalCalificacionesProducto.module.css';

const StarRating = ({ value }) => {
  const stars = [];
  for (let i = 0; i < 5; i++) {
    if (i < value) {
      stars.push(<span key={i}>&#9733;</span>); // Estrella rellena
    } else {
      stars.push(<span key={i}>&#9734;</span>); // Estrella vacía
    }
  }
  return <div className={styles['star-rating']}>{stars}</div>; // Aplicar la clase de estilo
};

const TotalCalificacionesProducto = ({ productId }) => {
  const [calificaciones, setCalificaciones] = useState([]);

  useEffect(() => {
    const fetchCalificaciones = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/calificaciones/calificacionDeUnProducto/${productId}`);
        setCalificaciones(response.data);
      } catch (error) {
        console.error('Error fetching calificaciones:', error);
      }
    };

    fetchCalificaciones();
  }, [productId]);

  return (
    <div className={styles.container}>
      <h2>Calificaciones del Producto</h2>
      {calificaciones.length > 0 ? (
        <div className={styles['calificaciones-column']}>
          {calificaciones.map((calificacion, index) => (
            <div key={calificacion.id} className={styles['calificacion-item']}>
              <div>
                <StarRating value={calificacion.valorCalificacion} />
                <strong>Usuario:</strong> {calificacion.username}
              </div>
              <p><strong>Comentario:</strong> {calificacion.comentario}</p>
              {index !== calificaciones.length - 1 && <hr className={styles['linea-punteada']} />} 
            </div>
          ))}
        </div>
      ) : (
        <p>El juego no ha sido calificado por ningún usuario.</p>
      )}
    </div>
  );
};

export default TotalCalificacionesProducto;







