import React from 'react'
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
import Swal from 'sweetalert2'
import Slider from '../components/slider'



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

  
    return (
    <main className="home">

      {/*Categorias*/}

      <div className="contenedorCategorias">
        <h2 className='tituloCategorias'>Categorias</h2>
        <div className="categoriaUno">
          <h3 className="tituloCategoriaUno">Accion</h3>
          <img src={callDutty} alt="callDutty" className="img1CategoriaUno" />
          
        </div>

        <div className="categoriaDos">
          <h3 className="tituloCategoriaDos">Aventuras</h3>
          <img src={RedHead} alt="redHead" className="img1CategoriaDos" />
          
        </div>

        <div className="categoriaCinco">
          <h3 className="tituloCategoriaCinco">Carreras</h3>
          
          <img src={cards} alt="theLastOf" className="img2CategoriaCinco" />
        </div>

        <div className="categoriaTres">
          <h3 className="tituloCategoriaTres">Deportes</h3>
          
          <img src={messi} alt="mesi" className="img2CategoriaTres" />
        </div>

        <div className="categoriaCuatro">
          <h3 className="tituloCategoriaCuatro">Infantil</h3>
          
          <img src={sonic} alt="avowed" className="img2CategoriaCuatro" />
        </div>

        <div className="categoriaCinco">
          <h3 className="tituloCategoriaCinco">Terror</h3>
          
          <img src={outlast} alt="theLastOf" className="img2CategoriaCinco" />
        </div>

        <div className="categoriaCinco">
          <h3 className="tituloCategoriaCinco">Historico</h3>
          
          <img src={theLastOf} alt="theLastOf" className="img2CategoriaCinco" />
        </div>

        </div>

      <div className="contenedorDos">

        <form className="formularioBuscador">
          <input type="text" className="inputSearch" placeholder="Buscar" />
          <button className="botonBuscar">
            <i className="bx bx-search-alt"></i>
          </button>
        </form>
        

        {/*Carrusel*/}

        <Slider></Slider>

        {/*Renderizacion de productos*/ }

        <div className="contenedorProductos">
          <h1 className="tituloProductos"><b>Recomendados para ti</b></h1>
          { shuffleArray(state.productos.slice(-10).reverse().map((producto)=><Card product={producto} key={producto.id}/>))}
        </div>
      </div>
       
        

      
    </main>
  );
}

export default Home