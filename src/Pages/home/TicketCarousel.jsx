import React from "react";
import { Carousel } from "react-bootstrap";
import b2 from "../../assets/images/offer-banner.jpg";
import b3 from "../../assets/images/offer-banner.jpg"; 

const TicketCarousel = () => {
  return (
    <Carousel indicators={false} controls={false} interval={3000} className="ticket-carousel">
      {/* First Image */}
      <Carousel.Item>
        <div className="ticket-banner">
          <div className="ticket-content">
            <img src={b2} className="d-block w-100" alt="Offer Banner 1" />
          </div>
        </div>
      </Carousel.Item>
      
      {/* Second Image */}
      <Carousel.Item>
        <div className="ticket-banner">
          <div className="ticket-content">
            <img src={b3} className="d-block w-100" alt="Offer Banner 2" />
          </div>
        </div>
      </Carousel.Item>
    </Carousel>
  );
};

export default TicketCarousel;


