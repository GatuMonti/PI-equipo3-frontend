import React from 'react'
import { Link } from 'react-router-dom'


function Card({product}) {

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
           <h5 className='tituloProducto'> {product.name} </h5>
           <p className="DescriptionProduct">{trimmedDescription}</p>
        </Link>
    </div>
  )
}

export default Card