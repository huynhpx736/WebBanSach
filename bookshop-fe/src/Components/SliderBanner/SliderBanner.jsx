import React from 'react';
import Slider from 'react-slick';
import './SliderBanner.css';
import Banner1 from '../../images/banner4.png';
import Banner2 from '../../images/banner6.png';
import Banner3 from '../../images/banner3.jpg';

const SliderBanner = () => {
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
    <div className="slider-banner">
      <Slider {...settings}>
        <div className="slide">
          <img src={Banner1} alt="Banner 1" />
        </div>
        <div className="slide">
          <img src={Banner2} alt="Banner 2" />
        </div>
        <div className="slide">
          <img src={Banner3} alt="Banner 3" />
        </div>
      </Slider>
    </div>
  );
};

export default SliderBanner;
