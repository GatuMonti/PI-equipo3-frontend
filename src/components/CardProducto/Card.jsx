import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import 'boxicons/css/boxicons.min.css';
import Swal from 'sweetalert2';
import { useContextGlobal } from '../Util/global.context';
import axios from 'axios';
import { agregarFavorito, eliminarFavorito, obtenerFavoritos } from '../favoritos';
import EstrellasCard from '../EstrellasCard';
import CalificacionPromedioInfo from '../CalificacionPromedioInfo';
import { urlBackend } from '../../App';
import styles from './cardProducto.module.css'


function Card({ product }) {
  //const [esFavorito, setEsFavorito] = useState(false);
  const { state, dispatch } = useContextGlobal();
  const [estadosFavoritos, setEstadosFavoritos] = useState({
    favorito: false,
    isUsuario: false
  });

  const productoFavorito = {
    username: localStorage.getItem("username"),
    id: product.id
  }

  //UseEffect para que cuando renderize la card valide si hay un usuario y setea la bandera de usuario

  useEffect(() => {
    if (localStorage.getItem("username") != null) {
      state.favoritos.map((product) => {
        localStorage.setItem(`favorito_${product.id}`, 'true');
      })
      setEstadosFavoritos({
        ...estadosFavoritos,
        isUsuario: true,
        favorito: localStorage.getItem(`favorito_${product.id}`) === 'true'
      })
    }
  }, [])

  const usuario = localStorage.getItem("username")

  //Manejo del onclick del boton favoritos

  const handleToggleFavorito = () => {

    if (estadosFavoritos.favorito) {

      try {
        axios.delete(`${urlBackend}favorite/delete-favorite`, { data: productoFavorito })
        .then((response) => {
          console.log(response.data)
          axios.get(urlBackend + "favorite/listar-favoritos-usuario/" + usuario)
            .then((response) => {
              console.log("Favoritos del usuario desde el back", response.data)
              dispatch({ type: 'get_favorites', payload: response.data })
              localStorage.setItem(`favorito_${product.id}`, 'false');
              setEstadosFavoritos({
                ...estadosFavoritos,
                favorito: false,
              })
            })
        })
      }
      catch (error) {
        console.error('Error:', error.message);
      }

    }
    else {

      try {
        axios.post(`${urlBackend}favorite/add-favorite`, productoFavorito)
          .then((response) => {
            console.log(response.data)
            axios.get(urlBackend + "favorite/listar-favoritos-usuario/" + usuario)
              .then((response) => {
                console.log("Favoritos del usuario desde el back", response.data)
                dispatch({ type: 'get_favorites', payload: response.data })
                localStorage.setItem(`favorito_${product.id}`, 'true');
                setEstadosFavoritos({
                  ...estadosFavoritos,
                  favorito: true,
                })
              })
          })

          .catch((error) => {
            console.error("Error al obtener favoritos:", error);
          });
      }
      catch (error) {
        console.error('Error:', error.message);
      }
    }
  }


  console.log(product.images)
  // Limita la cantidad de caracteres de DescriptionProduct 
  const maxLength = 75;

  const trimmedDescription =
    product.description.length > maxLength
      ? product.description.substring(0, maxLength) + '...'
      : product.description;

  return (
    <div className={styles.card}>
      <div className={styles.cardTop}>
        <div onClick={handleToggleFavorito} className={styles.contenedorFavoritoCard}>
          {localStorage.getItem('username') && <i className={`bx ${estadosFavoritos.favorito ? 'bxs-heart' : 'bx-heart'}`}></i>}
        </div>
        <EstrellasCard productId={product.id} />
      </div>
      <Link className={styles.contenedorJuegoCard} to={'/Detail/' + product.id}>
        <img className={styles.imageProduct} src={product.images[0].imageUrl} alt="imagen del producto" />
        <h4 className={styles.tituloProducto}> {product.name} </h4>
        <p className={styles.DescriptionProduct}>{trimmedDescription}</p>
      </Link>
      <CalificacionPromedioInfo productId={product.id} />
    </div>
  )
}

export default Card