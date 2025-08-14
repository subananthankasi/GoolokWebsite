import React, { useEffect, useState } from "react";
import { Loader } from "@googlemaps/js-api-loader";
import { LOGIN_BASE_URL } from "../../Api/api";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {
  cardDeleteThunk,
  cardGetThunk,
  cardListThunk,
  cardPostThunk,
} from "../../Redux/Action/AddToCardThunk";
import Login from "../../Components/Login/Login";
import {
  wishlistGetThunk,
  wishlistPostThunk,
  wishlistVerifyThunk,
} from "../../Redux/Action/WishlistThunk";
import { Skeleton } from "primereact/skeleton";
import { DateFormateCustom } from "../../Utils/DateFormateCustom";

const loaderOptions = {
  id: "google-map-script",
  apiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
  libraries: ["geometry", "places"],
};

function PropertyButton({ property, eid, loading }) {



  const [locationNames, setLocationNames] = useState({});
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchLocationNames = async () => {
      try {
        const loader = new Loader(loaderOptions);
        const google = await loader.load();
        const geocoder = new google.maps.Geocoder();

        const locationPromises = property.map(async (item, index) => {
          if (item.location) {
            const [lat, lng] = item.location.split(",").map(Number);
            if (isNaN(lat) || isNaN(lng)) {
              console.error(
                `Invalid coordinates for ${item.subpro_name}:`,
                item.location
              );
              return "Invalid coordinates";
            }

            return new Promise((resolve) => {
              geocoder.geocode(
                { location: { lat, lng } },
                (results, status) => {
                  if (status === "OK" && results.length > 0) {
                    const addressComponents = results[0].address_components;
                    let cityName = "Unknown Location";

                    for (let component of addressComponents) {
                      if (component.types.includes("locality")) {
                        cityName = component.long_name;
                        break;
                      } else if (component.types.includes("sublocality")) {
                        cityName = component.long_name;
                      } else if (
                        component.types.includes("administrative_area_level_2")
                      ) {
                        cityName = component.long_name;
                      }
                    }
                    resolve(cityName);
                  } else {
                    resolve("Location not found");
                  }
                }
              );
            });
          }
          return "No location provided";
        });

        const resolvedLocations = await Promise.all(locationPromises);
        setLocationNames(resolvedLocations);
      } catch (error) {
        console.error("Google Maps API error:", error);
      }
    };

    if (property.length > 0) {
      fetchLocationNames();
    }
  }, [property]);

  const data = property ? property : [];
  const [getData, setGetData] = useState([]);

  const location = data?.map((item) => item.location);
  const [distance, setDistance] = useState(null);

  const getDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371;
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * (Math.PI / 180)) *
        Math.cos(lat2 * (Math.PI / 180)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c;
    return distance;
  };



  const handleClick = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const userLat = position.coords.latitude;
          const userLon = position.coords.longitude;

          const location = data.map((item) => item.location);

          const targetLocation = location[0];

          if (targetLocation) {
            const [lat, lon] = targetLocation
              .split(",")
              .map((coord) => parseFloat(coord.trim()));

            if (lat && lon) {
              const calculatedDistance = getDistance(
                userLat,
                userLon,
                lat,
                lon
              );
              setDistance(calculatedDistance.toFixed(2));
            } else {
              console.error("Invalid targetLocation format");
            }
          } else {
            console.error("Target location is not available");
          }
        },
        (error) => {
          console.error(error);
        }
      );
    }
  };
  
  const token = localStorage.getItem("zxcvbnm@#");
  const fetch = async () => {
    try {
      const response = await axios.get(`${LOGIN_BASE_URL}/vendor/wishlist`, {
        headers: {
          Authorization: token,
        },
      });
      setGetData(response.data);
    } catch (error) {
      console.error("Error during the request:", error);
    }
  };


  useEffect(() => {
    fetch();
  }, []);

  const [isClicked, setIsClicked] = useState(false);
  const [wishlistStatus, setWishlistStatus] = useState(null);

  const status = property?.map((item) => item.whishlist);

  //...........................................

  const [products, setProducts] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const localStorageCartId = localStorage.getItem("cartId");
  const wishlistVerify = useSelector((state) => state.wishlistVerify.data);

  useEffect(() => {
    fetchProducts();
    fetchWishlist();
    // fetchCardList()
    if (localStorageCartId) {
      dispatch(cardListThunk(localStorageCartId));
    }
  }, [localStorageCartId]);

  const fetchProducts = async () => {
    try {
      const response = await axios.get(`${LOGIN_BASE_URL}/vendor/wishlist`, {
        headers: {
          Authorization: token,
        },
      });
      setProducts(response.data);
    } catch (error) {
      console.error("Error during the request:", error);
    }
  };
  const [cardData, setCardData] = useState([]);

  const fetchShopingCard = async () => {
    try {
      const response = await axios.get(
        `${LOGIN_BASE_URL}/vendor/shoppingcart`,
        {
          headers: {
            Authorization: token,
          },
        }
      );
      setCardData(response.data);
    } catch (error) {
      console.error("Error during the request:", error);
    }
  };
  useEffect(() => {
    fetchShopingCard();
    dispatch(wishlistGetThunk());
    dispatch(wishlistVerifyThunk(eid));
  }, []);

  const fetchWishlist = async () => {
    try {
      const response = await axios.get(
        `${LOGIN_BASE_URL}/vendor/wishlist/${eid}/edit`,
        {
          headers: {
            Authorization: token,
          },
        }
      );
      setWishlist(response.data);
    } catch (error) {
      console.error("Error during the request:", error);
    }
  };

  // const [cardList, setCardList] = useState([])

  // const fetchCardList = async () => {
  //   try {
  //     const response = await axios.get(
  //       `${LOGIN_BASE_URL}/vendor/shoppingcart/${eid}/edit`,
  //       {
  //         headers: {
  //           'Authorization': token
  //         }
  //       }
  //     )
  //     setCardList(response.data);
  //   } catch (error) {
  //     console.error('Error during the request:', error);
  //   }

  // };
  const cardList = useSelector((state) => state.shoppingCardListData?.data);
  // const cardList = useSelector((state) => state.cart);

  const addToWishlist = async (productId) => {
    // try {
    //   await axios.post(
    //     `${LOGIN_BASE_URL}/vendor/wishlist`,
    //     {
    //       enqid: eid,
    //     },
    //     {
    //       headers: {
    //         Authorization: token,
    //       },
    //     }
    //   );
    //   fetch();
    // } catch (error) {
    //   console.error("Error during the request:", error);
    // } finally {
    //   fetchWishlist();
    // }
    try {
      const payload = {
        enqid: eid,
      };
      dispatch(wishlistPostThunk(payload)).then(() => {
        dispatch(wishlistVerifyThunk(eid));
        dispatch(wishlistGetThunk());
      });
      await dispatch(wishlistGetThunk());
      // fetchShopingCard();
    } catch (error) {
      console.error("Error during the request:", error);
    } finally {
      // fetchCardList();
      dispatch(wishlistVerifyThunk(eid));
      dispatch(wishlistGetThunk());
    }
  };
  const handleAddToCard = async (productId) => {
    try {
      const payload = {
        enqid: localStorageCartId ? localStorageCartId : eid,
      };
      dispatch(cardPostThunk(payload)).then(() => {
        dispatch(cardListThunk(localStorageCartId));
        dispatch(cardGetThunk());
      });
      await dispatch(cardGetThunk());
      fetchShopingCard();
    } catch (error) {
      console.error("Error during the request:", error);
    } finally {
      // fetchCardList();
      dispatch(cardListThunk(localStorageCartId));
      dispatch(cardGetThunk());
    }
  };

  const removeFromWishlist = async (productId) => {
    try {
      await axios.delete(`${LOGIN_BASE_URL}/vendor/wishlist/${eid}`, {
        headers: {
          Authorization: token,
        },
      });
      dispatch(wishlistGetThunk());
      dispatch(wishlistVerifyThunk(eid));
    } catch (error) {
      console.error("Error during the request:", error);
    } finally {
      fetchWishlist();
      dispatch(wishlistGetThunk());
      dispatch(wishlistVerifyThunk(eid));
    }
  };
  const removeFromCard = async (productId) => {
    try {
      // await axios.delete(
      //   `${LOGIN_BASE_URL}/vendor/shoppingcart/${eid}`,
      //   {
      //     headers: {
      //       'Authorization': token
      //     }
      //   }
      // );
      dispatch(cardDeleteThunk(eid)).then(() => {
        //  fetchCardList();
        dispatch(cardListThunk(localStorageCartId));
        dispatch(cardGetThunk());
      });
    } catch (error) {
      console.error("Error during the request:", error);
    } finally {
      // fetchCardList();
      dispatch(cardListThunk(localStorageCartId));
    }
  };

  // const isInWishlist = (productId) => wishlist.includes(productId);
  const isInWishlist = wishlist;
  const isInCardList = cardList;
  const condition = useSelector((state) => state.auth.isAuthenticated);

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  useEffect(() => {
    if (condition) {
      setIsAuthenticated(condition);
    } else {
      setIsAuthenticated(token);
    }
  }, [condition, token]);

  const [isModalOpenlogin, setIsModalOpenlogin] = useState(false);

  const openModallogin = () => {
    setIsModalOpenlogin(true);
  };

  const closeModalLogin = () => {
    setIsModalOpenlogin(false);
  };

  return (
    <>
      <Login isOpen={isModalOpenlogin} closeModal={closeModalLogin} />
      <div className="">
        <div className="widget-boxed-body">
          <div className="sidebar-widget author-widget2">
            {loading ? (
              <div>
                <div className="">
                  <Skeleton height="2rem" width="25%" className="mb-1 " />
                  <Skeleton height="2rem" width="50%" className="mb-1" />
                  <Skeleton height="2rem" width="75%" className="mb-1" />
                  <Skeleton height="8rem" width="100%" className="mb-1" />
                  <div className="d-flex flex-column  justify-content-center align-items-center">
                    <Skeleton height="2rem" width="75%" className="mb-1" />
                    <Skeleton height="2rem" width="75%" className="mb-1" />
                    <Skeleton height="2rem" width="75%" className="mb-1" />
                  </div>
                </div>
              </div>
            ) : (
              property?.map((item) => {
                return (
                  <div className="agent-contact-form-sidebar" key={item.id}>
                    {item?.disc_status ==="true" && (
                      <div className="d-flex justify-content-between"> 
                      <span
                        style={{
                          padding: "5px",
                          fontSize: ".625rem",
                          borderRadius: "3px",
                        }}
                        className=" bg-dark me-2 text-white"
                      >
                        {Math.floor(item?.disc_percentage)} %
                      </span>
                      <span style={{color:"red"}} className="text-end"> Discount expiry on {DateFormateCustom(item.to_date)} </span>
                      </div>
                    )}

                    <h2 className="gallery-head mt-2">{item.propertyName}</h2>
                    <div className="d-flex align-items-center">
                      {item?.disc_status === "true" ? (
                        <>
                          <h4 className="old-price me-2">₹ {item.price} </h4>
                          <h4 className="original-price">₹ {item.total_aft_disc}</h4>
                        </>
                      ) : (
                        <h4 className="original-price">₹ {item.price}</h4>
                      )}
                    </div>

                    <div className="property-details container border rounded p-3">
                      <div className="row">
                        {/* First Row */}
                        <div className="col-6 border-bottom  py-2">
                          <div className="d-flex align-items-center">
                            <i class="fa-solid fa-indian-rupee-sign me-2"></i>
                            <div>
                              <strong>{item.per_price} </strong>
                            </div>
                          </div>
                        </div>
                        <div className="col-6 border-bottom py-2">
                          <div className="d-flex align-items-center">
                            <i class="fa-solid fa-location-dot me-2"></i>
                            <div>
                              <strong>
                                {item.village}, {item.taluk}
                              </strong>
                            </div>
                          </div>
                        </div>

                        {/* Second Row */}
                        <div className="col-6  py-2">
                          <div className="d-flex align-items-center">
                            <i className="fa fa-ruler-combined me-2"></i>
                            <div>
                              <strong>60 x 40 sq.ft.</strong>
                            </div>
                          </div>
                        </div>
                        <div className="col-6  py-2">
                          <div className="d-flex align-items-center">
                            <i class="fa-solid fa-road me-2"></i>
                            <div style={{ wordBreak: "break-all" }}>
                              <strong>{item.highlights} </strong>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="text-center">
                      {/* <button className="btn btn-theme w-75 mt-3" onClick={() => handleAddToCard(item.id)}><i class="fa-solid fa-bag-shopping me-1" ></i> Add To Card </button> */}
                      {isAuthenticated ? (
                        isInCardList?.cartStatus === "false" ? (
                          <button
                            className="btn btn-theme w-75 mt-3"
                            onClick={() => removeFromCard(isInCardList.enq)}
                          >
                            <i class="fa-solid fa-bag-shopping me-1"></i> Remove
                            Card
                          </button>
                        ) : (
                          <button
                            className="btn btn-theme w-75 mt-3"
                            onClick={() => handleAddToCard(item.id)}
                          >
                            <i class="fa-solid fa-bag-shopping me-1"></i> Add To
                            Card
                          </button>
                        )
                      ) : (
                        <button
                          className="btn btn-theme w-75 mt-3"
                          onClick={openModallogin}
                        >
                          Add card
                        </button>
                      )}
                      {/* {property?.map((item) => {
                      const isInCart = cart.cartItems.some(
                        (cartItem) => cartItem.vacantId === item.property_id
                      );

                      return (
                        <div key={item.id}>
                          <h5>{item.propertyName}</h5>
                          {isInCart ? (
                            <button
                            onClick={() => dispatch(deleteFromCart(item.property_id))}
                            >
                              Delete from Cart
                            </button>
                          ) : (
                            <button
                            onClick={() => dispatch(addToCart(item))}
                            >
                              Add to Cart
                            </button>
                          )}
                        </div>
                      );
                    })} */}

                      {/* {isAuthenticated ? (
                      isInWishlist.enq !== null ? (
                        <button
                          variant="danger"
                          className="btn btn-transparent red w-75 mt-3"
                          onClick={() => removeFromWishlist(isInWishlist.enq)}
                        >
                          <span className="heart-icon red">&#10084;</span>{" "}
                          Remove from Wishlist
                        </button>
                      ) : (
                        <button
                          variant="primary"
                          className="btn btn-transparent wishlist-button w-75 mt-3"
                          onClick={() => addToWishlist(item.id)}
                        >
                          <span className="heart-icon">&#10084;</span> Add to
                          Wishlist
                        </button>
                      )
                    ) : (
                      <button
                        variant="primary"
                        className="btn btn-transparent wishlist-button w-75 mt-3"
                        onClick={() => addToWishlist(item.id)}
                      >
                        <span className="heart-icon">&#10084;</span> Add to
                        Wishlist
                      </button>
                    )} */}
                      {isAuthenticated ? (
                        wishlistVerify?.whishlist === "false" ? (
                          <button
                            variant="danger"
                            className="btn btn-transparent red w-75 mt-3"
                            onClick={() => removeFromWishlist(isInWishlist.enq)}
                          >
                            <span className="heart-icon red">&#10084;</span>{" "}
                            Remove from Wishlist
                          </button>
                        ) : (
                          <button
                            variant="primary"
                            className="btn btn-transparent wishlist-button w-75 mt-3"
                            onClick={() => addToWishlist(item.id)}
                          >
                            <span className="heart-icon">&#10084;</span> Add to
                            Wishlist
                          </button>
                        )
                      ) : (
                        <button
                          variant="primary"
                          className="btn btn-transparent wishlist-button w-75 mt-3"
                          onClick={() => addToWishlist(item.id)}
                        >
                          <span className="heart-icon">&#10084;</span> Add to
                          Wishlist
                        </button>
                      )}
                      <button
                        className="btn btn-transparent w-75 mt-3"
                        onClick={handleClick}
                      >
                        {distance ? `${distance} km` : "Calculate Distance"}
                      </button>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default PropertyButton;
