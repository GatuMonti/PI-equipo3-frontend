import React from 'react'

const Politica = () => {
    return(
        <div className='politicasApp'>
           
             <div className="politicasTitle">
                <h1><b>Política de Uso - Vortex Games</b></h1>
            </div>    
       
            <div className='politicas'>
                   
                <div className="politica">
                       
                            <h2 className='tituloPolitica'>Proceso de Alquiler:</h2>
                            <p className='parrafo'>Los clientes pueden alquilar juegos a través de nuestro sitio web.</p>
                            <p className='parrafo'>El pago completo del alquiler se requiere al momento de la reserva.</p>
                            <p className='parrafo'>Una vez realizado el alquiler, se enviará un código y el enlace del desarrollador para realizar la descarga con las instrucciones de instalación.</p>
                            <p className='parrafo'>El código proporcionado tendrá la misma vigencia que el período de alquiler.</p>
                           
                       
                </div>
                    
                <div className="politica">
                            <h2 className='tituloPolitica'>Tarifas y Cargos Adicionales:</h2>
                            <p className='parrafo'>Las tarifas de alquiler están disponibles en nuestro sitio web y varían según el juego seleccionado y la duración del alquiler.</p>
                            <p className='parrafo'>No se requiere un depósito de seguridad para los juegos en línea.</p>
                            <p className='parrafo'>No se realizarán reembolsos en caso de incompatibilidad con la consola o equipo del usuario.</p>
                </div>
                    
                <div className="politica">
                            <h2 className='tituloPolitica'>Condiciones de Alquiler:</h2>
                            <p className='parrafo'>La duración mínima del alquiler es de 2 días.</p>
                            <p className='parrafo'>Los juegos son para uso exclusivo del cliente que realizó el alquiler y no pueden ser compartidos ni redistribuidos.</p>
                            <p className='parrafo'>Los clientes deben mantener una conexión a Internet adecuada para acceder y disfrutar de los juegos alquilados.</p>
                            <p className='parrafo'>Los clientes deben cumplir con las políticas de uso y licencia de cada juego alquilado y abstenerse de realizar actividades ilegales o no éticas relacionadas con los mismos.</p>
                </div>
                
                <div className="politica">
                            <h2 className='tituloPolitica'>Política de Cancelación:</h2>
                            <p className='parrafo'>Una vez realizada la reserva, no se podrán realizar devoluciones debido a que el código de acceso ya ha sido compartido.</p>
                            <h2 className='tituloPolitica'>Revisión y Actualización:</h2>
                            <p className='parrafo'>Esta política de uso se revisará periódicamente y se actualizará según sea necesario para reflejar los cambios en nuestros servicios y prácticas comerciales.</p>

                </div>
                
                    
           </div> 
           

        

        </div>
        

    )
}

export default Politica