import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button } from 'react-bootstrap';
import Swal from 'sweetalert2';
import { useContextGlobal } from '../../components/Util/global.context';
import { urlBackend } from '../../App';
import styles from '../ListarProductos/listarProductos.module.css';

const EditarCaracteristicaButton = ({ caracteristicaId, toggleFormEditar }) => {
    const { dispatch } = useContextGlobal();
    const [caracteristicaData, setCaracteristicaData] = useState({
        id: null,
        name: '',
        description: ''
    });

    useEffect(() => {
        const fetchCaracteristica = async () => {
            try {
                console.log(caracteristicaId)
                const response = await axios.get(`${urlBackend}characteristics/search-id/${caracteristicaId}`);
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

    const handleEditSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put('http://localhost:8080/characteristics/update', caracteristicaData);
            dispatch({ type: 'update_caracteristica', payload: caracteristicaData });
            toggleFormEditar();
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
        <div>
            <h2>Editar Característica</h2>
            <form onSubmit={handleEditSubmit}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Nombre</label>
                    <input type="text" className="form-control" id="name" name="name" value={caracteristicaData.name} onChange={handleEditChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Descripción</label>
                    <input type="text" className="form-control" id="description" name="description" value={caracteristicaData.description} onChange={handleEditChange} />
                </div>
                <Button variant="danger" className={styles.botonEliminar}onClick={toggleFormEditar}>Cancelar</Button>
                <Button variant="primary" className={styles.botonEditar} type="submit">Actualizar</Button>
            </form>
        </div>
    );
};

export default EditarCaracteristicaButton;
