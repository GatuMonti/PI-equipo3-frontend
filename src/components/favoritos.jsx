import axios from 'axios';

const api = axios.create({
  baseURL: 'https://tuapi.com/api',
  headers: {
    'Content-Type': 'application/json',
  },
});



const agregarFavorito = async (usuarioId, objetoId) => {
    try {
      const respuesta = await api.post('/favoritos', { usuarioId, objetoId });
      console.log('Favorito agregado', respuesta.data);
    } catch (error) {
      console.error('Error al agregar favorito', error);
    }
  };



  const eliminarFavorito = async (usuarioId, objetoId) => {
    try {
      // Nota: Verifica cómo tu backend espera recibir los parámetros para eliminar
      const respuesta = await api.delete(`/favoritos/${usuarioId}/${objetoId}`);
      console.log('Favorito eliminado', respuesta.data);
    } catch (error) {
      console.error('Error al eliminar favorito', error);
    }
  };



  const obtenerFavoritos = async (usuarioId) => {
    try {
      const respuesta = await api.get(`/favoritos/${usuarioId}`);
      return respuesta.data; // Esto debería ser una lista de favoritos
    } catch (error) {
      console.error('Error al obtener favoritos', error);
      return [];
    }
  };