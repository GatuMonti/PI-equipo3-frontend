import React, { useEffect, useState } from 'react'
import { useContextGlobal } from './Util/global.context'
import axios from 'axios';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';
import { start } from '@popperjs/core';



function ListarProductAdmin() {


    const {state,dispatch}=useContextGlobal()

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

  //Codigo para paginado

  const [currentPage, setCurrentPage]=useState(0) //Estado para almacenar la pagina actual

  const itemsPerPage=8 // Define la cantidad de elementoso por pagina

//Calcula el indice inicial y final de los elementos a mostrar en la pagina actual
  const startIndex= currentPage * itemsPerPage
  const endIndex=  startIndex + itemsPerPage

  // Filtra y mapea los elementos para mostrar solo los de la página actual

const listProductsShow= state.productos.slice(startIndex,endIndex).map((producto, index) => (
  <div key={index} className="contenedorProductosAdmin">
      {console.log(producto)}
      <p className='listId'>ID: {producto.id}</p>
      <p className='listName'>Nombre: <span>{producto.name}</span></p>
      <p className='listCategoria'>Categoria: {producto.category ? producto.category.title : 'Sin categoría'}</p>                  <p className='listTipo'>Tipo: {producto.type}</p>
      <img className="imageProductListAdmin" src={producto.images[0].imageUrl} alt="imageProductAdmin" /> 
      
      <Link to={'/editProduct/' + producto.id}><button className="botonEditar">🖋️</button></Link>
      <button onClick={()=>handleDelete(producto.id)} className="botonEliminar">❎</button>
  </div>
))

  const handleNextPage=()=>{
    setCurrentPage(currentPage+1) // Incrementa la pagina actual
  }

  const handlePreviousPage=()=>{
    setCurrentPage(currentPage-1)  //Decrementa la pagina actual
  }
  



 
    return (
        <div className='listaAdmin'>
          <h2 className="titleListProducts">Listado de Productos <span className='contadorProductos'>Cantidad : {state.productos.length}</span></h2>
          <div className='contenedorListaProductos'>
            {listProductsShow}

           
          </div>
           {/* Botones para navegar entre las páginas  */}

           <div className="botonesPaginadoListProductos">
              <button className='botonPaginadoAtras'onClick={handlePreviousPage} disabled={currentPage === 0}>Back</button>
              <button className='botonPaginadoAdelante'onClick={handleNextPage} disabled={endIndex >= state.productos.length}>Next</button>
            </div>
          
      </div>
      
    
      
  );
}

export default ListarProductAdmin