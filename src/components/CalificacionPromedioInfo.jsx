import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { urlBackend } from '../App';

const CalificacionPromedioInfo = ({ productId }) => {
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

  return (
    <div className='contenedorCalificPromedio'>
      {calificacionData ? (
        <div className='cardBottom'>  
        <div>Votos: <span className='cardVotos'>{calificacionData.totalDeCalificaciones !== 0 ? calificacionData.totalDeCalificaciones : 'S/N'}</span></div>       
          <div>Puntaje: <span className='cardVotos'>{calificacionData.calificacionPromedio !== 0 ? calificacionData.calificacionPromedio : 'S/N'}</span></div>
          
        </div>
      ) : (
        <div>Cargando...</div>
      )}
    </div>
  );
};

export default CalificacionPromedioInfo;
