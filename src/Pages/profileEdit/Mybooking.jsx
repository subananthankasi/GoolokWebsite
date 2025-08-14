import React, { useEffect, useState } from "react";
import img from "../../assets/images/dummyimg.jpg";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ProfileSideBar from "./ProfileSideBar";
import plot from "../../assets/images/villa2.jpg";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { IMG_PATH, LOGIN_BASE_URL } from "../../Api/api";
import { Skeleton } from "primereact/skeleton";

const Mybooking = () => {
  const token = localStorage.getItem("zxcvbnm@#");
  const [bookingData, setBookingData] = useState([]);
  const [loading, setLoading] = useState(true);
  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${LOGIN_BASE_URL}/vendor/mybooking`, {
        headers: {
          Authorization: token,
        },
      });
      setLoading(false);
      setBookingData(response.data);
    } catch (error) {
      setLoading(false);
      console.error("Error during the request:", error);
    }
  };
  useEffect(() => {
    if (token) {
      fetchProducts();
    }
  }, [token]);


  return (
    <>
      <div className="container profile_edit">
        <div className="row w-100">
          <ProfileSideBar />

          <div className="col-md-9 py-5" style={{ paddingTop: 50 }}>
            <div>
              <h6>My Bookings</h6>
              <hr />
            </div>
            {loading ? (
              <>
                <div className="card border-2 p-2 shadow-sm mt-1">
                  <div class="row align-items-center">
                    <div class="col-md-8">
                      <Skeleton width="100%" height="2rem" className="mb-2" />
                      <Skeleton width="100%" height="2rem" className="mb-2" />
                      <Skeleton width="100%" height="2rem" className="mb-2" />
                      <Skeleton width="100%" height="2rem" className="mb-2" />
                      <Skeleton width="100%" height="2rem" className="mb-2" />
                    </div>
                    <div class="col-md-4">
                      <Skeleton width="100%" height="200px" className="mb-2" />
                    </div>
                  </div>
                </div>
                <div className="card border-2 p-2 shadow-sm mt-1">
                  <div class="row align-items-center">
                    <div class="col-md-8">
                      <Skeleton width="100%" height="2rem" className="mb-2" />
                      <Skeleton width="100%" height="2rem" className="mb-2" />
                      <Skeleton width="100%" height="2rem" className="mb-2" />
                      <Skeleton width="100%" height="2rem" className="mb-2" />
                      <Skeleton width="100%" height="2rem" className="mb-2" />
                    </div>
                    <div class="col-md-4">
                      <Skeleton width="100%" height="200px" className="mb-2" />
                    </div>
                  </div>
                </div>
                <div className="card border-2 p-2 shadow-sm mt-1">
                  <div class="row align-items-center">
                    <div class="col-md-8">
                      <Skeleton width="100%" height="2rem" className="mb-2" />
                      <Skeleton width="100%" height="2rem" className="mb-2" />
                      <Skeleton width="100%" height="2rem" className="mb-2" />
                      <Skeleton width="100%" height="2rem" className="mb-2" />
                      <Skeleton width="100%" height="2rem" className="mb-2" />
                    </div>
                    <div class="col-md-4">
                      <Skeleton width="100%" height="200px" className="mb-2" />
                    </div>
                  </div>
                </div>
              </>
            ) : bookingData.length === 0 ? (
              <div className="text-center mt-5">
                {/* <img
                  src={img}
                  alt="No bookings"
                  className="img-fluid"
                  style={{ width: "200px" }}
                /> */}
                <h5 className="mt-3">No Bookings Found</h5>
                <p className="text-muted">
                  You have not made any bookings yet.
                </p>
              </div>
            ) : (
              bookingData.map((item, index) => (
                <div className="Mybooking mt-1" key={index}>
                  <div class="card border-2 p-2 shadow-sm">
                    <div class="row align-items-center">
                      <div class="col-md-8">
                        <h6 class="mb-1 book-title">{item.propertyName}</h6>
                        <div>
                          <p className="book-text mb-1">
                            Rebuild House in 3.5 Years
                          </p>
                          <p className="book-text mb-1">
                            <i class="fa-solid fa-ruler-combined"></i>
                            {item.units}
                          </p>
                          <p className="book-text mb-1">
                            <i class="fa fa-map-marker"></i>
                            {item.taluk},{item.village}
                          </p>
                        </div>
                      </div>
                      <div class="col-md-4">
                        <div class="service-card">
                          <img
                            src={`${IMG_PATH}/enquiry/gallery/${item.image}`}
                            alt=""
                            className="img-fluid"
                            style={{ height: "150px", objectFit: "cover" }}
                          />
                        </div>
                      </div>
                    </div>

                    <div class="row align-items-end">
                      <div class="col-md-8">
                        <div class="d-flex align-items-center">
                          <span
                            class="me-1"
                            style={{ fontSize: "24px", fontWeight: "500" }}
                          >
                            Price:
                          </span>
                          <h5
                            style={{
                              color: "#071a9b",
                              fontSize: "26px",
                              fontWeight: "600",
                            }}
                            class="mb-0 "
                          >
                            {item.price}
                          </h5>
                        </div>
                      </div>
                      <div class="col-md-4">
                        <Link
                          to={`/profile_edit/bookdetails/${item.id}`}
                          style={{
                            fontSize: "16px",
                            textDecoration: "underline",
                            color: "#212529",
                          }}
                        >
                          View More
                          <FontAwesomeIcon icon={faChevronRight} size="sm" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
            {/* <div className="Mybooking">
              <div class="card border-2 p-2 shadow-sm">
                <div class="row align-items-center">
                  <div class="col-md-8">
                    <h6 class="mb-1 book-title">
                      Individual House For Sale in Porur With 2400 Sq.Ft 2BHK -
                      60 X 40.
                    </h6>
                    <div>
                      <p className="book-text mb-1">
                        Rebuild House in 3.5 Years
                      </p>
                      <p className="book-text mb-1">
                        <i class="fa-solid fa-ruler-combined"></i>4500 sq Ft
                        Build Up Area
                      </p>
                      <p className="book-text mb-1">
                        <i class="fa fa-map-marker"></i> Porur
                      </p>
                    </div>
                  </div>
                  <div class="col-md-4">
                    <div class="service-card">
                      <img src={plot} alt="" className="img-fluid" />
                    </div>
                  </div>
                </div>

                <div class="row align-items-end">
                  <div class="col-md-8">
                    <div class="d-flex align-items-center">
                      <span
                        class="me-1"
                        style={{ fontSize: "24px", fontWeight: "500" }}
                      >
                        Price:
                      </span>
                      <h5
                        style={{
                          color: "#071a9b",
                          fontSize: "26px",
                          fontWeight: "600",
                        }}
                        class="mb-0 "
                      >
                        ₹ 40,00,000
                      </h5>
                    </div>
                  </div>
                  <div class="col-md-4">
                    <Link
                      to="/profile_edit/bookdetails"
                      style={{
                        fontSize: "16px",
                        textDecoration: "underline",
                        color: "#212529",
                      }}
                    >
                      View More
                      <FontAwesomeIcon icon={faChevronRight} size="sm" />
                    </Link>
                  </div>
                </div>
              </div>
            </div> */}

            {/* <div className="Mybooking mt-2">
              <div class="card border-2 p-2 shadow-sm">
                <div class="row align-items-center">
                  <div class="col-md-8">
                    <h6 class="mb-1 book-title">
                      Individual House For Sale in Porur With 2400 Sq.Ft 2BHK -
                      60 X 40.
                    </h6>
                    <div>
                      <p className="book-text mb-1">
                        Rebuild House in 3.5 Years
                      </p>
                      <p className="book-text mb-1">
                        <i class="fa-solid fa-ruler-combined"></i>4500 sq Ft
                        Build Up Area
                      </p>
                      <p className="book-text mb-1">
                        <i class="fa fa-map-marker"></i> Porur
                      </p>
                    </div>
                  </div>
                  <div class="col-md-4">
                    <div class="service-card">
                      <img src={plot} alt="" className="img-fluid" />
                    </div>
                  </div>
                </div>

                <div class="row align-items-end">
                  <div class="col-md-8">
                    <div class="d-flex align-items-center">
                      <span
                        class="me-1"
                        style={{ fontSize: "24px", fontWeight: "500" }}
                      >
                        Price:
                      </span>
                      <h5
                        style={{
                          color: "#071a9b",
                          fontSize: "26px",
                          fontWeight: "600",
                        }}
                        class="mb-0 "
                      >
                        ₹ 40,00,000
                      </h5>
                    </div>
                  </div>
                  <div class="col-md-4">
                    <Link
                      to="/profile_edit/bookdetails"
                      style={{
                        fontSize: "16px",
                        textDecoration: "underline",
                        color: "#212529",
                      }}
                    >
                      View More
                      <FontAwesomeIcon icon={faChevronRight} size="sm" />
                    </Link>
                  </div>
                </div>
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default Mybooking;
