import React, { useState,useEffect } from 'react'
import callDutty from '../Images/callDutty.png'
import avowed from '../Images/Avowed.png'
import RedHead from '../Images/Redhead.png'
import theLastOf from '../Images/thelastOf.png'
import embape from '../Images/embape.png'
import messi from '../Images/mesi.png'
import oso from '../Images/imageOso.png'
import outlast from '../Images/outLast.png'
import cards from '../Images/card.png'
import sonic from '../Images/imageSonic.png'
import 'bootstrap/dist/css/bootstrap.min.css'; // Importar los estilos de Bootstrap
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; // Importar los archivos JavaScript de Bootstrap
import { useContextGlobal } from '../components/Util/global.context'
import Card from '../components/Card'
import axios from 'axios'

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

  const[estadosNuevos, setStateNuevos]=useState({
    productosDeUnaCategoria:[],
    buscar:false,
    categoriaSeleccionada:""
  })

  const handleChangeCategoria = (event) => {
    setStateNuevos(prevState => ({
      ...prevState,
      categoriaSeleccionada: event.target.value
    }));
  };

  // const handleBusquedaCategoria = (e) => {
  //   e.preventDefault();
  //   axios.get(`http://localhost:8080/products/search-category/${estadosNuevos.categoriaSeleccionada}`)
  //     .then(response => {
  //       console.log(response.data)
  //       setStateNuevos({ ...estadosNuevos, productosDeUnaCategoria: response.data, buscar: true });
  //     })
  //     .catch(error => {
  //       console.error('Error al obtener los productos:', error);
  //     });
  // };
  // console.log(estadosNuevos.categoriaSeleccionada)
  // console.log(estadosNuevos.buscar)
  // console.log(estadosNuevos.productosDeUnaCategoria)

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
  
    return (
    <main className="home">

      {/*Categorias*/}

      <div className="contenedorCategorias">
        <h2 className='tituloCategorias'>Categorias</h2>
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
                <img src={callDutty} className="d-block w-100" alt="callDutty" />
              </div>
              <div className="carousel-item">
                <img src={messi} className="d-block w-100" alt="messi" />
              </div>
              <div className="carousel-item">
                <img src={embape} className="d-block w-100" alt="embape" />
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
        <div className="contenedorProductos">
          <h1 className="tituloProductos">Los Mas Recomendados</h1>
          { shuffleArray(state.productos.slice(-10).reverse().map((producto)=><Card product={producto} key={producto.id}/>))}
        </div>
        : 
        <div className="contenedorProductos">
        <h1 className="tituloProductos">{estadosNuevos.categoriaSeleccionada}</h1>
        {estadosNuevos.productosDeUnaCategoria.map((producto)=><Card product={producto} key={producto.id}/>)}
      </div>
        }

        
       
      </div>
       
    </main>
  );
}

export default Home







