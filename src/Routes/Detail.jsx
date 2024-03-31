import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useContextGlobal } from '../components/Util/global.context';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Avatar from 'react-avatar';
import DatePicker from "react-datepicker";
import { format,differenceInDays } from 'date-fns';
import Rating from '../components/Rating';
import CompartirPorRedes from '../components/CompartirPorRedes';
import Swal from 'sweetalert2';
import { Modal, Button } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
import ModalCargaReserva from '../components/ModalCargaReserva';

const Detail = () => {

  //Direcion ip para compartir el producto por redes
  const ipAddress = 'http://127.0.0.1:5173';

  const params=useParams()

  const navigate = useNavigate();

  const {state,dispatch}=useContextGlobal()

  const [reservas, setReservas] = useState([]);

  //Estado que habilita el renderizado del loader de la reserva
  const [mostrarSpinner, setMostrarSpinner] = useState(false);

   // Estado para almacenar las calificaciones del producto
   const[calificacionesDelProducto, setCalificacionesDelProducto]=useState([])

  const endPointDetail=`http://localhost:8080/products/search-id/${params.id}`
  
  console.log(params.id)


  const[State, setState]=useState({
    showFeatures:false,
    cambiarBoton:false
  })

  const [fechasReservas, setFechasReservas]=useState({
    fechaInicio:null,
    fechaFin:null
  })

  //Estado para mostrar la data del producto en alquiler
  const[dataAlquiler, setDataAlquiler]=useState(false)

  //Estado para calcular el precio total de la reserva
  const[precioTotal, setPrecioTotal]=useState(0)

  //Manejo del onClick del boton mostrar mas
const handleMostarMas=()=>{
  setState({ ...State, showFeatures: true, cambiarBoton: true });
}

//Manejo del onClick del boton ocultar
const handleOcultar=()=>{
  setState({ ...State, showFeatures: false, cambiarBoton: false });
}

//UseEffect donde se llama a la api que trae el producto de la base de datos y lo setea al estado global
  useEffect(()=>{
    axios(endPointDetail)
    .then(res => dispatch({ type: 'get_producto', payload: res.data }))
    .catch(error => console.error("Error fetching product details:", error));
}, [endPointDetail, dispatch]);


//UseEffect para llamar la api que devuelve las fechas en la que ese producto esta reservado

useEffect(() => {
  axios.get("http://localhost:8080/booking/disponibilidadXProducto/" + params.id)
      .then(res => {
          const formattedReservas = res.data.map(item => ({
              fechaInicio: new Date(item.inicio[0], item.inicio[1] - 1, item.inicio[2]),
              fechaFin: new Date(item.fin[0], item.fin[1] - 1, item.fin[2])
          }));
          setReservas(formattedReservas);
      })
      .catch(error => console.error("Error fetching product details:", error));
}, []);


const fechasBloqueadas = reservas.flatMap(reserva => {
  const fechas = [];
  const fechaInicio = reserva.fechaInicio;
  const fechaFin = reserva.fechaFin;
  const currentDate = new Date(fechaInicio);

  while (currentDate <= fechaFin) {
      fechas.push(new Date(currentDate));
      currentDate.setDate(currentDate.getDate() + 1);
  }

  return fechas;
});

  //Función para aplicar una clase CSS personalizada a las fechas bloqueadas
  const customDayClass = date => {
    return fechasBloqueadas.some(reserva => 
        date.getTime() === reserva.getTime()
    ) ? 'blocked-date' : '';
};

// UseEffect que se ejecuta cada que se actualiza el componente, llama la api que trae las calificaciones del producto y lo setea el array a un estado local

useEffect(()=>{
    try {
        axios.get("http://localhost:8080/calificaciones/calificacionDeUnProducto/" + params.id)
        .then((response)=>{
            console.log("Respuesta del backend listado de calificaciones del usuario logueado",response.data)
            setCalificacionesDelProducto(response.data)
        })
        .catch((error) => {
            console.log("Error", error);
        });  
    } 
    catch (error) {
       console.log("Error", error) 
    }
    
},[])

//Onchange para el cambio de valores en los inputs de fechas de reservas

const onChangeInicioReserva=(fecha)=>{
    const fechaFormateada= format(fecha, 'yyyy-MM-dd')
    setFechasReservas({
      ...fechasReservas,
      fechaInicio:fechaFormateada
    })
}

//Onchange para el cambio de valores en los inputs de fechas de reservas

const onChangeFinReserva=(fecha)=>{
  const fechaFormateada= format(fecha, 'yyyy-MM-dd')
  setFechasReservas({
    ...fechasReservas,
    fechaFin:fechaFormateada
  })
}


//OnClick para mostrar los datos de la reserva.

const handleClickVerReserva=()=>{
    if(localStorage.getItem("username")===null){
      Swal.fire({
        title: "El usuario debe estar logueado para realizar una reserva",
        text: "Realiza primero el loguin",
        icon: "error",
        confirmButtonColor: "#ff00008f",
        customClass: {
            popup: 'textFalla'
        }
    });
      setTimeout(()=>{
        navigate('/FormLogin/');; // Redirige al loguin si el usuario no esta logueado  
    },5000)
    }
    else if(fechasReservas.fechaInicio==null || fechasReservas.fechaFin==null){
      Swal.fire({
        title: "Los campos no pueden estar vacios",
        text: "Verifique las fechas de reserva",
        icon: "error",
        confirmButtonColor: "#ff00008f",
        customClass: {
            popup: 'textFalla'
        }
    });
    }
    else{
      setDataAlquiler(true) 
      //Logica para calcular el precio del alquiler
      let diasAlquilar=differenceInDays(fechasReservas.fechaFin,fechasReservas.fechaInicio)
      //Condicional que validad si la fecha de inicio es la misma que la fecha de fin, los dias a alquilar sea 1
      if( diasAlquilar===0){
        diasAlquilar=1
      }
      else{
        diasAlquilar=diasAlquilar
      }
      setPrecioTotal(diasAlquilar* state.producto.price) 
    }  
}

// Manejo del onclick para cancelar la reserva
const handleOnclickCancelarReserva =()=>{
    setDataAlquiler(false)
    setFechasReservas({
      ...fechasReservas,
      fechaInicio:null,
      fechaFin:null
    })
}

const username = localStorage.getItem("username");

//Objeto para hacer la reserva
const bookingAEnviar={
  fechaInicio:fechasReservas.fechaInicio,
  fechaFin:fechasReservas.fechaFin,
  usuario:{
    username:username
  },
  productosReservados:[
    {name:state.producto.name}
  ],
}

//Manejo del onClick para hacer la reserva 
const handleOnclickHacerReserva= async()=>{
    try {
      setMostrarSpinner(true);
      const response= await axios.post(`http://localhost:8080/booking/add-booking`, bookingAEnviar 
     )
     Swal.fire("¡Reservado!", "Tu reservada ha sido guardada.", "success");
      console.log(response.data)
      setFechasReservas({
        ...fechasReservas,
        fechaInicio:null,
        fechaFin:null
      })
   } 
   catch (error) {
     console.log("Error", error)
     Swal.fire({
       title: "Error al confirmar la reserva",
       text: error,
       icon: "error",
       confirmButtonColor: "#ff00008f",
       customClass: {
           popup: 'textFallaServer'
       }
     });
     setFechasReservas({
      ...fechasReservas,
      fechaInicio:null,
      fechaFin:null
    })
   }  
   setMostrarSpinner(false); //Ocultamos el loader
   setDataAlquiler(false) 
}

  return (
    <div className='detalleProducto'>
       <Link to={'/'}><button className='botonRegresar'>Atras</button></Link>
       <h3 className="tituloDetail">{state.producto?.name}</h3>
     
       {/* Renderiza el componente de calificación */}
       <div className="contenedorEstrellas">
          <Rating />
       </div>
      
       <div className="contenedorImagenesDetail">
     
          {state.producto && state.producto.images && state.producto.images.length > 0 && (
            <img className='imagen1Producto' src={state.producto.images[0].imageUrl} alt="imagen1" />
)}
           <div className="contenedor4imagenes">
              {state.producto && state.producto.images && state.producto.images.length > 0 && (
                <img className='imagen2Producto' src={state.producto.images[1].imageUrl} alt="imagen2" />
)}
             {state.producto && state.producto.images && state.producto.images.length > 0 && (
               <img className='imagen3Producto' src={state.producto.images[2].imageUrl} alt="imagen3" />
)}
             {state.producto && state.producto.images && state.producto.images.length > 0 && (
               <img className='imagen4Producto' src={state.producto.images[3].imageUrl} alt="imagen4" />
)}
            {state.producto && state.producto.images && state.producto.images.length > 0 && (
               <img className='imagen5Producto' src={state.producto.images[4].imageUrl} alt="imagen5" />
)}
           </div>
           
       </div>
      {!State.cambiarBoton  ? <button onClick={handleMostarMas} className='verMas'>ver mas</button> :<button onClick={handleOcultar} className='verMas'>Ocultar</button>}
      
       {State.showFeatures && 
       <div className="contenedorMostrarCaracteristicas">
        <h2 className="tituloMostarCaracteristicas">¡Caracteristicas Especiales!</h2>
        {state.producto.characteristics.map((caracteristica)=>{
          return<p  className="nombreCaracteristicas"><Avatar name={caracteristica.name}textMarginRatio='.15' font-size='2px' size="30" round={true}/>{caracteristica.name}</p>
        })}
       </div>
       }

      <div className="contenedorCalendarioDetalles">

        <div className="contenedorDetalles">
           <h2 className="tituloDetallesDeProducto">Detalles principales</h2>
           <h3 className="categoriaProducto">Categoria: <span>{state.producto.category? state.producto.category.title : "Sin categoria"}</span></h3>
           <h3 className="descripcionProducto">Descripcion: <span>{state.producto.description}</span></h3>
           <h3 className="precioProducto">Precio: <span>{state.producto.price} USD</span></h3>
           <h3 className="categoriaProducto">Calificacion total: <span>{state.producto.promedioCalificaciones}</span></h3>
           <div className="comparteRedes">
            <CompartirPorRedes location={`${ipAddress}/Detail/${params.id}`} />
          </div>
           {localStorage.getItem("username") != null &&
              <div className="contenedorCalificaciones">
               {calificacionesDelProducto.length !=0 &&  <h4 className='tituloReseña'>Reseñas</h4>}
               {calificacionesDelProducto.map((calificacion,index) => (
                <div className='contenedorCalificacionEnDetail' key={calificacion.id}>
                    <h5 className='dataReseña'>Reseña {index +1} </h5> 
                    <h5 className='dataReseña'>Usuario: {calificacion.username} </h5> 
                    <h5 className='dataReseña'>Comentario: {calificacion.comentario}</h5>
                    <h5 className='dataReseña'>Calificacion: {calificacion.valorCalificacion}</h5>
                    <hr className='divisorReseñas'/> {/* Añade una línea horizontal si deseas separar cada elemento */}
                </div>
               
               ))}
             </div>
             
           }
         
        </div>
        
      </div>
       
      <div className="contenedorComprar">
          <button onClick={handleClickVerReserva} className='botonComprar'>Ver reserva</button>
    </div>
<div className='contenedorDatePicker'>

     
<DatePicker className="calendariodetailInicio"
   selected={fechasReservas.fechaInicio}
  excludeDates={fechasBloqueadas}
  dateFormat="yyyy-MM-dd"
  placeholderText="Fecha Inicio"
  customDayClassName={customDayClass}
  onChange={onChangeInicioReserva}
  value={fechasReservas.fechaInicio}
  minDate={new Date()} // Establece la fecha mínima seleccionable como hoy
/>
<DatePicker className='calendariodetailFin'
  selected={fechasReservas.fechaFin}
  excludeDates={fechasBloqueadas}
  dateFormat="yyyy-MM-dd"
  placeholderText="Fecha Fin"
  customDayClassName={customDayClass}
  onChange={onChangeFinReserva}
  value={fechasReservas.fechaFin}
  minDate={new Date()} // Establece la fecha mínima seleccionable como hoy
/>
 <i className="bx bx-calendar-event"></i>   

</div>
      {/*Renderizacion del cuadro que muestra todos los datos de la reserva si el estado dataAlquiler es true*/}
      <ModalCargaReserva mostrarSpinnerModal={mostrarSpinner}/>      
      <Modal  show={dataAlquiler} >
      <Modal.Header className="headerPopUp"onClick={handleOnclickCancelarReserva} closeButton>
          <Modal.Title className='tituloPopUp'>Reserva</Modal.Title>
      </Modal.Header>
      <Modal.Body className="contenedorPopUp">
          <form >
              <div className="mb-3">
              <p className='subtituloPopUp'>Nombre del producto: <span className='valorPopUp'>{state.producto.name}</span></p> 
              </div>

              <div className="mb-3">
              <p className='subtituloPopUp'>Precio: <span className='valorPopUp'>{precioTotal} USD</span></p> 
              </div>

              <div className="mb-3">
              <p className='subtituloPopUp'>Descripcion: <span className='valorPopUp'>{state.producto.description}</span></p>
              </div>

              <div className="mb-3">
                <img src={state.producto.images && state.producto.images[0].imageUrl} alt="imageReserva" className="imageReserva" />
                <img src={state.producto.images && state.producto.images[1].imageUrl} alt="imageReserva" className="imageReserva" />
              </div>

              <div className="mb-3">
              <p className='subtituloPopUp'>Inicio Reserva: <span className='valorPopUp'>{fechasReservas.fechaInicio}</span></p>
              </div>

              <div className="mb-3">
              <p className='subtituloPopUp'>Fin Reserva: <span className='valorPopUp'>{fechasReservas.fechaFin}</span></p>
              </div>

              <div className="mb-3">
              <p className='subtituloPopUp'>Nombre de usuario: <span className='valorPopUp'>{localStorage.getItem("nombre") +  " " +localStorage.getItem("apellido")}</span></p>
              </div>

              <div className="mb-3">
              <p className='subtituloPopUp'>Email: <span className='valorPopUp'>{localStorage.getItem("username")}</span></p>
              </div>

              <Button className="botonCancelarReserva" onClick={handleOnclickCancelarReserva} variant="secondary" >Cancelar</Button>
              <Button onClick={handleOnclickHacerReserva} className="botonReservar" >Alquilar</Button>
          </form>
      </Modal.Body>
  </Modal>

</div>
  )
}

export default Detail