import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import callDutty from "../Images/callDutty.png";
import avowed from "../Images/Avowed.png";
import RedHead from "../Images/Redhead.png";
import theLastOf from "../Images/thelastOf.png";
import embape from "../Images/embape.png";
import messi from "../Images/mesi.png";
import oso from "../Images/imageOso.png";
import outlast from "../Images/outLast.png";
import cards from "../Images/card.png";
import sonic from "../Images/imageSonic.png";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { useContextGlobal } from "../components/Util/global.context";
import Card from "../components/Card";
import Swal from "sweetalert2";
import Slider from "../components/slider";
import axios from "axios";
import { format } from 'date-fns';

const Home = () => {
  const { state } = useContextGlobal();
  const [estadosNuevos, setStateNuevos] = useState({
    productosDeUnaCategoria: [],
    buscar: false,
    categoriaSeleccionada: "",
  });

  const [estadosFechas, setStateFechas] = useState({
    inicio: null,
    fin: null,
  });

  // Función para revolver los elementos del array
  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  const handleChangeCategoria = (event) => {
    setStateNuevos((prevState) => ({
      ...prevState,
      categoriaSeleccionada: event.target.value,
    }));
  };

  const handleBusquedaCategoria = (e) => {
    e.preventDefault();
    const { categoriaSeleccionada } = estadosNuevos;

    if (!categoriaSeleccionada) {
      // Realizar validaciones adicionales según sea necesario
      return;
    }

    axios
      .get(`http://localhost:8080/products/search-category/${categoriaSeleccionada}`, {

      })
      .then((response) => {
        setStateNuevos({
          ...estadosNuevos,
          productosDeUnaCategoria: response.data,
        });
      })
      .catch((error) => {
        console.error("Error al obtener los productos:", error);
      });
  };



  const manejarCambioFechaInicio = (fecha) => {
    const fechaFormateada = format(fecha, 'yyyy-MM-dd');
    setStateFechas({
      ...estadosFechas,
      inicio: fechaFormateada
    });
  };

  const manejarCambioFechaFin = (fecha) => {
    const fechaFormateada = format(fecha, 'yyyy-MM-dd');
    setStateFechas({
      ...estadosFechas,
      fin: fechaFormateada
    });
  };


  const handleRealizarBusqueda = (e) => {
    e.preventDefault();
    console.log(estadosFechas)

    axios
      .post(`http://localhost:8080/booking/list-productos-disponibles`, estadosFechas)
      .then((response) => {
        setStateFechas({
          ...estadosFechas,
          fin: null, inicio: null
        })
        console.log(response)
      })
      .catch((error) => {
        console.error("Error al obtener los productos disponibles:", error);
      });
  };


  // BUSCADOR:
  /*
    const [productoBuscado, setProductoBuscado] = useState('');
    const [productos, setProductos] = useState();
  
    const onChange = (evento) => {
      const producto = evento.target.value;
      setProductoBuscado(producto);
    }
  
    const getProducts = async () => {
      const url `http://localhost:8080/products/list-products`;
      const response = await fetch(url);
      const data = await responde.json();
      console.log(data)
    }
  
    getProducts()
  */

  return (
    <main className="home">
      <div className="contenedorDos">
        <div className="contenedorBuscador">
          <form className="formularioBuscador">

            <select onChange={handleChangeCategoria} className="inputSearch">
              <option value="">Categoría</option>
              {state.categorias.slice(1).map((categoria, index) => (
                <option key={index} value={categoria.title}>
                  {categoria.title}
                </option>
              ))}
            </select>

            <button className="botonBuscar" onClick={handleBusquedaCategoria}>
              <i className="bx bx-search-alt"></i>
            </button>
          </form>

          <input
            type="text"
            className="inputSearchBuscador"
            placeholder="Buscar un juego ..."

            onChange={() => setStateNuevos({ ...estadosNuevos, })}
          />
          <form className="calendarioInicio">
            <i className="bx bx-calendar"></i>

            <DatePicker className="calendarioInicio"
              selected={estadosFechas.inicio}
              onChange={manejarCambioFechaInicio}
              dateFormat="yyyy-MM-dd"
              placeholderText="Fecha de Inicio"
              type="date"
              name={estadosFechas.inicio}
              value={estadosFechas.inicio}
            />


            <DatePicker className="calendarioFinalizacion"
              selected={estadosFechas.fin}
              onChange={manejarCambioFechaFin}
              dateFormat="yyyy-MM-dd"
              placeholderText="Fecha de Finalización"
              type="date"
              value={estadosFechas.fin}
              name={estadosFechas.fin}
            />



            <button className="botonBuscarFecha" onClick={handleRealizarBusqueda}> Buscar </button>

          </form>


        </div>

        <Slider></Slider>


        {estadosNuevos.buscar ? (
          <div className="contenedorProductos">
            <h1 className="tituloProductos">Productos Disponibles</h1>
            {estadosNuevos.productosDeUnaCategoria.map((producto) => (
              <Card product={producto} key={producto.id} />
            ))}
          </div>

        ) : (

          <div className="contenedorProductos">
            <h1 className="tituloProductos">Los Mas Recomendados</h1>
            {shuffleArray(
              state.productos
                .slice(-10)
                .reverse()
                .map((producto) => (
                  <Card product={producto} key={producto.id} />
                ))
            )}
          </div>
        )}
      </div>
    </main>
  );
};

export default Home;
