import styles from './politicas.module.css';

const politicas= () =>{
    return(
        <div className={styles.contenedorPoliticas}>
             <div className={styles.politicasTitle}>
                <h1><b>Política de Uso - Vortex Games</b></h1>
            </div>    
       
            <div className={styles.politicas}>
                   
                <div className={styles.politica}>
                        <li>
                            <h2><b>Proceso de Alquiler:</b></h2>
                            <ul>
                            <li>Los clientes pueden alquilar juegos a través de nuestro sitio web.</li>
                            <li>El pago completo del alquiler se requiere al momento de la reserva.</li>
                            <li>Una vez realizado el alquiler, se enviará un código y el enlace del desarrollador para realizar la descarga con las instrucciones de instalación.</li>
                            <li>El código proporcionado tendrá la misma vigencia que el período de alquiler.</li>
                            </ul>
                        </li>
                </div>
                    
                <div className={styles.politica}>
                        <li>
                            <h2><b>Tarifas y Cargos Adicionales:</b></h2>
                            <ul>
                            <li>Las tarifas de alquiler están disponibles en nuestro sitio web y varían según el juego seleccionado y la duración del alquiler.</li>
                            <li>No se requiere un depósito de seguridad para los juegos en línea.</li>
                            <li>No se realizarán reembolsos en caso de incompatibilidad con la consola o equipo del usuario.</li>
                            </ul>
                        </li>
                </div>
                    
                <div className={styles.politica}>
                        <li>
                            <h2><b>Condiciones de Alquiler:</b></h2>
                            <ul>
                            <li>La duración mínima del alquiler es de 2 días.</li>
                            <li>Los juegos son para uso exclusivo del cliente que realizó el alquiler y no pueden ser compartidos ni redistribuidos.</li>
                            <li>Los clientes deben mantener una conexión a Internet adecuada para acceder y disfrutar de los juegos alquilados.</li>
                            <li>Los clientes deben cumplir con las políticas de uso y licencia de cada juego alquilado y abstenerse de realizar actividades ilegales o no éticas relacionadas con los mismos.</li>
                            </ul>
                        </li>
                    </div>
                
                <div className={styles.politica}>
                    <li>
                            <h2><b>Política de Cancelación:</b></h2>
                            <ul>
                            <li>Una vez realizada la reserva, no se podrán realizar devoluciones debido a que el código de acceso ya ha sido compartido.</li>
                            </ul>
                    </li>
                    <li>
                            <h2><b>Revisión y Actualización:</b></h2>
                            <ul>
                            <li>Esta política de uso se revisará periódicamente y se actualizará según sea necesario para reflejar los cambios en nuestros servicios y prácticas comerciales.</li>
                            </ul>
                    </li>

                </div>
                
                    
           </div> 
           

        

        </div>
        

    )
}

export default politicas