import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaStar, FaRegStar, FaStarHalfAlt } from "react-icons/fa";
import { urlBackend } from '../App';

const CalificacionCard = ({ productId }) => {
  const [calificacionData, setCalificacionData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${urlBackend}calificaciones/calificacionPromedio/${productId}`);
        setCalificacionData(response.data);
      } catch (error) {
        console.error('Error fetching calificacion data:', error);
      }
    };

    fetchData();
  }, [productId]);

  const renderStars = () => {
    if (calificacionData) {
      const rating = calificacionData.calificacionPromedio;
      const totalStars = 5;
      const stars = [];

      // Calcular estrellas llenas y medias estrellas
      let fullStars = Math.floor(rating);
      let halfStar = rating % 1 >= 0.5 ? 1 : 0;

      // Completar con estrellas vacías si es necesario
      const remainingStars = totalStars - fullStars - halfStar;
      for (let i = 0; i < remainingStars; i++) {
        stars.push(<span key={i} style={{ color: 'gold', fontSize: '1.5rem'}}><FaRegStar /></span>);
      }

      // Agregar media estrella si corresponde
      if (halfStar === 1) {
        stars.unshift(<span key={fullStars} style={{ color: 'gold', fontSize: '1.5rem'}}><FaStarHalfAlt /></span>);
      }

      // Agregar estrellas llenas
      for (let i = 0; i < fullStars; i++) {
        stars.unshift(<span key={fullStars + halfStar + i} style={{ color: 'gold', fontSize: '1.5rem'}}><FaStar /></span>);
      }

      return stars;
    }
  };

  return (     
    <div className='estrellas'>{renderStars()}</div>
  );
};

export default CalificacionCard;











