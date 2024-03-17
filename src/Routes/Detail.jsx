import React, { useEffect, useState } from 'react';
import Avatar from 'react-avatar';
import { useParams } from 'react-router-dom';
import { useContextGlobal } from '../components/Util/global.context';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Detail = () => {

  const params=useParams()

  const {state,dispatch}=useContextGlobal()

  const endPointDetail=`http://localhost:8080/products/search-id/${params.id}`
  
  console.log(params.id)

  const rolEnLocalStore=localStorage.getItem('userRole')

  const[State, setState]=useState({
    showFeatures:false,
    cambiarBoton:false
  })

 
const handleMostarMas=()=>{
  setState({ ...State, showFeatures: true, cambiarBoton: true });
}

const handleOcultar=()=>{
  setState({ ...State, showFeatures: false, cambiarBoton: false });
}

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
      {!State.cambiarBoton  ? <button onClick={handleMostarMas} className='verMas'>ver mas</button> :<button onClick={handleOcultar} className='verMas'>Ocultar</button>}
      
       {State.showFeatures && 
       <div className="contenedorMostrarCaracteristicas">
        <h2 className="tituloMostarCaracteristicas">¡Caracteristicas Especiales!</h2>
        {state.producto.characteristics.map((caracteristica)=>{
          return<p  className="nombreCaracteristicas"><Avatar name={caracteristica.name}textMarginRatio='.15' font-size='2px' size="30" round={true}/>{caracteristica.name}</p>
        })}
       </div>
       }

       <div className="contenedorDetalles">
           <h2 className="tituloDetallesDeProducto"><b>Detalles principales</b></h2>
           <h3 className="categoriaProducto">Categoria:<span>{state.producto.category? state.producto.category.title : "Sin categoria"}</span></h3>
           <h3 className="descripcionProducto">Descripcion:<span>{state.producto.description}</span></h3>
           <h3 className="precioProducto">Precio:<span>{state.producto.price} USD</span></h3>
        </div>
        <div className="contenedorComprar">
          {rolEnLocalStore !=null && <button className='botonComprar'>Comprar</button>}
          
        </div>
    </div>
  )
}

export default Detail