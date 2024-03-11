import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useContextGlobal } from './Util/global.context';

const AgregarCaracteristicaButton = () => {

    const {state}=useContextGlobal()

    const { dispatch } = useContextGlobal();
    const [showForm, setShowForm] = useState(false);
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
            const response = await axios.post('http://localhost:8080/characteristics/add-characteristic', caracteristicaData);
            const newResponse = await axios.get('http://localhost:8080/characteristics/search-name/'+caracteristicaData.name);
            dispatch({ type: 'agregar_caracteristica', payload: newResponse.data });
            setShowForm(false); // Cierra el pop-up después de agregar la característica
            Swal.fire({
                title: 'Característica agregada',
                text: 'La característica se ha agregado exitosamente',
                icon: 'success'
            });
            setCaracteristicaData({
                name: '',
                description: ''
            })
        } catch (error) {
            console.error('Error al agregar la característica:', error.message);
            {state.caracteristicas.map((caract)=>{
                if(caract.name===caracteristicaData.name){
                    Swal.fire({
                        title: 'Error',
                        text: 'La caracteristica ya existe',
                        icon: 'error'
                    });
                }
            })}
        }
    };

    const handleCancel = () => {
        setShowForm(false); // Cierra el pop-up sin agregar la característica
    };

    return (
        <div>
            {!showForm && <button onClick={() => setShowForm(true)} className="btn btn-primary">Agregar Característica</button>}
            {showForm && (
                <div className="popup">
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
                            <button type="submit" className="btn btn-primary mr-2">Agregar</button>
                            <button type="button" onClick={handleCancel} className="btn btn-secondary">Cancelar</button>
                        </div>
                    </form>
                </div>
            )}
        </div>
    );
};

export default AgregarCaracteristicaButton;

