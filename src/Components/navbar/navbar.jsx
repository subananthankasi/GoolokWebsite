import React, { useEffect, useRef, useState } from "react";
import logo from "../../assets/images/LOGO1.png";
import FinalLogo from "../../assets/images/Goolok Final Logo.png";
import "../navbar/navbar.css";
import "@fortawesome/fontawesome-free/css/all.css";
import "../../assets/bootstrap5/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.js";
import { Link, useLocation, useNavigate } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import PersonIcon from "@mui/icons-material/Person";
import SettingsIcon from "@mui/icons-material/Settings";
import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";
import { Avatar } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { logoutAuth } from "../../Redux/Action/LoginAction.js";
import { useAlert } from "react-alert";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import axios from "axios";
import { LOGIN_BASE_URL } from "../../Api/api.js";
import map from "../../assets/images/magnifying-glass.png";
import EnquiryModal from "./enquirymodal.jsx";
import Login from "../Login/Login.jsx";
import Signin from "../Signin/Signin.jsx";
import { fetchUserData } from "../../Redux/Action/UserData.js";
import Notification from "../Notification/Notification.jsx";
import Wishlist from "../Notification/Wishlist.jsx";
import AddToCard from "../Notification/AddToCard.jsx";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LoginIcon from "@mui/icons-material/Login";
import Button from "@mui/material/Button";
import LogoutIcon from "@mui/icons-material/Logout";
import HomeWorkIcon from "@mui/icons-material/HomeWork";
import ApartmentIcon from "@mui/icons-material/Apartment";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import AddBoxIcon from "@mui/icons-material/AddBox";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import HistoryIcon from "@mui/icons-material/History";
import HeadsetMicIcon from "@mui/icons-material/HeadsetMic";
import PercentIcon from "@mui/icons-material/Percent";
import CreditCardIcon from "@mui/icons-material/CreditCard";

