import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { DateFormateCustom } from "../../Utils/DateFormateCustom";
import ProfileSideBar from "./ProfileSideBar";
import { Tab, Tabs } from "react-bootstrap";
import { Skeleton } from "primereact/skeleton";
import {
  completePropertyThunk,
  pendingPropertyThunk,
  progressPropertyThunk,
  waitingPropertyThunk,
} from "../../Redux/Action/YourPropertyThunk/YourpropertyThunk";
import { useDispatch, useSelector } from "react-redux";
import SearchOffIcon from "@mui/icons-material/SearchOff";

const YourProperty = ({ activeTab }) => {
  const [activeKey, setActiveKey] = useState("tab1");
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(waitingPropertyThunk());
    dispatch(progressPropertyThunk());
    dispatch(pendingPropertyThunk());
    dispatch(completePropertyThunk());
  }, []);

  const waitingData =
    useSelector((state) => state.yourPropertydata?.waiting?.data) || [];
  const progressData =
    useSelector((state) => state.yourPropertydata?.progress?.data) || [];
  const pendingData =
    useSelector((state) => state.yourPropertydata?.pending?.data) || [];
  const completeData =
    useSelector((state) => state.yourPropertydata?.complete?.data) || [];

  const waitingLoading = useSelector(
    (state) => state.yourPropertydata?.waiting?.loading
  );
  const progressLoading = useSelector(
    (state) => state.yourPropertydata?.progress?.loading
  );
  const pendingLoading = useSelector(
    (state) => state.yourPropertydata?.pending?.loading
  );
  const completeLoading = useSelector(
    (state) => state.yourPropertydata?.complete?.loading
  );

  const handleTabChange = (key) => {
    setActiveKey(key);
    if (key === "tab1") {
      dispatch(waitingPropertyThunk());
    } else if (key === "tab2") {
      dispatch(progressPropertyThunk());
    } else if (key === "tab3") {
      dispatch(pendingPropertyThunk());
    } else if (key === "tab4") {
      dispatch(completePropertyThunk());
    }
  };

  return (
    <>
      <div className="container profile_edit">
        <div className="row w-100">
          <ProfileSideBar />
          <div className="col-md-9 mt-3">
            <Tabs
              defaultActiveKey="tab1"
              id="fill-tab-example"
              className="custom-tabs mb-4"
              fill
              onSelect={handleTabChange}
              activeKey={activeKey}
            >
              <Tab eventKey="tab1" title="Waiting property">
                <section className="mt-4">
                  <div className="continer">
                    <div className="row">
                      {waitingLoading ? (
                        waitingData.length > 0 ? (
                          waitingData.map((_, index) => (
                            <div className="col-lg-6 mb-2" key={index}>
                              <div className="card shadow border-0">
                                <div className="pt-3 ps-3 pe-3">
                                  <Skeleton
                                    height="2rem"
                                    width="50%"
                                    className="mb-2 mt-3"
                                  />
                                  <Skeleton height="2rem" className="mb-1" />
                                  <Skeleton height="2rem" className="mb-1" />
                                  <Skeleton height="2rem" className="mb-1" />
                                  <Skeleton
                                    height="2rem"
                                    width="30%"
                                    className="mt-3 mb-3"
                                  />
                                </div>
                              </div>
                            </div>
                          ))
                        ) : (
                          <div className="col-12 text-center py-5">
                            <p>No data available</p>
                          </div>
                        )
                      ) : waitingData.length > 0 ? (
                        waitingData.map((data, index) => (
                          <div className="col-lg-6 mb-2" key={index}>
                            <div className="card shadow border-0">
                              <div className="pt-3 ps-3 pe-3">
                                <div className="d-flex py-3">
                                  {/* <div
                                    className={`badge badge-pill ${data.status === "waiting"
                                      ? "bg-secondary text-white"
                                      : data.status === "processing"
                                        ? "bg-soft-warning text-warning"
                                        : "bg-soft-success text-success"
                                      }`}
                                    style={{ lineHeight: "2" }}
                                  >
                                    {data.status}
                                  </div> */}
                                  <div
                                    className={`premium-badge ${
                                      data.status === "waiting"
                                        ? "status-waiting"
                                        : data.status === "processing"
                                        ? "status-processing"
                                        : "status-success"
                                    }`}
                                  >
                                    {data.status}
                                  </div>
                                  <div className="ms-auto text-muted">
                                    {DateFormateCustom(data.created_at)}
                                  </div>
                                </div>
                                <span className="text-nowrap text-xs text-muted">
                                  Property ID: {data.propertyid || "ONLND1003"}
                                </span>

                                <div className="row mt-2">
                                  <div className="col-5">
                                    <label>Customer Name:</label>
                                  </div>
                                  <div className="col-7">
                                    <label>{data.customer}</label>
                                  </div>
                                </div>
                                <div className="row mt-2">
                                  <div className="col-5">
                                    <label>Property Type:</label>
                                  </div>
                                  <div className="col-7">
                                    <label>{data.property_type}</label>
                                  </div>
                                </div>
                                <div className="row mt-2">
                                  <div className="col-5">
                                    <label>Sub Property:</label>
                                  </div>
                                  <div className="col-7">
                                    <label>{data.subpro_name}</label>
                                  </div>
                                </div>

                                <hr className="mt-2 mb-3 m-0" />
                                <div className="text-end mb-3">
                                  <Link
                                    to={`/profile_edit/property_status/${data.id}`}
                                    // className="btn1"
                                    className="btn-premium"
                                  >
                                    Your property status
                                  </Link>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="col-12 text-center py-5">
                          <p
                            className="text-muted"
                            style={{ fontSize: "15px" }}
                          >
                            {" "}
                            <SearchOffIcon sx={{ fontSize: 25 }} /> No data
                            found
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </section>
              </Tab>
              <Tab eventKey="tab2" title="Progress property">
                <section className="mt-4">
                  <div className="continer">
                    <div className="row">
                      {progressLoading ? (
                        progressData.length > 0 ? (
                          progressData.map((_, index) => (
                            <div className="col-lg-6 mb-2" key={index}>
                              <div className="card shadow border-0">
                                <div className="pt-3 ps-3 pe-3">
                                  <Skeleton
                                    height="2rem"
                                    width="50%"
                                    className="mb-2 mt-3"
                                  />
                                  <Skeleton height="2rem" className="mb-1" />
                                  <Skeleton height="2rem" className="mb-1" />
                                  <Skeleton height="2rem" className="mb-1" />
                                  <Skeleton
                                    height="2rem"
                                    width="30%"
                                    className="mt-3 mb-3"
                                  />
                                </div>
                              </div>
                            </div>
                          ))
                        ) : (
                          <div className="col-12 text-center py-5">
                            <p className="text-muted">
                              <i className="bi bi-info-circle me-2"></i>
                              No data available
                            </p>
                          </div>
                        )
                      ) : progressData.length > 0 ? (
                        progressData.map((data, index) => (
                          <div className="col-lg-6 mb-2" key={index}>
                            <div className="card shadow border-0">
                              <div className="pt-3 ps-3 pe-3">
                                <div className="d-flex py-3">
                                  {/* <div
                                    className={`badge badge-pill ${
                                      data.status === "progress"
                                        ? "bg-info text-white"
                                        : data.status === "waiting"
                                        ? "bg-soft-warning text-warning"
                                        : "bg-soft-success text-success"
                                    }`}
                                    style={{ lineHeight: "2" }}
                                  >
                                    {data.status}
                                  </div> */}
                                  <div
                                    className={`premium-badge ${
                                      data.status === "waiting"
                                        ? "status-waiting"
                                        : data.status === "progress"
                                        ? "status-processing"
                                        : "status-success"
                                    }`}
                                  >
                                    {data.status}
                                  </div>
                                  <div className="ms-auto text-muted">
                                    {DateFormateCustom(data.created_at)}
                                  </div>
                                </div>
                                <span className="text-nowrap text-xs text-muted">
                                  Property ID: {data.propertyid || "ONLND1003"}
                                </span>

                                <div className="row mt-2">
                                  <div className="col-5">
                                    <label>Customer Name:</label>
                                  </div>
                                  <div className="col-7">
                                    <label>{data.customer}</label>
                                  </div>
                                </div>
                                <div className="row mt-2">
                                  <div className="col-5">
                                    <label>Property Type:</label>
                                  </div>
                                  <div className="col-7">
                                    <label>{data.property_type}</label>
                                  </div>
                                </div>
                                <div className="row mt-2">
                                  <div className="col-5">
                                    <label>Sub Property:</label>
                                  </div>
                                  <div className="col-7">
                                    <label>{data.subpro_name}</label>
                                  </div>
                                </div>

                                <hr className="mt-2 mb-3 m-0" />
                                <div className="text-end mb-3">
                                  <Link
                                    to={`/profile_edit/property_status/${data.id}`}
                                    // className="btn1"
                                    className="btn-premium"
                                  >
                                    Your property status
                                  </Link>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="col-12 text-center py-5">
                          <p
                            className="text-muted"
                            style={{ fontSize: "15px" }}
                          >
                            {" "}
                            <SearchOffIcon sx={{ fontSize: 25 }} /> No data
                            found
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </section>
              </Tab>
              <Tab eventKey="tab3" title="Pending property">
                <section className="mt-4">
                  <div className="containr">
                    <div className="row">
                      {pendingLoading ? (
                        pendingData.length > 0 ? (
                          pendingData.map((_, index) => (
                            <div className="col-lg-6 mb-2" key={index}>
                              <div className="card shadow border-0">
                                <div className="pt-3 ps-3 pe-3">
                                  <Skeleton
                                    height="2rem"
                                    width="50%"
                                    className="mb-2 mt-3"
                                  />
                                  <Skeleton height="2rem" className="mb-1" />
                                  <Skeleton height="2rem" className="mb-1" />
                                  <Skeleton height="2rem" className="mb-1" />
                                  <Skeleton
                                    height="2rem"
                                    width="30%"
                                    className="mt-3 mb-3"
                                  />
                                </div>
                              </div>
                            </div>
                          ))
                        ) : (
                          <div className="col-12 text-center py-5">
                            <p className="text-muted">
                              <i className="bi bi-info-circle me-2"></i>
                              No data available
                            </p>
                          </div>
                        )
                      ) : pendingData.length > 0 ? (
                        pendingData.map((data, index) => (
                          <div className="col-lg-6 mb-2" key={index}>
                            <div className="card shadow border-0">
                              <div className="pt-3 ps-3 pe-3">
                                <div className="d-flex py-3">
                                  <div
                                    className={`badge badge-pill ${
                                      data.status === "pending"
                                        ? "bg-soft-danger text-danger"
                                        : data.status === "waiting"
                                        ? "bg-soft-warning text-warning"
                                        : "bg-soft-success text-success"
                                    }`}
                                    style={{ lineHeight: "2" }}
                                  >
                                    {data.status}
                                  </div>
                                  <div className="ms-auto text-muted">
                                    {DateFormateCustom(data.created_at)}
                                  </div>
                                </div>
                                <span className="text-nowrap text-xs text-muted">
                                  Property ID: {data.propertyId || "ONLND1003"}
                                </span>

                                <div className="row mt-2">
                                  <div className="col-5">
                                    <label>Customer Name:</label>
                                  </div>
                                  <div className="col-7">
                                    <label>{data.customer}</label>
                                  </div>
                                </div>
                                <div className="row mt-2">
                                  <div className="col-5">
                                    <label>Property Type:</label>
                                  </div>
                                  <div className="col-7">
                                    <label>{data.property_type}</label>
                                  </div>
                                </div>
                                <div className="row mt-2">
                                  <div className="col-5">
                                    <label>Sub Property:</label>
                                  </div>
                                  <div className="col-7">
                                    <label>{data.subpro_name}</label>
                                  </div>
                                </div>

                                <hr className="mt-2 mb-3 m-0" />
                                <div className="text-end mb-3">
                                  <Link
                                    to={`/profile_edit/property_status/${data.id}`}
                                    // className="btn1"
                                    className="btn-premium"
                                  >
                                    Your property status
                                  </Link>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="col-12 text-center py-5">
                          <p
                            className="text-muted"
                            style={{ fontSize: "15px" }}
                          >
                            {" "}
                            <SearchOffIcon sx={{ fontSize: 25 }} /> No data
                            found
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </section>
              </Tab>
              <Tab eventKey="tab4" title="Success property">
                <section className="mt-4">
                  <div className="containr">
                    <div className="row">
                      {completeLoading ? (
                        completeData.length > 0 ? (
                          completeData.map((_, index) => (
                            <div className="col-lg-6 mb-2" key={index}>
                              <div className="card shadow border-0">
                                <div className="pt-3 ps-3 pe-3">
                                  <Skeleton
                                    height="2rem"
                                    width="50%"
                                    className="mb-2 mt-3"
                                  />
                                  <Skeleton height="2rem" className="mb-1" />
                                  <Skeleton height="2rem" className="mb-1" />
                                  <Skeleton height="2rem" className="mb-1" />
                                  <Skeleton
                                    height="2rem"
                                    width="30%"
                                    className="mt-3 mb-3"
                                  />
                                </div>
                              </div>
                            </div>
                          ))
                        ) : (
                          <div className="col-12 text-center py-5">
                            <p className="text-muted">
                              <i className="bi bi-info-circle me-2"></i>
                              No data available
                            </p>
                          </div>
                        )
                      ) : completeData.length > 0 ? (
                        completeData.map((data, index) => (
                          <div className="col-lg-6 mb-2" key={index}>
                            <div className="card shadow border-0">
                              <div className="pt-3 ps-3 pe-3">
                                <div className="d-flex py-3">
                                  {/* <div
                                    className={`badge badge-pill ${
                                      data.status === "live"
                                        ? "bg-soft-success text-success"
                                        : data.status === "waiting"
                                        ? "bg-soft-warning text-warning"
                                        : "bg-soft-success text-success"
                                    }`}
                                    style={{ lineHeight: "2" }}
                                  >
                                    Success
                                  </div> */}
                                  <div
                                    className={`premium-badge ${
                                      data.status === "waiting"
                                        ? "status-waiting"
                                        : data.status === "progress"
                                        ? "status-processing"
                                        : "status-success"
                                    }`}
                                  >
                                    {data.status}
                                  </div>
                                  <div className="ms-auto text-muted">
                                    {DateFormateCustom(data.created_at)}
                                  </div>
                                </div>
                                <span className="text-nowrap text-xs text-muted">
                                  Property ID: {data.propertyid || "ONLND1003"}
                                </span>

                                <div className="row mt-2">
                                  <div className="col-5">
                                    <label>Customer Name:</label>
                                  </div>
                                  <div className="col-7">
                                    <label>{data.customer}</label>
                                  </div>
                                </div>
                                <div className="row mt-2">
                                  <div className="col-5">
                                    <label>Property Type:</label>
                                  </div>
                                  <div className="col-7">
                                    <label>{data.property_type}</label>
                                  </div>
                                </div>
                                <div className="row mt-2">
                                  <div className="col-5">
                                    <label>Sub Property:</label>
                                  </div>
                                  <div className="col-7">
                                    <label>{data.subpro_name}</label>
                                  </div>
                                </div>

                                <hr className="mt-2 mb-3 m-0" />
                                <div className="text-end mb-3">
                                  <Link
                                    to={`/profile_edit/property_status/${data.id}`}
                                    // className="btn1"
                                    className="btn-premium"
                                  >
                                    Your property status
                                  </Link>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="col-12 text-center py-5">
                          <p
                            className="text-muted"
                            style={{ fontSize: "15px" }}
                          >
                            {" "}
                            <SearchOffIcon sx={{ fontSize: 25 }} /> No data
                            found
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </section>
              </Tab>
            </Tabs>
          </div>
        </div>
      </div>
    </>
  );
};

export default YourProperty;
