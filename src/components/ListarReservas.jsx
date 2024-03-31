import axios from 'axios'
import React, { useState,useEffect } from 'react'


const ListarReservas = () => {

    const[reservas,setReservas]=useState([])
    const[reservasPorUsuario,setReservasPorUsuario]=useState([])

    //UseEffect para traer todos las reservas
    useEffect(() => {

        // Función para obtener la lista de reservas
        const busqueda = async () => {
          try {
           
            const respuesta=await axios.get('http://localhost:8080/booking/list-bookings')
                if(respuesta.status===200){
                    setReservas(respuesta.data)
                    console.log(respuesta.data)    
                }
           
          } catch (error) {
            console.error('Error al obtener la lista de usuarios:', error);
          }
        };
    
        // Llamar a la función para obtener la lista de reservas al cargar el componente
        busqueda();
      }, []);

      useEffect(() => {
        const reservasUsuario = reservas.filter(reserva => reserva.userName === localStorage.getItem("username"));
        setReservasPorUsuario(reservasUsuario);
    }, [reservas]);

    console.log(reservas)
    console.log(reservasPorUsuario)

    

    return (
      <div className="pageListarReservas">
          <div className='contenedorReservasXUsuario'>
         
         <h1 className='tituloReservas'>Reservas de {localStorage.getItem("nombre")} cantidad: {reservasPorUsuario.length}</h1>
         {reservasPorUsuario.map((reser)=>{
           const fechaActual = new Date();
           const fechaFinReserva = new Date(reser.fechaFin);
           const finalizada = fechaFinReserva < fechaActual;
           return <div key={reser.id} className="reservaXUsuario">
                     {finalizada ?  <p className="estadoReservaFinalizada">Finalizada</p> :<p className="estadoReservaPendiente">Pendiente</p> }
                     <p className="inicioReserva">Fecha inicio:  {new Date(reser.fechaInicio).toLocaleDateString()}</p>
                     <p className="finReserva">Fecha Fin:  {new Date(reser.fechaFin).toLocaleDateString()}</p>
                     <div className="contenedorProductosDeLaReserva">
                         <h3 className='tituloProductosDeReserva'>Productos:</h3>
                         {reser.productos.map((prod, index) => {
                            return <span key={index} className="productoEnReserva">{prod}</span>;
                        })}
                       
                     </div>
                     
                     
                  </div>
           
                 
         })}
        

     </div>

      </div>
      
  );
}

export default ListarReservas