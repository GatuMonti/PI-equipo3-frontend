import React from 'react'
import { Link } from 'react-router-dom'


function Card({product}) {

   // console.log(product.images)
    

  return (
    <div className='card'>
        <Link to={'/Detail/' + product.id}>
           <img className="imageProduct" src={product.images[0].imageUrl}alt="imagen del producto" />
           <h2 className="DescriptionProduct">{product.description}</h2>
        </Link>
    </div>
  )
}

export default Card