// import React, { useEffect, useState } from "react";
// import "../home/homestyle.css";
// import Carousel from "react-multi-carousel";
// import "react-multi-carousel/lib/styles.css";
// import sideimage from "../../assets/images/SalesAd/salesAd.jpg";
// import "@fortawesome/fontawesome-free/css/all.css";
// import { Link } from "react-router-dom";
// import i1 from "../../assets/images/in1.jpg";
// import a1 from "../../assets/images/apart1.jpg";
// import a2 from "../../assets/images/apart2.jpg";
// import a3 from "../../assets/images/apart3.jpg";
// import a4 from "../../assets/images/apart4.jpg";

// function IndividualHouse() {
//   return (
//     <section className="section" style={{ backgroundColor: "#f5f7fb " }}>
//       <div className="container">
//         <div className="section-title ">
//         <Link to={`/property/`}>
//         <h3>Individual</h3>
//         <h3>House</h3>
//         </Link>
//         </div>

//         <div className="row">
//           <div className="col-md-6 col-lg-3">
//             <div className="agents-grid">
//               <div className="landscapes">
//                 <div className="project-single">
//                   <div className="project-inner project-head">
//                     <div className="homes">
//                       <a href="#" className="homes-img">
//                         <img
//                           src={i1}
//                           alt="home-1"
//                           className="img-responsive"
//                           style={{
//                             boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
//                             objectFit: "cover",
//                           }}
//                         />
//                       </a>
//                     </div>
//                   </div>
//                   <div className="homes-content">
//                     <h3>
//                       <a href="#">Name</a>
//                     </h3>
//                     <ul className="homes-list homes-list1 clearfix mb-2 mt-2">
//                       <a href="javascript:void(0)">
//                         <li className="the-icons">
//                           <i className="fa fa-map-marker" />
//                           <span>Address</span>
//                         </li>
//                       </a>
//                     </ul>
//                     <ul className="homes-list homes-list1 clearfix pb-1">
//                       <li className="the-icons">
//                         <i className="fa-solid fa-ruler-combined"></i>
//                         <span>600sq Ft </span>
//                       </li>
//                     </ul>
//                     <div className="price-properties footer pt-3 pb-0">
//                       <p className="bottom_price">
//                         <i
//                           className="fa fa-inr"
//                           aria-hidden="true"
//                           style={{ fontSize: 12 }}
//                         />
//                         1223000 /sq ft
//                       </p>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//           <div className="col-md-6 col-lg-3">
//             <div className="agents-grid">
//               <div className="landscapes">
//                 <div className="project-single">
//                   <div className="project-inner project-head">
//                     <div className="homes">
//                       <a href="#" className="homes-img">
//                         <img
//                           src={a1}
//                           alt="home-1"
//                           className="img-responsive"
//                           style={{
//                             boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
//                             objectFit: "cover",
//                           }}
//                         />
//                       </a>
//                     </div>
//                   </div>
//                   <div className="homes-content">
//                     <h3>
//                       <a href="#">Name</a>
//                     </h3>
//                     <ul className="homes-list homes-list1 clearfix mb-2 mt-2">
//                       <a href="javascript:void(0)">
//                         <li className="the-icons">
//                           <i className="fa fa-map-marker" />
//                           <span>Address</span>
//                         </li>
//                       </a>
//                     </ul>
//                     <ul className="homes-list homes-list1 clearfix pb-1">
//                       <li className="the-icons">
//                         <i className="fa-solid fa-ruler-combined"></i>
//                         <span>600sq Ft </span>
//                       </li>
//                     </ul>
//                     <div className="price-properties footer pt-3 pb-0">
//                       <p className="bottom_price">
//                         <i
//                           className="fa fa-inr"
//                           aria-hidden="true"
//                           style={{ fontSize: 12 }}
//                         />
//                         1223000 /sq ft
//                       </p>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//           <div className="col-md-6 col-lg-3">
//             <div className="agents-grid">
//               <div className="landscapes">
//                 <div className="project-single">
//                   <div className="project-inner project-head">
//                     <div className="homes">
//                       <a href="#" className="homes-img">
//                         <img
//                           src={a2}
//                           alt="home-1"
//                           className="img-responsive"
//                           style={{
//                             boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
//                             objectFit: "cover",
//                           }}
//                         />
//                       </a>
//                     </div>
//                   </div>
//                   <div className="homes-content">
//                     <h3>
//                       <a href="#">Name</a>
//                     </h3>
//                     <ul className="homes-list homes-list1 clearfix mb-2 mt-2">
//                       <a href="javascript:void(0)">
//                         <li className="the-icons">
//                           <i className="fa fa-map-marker" />
//                           <span>Address</span>
//                         </li>
//                       </a>
//                     </ul>
//                     <ul className="homes-list homes-list1 clearfix pb-1">
//                       <li className="the-icons">
//                         <i className="fa-solid fa-ruler-combined"></i>
//                         <span>600sq Ft </span>
//                       </li>
//                     </ul>
//                     <div className="price-properties footer pt-3 pb-0">
//                       <p className="bottom_price">
//                         <i
//                           className="fa fa-inr"
//                           aria-hidden="true"
//                           style={{ fontSize: 12 }}
//                         />
//                         1223000 /sq ft
//                       </p>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//           <div className="col-md-6 col-lg-3">
//             <div className="agents-grid">
//               <div className="landscapes">
//                 <div className="project-single">
//                   <div className="project-inner project-head">
//                     <div className="homes">
//                       <a href="#" className="homes-img">
//                         <img
//                           src={a3}
//                           alt="home-1"
//                           className="img-responsive"
//                           style={{
//                             boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
//                             objectFit: "cover",
//                           }}
//                         />
//                       </a>
//                     </div>
//                   </div>
//                   <div className="homes-content">
//                     <h3>
//                       <a href="#">Name</a>
//                     </h3>
//                     <ul className="homes-list homes-list1 clearfix mb-2 mt-2">
//                       <a href="javascript:void(0)">
//                         <li className="the-icons">
//                           <i className="fa fa-map-marker" />
//                           <span>Address</span>
//                         </li>
//                       </a>  
//                     </ul>
//                     <ul className="homes-list homes-list1 clearfix pb-1">
//                       <li className="the-icons">
//                         <i className="fa-solid fa-ruler-combined"></i>
//                         <span>600sq Ft </span>
//                       </li>
//                     </ul>
//                     <div className="price-properties footer pt-3 pb-0">
//                       <p className="bottom_price">
//                         <i
//                           className="fa fa-inr"
//                           aria-hidden="true"
//                           style={{ fontSize: 12 }}
//                         />
//                         1223000 /sq ft
//                       </p>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }

