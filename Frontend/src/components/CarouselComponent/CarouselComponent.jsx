import React from "react";
import Slider from "react-slick";
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
    autoplaySpeed: 5000,
    fade: true,
  };

  return (
    <div className="pt-2 md:w-11/12 mx-auto">
      <Slider {...settings}>
        <div>
          <img
            src="https://res.cloudinary.com/dvv99sjjl/image/upload/v1728146712/wwivsa72kopz2jgi0neq.png"
            alt="Slide 1"
            className="w-full h-auto object-contain"
          />
        </div>
        <div>
          <img
            src="https://res.cloudinary.com/dvv99sjjl/image/upload/v1728218967/bovemvyvqqwpqyi7feb7.png"
            alt="Slide 2"
            className="w-full h-auto object-cover"
          />
        </div>
        <div>
          <img
            src="https://res.cloudinary.com/dvv99sjjl/image/upload/v1728146345/azqtrqvf7tnclcortmni.png"
            alt="Slide 3"
            className="w-full h-auto object-cover"
          />
        </div>
      </Slider>
    </div>
  );
};

export default CarouselComponent;
