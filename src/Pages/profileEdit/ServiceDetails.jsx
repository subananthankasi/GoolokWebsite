import React, { useEffect, useState } from "react";
import ProfileSideBar from "./ProfileSideBar";
import patta from "../../assets/images/patta.jpg";
// import Bookslider from "./bookslider";
// import TimelineAccordion from "./timelineaccordion";
import { FaDownload } from "react-icons/fa6";
import Serviceprice from "./serviceprice";
import Servicestatus from "./servicestatus"; import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import img1 from "../../assets/images/apart1.jpg"; // Replace with your image path
import img2 from "../../assets/images/apart1.jpg"; // Replace with your image path
import img3 from "../../assets/images/apart1.jpg"; // Replace with your image path
import { useParams } from "react-router-dom";
import axiosInstance from "../../Api/axiosInstance";

const ServiceDetails = () => {
    const { eid } = useParams()
    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        arrows: true
    };
    const [getData, setGetData] = useState([])
    const [loading, setLoading] = useState(true)
    


    const fetchInvoice = async () => {
        setLoading(true)
        try {
            const response = await axiosInstance.get(`/vendor/service/${eid}`, {
                headers: {
                    "Level": "progress",
                }
            });
            setGetData(response.data);
            setLoading(false)
        } catch (error) {
            console.error("Error fetching invoice:", error);
        }finally{
            setLoading(false)
        }
    };
    useEffect(() => {
        fetchInvoice()
    }, [])
    return (
        <>
            <div className="container profile_edit">
                <div className="row w-100">
                    <ProfileSideBar />

                    <div className="col-md-6 mx-auto py-5" style={{ paddingTop: 50 }}>

                        <div className="Mybooking">

                            {/* <Bookslider /> */}
                            {/* <div className="carousel">
                                <Slider {...settings}>
                                    <div>
                                        <img src={img1} alt="Slide 1" style={{ height: "400px" }} className=" w-100" />
                                    </div>
                                    <div>
                                        <img src={img2} alt="Slide 2" style={{ height: "400px" }} className="img-fluid w-100" />
                                    </div>
                                    <div>
                                        <img src={img3} alt="Slide 3" style={{ height: "400px" }} className="img-fluid w-100" />
                                    </div>
                                </Slider>
                            </div> */}

                            {/* <div>
                                <Serviceprice />
                            </div> */}

                            <Servicestatus invoiceData={getData} fetchInvoice={fetchInvoice} eid={eid} loading = {loading}/>
                        </div>

                        {/* <div className="">
                            <h6 class="mt-2 ">Your Documents</h6>
                            <div className="row ">
                                <div className="col-md-6 mt-2">
                                    <div className="card p-2">
                                        <div className="service-img">
                                            <img src={patta} alt="" />
                                        </div>
                                        <div class="text-center mt-2">
                                            <a href="" class="btn-download   btn">
                                                Download <FaDownload />
                                            </a>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-6 mt-2">
                                    <div className="card p-2">
                                        <div className="service-img">
                                            <img src={patta} alt="" />
                                        </div>
                                        <div class="text-center mt-2">
                                            <a href="" class="btn-download   btn">
                                                Download <FaDownload />
                                            </a>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-6 mt-2">
                                    <div className="card p-2">
                                        <div className="service-img">
                                            <img src={patta} alt="" />
                                        </div>
                                        <div class="text-center mt-2">
                                            <a href="" class="btn-download   btn">
                                                Download <FaDownload />
                                            </a>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-6 mt-2">
                                    <div className="card p-2">
                                        <div className="service-img">
                                            <img src={patta} alt="" />
                                        </div>
                                        <div class="text-center mt-2">
                                            <a href="" class="btn-download   btn">
                                                Download <FaDownload />
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div> */}
                    </div>
                </div>
            </div>
        </>
    )
}

export default ServiceDetails