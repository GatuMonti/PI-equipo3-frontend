import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useContextGlobal } from '../components/Util/global.context';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Detail = () => {

  const params=useParams()

  const {state,dispatch}=useContextGlobal()

  const endPointDetail=`http://localhost:8080/products/search-id/${params.id}`
  
  console.log(params.id)

<<<<<<< HEAD
  const rolEnLocalStore=localStorage.getItem('userRole')

=======
>>>>>>> 0b05361760545396a0674289e0d51b3252a3ee1b

  useEffect(()=>{
    axios(endPointDetail)
    .then(res => dispatch({ type: 'get_producto', payload: res.data }))
    .catch(error => console.error("Error fetching product details:", error));
}, [endPointDetail, dispatch]);


  console.log(state.producto)
  return (
    <div className='detalleProducto'>
       <Link to={'/'}><button className='botonRegresar'>Atras</button></Link>
       <h3 className="tituloDetail">{state.producto?.name}</h3>
       
        
       <div className="contenedorImagenesDetail">
          {state.producto && state.producto.images && state.producto.images.length > 0 && (
            <img className='imagen1Producto' src={state.producto.images[0].imageUrl} alt="imagen1" />
)}
           <div className="contenedor4imagenes">
              {state.producto && state.producto.images && state.producto.images.length > 0 && (
                <img className='imagen2Producto' src={state.producto.images[1].imageUrl} alt="imagen2" />
)}
             {state.producto && state.producto.images && state.producto.images.length > 0 && (
               <img className='imagen3Producto' src={state.producto.images[2].imageUrl} alt="imagen3" />
)}
             {state.producto && state.producto.images && state.producto.images.length > 0 && (
               <img className='imagen4Producto' src={state.producto.images[3].imageUrl} alt="imagen4" />
)}
            {state.producto && state.producto.images && state.producto.images.length > 0 && (
               <img className='imagen5Producto' src={state.producto.images[4].imageUrl} alt="imagen5" />
)}
           </div>
           
       </div>
      
       <button className='verMas'>ver mas</button>

       <div className="contenedorDetalles">
           <h2 className="tituloDetallesDeProducto">Detalles principales</h2>
<<<<<<< HEAD
           <h3 className="categoriaProducto">Categoria:<span>{state.producto.category? state.producto.category.title : "Sin categoria"}</span></h3>
=======
           <h3 className="categoriaProducto">Categoria:<span>{state.producto.category}</span></h3>
>>>>>>> 0b05361760545396a0674289e0d51b3252a3ee1b
           <h3 className="descripcionProducto">Descripcion:<span>{state.producto.description}</span></h3>
           <h3 className="precioProducto">Precio:<span>{state.producto.price} USD</span></h3>
        </div>
        <div className="contenedorComprar">
<<<<<<< HEAD
          {rolEnLocalStore !=null && <button className='botonComprar'>Comprar</button>}
          
=======
          <button className='botonComprar'>Comprar</button>
>>>>>>> 0b05361760545396a0674289e0d51b3252a3ee1b
        </div>
          
     
     






    </div>
  )
}

export default Detail