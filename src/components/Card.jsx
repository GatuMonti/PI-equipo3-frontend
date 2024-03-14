import React from 'react'
import { Link } from 'react-router-dom'


function Card({product}) {

    console.log(product.images)
    

  return (
    <div className='card'>
        <Link to={'/Detail/' + product.id}>
           <img className="imageProduct" src={product.images[0].imageUrl}alt="imagen del producto" />
           <h5 className='tituloProducto'> {product.name} </h5>
           <h3 className='tituloProducto'><b>{product.price} USD </b></h3>
        </Link>
    </div>
  )
}

export default Card