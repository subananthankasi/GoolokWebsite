import React, { useState, useEffect, useRef } from "react";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Accordion } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Message } from "primereact/message";
import { FileUpload } from "primereact/fileupload";
import axiosInstance from "../../Api/axiosInstance";
import { useAlert } from "react-alert";
import axios from "axios";
import { IMG_PATH, LOGIN_BASE_URL } from "../../Api/api";
import DownloadIcon from "@mui/icons-material/Download";
import { DateFormateCustom } from "../../Utils/DateFormateCustom";
import { Empty } from "antd";
import { Timeline } from "antd";
import { Button } from 'primereact/button';
        

const TimeLineAccordian = ({ statusData }) => {

  const steps = [
    {
      title:
        statusData?.bid === null
          ? "Waiting For Your Booking."
          : "Your Property Is Successfully Booked",
      completed:
        statusData?.tracker == 1
          ? true
          : statusData?.tracker == 2
          ? true
          : statusData?.tracker == 3
          ? true
          : statusData?.tracker == 4
          ? true
          : statusData?.tracker == 5
          ? true
          : false,
    },
    {
      title: "Your Payment Schedule",
      details: (
        <YourPaymentSchedule
          paymentData={statusData?.payment}
          statusData={statusData}
          sheduleData={statusData?.schedule}
        />
      ),
      completed:
        statusData?.tracker == 2
          ? true
          : statusData?.tracker == 3
          ? true
          : statusData?.tracker == 4
          ? true
          : statusData?.tracker == 5
          ? true
          : false,
    },
    {
      title: "Registration Date",
      details: <RegistrationDate regData={statusData?.regDate} />,
      completed:
        statusData?.tracker == 3
          ? true
          : statusData?.tracker == 4
          ? true
          : statusData?.tracker == 5
          ? true
          : false,
    },
    {
      title: "Registration",
      details: <Registration regData={statusData?.registration} />,
      completed:
        statusData?.tracker == 4
          ? true
          : statusData?.tracker == 5
          ? true
          : false,
    },
    {
      title: "Your Property Documents",
      details: <YourPropertyDocuments docData={statusData?.prop_doc} />,
      completed: statusData?.tracker == 5 ? true : false,
    },
  ];

  const timelineRef = useRef(null);

  // const lastCompletedIndex = steps
  //   .map((step) => step.completed)
  //   .lastIndexOf(true);

  // useEffect(() => {
  //   if (timelineRef.current) {
  //     const lastCompletedStep = document.getElementById(
  //       `step-${lastCompletedIndex}`
  //     );
  //     if (lastCompletedStep) {
  //       timelineRef.current.style.height = `${
  //         lastCompletedStep.offsetTop + lastCompletedStep.offsetHeight / 2
  //       }px`;
  //     }
  //   }
  // }, [lastCompletedIndex]);

  //  const timelineRef = useRef(null);

  const lastCompletedIndex = steps
    .map((step) => step.completed)
    .lastIndexOf(true);

  useEffect(() => {
    if (!timelineRef.current) return;

    const updateTimelineHeight = () => {
      const lastCompletedStep = document.getElementById(
        `step-${lastCompletedIndex}`
      );
      if (lastCompletedStep) {
        const header = lastCompletedStep.querySelector(".accordion-header");
        const body = lastCompletedStep.querySelector(".accordion-body");

        const headerHeight = header?.offsetHeight || 0;
        const bodyHeight = body?.offsetHeight || 0;
        const isExpanded = body?.style.display !== "none";

        const height =
          lastCompletedStep.offsetTop +
          headerHeight +
          (isExpanded ? bodyHeight : headerHeight / 2) -
          50;

        timelineRef.current.style.height = `${height}px`;
      }
    };

    updateTimelineHeight();

    const resizeObserver = new ResizeObserver(() => {
      updateTimelineHeight();
    });

    const stepElements = document.querySelectorAll('[id^="step-"]');
    stepElements.forEach((el) => resizeObserver.observe(el));

    return () => {
      stepElements.forEach((el) => resizeObserver.unobserve(el));
      resizeObserver.disconnect();
    };
  }, [lastCompletedIndex, steps.length]);
  return (
    <div className=" mt-4">
      <h5>Status</h5>
      {/* <div className="position-relative ps-3">
        <div
          ref={timelineRef}
          className="position-absolute  bg-success"
          style={{
            width: "6px",
            top: "10px",
            left: "12px",
            height: "200px !important",
            transition: "height 0.3s ease-in-out",
          }}
        ></div>

        <Accordion defaultActiveKey="0">
          {steps.map((step, index) => (
            <div
              key={index}
              className="position-relative ps-4 mb-3"
              id={`step-${index}`}
            >
              <span
                className={`position-absolute start-0 translate-middle rounded-circle border border-white ${
                  step.completed ? "bg-success" : "bg-danger"
                }`}
                style={{
                  width: "15px",
                  height: "15px",
                  top: "10px",
                  left: "7px",
                }}
              ></span>

              <Accordion.Item eventKey={index.toString()}>
                <Accordion.Header>{step.title}</Accordion.Header>
                <Accordion.Body>{step.details}</Accordion.Body>
              </Accordion.Item>
            </div>
          ))}
        </Accordion>

        <Link
          to="/profile_edit/mybooking"
          style={{
            fontSize: "16px",
            textDecoration: "underline",
            color: "#212529",
          }}
        >
          See All Updates
          <FontAwesomeIcon icon={faChevronRight} size="sm" />
        </Link>
      </div> */}
      <div className="mt-4">
        <div className="position-relative ps-3" style={{ paddingBottom: "0" }}>
          <div
            className="position-absolute bg-secondary"
            style={{
              width: "6px",
              top: "10px",
              left: "12px",
              bottom: "40px",
              // height: "0"
            }}
          ></div>

          <div
            ref={timelineRef}
            className="position-absolute bg-success"
            style={{
              width: "6px",
              top: "10px",
              left: "12px",
              height: "0px",
              bottom: "40px",
              transition: "height 0.3s ease-in-out",
            }}
          ></div>

          <Accordion>
            {steps.map((step, index) => (
              <div
                key={index}
                className="position-relative ps-4 mb-3"
                id={`step-${index}`}
              >
                <span
                  className={`position-absolute start-0 translate-middle rounded-circle border border-white ${
                    step.completed ? "bg-success" : "bg-secondary"
                  }`}
                  style={{
                    width: "15px",
                    height: "15px",
                    top: "10px",
                    left: "7px",
                    zIndex: 1,
                    border: "2px solid #6c757d",
                    ...(step.completed && { borderColor: "#198754" }),
                  }}
                ></span>

                <Accordion.Item key={index} eventKey={index.toString()}>
                  <Accordion.Header
                    style={{
                      ...(index === 0
                        ? { pointerEvents: "none", opacity: 0.6 }
                        : {}),
                    }}
                  >
                    {step.title}
                  </Accordion.Header>
                  <Accordion.Body className="p-0">
                    {step.details}
                  </Accordion.Body>
                </Accordion.Item>
              </div>
            ))}
          </Accordion>
        </div>
      </div>
    </div>
  );
};

