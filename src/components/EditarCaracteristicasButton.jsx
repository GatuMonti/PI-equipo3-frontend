import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Modal, Button } from 'react-bootstrap';
import Swal from 'sweetalert2';
import { useContextGlobal } from './Util/global.context';

const EditarCaracteristicaButton = ({ caracteristicaId, show, handleClose, toggleFormEditar }) => {
    const { dispatch } = useContextGlobal();
    const [caracteristicaData, setCaracteristicaData] = useState({
        id: null,
        name: '',
        description: ''
    });

    useEffect(() => {
        const fetchCaracteristica = async () => {
            try {
                console.log("ESte es el id " + caracteristicaId)
                const response = await axios.get(`http://localhost:8080/characteristics/search-id/${caracteristicaId}`);
                console.log(response.data)
                setCaracteristicaData(response.data);
            } catch (error) {
                console.error('Error al cargar la característica:', error.message);
            }
        };
        if (caracteristicaId !== null) {
            fetchCaracteristica();
        }
    }, [caracteristicaId]);

    const handleEditChange = (e) => {
        const { name, value } = e.target;
        setCaracteristicaData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleCancel = () => {
        // setShowForm(false); // Cierra el pop-up sin agregar la categoría
        toggleFormEditar(false)
    };

    const handleEditSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put('http://localhost:8080/characteristics/update', caracteristicaData);
            dispatch({ type: 'update_caracteristica', payload: caracteristicaData });
            // handleClose();
            toggleFormEditar(false);
            Swal.fire({
                title: 'Característica actualizada',
                text: 'Los datos de la característica se han actualizado exitosamente',
                icon: 'success'
            });
        } catch (error) {
            console.error('Error al actualizar la característica:', error.message);
            Swal.fire({
                title: 'Error',
                text: 'Hubo un error al actualizar la característica',
                icon: 'error'
            });
        }
    };

    return (
        // <Modal show={show} onHide={handleClose}>
        //     <Modal.Header closeButton>
        //         <Modal.Title>Editar Característica</Modal.Title>
        //     </Modal.Header>
        //     <Modal.Body>
                <form onSubmit={handleEditSubmit}>
                    <h2>Editar Característica</h2>
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label">Nombre</label>
                        <input type="text" className="form-control" id="name" name="name" value={caracteristicaData.name} onChange={handleEditChange} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="description" className="form-label">Descripción</label>
                        <input type="text" className="form-control" id="description" name="description" value={caracteristicaData.description} onChange={handleEditChange} />
                    </div>
                    <Button variant="secondary" onClick={handleCancel}>Cancelar</Button>
                    <Button variant="primary" type="submit">Actualizar</Button>
                </form>
        //     </Modal.Body>
        // </Modal>
    );
};

export default EditarCaracteristicaButton;
