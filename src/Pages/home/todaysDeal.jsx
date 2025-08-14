import React, { useEffect, useState } from "react";
import "../home/homestyle.css";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import sideimage from "../../assets/images/SalesAd/salesAd.jpg";
import "@fortawesome/fontawesome-free/css/all.css";
import { Link } from "react-router-dom";
import i1 from "../../assets/images/individual-house.jpg";
import a1 from "../../assets/images/villa1.jpg";
import a2 from "../../assets/images/apartment3.jpg";
import a3 from "../../assets/images/in3.jpg";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
function TodaysDeal() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
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

  const images = [
    { src: i1, alt: "Individual House", offer: "Plots below 3 Lakhs" },
    { src: a1, alt: "Villa", offer: "Gated Communities" },
    { src: a2, alt: "Apartment", offer: "Individual House below 1 Crore" },
    { src: a3, alt: "Interior", offer: "Villa Starts at 60 Lakhs" },
  ];
  const Property = [
    { src: i1, alt: "Land", offer: "30-60% OFF", title: "Land" },
    { src: a1, alt: "Plot", offer: "30-60% OFF", title: "Plot" },
    { src: a2, alt: "Apartment", offer: "30-60% OFF", title: "Apartment" },
    { src: a3, alt: "Layout", offer: "30-60% OFF", title: "Layout" },
    { src: i1, alt: "House", offer: "30-60% OFF", title: "House" },
    { src: a1, alt: "Commercial", offer: "30-60% OFF", title: "Commercial" },
    {
      src: a2,
      alt: "Apartment Project",
      offer: "30-60% OFF",
      title: "Apartment Project",
    },
  ];
  return (
    <section className="section" style={{ backgroundColor: "#f5f7fb " }}>
      <div className="container">
        <div className="section-head ">
          {/* <Link to={`/property/`}> */}
            <h3 className="mb-3">Today Deal</h3>
          {/* </Link> */}
        </div>
        {/* <div className="row">
          <div className="col-md-6 col-lg-3">
            <div className="agents-grid">
              <div className="landscapes">
                <div className="project-single">
                  <div className="project-img project-head">
                    <div className="homes">
                      <a href="#" className="homes-img">
                        <img
                          src={i1}
                          alt="home-1"
                          className="img-responsive"
                          style={{
                            boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
                            objectFit: "cover",
                          }}
                        />
                      </a>
                    </div>
                  </div>
                  <div className="card-body text-center">
                    <h5 className="card-title">Land</h5>
                    <p className="card-text">30-60% OFF</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-6 col-lg-3">
            <div className="agents-grid">
              <div className="landscapes">
                <div className="project-single">
                  <div className="project-img  project-head">
                    <div className="homes">
                      <a href="#" className="homes-img">
                        <img
                          src={a1}
                          alt="home-1"
                          className="img-responsive"
                          style={{
                            boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
                            objectFit: "cover",
                          }}
                        />
                      </a>
                    </div>
                  </div>
                  <div className="card-body text-center">
                    <h5 className="card-title">Villa</h5>
                    <p className="card-text">30-60% OFF</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-6 col-lg-3">
            <div className="agents-grid">
              <div className="landscapes">
                <div className="project-single">
                  <div className="project-img  project-head">
                    <div className="homes">
                      <a href="#" className="homes-img">
                        <img
                          src={a2}
                          alt="home-1"
                          className="img-responsive"
                          style={{
                            boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
                            objectFit: "cover",
                          }}
                        />
                      </a>
                    </div>
                  </div>
                  <div className="card-body text-center">
                    <h5 className="card-title">Apartment</h5>
                    <p className="card-text">30-60% OFF</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-6 col-lg-3">
            <div className="agents-grid">
              <div className="landscapes">
                <div className="project-single">
                  <div className="project-img  project-head">
                    <div className="homes">
                      <a href="#" className="homes-img">
                        <img
                          src={a3}
                          alt="home-1"
                          className="img-responsive"
                          style={{
                            boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
                            objectFit: "cover",
                          }}
                        />
                      </a>
                    </div>
                  </div>
                  <div className="card-body text-center">
                    <h5 className="card-title">Independent House</h5>
                    <p className="card-text">30-60% OFF</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div> */}
        <Slider {...settings}>
          {Property.map((item, index) => (
            <div key={index} className="">
               <Link to="/properties" state={{ title: item.title }}>
              <div className="m-1">
                <div className="landscapes">
                  <div className="project-single">
                    <div className="project-img project-head">
                      <div className="homes">
                        <a href="#" className="homes-img">
                          <img
                            src={item.src}
                            alt={item.alt}
                            className="img-responsive"
                            style={{
                              boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
                              objectFit: "cover",
                            }}
                          />
                        </a>
                      </div>
                    </div>
                    <div className="card-body text-center">
                      <h5 className="card-title">{item.title} </h5>
                      <p className="card-text">{item.offer} </p>
                    </div>
                  </div>
                </div>
              </div>
              </Link>
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
}

export default TodaysDeal;

// import React, { useEffect, useState } from "react";
// import "../home/homestyle.css";
// import Carousel from "react-multi-carousel";
// import "react-multi-carousel/lib/styles.css";
// import sideimage from "../../assets/images/SalesAd/salesAd.jpg";
// import "@fortawesome/fontawesome-free/css/all.css"
// import { Link } from "react-router-dom";
// import axios from 'axios';
// import API_BASE_URL, { IMG_PATH } from "../../Api/api";
// import Skeleton from 'react-loading-skeleton';
// import 'react-loading-skeleton/dist/skeleton.css';

// function TodaysDeal() {
//   const responsive = {
//     superLargeDesktop: { breakpoint: { max: 4000, min: 3000 }, items: 5 },
//     desktop: { breakpoint: { max: 3000, min: 1200 }, items: 4 },
//     tablet: { breakpoint: { max: 1200, min: 768 }, items: 3 },
//     mobile: { breakpoint: { max: 768, min: 0 }, items: 2 },
//   };
//   const handleNextClick = () => {
//      window.location.href = '/all-properties';
//   };

//   const [landData, setLandData] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetch = async () => {
//       try {
//         const response = await axios.get(`${API_BASE_URL}/webland`, {
//           headers: { 'Pr-Root': 'Land' },
//         });
//         setLandData(response.data);
//       } catch (error) {
//         console.error('Error fetching land data:', error);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetch();
//   }, []);

//   return (
//     <section className="section" style={{ backgroundColor: "#f5f7fb " }}>
//       <div className="container">
//         <div className="section-title ">
//           <h3>Land</h3>
//           <h3>Properties</h3>
//         </div>

//         <div className="row">
//           <div className="col-lg-3 d-none d-lg-block">
//             <img src={sideimage} style={{ height: 332, width: "90%", boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px', objectFit: "cover" }} />
//           </div>
//           <div className="portfolio col-lg-9">
//             <div className="responsive_card">
//               <p className="productdetails_heading MobileViewTitle mb-4"> Todays Deal Properties</p>

//               <Carousel responsive={responsive} itemClass="carousel-item-padding-40"   afterChange={(previousSlide, { currentSlide }) => {
//                     if (currentSlide === 8) {
//                       handleNextClick();
//                     }
//                   }}>
//                 {loading ? (
//                   Array(5)
//                     .fill(0)
//                     .map((_, index) => (
//                       <div className="slick-lancers" key={index}>
//                         <div className="agents-grid">
//                           <div className="landscapes">
//                             <div className="project-single">
//                               <div className="project-inner project-head">
//                                 <div className="homes">
//                                   <Skeleton height={200} />
//                                 </div>
//                               </div>
//                               <div className="homes-content">
//                                 <Skeleton height={15} style={{ marginBottom: '10px' }} />
//                                 <Skeleton height={15} style={{ marginBottom: '5px' }} />
//                                 <Skeleton height={15} style={{ marginBottom: '5px' }} />
//                                 <Skeleton height={15} style={{ marginBottom: '5px' }} />
//                               </div>
//                             </div>
//                           </div>
//                         </div>
//                       </div>
//                     ))
//                 ) : (
//                   landData.slice(0, 8).map((item, index) => {
//                     const urlName = item.project_name.toLowerCase().replace(/ /g, '-');
//                     const urlLocation = item.project_address.toLowerCase().replace(/,/g, '-');

//                     return (
//                       <div className="slick-lancers" key={index}>
//                         <Link to={`/property_details/${urlName}-${urlLocation}/${item.id}`}>
//                           <div className="agents-grid">
//                             <div className="landscapes">
//                               <div className="project-single">
//                                 <div className="project-inner project-head">
//                                   <div className="homes">
//                                     <a href="#" className="homes-img">
//                                       <img
//                                         src={`${IMG_PATH}/property/${item.source_name}`}
//                                         alt="home-1"
//                                         className="img-responsive"
//                                       />
//                                     </a>
//                                   </div>
//                                 </div>
//                                 <div className="homes-content">
//                                   <h3>
//                                     <a href="#">{item.project_name}</a>
//                                   </h3>
//                                   <p className="homes-address mb-2 mt-2">
//                                     <a href="javascript:void(0)">
//                                       <i className="fa fa-map-marker" />
//                                       <span>{item.project_address}</span>
//                                     </a>
//                                   </p>
//                                   <ul className="homes-list homes-list1 clearfix pb-1">
//                                     <li className="the-icons">
//                                       <i className="fa-solid fa-ruler-combined"></i>
//                                       <span>{item.glk_totalarea} {item.glk_totalunit}</span>
//                                     </li>
//                                   </ul>
//                                   <div className="price-properties footer pt-3 pb-0">
//                                     <p className="bottom_price">
//                                       <i className="fa fa-inr" aria-hidden="true" style={{ fontSize: 12 }} />
//                                       {item.admin_centprice} /sq ft
//                                     </p>
//                                   </div>
//                                 </div>
//                               </div>
//                             </div>
//                           </div>
//                         </Link>
//                       </div>
//                     );
//                   })
//                 )}
//               </Carousel>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }

// export default TodaysDeal;

{
  /* <div className="slick-lancers"   >
                  <Link  to={'/property_details'}>
                  <div  className="agents-grid" >
                    <div className="landscapes">
                      <div className="project-single">
                        <div className="project-inner project-head">
                          <div className="homes"> 
                            <div className="homes-tag button alt featured">
                              <img
                                src={dtcp}
                                alt="img" 
                              />
                            </div>
                            <div className="homes-tag button alt sale">
                              11% off
                            </div>
                            <a
                              href="#"
                              className="homes-img"
                            >
                              <img
                                src={p3}
                                alt="home-1"
                                className="img-responsive"
                              />
                            </a>
                          </div>
                        </div>
                  
                        <div className="homes-content"> 
                          <h3>
                            <a href="#">Individual Plot </a>
                          </h3>
                          <p className="homes-address mb-2 mt-2">
                            <a href="javascript:void(0)">
                              <i className="fa fa-map-marker" />
                              <span>Nungambakkam,Chennai.</span>
                            </a>
                          </p>
 
                          <ul className="homes-list  homes-list1 clearfix pb-1">
                            <li className="the-icons">
                            <i class="fa-solid fa-ruler-combined"></i>
                              <span>720 sq ft - 2000 sq ft</span>
                            </li>
                          </ul>
                         
                          <div className="price-properties footer pt-3 pb-0">
                             <p className="bottom_price">
                              <i
                                className="fa fa-inr"
                                aria-hidden="true"
                                style={{ fontSize: 12 }}
                              />
                              1,558/sq ft - &nbsp; 2,500/sq ft
                            </p>
                          </div>
                         
                        </div>
                      </div>
                    </div>
                  </div>
                  </Link>
                </div> */
}
