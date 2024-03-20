import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useContextGlobal } from '../Util/global.context';
import { Pagination, Button, Table } from 'react-bootstrap';
import EditarCaracteristicaButton from '../EditarCaracteristicasButton'
import AgregarCaracteristicaButton from '../AgregarCaracteristicasButtons'
import styles from '../ListarProductos/listarProductos.module.css';

const ListarCaracteristicasAdmin = () => {
    const { state, dispatch } = useContextGlobal();
    const [currentPage, setCurrentPage] = useState(1);
    const [caracteristicasPerPage] = useState(5);
    const [showEditModal, setShowEditModal] = useState(false);
    const [editingCaracteristicaId, setEditingCaracteristicaId] = useState(null);
    const [showForm, setShowForm] = useState(false); // Estado para mostrar u ocultar el formulario

    // Endpoint para eliminar característica
    const endPointDeleteCaracteristica = `http://localhost:8080/characteristics/delete/`;

    const handleEdit = (caracteristicaId) => {
        setEditingCaracteristicaId(caracteristicaId);
        setShowEditModal(true);
    };

    const handleCloseEditModal = () => {
        setShowEditModal(false);
        setEditingCaracteristicaId(null);
    };

    // Función para mostrar u ocultar el formulario de agregar característica
    const toggleForm = () => {
        setShowForm(!showForm);
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
            <h2 className={styles.tituloTablaListados}>Características</h2>

            {showForm ? ( // Mostrar el formulario si showForm es verdadero
                <AgregarCaracteristicaButton toggleForm={toggleForm} />
            ) : (
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
                                    <button onClick={() => handleEdit(caracteristica.id)} className="btn btn-primary">Editar</button>
                                    <button onClick={() => handleDelete(caracteristica.id)} className="btn btn-danger">Eliminar</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            )}

            {!showForm && ( // Mostrar el botón de agregar característica si showForm es falso
                <Button onClick={toggleForm} className="btn btn-primary">Agregar Característica</Button>
            )}

            {/* Componente para editar característica */}
            <EditarCaracteristicaButton
                caracteristicaId={editingCaracteristicaId}
                show={showEditModal}
                handleClose={handleCloseEditModal}
            />

            {/* Componente para la paginación */}
            <Pagination>
                {Array.from({ length: Math.ceil(state.caracteristicas.length / caracteristicasPerPage) }).map((_, index) => (
                    <Pagination.Item key={index} onClick={() => setCurrentPage(index + 1)} active={index + 1 === currentPage}>
                        {index + 1}
                    </Pagination.Item>
                ))}
            </Pagination>
            
        </div>
    );
};

export default ListarCaracteristicasAdmin;
