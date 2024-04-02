import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useContextGlobal } from '../Util/global.context';
import { Pagination, Button, Table } from 'react-bootstrap';
import EditarCaracteristicaButton from '../EditarCaracteristicasButton'
import AgregarCaracteristicaButton from '../AgregarCaracteristicasButtons'
import styles from '../ListarProductos/listarProductos.module.css';
import { urlBackend } from '../../App';

const ListarCaracteristicasAdmin = () => {
    const { state, dispatch } = useContextGlobal();
    const [currentPage, setCurrentPage] = useState(1);
    const [caracteristicasPerPage] = useState(5);
    const [showEditModal, setShowEditModal] = useState(false);
    const [editingCaracteristicaId, setEditingCaracteristicaId] = useState(null);
    const [showForm, setShowForm] = useState(false); // Estado para mostrar u ocultar el formulario

    const [showFormAgregar, setshowFormAgregar] = useState(false); // Estado para mostrar u ocultar el formulario cuando se aprieta boton agregar 
    const [showFormEditar, setshowFormEditar] = useState(false); // Estado para mostrar u ocultar el formulario cuando se aprieta boton agregar 

    // Endpoint para eliminar característica
    const endPointDeleteCaracteristica = `${urlBackend}characteristics/delete/`;

    const handleEdit = (caracteristicaId) => {
        setEditingCaracteristicaId(caracteristicaId);
        setshowFormEditar(true)
    };

    const toggleFormAgregar = () => {
        setshowFormAgregar(!showFormAgregar);
    };

    const toggleFormEditar = () => {
        setshowFormEditar(!showFormEditar);
    };


    const handleDelete = async (id) => {
        try {
            const result = await Swal.fire({
                title: "Desea eliminar la característica?",
                text: "La característica se eliminará de la base de datos del sistema",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#008000a9",
                cancelButtonColor: "#d33",
                confirmButtonText: "Eliminar!"
            });
            if (result.isConfirmed) {
                await axios.delete(endPointDeleteCaracteristica + id);
                dispatch({ type: 'delete_caracteristica', payload: id });
                Swal.fire({
                    title: "Eliminada!",
                    text: "La característica ha sido borrada.",
                    icon: "success",
                    confirmButtonColor: "#008000a9",
                });
            }
        } catch (error) {
            console.error('Error al eliminar la característica:', error.message);
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

    // Paginacion    
    let currentCaracteristicas = [];
    if (state.caracteristicas.length > 0) {
        const indexOfLastCaracteristica = currentPage * caracteristicasPerPage;
        const indexOfFirstCaracteristica = indexOfLastCaracteristica - caracteristicasPerPage;
        currentCaracteristicas = state.caracteristicas.slice(indexOfFirstCaracteristica, indexOfLastCaracteristica);
    }

    return (
        <div className={styles.contenedorTablaListados}>
            {showFormAgregar && ( // Mostrar el formulario si showFormAgregar es verdadero
                <AgregarCaracteristicaButton toggleFormAgregar={toggleFormAgregar} />
            )}
            {showFormEditar && (
                <EditarCaracteristicaButton
                    caracteristicaId={editingCaracteristicaId}
                    dispatch={dispatch}
                    toggleFormEditar={toggleFormEditar}
                />
            )}{(!showFormAgregar && !showFormEditar) && (
                <>
                    <h2 className={styles.tituloTablaListados}>Características</h2>
                    <Table striped hover variant="light" className={styles.tablaListados}>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Nombre</th>
                                <th>Descripción</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentCaracteristicas.map((caracteristica, index) => (
                                <tr key={index}>
                                    <td>{caracteristica.id}</td>
                                    <td>{caracteristica.name}</td>
                                    <td>{caracteristica.description}</td>
                                    <td>
                                        {/* <Button onClick={() =>
                                            handleEdit(caracteristica.id)}
                                            className="btn btn-primary">Editar
                                        </Button> */}
                                        <Button variant="primary" className={styles.botonEditar} onClick={() =>
                                            handleEdit(caracteristica.id)}>Editar</Button>
                                        <Button variant="danger" className={styles.botonEliminar} onClick={() =>
                                            handleDelete(caracteristica.id)}
                                        >Eliminar
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                    <Button onClick={toggleFormAgregar} className={styles.botonAgregar} >Agregar Característica</Button>
                    
                    {/* Componente para la paginación */}
                    <Pagination>
                        {Array.from({ length: Math.ceil(state.caracteristicas.length / caracteristicasPerPage) }).map((_, index) => (
                            <Pagination.Item key={index} onClick={() => setCurrentPage(index + 1)} active={index + 1 === currentPage}>
                                {index + 1}
                            </Pagination.Item>
                        ))}
                    </Pagination>
                </>
            )}
        </div>
    );
};

export default ListarCaracteristicasAdmin;
