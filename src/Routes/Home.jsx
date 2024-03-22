import React, { useState, useEffect } from "react";
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
import Autosuggest from 'react-autosuggest';
import { urlBackend } from '../App';


const Home = () => {

  const usuario=localStorage.getItem("username")  
  const { state, dispatch } = useContextGlobal();
  const [estadosNuevos, setStateNuevos] = useState({
    productosDeUnaCategoria: [],
    buscar: false,
    categoriaSeleccionada: "",
    buscarPorFechas: false,
    palabraEnElInputBuscador: "",
    productosDisponiblesPorFecha: []
  })
  

  const [estadosFechas, setStateFechas] = useState({
    inicio: null,
    fin: null,
  });

  const [suggestions, setSuggestions] = useState([]);

  const fechaHoy = new Date();


  useEffect(()=>{
    if(usuario!=null){
      try {
        axios.get(urlBackend + "favorite/listar-favoritos-usuario/" + usuario )
        .then((response)=>{
          console.log("Favoritos del usuario desde el back",response.data)
          dispatch({ type: 'get_favorites', payload: response.data })
         
        })
        
        .catch((error) => {
          console.error("Error al obtener favoritos:", error);
        });
      } 
      catch (error) {
        console.log("Error: ", error)
      }
      return;
   }
  //  dispatch({ type: 'set_isFavorite', payload: false })
  },[])
  
console.log("Productos favortiso en el state:",state.favoritos)

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
    state.productos.map((producto) => {
      if (producto.category?.title === estadosNuevos.categoriaSeleccionada) {
        axios.get(`${urlBackend}products/search-category/${estadosNuevos.categoriaSeleccionada}`)
          .then((response) => {
            setStateNuevos({ ...estadosNuevos, productosDeUnaCategoria: response.data, buscar: true, buscarPorFechas: false });
          })
          .catch((error) => {
            console.error("Error al obtener los productos:", error);
          });
        return; // Salir del bucle map
      }
      setStateNuevos({ ...estadosNuevos, buscar: false });
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



  const handleOnclickBusquedaFechas = (e) => {
    e.preventDefault();
    console.log(estadosFechas)

    axios
      .post(`${urlBackend}booking/list-productos-disponibles`, estadosFechas)
      .then((response) => {
        const productosFiltradosConPalabra = response.data.filter(juego => juego.name.toLowerCase().includes(estadosNuevos.palabraEnElInputBuscador.toLowerCase()))
        setStateNuevos({ ...estadosNuevos, productosDisponiblesPorFecha: productosFiltradosConPalabra, buscarPorFechas: true, buscar: false }, () => {
        });
        console.log("Respuesta del back productos disponibles", response.data)
        setStateFechas({
          ...estadosFechas,
          fin: null,
          inicio: null,
        });
      })

      .catch((error) => {
        console.error("Error al obtener los productos disponibles:", error);


      });

  };
  console.log(estadosNuevos.productosDisponiblesPorFecha);

  //Manejador cambio del input tipo texto en el buscador de fechas

  const handleOnchangeInputText = (event,{newValue}) => {
    setStateNuevos(prevState => ({
      ...prevState,
      palabraEnElInputBuscador: newValue,
    }));
    
  }

  //Codigo para paginado
  const [currentPage, setCurrentPage] = useState(0); // Estado para almacenar la página actual

  const itemsPerPage = 10; // Define la cantidad de elementos por página

  // Calcula el índice inicial y final de los elementos a mostrar en la página actual
  const startIndex = currentPage * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  // Filtra y mapea los elementos para mostrar solo los de la página actual

  const productsToShow = !handleOnchangeInputText ?  state.productos.slice(startIndex, endIndex).map((producto) => (
    <Card product={producto} key={producto.id} />))  
    : 
    state.isFavorite ? 
   
    state.favoritos.length<=0 ?
    dispatch({ type: 'set_isFavorite', payload: false })
    :
    state.favoritos.map((favorito) =>(
      <Card product={favorito} key={favorito.id} />
    )):
    state.productos.filter(juego => juego.name.toLowerCase().includes(estadosNuevos.palabraEnElInputBuscador.toLowerCase())) .slice(startIndex, endIndex).map((producto) => (
    <Card product={producto} key={producto.id} />
  ));


  //Filtra el array de los productos disponibles por fecha
  const productsDateToShow = estadosNuevos.productosDisponiblesPorFecha.slice(startIndex, endIndex).map((producto) => (
    <Card product={producto} key={producto.id} />
  ));

  const handleNextPage = () => {
    setCurrentPage(currentPage + 1); // Incrementa la página actual
  };

  const handlePreviousPage = () => {
    setCurrentPage(currentPage - 1); // Decrementa la página actual
  };

  //  Logica del autosuggest 

  const getSuggestions = (value) => {
    // Filtrar state.productos en base al valor de entrada (value)
    return state.productos.filter(producto => producto.name.toLowerCase().includes(value.toLowerCase()));
  };

  const renderSuggestion = (suggestion) => (
    <div>
      {suggestion.name}
    </div>
  );

  const onSuggestionsFetchRequested = ({ value }) => {
    const suggestions =  getSuggestions(value);
    setSuggestions(suggestions);
  };

  const onSuggestionsClearRequested = () => {
    setSuggestions([]);
  };

  const handleEnterPress = (e) => {
    if (e.key === 'Enter' && suggestions.length > 0) {
      e.preventDefault(); // Evita que el formulario se envíe al presionar Enter
      setStateNuevos(prevState => ({
        ...prevState,
        palabraEnElInputBuscador:suggestions[0].name
      }));
      onSubmit(e); // Llama a onSubmit para manejar cualquier acción adicional
    }
  };

  return (
    <main className="home">
      <div className="contenedorCategorias">
        <h2 className="tituloCategorias">Categorias</h2>
        <div className="categoriaUno">
          <h3 className="tituloCategoriaUno">Accion</h3>
          <img src={callDutty} alt="callDutty" className="img1CategoriaUno" />
          <img src={avowed} alt="avowed" className="img2CategoriaUno" />
        </div>

        <div className="categoriaDos">
          <h3 className="tituloCategoriaDos">Aventura</h3>
          <img src={RedHead} alt="redHead" className="img1CategoriaDos" />
          <img src={theLastOf} alt="theLastOf" className="img2CategoriaDos" />
        </div>

        <div className="categoriaTres">
          <h3 className="tituloCategoriaTres">Deportes</h3>
          <img src={embape} alt="embape" className="img1CategoriaTres" />
          <img src={messi} alt="mesi" className="img2CategoriaTres" />
        </div>

        <div className="categoriaCuatro">
          <h3 className="tituloCategoriaCuatro">Infantil</h3>
          <img src={cards} alt="callDutty" className="img1CategoriaCuatro" />
          <img src={sonic} alt="avowed" className="img2CategoriaCuatro" />
        </div>

        <div className="categoriaCinco">
          <h3 className="tituloCategoriaCinco">Terror</h3>
          <img src={oso} alt="redHead" className="img1CategoriaCinco" />
          <img src={outlast} alt="theLastOf" className="img2CategoriaCinco" />
        </div>
      </div>

      <div className="contenedorDos">

        <div className="barraBuscador">


          <form className="formularioBuscador">
            <select onChange={handleChangeCategoria} className="inputSearch">
              <option value="">Filtrar por categoria</option>
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

          <Autosuggest 
            suggestions={suggestions}
            onSuggestionsFetchRequested={onSuggestionsFetchRequested}
            onSuggestionsClearRequested={onSuggestionsClearRequested}
            getSuggestionValue={(suggestion) => suggestion.name}
            renderSuggestion={renderSuggestion}
            inputProps={{
              placeholder: 'Buscar un juego ...',
              value: estadosNuevos.palabraEnElInputBuscador,
              onChange: handleOnchangeInputText,
              onKeyDown: handleEnterPress, // Agrega el manejador para el evento keydown
              className: 'inputSearchBuscador'
            }}
          />

          <form className="calendarioInicio">
            <i className="bx bx-calendar"></i>

            <DatePicker className="calendarioInicio"
              selected={estadosFechas.inicio}
              onChange={manejarCambioFechaInicio}
              dateFormat="yyyy-MM-dd"
              placeholderText=" Fecha de Inicio"
              type="date"
              minDate={fechaHoy}
              name={estadosFechas.inicio}
              value={estadosFechas.inicio}
            />


            <DatePicker className="calendarioFinalizacion"
              selected={estadosFechas.fin}
              onChange={manejarCambioFechaFin}
              dateFormat="yyyy-MM-dd"
              placeholderText="Fecha de Finalización"
              type="date"
              minDate={fechaHoy}
              value={estadosFechas.fin}
              name={estadosFechas.fin}
            />

            <button className="botonBuscarFecha" onClick={handleOnclickBusquedaFechas}> Buscar </button>

          </form>
        </div>

        <Slider></Slider>

        {/*Renderizacion de productos*/}
        {estadosNuevos.buscarPorFechas ?

          <div className="contenedorProductos">
            <h1 className="tituloProductos"> Productos disponibles {estadosNuevos.productosDisponiblesPorFecha.length}</h1>
            {productsDateToShow}

            {/* Botones para navegar entre las páginas  */}

            {estadosNuevos.productosDisponiblesPorFecha.length>10  &&

              <div className="botonesPaginado">
              <button className='botonPaginadoAtras' onClick={handlePreviousPage} disabled={currentPage === 0}>Back</button>
              <button className='botonPaginadoAdelante' onClick={handleNextPage} disabled={endIndex >= state.productos.length}>Next</button>
             </div>

            }
          </div> :

          !estadosNuevos.buscar ?

            <div className="contenedorProductos">
              {state.isFavorite ? 
              <h1 className="tituloProductos">Mis favoritos {state.favoritos.length}</h1>
              : <h1 className="tituloProductos">Los Mas Recomendados</h1>
              }
              
              {productsToShow}                    
             
            </div>

            :
            <div className="contenedorProductos">
              <h1 className="tituloProductos"> {estadosNuevos.productosDeUnaCategoria[0].category.title}</h1>
              {estadosNuevos.productosDeUnaCategoria.map((producto) => <Card product={producto} key={producto.id} />)}
            </div>

        }
      </div>
    </main>
  );
};

export default Home;
