import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Modal, Button } from 'react-bootstrap';
import Swal from 'sweetalert2';

const EditarCategoriaButton = ({ categoriaId, show, handleClose, dispatch, toggleFormEditar }) => {
    const [categoriaData, setCategoriaData] = useState({
        id: null,
        title: '',
        description: '',
        image: { id: '', imageUrl: '' }
    });

    useEffect(() => {
        const fetchCategoria = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/categorias/search-categoryById/${categoriaId}`);
                let data = response.data;
                // Verifica si la categoría no tiene imagen asignada y la establece como "Sin Imagen"
                if (!data.image || !data.image.imageUrl) {
                    data = {
                        ...data,
                        image: { id: '', imageUrl: 'Sin Imagen' }
                    };
                }
                setCategoriaData(data);
            } catch (error) {
                console.error('Error al cargar la categoría:', error.message);
            }
        };
        if (categoriaId !== null) {
            fetchCategoria();
        }
    }, [categoriaId]);

    const handleCancel = () => {
        // setShowForm(false); // Cierra el pop-up sin agregar la categoría
        toggleFormEditar(false)
    };

    const handleEditChange = (e) => {
        const { name, value } = e.target;
        // Verifica si el campo a actualizar está anidado (por ejemplo, image.imageUrl)
        const isNestedField = name.includes('.');

        // Si el campo a actualizar es anidado, actualiza el estado de manera diferente
        if (isNestedField) {
            const [fieldName, nestedFieldName] = name.split('.');
            setCategoriaData(prevData => ({
                ...prevData,
                [fieldName]: {
                    ...prevData[fieldName],
                    [nestedFieldName]: value
                }
            }));
        } else {
            setCategoriaData(prevData => ({
                ...prevData,
                [name]: value
            }));
        }
    };

    const handleEditSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put('http://localhost:8080/categorias/update-category', categoriaData);
            dispatch({ type: 'update_categoria', payload: categoriaData });
            // handleClose();
            toggleFormEditar(false);
            Swal.fire({
                title: 'Categoría actualizada',
                text: 'Los datos de la categoría se han actualizado exitosamente',
                icon: 'success'
            });
        } catch (error) {
            console.error('Error al actualizar la categoría:', error.message);
            Swal.fire({
                title: 'Error',
                text: 'Hubo un error al actualizar la categoría',
                icon: 'error'
            });
        }
    };

    return (
        // <Modal show={show} onHide={handleClose}>
        //     <Modal.Header closeButton>
        //         <Modal.Title>Editar Categoría</Modal.Title>
        //     </Modal.Header>
        //     <Modal.Body>

        <form onSubmit={handleEditSubmit}>
            <h2>Editar Categoria</h2>
            <div className="mb-3">
                <label htmlFor="title" className="form-label">Título</label>
                <input type="text" className="form-control" id="title" name="title" value={categoriaData.title} onChange={handleEditChange} />
            </div>
            <div className="mb-3">
                <label htmlFor="description" className="form-label">Descripción</label>
                <input type="text" className="form-control" id="description" name="description" value={categoriaData.description} onChange={handleEditChange} />
            </div>
            <div className="mb-3">
                <label htmlFor="imageUrl" className="form-label">URL de la Imagen</label>
                <input type="text" className="form-control" id="imageUrl" name="image.imageUrl" value={categoriaData.image.imageUrl} onChange={handleEditChange} />
            </div>
            <Button variant="secondary" onClick={handleCancel}>Cancelar</Button>
            <Button variant="primary" type="submit">Actualizar</Button>
        </form>
        //     </Modal.Body>
        // </Modal>
    );
};

export default EditarCategoriaButton;



