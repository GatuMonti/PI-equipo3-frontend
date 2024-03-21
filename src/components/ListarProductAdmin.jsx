import React, { useEffect, useState } from 'react'
import { useContextGlobal } from './Util/global.context'
import axios from 'axios';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';
import { Pagination, Button } from 'react-bootstrap';



function ListarProductAdmin() {


    const {state,dispatch}=useContextGlobal();
    const [currentPage, setCurrentPage] = useState(1);
    const [productsPerPage] = useState(5);

    const endPointDeleteProduct=`http://localhost:8080/products/delete-product/`

    useEffect(()=>{

    },[])

    const handleDelete = (id) => {
      try {
         
          Swal.fire({
            title: "Desea eliminar el producto?",
            text: "El producto se eliminara de la base de datos del sistema",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#008000a9",
            cancelButtonColor: "#d33",
            confirmButtonText: "Eliminar!"
          }).then(async(result) => {
            if (result.isConfirmed) {
             await axios.delete(endPointDeleteProduct + id);
             dispatch({ type: 'delete_product', payload: id});
              Swal.fire({
                title: "Eliminado!",
                text: "El producto ha sido borrado.",
                icon: "success",
                confirmButtonColor: "#008000a9",

              });
            }
          });
      } catch (error) {
          console.error('Error al eliminar el producto:', error.message);
          Swal.fire({
            title: "Error!",
            text: error.message,
            icon: "error",
            confirmButtonColor: "#ff00008f",
            customClass: {
                popup:'textFallaServer'
            }
        });
      }
  };

    // Logica para la paginacion    
    let currentProducts = [];
    if (state.productos.length > 0) {
        const indexOfLastProductos = currentPage * productsPerPage;
        const indexOfFirstProductos = indexOfLastProductos - productsPerPage;
        currentProducts = state.productos.slice(indexOfFirstProductos, indexOfLastProductos);
    }

    
 
    return (
        <div className='listaAdmin'>
          <h2 className="titleListProducts">Listado de Productos <span className='contadorProductos'>Cantidad : {state.productos.length}</span></h2>
          <div className='contenedorListaProductos'>
          {state.productos.reverse().map((producto, index) => (
              <div key={index} className="contenedorProductosAdmin">
                  {console.log(producto)}
                  <p className='listId'>ID: {producto.id}</p>
                  <p className='listName'>Nombre: <span>{producto.name}</span></p>
                  <p className='listCategoria'>Categoria: {producto.category ? producto.category.title : 'Sin categoría'}</p>                  <p className='listTipo'>Tipo: {producto.type}</p>
                  <img className="imageProductListAdmin" src={producto.images[0].imageUrl} alt="imageProductAdmin" /> 
                  
                  <Link to={'/editProduct/' + producto.id}><button className="botonEditar">🖋️</button></Link>
                  <button onClick={()=>handleDelete(producto.id)} className="botonEliminar">❎</button>
              </div>
          ))}
          
          {state.productos.length > 0 && (
                <Pagination>
                    {Array.from({ length: Math.ceil(state.productos.length / productsPerPage) }).map((_, index) => (
                        <Pagination.Item key={index} onClick={() => setCurrentPage(index + 1)} active={index + 1 === currentPage}>
                            {index + 1}
                        </Pagination.Item>
                    ))}
                </Pagination>
            )}
          </div>
          
      </div>
      
    
      
  );
}

export default ListarProductAdmin