import React from 'react'
import { Link } from 'react-router-dom'
import style from '../styles/Card.module.css'

function Card({product}) {

    console.log(product.images)
    

  return (
    <div className={style.card}>
        <Link to={"product_detail/:1"}>
           <img className={style.imageProduct} src={product.images[0].imageUrl}alt="imagen del producto" />
           <h2 className={style.nameProduct}>{product.name}</h2>
        </Link>
    </div>
  )
}

export default Card

