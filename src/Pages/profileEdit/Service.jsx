import React, { useEffect, useState } from "react";
import ProfileSideBar from "./ProfileSideBar";
import a1 from "../../assets/images/villa1.jpg";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import axiosInstance from "../../Api/axiosInstance";
import API_BASE_URL from "../../Api/api";
import { ThreeDots } from "react-loader-spinner";
import { Skeleton } from 'primereact/skeleton';
import SearchOffIcon from '@mui/icons-material/SearchOff';
import { Paginator } from 'primereact/paginator';

const Service = () => {
  const [activeTab, setActiveTab] = useState("pending");
  const [getData, setGetData] = useState([])
  const [loading, setLoading] = useState(true)
  const [completeData, setCompleteData] = useState([])


  const fetchInvoice = async () => {
    setLoading(true)
    try {
      const response = await axiosInstance.get(`/vendor/service`, {
        headers: {
          "Level": "progress",
        }
      });
      setGetData(response.data);
      setLoading(false)
    } catch (error) {
      console.error("Error fetching invoice:", error);
    } finally {
      setLoading(false)
    }
  };
  const fetchInvoiceComplete = async () => {
    setLoading(true)
    try {
      const response = await axiosInstance.get(`/vendor/service`, {
        headers: {
          "Level": "live",
        }
      });
      setCompleteData(response.data);
      setLoading(false)
    } catch (error) {
      console.error("Error fetching invoice:", error);
    } finally {
      setLoading(false)
    }
  };
  useEffect(() => {
    fetchInvoice()
    fetchInvoiceComplete()
  }, [])


  const [first, setFirst] = useState(0);
  const [rows, setRows] = useState(3);

  const onPageChange = (event) => {
    setFirst(event.first);
    setRows(event.rows);
  };
  return (
    <>
      <div className="container profile_edit">
        <div className="row w-100">
          <ProfileSideBar />

          <div className="col-md-6 mx-auto py-5" style={{ paddingTop: 50 }}>
            <div>
              <h6 className="text-center"><b> My Services</b> </h6>
              <hr />
            </div>

            <div className=" mt-4">
              <ul className="nav nav-tabs" style={{ borderBottom: "none" }}>
                <li className="nav-item w-50">
                  <button
                    className={`nav-link ${activeTab === "pending" ? "active" : ""
                      } w-100`}
                    onClick={() => setActiveTab("pending")}
                  >
                    Pending
                  </button>
                </li>
                <li className="nav-item w-50">
                  <button
                    className={`nav-link ${activeTab === "completed" ? "active" : ""
                      } w-100`}
                    onClick={() => setActiveTab("completed")}
                  >
                    Completed
                  </button>
                </li>
              </ul>

              <div className="tab-content ">
                {activeTab === "pending" && (
                  <div>
                    {/* {loading ? (

                      <div className="pt-3 ps-3 pe-3">
                        <Skeleton height="12rem" className="mb-2" />
                        <Skeleton height="12rem" className="mb-2" />
                        <Skeleton height="12rem" className="mb-2" />
                      </div>

                    ) : getData && getData.length > 0 ? (
                      getData.map((item) => (
                        <div
                          key={item.id}
                          className="card mt-4 p-2 shadow-sm"
                          style={{
                            boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
                          }}
                        >
 
                          <div className="row align-items-center">
                            <div className="col-8">
                              <h6 className="mb-1" style={{ fontWeight: "600" }}>
                                {item.service_cat}
                              </h6>
                              <p className="p-0 m-0">
                                Customer: <b>{item.customer}</b>
                              </p>

                              <div className="d-flex align-items-center">
                                <span className="me-1" style={{ fontSize: "14px" }}>
                                  Price:
                                </span>
                                <span
                                  className="text-decoration-line-through text-muted me-2"
                                  style={{ fontSize: "14px" }}
                                >
                                  ₹ 4500
                                </span>
                                <h5
                                  className="mb-0"
                                  style={{
                                    color: "#071a9b",
                                    fontSize: "18px",
                                    fontWeight: "600",
                                  }}
                                >
                                  ₹ 4000
                                </h5>
                              </div>

                              <p style={{ marginBottom: "0px", fontSize: "10px" }}>
                                This Price is consultation fee only; extra charges may apply.
                              </p>

                              <ul className="ps-0 service-ul mb-1 mt-1">
                                <li>Patta Transfer</li>
                                <li>Patta Correction</li>
                                <li>Patta Application</li>
                              </ul>

                              <div>
                                <Link
                                  to={`/profile_edit/servicedetails/${item.id}`}
                                  style={{
                                    fontSize: "16px",
                                    textDecoration: "underline",
                                    color: "#212529",
                                  }}
                                >
                                  View More <FontAwesomeIcon icon={faChevronRight} size="sm" />
                                </Link>
                              </div>
                            </div>

                            <div className="col-4">
                              <div className="service-card">
                                <img src={a1} alt="Services" className="img-fluid" />
                              </div>
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="text-center mt-5 pt-5">
                        <h4 className="text-center"><SearchOffIcon sx={{ fontSize: 25 }} /> No data</h4>
                      </div>
                    )} */}

                    {loading ? (
                      <div className="pt-3 ps-3 pe-3">
                        <Skeleton height="12rem" className="mb-2" />
                        <Skeleton height="12rem" className="mb-2" />
                        <Skeleton height="12rem" className="mb-2" />
                      </div>
                    ) : getData && getData.length > 0 ? (
                      <>
                        {getData.slice(first, first + rows).map((item) => (
                          <div
                            key={item.id}
                            className="card mt-4 p-2 shadow-sm"
                            style={{
                              boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
                            }}
                          >

                            <div className="row align-items-center">
                              <div className="col-8">
                                <h6 className="mb-1" style={{ fontWeight: "600" }}>
                                  {item.service_cat}
                                </h6>
                                <p className="p-0 m-0">
                                  Customer: <b>{item.customer}</b>
                                </p>

                                <div className="d-flex align-items-center">
                                  <span className="me-1" style={{ fontSize: "14px" }}>
                                    Price:
                                  </span>
                                  <span
                                    className="text-decoration-line-through text-muted me-2"
                                    style={{ fontSize: "14px" }}
                                  >
                                    ₹ 4500
                                  </span>
                                  <h5
                                    className="mb-0"
                                    style={{
                                      color: "#071a9b",
                                      fontSize: "18px",
                                      fontWeight: "600",
                                    }}
                                  >
                                    ₹ 4000
                                  </h5>
                                </div>

                                <p style={{ marginBottom: "0px", fontSize: "10px" }}>
                                  This Price is consultation fee only; extra charges may apply.
                                </p>

                                <ul className="ps-0 service-ul mb-1 mt-1">
                                  <li>Patta Transfer</li>
                                  <li>Patta Correction</li>
                                  <li>Patta Application</li>
                                </ul>

                                <div>
                                  <Link
                                    to={`/profile_edit/servicedetails/${item.id}`}
                                    style={{
                                      fontSize: "16px",
                                      textDecoration: "underline",
                                      color: "#212529",
                                    }}
                                  >
                                    View More <FontAwesomeIcon icon={faChevronRight} size="sm" />
                                  </Link>
                                </div>
                              </div>

                              <div className="col-4">
                                <div className="service-card">
                                  <img src={a1} alt="Services" className="img-fluid" />
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                        <div className="card mt-3">
                          <Paginator
                            first={first}
                            rows={rows}
                            totalRecords={getData.length}
                            rowsPerPageOptions={[3, 6, 9]}
                            onPageChange={onPageChange}
                          />
                        </div>
                      </>
                    ) : (
                      <div className="text-center mt-5 pt-5">
                        <h4 className="text-center"><SearchOffIcon sx={{ fontSize: 25 }} /> No data</h4>
                      </div>
                    )}

                  </div>


                )}

                {activeTab === "completed" && (
                  <div>
                    {loading ? (
                      <div className="pt-3 ps-3 pe-3">
                        <Skeleton height="12rem" className="mb-2" />
                        <Skeleton height="12rem" className="mb-2" />
                        <Skeleton height="12rem" className="mb-2" />
                      </div>
                    ) : completeData && completeData.length > 0 ? (
                      <>
                        {completeData.slice(first, first + rows).map((item) => (
                          <div
                            key={item.id}
                            className="card mt-4 p-2 shadow-sm"
                            style={{
                              boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
                            }}
                          >

                            <div className="row align-items-center">
                              <div className="col-8">
                                <h6 className="mb-1" style={{ fontWeight: "600" }}>
                                  {item.service_cat}
                                </h6>
                                <p className="p-0 m-0">
                                  Customer: <b>{item.customer}</b>
                                </p>

                                <div className="d-flex align-items-center">
                                  <span className="me-1" style={{ fontSize: "14px" }}>
                                    Price:
                                  </span>
                                  <span
                                    className="text-decoration-line-through text-muted me-2"
                                    style={{ fontSize: "14px" }}
                                  >
                                    ₹ 4500
                                  </span>
                                  <h5
                                    className="mb-0"
                                    style={{
                                      color: "#071a9b",
                                      fontSize: "18px",
                                      fontWeight: "600",
                                    }}
                                  >
                                    ₹ 4000
                                  </h5>
                                </div>

                                <p style={{ marginBottom: "0px", fontSize: "10px" }}>
                                  This Price is consultation fee only; extra charges may apply.
                                </p>

                                <ul className="ps-0 service-ul mb-1 mt-1">
                                  <li>Patta Transfer</li>
                                  <li>Patta Correction</li>
                                  <li>Patta Application</li>
                                </ul>

                                <div>
                                  <Link
                                    to={`/profile_edit/servicedetails/${item.id}`}
                                    style={{
                                      fontSize: "16px",
                                      textDecoration: "underline",
                                      color: "#212529",
                                    }}
                                  >
                                    View More <FontAwesomeIcon icon={faChevronRight} size="sm" />
                                  </Link>
                                </div>
                              </div>

                              <div className="col-4">
                                <div className="service-card">
                                  <img src={a1} alt="Services" className="img-fluid" />
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                        <div className="card mt-3">
                          <Paginator
                            first={first}
                            rows={rows}
                            totalRecords={completeData.length}
                            rowsPerPageOptions={[3, 6, 9]}
                            onPageChange={onPageChange}
                          />
                        </div>
                      </>
                    ) : (
                      <div className="text-center mt-5 pt-5">
                        <h4 className="text-center"><SearchOffIcon sx={{ fontSize: 25 }} /> No data</h4>
                      </div>
                    )}

                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Service