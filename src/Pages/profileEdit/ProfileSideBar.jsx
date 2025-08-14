import React, { useEffect, useState } from "react";
import Ledger from "./ledger";
import AccountBoxOutlinedIcon from "@mui/icons-material/AccountBoxOutlined";
import AddBoxIcon from "@mui/icons-material/AddBox";
import AccessTimeFilledIcon from "@mui/icons-material/AccessTimeFilled";
import PermContactCalendarIcon from "@mui/icons-material/PermContactCalendar";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import LogoutIcon from "@mui/icons-material/Logout";
import UnsubscribeIcon from "@mui/icons-material/Unsubscribe";
import Tickets from "./Tickets";
import TicketNotification from "./ticketNotification";
import EditProfile from "./editProfile";
import AddProperty from "./AddProperty";
import Dashboard from "./Dashboard";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import YourProperty from "./YourProperty";
import { useLocation, useNavigate } from "react-router-dom";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import ApartmentIcon from "@mui/icons-material/Apartment";
import DesignServicesIcon from "@mui/icons-material/DesignServices";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import HistoryIcon from "@mui/icons-material/History";
import HeadsetMicIcon from "@mui/icons-material/HeadsetMic";
import PercentIcon from "@mui/icons-material/Percent";
import HomeWorkIcon from "@mui/icons-material/HomeWork";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import axios from "axios";
import axiosInstance from "../../Api/axiosInstance";

