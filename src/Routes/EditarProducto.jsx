import React,{useEffect} from 'react'
import { useParams} from 'react-router-dom'
import { useContextGlobal } from '../components/Util/global.context'
import axios from 'axios'
import { Link } from 'react-router-dom'

const EditarProducto = () => {

  const params=useParams()

  const {state,dispatch}=useContextGlobal()

  const endPointDetail=`http://localhost:8080/products/search-id/${params.id}`
  console.log(params.id)
  useEffect(()=>{
    axios(endPointDetail)
    .then(res => dispatch({ type: 'get_producto', payload: res.data }))
    .catch(error => console.error("Error fetching product details:", error));
}, [endPointDetail, dispatch]);
  
  return (
    <div>
       
       <div className="contenedorDetalles">
           <h2 className="tituloDetallesDeProducto">Detalles principales</h2>
           <h3 className="categoriaProducto">Categoria:<span>{state.producto.category}</span></h3>
           <h3 className="descripcionProducto">Descripcion:<span>{state.producto.description}</span></h3>
           <h3 className="precioProducto">Precio:<span>{state.producto.price} USD</span></h3>
           <h2 className="tituloDetallesDeProducto">Detalles principales</h2>
           <h3 className="categoriaProducto">Categoria:<span>{state.producto.name}</span></h3>
           <h3 className="descripcionProducto">Descripcion:<span>{state.producto.description}</span></h3>
           <h3 className="precioProducto">Precio:<span>{state.producto.price} USD</span></h3>
           <Link to={'/pageAdmin/'}><button>atras</button></Link>
        </div>       
    </div>
  )
}

export default EditarProducto