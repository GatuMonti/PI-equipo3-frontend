import React, { useState } from 'react'
import { Link} from 'react-router-dom'
import 'boxicons/css/boxicons.min.css';


function Card({product}) {
  const [esFavorito, setEsFavorito] = useState(false);

  const toggleFavorito = () => {
    setEsFavorito(!esFavorito);
  };


  console.log(product.images)
  // Limita la cantidad de caracteres de DescriptionProduct 
  const maxLength = 75;

  const trimmedDescription =
    product.description.length > maxLength
      ? product.description.substring(0, maxLength) + '...'
      : product.description;

  return (
    <div className='card'>
        <Link to={'/Detail/' + product.id}>
           <img className="imageProduct" src={product.images[0].imageUrl}alt="imagen del producto" />
           <h4 className='tituloProducto'> {product.name} </h4>
           <p className="DescriptionProduct">{trimmedDescription}</p>
        </Link>
  

        <div onClick={toggleFavorito} className='contenedorFavoritoCard'>
        <i className={`bx ${esFavorito ? 'bxs-heart' : 'bx-heart'}`}></i>
      </div>

    </div>
  )
}

export default Card