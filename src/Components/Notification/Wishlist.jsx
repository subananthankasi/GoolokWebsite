import React, { useEffect, useState } from "react";
import FavoriteBorderRoundedIcon from "@mui/icons-material/FavoriteBorderRounded";
import img from "../../assets/images/villa4.jpg";
import Badge from "@mui/material/Badge";
import axios from "axios";
import { IMG_PATH, LOGIN_BASE_URL } from "../../Api/api";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import { useDispatch, useSelector } from "react-redux";
import Button from "@mui/material/Button";
import Login from "../Login/Login";
import { Link } from "react-router-dom";
import {
  wishlistGetThunk,
  wishlistVerifyThunk,
} from "../../Redux/Action/WishlistThunk";
const Wishlist = () => {
  const token = localStorage.getItem("zxcvbnm@#");
  //   const [data, setData] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const condition = useSelector((state) => state.auth.isAuthenticated);
  const dispatch = useDispatch();

  useEffect(() => {
    if (condition) {
      setIsAuthenticated(condition);
    } else {
      setIsAuthenticated(token);
    }
  }, [condition, token]);
  // const fetch = async () => {
  //     try {

  //         const response = await axios.get(
  //             `${LOGIN_BASE_URL}/vendor/wishlist`,
  //             {
  //                 headers: {
  //                     'Authorization': token,
  //                 }
  //             }
  //         );
  //         setData(response.data);
  //     } catch (error) {
  //         console.error('Error during the request:', error);
  //     }
  // };
  useEffect(() => {
    if (token) {
      // fetch();
      dispatch(wishlistGetThunk());
    }
  }, [token]);
  // useEffect(() => {
  //     if (token) {
  //         fetch();

  //         const intervalId = setInterval(() => {
  //             fetch();
  //         }, 2000);

  //         return () => clearInterval(intervalId);
  //     }

  // }, [token]);

  const deleteWishlist = async () => {
    try {
      await axios.delete(`${LOGIN_BASE_URL}/vendor/wishlist/${data?.[0]?.id}`, {
        headers: {
          Authorization: token,
        },
      });
      // fetch()
      dispatch(wishlistGetThunk());
      dispatch(wishlistVerifyThunk(data?.[0]?.id));
    } catch (error) {
      console.error("Error during the request:", error);
    } finally {
      // fetch()
      // window.location.reload()
      dispatch(wishlistGetThunk());
      dispatch(wishlistVerifyThunk(data?.[0]?.id));
    }
  };

  //   const count = data.length;
  const [isModalOpenlogin, setIsModalOpenlogin] = useState(false);

  const openModallogin = () => {
    setIsModalOpenlogin(true);
  };

  const closeModalLogin = () => {
    setIsModalOpenlogin(false);
  };
  const data = useSelector((state) => state.wishlist.wishlistItems);
  const wishlistCount = useSelector((state) => state.wishlist.wishlistCount);

  return (
    <>
      <Login isOpen={isModalOpenlogin} closeModal={closeModalLogin} />

      <div>
        <div className="nav-item dropdown ">
          <div
            style={{ textAlign: "center", alignItems: "center" }}
            className="nav-link  d-block align-items-center p-0"
            id="navbarDropdown"
            role="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            {/* <Badge badgeContent={count} color="success">
              <FavoriteBorderRoundedIcon sx={{ fontSize: 25 }} />
            </Badge> */}
            <Badge badgeContent={wishlistCount} color="success">
              <FavoriteBorderRoundedIcon sx={{ fontSize: 25 }} />
            </Badge>
          </div>
          {!isAuthenticated ? (
            <ul
              className="dropdown-menu"
              aria-labelledby="navbarDropdown"
              style={{
                minWidth: "15rem",
                padding: "0px",
                left: "-155px",
                maxHeight: "400px",
                overflowY: "scroll",
              }}
            >
              <div className="mt-3" style={{ textAlign: "center" }}>
                <Button
                  variant="outlined"
                  sx={{ width: 130 }}
                  onClick={openModallogin}
                >
                  Log in
                </Button>
                <p className="mt-2" style={{ fontSize: "13px" }}>
                  To add or view item(s) part of your wishlist{" "}
                </p>
              </div>
            </ul>
          ) : (
            <ul
              className="dropdown-menu"
              aria-labelledby="navbarDropdown"
              style={{
                minWidth: "24rem",
                padding: "0px",
                left: "-310px",
                maxHeight: "400px",
                overflowY: "scroll",
              }}
            >
              {data && Array.isArray(data) && data.length > 0 ? (
                data.map((item) => {
                  return (
                    <div className="card m-2">
                      <Link to={`/property/${item.id}/${item.propertyType}`}>
                        <div className="row" style={{ height: "130px" }}>
                          <div className="col-6 ">
                            <img
                              src={`${IMG_PATH}enquiry/gallery/${item.image}`}
                              alt=""
                              style={{ height: "130px", width: "100%" }}
                            />
                          </div>
                          <div className="col-6 p-0 mt-1">
                            <div className="d-flex justify-content-between">
                              <h3
                                style={{ fontSize: "15px" }}
                                className="m-0 text-dark"
                              >
                                {item.landType}
                              </h3>
                              <button
                                className="btn mx-3 p-0"
                                style={{ color: "red" }}
                                onClick={deleteWishlist}
                              >
                                <HighlightOffIcon />
                              </button>
                            </div>
                            <p
                              className="p-0 m-0"
                              style={{
                                fontSize: "12px",
                                fontWeight: "500",
                                color: "gray",
                              }}
                            >
                              {item.propertyName}
                            </p>
                            <p
                              className="p-0 m-0"
                              style={{
                                fontSize: "12px",
                                fontWeight: "500",
                                color: "gray",
                              }}
                            >
                              <i
                                className="fa-solid fa-ruler-combined"
                                style={{ color: "black" }}
                              ></i>
                              {item.units}
                            </p>
                            <p
                              className="p-0 m-0"
                              style={{
                                fontSize: "12px",
                                fontWeight: "500",
                                color: "gray",
                              }}
                            >
                              <i
                                className="fa fa-map-marker"
                                style={{ color: "black" }}
                              />
                              <span className="mx-1">
                                {item.village} , {item.taluk}
                              </span>
                            </p>
                            <div className="price-properties footer d-flex justify-content-between p-0">
                              <p className="bottom_price mb-0 p-0">
                                <i
                                  className="fa fa-inr"
                                  aria-hidden="true"
                                  style={{ fontSize: 12 }}
                                />
                                {item.price}
                              </p>
                            </div>
                          </div>
                        </div>
                      </Link>
                    </div>
                  );
                })
              ) : (
                <div className="card m-2">
                  <div className="container d-flex justify-content-center mt-2">
                    <p> No Wishlist data</p>
                  </div>
                </div>
              )}
            </ul>
          )}
        </div>
      </div>
    </>
  );
};

export default Wishlist;
