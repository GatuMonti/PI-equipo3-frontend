import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import styles from '../styles/ProducDetail.module.css';

const ProductDetail = () => {
    const [showCalendar, setShowCalendar] = useState(false); // Estado para controlar la visibilidad del calendario
    const [startDate, setStartDate] = useState(null); // Estado para almacenar la fecha de inicio del intervalo
    const [endDate, setEndDate] = useState(null); // Estado para almacenar la fecha de fin del intervalo

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

    return(
        <>
        <h1 className={styles.title}> Zelda Breath Of The Wild </h1>
        <div className={styles.container}>            
            <div className={styles.imgContenedorPrincipal}>
                <img className={styles.imgPrincipal} src="https://uvejuegos.com/img/caratulas/44926/zelda.jpg" alt="Portada1 del juego"/>
                <div className={styles.imgContenedorSecundario}>
                    <img  className={styles.imgSecundarias}  src="https://i.pinimg.com/564x/c2/6c/44/c26c4445aad832c4ef942bc72c81e70d.jpg" alt="Portada2 del juego"/>
                    <img  className={styles.imgSecundarias}  src="https://fs-prod-cdn.nintendo-europe.com/media/images/08_content_images/games_6/nintendo_switch_7/nswitch_thelegendofzeldabreathofthewild/NSwitch_TheLegendOfZeldaBreathOfTheWild_wp_tablet_02.jpg" alt="Portada3 del juego"/>
                    <img  className={styles.imgSecundarias}  src="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/9ed93666-1ea8-4260-8d68-b4e89431fe18/davqvat-c6ed73ff-aa0f-4a0e-8382-2c16a6c76505.jpg/v1/fill/w_1600,h_1600,q_75,strp/nuestra_nueva_princesa__zelda_breath_of_the_wild_by_luismiguel_art_davqvat-fullview.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9MTYwMCIsInBhdGgiOiJcL2ZcLzllZDkzNjY2LTFlYTgtNDI2MC04ZDY4LWI0ZTg5NDMxZmUxOFwvZGF2cXZhdC1jNmVkNzNmZi1hYTBmLTRhMGUtODM4Mi0yYzE2YTZjNzY1MDUuanBnIiwid2lkdGgiOiI8PTE2MDAifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6aW1hZ2Uub3BlcmF0aW9ucyJdfQ.7hMr36vklXM72RUxOygNNp-q2Mu5ahN9BnBVbqyy5No" alt="Portada4 del juego"/>
                    <img  className={styles.imgSecundarias}  src="https://www.lavanguardia.com/files/og_thumbnail/uploads/2018/08/07/5fa43d074b862.jpeg" alt="Portada5 del juego"/>
                </div>
            </div>
            <div className={styles.info}>
                <h3>Descripcion:</h3>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                    Eaque vero tenetur ducimus rerum iure sunt saepe blanditiis explicabo, est, 
                    ut tempora harum necessitatibus magnam, aliquid nesciunt dicta reiciendis perferendis a!
                </p>
                <h3>Precio: US$15</h3>
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
        </>
    )
}

export default ProductDetail;



