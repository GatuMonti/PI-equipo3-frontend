import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

const ProductoReservado = ({ producto, reservaFinalizada, estadoRecibido, username, recibirCambioDeEstado }) => {
  // Estados para manejar el comentario y la calificación
  const [comentario, setComentario] = useState('');
  const [valorCalificacion, setValorCalificacion] = useState(1);
  const [calificacionesProducto, setCalificacionesProducto] = useState([]);
  const [yaCalificado, setYaCalificado] = useState(false);
  const [calificacionUsuario, setCalificacionUsuario] = useState(null);

  // Obtener todas las calificaciones del producto
  useEffect(() => {
    const obtenerCalificaciones = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/calificaciones/calificacionDeUnProducto/${producto.id}`);        
        setCalificacionesProducto(response.data);        
        const calificacionUsuario = response.data.find(calificacion => calificacion.username === username);
        if (calificacionUsuario) {
          setYaCalificado(true);
          setCalificacionUsuario(calificacionUsuario);
        }
      } catch (error) {
        console.error('Error al obtener las calificaciones del producto:', error.message);
      }
    };
    obtenerCalificaciones();
  }, [username, estadoRecibido]);

  const handleCalificar = async () => {
    try {
      if (reservaFinalizada) {
        if (yaCalificado) {
          Swal.fire("Ya has calificado este producto", "No puedes calificar el mismo producto más de una vez.", "warning");
        } else {
          await axios.post('http://localhost:8080/calificaciones/calificar', {
            username: username,
            productoId: producto.id,
            valorCalificacion: valorCalificacion,
            comentario: comentario,
          });
          Swal.fire("¡Calificado!", "Tu calificación ha sido guardada.", "success");
          recibirCambioDeEstado(estadoRecibido)
          // Opcional: resetear los estados después de enviar la calificación          
          setComentario('');
          setValorCalificacion(1);
          setYaCalificado(true);
          setCalificacionUsuario({
            valorCalificacion: valorCalificacion,
            comentario: comentario,
          });
        }
      } else {
        Swal.fire("Reserva aún no finalizada", "No puedes calificar este producto hasta que la reserva esté finalizada.", "warning");
      }
    } catch (error) {
      console.error('Error al calificar:', error.message);
      Swal.fire("Error!", error.response ? error.response.data : error.message, "error");
    }
  };

  const verCalificaciones = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/calificaciones/calificacionDeUnProducto/${producto.id}`);
      const calificaciones = response.data.map(calificacion => ({
        username: calificacion.username,
        valorCalificacion: calificacion.valorCalificacion,
        comentario: calificacion.comentario,
      }));
      console.log(calificaciones);
      // Mostrar el popup con las calificaciones
      Swal.fire({
        title: `Calificaciones de ${producto.nombre}`,
        html: `
          <div>
            ${calificaciones.map(calificacion => `
              <p><strong>Usuario:</strong> ${calificacion.username}</p>
              <p><strong>Calificación:</strong> ${calificacion.valorCalificacion}</p>
              <p><strong>Comentario:</strong> ${calificacion.comentario}</p>
              <hr>
            `).join('')}
          </div>
        `,
        confirmButtonText: 'Cerrar',
      });
    } catch (error) {
      console.error('Error al obtener las calificaciones del producto:', error.message);
      Swal.fire("Error!", "Error al obtener las calificaciones del producto.", "error");
    }
  };

  const verCalificacionUsuario = () => {
    // Mostrar solo la calificación del usuario actual en un popup
    Swal.fire({
      title: `Tu calificación para ${producto.nombre}`,
      html: `
        <p><strong>Calificación:</strong> ${calificacionUsuario.valorCalificacion}</p>
        <p><strong>Comentario:</strong> ${calificacionUsuario.comentario}</p>
      `,
      confirmButtonText: 'Cerrar',
    });
  };

  return (
    <div className='productosClasificar'>
        <div className='calificarColumna1'>
      <span>{producto.nombre}</span>
      <button onClick={verCalificaciones}>Ver Calificaciones</button> {/* Botón para mostrar todas las calificaciones */}
      </div>
      {reservaFinalizada && (
        <div>
          {yaCalificado ? (
            <div className='msjsCalificar'>
              <p>PRODUCTO YA CALIFICADO</p>
              <button onClick={verCalificacionUsuario}>Ver Tu Calificación</button> {/* Botón para mostrar la calificación del usuario actual */}
            </div>
          ) : (
            <div>
              <input
                type="text"
                placeholder="Comentario"
                value={comentario}
                onChange={(e) => setComentario(e.target.value)}
              />
              <select
                value={valorCalificacion}
                onChange={(e) => setValorCalificacion(e.target.value)}
              >
                {[1, 2, 3, 4, 5].map(valor => (
                  <option key={valor} value={valor}>{valor} Estrellas</option>
                ))}
              </select>
              <button onClick={handleCalificar}>Calificar</button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ProductoReservado;








