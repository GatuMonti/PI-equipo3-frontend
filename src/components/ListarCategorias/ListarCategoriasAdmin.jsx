import React, { useState } from 'react';
import { useContextGlobal } from '../Util/global.context';
import axios from 'axios';
import Swal from 'sweetalert2';
import { Pagination, Button, Table } from 'react-bootstrap';
import AgregarCategoriaButton from './AgregarCategoriaButton'
import EditarCategoriaButton from './EditarCategoriaButton';
import styles from '../ListarProductos/listarProductos.module.css';
import { urlBackend } from '../../App';

const ListarCategoriasAdmin = () => {
    const { state, dispatch } = useContextGlobal();
    const [currentPage, setCurrentPage] = useState(1);
    const [categoriasPerPage] = useState(5);
    const [editingCategoriaId, setEditingCategoriaId] = useState(null);
    const [showFormAgregar, setshowFormAgregar] = useState(false); // Estado para mostrar u ocultar el formulario cuando se aprieta boton agregar 
    const [showFormEditar, setshowFormEditar] = useState(false); // Estado para mostrar u ocultar el formulario cuando se aprieta boton agregar 

    // Función para mostrar u ocultar el formulario de agregar característica
    const toggleFormAgregar = () => {
        setshowFormAgregar(!showFormAgregar);
        console.log("Form de Agregar es: " + showFormAgregar)
    };

    const toggleFormEditar = () => {
        setshowFormEditar(!showFormEditar);
        console.log("Form de Editar es: " + showFormEditar)
    };

    //Paginacion
    const indexOfLastCategoria = currentPage * categoriasPerPage;
    const indexOfFirstCategoria = indexOfLastCategoria - categoriasPerPage;
    const currentCategorias = state.categorias.slice(indexOfFirstCategoria, indexOfLastCategoria);
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const handleEdit = (categoriaId) => {
        setEditingCategoriaId(categoriaId);
        setshowFormEditar(true)
        console.log("Form de Editar dentro del Handle Edit es: " + showFormEditar)
    };


    // Logica para eliminar categoria
    const endPointDeleteCategoria = `${urlBackend}categorias/delete-category/`;

    const handleDelete = async (id) => {
        try {
            // Buscar la categoría por nombre y no discriminar entre mayúsculas y minúsculas
            const categoria = state.categorias.find(cat => cat.id === id);
            if (categoria && categoria.title.toLowerCase() === 'sin categoria') {
                Swal.fire({
                    title: "Error",
                    text: "Esta categoría es del sistema y no se puede eliminar.",
                    icon: "error",
                    confirmButtonColor: "#ff00008f",
                    customClass: {
                        popup: 'textFallaServer'
                    }
                });
                return;
            }

            const result = await Swal.fire({
                title: "Desea eliminar la categoria?",
                text: "la categoria se eliminara de la base de datos del sistema",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#008000a9",
                cancelButtonColor: "#d33",
                confirmButtonText: "Eliminar!"
            });
            if (result.isConfirmed) {
                await axios.delete(endPointDeleteCategoria + id);
                dispatch({ type: 'delete_categoria', payload: id });
                Swal.fire({
                    title: "Eliminado!",
                    text: "El producto ha sido borrado.",
                    icon: "success",
                    confirmButtonColor: "#008000a9",
                });
            }
        } catch (error) {
            console.error('Error al eliminar la categoria:', error.message);
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



    return (
        <div className={styles.contenedorTablaListados}>

            {showFormAgregar && ( // Mostrar el formulario si showFormAgregar es verdadero
                <AgregarCategoriaButton toggleFormAgregar={toggleFormAgregar} />
            )}
            {showFormEditar && (
                <EditarCategoriaButton
                    categoriaId={editingCategoriaId}
                    dispatch={dispatch}
                    toggleFormEditar={toggleFormEditar}
                />
            )} {(!showFormAgregar && !showFormEditar) && (
                <>
                    <h2 className={styles.tituloTablaListados}> Categorías</h2>
                    <Table striped hover variant="light" className={styles.tablaListados}>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Título</th>
                                <th>Descripción</th>
                                <th>Imagen</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentCategorias.map((categoria, index) => (
                                <tr key={index}>
                                    <td>{categoria.id}</td>
                                    <td>{categoria.title}</td>
                                    <td>{categoria.description}</td>
                                    <td><img className={styles.imageTableListAdmin} src={categoria.image.imageUrl} alt="imageProductAdmin" /></td>
                                    <td>
                                        <Button variant="primary" className={styles.botonEditar} onClick={() =>
                                            handleEdit(categoria.id)}>Editar</Button>
                                        <Button variant="danger" className={styles.botonEliminar} onClick={() =>
                                            handleDelete(categoria.id)}>Eliminar</Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>

                    </Table>
                    <Button onClick={toggleFormAgregar} className={styles.botonAgregar} >Agregar Categoría</Button>
                    
                    {/* Componente para la paginación */}
                    <Pagination>
                        {Array.from({ length: Math.ceil(state.categorias.length / categoriasPerPage) }).map((_, index) => (
                            <Pagination.Item key={index} onClick={() => paginate(index + 1)} active={index + 1 === currentPage}>
                                {index + 1}
                            </Pagination.Item>
                        ))}
                    </Pagination>
                </>
            )}
        </div>
    );
};

export default ListarCategoriasAdmin;



