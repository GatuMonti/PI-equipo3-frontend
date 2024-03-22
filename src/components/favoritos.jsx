import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080',
  headers: {
    'Content-Type': 'application/json',
  },
});



const agregarFavorito = async (usuarioId, objetoId) => {
    try {
      const respuesta = await api.post('/favorite/add-favorite', { "username":usuarioId, "id":objetoId });
      console.log('Favorito agregado', respuesta.data);
    } catch (error) {
      console.error('Error al agregar favorito', error);
    }
  };


  const eliminarFavorito = async (usuarioId, objetoId) => {
    try {
      const respuesta = await api.delete('/favorite/delete-favorite', {
        data: { "username": usuarioId, "id": objetoId }
      });
    } catch (error) {
      console.error('Error al eliminar favorito', error);
    }
  };

  const obtenerFavoritos = async (usuarioId) => {
    try {
      const respuesta = await api.get(`/favorite/listar-favoritos-usuario/${usuarioId}`);
      console.log("esto es la respuesta del backend:", respuesta.data); 
      return respuesta.data; 
    } catch (error) {
      console.error('Error al obtener favoritos', error);
      return [];
    }
  };
  

  export { obtenerFavoritos, agregarFavorito, eliminarFavorito}