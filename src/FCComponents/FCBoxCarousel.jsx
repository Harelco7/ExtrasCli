import React from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import '../Styles/BoxCarousel.css'; 
import FCBoxCard from './FCBoxCard';

const FCBoxCarousel = ({ boxes }) => {
  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 4
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1
    }
  };

  return (
    <Carousel className="carousel-wrapper" responsive={responsive} swipeable={true} >
      {boxes.map((box, index) => (
       <FCBoxCard box={box} key= {index}/>
      ))}
    </Carousel>
  );
};

export default FCBoxCarousel;
