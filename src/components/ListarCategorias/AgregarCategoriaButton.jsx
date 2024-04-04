import React, { useState } from 'react';
import axios, { toFormData } from 'axios';
import Swal from 'sweetalert2';
import { useContextGlobal } from '../../components/Util/global.context';
import { urlBackend } from '../../App';
import { Button } from 'react-bootstrap';
import styles from '../ListarProductos/listarProductos.module.css';

const AgregarCategoriaButton = ({ toggleFormAgregar }) => {
    const { dispatch } = useContextGlobal();
    const [categoriaData, setCategoriaData] = useState({
        title: '',
        description: '',
        image: { imageUrl: '' } // Inicializa el objeto de imagen con una URL vacía
    });

    const handleChange = (e) => {
        const { name, value } = e.target;

        // Si el campo modificado es imageUrl, actualiza solo esa propiedad del estado
        if (name === 'imageUrl') {
            setCategoriaData(prevData => ({
                ...prevData,
                image: { imageUrl: value }
            }));
        } else {
            // De lo contrario, actualiza normalmente el estado
            setCategoriaData(prevData => ({
                ...prevData,
                [name]: value
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Cuando entra al handle Submit");
        console.log(categoriaData);
        // Verifica si el título y la descripción están vacíos
        if (!categoriaData.title || !categoriaData.description) {
            Swal.fire({
                title: 'Error',
                text: 'Debe ingresar un título y una descripción',
                icon: 'error'
            });
            return; // Detiene el envío del formulario si el título o la descripción están vacíos
        }

        // Verifica si el campo imageUrl está vacío
        if (!categoriaData.image.imageUrl) {
            Swal.fire({
                title: 'Error',
                text: 'Debe proporcionar una URL de imagen',
                icon: 'error'
            });
            return; // Detiene el envío del formulario si el campo imageUrl está vacío
        }

        try {
            const response = await axios.post(urlBackend + "categorias/add-categoria", categoriaData);
            dispatch({ type: 'agregar_categoria', payload: response.data });
            toggleFormAgregar();
            
            Swal.fire({
                title: 'Categoría agregada',
                text: 'La categoría se ha agregado exitosamente',
                icon: 'success'
            });
        } catch (error) {
            console.error('Error al agregar la categoría:', error.message);
            Swal.fire({
                title: 'Error',
                text: 'Hubo un error al agregar la categoría',
                icon: 'error'
            });
        }
    };


    return (
        <div>
            <h2 className="mb-4">Nueva Categoría</h2>
            <form onSubmit={handleSubmit} className="d-flex flex-column align-items-center">
                <div className="form-group">
                    <input
                        type="text"
                        name="title"
                        placeholder="Título"
                        value={categoriaData.title}
                        onChange={handleChange}
                        className="form-control mb-2"
                    />
                </div>
                <div className="form-group">
                    <input
                        type="text"
                        name="description"
                        placeholder="Descripción"
                        value={categoriaData.description}
                        onChange={handleChange}
                        className="form-control mb-2"
                    />
                </div>
                <div className="form-group">
                    <input
                        type="text"
                        name="imageUrl"
                        placeholder="URL de la imagen"
                        value={categoriaData.image.imageUrl}
                        onChange={handleChange}
                        className="form-control mb-4"
                    />
                </div>
                <div className="d-flex justify-content-center">
                    <Button variant="danger" className={styles.botonEliminar} onClick={toggleFormAgregar}>Cancelar</Button>
                    <Button variant="primary" className={styles.botonEditar} onClick={handleSubmit} type="submit">Agregar</Button>
                </div>
            </form>
        </div>
    );
};

export default AgregarCategoriaButton;







