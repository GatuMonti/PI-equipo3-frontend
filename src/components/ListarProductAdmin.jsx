import React, { useEffect } from 'react'
import { useContextGlobal } from './Util/global.context'
import { useParams } from 'react-router-dom';
import axios from 'axios';

function ListarProductAdmin() {

    const {state,dispatch}=useContextGlobal()


    const endPointDeleteProduct=`http://localhost:8080/products/delete-product/`



    const handleDelete = async (id) => {
      try {
          await axios.delete(endPointDeleteProduct + id);
          dispatch({ type: 'delete_product', payload: id});
      } catch (error) {
          console.error('Error al eliminar el producto:', error.message);
      }
  };

  

    return (
      <div className='listaAdmin'>
          <h2 className="titleListProducts">Listado de Productos</h2>
          <div className='contenedorListaProductos'>
          {state.productos.reverse().map((producto, index) => (
              <div key={index} className="contenedorProductosAdmin">
                  {console.log(producto)}
                  <p className='listId'>ID: {producto.id}</p>
                  <p className='listName'>Nombre: <span>{producto.name}</span></p>
                  <p className='listCategoria'>Categoria: {producto.category}</p>
                  <p className='listTipo'>Tipo: {producto.type}</p>
                  <img className="imageProductListAdmin" src={producto.images[0].imageUrl} alt="imageProductAdmin" /> 
                  <button className="botonEditar">🖋️</button>
                  <button onClick={()=>handleDelete(producto.id)} className="botonEliminar">❎</button>
              </div>
          ))}
          </div>
          
      </div>
  );
}

export default ListarProductAdmin