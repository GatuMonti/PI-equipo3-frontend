import React, { useState, useEffect } from 'react';
import { useContextGlobal } from "../Util/global.context";
// import {
//     Carousel,
//     CarouselItem,
//     CarouselControl,
//     CarouselIndicators,
//     CarouselCaption
// } from 'reactstrap';

// import 'bootstrap/dist/css/bootstrap.min.css'; // Importar los estilos de Bootstrap
// import 'bootstrap/dist/js/bootstrap.bundle.min.js'; // Importar los archivos JavaScript de Bootstrap
import './slider.css'
const Slider = (props) => {
    const { state, dispatch } = useContextGlobal();
    const [items, setItems] = useState([]);
    const [activeIndex, setActiveIndex] = useState(0);
    const [animating, setAnimating] = useState(false);

    useEffect(() => {
        if (state.productos && state.productos.length > 0) {
            // Obtener 3 productos aleatorios
            const randomProducts = getRandomProducts(state.productos, 3);
            // Mapear los productos para formar los items del slider
            const loadedItems = randomProducts.map(producto => ({
                src: producto.images && producto.images.length > 0 ? producto.images[0].imageUrl : "",
                altText: producto.name
            }));
            setItems(loadedItems);
        }
    }, [state.productos]);

    const getRandomProducts = (productos, count) => {
        const shuffled = productos.sort(() => 0.5 - Math.random());
        return shuffled.slice(0, count);
    };

    const next = () => {
        if (animating) return;
        const nextIndex = activeIndex === items.length - 1 ? 0 : activeIndex + 1;
        setActiveIndex(nextIndex);
    }

    const previous = () => {
        if (animating) return;
        const nextIndex = activeIndex === 0 ? items.length - 1 : activeIndex - 1;
        setActiveIndex(nextIndex);
    }

    const goToIndex = (newIndex) => {
        if (animating) return;
        setActiveIndex(newIndex)
    }

    // const slides = items.map((item, index) =>{
    //     return(

    //         <Carousel.Item 
    //             onExiting={() => setAnimating(true)}
    //             onExited={() => setAnimating(false)}
    //             key={index}           
    //         >
    //             <img src={item.src} alt={item.altText} />
    //             <h3>{item.altText}</h3>
    //         </Carousel.Item>
    //     );
    // });

    return (
        <>
        <div className='contenedorPopulares'>
        <h2 className='populares'>Populares</h2>
        </div>
        <div className='contenedorCarrusel'>
            <div id="carouselExampleIndicators" className="carousel slide" data-bs-ride="carousel" >
                <div className="carousel-indicators">
                    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
                    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
                </div>
                <div className="carousel-inner">
                    <div className="carousel-item active">
                        {state.productos && state.productos.length > 0 && state.productos[0].images && state.productos[0].images.length > 0 && (
                            <div>
                                <img src={state.productos[0].images[0].imageUrl} className="d-block w-100 imageCarrusel" alt="sonic" />
                                <div className="carousel-caption d-none d-md-block">
                                    <h5>{state.productos[0].name}</h5>
                                </div>
                            </div>
                        )}
                    </div>
                    <div className="carousel-item">
                        {state.productos && state.productos.length > 0 && state.productos[1].images && state.productos[1].images.length > 0 && (
                            <div>
                                <img src={state.productos[1].images[1].imageUrl} className="d-block w-100 imageCarrusel" alt="sonic" />
                                <div className="carousel-caption d-none d-md-block">
                                    <h5>{state.productos[1].name}</h5>
                                </div>
                            </div>
                        )}
                    </div>
                    <div className="carousel-item">
                        {state.productos && state.productos.length > 0 && state.productos[2].images && state.productos[2].images.length > 0 && (
                            <div>
                                <img src={state.productos[2].images[2].imageUrl} className="d-block w-100 imageCarrusel" alt="sonic" />
                                <div className="carousel-caption d-none d-md-block">
                                    <h5>{state.productos[2].name}</h5>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
        </>
        
    );
}

export default Slider;