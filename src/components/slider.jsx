import React, {useState} from 'react'


import{
    Carousel,
    CarouselItem,
    CarouselControl,
    CarouselIndicators,
    CarouselCaption
} from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css'

const items = [
    {
        src: "../src/images/1.jpg",
        altText: 'FC 22',
        caption: 'FC 24'

    },
    {
        src: "../src/images/2.jpg",
        altText: 'GTA VI',
        caption: 'GTA VI'

    },
    {
        src: "../src/images/3.jpg",
        altText: 'F1 2022',
        caption: 'F1 2022'

    }
];


const Slider = (props) => {
    const[activeIndex, setActiveIndex] = useState(0);
    const[animating, setAnimating] = useState(false);

    const next = () => {
        if(animating) return;
        const nextIndex = activeIndex === items.length - 1 ? 0 : activeIndex + 1;
        setActiveIndex(nextIndex);
    }

    const previous = () => {
        if(animating) return;
        const nextIndex = activeIndex === 0 ? items.length - 1 : activeIndex - 1;
        setActiveIndex(nextIndex);
    }

    const goToIndex = (newIndex) => {
        if(animating) return;
        setActiveIndex(newIndex)
    }

    const slides = items.map((item) =>{
        return(
            <CarouselItem
                onExiting={() => setAnimating(true)}
                onExited={() => setAnimating(false)}
                key={item.src}           
            >
                <img src={item.src} alt={item.altText} />
                <CarouselCaption captionText={item.caption} captionHeader={item.caption}/>                
                
            </CarouselItem>

        );
    })


  return (
    <div className="container">
        <h2>Populares</h2>
        <Carousel
        activeIndex={activeIndex}
        next={next}
        previous={previous}
        >
        <CarouselIndicators items={items} activeIndex={activeIndex} onClickHandler={goToIndex}/>
        {slides}
        <CarouselControl direction='prev' directionText='Previous' onClickHandler={previous}/>
        <CarouselControl direction='next' directionText='Next' onClickHandler={next}/>
    </Carousel>

    </div>
    
  )
}

export default Slider