// export default IndividualHouse;


import React from 'react';
import coupen from "../../assets/images/coupon.png";

const Coupons = () => {
  return (
    <section className="section">
      <div className="container text-center">
        <h2 className="section-head mb-3">Coupons Corner</h2>

        <div className="row">
          {/* Card 1 */}
          <div className="col-md-6 col-lg-3 mb-2">
            <div className="card winter-card" style={{ border: "none", backgroundColor: "none" }}>
              <img src={coupen} alt="New Winterwear Drip" style={{ objectFit: "fill" }} className="card-img-top" />
            </div>
          </div>

          {/* Card 2 */}
          <div className="col-md-6 col-lg-3 mb-2">
            <div className="card winter-card" style={{ border: "none", backgroundColor: "none" }}>
              <img src={coupen} alt="Sweatshirts, Hoodies" style={{ objectFit: "fill" }} className="card-img-top" />
            </div>
          </div>

          {/* Card 3 */}
          <div className="col-md-6 col-lg-3 mb-2">
            <div className="card winter-card" style={{ border: "none", backgroundColor: "none" }}>
              <img src={coupen} alt="Jackets, Coats & Shrugs" style={{ objectFit: "fill" }} className="card-img-top" />
            </div>
          </div>

          {/* Card 4 */}
          <div className="col-md-6 col-lg-3 mb-2">
            <div className="card winter-card" style={{ border: "none", backgroundColor: "none" }}>
              <img src={coupen} alt="Blazer & Waistcoats" style={{ objectFit: "fill" }} className="card-img-top" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Coupons;

