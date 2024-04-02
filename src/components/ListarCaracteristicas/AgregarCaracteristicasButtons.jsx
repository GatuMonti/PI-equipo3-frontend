import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useContextGlobal } from '../../components/Util/global.context';
import { urlBackend } from '../../App';
import { Button } from 'react-bootstrap';
import styles from '../ListarProductos/listarProductos.module.css';


const AgregarCaracteristicaButton = ({ toggleFormAgregar }) => {
    const { dispatch } = useContextGlobal();
    const [caracteristicaData, setCaracteristicaData] = useState({
        name: '',
        description: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCaracteristicaData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Verifica si el nombre y la descripción están vacíos
        if (!caracteristicaData.name || !caracteristicaData.description) {
            Swal.fire({
                title: 'Error',
                text: 'Debe ingresar un nombre y una descripción',
                icon: 'error'
            });
            return; // Detiene el envío del formulario si el nombre o la descripción están vacíos
        }

        try {
            const response = await axios.post(`${urlBackend}characteristics/add-characteristic`, caracteristicaData);
            const newResponse = await axios.get(`${urlBackend}characteristics/search-name/` + caracteristicaData.name);
            dispatch({ type: 'agregar_caracteristica', payload: newResponse.data });
            toggleFormAgregar();
            Swal.fire({
                title: 'Característica agregada',
                text: 'La característica se ha agregado exitosamente',
                icon: 'success'
            });
        } catch (error) {
            console.error('Error al agregar la característica:', error.message);
            Swal.fire({
                title: 'Error',
                text: 'Hubo un error al agregar la característica',
                icon: 'error'
            });
        }
    };

    return (
        <div>
            <h2 className="mb-4">Nueva Característica</h2>
            <form onSubmit={handleSubmit} className="d-flex flex-column align-items-center">
                <div className="form-group">
                    <input
                        type="text"
                        name="name"
                        placeholder="Nombre"
                        value={caracteristicaData.name}
                        onChange={handleChange}
                        className="form-control mb-2"
                    />
                </div>
                <div className="form-group">
                    <input
                        type="text"
                        name="description"
                        placeholder="Descripción"
                        value={caracteristicaData.description}
                        onChange={handleChange}
                        className="form-control mb-4"
                    />
                </div>
                <div className="d-flex justify-content-center">
                <Button variant="danger" className={styles.botonEliminar} onClick={toggleFormAgregar}>Cancelar</Button>
                <Button variant="primary" className={styles.botonEditar} type="submit" >Agregar</Button>

                </div>
            </form>
        </div>
    );
};

export default AgregarCaracteristicaButton;