import DesignServicesIcon from "@mui/icons-material/DesignServices";
import {
  FaHome,
  FaTools,
  FaBuilding,
  FaStore,
  FaUserCircle,
} from "react-icons/fa";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faHeart,
  faSearch,
  faShoppingCart,
  faUser,
  faUserCircle,
} from "@fortawesome/free-solid-svg-icons";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
function Navbar() {
  const alert = useAlert();

  const [isPopupVisible, setPopupVisible] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const dispatch = useDispatch();

  const togglePopup = () => {
    setPopupVisible(!isPopupVisible);
  };

  const [showModal, setShowModal] = useState(false);

  const handleShow = () => setShowModal(true);
  const handleClose = () => setShowModal(false);

  const [isOpenCategory, setIsOpenCategory] = useState(false);
  const [isOpenLocation, setIsOpenLocation] = useState(false);

  const dropdownCategoryRef = useRef(null);
  const dropdownLocationRef = useRef(null);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (
        dropdownCategoryRef.current &&
        !dropdownCategoryRef.current.contains(event.target)
      ) {
        setIsOpenCategory(false);
      }
      if (
        dropdownLocationRef.current &&
        !dropdownLocationRef.current.contains(event.target)
      ) {
        setIsOpenLocation(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  const toggleDropdownCategory = () => {
    setIsOpenCategory(!isOpenCategory);
  };

  const toggleDropdownLocation = () => {
    setIsOpenLocation(!isOpenLocation);
  };

  const [activeItem, setActiveItem] = useState(" ");
  const handleItemClick = (index) => {
    setActiveItem(index);
  };

  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/") {
      handleItemClick(0);
    }
    if (
      location.pathname === "/properties" ||
      location.pathname === "/property_details" ||
      location.pathname === "/apartment_details"
    ) {
      handleItemClick(1);
    }
    if (location.pathname === "/profile_edit") {
      handleItemClick(4);
    }
    if (location.pathname === "/property_sale") {
      handleItemClick(2);
    }
  }, [location.pathname, handleItemClick]);

  const logutAuth = async () => {
    try {
      await axios.get(`${LOGIN_BASE_URL}/vendor/Signout`, {
        headers: {
          Authorization: `${token}`,
        },
      });
      await localStorage.removeItem("zxcvbnm@#");
      await dispatch(logoutAuth());
      await alert
        .success("You have been successfully logged out. See you again soon!")
        .window.location.reload();
    } catch (error) {
      console.error(error);
      await localStorage.removeItem("zxcvbnm@#");
      window.location.reload();
    }
  };

  const condition = useSelector((state) => state.auth.isAuthenticated);
  const token = localStorage.getItem("zxcvbnm@#");
  useEffect(() => {
    if (condition) {
      setIsAuthenticated(condition);
    } else {
      setIsAuthenticated(token);
    }
  }, [condition, token]);

  const handleLogout = async () => {
    confirmAlert({
      title: "Confirm to logout",
      message: "Are you sure to do this.",
      buttons: [
        {
          label: "Yes",
          onClick: () => logutAuth(),
        },
        {
          label: "No",
        },
      ],
      closeOnClickOutside: false,
      overlayClassName: "confirmcustomAlert",
    });
  };

  //.................
  const [isModalOpenlogin, setIsModalOpenlogin] = useState(false);

  const openModallogin = () => {
    setIsModalOpenlogin(true);
  };

  const closeModalLogin = () => {
    setIsModalOpenlogin(false);
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };

  const navigate = useNavigate();
  const userData = useSelector((state) => state.userData.userData);
  useEffect(() => {
    if (token) {
      dispatch(fetchUserData(navigate));
    }
  }, [dispatch, navigate]);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleIconClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleIconClose = () => {
    setAnchorEl(null);
  };
  return (
    <>
      <EnquiryModal show={showModal} handleClose={handleClose} />
      <Signin isOpen={isModalOpen} closeModal={closeModal} />
      <Login isOpen={isModalOpenlogin} closeModal={closeModalLogin} />

      <nav
        className="navbar navbar-expand-lg p-0  d-block "
        style={{ width: "100%", color: "white" }}
      >
        {/* Top Header */}
        <div className="top-header d-none d-lg-block">
          <div className="d-flex justify-content-end align-items-center ">
            <div
              href="#"
              className="nav-link d-flex align-items-center p-0"
              id="navbarDropdown"
            >
              <div className="d-flex">
                {!isAuthenticated ? (
                  <>
                    <span className="me-1">
                      <AccountCircleIcon sx={{ fontSize: 24 }} />{" "}
                    </span>
                    <h6
                      className="p-0 mb-0 me-1"
                      style={{ fontSize: "18px", cursor: "pointer" }}
                      onClick={openModal}
                    >
                      {" "}
                      Sign up{" "}
                    </h6>
                    <h6 className="p-0 mb-0 me-1" style={{ fontSize: "18px" }}>
                      {" "}
                      /{" "}
                    </h6>
                    <h6
                      className="p-0 mb-0 me-3"
                      style={{ fontSize: "18px", cursor: "pointer" }}
                      onClick={openModallogin}
                    >
                      {" "}
                      Login
                    </h6>
                  </>
                ) : (
                  <>
                    <div
                      className="d-flex"
                      style={{
                        textAlign: "center",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <p
                        href="#"
                        className="d-flex align-items-center p-0 mb-0 me-1"
                        onClick={() => navigate("/profile_edit/mybooking")}
                        style={{ cursor: "pointer" }}
                      >
                        <Avatar
                          src={
                            "https://i.pinimg.com/originals/17/f3/9c/17f39c6f7a4a5457f39dba2368f0d077.jpg"
                          }
                          style={{}}
                        />
                        &nbsp;
                        {userData?.customer
                          ? userData.customer.charAt(0).toUpperCase() +
                            userData.customer.slice(1).toLowerCase()
                          : ""}
                      </p>
                      <h6
                        className="p-0 mb-0 me-2  "
                        style={{ fontSize: "18px" }}
                      >
                        {" "}
                        /{" "}
                      </h6>
                      <p
                        className="p-0 mb-0 me-3  "
                        onClick={handleLogout}
                        style={{ cursor: "pointer" }}
                      >
                        Logout
                      </p>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Mobile View */}
        <div className="navbar py-2 mt-2 navbar-light d-block d-lg-none">
          <div className="container-fluid d-flex justify-content-between align-items-center">
            {/* left Side: Offcanvas Button */}
            <button
              className="btn p-0"
              data-bs-toggle="offcanvas"
              data-bs-target="#offcanvasMenu"
            >
              <FontAwesomeIcon icon={faBars} size="2x" />
            </button>

            {/* Center: Logo */}
            <div className="">
              <Link to="/">
                <img src={FinalLogo} className="logo" alt="" loading="lazy" />
              </Link>
            </div>

            {/* Right Side: User Icon */}
            {/* <div>
              <FontAwesomeIcon
                icon={faUserCircle}
                style={{ color: "#1f3351" }}
                size="2x"
              />
            </div> */}
            <div>
              <Button
                id="basic-button"
                aria-controls={open ? "basic-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                onClick={handleIconClick}
                sx={{ minWidth: "auto" }}
              >
                {isAuthenticated ? (
                  <Avatar
                    src="https://i.pinimg.com/originals/17/f3/9c/17f39c6f7a4a5457f39dba2368f0d077.jpg"
                    sx={{ width: 28, height: 28, mr: 1 }}
                  />
                ) : (
                  <FontAwesomeIcon
                    icon={faUserCircle}
                    style={{ color: "#1f3351" }}
                    size="2x"
                  />
                )}
              </Button>

              <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleIconClose}
                slotProps={{
                  list: {
                    "aria-labelledby": "basic-button",
                  },
                }}
              >
                {!isAuthenticated ? (
                  <>
                    <MenuItem
                      onClick={() => {
                        handleIconClose();
                        openModal();
                      }}
                    >
                      Sign up
                    </MenuItem>
                    <MenuItem
                      onClick={() => {
                        handleIconClose();
                        openModallogin();
                      }}
                    >
                      Login
                    </MenuItem>
                  </>
                ) : (
                  <>
                    <MenuItem
                      onClick={() => {
                        handleIconClose();
                        navigate("/profile_edit/mybooking");
                      }}
                    >
                      <Avatar
                        src="https://i.pinimg.com/originals/17/f3/9c/17f39c6f7a4a5457f39dba2368f0d077.jpg"
                        sx={{ width: 28, height: 28, mr: 1 }}
                      />
                      {userData?.customer
                        ? userData.customer.charAt(0).toUpperCase() +
                          userData.customer.slice(1).toLowerCase()
                        : ""}
                    </MenuItem>
                    <MenuItem
                      onClick={() => {
                        handleIconClose();
                        handleLogout();
                      }}
                      className="text-center"
                    >
                      Logout
                    </MenuItem>
                  </>
                )}
              </Menu>
            </div>
          </div>
          <div className="container-fluid mt-2 d-block d-lg-none">
            {/* Bottom Header */}
            <div className=" d-flex justify-content-between align-items-center">
              {/* Left: Search Bar */}
              <div className="input-group " style={{ width: "75%" }}>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search..."
                />
                <button className="input-group-text input-icon" type="button">
                  <FontAwesomeIcon icon={faSearch} />
                </button>
              </div>

              {/* Right: Wishlist & Cart Icons */}
              <div
                className="d-flex align-items-center text-end ms-2"
                style={{ gap: "7px" }}
              >
                <div>
                  <Notification />
                </div>
                <div>
                  <Wishlist />
                </div>
                <div>
                  <AddToCard />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Offcanvas Menu */}
        <div className="offcanvas offcanvas-start" id="offcanvasMenu">
          <div className="offcanvas-header">
            <h5 className="offcanvas-title">Menu</h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="offcanvas"
            ></button>
          </div>
          <div className="offcanvas-body">
            <Link>
              <ApartmentIcon /> My Bookings
            </Link>
            <Link>
              <DesignServicesIcon /> Services
            </Link>
            <Link>
              <NotificationsActiveIcon /> Notifications
            </Link>
            <Link to={"profile_edit/add_property"}>
              <AddBoxIcon /> Add Propertyuuuu
            </Link>
            <Link to={"profile_edit/my_property"}>
              <BookmarkIcon /> My Property
            </Link>
            <Link>
              <HistoryIcon /> Payment History
            </Link>
            <Link>
              <HeadsetMicIcon /> Customer Care
            </Link>
            <Link>
              <PercentIcon /> Referrals and Offers
            </Link>
            <Link>
              <ApartmentIcon /> Address
            </Link>
            <Link>
              <CreditCardIcon /> Payment Method
            </Link>
          </div>
        </div>

        {/* Laptop View */}
        <div className="container-fluid py-1 d-none d-lg-block d-lg-flex ">
          <div
            className="d-flex gap-3  align-items-center"
            style={{ justifyContent: "space-between" }}
          >
            <Link to="/">
              <img src={FinalLogo} className="logo" alt="" loading="lazy" />
            </Link>
          </div>

          <div className="d-none d-lg-block" style={{ width: "90%" }}>
            <div className="d-flex align-items-center justify-content-end">
              <ul
                className="navbar-nav d-flex  mb-lg-0 "
                style={{ alignItems: "center", color: "white", gap: "0px" }}
              >
                <li className="nav-item">
                  <Link to={"/properties"} className="nav-link d-flex">
                    Buy Properties
                  </Link>
                </li>
                <li className="nav-item d-flex p-0">
                  <a className="nav-link d-flex" href="#">
                    Sell Properties
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#">
                    Services
                  </a>
                </li>
              </ul>
              <div
                className="location "
                ref={dropdownLocationRef}
                style={{ alignItems: "center" }}
              >
                <i className="fa fa-map-marker"></i>
                <div
                  className="dropdown-toggle locationdropco"
                  style={{ color: "#1f3351", fontWeight: "600" }}
                  onClick={toggleDropdownLocation}
                  aria-expanded={isOpenLocation ? "true" : "false"}
                >
                  &nbsp;Chennai
                </div>

                <div
                  className={`dropdown-menu ${isOpenLocation ? "show" : ""}`}
                  style={{ padding: 25, top: "58px" }}
                >
                  <h6>Nearby Area</h6>
                  <div className="row">
                    <div className="col-auto">
                      <a className="dropdown-item" href="#">
                        Ambattur
                      </a>
                      <a className="dropdown-item" href="#">
                        Vadapalani
                      </a>
                      <a className="dropdown-item" href="#">
                        T.Nagar
                      </a>
                      <a className="dropdown-item" href="#">
                        Saidapet
                      </a>
                    </div>
                    <div className="col-auto">
                      <a className="dropdown-item" href="#">
                        Koyambedu
                      </a>
                      <a className="dropdown-item" href="#">
                        Guindy
                      </a>
                      <a className="dropdown-item" href="#">
                        Porur
                      </a>
                      <a className="dropdown-item" href="#">
                        Aavadi
                      </a>
                    </div>
                    <div className="col-auto">
                      <a className="dropdown-item" href="#">
                        Egmore
                      </a>
                      <a className="dropdown-item" href="#">
                        Velachery
                      </a>
                      <a className="dropdown-item" href="#">
                        Chennai Central
                      </a>
                      <a className="dropdown-item" href="#">
                        Adyar
                      </a>
                    </div>
                    <div className="col-auto">
                      <a className="dropdown-item" href="#">
                        Thiruvanmiyur
                      </a>
                      <a className="dropdown-item" href="#">
                        Thambaram
                      </a>
                      <a className="dropdown-item" href="#">
                        Chrompet
                      </a>
                      <a className="dropdown-item" href="#">
                        Pallavaram
                      </a>
                    </div>
                  </div>
                  <h6 className="mt-4">Outside Area</h6>
                  <div className="row">
                    <div className="col-auto">
                      <a className="dropdown-item" href="#">
                        Ambattur
                      </a>
                      <a className="dropdown-item" href="#">
                        Vadapalani
                      </a>
                      <a className="dropdown-item" href="#">
                        T.Nagar
                      </a>
                      <a className="dropdown-item" href="#">
                        Saidapet
                      </a>
                    </div>
                    <div className="col-auto">
                      <a className="dropdown-item" href="#">
                        Koyambedu
                      </a>
                      <a className="dropdown-item" href="#">
                        Guindy
                      </a>
                      <a className="dropdown-item" href="#">
                        Porur
                      </a>
                      <a className="dropdown-item" href="#">
                        Aavadi
                      </a>
                    </div>
                    <div className="col-auto">
                      <a className="dropdown-item" href="#">
                        Egmore
                      </a>
                      <a className="dropdown-item" href="#">
                        Velachery
                      </a>
                      <a className="dropdown-item" href="#">
                        Chennai Central
                      </a>
                      <a className="dropdown-item" href="#">
                        Adyar
                      </a>
                    </div>
                    <div className="col-auto">
                      <a className="dropdown-item" href="#">
                        Thiruvanmiyur
                      </a>
                      <a className="dropdown-item" href="#">
                        Thambaram
                      </a>
                      <a className="dropdown-item" href="#">
                        Chrompet
                      </a>
                      <a className="dropdown-item" href="#">
                        Pallavaram
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="input-group drop ">
                <input
                  type="text"
                  className="form-control1"
                  placeholder="Search"
                  aria-label="Search"
                  aria-describedby="searchIcon"
                  style={{ height: "40px" }}
                />
                <div>
                  <p className="input-group-text1 mb-0">
                    <img src={map} alt="" />
                    &nbsp;
                    <span className="map-search">Map Search</span>
                  </p>
                </div>
                <div className="input-group-append">
                  <span className="input-group-text input-icon" id="searchIcon">
                    <i className="fas fa-search"></i>
                  </span>
                </div>
              </div>

              <div
                className="d-flex justify-content-center align-items-end "
                style={{ gap: "20px", paddingRight: "15px" }}
              >
                {/* Profile */}
                {/* {!isAuthenticated ? (
<>
  <a
    href="#"
    className="nav-link d-flex align-items-center p-0"
    id="navbarDropdown"
    role="button"
  >

  <div
    style={{ textAlign: 'center', alignItems: "center" }}
    onClick={openModal}
    className="nav-link d-block align-items-center p-0"
    id="navbarDropdown"
    role="button"
  >
    <AccountCircleIcon sx={{ fontSize: 25 }} />
    <h6 className='p-0 mb-0' style={{ fontSize: "14px" }}>Sign up</h6>
  </div>
  </a>

  <a
    href="#"
    className="nav-link  d-flex align-items-center p-0"
    id="navbarDropdown"
    role="button"
    style={{ marginTop: "20px" }}

  >
    <div
      style={{ textAlign: 'center', alignItems: "center",cursor:"pointer" }}
      className="nav-link  d-block align-items-center p-0"
      id="navbarDropdown"
      onClick={openModallogin}
    >
      <LoginIcon sx={{ fontSize: 25 }} />
      <h6 className='p-0 mb-0' style={{fontSize:"14px"}}>Log in</h6>
    </div>
  </a>
</>

) : (
<div className="nav-item dropdown">
  <a
    href="#"
    className="nav-link dropdown-toggle d-flex align-items-center"
    id="navbarDropdown"
    role="button"
    data-bs-toggle="dropdown"
    aria-expanded="false"
  >
    <Avatar
      src={
        "https://i.pinimg.com/originals/17/f3/9c/17f39c6f7a4a5457f39dba2368f0d077.jpg"
      }
    />
    &nbsp;{userData?.customer ? userData.customer.charAt(0).toUpperCase() + userData.customer.slice(1).toLowerCase() : ''}
  </a>
  <ul
    className="dropdown-menu align-items-center"
    aria-labelledby="navbarDropdown"
    style={{ minWidth: '15rem', left: '-15px' }}

  >
    <div className='mt-3' style={{ textAlign: 'center' }}>
      <p> Welcome to  profile !</p>
      <Link to="/profile_edit/dashboard" >
        <Button variant="outlined" sx={{ width: 130 }} > <AccountCircleIcon className="mx-1" /> Profile</Button>
      </Link>
      <Button variant="outlined" sx={{ width: 130 }} onClick={handleLogout} className="mt-2 mb-3" color="error"> <LogoutIcon className="mx-1" /> Logout</Button>
    </div>
  </ul>
</div>
)} */}

                <div>
                  <Notification />
                </div>

                <div>
                  <Wishlist />
                </div>
                <div>
                  <AddToCard />
                </div>
              </div>
            </div>
            {/* Iocns */}
          </div>
          {/* </div> */}

          {/* <ul className="navbar-nav ms-auto mb-2 mb-lg-0 d-flex gap-4" style={{ alignItems: "center" }}>
            {!isAuthenticated ? (
              <>
                <Wishlist />
                <AddToCard />


                <li className="nav-item">
                  <a
                    onClick={openModal}
                    className="nav-link d-block "
                    aria-current="page"
                    href="#"
                    style={{ textAlign: 'center' }}
                  >

                    <i className="fa-solid fa-user"></i>

                    <p className=""> Sign up</p>
                  </a>
                </li>

                <li className="nav-item">
                  <a onClick={openModallogin} className="nav-link d-block" href="#" style={{ textAlign: 'center' }}>
         
                    <i class="fa-solid fa-right-to-bracket"></i>
                    <p className=""> Login</p>

                  </a>
                </li>
                <Notification />

              </>
            ) : (
              <>
                <Wishlist />
                <AddToCard />
                <Notification />
                <li className="nav-item dropdown">
                  <a
                    href="#"
                    className="nav-link dropdown-toggle d-flex align-items-center"
                    id="navbarDropdown"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <Avatar
                      src={
                        "https://i.pinimg.com/originals/17/f3/9c/17f39c6f7a4a5457f39dba2368f0d077.jpg"
                      }
                      style={{
                        marginLeft: "10px",
                      }}
                    />
                    &nbsp;{userData?.customer ? userData.customer.charAt(0).toUpperCase() + userData.customer.slice(1).toLowerCase() : ''}
                  </a>
                  <ul
                    className="dropdown-menu"
                    aria-labelledby="navbarDropdown"
                    style={{ left: '-30px' }}
                  >
                    <li>
                      <Link to="/profile_edit/dashboard" className="dropdown-item">
                        Profile
                      </Link>
                    </li>

                    <li>
                      <a
                        className="dropdown-item"
                        onClick={handleLogout}
                        href="#"
                      >
                        Logout
                      </a>
                    </li>
                  </ul>
                </li>


              </>
            )}
          </ul> */}

          {/* <div>
            <Link
              to="/profile_edit"
              className="ms-3 mobile_top_profile text-dark"
            >
              <PersonIcon />
              &nbsp;You
            </Link>
          </div> */}
        </div>
      </nav>
      {/* Footer Menu */}
      <nav className="nav1">
        <div className="nav-box">
          <ul className="nav-container">
            <li
              className={`nav__item ${activeItem === 0 ? "active" : ""}`}
              onClick={() => handleItemClick(0)}
            >
              <Link to="/" className="nav__item-link">
                <div className="nav__item-icon">
                  <HomeIcon sx={{ fontSize: 25 }} />
                </div>
                <span className="nav__item-text">Home</span>
              </Link>
            </li>
            <li
              className={`nav__item ${activeItem === 1 ? "active" : ""}`}
              onClick={() => handleItemClick(1)}
            >
              <Link to="/properties" className="nav__item-link">
                <div className="nav__item-icon">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    class="icon icon-tabler icons-tabler-outline icon-tabler-rosette-discount"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                    <path d="M9 15l6 -6"></path>
                    <circle
                      cx="9.5"
                      cy="9.5"
                      r=".5"
                      fill="currentColor"
                    ></circle>
                    <circle
                      cx="14.5"
                      cy="14.5"
                      r=".5"
                      fill="currentColor"
                    ></circle>
                    <path d="M5 7.2a2.2 2.2 0 0 1 2.2 -2.2h1a2.2 2.2 0 0 0 1.55 -.64l.7 -.7a2.2 2.2 0 0 1 3.12 0l.7 .7a2.2 2.2 0 0 0 1.55 .64h1a2.2 2.2 0 0 1 2.2 2.2v1a2.2 2.2 0 0 0 .64 1.55l.7 .7a2.2 2.2 0 0 1 0 3.12l-.7 .7a2.2 2.2 0 0 0 -.64 1.55v1a2.2 2.2 0 0 1 -2.2 2.2h-1a2.2 2.2 0 0 0 -1.55 .64l-.7 .7a2.2 2.2 0 0 1 -3.12 0l-.7 -.7a2.2 2.2 0 0 0 -1.55 -.64h-1a2.2 2.2 0 0 1 -2.2 -2.2v-1a2.2 2.2 0 0 0 -.64 -1.55l-.7 -.7a2.2 2.2 0 0 1 0 -3.12l.7 -.7a2.2 2.2 0 0 0 .64 -1.55v-1"></path>
                  </svg>
                </div>
                <span className="nav__item-text">Buy Property</span>
              </Link>
            </li>

            <li
              className={`nav__item ${activeItem === 2 ? "active" : ""}`}
              onClick={() => handleItemClick(2)}
            >
              <Link to="/property_sale" className="nav__item-link">
                <div className="nav__item-icon">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    class="icon icon-tabler icons-tabler-outline icon-tabler-building-warehouse"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                    <path d="M3 21v-13l9 -4l9 4v13"></path>
                    <path d="M13 13h4v8h-10v-6h6"></path>
                    <path d="M13 21v-9a1 1 0 0 0 -1 -1h-2a1 1 0 0 0 -1 1v3"></path>
                  </svg>
                </div>
                <span className="nav__item-text">Sell Property</span>
              </Link>
            </li>

            <li
              className={`nav__item ${activeItem === 3 ? "active" : ""}`}
              onClick={() => handleItemClick(3)}
            >
              <a href="#Settings" className="nav__item-link">
                <div className="nav__item-icon">
                  <DesignServicesIcon sx={{ fontSize: 25 }} />
                </div>
                <span className="nav__item-text">Services</span>
              </a>
            </li>

            {/* <li
              className={`nav__item ${activeItem === 4 ? "active" : ""}`}
              onClick={() => handleItemClick(4)}
            >
              <Link to="/profile_edit" className="nav__item-link">
                <div className="nav__item-icon">
                  <AccountCircleIcon sx={{ fontSize: 25 }} />
                </div>
                <span className="nav__item-text">Profile</span>
              </Link>
            </li> */}
          </ul>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
