import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { ChevronLeft, ChevronRight } from "lucide-react";

const NextArrow = ({ onClick }) => (
  <button
    onClick={onClick}
    className="absolute right-4 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-white/30 hover:bg-white/50 transition-all"
  >
    <ChevronRight className="w-6 h-6 text-white" />
  </button>
);

const PrevArrow = ({ onClick }) => (
  <button
    onClick={onClick}
    className="absolute left-4 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-white/30 hover:bg-white/50 transition-all"
  >
    <ChevronLeft className="w-6 h-6 text-white" />
  </button>
);

const CarouselComponent = () => {
  const slides = [
    {
      image: "https://res.cloudinary.com/dvv99sjjl/image/upload/v1728146712/wwivsa72kopz2jgi0neq.png",
      title: "Empowering Communities",
      description: "Join us in making a difference through sustainable development initiatives",
      ctaText: "Learn More",
    },
    {
      image: "https://res.cloudinary.com/dvv99sjjl/image/upload/v1728218967/bovemvyvqqwpqyi7feb7.png",
      title: "Building Better Futures",
      description: "Supporting education and growth in underserved communities",
      ctaText: "Get Involved",
    },
    {
      image: "https://res.cloudinary.com/dvv99sjjl/image/upload/v1728146345/azqtrqvf7tnclcortmni.png",
      title: "Creating Lasting Change",
      description: "Transforming lives through innovative social programs",
      ctaText: "Support Us",
    },
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    fade: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    dotsClass: "slick-dots bottom-4",
  };

  return (
    <div className="relative w-full mx-auto overflow-hidden">
      <Slider {...settings}>
        {slides.map((slide, index) => (
          <div key={index} className="relative">
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent z-10" />
            
            {/* Image */}
            <div className="relative ">
              <img
                src={slide.image}
                alt={slide.title}
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Content Overlay */}
            <div className="absolute bottom-0 left-0 right-0 z-20 p-8 text-white">
              <div className="max-w-3xl mx-auto text-center">
                <h2 className="text-4xl font-bold mb-4">{slide.title}</h2>
                <p className="text-lg mb-6">{slide.description}</p>
                {/* <button className="bg-white text-black px-6 py-2 rounded-full font-semibold hover:bg-gray-200 transition-colors">
                  {slide.ctaText}
                </button> */}
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default CarouselComponent;