import React, { useEffect, useState } from "react";
import Avatar from "react-avatar";
import { useParams } from "react-router-dom";
import { useContextGlobal } from "../components/Util/global.context";
import axios from "axios";
import { Link } from "react-router-dom";
import DatePicker from "react-datepicker";
import { format , differenceInDays } from "date-fns";
import ComparteRedesSociales from "../components/ComparteRedesSociales";
import "boxicons/css/boxicons.min.css";
import TotalCalificacionesProducto from "../components/TotalCalificacionesProducto/TotalCalificacionesProducto"
import Swal from "sweetalert2";
import { urlBackend } from '../App';
import {useNavigate} from "react-router-dom";
import { Modal, Button } from 'react-bootstrap';


const Detail = () => {
  const params = useParams();
  const { state, dispatch } = useContextGlobal();
  const [usuarioID, setUsuarioID] = useState(localStorage.getItem("username"));
  const [esFavorito, setEsFavorito] = useState(false);
  const [fechasReservas, setFechasReservas]=useState({
    fechaInicio:null,
    fechaFin:null
  })
  const [estadosFavoritos, setEstadosFavoritos] = useState({
    favorito: false,
    isUsuario: false,
  });

  const productoFavorito = {
    username: localStorage.getItem("username"),
    id: params.id,
  };

//Estado para mostrar la data del producto en alquiler
const[dataAlquiler, setDataAlquiler]=useState(false)

//Estado para calcular el precio total de la reserva
const[precioTotal, setPrecioTotal]=useState(0)

const navigate = useNavigate ();


  const endPointDetail = `${urlBackend}products/search-id/${params.id}`;

  console.log(params.id);

  const rolEnLocalStore = localStorage.getItem("userRole");

  const [State, setState] = useState({
    showFeatures: false,
    cambiarBoton: false,
  });




  useEffect(() => {
    const favoritoEncontrado = state.favoritos.find(fav => fav.id == params.id);
    if (favoritoEncontrado) {
      setEstadosFavoritos(prevState => ({
        ...prevState,
        favorito: true,
      }));
    }else{
      setEstadosFavoritos(prevState => ({
        ...prevState,
        favorito: false,
      }));
      
    }
  }, [state.favoritos, params.id]);
  

  const usuario = localStorage.getItem("username");

  //Manejo del onclick del boton favoritos

  const handleToggleFavorito = () => {
    if (estadosFavoritos.favorito) {
      try {
        Swal.fire({
          title: "Seguro que quieres eliminarlo?",
          text: "El juego sera eliminado de tus favoritos",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonText: "Cancelar!",
          cancelButtonColor: "#d33",
          confirmButtonText: "Si, quiero eliminarlo!",
        }).then((result) => {
          if (result.isConfirmed) {
            axios
              .delete(urlBackend + "favorite/delete-favorite", {
                data: productoFavorito,
              })
              .then((response) => {
                console.log(response.data);
                axios
                  .get(
                    urlBackend + "favorite/listar-favoritos-usuario/" +
                      usuario
                  )
                  .then((response) => {
                    console.log(
                      "Favoritos del usuario desde el back",
                      response.data
                    );
                    dispatch({ type: "get_favorites", payload: response.data });
                    localStorage.setItem(`favorito_${product.id}`, "false");
                    setEstadosFavoritos({
                      ...estadosFavoritos,
                      favorito: false,
                    });
                  });
              });
            Swal.fire({
              title: "Eliminado!",
              text: "El juego ha sido eliminado!",
              icon: "success",
            });
          }
        });
      } catch (error) {
        console.error("Error:", error.message);
      }
    } else {
      try {
        axios
          .post(`${urlBackend}favorite/add-favorite`, productoFavorito)
          .then((response) => {
            console.log(response.data);
            Swal.fire("El juego ha sido añadido a tus favoritos");
            axios
              .get(
               urlBackend + "favorite/listar-favoritos-usuario/" +
                  usuario
              )
              .then((response) => {
                console.log(
                  "Favoritos del usuario desde el back",
                  response.data
                );
                dispatch({ type: "get_favorites", payload: response.data });
                localStorage.setItem(`favorito_${product.id}`, "true");
                setEstadosFavoritos({
                  ...estadosFavoritos,
                  favorito: true,
                });
              });
          })
          .catch((error) => {
            console.error("Error al obtener favoritos:", error);
          });
      } catch (error) {
        console.error("Error:", error.message);
      }
    }
  };

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
const handleOnclickCancelarReserva=()=>{
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
//manejo de onclick para hacer reserva

const handleOnclickReserva= async()=>{
  try {
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
 setDataAlquiler(false)
}



  const fechaHoy = new Date();

  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const [reservas, setReservas] = useState([]);

  const [estadosFechas, setStateFechas] = useState({
    id: [],
  });

  const handleMostarMas = () => {
    setState({ ...State, showFeatures: true, cambiarBoton: true });
  };

  const handleOcultar = () => {
    setState({ ...State, showFeatures: false, cambiarBoton: false });
  };

  // EMPIEZA FUNCIONALIDAD DEL CALENDARIO
  // reseteada de fechas
  const manejarCambioFechaInicio = (fecha) => {
    const fechaFormateada = format(fecha, "yyyy-MM-dd");
    setStateFechas({
      ...estadosFechas,
      fechaInicio: fechaFormateada,
    });
  };

  const manejarCambioFechaFin = (fecha) => {
    const fechaFormateada = format(fecha, "yyyy-MM-dd");
    setStateFechas({
      ...estadosFechas,
      fechaFin: fechaFormateada,
    });
  };

  const handleRealizarBusqueda = (e) => {
    e.preventDefault();
    console.log(startDate, endDate);
  };

  useEffect(() => {
    axios(endPointDetail)
      .then((res) => dispatch({ type: "get_producto", payload: res.data }))
      .catch((error) =>
        console.error("Error fetching product details:", error)
      );

    //  Aquí movemos la página arriba al cargar el componente

    window.scrollTo(0, 0);
  }, [endPointDetail, dispatch]);

  // bloquea fechas usadas
  useEffect(() => {
    axios
      .get(urlBackend + "booking/disponibilidadXProducto/" + params.id)
      .then((res) => {
        const formattedReservas = res.data.map((item) => ({
          fechaInicio: new Date(
            item.inicio[0],
            item.inicio[1] - 1,
            item.inicio[2]
          ),
          fechaFin: new Date(item.fin[0], item.fin[1] - 1, item.fin[2]),
        }));
        setReservas(formattedReservas);
      })
      .catch((error) =>
        console.error("Error fetching product details:", error)
      );
  }, []);

  const fechasBloqueadas = reservas.flatMap((reserva) => {
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

  // Función para aplicar una clase CSS personalizada a las fechas bloqueadas
  const customDayClass = (date) => {
    return fechasBloqueadas.some(
      (reserva) => date.getTime() === reserva.getTime()
    )
      ? "blocked-date"
      : "";
  };

  return (
    <div className="detalleProducto">
      <Link to={"/"}>
        <button className="botonRegresar">Atras</button>
      </Link>
      <h3 className="tituloDetail">{state.producto?.name}</h3>

      <div onClick={handleToggleFavorito} className="contenedorFavorito">
        {usuarioID && (
          <i
            className={`bx ${
              estadosFavoritos.favorito ? "bxs-heart" : "bx-heart"
            }`}
          ></i>
        )}
      </div>

      <div className="contenedorImagenesDetail">
        {state.producto &&
          state.producto.images &&
          state.producto.images.length > 0 && (
            <img
              className="imagen1Producto"
              src={state.producto.images[0].imageUrl}
              alt="imagen1"
            />
          )}
        <div className="contenedor4imagenes">
          {state.producto &&
            state.producto.images &&
            state.producto.images.length > 0 && (
              <img
                className="imagen2Producto"
                src={state.producto.images[1].imageUrl}
                alt="imagen2"
              />
            )}
          {state.producto &&
            state.producto.images &&
            state.producto.images.length > 0 && (
              <img
                className="imagen3Producto"
                src={state.producto.images[2].imageUrl}
                alt="imagen3"
              />
            )}
          {state.producto &&
            state.producto.images &&
            state.producto.images.length > 0 && (
              <img
                className="imagen4Producto"
                src={state.producto.images[3].imageUrl}
                alt="imagen4"
              />
            )}
          {state.producto &&
            state.producto.images &&
            state.producto.images.length > 0 && (
              <img
                className="imagen5Producto"
                src={state.producto.images[4].imageUrl}
                alt="imagen5"
              />
            )}
        </div>
      </div>
      {!State.cambiarBoton ? (
        <button onClick={handleMostarMas} className="verMas">
          ver mas
        </button>
      ) : (
        <button onClick={handleOcultar} className="verMas">
          Ocultar
        </button>
      )}

      {State.showFeatures && (
        <div className="contenedorMostrarCaracteristicas">
          <h2 className="tituloMostarCaracteristicas">
            ¡Caracteristicas Especiales!
          </h2>
          <div className="caracteristicas">
            {state.producto.characteristics.map((caracteristica) => {
              return (
                <p className="nombreCaracteristicas">
                  <Avatar
                    name={caracteristica.name}
                    textMarginRatio=".15"
                    font-size="2px"
                    size="30"
                    round={true}
                  />
                  {caracteristica.name}
                </p>
              );
            })}
          </div>
          <div className="comparteRedes">
            <ComparteRedesSociales location={location.pathname} />
          </div>
        </div>
      )}
      
      <div className="calendarioCalificaciones">
      <div className="detallesCalendraio">
      <div className="contenedorCalendarioDetalles">
        <div className="contenedorDetalles">
          <h2 className="tituloDetallesDeProducto">Detalles principales</h2>
          <h3 className="categoriaProducto">
            Categoria:
            <span>
              {state.producto.category
                ? state.producto.category.title
                : "Sin categoria"}
            </span>
          </h3>
          <h3 className="descripcionProducto">
            Descripcion:<span>{state.producto.description}</span>
          </h3>
          <h3 className="precioProducto">
            Precio:<span>{state.producto.price} USD</span>
          </h3>
        </div>
      </div>

      <div className="contenedorComprar">
        <button className="botonComprar" onClick={handleClickVerReserva} >Ver reserva</button>

        <div className="contenedorDatePicker">
          <i className="bx bx-calendar-event"></i>

          <DatePicker
            className="calendarioInicioDetail"
            selected={fechasReservas.fechaInicio}
            excludeDates={fechasBloqueadas}
            dateFormat="yyyy-MM-dd"
            placeholderText=" Fecha de Inicio"
            minDate={fechaHoy}
            onChange={onChangeInicioReserva}
            customDayClassName={customDayClass}
          />

          <DatePicker
            className="calendarioFinalizacionDetail"
            selected={fechasReservas.fechaFin}
            excludeDates={fechasBloqueadas}
            dateFormat="yyyy-MM-dd"
            placeholderText=" Fecha de Finalización"
            minDate={fechaHoy}
            onChange={onChangeFinReserva}
            customDayClassName={customDayClass}
          />
        </div>
        
      </div>

      {/*Renderizacion del cuadro que muestra todos los datos de la reserva si el estado dataAlquiler es true*/}

    <Modal  show={dataAlquiler} >
    <Modal.Header className="headerPopUp" onClick={handleOnclickCancelarReserva} closeButton>
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

        <Button className="botonCancelarReserva"  onClick={handleOnclickCancelarReserva} variant="secondary" >Cancelar</Button>
        <Button  className="botonReservar" onClick={handleOnclickReserva}>Alquilar</Button>
    </form>
    </Modal.Body>
    </Modal>



      
      </div>
      <TotalCalificacionesProducto productId={params.id}/>
      </div>
    </div>
  );
};

export default Detail;
