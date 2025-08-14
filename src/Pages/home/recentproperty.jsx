import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import i1 from "../../assets/images/individual-house.jpg";
import a1 from "../../assets/images/villa1.jpg";
import a2 from "../../assets/images/apartment3.jpg";
import a3 from "../../assets/images/in3.jpg";

const Recentlyadded = () => {
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
      <div className="section">
        <div className="container">
          <h2 className="text-center " style={{ fontSize: "2em" }}>
            Nearby Properties
          </h2>
          <div className="property-carousel" style={{ padding: "15px" }}>
            <Slider {...settings}>
              <div className="property-card" style={{ margin: "0 10px" }}>
                <img
                  src={i1}
                  style={{ width: "100%" }}
                  alt="Property 1"
                />
                <div className="property-info">
                  {/* <div className="property-name">
                    <h3>Individual House</h3>
                    <p>₹389,000</p>
                  </div> */}
                   <div className="homes-content p-2">
                    <h3>
                      <a href="#">Independent House</a>
                    </h3>

                    <ul className="homes-list homes-list1 clearfix mb-2 mt-3">
                    <li className="the-icons mb-3"><span>Rebuild House in 10 Years</span></li>
                    <li className="the-icons">
                        <i className="fa-solid fa-ruler-combined"></i>
                        <span>6000 sq Ft Build Up Area </span>
                      </li>
                    </ul>
                    <ul className="homes-list homes-list1 clearfix pb-1">
                    <a href="javascript:void(0)">
                        <li className="the-icons">
                          <i className="fa fa-map-marker" />
                          <span>Address</span>
                        </li>
                      </a>
                    </ul>
                    <div className="price-properties footer pt-2 pb-0">
                      <p className="bottom_price mb-0">
                        <i
                          className="fa fa-inr"
                          aria-hidden="true"
                          style={{ fontSize: 12 }}
                        />
                        50000000  
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="property-card" style={{ margin: "0 10px" }}>
                <img
                  src={a1}
                  style={{ width: "100%" }}
                  alt="Property 2"
                />
                <div className="property-info">
                  {/* <div className="property-name">
                    <h3>Villa</h3>
                    <p>₹389,000</p>
                  </div> */}
                  <div className="homes-content p-2">
                    <h3>
                      <a href="#">Villa</a>
                    </h3>

                    <ul className="homes-list homes-list1 clearfix mb-2 mt-3">
                    <li className="the-icons mb-3"><span>Brand New Villa in 2025</span></li>
                    <li className="the-icons">
                        <i className="fa-solid fa-ruler-combined"></i>
                        <span>4500 sq Ft Build Up Area </span>
                      </li>
                    </ul>
                    <ul className="homes-list homes-list1 clearfix pb-1">
                    <a href="javascript:void(0)">
                        <li className="the-icons">
                          <i className="fa fa-map-marker" />
                          <span>Nungambakkam</span>
                        </li>
                      </a>
                    </ul>
                    <div className="price-properties footer pt-2 pb-0">
                      <p className="bottom_price mb-0">
                        <i
                          className="fa fa-inr"
                          aria-hidden="true"
                          style={{ fontSize: 12 }}
                        />
                        24500000  
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="property-card" style={{ margin: "0 10px" }}>
                <img
                  src={a2}
                  style={{ width: "100%" }}
                  alt="Property 3"
                />
                <div className="property-info">
                  <div className="homes-content p-2">
                    <h3>
                      <a href="#">Apartment</a>
                    </h3>

                    <ul className="homes-list homes-list1 clearfix mb-2 mt-3">
                    <li className="the-icons mb-3"><span>luxurious Apartment in 2025</span></li>
                    <li className="the-icons">
                        <i className="fa-solid fa-ruler-combined"></i>
                        <span>2000 sq Ft Build Up Area </span>
                      </li>
                    </ul>
                    <ul className="homes-list homes-list1 clearfix pb-1">
                    <a href="javascript:void(0)">
                        <li className="the-icons">
                          <i className="fa fa-map-marker" />
                          <span>Avadi</span>
                        </li>
                      </a>
                    </ul>
                    <div className="price-properties footer pt-2 pb-0">
                      <p className="bottom_price mb-0">
                        <i
                          className="fa fa-inr"
                          aria-hidden="true"
                          style={{ fontSize: 12 }}
                        />
                        15000000  
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="property-card" style={{ margin: "0 10px" }}>
                <img
                  src={a3}
                  style={{ width: "100%" }}
                  alt="Property 4"
                />
                <div className="property-info">
                  <div className="homes-content p-2">
                    <h3>
                      <a href="#">Individual House</a>
                    </h3>

                    <ul className="homes-list homes-list1 clearfix mb-2 mt-3">
                    <li className="the-icons mb-3"><span>Rebuild House in 3.5 Years</span></li>
                    <li className="the-icons">
                        <i className="fa-solid fa-ruler-combined"></i>
                        <span>2600 sq Ft Build Up Area </span>
                      </li>
                    </ul>
                    <ul className="homes-list homes-list1 clearfix pb-1">
                    <a href="javascript:void(0)">
                        <li className="the-icons">
                          <i className="fa fa-map-marker" />
                          <span>Vadapalani</span>
                        </li>
                      </a>
                    </ul>
                    <div className="price-properties footer pt-2 pb-0">
                      <p className="bottom_price mb-0">
                        <i
                          className="fa fa-inr"
                          aria-hidden="true"
                          style={{ fontSize: 12 }}
                        />
                        27500000  
                      </p>
                    </div>
                  </div> 
                </div>
              </div>
            </Slider>
          </div>
        </div>
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

export default Recentlyadded;
