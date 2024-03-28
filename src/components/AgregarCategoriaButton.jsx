import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useContextGlobal } from './Util/global.context';
import { urlBackend } from '../App';

const AgregarCategoriaButton = () => {
    const { dispatch } = useContextGlobal();
    const [showForm, setShowForm] = useState(true);
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
            const response = await axios.post(`${urlBackend}categorias/add-categoria`, categoriaData);
            dispatch({ type: 'agregar_categoria', payload: response.data });
            setShowForm(false); // Cierra el pop-up después de agregar la categoría
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

    const handleCancel = () => {
        setShowForm(false); // Cierra el pop-up sin agregar la categoría
    };

    return (
        <div>
            {!showForm && <button onClick={() => showForm} className="btn btn-primary">Agregar Categoría</button>}
            {showForm && (
                <div className="popup">
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
                            <button type="submit" className="btn btn-primary mr-2">Agregar</button>
                            <button type="button" onClick={handleCancel} className="btn btn-secondary">Cancelar</button>
                        </div>
                    </form>
                </div>
            )}
        </div>
    );
};

export default AgregarCategoriaButton;