export default TimeLineAccordian;

const YourPaymentSchedule = ({ paymentData, statusData, sheduleData }) => {
  const alert = useAlert();
  const onUploadHandler = async (event) => {
    const payload = {
      enqid: statusData?.enqid,
      vacantid: statusData?.id,
      bookingid: statusData?.bid,
      invoice: event.files[0],
    };

    try {
      const response = await axiosInstance.post("/vendor/mybooking", payload, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      fetchInvoiceDoc(statusData?.bid);
      alert.success("Your document has been uploaded successfully!");
    } catch (error) {
      alert.error("Failed to send your document. Please try again later!");
    }
  };

  const [docData, setDocData] = useState([]);
  const fetchInvoiceDoc = async (bid) => {
    try {
      const response = await axiosInstance.get(`vendor/mybooking/${bid}/edit`);
      setDocData(response.data);
    } catch (error) {
      console.error("Error during the request:", error);
    }
  };
  useEffect(() => {
    if (statusData?.bid) {
      fetchInvoiceDoc(statusData?.bid);
    }
  }, [statusData]);


  const fileInputRef = useRef(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  const handleClick = async () => {
    if (!selectedFile) {
      const input = document.createElement("input");
      input.type = "file";
      input.accept = "application/pdf,image/*";
      input.onchange = (e) => {
        const file = e.target.files[0];
        if (file) {
          setSelectedFile(file);
        }
      };
      input.click();
    } else {
      // Second click → upload file
      const payload = new FormData();
      payload.append("enqid", statusData?.enqid);
      payload.append("vacantid", statusData?.id);
      payload.append("bookingid", statusData?.bid);
      payload.append("invoice", selectedFile);

      setUploading(true);
      const response = await axiosInstance
        .post("/vendor/mybooking", payload, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then(() => {
          fetchInvoiceDoc(statusData?.bid);
          alert.success("Document uploaded successfully!");
          setSelectedFile(null);
        })
        .catch(() => {
          alert.error("Upload failed! Please try again.");
        })
        .finally(() => {
          setUploading(false);
        });
    }
  };
  return (
    <>
      {paymentData === null ? (
        <div className="text-center m-3">
          <Message
            severity="error"
            text="No payment details available."
            className="text-center"
          />
        </div>
      ) : (
        <>
          <div>
            <div className="price-box">
              <div className="d-flex align-items-center justify-content-between gap-3">
                <div>
                  <p className="fw-bold mb-0">Booking Id:</p>
                </div>

                <div className="fw-bold">
                  <p className="mb-0"> {paymentData?.book_id}</p>
                </div>
              </div>
            </div>
            <div className="price-box">
              <div className="d-flex align-items-center justify-content-between gap-3">
                <div>
                  <p className="fw-bold mb-0">Total Land Extent:</p>
                </div>

                <div className="fw-bold">
                  <p className="mb-0"> {paymentData?.land_extent}</p>
                </div>
              </div>
            </div>
            <div className="price-box">
              <div className="d-flex align-items-center justify-content-between gap-3">
                <div>
                  <p className="fw-bold mb-0">Price per unit:</p>
                </div>

                <div className="fw-bold">
                  <p className="mb-0"> ₹ {paymentData?.price_unit}</p>
                </div>
              </div>
            </div>
            <div className="price-box">
              <div className="d-flex align-items-center justify-content-between gap-3">
                <div>
                  <p className="fw-bold mb-0">Total Property Cost:</p>
                </div>

                <div className="fw-bold">
                  <p className="mb-0">₹ {paymentData?.prop_cost}</p>
                </div>
              </div>
            </div>
            <div className="price-box">
              <div className="d-flex align-items-center justify-content-between gap-3">
                <div>
                  <p className="fw-bold mb-0">Offers & Discount:</p>
                </div>

                <div className="fw-bold">
                  <p className="mb-0">₹ {paymentData?.discount}</p>
                </div>
              </div>
            </div>
            <div className="price-box">
              <div className="d-flex align-items-center justify-content-between gap-3">
                <div>
                  <p className="fw-bold mb-0">
                    Total Amount Payable (After discount):
                  </p>
                </div>

                <div className="fw-bold">
                  <p className="mb-0">₹ {paymentData?.amt_payable}</p>
                </div>
              </div>
            </div>
            <div className="price-box">
              <div className="d-flex align-items-center justify-content-between gap-3">
                <div>
                  <p className="fw-bold mb-0">Advance Paid:</p>
                </div>

                <div className="fw-bold">
                  <p className="mb-0">₹ {paymentData?.adv_paid}</p>
                </div>
              </div>
            </div>
            <div className="price-box">
              <div className="d-flex align-items-center justify-content-between gap-3">
                <div>
                  <p className="fw-bold mb-0">Balance Payable:</p>
                </div>

                <div className="fw-bold">
                  <p className="mb-0">₹ {paymentData?.bal_payable}</p>
                </div>
              </div>
            </div>
          </div>
          <hr />
          {paymentData?.pay_option !== "Ready Cash" && sheduleData && (
            <table class="table table-bordered">
              <thead>
                <tr>
                  <th className="text-center">Payment Schedule</th>
                  <th>Percentage of amount</th>
                  <th>Payable Amount</th>
                  <th>Balance Payable</th>
                </tr>
              </thead>
              <tbody>
                {sheduleData?.map((item, index) => (
                  <tr key={index}>
                    <td className="text-center">{item.sched_days} </td>
                    <td className="text-center">{item.pct_amt}% </td>
                    <td className="text-center">{item.amt_payable} </td>
                    <td className="text-center">
                      {DateFormateCustom(item.pay_date)}{" "}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {docData?.length > 0 && (
            <div className="row px-5 py-4">
              {docData?.map((item, index) => {
                const fileUrl = `${IMG_PATH}payment/${item.invoice_doc}`;
                const fileExtension = item?.invoice_doc
                  ?.split(".")
                  .pop()
                  .toLowerCase();

                return (
                  <div className="col-3 mt-1" key={index}>
                    {item?.invoice_doc ? (
                      <div
                        className="card"
                        style={{ width: "100px", height: "100px" }}
                      >
                        {fileExtension === "pdf" ? (
                          <div
                            className="pdf-wrapper "
                            onClick={() =>
                              window.open(
                                `${IMG_PATH}payment/${item.invoice_doc}`,
                                "_blank"
                              )
                            }
                          >
                            <embed
                              src={`${IMG_PATH}payment/${item.invoice_doc}#toolbar=0&navpanes=0&scrollbar=0`}
                              className="pdf-hidden-scroll"
                              type="application/pdf"
                            />
                          </div>
                        ) : (
                          <img
                            src={fileUrl}
                            alt="invoice"
                            className="rounded"
                            style={{
                              width: "100px",
                              height: "100px",
                              objectFit: "cover",
                              cursor: "pointer",
                            }}
                            onClick={() =>
                              window.open(
                                `${IMG_PATH}payment/${item.invoice_doc}`,
                                "_blank"
                              )
                            }
                          />
                        )}
                      </div>
                    ) : null}
                  </div>
                );
              })}
            </div>
          )}

          <p className="text-center">
            Below click and upload your payment image or pdf..!
          </p>
          <div className="mt-3 mb-3 text-center">
            {/* <FileUpload
              mode="basic"
              name="file"
              url={axiosInstance+"/vendor/mybooking"}
              accept="application/pdf,image/*"
              maxFileSize={1000000}
              onUpload={onUploadHandler}
              chooseLabel="Upload"
              className="custom-upload-button"
            /> */}
            {/* <button className="btn1" onClick={handleClick} disabled={uploading}>
              {uploading
                ? "Uploading..."
                : selectedFile
                ? selectedFile.name
                : "Upload"}
            </button> */}
            <Button
              label={
                uploading
                  ? "Uploading..."
                  : selectedFile
                  ? selectedFile.name
                  : "Upload"
              }
              icon="pi pi-upload"
              onClick={handleClick}
              className="custom-upload-button"
            />
          </div>
        </>
      )}
    </>
  );
};

const RegistrationDate = ({ regData }) => {
  return (
    <>
      {regData === null ? (
        <div className="mt-3 mb-3">
          <Empty />
        </div>
      ) : (
        <div>
          <div className="price-box">
            <div className="d-flex align-items-center justify-content-between gap-3">
              <div>
                <p className="fw-bold mb-0">Registration Date:</p>
              </div>

              <div className="fw-bold">
                <p className="mb-0"> {DateFormateCustom(regData?.reg_date)}</p>
              </div>
            </div>
          </div>
          <div className="price-box">
            <div className="d-flex align-items-center justify-content-between gap-3">
              <div>
                <p className="fw-bold mb-0">Registration Time:</p>
              </div>

              <div className="fw-bold">
                <p className="mb-0"> {regData?.reg_time}</p>
              </div>
            </div>
          </div>
          <div className="price-box">
            <div className="d-flex align-items-center justify-content-between gap-3">
              <div>
                <p className="fw-bold mb-0">Registration ID:</p>
              </div>

              <div className="fw-bold">
                <p className="mb-0"> {regData?.reg_id}</p>
              </div>
            </div>
          </div>
          <div className="price-box">
            <div className="d-flex align-items-center justify-content-between gap-3">
              <div>
                <p className="fw-bold mb-0">SRO:</p>
              </div>

              <div className="fw-bold">
                <p className="mb-0"> {regData?.sro_title}</p>
              </div>
            </div>
          </div>
          <div className="price-box">
            <div className="d-flex align-items-center justify-content-between gap-3">
              <div>
                <p className="fw-bold mb-0">District:</p>
              </div>

              <div className="fw-bold">
                <p className="mb-0">{regData?.districtName}</p>
              </div>
            </div>
          </div>
          <div className="price-box">
            <div className="d-flex align-items-center justify-content-between gap-3">
              <div>
                <p className="fw-bold mb-0">Taluk:</p>
              </div>

              <div className="fw-bold">
                <p className="mb-0"> {regData?.talukName}</p>
              </div>
            </div>
          </div>
          <div className="price-box">
            <div className="d-flex align-items-center justify-content-between gap-3">
              <div>
                <p className="fw-bold mb-0">Village:</p>
              </div>

              <div className="fw-bold">
                <p className="mb-0"> {regData?.villageName}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

const Registration = ({ regData }) => {
  return (
    <>
      {regData === null ? (
        <div className="mt-3 mb-3">
          <Empty />
        </div>
      ) : (
        <div>
          <div className="price-box">
            <div className="d-flex align-items-center justify-content-between gap-3">
              <div>
                <p className="fw-bold mb-0">Registration Status:</p>
              </div>

              <div className="fw-bold">
                <p className="mb-0"> {regData?.reg_status}</p>
              </div>
            </div>
          </div>
          <div className="price-box">
            <div className="d-flex align-items-center justify-content-between gap-3">
              <div>
                <p className="fw-bold mb-0">Registration Date:</p>
              </div>

              <div className="fw-bold">
                <p className="mb-0"> {DateFormateCustom(regData?.reg_date)}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

const YourPropertyDocuments = ({ docData }) => {
  return (
    <>
      {docData ? (
        <div>
          <div className="price-box">
            <div className="d-flex align-items-center justify-content-between gap-3">
              <div>
                <p className="fw-bold mb-0">Registration ID:</p>
              </div>

              <div className="fw-bold">
                <p className="mb-0"> {docData?.reg_id}</p>
              </div>
            </div>
          </div>
          <div className="price-box">
            <div className="d-flex align-items-center justify-content-between gap-3">
              <div>
                <p className="fw-bold mb-0">Registration Date:</p>
              </div>

              <div className="fw-bold">
                <p className="mb-0"> {DateFormateCustom(docData?.reg_date)}</p>
              </div>
            </div>
          </div>
          <div className="price-box">
            <div className="d-flex align-items-center justify-content-between gap-3">
              <div>
                <p className="fw-bold mb-0">Category:</p>
              </div>

              <div className="fw-bold">
                <p className="mb-0"> {docData?.categoryName}</p>
              </div>
            </div>
          </div>
          <div className="price-box">
            <div className="d-flex align-items-center justify-content-between gap-3">
              <div>
                <p className="fw-bold mb-0">Sub Category:</p>
              </div>

              <div className="fw-bold">
                <p className="mb-0"> {docData?.sub_catName}</p>
              </div>
            </div>
          </div>
          <div className="price-box">
            <div className="d-flex align-items-center justify-content-between gap-3">
              <div>
                <p className="fw-bold mb-0">Property Type:</p>
              </div>

              <div className="fw-bold">
                <p className="mb-0"> {docData?.prop_type}</p>
              </div>
            </div>
          </div>
          <div className="price-box">
            <div className="d-flex align-items-center justify-content-between gap-3">
              <div>
                <p className="fw-bold mb-0">Extent in Units:</p>
              </div>

              <div className="fw-bold">
                <p className="mb-0"> {docData?.extent_units}</p>
              </div>
            </div>
          </div>
          <div className="price-box">
            <div className="d-flex align-items-center justify-content-between gap-3">
              <div>
                <p className="fw-bold mb-0">Sale Deed No:</p>
              </div>

              <div className="fw-bold">
                <p className="mb-0"> {docData?.sd_no}</p>
              </div>
            </div>
          </div>
          <div className="price-box">
            <div className="d-flex align-items-center justify-content-between gap-3">
              <div>
                <p className="fw-bold mb-0">Sale Deed Name:</p>
              </div>

              <div className="fw-bold">
                <p className="mb-0"> {docData?.sd_name}</p>
              </div>
            </div>
          </div>
          <div className="price-box">
            <div className="d-flex align-items-center justify-content-between gap-3">
              <div>
                <p className="fw-bold mb-0">Sale Deed Hard Copy:</p>
              </div>

              <div className="fw-bold">
                <p className="mb-0"> {docData?.sd_hard_copy}</p>
              </div>
            </div>
          </div>
          <div className="price-box">
            <div className="d-flex align-items-center justify-content-between gap-3">
              <div>
                <p className="fw-bold mb-0">Tracking Id:</p>
              </div>

              <div className="fw-bold">
                <p className="mb-0"> {docData?.tracking_id}</p>
              </div>
            </div>
          </div>
          <div className="price-box">
            <div className="d-flex align-items-center justify-content-between gap-3">
              <div>
                <p className="fw-bold mb-0">Patta Application No:</p>
              </div>

              <div className="fw-bold">
                <p className="mb-0"> {docData?.patta_app_no}</p>
              </div>
            </div>
          </div>
          <div className="price-box">
            <div className="d-flex align-items-center justify-content-between gap-3">
              <div>
                <p className="fw-bold mb-0">Patta No:</p>
              </div>

              <div className="fw-bold">
                <p className="mb-0"> {docData?.patta_no}</p>
              </div>
            </div>
          </div>
          <div className="price-box">
            <div className="d-flex align-items-center justify-content-between gap-3">
              <div>
                <p className="fw-bold mb-0">Patta Name:</p>
              </div>

              <div className="fw-bold">
                <p className="mb-0"> {docData?.patta_name}</p>
              </div>
            </div>
          </div>
          <div className="price-box">
            <div className="d-flex align-items-center justify-content-between gap-3">
              <div>
                <p className="fw-bold mb-0">Survey No:</p>
              </div>

              <div className="fw-bold">
                <p className="mb-0"> {docData?.survey_no}</p>
              </div>
            </div>
          </div>
          <div className="price-box">
            <div className="d-flex align-items-center justify-content-between gap-3">
              <div>
                <p className="fw-bold mb-0">Area:</p>
              </div>

              <div className="fw-bold">
                <p className="mb-0"> {docData?.area}</p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="mt-3 mb-3">
          <Empty />

          {/* <Timeline>

  <Timeline.Item
   className="first-green"
    dot={
      <span
        style={{
          width: 16,
          height: 16,
          borderRadius: "50%",
          backgroundColor: "green",
          display: "inline-block",
        }}
      />
    }
    color="green" 
  >
   <Accordion defaultActiveKey="0">
      <Accordion.Item eventKey="0">
        <Accordion.Header>Accordion Item #1</Accordion.Header>
        <Accordion.Body>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </Accordion.Body>
      </Accordion.Item>
     
    </Accordion>
  </Timeline.Item>

  <Timeline.Item
   
    color="green" 
  >
    Some event with icon
  </Timeline.Item>

 
  <Timeline.Item
    dot={
      <span
        style={{
          width: 20,
          height: 20,
          borderRadius: "50%",
          backgroundColor: "#00CCFF",
          display: "inline-block",
        }}
      />
    }
    color="#00CCFF"
  >
    <p>Custom dot size and color</p>
  </Timeline.Item>
</Timeline> */}
        </div>
      )}
    </>
  );
};
