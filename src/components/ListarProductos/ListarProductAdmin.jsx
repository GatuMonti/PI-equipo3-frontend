import React, { useEffect, useState } from 'react';
import { useContextGlobal } from '../Util/global.context';
import axios from 'axios';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';
import { Pagination, Table } from 'react-bootstrap';
import styles from './listarProductos.module.css';

function ListarProductAdmin() {
  const { state, dispatch } = useContextGlobal();
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 8;
  const endPointDeleteProduct = `http://localhost:8080/products/delete-product/`;

  useEffect(() => {
    // Aquí puedes poner lógica de carga inicial si es necesaria
  }, []);

  const handleDelete = async (id) => {
    try {
      const result = await Swal.fire({
        title: "Desea eliminar el producto?",
        text: "El producto se eliminará de la base de datos del sistema",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#008000a9",
        cancelButtonColor: "#d33",
        confirmButtonText: "Eliminar!"
      });

      if (result.isConfirmed) {
        await axios.delete(endPointDeleteProduct + id);
        dispatch({ type: 'delete_product', payload: id });
        Swal.fire({
          title: "Eliminado!",
          text: "El producto ha sido borrado.",
          icon: "success",
          confirmButtonColor: "#008000a9",
        });
      }
    } catch (error) {
      console.error('Error al eliminar el producto:', error.message);
      Swal.fire({
        title: "Error!",
        text: error.message,
        icon: "error",
        confirmButtonColor: "#ff00008f",
        customClass: {
          popup: 'textFallaServer'
        }
      });
    }
  };
  const sortedProducts = [...state.productos].sort((a, b) => a.id - b.id);
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = state.productos.slice(indexOfFirstProduct, indexOfLastProduct);

  return (
    <div className={styles.contenedorTablaListados}>
      <h2 className={styles.tituloTablaListados}>Listado de Productos </h2>
        <Table striped hover variant="light" className={styles.tablaListados}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Categoría</th>
              <th>Tipo</th>
              <th>Imagen</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {currentProducts.map((producto, index) => (
              <tr key={index}>
                <td>{producto.id}</td>
                <td>{producto.name}</td>
                <td>{producto.category ? producto.category.title : 'Sin categoría'}</td>
                <td>{producto.type}</td>
                <td><img className={styles.imageTableListAdmin} src={producto.images[0].imageUrl} alt="imageProductAdmin" /></td>
                <td>
                  <Link to={'/editProduct/' + producto.id}><button className={styles.botonEditar}>🖋️</button></Link>
                  <button onClick={() => handleDelete(producto.id)} className={styles.botonEliminar}>❎</button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        <p className={styles.contadorItemsTabla}>Total de productos : {state.productos.length}</p>
        <div className={styles.contenedorPaginado}>
          {state.productos.length > productsPerPage && (
            <Pagination>
              {Array.from({ length: Math.ceil(state.productos.length / productsPerPage) }).map((_, index) => (
                <Pagination.Item
                  key={index}
                  onClick={() => setCurrentPage(index + 1)}
                  active={index + 1 === currentPage}
                >
                  {index + 1}
                </Pagination.Item>
              ))}
            </Pagination>
          )}
        </div>
      </div>
  );
}

export default ListarProductAdmin;