import React, { useEffect, useState } from "react";
import Avatar from "react-avatar";
import { useParams } from "react-router-dom";
import { useContextGlobal } from "../components/Util/global.context";
import axios from "axios";
import { Link } from "react-router-dom";
import DatePicker from "react-datepicker";
import { format } from "date-fns";
import ComparteRedesSociales from "../components/ComparteRedesSociales";
import "boxicons/css/boxicons.min.css";
import TotalCalificacionesProducto from "../components/TotalCalificacionesProducto/TotalCalificacionesProducto"
import {
  agregarFavorito,
  eliminarFavorito,
  obtenerFavoritos,
} from "../components/favoritos";
import Swal from "sweetalert2";

const Detail = () => {
  const params = useParams();
  const { state, dispatch } = useContextGlobal();
  const [usuarioID, setUsuarioID] = useState(localStorage.getItem("username"));
  const [esFavorito, setEsFavorito] = useState(false);
  const [estadosFavoritos, setEstadosFavoritos] = useState({
    favorito: false,
    isUsuario: false,
  });

  const productoFavorito = {
    username: localStorage.getItem("username"),
    id: params.id,
  };

  const endPointDetail = `http://localhost:8080/products/search-id/${params.id}`;

  console.log(params.id);

  const rolEnLocalStore = localStorage.getItem("userRole");

  const [State, setState] = useState({
    showFeatures: false,
    cambiarBoton: false,
  });

  // useEffect(()=>{
  //   if(localStorage.getItem("username")!=null){
  //     state.favoritos.map((product)=>{
  //       localStorage.setItem(`favorito_${params.id}`, 'true');
  //     })
  //     setEstadosFavoritos({
  //       ...estadosFavoritos,
  //       isUsuario:true,
  //       favorito: localStorage.getItem(`favorito_${params.id}`) === 'true'
  //     })
  //      }
  //     },[])

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
              .delete(`http://localhost:8080/favorite/delete-favorite`, {
                data: productoFavorito,
              })
              .then((response) => {
                console.log(response.data);
                axios
                  .get(
                    "http://localhost:8080/favorite/listar-favoritos-usuario/" +
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
          .post(`http://localhost:8080/favorite/add-favorite`, productoFavorito)
          .then((response) => {
            console.log(response.data);
            Swal.fire("El juego ha sido añadido a tus favoritos");
            axios
              .get(
                "http://localhost:8080/favorite/listar-favoritos-usuario/" +
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
      .get("http://localhost:8080/booking/disponibilidadXProducto/" + params.id)
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

  // const verificar = () => {
  //   // Verificar si el producto está en la lista de favoritos
  //   const productoEnFavoritos = state.favoritos.some(favorito => favorito.id === params.id);
  //   setEsFavorito(productoEnFavoritos);
  // };

  // useEffect(() => {
  //   verificar();
  //   console.log("SI ENTRAAAAAAAAAAAAAAAAAAAAAAAAAAA")
  // }, []);

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
        {rolEnLocalStore != null && (
          <button className="botonComprar">Alquilar</button>
        )}
        <div className="contenedorDatePicker">
          <i className="bx bx-calendar-event"></i>

          <DatePicker
            className="calendarioInicioDetail"
            selected={estadosFechas.fechaInicio}
            excludeDates={fechasBloqueadas}
            dateFormat="yyyy-MM-dd"
            placeholderText=" Fecha de Inicio"
            minDate={fechaHoy}
            customDayClassName={customDayClass}
          />

          <DatePicker
            className="calendarioFinalizacionDetail"
            selected={estadosFechas.fechaFin}
            excludeDates={fechasBloqueadas}
            dateFormat="yyyy-MM-dd"
            placeholderText=" Fecha de Finalización"
            minDate={fechaHoy}
            customDayClassName={customDayClass}
          />
        </div>
      </div>
      </div>
      <TotalCalificacionesProducto productId={params.id}/>
      </div>
    </div>
  );
};

export default Detail;
