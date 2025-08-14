import React, { useCallback, useEffect, useRef, useState } from "react";
import { Accordion } from "react-bootstrap";
import logo from "../../assets/images/Goolok Final Logo copy.png"
import ServicePaymentGateway from "./ServicePaymentGateway";
import ServiceLegalPaymentGateway from "./ServiceLegalPaymentGateway";
import DownloadIcon from '@mui/icons-material/Download';
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { IMG_PATH } from "../../Api/api";
import axiosInstance from "../../Api/axiosInstance";
import { useAlert } from "react-alert";
import {
    GoogleMap,
    useJsApiLoader,
    Autocomplete,
    Marker,
    Polyline,
    Polygon,
    InfoWindow,
} from "@react-google-maps/api";
import LocationOnIcon from '@mui/icons-material/LocationOn';
import markerIcon from "../../assets/marker.svg";
import { TabView, TabPanel } from 'primereact/tabview';
import { Table } from 'antd';


const containerStyle = {
    width: "100%",
    height: "50vh",
};

const centers = {
    lat: 13.078187,
    lng: 79.972347,
};
const loaderOptions = {
    id: "google-map-script",
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries: ["places", "geometry"],

};
const mapTheme = [
    {
        "featureType": "all",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "weight": "2.00"
            }
        ]
    },
    {
        "featureType": "all",
        "elementType": "geometry.stroke",
        "stylers": [
            {
                "color": "#9c9c9c"
            }
        ]
    },
    {
        "featureType": "all",
        "elementType": "labels.text",
        "stylers": [
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "landscape",
        "elementType": "all",
        "stylers": [
            {
                "color": "#f2f2f2"
            }
        ]
    },
    {
        "featureType": "landscape",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#ffffff"
            }
        ]
    },
    {
        "featureType": "landscape.man_made",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#ffffff"
            }
        ]
    },
    {
        "featureType": "poi",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "all",
        "stylers": [
            {
                "saturation": -100
            },
            {
                "lightness": 45
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#eeeeee"
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#7b7b7b"
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "labels.text.stroke",
        "stylers": [
            {
                "color": "#ffffff"
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "simplified"
            }
        ]
    },
    {
        "featureType": "road.arterial",
        "elementType": "labels.icon",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "transit",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "all",
        "stylers": [
            {
                "color": "#46bcec"
            },
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#c8d7d4"
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#070707"
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "labels.text.stroke",
        "stylers": [
            {
                "color": "#ffffff"
            }
        ]
    }
]

const options = {
    styles: mapTheme
}


const ServiceStatusLandSurvey = ({ eid }) => {
    const [gMapData, setGMapData] = useState([])

    const fetchInvoice = async () => {
        try {
            const response = await axiosInstance.get(`/vendor/surveypanel/${eid}`);
            setGMapData(response.data);
        } catch (error) {
            console.error("Error fetching invoice:", error);
        }
    };
    useEffect(() => {
        fetchInvoice()
    }, [])




    const steps = [
        {
            title: "Patta Service Booked",
            details: (
                <PattaServiceBooked pattaData={gMapData[0]} fetchInvoice={fetchInvoice} eid={eid} />
            ),
            completed: gMapData[0]?.dpt_status === null ? true : gMapData[0]?.dpt_status === "Document_verify" ? true : gMapData[0]?.dpt_status === "Location_verify" ? true : gMapData[0]?.dpt_status === "Service_verify" ? true : gMapData[0]?.dpt_status === "Payment_verify" ? true : gMapData[0]?.dpt_status === "App_verify" ? true : gMapData[0]?.dpt_status === "hub_verify" ? true : false
        },
        {
            title: "Document Verification",
            details: (
                <DocumentVerification docData={gMapData[0]?.docdata} fetchInvoice={fetchInvoice} eid={eid} />
            ),
            completed: gMapData[0]?.dpt_status === "Document_verify" ? true : gMapData[0]?.dpt_status === "Location_verify" ? true : gMapData[0]?.dpt_status === "Service_verify" ? true : gMapData[0]?.dpt_status === "Payment_verify" ? true : gMapData[0]?.dpt_status === "App_verify" ? true :  gMapData[0]?.dpt_status === "hub_verify" ? true : false
        },
        {
            title: "Your Property Location",
            details: (
                <YourPropertyLocation gmapdata={gMapData[0]?.Gmap} fetchInvoice={fetchInvoice} eid={eid} />
            ),
            completed: gMapData[0]?.dpt_status === "Location_verify" ? true : gMapData[0]?.dpt_status === "Service_verify" ? true : gMapData[0]?.dpt_status === "Payment_verify" ? true : gMapData[0]?.dpt_status === "App_verify" ? true :  gMapData[0]?.dpt_status === "hub_verify" ? true : false

        },

        {
            title: "Service Confirmation Payment",
            details: (
                <ServiceConfirmationPayment invoiceData={gMapData} fetchInvoice={fetchInvoice} eid={eid} />
            ),
            completed: gMapData[0]?.dpt_status === "Payment_verify" ? true : gMapData[0]?.dpt_status === "App_verify" ? true :  gMapData[0]?.dpt_status === "hub_verify" ? true : false

        },
        {
            title: " FMB & Application",
            details: (
                <FMBApplication docData={gMapData[0]} fetchInvoice={fetchInvoice} eid={eid} />
            ),
            completed: gMapData[0]?.dpt_status === "App_verify" ? true :  gMapData[0]?.dpt_status === "hub_verify" ? true : false
        },
        {
            title: "Land Survey Completed",
            details: (
                <LandSurveyCompleted docData={gMapData[0]} fetchInvoice={fetchInvoice} eid={eid} />
            ),
            completed:  gMapData[0]?.dpt_status === "hub_verify" ? true : false
        },

    ];


    const timelineRef = useRef(null);

    const lastCompletedIndex = steps
        .map((step) => step.completed)
        .lastIndexOf(true);

    useEffect(() => {
        if (!timelineRef.current) return;
        const updateTimelineHeight = () => {
            const lastCompletedStep = document.getElementById(`step-${lastCompletedIndex}`);
            if (lastCompletedStep) {
                const header = lastCompletedStep.querySelector(".accordion-header");
                const body = lastCompletedStep.querySelector(".accordion-body");

                const headerHeight = header?.offsetHeight || 0;
                const bodyHeight = body?.offsetHeight || 0;
                const isExpanded = body?.style.display !== "none";


                const height = lastCompletedStep.offsetTop +
                    headerHeight +
                    (isExpanded ? bodyHeight : headerHeight / 2) - 50;

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

    const [activeKey, setActiveKey] = useState("");

    return (



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


                <Accordion defaultActiveKey={activeKey}>
                    {steps.map((step, index) => (
                        <div
                            key={index}
                            className="position-relative ps-4 mb-3"
                            id={`step-${index}`}
                        >
                            <span
                                className={`position-absolute start-0 translate-middle rounded-circle border border-white ${step.completed ? "bg-success" : "bg-secondary"}`}
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
                                <Accordion.Header>{step.title}</Accordion.Header>
                                <Accordion.Body className="p-0">{step.details}</Accordion.Body>
                            </Accordion.Item>
                        </div>
                    ))}
                </Accordion>
            </div>
        </div>
    );
};

export default ServiceStatusLandSurvey;



const PattaServiceBooked = ({ pattaData, fetchInvoice, eid }) => {

    return (

        <>
            <div className="price-box">
                <div className="d-flex align-items-center justify-content-between gap-3">
                    <div>
                        <p className="fw-bold mb-0">Service Id:</p>
                    </div>
                    <div className="fw-bold">
                        <p className="mb-0">{pattaData?.propertyid}</p>
                    </div>
                </div>
            </div>
            <div className="price-box">
                <div className="d-flex align-items-center justify-content-between gap-3">
                    <div>
                        <p className="fw-bold mb-0">Service Type :</p>
                    </div>
                    <div className="fw-bold">
                        <p className="mb-0">{pattaData?.service_cat}</p>
                    </div>
                </div>
            </div>
            <div className="price-box">
                <div className="d-flex align-items-center justify-content-between gap-3">
                    <div>
                        <p className="fw-bold mb-0">Service Recieved On:</p>
                    </div>
                    <div className="fw-bold">
                        <p className="mb-0">{pattaData?.created_at},{pattaData?.time}</p>
                    </div>
                </div>
            </div>
            <div className="price-box">
                <div className="d-flex align-items-center justify-content-between gap-3">
                    <div>
                        <p className="fw-bold mb-0">Property Type :</p>
                    </div>
                    <div className="fw-bold">
                        <p className="mb-0"> {pattaData?.property_type} </p>
                    </div>
                </div>
            </div>
            <div className="price-box">
                <div className="d-flex align-items-center justify-content-between gap-3">
                    <div>
                        <p className="fw-bold mb-0">Sub Property Type :</p>
                    </div>
                    <div className="fw-bold">
                        <p className="mb-0">{pattaData?.subpro_name} </p>
                    </div>
                </div>
            </div>
        </>
    )

}

const DocumentVerification = ({ docData, fetchInvoice, eid }) => {
    const alert = useAlert();
    const [showFull, setShowFull] = useState(false);
    const [files, setFiles] = useState({});
    const [loading, setLoading] = useState({});


    const validTypes = [
        "application/pdf",
        "image/png",
        "image/jpeg",
        "image/jpg",
    ];


    const handleFileChange = (e, id) => {
        const file = e.target.files[0];

        if (!validTypes.includes(file.type)) {
            alert.error("Invalid file type. Please upload a PDF, PNG, JPEG, or JPG file.");
            return;
        }


        setFiles((prevFiles) => ({
            ...prevFiles,
            [id]: file,
        }));
    };

    // Handle file upload
    const handleFileUpload = async (id) => {


        if (!files[id]) {
            alert.error("Please select a file before submitting.");
            return;
        }

        setLoading((prevLoading) => ({
            ...prevLoading,
            [id]: true,
        }));


        const formData = new FormData();
        formData.append("document", files[id]);
        formData.append("id", id);



        try {
            const response = await axiosInstance.post(
                "/vendor/fileupdate",
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                        "Gl-Status": "user"
                    },
                }
            );
            fetchInvoice()

            alert.success("Document submitted successfully!")

        } catch (error) {
            alert.error(
                "Error! Please try again later"
            );
        }
        finally {
            setLoading((prevLoading) => ({
                ...prevLoading,
                [id]: false,
            }));
            // window.location.reload();
        }
    };



    return (

        <div className="row p-2">
            {docData?.map((item, index) => (
                <div className="col-md-6 mt-3">
                    <div className="w-100">
                        {item?.document ? (
                            <div className="card">
                                <div className="pdf-wrapper" onClick={() => window.open(`${IMG_PATH}enquiry/${item.document}`, "_blank")}>
                                    <embed
                                        src={`${IMG_PATH}enquiry/${item.document}#toolbar=0&navpanes=0&scrollbar=0`}
                                        className="pdf-hidden-scroll"
                                        type="application/pdf"
                                    />
                                </div>
                                <hr />
                                <div className="d-flex justify-content-between">
                                    <div className="d-flex p-2 gap-1">
                                        <i className="pi pi-file-pdf" style={{ color: "red" }}></i>
                                        <p className=""> {item.doc_type}.pdf</p>
                                    </div>
                                    <a
                                        href={`${IMG_PATH}enquiry/${item.document}`}
                                        download
                                        target="_blank"
                                        className="btn"
                                    >
                                        <DownloadIcon />
                                    </a>
                                </div>

                            </div>
                        ) : (
                            <div className="card p-3">
                                <h6 className="mb-3 p-2"> {item.doc_type} </h6>
                                <div>
                                    <input
                                        type="file"
                                        className="form-control"
                                        onChange={(e) => handleFileChange(e, item.id)}
                                    />
                                </div>
                                <div className="mt-2 text-end">

                                    <button
                                        className="btn mt-3 text-white"
                                        style={{ backgroundColor: "#2f4f4f" }}
                                        onClick={() => handleFileUpload(item.id)}
                                        disabled={loading[item.id]}
                                    >
                                        {loading[item.id] ? (
                                            <>
                                                <span className="spinner-border spinner-border-sm me-2" role="status" />
                                                Submitting...
                                            </>
                                        ) : (
                                            "Submit"
                                        )}
                                    </button>
                                </div>
                            </div>
                        )}


                    </div>

                </div>
            ))}

        </div>
    )
}


const YourPropertyLocation = ({ gmapdata, fetchInvoice, eid }) => {
    const { isLoaded } = useJsApiLoader(loaderOptions);
    const [handleMarker, setHandleMarker] = useState(null);
    const [selected, setSelected] = useState(null);
    const [map, setMap] = useState(null);
    const onLoad = useCallback((map) => {
        setMap(map);
    }, []);

    const onUnmount = useCallback((map) => {
        setMap(null);
    }, []);


    const handleMarkerClick = (markerId) => {
        setSelected(markerId);
    };

    return isLoaded ? (
        <div>
            {gmapdata?.every(item => item.location === null) ? (
                <div className="text-center p-5">
                    <h6 className="fw-bold">Waiting for your Gmap Location...</h6>
                </div>
            ) : (
                <>
                    <div className="mt-3">
                        <GoogleMap
                            mapContainerStyle={containerStyle}
                            center={centers}
                            zoom={10}
                            options={options}

                        >
                            {/* Markers */}
                            {gmapdata?.map((item, index) => {
                                if (!item.location) return null;
                                const [lat, lng] = item.location.split(",").map(parseFloat);
                                const markerId = `${lat},${lng}`;
                                return (
                                    <React.Fragment key={markerId}>
                                        <Marker
                                            key={item.id}
                                            position={{ lat, lng }}
                                            icon={{
                                                url: markerIcon,
                                                scaledSize: new window.google.maps.Size(30, 30)
                                            }}
                                            onClick={() => handleMarkerClick(markerId)}
                                        />
                                        {/* {selected === markerId && (
                      <InfoWindow
                        position={{ lat, lng }}
                        options={{
                          pixelOffset: new window.google.maps.Size(0, -30),
                          maxWidth: 500,
                        }}
                        onLoad={() => setSelected(markerId)}
                        onUnmount={() => setSelected(null)}
                        onCloseClick={() => setSelected(null)}

                      >
                        <h6 style={{ fontWeight: "400", fontSize: '15px' }} className="p-0 m-0"> Survey No : {item.survey_no}</h6>
                      </InfoWindow>
                    )} */}
                                    </React.Fragment>
                                )
                            })}

                            {/* Polygon */}
                            <Polygon
                                path={
                                    gmapdata?.filter(item => item.location)?.map(item => {
                                        const [lat, lng] = item.location.split(",").map(parseFloat);
                                        return { lat, lng };
                                    })
                                }
                                options={{
                                    fillColor: "#e67772",
                                    fillOpacity: 0.7,
                                    strokeColor: "#ff3d00",
                                    strokeOpacity: 1,
                                    strokeWeight: 2,
                                }}
                            />
                        </GoogleMap>

                    </div>

                    <div className="mt-2">

                        <div className="p-2 mt-4">
                            <h6>Survey Details :</h6>
                            <hr />
                            <table className="table table-bordered mt-3  table-striped">
                                <thead >
                                    <tr className="table-">
                                        <th> S.No </th>
                                        <th style={{ minWidth: "100px" }}>Survey no</th>
                                        <th> Location </th>
                                        <th> Gmap Link </th>

                                    </tr>
                                </thead>
                                <tbody>
                                    {gmapdata?.map((item, index) => (
                                        <tr key={index}>
                                            <td>{index + 1}</td>
                                            <td>{item?.survey_no}</td>
                                            <td>{item?.location}</td>
                                            <td><a
                                                href={`https://www.google.com/maps?q=${item.location}`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="mb-5"
                                                style={{ textDecoration: "underline", color: "blue", marginBottom: "20px" }}
                                            >
                                                https://www.google.com/maps?q=${item.location}
                                            </a></td>
                                        </tr>
                                    ))}

                                </tbody>
                            </table>
                        </div>

                    </div>
                </>
            )}
        </div>
    ) : null
}
const ServiceConfirmationPayment = ({ invoiceData, fetchInvoice, eid }) => {
    const contentRef = useRef(null)



    const calculateTotals = () => {
        const subtotal = invoiceData?.reduce((acc, item) => {
            const chargesTotal = Number(item.amount) || 0;
            return acc + chargesTotal;
        }, 0);

        const gst = subtotal * 0;
        // const total = subtotal + gst;
        const total = subtotal;



        const currencyFormatter = new Intl.NumberFormat("en-US", {
            currency: "USD",
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        });

        return {
            subtotal: currencyFormatter.format(subtotal),
            gst: currencyFormatter.format(gst),
            total: currencyFormatter.format(total),
        };
    };
    const generatePdf = () => {
        const input = contentRef.current;
        if (!input) {
            console.error("contentRef is not available");
            return;
        }

        // input.style.display = "block";

        html2canvas(input, { scale: 2 }).then((canvas) => {
            const imgData = canvas.toDataURL("image/png");
            const pdf = new jsPDF("p", "mm", "a4");
            const imgWidth = 210;
            const imgHeight = (canvas.height * imgWidth) / canvas.width;
            pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
            pdf.save("invoice.pdf");
            // input.style.display = "none";
        });
    };

    return (
        <div>
            {
                invoiceData[0]?.amount === null ? (
                    <div className="d-flex justify-content-center p-3">
                        <h6 className="mb-3"> Waiting for Your Payment....!</h6>
                    </div>
                ) : (
                    <>
                        <div className=" d-flex justify-content-end">
                            <button className="btn " onClick={generatePdf}><DownloadIcon sx={{ color: "blue" }} /> </button>
                        </div>
                        <article className="p-4" ref={contentRef} style={{ background: "#fff", }} >
                            <h3 className="text-center" style={{ fontWeight: "800" }}> INVOICE </h3>
                            <hr />
                            <div className="d-flex justify-content-between ">
                                <div className="mt-3 mb-5">
                                    <img src={logo} alt="goolok" style={{ width: "100px", height: "25px" }} />
                                    <div className="m-0">
                                        <p className='p-0 m-0' style={{ fontSize: "11px" }}><b>  Goolok Pvt ltd </b></p>
                                        <p className='p-0 m-0' style={{ fontSize: "11px" }}> <b>2nd Floor, 129,</b></p>
                                        <p className='p-0 m-0' style={{ fontSize: "11px" }}> <b>Nungambakkam, Chennai,</b> </p>
                                        <p className='p-0 m-0' style={{ fontSize: "11px" }}> <b>Tamil Nadu 600034 </b></p>
                                    </div>
                                </div>
                                <div className="mt-3 mb-5">
                                    <p className="p-0 m-0" style={{ fontSize: "11px" }}><b>Invoice no : </b> {invoiceData[0]?.invoiceid}  </p>
                                    <p className="p-0 m-0" style={{ fontSize: "11px" }}><b> Name: </b> {invoiceData[0]?.customer}  </p>
                                    <p className="p-0 m-0" style={{ fontSize: "11px" }}><b> Date:</b> {invoiceData[0]?.invoice_date} </p>
                                    <p className="p-0 m-0" style={{ fontSize: "11px" }}><b>  Email:</b>{invoiceData[0]?.email_id} </p>
                                    <p className="p-0 m-0" style={{ fontSize: "11px" }}><b>  Mobile:</b>{invoiceData[0]?.mobile} </p>
                                </div>
                            </div>
                            <section className="line-items  ">
                                <table className="items--table w-100 mt-5 p-2 table-bordered">
                                    <thead className="p-1">
                                        <tr className="p-1">
                                            <th className="p-1 text-center" style={{ fontSize: "11px" }}>S.NO</th>
                                            <th className='text-center' style={{ fontSize: "11px" }}>Qty</th>
                                            <th className='text-center' style={{ fontSize: "11px" }}>Description</th>
                                            <th className='text-center' style={{ fontSize: "11px" }}> Payment</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {invoiceData?.map((item, index) => (
                                            <>
                                                <tr className="p-1" key={index}>
                                                    <td className="p-1 text-center" style={{ fontSize: "11px" }}> 1</td>
                                                    <td className='text-center' style={{ fontSize: "11px" }}>1</td>
                                                    <td className='text-center' style={{ fontSize: "11px" }}>{item.service_cat} </td>
                                                    <td className='text-center' style={{ fontSize: "11px" }}>₹ {item.amount} </td>
                                                </tr>
                                            </>
                                        ))}
                                    </tbody>
                                    <tfoot>
                                        <tr>
                                            <td colSpan="3" className='text-end p-1' style={{ fontSize: "11px" }}>Sub Total</td>
                                            <td colSpan="2" className='text-center' style={{ fontSize: "11px" }}>{calculateTotals().subtotal} </td>
                                        </tr>
                                        <tr>
                                            <td colSpan="3" className='text-end p-1' style={{ fontSize: "11px" }}> GST(0%)</td>
                                            <td colSpan="2" className='text-center' style={{ fontSize: "11px" }}>0.00 </td>
                                        </tr>
                                        <tr>
                                            <td colSpan="3" className='text-end p-1' style={{ fontWeight: "600", fontSize: "11px" }}>Total</td>
                                            <td colSpan="2" className='text-center' style={{ fontWeight: "600", fontSize: "11px" }}>{calculateTotals().total} </td>
                                        </tr>
                                    </tfoot>
                                </table>
                                <div className="mt-5 mb-5 w-50">
                                    <p className="p-0 m-0 fw-bold">Terms & Conditions</p>
                                    <p className='p-0 m-0' style={{ fontSize: "11px" }}>payment deadlines, acceptable payment methods, late payment penalties, and other important clauses.</p>
                                </div>
                                <div>
                                    {invoiceData[0]?.invoice_status === "pending" ? (
                                        invoiceData[0]?.service_cat === "legal opinion" ? (
                                            <ServiceLegalPaymentGateway invoiceData={invoiceData[0]} fetchInvoice={fetchInvoice} eid={eid} />
                                        ) : (

                                            <ServicePaymentGateway invoiceData={invoiceData[0]} fetchInvoice={fetchInvoice} eid={eid} />
                                        )
                                    ) : (
                                        <div className="mt-5">
                                            <h4 className="text-center mt-5">Thank You For Your Business!</h4>
                                        </div>
                                    )}
                                </div>
                            </section>
                        </article>
                    </>
                )
            }
        </div>
    )
}

const FMBApplication = ({ docData, fetchInvoice, eid }) => {

    return (
        <>
            <TabView>
                <TabPanel header="FMB" headerClassName="custom-tab-header">
                    <div className="row px-5 py-4">
                       
                        {docData?.fmb?.length > 0 ? (
                            docData.fmb.map((item, index) => (
                                <div className="col-6 mt-1" key={index}>
                                    {item?.document ? (
                                        <div className="card" style={{ width: "175px", height: '170px' }}>
                                            <div className="pdf-wrapper" onClick={() => window.open(`${IMG_PATH}enquiry/sketch/${item.document}`, "_blank")}>
                                                <embed
                                                    src={`${IMG_PATH}enquiry/sketch/${item.document}#toolbar=0&navpanes=0&scrollbar=0`}
                                                    className="pdf-hidden-scroll"
                                                    type="application/pdf"
                                                />
                                            </div>
                                            <hr />
                                            <div className="d-flex justify-content-between">
                                                <div className="d-flex gap-1 px-3">
                                                    <i className="pi pi-file-pdf" style={{ color: "red" }}></i>
                                                    <p className="" style={{ fontSize: "12px" }}>Fmb {index + 1} .pdf</p>
                                                </div>
                                                <a
                                                    href={`${IMG_PATH}enquiry/sketch/${item.document}`}
                                                    download
                                                    target="_blank"
                                                    className="btn"
                                                >
                                                    <DownloadIcon />
                                                </a>
                                            </div>
                                        </div>
                                    ) : (
                                        <div>Waiting For Fmb Document</div>
                                    )}
                                </div>
                            ))
                        ) : (
                           
                            <div className="col-12 text-center py-4">
                                <div className="alert alert-info">
                                    Waiting for FMB documents to be uploaded
                                </div>
                            </div>
                        )}
                    </div>
                </TabPanel>
                <TabPanel header="Application">
                    <div className="row px-5 py-4">
                        {docData?.application?.map((item, index) => (
                            <div className="col-6 mt-1" >
                                {item?.document ? (
                                    <div className="card" style={{ width: "175px", height: '170px' }} >
                                        <div className="pdf-wrapper" onClick={() => window.open(`${IMG_PATH}service/document/${item.document}`, "_blank")}>
                                            <embed
                                                src={`${IMG_PATH}service/document/${item.document}#toolbar=0&navpanes=0&scrollbar=0`}
                                                className="pdf-hidden-scroll"
                                                type="application/pdf"
                                            />
                                        </div>
                                        <hr />
                                        <div className="d-flex justify-content-between">
                                            <div className="d-flex gap-1 px-3">
                                                <i className="pi pi-file-pdf" style={{ color: "red" }}></i>
                                                <p className="" style={{ fontSize: "10px" }}> {index + 1} .pdf</p>
                                            </div>
                                            <a
                                                href={`${IMG_PATH}service/document/${item.document}`}
                                                download
                                                target="_blank"
                                                className="btn"
                                            >
                                                <DownloadIcon />
                                            </a>
                                        </div>
                                    </div>
                                ) : (
                                    null
                                )}
                            </div>
                        ))}
                    </div>
                </TabPanel>
            </TabView>
        </>
    )
}

const LandSurveyCompleted = ({ docData, fetchInvoice, eid }) => {



    const columns = [
        {
            title: 'S.No',
            // dataIndex: ('key'),
            render: (text, record, index) => index + 1,
            width: 100,

        },
        {
            title: 'Survey No',
            dataIndex: 'survey_no',
            width: 100,

        },
        {
            title: 'Sub Division',
            dataIndex: 'sub_division',
            width: 100,
        },
        {
            title: 'Area',
            dataIndex: 'area',
            width: 100,
        },

        {
            title: 'Dimension',
            children: [
                {
                    title: 'North',
                    dataIndex: 'north',
                },
                {
                    title: 'South',
                    dataIndex: 'south',
                },
                {
                    title: 'East',
                    dataIndex: 'east',
                },
                {
                    title: 'West',
                    dataIndex: 'west',
                },
                {
                    title: 'Other Sides',
                    dataIndex: 'other_side',
                },
            ],
        },

    ];


    return (
        <>
            <TabView>
                <TabPanel header="Final Fmb" headerClassName="custom-tab-header">
                    <div className="row px-5 py-4">
                        {docData?.Final_fmb ? (
                            <div className="d-felx justify-content-center" style={{ display: "grid" }}>

                                <div className="card" style={{ width: "175px", height: '170px' }} >
                                    <div className="pdf-wrapper" onClick={() => window.open(`${IMG_PATH}enquiry/${docData?.Final_fmb}`, "_blank")}>
                                        <embed
                                            src={`${IMG_PATH}enquiry/${docData?.Final_fmb}#toolbar=0&navpanes=0&scrollbar=0`}
                                            className="pdf-hidden-scroll"
                                            type="application/pdf"
                                        />
                                    </div>
                                    <hr />
                                    <div className="d-flex justify-content-between">
                                        <div className="d-flex gap-1 px-3">
                                            <i className="pi pi-file-pdf" style={{ color: "red" }}></i>
                                            {/* <p className="" style={{ fontSize: "12px" }}>Fmb {index + 1} .pdf</p> */}
                                        </div>
                                        <a
                                            href={`${IMG_PATH}enquiry/${docData?.Final_fmb}`}
                                            download
                                            target="_blank"
                                            className="btn"
                                        >
                                            <DownloadIcon />
                                        </a>
                                    </div>
                                </div>

                            </div>
                        ) : null}


                    </div>
                </TabPanel>
                <TabPanel header="Survey Photos">
                    <div className="row">
                        {docData?.photo?.map((item, index) => (
                            <div className="col-6 mt-1" >
                                {item?.document ? (
                                    <div className="card w-100 h-100"  >
                                        <div className="w-100 h-100" onClick={() => window.open(`${IMG_PATH}/service/document/${item.document}`, "_blank")}>
                                            <img
                                                src={`${IMG_PATH}/service/document/${item.document}`}
                                                alt="document"
                                                className="rounded "
                                                style={{ width: "100%", height: "100%", objectFit: "cover", cursor: "pointer" }}
                                            />
                                        </div>


                                    </div>
                                ) : (
                                    null
                                )}
                            </div>
                        ))}
                    </div>
                </TabPanel>
                <TabPanel header="Survey Videos">
                    <div className="row">
                        {docData?.video?.map((item, index) => (
                            <div className="col-6 mt-1" >
                                {item?.document ? (
                                    <div className="card w-100 h-100"  >
                                        <div className="w-100 h-100" >
                                            <video controls className='rounded' style={{ width: "100%", height: "100%", objectFit: "cover" }}>
                                                <source src={`${IMG_PATH}/service/document/${item.document}`} type="video/mp4" />
                                                Your browser does not support the video tag.
                                            </video>
                                        </div>


                                    </div>
                                ) : (
                                    null
                                )}
                            </div>
                        ))}
                    </div>
                </TabPanel>
            </TabView>

            <div className="mt-3 p-2">
                <Table
                    columns={columns}
                    dataSource={docData?.survey_details}
                    bordered
                    size="middle"
                    scroll={{ x: 'calc(700px + 50%)', y: 47 * 5 }}
                />
            </div>
        </>
    )
}
