import React, { useState,useEffect } from 'react'
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
import { Link } from 'react-router-dom'

const Home = () => {

  const{state}=useContextGlobal()

  //Funcion para revolver los elementos del array

  const shuffleArray=(array)=> {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  //Estados del componente

  const[estadosNuevos, setStateNuevos]=useState({
    productosDeUnaCategoria:[],
    buscar:false,
    categoriaSeleccionada:""
  })

  // OnChange del input que busca la categoria

  const handleChangeCategoria = (event) => {
    setStateNuevos(prevState => ({
      ...prevState,
      categoriaSeleccionada: event.target.value
    }));
  };

  //Funcion que maneja la busqueda de categoria accion 

  const handleCategoryAccion=()=>{
    state.productos.map((producto) => {
      if (producto.category?.title === "accion") {
        axios.get(`http://localhost:8080/products/search-category/accion`)
          .then((response) => {
            setStateNuevos({...estadosNuevos, productosDeUnaCategoria: response.data, buscar: true});
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

  const handleCategoryAventura=()=>{
    state.productos.map((producto) => {
      if (producto.category?.title === "aventura") {
        axios.get(`http://localhost:8080/products/search-category/aventura`)
          .then((response) => {
            setStateNuevos({...estadosNuevos, productosDeUnaCategoria: response.data, buscar: true});
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

  const handleCategoryDeportes=()=>{
    state.productos.map((producto) => {
      if (producto.category?.title === "Deportes") {
        axios.get(`http://localhost:8080/products/search-category/Deportes`)
          .then((response) => {
            setStateNuevos({...estadosNuevos, productosDeUnaCategoria: response.data, buscar: true});
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

  const handleCategoryInfantil=()=>{
    state.productos.map((producto) => {
      if (producto.category?.title === "Infantil") {
        axios.get(`http://localhost:8080/products/search-category/Infantil`)
          .then((response) => {
            setStateNuevos({...estadosNuevos, productosDeUnaCategoria: response.data, buscar: true});
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

  const handleCategoryTerror=()=>{
    state.productos.map((producto) => {
      if (producto.category?.title === "terror") {
        axios.get(`http://localhost:8080/products/search-category/terror`)
          .then((response) => {
            setStateNuevos({...estadosNuevos, productosDeUnaCategoria: response.data, buscar: true});
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

//Busqueda categoria en el input  Buscador 

  console.log(state.productos)
  const handleBusquedaCategoria = (e) => {
    e.preventDefault();
      state.productos.map((producto) => {
        if (producto.category?.title === estadosNuevos.categoriaSeleccionada) {
          axios.get(`http://localhost:8080/products/search-category/${estadosNuevos.categoriaSeleccionada}`)
            .then((response) => {
              setStateNuevos({...estadosNuevos, productosDeUnaCategoria: response.data, buscar: true});
            })
            .catch((error) => {
              console.error("Error al obtener los productos:", error);
            });
          return; // Salir del bucle map
        }
        setStateNuevos({ ...estadosNuevos, buscar: false });
      });
  };

//Codigo para paginado

  const [currentPage, setCurrentPage] = useState(0); // Estado para almacenar la página actual

  const itemsPerPage = 10; // Define la cantidad de elementos por página

  // Calcula el índice inicial y final de los elementos a mostrar en la página actual
  const startIndex = currentPage * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  // Filtra y mapea los elementos para mostrar solo los de la página actual

  const productsToShow = state.productos.slice(startIndex, endIndex).map((producto) => (
    <Card product={producto} key={producto.id} />
  ));

  const handleNextPage = () => {
    setCurrentPage(currentPage + 1); // Incrementa la página actual
  };

  const handlePreviousPage = () => {
    setCurrentPage(currentPage - 1); // Decrementa la página actual
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

        {/*Buscador Categorias*/}

        <form className="formularioBuscador">

        <select  onChange={handleChangeCategoria}className='inputSearch'>
          <option value="">Categoría</option>
          {state.categorias.slice(1).map((categoria, index) => (
          <option key={index} value={categoria.title}>{categoria.title}</option>
           ))}
        </select>

          <button  className="botonBuscar">
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
                <img src={sonic} className="d-block w-100 imageCarrusel" alt="sonic" />
              </div>
              <div className="carousel-item">
                <img src={messi} className="d-block w-100 imageCarrusel" alt="messi" />
              </div>
              <div className="carousel-item">
                <img src={cards} className="d-block w-100 imageCarrusel" alt="cards" />
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

        {/*Renderizacion de productos*/ }

        {!estadosNuevos.buscar ?  

        // <div className="contenedorProductos">
        //   <h1 className="tituloProductos">Los Mas Recomendados</h1>
        //   { shuffleArray(state.productos.slice(-10).reverse().map((producto)=><Card product={producto} key={producto.id}/>))}
        // </div>

      <div className="contenedorProductos">
        <h1 className="tituloProductos">Los Mas Recomendados</h1>
      {productsToShow}

       {/* Botones para navegar entre las páginas  */}

        <div className="botonesPaginado">
          <button className='botonPaginadoAtras'onClick={handlePreviousPage} disabled={currentPage === 0}>Back</button>
          <button className='botonPaginadoAdelante'onClick={handleNextPage} disabled={endIndex >= state.productos.length}>Next</button>
        </div>
       
      </div>

        : 
        <div className="contenedorProductos">
         <h1 className="tituloProductos"> {estadosNuevos.productosDeUnaCategoria[0].category.title}</h1>
        {estadosNuevos.productosDeUnaCategoria.map((producto)=><Card product={producto} key={producto.id}/>)}
      </div>
        }

    </div>
 
    </main>
  );
}

export default Home







