import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useContextGlobal } from './Util/global.context';
import { Pagination, Button } from 'react-bootstrap';
import EditarCaracteristicaButton from './EditarCaracteristicasButton'

const ListarCaracteristicasAdmin = () => {
    const { state, dispatch } = useContextGlobal();
    const [currentPage, setCurrentPage] = useState(1);
    const [caracteristicasPerPage] = useState(5);
    const [showEditModal, setShowEditModal] = useState(false);
    const [editingCaracteristicaId, setEditingCaracteristicaId] = useState(null);

    // Endpoint para eliminar característica
    const endPointDeleteCaracteristica = `http://localhost:8080/characteristics/delete/`;

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

    // Logica para la paginacion    
    let currentCaracteristicas = [];
    if (state.caracteristicas.length > 0) {
        const indexOfLastCaracteristica = currentPage * caracteristicasPerPage;
        const indexOfFirstCaracteristica = indexOfLastCaracteristica - caracteristicasPerPage;
        currentCaracteristicas = state.caracteristicas.slice(indexOfFirstCaracteristica, indexOfLastCaracteristica);
    }

    const handleEdit = (caracteristicaId) => {
        setEditingCaracteristicaId(caracteristicaId);
        setShowEditModal(true);
    };

    const handleCloseEditModal = () => {
        setShowEditModal(false);
        setEditingCaracteristicaId(null);
    };

    return (
        <div className='contenedorListaProductos'>            
            <h2 className='tituloCaracteristicasAdmin'>{state.caracteristicas.length} Características</h2>
            {currentCaracteristicas.length > 0 ? (
                currentCaracteristicas.map((caracteristica, index) => (
                    <div key={index} className="contenedorProductosAdmin">
                        <p className='listId'>ID: {caracteristica.id}</p>
                        <p className='listName'>Nombre: <br />{caracteristica.name}</p>
                        <p className='listName'>Descripción: <br />{caracteristica.description}</p>
                        <button onClick={() => handleEdit(caracteristica.id)} className="botonEditar">🖋️</button>
                        <button onClick={() => handleDelete(caracteristica.id)} className="botonEliminar" >❎</button>
                    </div>
                ))
            ) : (
                <p>No tiene características cargadas en el sistema</p>
            )}
            {state.caracteristicas.length > 0 && (
                <Pagination>
                    {Array.from({ length: Math.ceil(state.caracteristicas.length / caracteristicasPerPage) }).map((_, index) => (
                        <Pagination.Item key={index} onClick={() => setCurrentPage(index + 1)} active={index + 1 === currentPage}>
                            {index + 1}
                        </Pagination.Item>
                    ))}
                </Pagination>
            )}

            
<EditarCaracteristicaButton
                caracteristicaId={editingCaracteristicaId}
                show={showEditModal}
                handleClose={handleCloseEditModal}
            />
                
        </div>
    );
};

export default ListarCaracteristicasAdmin;
