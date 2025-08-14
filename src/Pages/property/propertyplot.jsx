import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import gallery3 from "../../assets/images/land3.jpg";
import gallery4 from "../../assets/images/land4.jpg";

 const Propertyplot = () => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <>
      <h2 className="text-center mt-4 mb-4" style={{ fontSize: "2em" }}>Similar Properties</h2>
      <div
        className="property-carousel"
        style={{ border: "0.3px solid #bbb", padding: "15px" }}
      >
        <Slider {...settings}>
          <div className="property-card" style={{ margin: "0 10px" }}>
            <img src={gallery3} style={{ width: "100%" }} alt="Property 1" />
            <div className="property-info">
              <span className="badge">Waterfront</span>
              <div className="property-name">
                <h3>New Property</h3>
                <p>₹389,000</p>
              </div>
              <div >
                <p style={{ display: "flex", justifyContent: "space-between" }}>Type: <strong>Condos</strong></p>
                <p style={{ display: "flex", justifyContent: "space-between" }}>Size: <strong>1,254 SqFt</strong></p>
                <p style={{ display: "flex", justifyContent: "space-between" }}>Rooms: <strong>2 Beds +  2 Baths</strong></p>
              </div>
            </div>
          </div>
          <div className="property-card" style={{ margin: "0 10px" }}>
            <img src={gallery3} style={{ width: "100%" }} alt="Property 2" />
            <div className="property-info">
              <span className="badge">Golf Course</span>
              <div className="property-name">
                <h3>New Property</h3>
                <p>₹389,000</p>
              </div>
              <div >
                <p style={{ display: "flex", justifyContent: "space-between" }}>Type: <strong>Condos</strong></p>
                <p style={{ display: "flex", justifyContent: "space-between" }}>Size: <strong>1,254 SqFt</strong></p>
                <p style={{ display: "flex", justifyContent: "space-between" }}>Rooms: <strong>1,254 SqFt</strong></p>
              </div>
            </div>
          </div>
          <div className="property-card" style={{ margin: "0 10px" }}>
            <img src={gallery4} style={{ width: "100%" }} alt="Property 3" />
            <div className="property-info">
              <span className="badge">Waterfront</span>
              <div className="property-name">
                <h3>New Property</h3>
                <p>₹389,000</p>
              </div>
              <div >
                <p style={{ display: "flex", justifyContent: "space-between" }}>Type: <strong>Condos</strong></p>
                <p style={{ display: "flex", justifyContent: "space-between" }}>Size: <strong>1,254 SqFt</strong></p>
                <p style={{ display: "flex", justifyContent: "space-between" }}>Rooms: <strong>2 Beds +  2 Baths</strong></p>
              </div>
            </div>
          </div>
          <div className="property-card" style={{ margin: "0 10px" }}>
            <img src={gallery4} style={{ width: "100%" }} alt="Property 4" />
            <div className="property-info">
              <span className="badge">Water Views</span>
              <div className="property-name">
                <h3>New Property</h3>
                <p>₹389,000</p>
              </div>
              <div >
                <p style={{ display: "flex", justifyContent: "space-between" }}>Type: <strong>Condos</strong></p>
                <p style={{ display: "flex", justifyContent: "space-between" }}>Size: <strong>1,254 SqFt</strong></p>
                <p style={{ display: "flex", justifyContent: "space-between" }}>Rooms: <strong>2 Beds +  2 Baths</strong></p>
              </div>
            </div>
          </div>
        </Slider>
      </div>
    </>
  );
};

// Custom arrow components
const SampleNextArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block", background: "black" }}
      onClick={onClick}
    />
  );
};

const SamplePrevArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block", background: "black" }}
      onClick={onClick}
    />
  );
};

export default Propertyplot;
