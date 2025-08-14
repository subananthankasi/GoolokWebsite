import React, { useEffect, useState } from "react";
import { Row, Col, Card } from "react-bootstrap";
import gallery3 from "../../assets/images/land3.jpg";
import gallery4 from "../../assets/images/land4.jpg";
import CustomPagination from "../gridview/pagination";
import a2 from "../../assets/images/apartment3.jpg";
import SidebarFilter from "../gridview/sidebarfilter";
import { Link } from "react-router-dom";
import axios from "axios";
import API_BASE_URL, { IMG_PATH } from "../../Api/api";
import { Skeleton } from "primereact/skeleton";
function MapView({ propertyData, loading, prRoot }) {
  const products = propertyData ? propertyData : [];


  return (
    <>
      <div className="section">
        <div className="container">
          <div className="row d-flex justify-content-between align-items-center mb-4">
            <div className=" col-md-5 pe-0">
              {/* <h2>Apartments</h2> */}
              <h2>All Properties</h2>
            </div>
            <div className=" col-md-7  ">
              <div className="d-flex align-items-center justify-content-end">
                <div className="me-3">
                  <Link
                    // to="/properties"
                    to="/properties"
                    {...(prRoot ? { state: { title: prRoot } } : {})}
                    className="btn"
                    style={{ backgroundColor: "#2b2e3a", color: "white" }}
                  >
                    Grid View
                  </Link>
                </div>
                <label
                  className="mb-0 me-2 d-none d-lg-block"
                  style={{ whiteSpace: "nowrap" }}
                >
                  Sort By:
                </label>
                <select className="form-select w-auto d-none d-lg-block">
                  <option value="relevance">Relevance</option>
                  <option value="price-low-to-high">Price: Low to High</option>
                  <option value="price-high-to-low">Price: High to Low</option>
                </select>
              </div>
            </div>
          </div>
          <Row className="grid-scroll">
            <div className="product-grid">
              <div className="row">
                {loading ? (
                  <>
                    <div className="col-md-12 col-lg-6 ">
                      <div className="project-single">
                        <Skeleton
                          height="410px"
                          width="100%"
                          className="mb-1 "
                        />
                      </div>
                    </div>
                    <div className="col-md-12 col-lg-6 ">
                      <div className="project-single">
                        <Skeleton
                          height="410px"
                          width="100%"
                          className="mb-1 "
                        />
                      </div>
                    </div>
                  </>
                ) : products?.length > 0 ? (
                  products.map((product) => (
                    <div className="col-md-12 col-lg-6" key={product.id}>
                      <Link
                        to={`/property/${product.id}/${product.propertyType}`}
                      >
                        <div className="project-grid">
                          <div className="landscapes">
                            <div className="project-single">
                              <div className=" product-img">
                                <div className="homes">
                                  <a href="#" className="homes-img">
                                    <img
                                      src={`${IMG_PATH}enquiry/gallery/${product.image}`}
                                      alt="home-1"
                                      className="img-responsive"
                                      style={{
                                        boxShadow:
                                          "rgba(0, 0, 0, 0.35) 0px 5px 15px",
                                        objectFit: "cover",
                                        height: "250px",
                                      }}
                                    />
                                  </a>
                                </div>
                              </div>
                              <div className="homes-content">
                                <h3>
                                  <a href="#">{product.landType}</a>
                                </h3>

                                <ul className="homes-list homes-list1 clearfix mb-2 mt-3">
                                  <li className="the-icons mb-3">
                                    <span>{product.propertyName}</span>
                                  </li>
                                  <li className="the-icons">
                                    <i className="fa-solid fa-ruler-combined"></i>
                                    <span>{product.units} </span>
                                  </li>
                                </ul>
                                <ul className="homes-list homes-list1 clearfix pb-1">
                                  <a href="javascript:void(0)">
                                    <li className="the-icons">
                                      <i className="fa fa-map-marker" />
                                      <span>
                                        {product.village} ,{product.taluk}
                                      </span>
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
                                    {product.price}
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </Link>
                    </div>
                  ))
                ) : (
                  <div
                    className="d-flex justify-content-center align-items-center"
                    style={{ height: "50vh" }}
                  >
                    <h6 className="text-center m-0">No data</h6>
                  </div>
                )}
              </div>
            </div>
          </Row>
          {/* <div className="text-center mb-3 mt-3">
            <CustomPagination />
          </div> */}
        </div>
      </div>
    </>
  );
}

export default MapView;
