import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useContextGlobal } from '../components/util/global.context'
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import styles from '../styles/ProducDetail.module.css';

const ProductDetail = () => {
    const [showCalendar, setShowCalendar] = useState(false); // Estado para controlar la visibilidad del calendario
    const [startDate, setStartDate] = useState(null); // Estado para almacenar la fecha de inicio del intervalo
    const [endDate, setEndDate] = useState(null); // Estado para almacenar la fecha de fin del intervalo

    const params = useParams()

    const { state, dispatch } = useContextGlobal()

    const endPointDetail = `http://localhost:8080/products/search-id/${params.id}`

    console.log(params)

    useEffect(() => {
        axios(endPointDetail)
            .then(res => dispatch({ type: 'get_producto', payload: res.data }))
            .catch(error => console.error("Error fetching product details:", error));
    }, [endPointDetail, dispatch]);

    console.log(state.producto)

    const handleDateChange = (date) => {
        if (!startDate) {
            setStartDate(date);
        } else if (!endDate) {
            setEndDate(date);
        } else {
            // Reiniciar la selección si ambas fechas ya han sido seleccionadas
            setStartDate(null);
            setEndDate(null);
        }
    };

    const calculateDays = () => {
        if (startDate && endDate) {
            const difference = Math.abs(endDate - startDate);
            const days = Math.ceil(difference / (1000 * 60 * 60 * 24));
            return days;
        }
        return 0;
    };

    return (
        <div className={styles.contenedorDetail}>
            <h1 className={styles.title}> {state.producto?.name} </h1>
            <div className={styles.container}>
                <div className={styles.imgContenedorPrincipal}>
                    {state.producto && state.producto.images && state.producto.images.length > 0 && (
                        <img className={styles.imgPrincipal} src={state.producto.images[0].imageUrl} alt="imagen1" />)}
                    <div className={styles.imgContenedorSecundario}>
                        {state.producto && state.producto.images && state.producto.images.length > 0 && (
                            <img className={styles.imgSecundarias} src={state.producto.images[1].imageUrl} alt="imagen2" />
                        )}
                        {state.producto && state.producto.images && state.producto.images.length > 0 && (
                            <img className={styles.imgSecundarias} src={state.producto.images[2].imageUrl} alt="imagen3" />
                        )}
                        {state.producto && state.producto.images && state.producto.images.length > 0 && (
                            <img className={styles.imgSecundarias} src={state.producto.images[3].imageUrl} alt="imagen4" />
                        )}
                        {state.producto && state.producto.images && state.producto.images.length > 0 && (
                            <img className={styles.imgSecundarias} src={state.producto.images[4].imageUrl} alt="imagen5" />)}
                    </div>
                </div>
                <div className={styles.info}>
                <h3 className="categoriaProducto">Categoria:<span>{state.producto.category}</span></h3>
                    <h3>Descripcion:</h3>
                    <p>{state.producto.description}</p>
                    <h3>Precio: US${state.producto.price}</h3>
                    {showCalendar && (
                        <div className={styles.datePickerContainer}>
                            <label>Fecha de inicio:</label>
                            <DatePicker selected={startDate} onChange={handleDateChange} />

                            <label>Fecha de fin:</label>
                            <DatePicker selected={endDate} onChange={handleDateChange} />
                        </div>
                    )}
                    <button className={styles.btnAlquiler} onClick={() => setShowCalendar(true)}>Alquilar</button>
                    {(startDate && endDate) && (
                        <p className={styles.days}>Cantidad de días: {calculateDays()}</p>
                    )}
                </div>
            </div>
        </div>
    )
}

export default ProductDetail;



