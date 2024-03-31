import React, { useState, useEffect } from 'react'
import callDutty2 from '../Images/callDutty2.png'
import theLastOf from '../Images/thelastOf.png'
import nba from '../Images/nba.jpg'
import messi from '../Images/mesi.png'
import mario from '../Images/mario.jpg'
import sonic from '../Images/imageSonic.png'
import cards from '../Images/card.png'
import oso from '../Images/imageOso.png'
import outlast from '../Images/outLast.png'
import marioCard from '../Images/marioCard.jpg'
import mundoGaturro from '../Images/mundoGaturro.jpg'
import 'bootstrap/dist/css/bootstrap.min.css'; // Importar los estilos de Bootstrap
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; // Importar los archivos JavaScript de Bootstrap
import { useContextGlobal } from '../components/Util/global.context'
import Card from '../components/Card'
import axios from 'axios'
import { Link, useParams } from 'react-router-dom'
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { format } from 'date-fns';
import Autosuggest from 'react-autosuggest';

const Home = () => {

  const { state, dispatch } = useContextGlobal()

  //Funcion para revolver los elementos del array

  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  //Estados del componente

  const [estadosNuevos, setStateNuevos] = useState({
    productosDeUnaCategoria: [],
    buscar: false,
    categoriaSeleccionada: "",
    buscarPorFechas: false,
    palabraEnElInputBuscador:"",
    productosDisponiblesPorFecha: []
  })
  
  //Estado para enviar fechas al backend

  const [estadosFechas, setStateFechas] = useState({
    inicio: null,
    fin: null,
  });


  const [suggestions, setSuggestions] = useState([]);

  // OnChange del input que busca la categoria

  const handleChangeCategoria = (event) => {
    setStateNuevos(prevState => ({
      ...prevState,
      categoriaSeleccionada: event.target.value
    }));
  };

  //Funcion que maneja la busqueda de categoria accion 

  const handleCategoryAccion = () => {
    state.productos.map((producto) => {
      if (producto.category?.title === "accion") {
        axios.get(`http://localhost:8080/products/search-category/accion`)
          .then((response) => {
            setStateNuevos({ ...estadosNuevos, productosDeUnaCategoria: response.data, buscar: true,buscarPorFechas:false });
            console.log(response.data)
          })
          .catch((error) => {
            console.error("Error al obtener los productos:", error);
          });
        return; // Salir del bucle map
      }
      setStateNuevos({ ...estadosNuevos, buscar: false });
    });
  }

  //Funcion que maneja la busqueda de categoria Aventura 

  const handleCategoryAventura = () => {
    state.productos.map((producto) => {
      if (producto.category?.title === "aventura") {
        axios.get(`http://localhost:8080/products/search-category/aventura`)
          .then((response) => {
            setStateNuevos({ ...estadosNuevos, productosDeUnaCategoria: response.data, buscar: true,buscarPorFechas:false });
            console.log(response.data)
          })
          .catch((error) => {
            console.error("Error al obtener los productos:", error);
          });
        return; // Salir del bucle map
      }
      setStateNuevos({ ...estadosNuevos, buscar: false });
    });
  }

  //Funcion que maneja la busqueda de categoria Deportes 

  const handleCategoryDeportes = () => {
    state.productos.map((producto) => {
      if (producto.category?.title === "Deportes") {
        axios.get(`http://localhost:8080/products/search-category/Deportes`)
          .then((response) => {
            setStateNuevos({ ...estadosNuevos, productosDeUnaCategoria: response.data, buscar: true,buscarPorFechas:false });
            console.log(response.data)
          })
          .catch((error) => {
            console.error("Error al obtener los productos:", error);
          });
        return; // Salir del bucle map
      }
      setStateNuevos({ ...estadosNuevos, buscar: false });
    });
  }

  //Funcion que maneja la busqueda de categoria Infantil 

  const handleCategoryInfantil = () => {
    state.productos.map((producto) => {
      if (producto.category?.title === "Infantil") {
        axios.get(`http://localhost:8080/products/search-category/Infantil`)
          .then((response) => {
            setStateNuevos({ ...estadosNuevos, productosDeUnaCategoria: response.data, buscar: true,buscarPorFechas:false });
            console.log(response.data)
          })
          .catch((error) => {
            console.error("Error al obtener los productos:", error);
          });
        return; // Salir del bucle map
      }
      setStateNuevos({ ...estadosNuevos, buscar: false });
    });
  }

  //Funcion que maneja la busqueda de categoria Terror

  const handleCategoryTerror = () => {
    state.productos.map((producto) => {
      if (producto.category?.title === "terror") {
        axios.get(`http://localhost:8080/products/search-category/terror`)
          .then((response) => {
            setStateNuevos({ ...estadosNuevos, productosDeUnaCategoria: response.data, buscar: true,buscarPorFechas:false });
            console.log(response.data)
          })
          .catch((error) => {
            console.error("Error al obtener los productos:", error);
          });
        return; // Salir del bucle map
      }
      setStateNuevos({ ...estadosNuevos, buscar: false });
    });
  }

  //Manejador onclick busqeuda categoria

  console.log( "productos de la aplicacion",state.productos)
  const handleBusquedaCategoria = (e) => {
    e.preventDefault();
    state.productos.map((producto) => {
      if (producto.category?.title === estadosNuevos.categoriaSeleccionada) {
        axios.get(`http://localhost:8080/products/search-category/${estadosNuevos.categoriaSeleccionada}`)
          .then((response) => {
            setStateNuevos({ ...estadosNuevos, productosDeUnaCategoria: response.data, buscar: true,buscarPorFechas:false });
          })
          .catch((error) => {
            console.error("Error al obtener los productos:", error);
          });
        return; // Salir del bucle map
      }
      setStateNuevos({ ...estadosNuevos, buscar: false });
    });
  };

  //Manejador cambio fecha inicio 

  const handleFechaInicio = (fecha) => {
    const fechaFormateada = format(fecha, 'yyyy-MM-dd');
    setStateFechas({
      ...estadosFechas,
      inicio: fechaFormateada
    });
  };

  //Manejador cambio fecha fin

  const handleFechaFin = (fecha) => {
    const fechaFormateada = format(fecha, 'yyyy-MM-dd');
    setStateFechas({
      ...estadosFechas,
      fin: fechaFormateada
    });
  };

   //Manejador cambio del input tipo texto en el buscador de fechas

   const handleOnchangeInputText = (event,{newValue}) => {
    setStateNuevos(prevState => ({
      ...prevState,
      palabraEnElInputBuscador: newValue,
    }));
  }

  //Manejador onclick buscador de fechas

  const handleOnclickBusquedaFechas = (e) => {
    e.preventDefault();
    console.log(estadosFechas)

    axios
      .post(`http://localhost:8080/booking/list-productos-disponibles`, estadosFechas)
      .then((response) => {
        const productosFiltradosConPalabra= response.data.filter(juego => juego.name.toLowerCase().includes(estadosNuevos.palabraEnElInputBuscador.toLowerCase()))
        setStateNuevos({ ...estadosNuevos, productosDisponiblesPorFecha: productosFiltradosConPalabra, buscarPorFechas: true, buscar:false }, () => {
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
  console.log("Array de productos disponibles ",estadosNuevos.productosDisponiblesPorFecha);


   // useEffect para llamar a la api que lista los favoritos del usuario logueado en la aplicacion

   const usuario=localStorage.getItem("username")

   useEffect(()=>{
    if(usuario!=null){
      try {
        axios.get("http://localhost:8080/favorite/listar-favoritos-usuario/" + usuario )
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

    console.log("Favoritos ya almacenados en el estado global favoritos",state.favoritos)

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
   
    !state.favoritos.length<=0 &&
    
    state.favoritos.map((favorito) =>(
      <Card product={favorito} key={favorito.id} />
    )):
    state.productos.filter(juego => juego.name.toLowerCase().includes(estadosNuevos.palabraEnElInputBuscador.toLowerCase())) .slice(startIndex, endIndex).map((producto) => (
    <Card product={producto} key={producto.id} />
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

    //Logica del autosuggest 

   const getSuggestions = (value) => {
    // Filtrar state.productos en base al valor de entrada (value)
    return state.productos.filter(producto => producto.name.toLowerCase().includes(value.toLowerCase()));
  };

  
  const renderSuggestion = (suggestion) => (
    <div className='textAutoCompletado'>
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

      {/*Categorias*/}

      <div className="contenedorCategorias">
        <h2 className='tituloCategorias'>Categorias</h2>
        <div className="categoriaUno">
          <Link onClick={handleCategoryAccion}><h3 className="tituloCategoriaUno">Accion</h3></Link>
          <Link onClick={handleCategoryAccion}><img src={callDutty2} alt="callDutty" className="img1CategoriaUno" /></Link>
          <Link onClick={handleCategoryAccion}><img src={theLastOf} alt="atheLastOf" className="img2CategoriaUno" /></Link>
        </div>

        <div className="categoriaDos">
          <Link onClick={handleCategoryAventura}><h3 className="tituloCategoriaDos">Aventura</h3></Link>
          <Link onClick={handleCategoryAventura}><img src={sonic} alt="sonic" className="img1CategoriaDos" /></Link>
          <Link onClick={handleCategoryAventura}><img src={mario} alt="mario" className="img2CategoriaDos" /></Link>
        </div>

        <div className="categoriaTres">
          <Link onClick={handleCategoryDeportes} ><h3 className="tituloCategoriaTres">Deportes</h3></Link>
          <Link onClick={handleCategoryDeportes}><img src={nba} alt="nba" className="img1CategoriaTres" /></Link>
          <Link onClick={handleCategoryDeportes}><img src={messi} alt="mesi" className="img2CategoriaTres" /></Link>
        </div>

        <div className="categoriaCuatro">
          <Link onClick={handleCategoryInfantil}><h3 className="tituloCategoriaCuatro">Infantil</h3></Link>
          <Link onClick={handleCategoryInfantil}><img src={marioCard} alt="marioCard" className="img1CategoriaCuatro" /></Link>
          <Link onClick={handleCategoryInfantil}><img src={mundoGaturro} alt="mundoGaturro" className="img2CategoriaCuatro" /></Link>
        </div>

        <div className="categoriaCinco">
          <Link onClick={handleCategoryTerror}><h3 className="tituloCategoriaCinco">Terror</h3></Link>
          <Link onClick={handleCategoryTerror}><img src={oso} alt="redHead" className="img1CategoriaCinco" /></Link>
          <Link onClick={handleCategoryTerror}><img src={outlast} alt="theLastOf" className="img2CategoriaCinco" /></Link>
        </div>
      </div>


      <div className="contenedorDos">
     
        {/*Buscador de fechas */}

        <form action="" className="containerBuscadorFechas">
      
          {/* <input onChange={handleOnchangeInputText}className='inputTextoBuscador' placeholder='Explora'/>
          <div className="inputline"></div> */}

          <Autosuggest 
            suggestions={suggestions}
            onSuggestionsFetchRequested={onSuggestionsFetchRequested}
            onSuggestionsClearRequested={onSuggestionsClearRequested}
            getSuggestionValue={(suggestion) => suggestion.name}
            renderSuggestion ={renderSuggestion}
            inputProps={{
              placeholder: 'Explora',
              value: estadosNuevos.palabraEnElInputBuscador,
              onChange: handleOnchangeInputText,
              onKeyDown: handleEnterPress, // Agrega el manejador para el evento keydown
              className: 'inputTextoBuscador'
            }}
          />

            <div className="inputline"></div>


          <DatePicker className='calendarioUno'
            selected={estadosFechas.inicio}
            onChange={handleFechaInicio}
            dateFormat="yyyy-MM-dd"
            type="date"
            value={estadosFechas.inicio}
            placeholderText="Fecha de inicio"
            minDate={new Date()} // Establece la fecha mínima seleccionable como hoy
          />
          <div className="calendarioUnoline"></div>

          <DatePicker className='calendarioDos'
            selected={estadosFechas.fin}
            onChange={handleFechaFin}
            dateFormat="yyyy-MM-dd"
            type="date"
            value={estadosFechas.fin}
            placeholderText="Fecha de fin"
            minDate={new Date()} // Establece la fecha mínima seleccionable como hoy
          />
          <div className="calendarioDosline"></div>
          <button onClick={handleOnclickBusquedaFechas} className='botonBuscarFechas'>Buscar</button>
        </form>
        

        {/*Buscador Categorias*/}

        <form className="formularioBuscador">

          <select onChange={handleChangeCategoria} className='inputSearch'>
            <option value="">Categoría</option>
            {state.categorias.slice(1).map((categoria, index) => (
              <option key={index} value={categoria.title}>{categoria.title}</option>
            ))}
          </select>

          <button className="botonBuscar">
            <i onClick={handleBusquedaCategoria} className="bx bx-search-alt"></i>
          </button>

        </form>

        {/*Carrusel*/}

        <div className='contenedorCarrusel'>
          <div id="carouselExampleIndicators" className="carousel slide" data-bs-ride="carousel" data-interval="1000" >
            <h5 className="tituloCarrusel">Populares</h5>
            <div className="carousel-indicators">
              <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
              <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
              <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
            </div>
            <div className="carousel-inner">

              <div className="carousel-item active">
              {state.productos && state.productos.length > 0 && state.productos[0].images && state.productos[0].images.length > 0 && (
                <img src={state.productos[10].images[0].imageUrl} className="d-block w-100 imageCarrusel" alt="sonic" />
              )}
              </div>
              
              <div className="carousel-item">
              {state.productos && state.productos.length > 0 && state.productos[0].images && state.productos[0].images.length > 0 && (
                <img src={state.productos[3].images[0].imageUrl} className="d-block w-100 imageCarrusel" alt="sonic" />
              )}
              </div>
              <div className="carousel-item">
              {state.productos && state.productos.length > 0 && state.productos[0].images && state.productos[0].images.length > 0 && (
                <img src={state.productos[4].images[4].imageUrl} className="d-block w-100 imageCarrusel" alt="sonic" />
              )}
              </div>
            </div>
            <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
              <span className="carousel-control-prev-icon" aria-hidden="true"></span>
              <span className="visually-hidden">Previous</span>
            </button>
            <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
              <span className="carousel-control-next-icon" aria-hidden="true"></span>
              <span className="visually-hidden">Next</span>
            </button>
          </div>
        </div>

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

            // <div className="contenedorProductos">
            //   <h1 className="tituloProductos">Los Mas Recomendados</h1>
            //   { shuffleArray(state.productos.slice(-10).reverse().map((producto)=><Card product={producto} key={producto.id}/>))}
            // </div>

            <div className="contenedorProductos">
              {state.isFavorite ?

              state.favoritos.length>0?
              <h1 className="tituloProductos">Mis favoritos {state.favoritos.length}</h1>
              : <h1 className="tituloProductos">No hay favoritos</h1>
              :
              <h1 className="tituloProductos">Los Mas Recomendados</h1>
              }
              
              {productsToShow}

              {/* Botones para navegar entre las páginas  */}

             {!state.isFavorite && 
              <div className="botonesPaginado">
                <button className='botonPaginadoAtras' onClick={handlePreviousPage} disabled={currentPage === 0}>Back</button>
                <button className='botonPaginadoAdelante' onClick={handleNextPage} disabled={endIndex >= state.productos.length}>Next</button>
             </div>
             } 
            
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
}

export default Home







