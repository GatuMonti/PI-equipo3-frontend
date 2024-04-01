import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { Pagination } from "react-bootstrap";
import { format } from "date-fns";
import ProductoReservado from "./ProductosReservados";
import { urlBackend } from '../../App';
import styles from './listarReserva.module.css';
import './estilosProductoACalificar.css';

const ListarReservas = () => {
  const [reservas, setReservas] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [reservasPerPage] = useState(5);
  const [productoVisible, setProductoVisible] = useState({});
  const username = localStorage.getItem("username");
  const [estadoRecibido, setEstadoRecibido] = useState(false);

  const recibirCambioDeEstado = (estadoRecibido) => {
    setEstadoRecibido(!estadoRecibido);
  };

  const obtenerReservas = async () => {
    try {
      const response = await axios.get(urlBackend + "booking/list-bookings");
      const reservasUsuario = response.data.filter(
        (reserva) => reserva.userName === username
      );
      const productosVisibleInicial = {};
      reservasUsuario.forEach((reserva) => {
        productosVisibleInicial[reserva.id] = false;
      });
      setProductoVisible(productosVisibleInicial);
      setReservas(reservasUsuario);
    } catch (error) {
      console.error("Error al obtener la lista de reservas:", error.message);
      Swal.fire({
        title: "Error!",
        text: error.message,
        icon: "error",
        confirmButtonColor: "#ff00008f",
        customClass: {
          popup: "textFallaServer",
        },
      });
    }
  };

  useEffect(() => {
    obtenerReservas();
  }, []);

  const formatDate = (dateArray) => {
    const date = new Date(dateArray[0], dateArray[1] - 1, dateArray[2]);
    return format(date, "yyyy-MM-dd");
  };

  const toggleProductoVisible = (id) => {
    setProductoVisible((prevState) => ({
      ...prevState,
      [id]: !prevState[id],
    }));
  };

  const indexOfLastReserva = currentPage * reservasPerPage;
  const indexOfFirstReserva = indexOfLastReserva - reservasPerPage;
  const currentReservas = reservas.slice(indexOfFirstReserva, indexOfLastReserva);

  return (
    <div className={styles.listaAdmin}>
      <h2 className={styles.titleListProducts}>
        Listado de Reservas
      </h2>
      <div className={styles.contenedorListaProductos}>
        {currentReservas.map((reserva, index) => {
          const fechaInicioReserva = new Date(
            reserva.fechaInicio[0],
            reserva.fechaInicio[1] - 1,
            reserva.fechaInicio[2]
          );
          const fechaFinReserva = new Date(
            reserva.fechaFin[0],
            reserva.fechaFin[1] - 1,
            reserva.fechaFin[2]
          );
          const fechaActual = new Date();

          const reservaFinalizada = fechaActual > fechaFinReserva;
          const reservaEnProgreso =
            fechaActual >= fechaInicioReserva && fechaActual <= fechaFinReserva;
          return (
            <div className={styles.contenedorReservas} key={index}>
              <div
                className={styles.contenedorProductosAdmin}
                onClick={() => toggleProductoVisible(reserva.id)}
              >
                <p className={styles.listId}>
                  <span
                    style={{
                      color: reservaFinalizada
                        ? "lightgreen"
                        : reservaEnProgreso
                          ? "blue"
                          : "orange",
                    }}
                  >
                    {reservaFinalizada
                      ? "FINALIZADA"
                      : reservaEnProgreso
                        ? "EN PROGRESO"
                        : "PENDIENTE"}
                  </span>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;ID: {reserva.id}
                </p>
                <p className={styles.listName}>
                  Fecha Inicio: <span>{formatDate(reserva.fechaInicio)}</span>
                </p>
                <p className={styles.listName}>
                  Fecha Fin: <span>{formatDate(reserva.fechaFin)}</span>
                </p>
              </div>
              <div className={`productoACalificar ${productoVisible[reserva.id] ? 'visible' : 'invisible'}`}>
                {/* <p style={{ marginTop: "5px" }}>Productos:</p> */}
                {reserva.productos.map((producto, indexProd) => (
                  <ProductoReservado
                    key={indexProd}
                    producto={{ nombre: producto.name, id: producto.id }}
                    reservaFinalizada={reservaFinalizada}
                    estadoRecibido={estadoRecibido}
                    username={username}
                    recibirCambioDeEstado={recibirCambioDeEstado}
                  />
                ))}
              </div>

            </div>

          );
        })}


      </div>
      {reservas.length > 0 && (
        
          <Pagination className={styles.paginationItem}>
            {Array.from({
              length: Math.ceil(reservas.length / reservasPerPage),
            }).map((_, index) => (
              <Pagination.Item
                key={index}
                onClick={() => setCurrentPage(index + 1)}
                active={index + 1 === currentPage}
              >
                {index + 1}
              </Pagination.Item>
            ))}
          </Pagination>
        )}
        
        <span className={styles.contadorProductos}>Total de Reservas : {reservas.length}</span>
    </div>
  );
};

export default ListarReservas;