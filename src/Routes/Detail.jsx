import React, { useEffect, useState } from 'react';
import Avatar from 'react-avatar';
import { useParams } from 'react-router-dom';
import { useContextGlobal } from '../components/Util/global.context';
import axios from 'axios';
import { Link } from 'react-router-dom';
import DatePicker from "react-datepicker";
import { format } from 'date-fns';


const Detail = () => {

  const params = useParams()

  const { state, dispatch } = useContextGlobal()

  const endPointDetail = `http://localhost:8080/products/search-id/${params.id}`

  console.log(params.id)

  const rolEnLocalStore = localStorage.getItem('userRole')

  const [State, setState] = useState({
    showFeatures: false,
    cambiarBoton: false,
  })

  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const [reservas, setReservas] = useState([]);

  const [estadosFechas, setStateFechas] = useState({
    id: []
  });

  const handleMostarMas = () => {
    setState({ ...State, showFeatures: true, cambiarBoton: true });
  }

  const handleOcultar = () => {
    setState({ ...State, showFeatures: false, cambiarBoton: false });
  }


  // EMPIEZA FUNCIONALIDAD DEL CALENDARIO
  // reseteada de fechas
  const manejarCambioFechaInicio = (fecha) => {
    const fechaFormateada = format(fecha, 'yyyy-MM-dd');
    setStateFechas({
      ...estadosFechas,
      fechaInicio: fechaFormateada
    });
  };

  const manejarCambioFechaFin = (fecha) => {
    const fechaFormateada = format(fecha, 'yyyy-MM-dd');
    setStateFechas({
      ...estadosFechas,
      fechaFin: fechaFormateada
    });
  };

  const handleRealizarBusqueda = (e) => {
    e.preventDefault();
    console.log(startDate, endDate);
  };

  useEffect(() => {
    axios(endPointDetail)
      .then(res => dispatch({ type: 'get_producto', payload: res.data }))
      .catch(error => console.error("Error fetching product details:", error));
  }, [endPointDetail, dispatch]);

  // bloquea fechas usadas
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

  // Función para aplicar una clase CSS personalizada a las fechas bloqueadas
  const customDayClass = date => {
    return fechasBloqueadas.some(reserva =>
      date.getTime() === reserva.getTime()
    ) ? 'blocked-date' : '';
  };


  return (
    <div className='detalleProducto'>
      <Link to={'/'}><button className='botonRegresar'>Atras</button></Link>
      <h3 className="tituloDetail">{state.producto?.name}</h3>


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
      {!State.cambiarBoton ? <button onClick={handleMostarMas} className='verMas'>ver mas</button> : <button onClick={handleOcultar} className='verMas'>Ocultar</button>}

      {State.showFeatures &&
        <div className="contenedorMostrarCaracteristicas">
          <h2 className="tituloMostarCaracteristicas">¡Caracteristicas Especiales!</h2>
          {state.producto.characteristics.map((caracteristica) => {
            return <p className="nombreCaracteristicas"><Avatar name={caracteristica.name} textMarginRatio='.15' font-size='2px' size="30" round={true} />{caracteristica.name}</p>
          })}
        </div>
      }

      <div className='contenedorCalendarioDetalles'>

        <div className="contenedorDetalles">
          <h2 className="tituloDetallesDeProducto">Detalles principales</h2>
          <h3 className="categoriaProducto">Categoria:<span>{state.producto.category ? state.producto.category.title : "Sin categoria"}</span></h3>
          <h3 className="descripcionProducto">Descripcion:<span>{state.producto.description}</span></h3>
          <h3 className="precioProducto">Precio:<span>{state.producto.price} USD</span></h3>
        </div>

        <div>
          <DatePicker
            className='calendario'
            selected={estadosFechas.fechaInicio}
            excludeDates={fechasBloqueadas}
            dateFormat="yyyy-MM-dd"
            placeholderText="Fecha de Inicio"
            customDayClassName={customDayClass}
            onChange={date => setStartDate(date)} // Actualiza startDate al seleccionar una fecha
          />
        </div>

        <div>
          <DatePicker
            className='calendario'
            excludeDates={fechasBloqueadas}
            dateFormat="yyyy-MM-dd"
            placeholderText="Fecha de Finalización"
            customDayClassName={customDayClass}
          />
        </div>

        {/* <div className='contenedorDatePicker'>
          <DatePicker
            selected={estadosFechas.fechaInicio}
            onChange={manejarCambioFechaInicio}
            dateFormat="yyyy-MM-dd"
            placeholderText="Fecha de Inicio"
            className='calendario'
            type="date"
            name={estadosFechas.fechaInicio}
            value={estadosFechas.fechaInicio}
          />
          <DatePicker
            selected={estadosFechas.fechaFin}
            onChange={manejarCambioFechaFin}
            dateFormat="yyyy-MM-dd"
            placeholderText="Fecha de Finalización"
            className='calendario'
            type="date"
            value={estadosFechas.fechaFin}
            name={estadosFechas.fechaFin}
          />
          {<button className="botonBuscarFechaDetail" onClick={handleRealizarBusqueda}>Buscar</button>}
        </div> */}
      </div>
      <div className="contenedorComprar">
        {rolEnLocalStore != null && <button className='botonComprar'>Comprar</button>}
      </div>


    </div>
  )
}

export default Detail