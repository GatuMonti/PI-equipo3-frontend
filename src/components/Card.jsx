import axios from 'axios';
import React,{useEffect, useState} from 'react'
import { Link } from 'react-router-dom'
import { useContextGlobal } from './Util/global.context';
import Swal from 'sweetalert2';


function Card({product}) {

    // console.log(product.images)

    const [estadosFavoritos, setEstadosFavoritos] = useState({
      favorito:false,
      isUsuario:false
    });

    const productoFavorito={
      username:localStorage.getItem("username"),
      id:product.id
    }

    const{state, dispatch}=useContextGlobal()

    // console.log(localStorage.getItem("username"))


    
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
          title: "Want to delete?",
          text: "The Play will be remove from favorites",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, delete it!"
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
              title: "Deleted!",
              text: "He play has been deleted.",
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
          Swal.fire("has been added to favorites");
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

  return (
    <div className='card'>

      {estadosFavoritos.isUsuario &&  

         /* Botón con clase corazon y manejo de clic */

         <button className={`corazon ${estadosFavoritos.favorito? 'active' : ''}`} onClick={handleToggleFavorito}></button>

      }
     
        <Link to={'/Detail/' + product.id}>
           <img className="imageProduct" src={product.images[0].imageUrl}alt="imagen del producto" />
           <h2 className="DescriptionProduct">{product.description}</h2>
        </Link>

    </div>
  )
}

export default Card


