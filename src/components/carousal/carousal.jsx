import React from "react";
import Carousel from "react-bootstrap/Carousel";
import ScrollDown from "../scroll-down/scroll-down-component";

import "./my-carousal.styles.css";

const MyCarousal = ({shouldApplyparticles}) => {
  return (
    <div id="slides">
        <Carousel controls={false}
        indicators
        interval={2500}
        pause={false}
        fade  // Add the fade property to enable the fade effect
        nextLabel=""
        prevLabel="" className="carousel-container">
        <Carousel.Item>
          <img className="d-block w-100 custom-img" src={'/assets/background3.jpg'} alt="" />
        </Carousel.Item>
        <Carousel.Item>
          <img className="d-block w-100 custom-img" src={'/assets/1719370.jpg'} alt="" />
        </Carousel.Item>
        <Carousel.Item>
          <img className="d-block w-100 custom-img" src={'/assets/background2.jpeg'} alt="" />
        </Carousel.Item>
      </Carousel>
    </div>
  );
};

export default MyCarousal;
