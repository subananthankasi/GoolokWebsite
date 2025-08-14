import React from "react";
import gallery1 from "../../assets/images/land8.jpg";
import gallery2 from "../../assets/images/land2.jpg";
import gallery3 from "../../assets/images/land3.jpg";
import gallery4 from "../../assets/images/land4.jpg";
import Carousel from "react-multi-carousel";

function Recommended() {
  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 4,
    },
    tablet: {
      breakpoint: { max: 991, min: 464 },
      items: 3,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 2,
    },
  };

  return (
    <div>
      <div className="widget-boxed mt-5">
        <div className="widget-boxed-header mb-2">
          <div className="row">
            <div className="col"><p class="productdetails_heading mb-4">Recommended Insights</p> </div>
            <div className="col-auto"><button className="btn btn-warning ps-4 pe-4">View All</button></div> 
          </div>
  
        </div>
        <div className="widget-boxed-body">
          <div className="slick-lancers">
            <Carousel
              responsive={responsive}
              itemClass="carousel-item-padding-40"
            >
              <div className="agents-grid mr-0">
                <div className="listing-item compact">
                  <a href="#" className="listing-img-container">
                    <div className="listing-img-content">
                      <span className="listing-compact-title">
                        House Plot <i>Nungambakkam</i>
                      </span>
                      <ul className="listing-hidden-content">
                        <li>
                          Area <span>720 sq ft</span>
                        </li>
                        <li>
                          Rs.7,500/ <span>sq ft</span>
                        </li>
                      </ul>
                    </div>
                    <img src={gallery1} alt />
                  </a>
                </div>
              </div>

              <div className="agents-grid mr-0">
                <div className="listing-item compact">
                  <a href="#" className="listing-img-container">
                    <div className="listing-img-content">
                      <span className="listing-compact-title">
                        House Plot <i>Nungambakkam</i>
                      </span>
                      <ul className="listing-hidden-content">
                        <li>
                          Area <span>720 sq ft</span>
                        </li>
                        <li>
                          Rs.7,500/ <span>sq ft</span>
                        </li>
                      </ul>
                    </div>
                    <img src={gallery2} alt />
                  </a>
                </div>
              </div>


              <div className="agents-grid mr-0">
                <div className="listing-item compact">
                  <a href="#" className="listing-img-container">
                    <div className="listing-img-content">
                      <span className="listing-compact-title">
                        House Plot <i>Nungambakkam</i>
                      </span>
                      <ul className="listing-hidden-content">
                        <li>
                          Area <span>720 sq ft</span>
                        </li>
                        <li>
                          Rs.7,500/ <span>sq ft</span>
                        </li>
                      </ul>
                    </div>
                    <img src={gallery3} alt />
                  </a>
                </div>
              </div>


              <div className="agents-grid mr-0">
                <div className="listing-item compact">
                  <a href="#" className="listing-img-container">
                    <div className="listing-img-content">
                      <span className="listing-compact-title">
                        House Plot <i>Nungambakkam</i>
                      </span>
                      <ul className="listing-hidden-content">
                        <li>
                          Area <span>720 sq ft</span>
                        </li>
                        <li>
                          Rs.7,500/ <span>sq ft</span>
                        </li>
                      </ul>
                    </div>
                    <img src={gallery1} alt />
                  </a>
                </div>
              </div>
            </Carousel>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Recommended;
