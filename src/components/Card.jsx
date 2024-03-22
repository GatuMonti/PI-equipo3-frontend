import React, { useState, useEffect } from 'react'
import { Link} from 'react-router-dom'
import 'boxicons/css/boxicons.min.css';
import Swal from 'sweetalert2';
import { useContextGlobal } from './Util/global.context';
import axios from 'axios';
import { agregarFavorito, eliminarFavorito, obtenerFavoritos } from '../components/favoritos';
import EstrellasCard from './EstrellasCard'; 
import CalificacionPromedioInfo from './CalificacionPromedioInfo';



function Card({product}) {
  //const [esFavorito, setEsFavorito] = useState(false);
  const {state, dispatch} = useContextGlobal();
  const [estadosFavoritos, setEstadosFavoritos] = useState({
    favorito:false,
    isUsuario:false
  });

  const productoFavorito={
    username:localStorage.getItem("username"),
    id:product.id
    }

//UseEffect para que cuando renderize la card valide si hay un usuario y setea la bandera de usuario

useEffect(()=>{
  if(localStorage.getItem("username")!=null){
    state.favoritos.map((product)=>{
      localStorage.setItem(`favorito_${product.id}`, 'true');
    })
    setEstadosFavoritos({
      ...estadosFavoritos,
      isUsuario:true,
      favorito: localStorage.getItem(`favorito_${product.id}`) === 'true'
    })
     }
    },[])

const usuario=localStorage.getItem("username")

    //Manejo del onclick del boton favoritos

  const handleToggleFavorito = () => {

    if(estadosFavoritos.favorito){
     
      try {
        Swal.fire({
          title: "Seguro que quieres eliminarlo?",
          text: "El juego sera eliminado de tus favoritos",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonText: "Cancelar!",
          cancelButtonColor: "#d33",
          confirmButtonText: "Si, quiero eliminarlo!",
        }).then((result) => {
          if (result.isConfirmed) {
            axios.delete(`http://localhost:8080/favorite/delete-favorite`, { data: productoFavorito })
            .then((response)=>{
              console.log(response.data)
              axios.get("http://localhost:8080/favorite/listar-favoritos-usuario/" + usuario )
              .then((response)=>{
                console.log("Favoritos del usuario desde el back",response.data)
                dispatch({ type: 'get_favorites', payload: response.data }) 
                localStorage.setItem(`favorito_${product.id}`, 'false');
                setEstadosFavoritos({
                  ...estadosFavoritos,
                  favorito: false,
                })
              })
            })   
            Swal.fire({
              title: "Eliminado!",
              text: "El juego ha sido eliminado!",
              icon: "success"
            });
          }
        });
      } 
      catch (error) {
        console.error('Error:', error.message);
      }

    }
    else{
     
      try {
        axios.post(`http://localhost:8080/favorite/add-favorite`, productoFavorito)
        .then((response)=>{
          console.log(response.data)
          Swal.fire("El juego ha sido añadido a favorito!");
          axios.get("http://localhost:8080/favorite/listar-favoritos-usuario/" + usuario )
          .then((response)=>{
            console.log("Favoritos del usuario desde el back",response.data)
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
  
//   useEffect(()=>{
//     if(localStorage.getItem("username")!=null){
//       state.favoritos.map((product)=>{
//         localStorage.setItem(`favorito_${product.id}`, 'true');
//       })
//       setEsFavorito(localStorage.getItem(`favorito_${product.id}`) === 'true')
//      }
//     },[])

  // const toggleFavorito = () => {   
  //   if (!esFavorito) {
  //     agregarFavorito(localStorage.getItem('username'), product.id) 
  //     .then(() => {
  //       setEsFavorito(true); // Cambiar esFavorito solo después de agregar el favorito
  //       Swal.fire("has been added to favorites");     
  //     })
  //     .catch(error => {
  //       console.error("Error adding favorite:", error);
  //       Swal.fire({
  //         title: "Error!",
  //         text: "An error occurred while adding the play to favorites.",
  //         icon: "error"
  //       });
  //     });
  //   } else {
  //     Swal.fire({
  //       title: "Want to delete?",
  //       text: "The Play will be removed from favorites",
  //       icon: "warning",
  //       showCancelButton: true,
  //       confirmButtonColor: "#3085d6",
  //       cancelButtonColor: "#d33",
  //       confirmButtonText: "Yes, delete it!"
  //     }).then((result) => {        
  //       if (result.isConfirmed) {
  //         eliminarFavorito(localStorage.getItem('username'), product.id)
  //         .then(() => {
  //           setEsFavorito(false); // Cambiar esFavorito solo después de eliminar el favorito
  //           Swal.fire({
  //             title: "Deleted!",
  //             text: "The play has been deleted.",
  //             icon: "success"
  //           });
  //         })
  //         .catch(error => {
  //           console.error("Error deleting favorite:", error);
  //           Swal.fire({
  //             title: "Error!",
  //             text: "An error occurred while deleting the play from favorites.",
  //             icon: "error"
  //           });
  //         });
  //       }           
  //     });
  //   }
  // };

  


  console.log(product.images)
  // Limita la cantidad de caracteres de DescriptionProduct 
  const maxLength = 75;

  const trimmedDescription =
    product.description.length > maxLength
      ? product.description.substring(0, maxLength) + '...'
      : product.description;

  return (
    <div className='card'>
      <div className='cardTop'>
      <div onClick={handleToggleFavorito} className='contenedorFavoritoCard'>
          {localStorage.getItem('username') && <i className={`bx ${estadosFavoritos.favorito ? 'bxs-heart' : 'bx-heart'}`}></i>}        
      </div>
      <EstrellasCard productId={product.id}/>
      </div>
        <Link to={'/Detail/' + product.id}>
           <img className="imageProduct" src={product.images[0].imageUrl}alt="imagen del producto" />
           <h4 className='tituloProducto'> {product.name} </h4>
           <p className="DescriptionProduct">{trimmedDescription}</p>
        </Link>               
      <CalificacionPromedioInfo productId={product.id}/>
    </div>
  )
}

export default Card