function ProfileSideBar() {
  const token = localStorage.getItem("zxcvbnm@#");
  const location = useLocation();
  const navigate = useNavigate();

  const [image, setImage] = useState(null);
  const [activeTab, setActiveTab] = useState("");

  const handleImageChange = (e) => {
    const selectedImage = e.target.files[0];
    if (selectedImage) {
      const reader = new FileReader();
      reader.onload = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(selectedImage);
    }
  };

  useEffect(() => {
    if (location.pathname.includes("/profile_edit/mybooking")) {
      setActiveTab("mybooking");
    } else if (location.pathname.includes("/profile_edit/bookdetails")) {
      setActiveTab("bookdetails");
    }
  }, [location.pathname]);

  useEffect(() => {
    if (location.pathname.includes("/profile_edit/address")) {
      setActiveTab("address");
    } else if (location.pathname.includes("/profile_edit/add_address")) {
      setActiveTab("add_address");
    }
  }, [location.pathname]);
  useEffect(() => {
    if (location.pathname.includes("/profile_edit/service")) {
      setActiveTab("service");
    } else if (location.pathname.includes("/profile_edit/servicedetails")) {
      setActiveTab("servicedetails");
    }
  }, [location.pathname]);

  const [profileData, setProfileData] = useState([]);
  const fetch = async () => {
    try {
      const response = await axiosInstance.get(`/vendor/Webuser`);
      setProfileData(response.data);
    } catch (error) {
      console.error("Error fetching invoice:", error);
    }
  };
  useEffect(() => {
    if (token) {
      fetch();
    }
  }, []);

  return (
    <div
      className="col-md-3"
      style={{
        padding: 22,
        boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
        margin: "20px 0px",
      }}
    >
      <div
        className="  gradient-custom text-center text-white"
        style={{
          borderTopLeftRadius: ".5rem",
          borderBottomLeftRadius: ".5rem",
        }}
      >
        {/* <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava1-bg.webp" alt="Avatar" className="img-fluid my-5" style={{width: 80}} /> */}

        <div
          className="Profile_upload"
          style={{
            position: "relative",
            width: "100px",
            height: "100px",
            borderRadius: "50%",
          }}
        >
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            style={{ display: "none" }}
            id="image-upload"
          />
          <label htmlFor="image-upload">
            {image ? (
              <div>
                <img
                  src={image}
                  alt="Preview"
                  style={{
                    width: "100px",
                    height: "100px",
                    borderRadius: "50%",
                  }}
                />
                <CameraAltIcon
                  style={{
                    position: "absolute",
                    top: "88px",
                    right: "16px",
                  }}
                />
              </div>
            ) : (
              <div>
                <CameraAltIcon
                  style={{
                    position: "absolute",
                    top: "88px",
                    right: "16px",
                  }}
                />
              </div>
            )}
          </label>
        </div>

        <div className="mt-3 mb-2">
          <h6 className="text-dark mb-1">{profileData.customer ?? "-"} </h6>
          <p className="text-muted mb-1">
            CUSTOMER_ID: {profileData.customerId}
          </p>
          {/* <p className="text-muted mb-1">9876543210</p>
          <p className="text-muted mb-1">demo@gmail.com</p>
          <a className=" " style={{ color: "#1f3351" }}>
            Edit <i class="fa-solid fa-pen-to-square"></i>
          </a> */}
        </div>
      </div>

      <ul className="nav nav-pills flex-column" id="myTab" role="tablist">
        {/* <li className="nav-item">
          <a
            className={`nav-link ${location.pathname === "/profile_edit/dashboard" ? "active" : ""
              }`}
            onClick={() => { navigate("/profile_edit/dashboard") }}

          >
            <DashboardIcon /> Dashboard
          </a>
        </li> */}
        <li className="nav-item">
          <a
            className={`nav-link ${
              activeTab === "mybooking" || activeTab === "bookdetails"
                ? "active"
                : ""
            }`}
            onClick={() => {
              setActiveTab("mybooking");
              navigate("/profile_edit/mybooking");
            }}
          >
            <ApartmentIcon /> My Bookings
          </a>
        </li>
        <li className="nav-item">
          <a
            className={`nav-link ${
              activeTab === "service" || activeTab === "add_address"
                ? "active"
                : ""
            }`}
            onClick={() => {
              setActiveTab("service");
              navigate("/profile_edit/service");
            }}
          >
            <DesignServicesIcon /> Service
          </a>
        </li>

        {/* <li className="nav-item">
          <a
            className={`nav-link ${location.pathname === "/profile_edit/profile" ? "active" : ""
              }`}
            onClick={() => navigate("/profile_edit/profile")}
          >
            <AccountBoxOutlinedIcon /> Profile
          </a>
        </li> */}
        <li className="nav-item">
          <a
            className={`nav-link ${
              location.pathname === "/profile_edit/notification" ? "active" : ""
            }`}
            onClick={() => navigate("/profile_edit/notification")}
          >
            <UnsubscribeIcon /> Notification
          </a>
        </li>

        <li className="nav-item">
          <a
            className={`nav-link ${
              location.pathname === "/profile_edit/add_property" ? "active" : ""
            }`}
            onClick={() => navigate("/profile_edit/add_property")}
          >
            <AddBoxIcon /> Add Property
          </a>
        </li>

        <li className="nav-item">
          <a
            className={`nav-link ${
              location.pathname === "/profile_edit/my_property" ||
              location.pathname.startsWith("/profile_edit/property_status/")
                ? "active"
                : ""
            }`}
            onClick={() => navigate("/profile_edit/my_property")}
          >
            <BookmarkBorderIcon /> My Property
          </a>
        </li>
        <li className="nav-item">
          <a
            className={`nav-link ${
              location.pathname === "/profile_edit/paymenthistory"
                ? "active"
                : ""
            }`}
            onClick={() => navigate("/profile_edit/paymenthistory")}
          >
            <HistoryIcon /> Payment History
          </a>
        </li>
        {/* <li className="nav-item">
          <a
            className={`nav-link ${location.pathname === "/profile_edit/purchase_property" ||
              location.pathname.startsWith("/profile_edit/purchase_property/")
              ? "active"
              : ""
              }`}
            onClick={() => navigate("/profile_edit/purchase_property")}
          >
            <ShoppingCartIcon /> Purchase Property
          </a>
        </li> */}
        <li className="nav-item">
          <a
            className={`nav-link ${
              location.pathname === "/profile_edit/customercare" ? "active" : ""
            }`}
            onClick={() => navigate("/profile_edit/customercare")}
          >
            <HeadsetMicIcon /> Customer Care
          </a>
        </li>
        <li className="nav-item">
          <a
            className={`nav-link ${
              location.pathname === "/profile_edit/referrals" ? "active" : ""
            }`}
            onClick={() => navigate("/profile_edit/referrals")}
          >
            <PercentIcon /> Referrals and Offers
          </a>
        </li>

        {/* <li className="nav-item">
          <a
            className={`nav-link ${location.pathname === "/profile_edit/ledger" ? "active" : ""
              }`}
            onClick={() => navigate("/profile_edit/ledger")}
          >
            <AccessTimeFilledIcon /> Ledger
          </a>
        </li> */}

        <li className="nav-item">
          <a
            className={`nav-link ${
              activeTab === "address" || activeTab === "add_address"
                ? "active"
                : ""
            }`}
            onClick={() => {
              setActiveTab("address");
              navigate("/profile_edit/address");
            }}
          >
            <ApartmentIcon /> Address
          </a>
        </li>

        {/* <li className="nav-item">
          <a
            className={`nav-link ${location.pathname === "/profile_edit/contact" ? "active" : ""
              }`}
          //   onClick={() => navigate("/profile_edit/contact")} 
          >
            <PermContactCalendarIcon /> Contact
          </a>
        </li> */}
      </ul>
    </div>
  );
}

export default ProfileSideBar;
