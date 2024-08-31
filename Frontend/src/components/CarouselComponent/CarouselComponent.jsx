import React from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

const CarouselComponent = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <div className="w-full max-w-screen-lg mx-auto">
      <Slider {...settings}>
        <div>
          <img src="https://res.cloudinary.com/dvv99sjjl/image/upload/v1725100341/ehsex6zdjqffkwpgy9kz.png" alt="Slide 1" className="w-full h-auto object-contain"/>
        </div>
        <div>
          <img src="https://via.placeholder.com/800x400" alt="Slide 2" className="w-full h-auto object-cover"/>
        </div>
        <div>
          <img src="https://via.placeholder.com/800x400" alt="Slide 3" className="w-full h-auto object-cover"/>
        </div>
      </Slider>
    </div>
  );
};

export default CarouselComponent;