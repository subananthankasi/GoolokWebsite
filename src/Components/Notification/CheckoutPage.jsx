import { useEffect, useState } from "react";
import { Dialog } from "primereact/dialog";
import axios from "axios";
import axiosInstance from "../../Api/axiosInstance";
import API_BASE_URL, {
  IMG_PATH,
  PAYMENT_KEY,
  PAYMENT_KEY_SECRET,
} from "../../Api/api";
import { useFormik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { faHome, faBriefcase } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Checkbox } from "primereact/checkbox";
import Button from "@mui/material/Button";
import { useDispatch, useSelector } from "react-redux";
import {
  cardDeleteThunk,
  cardGetThunk,
  cardListThunk,
} from "../../Redux/Action/AddToCardThunk";
import { useRazorpay } from "react-razorpay";
import { Message } from "primereact/message";
import { ThreeDots } from "react-loader-spinner";
import { Audio } from "react-loader-spinner";
import { Skeleton } from "primereact/skeleton";
import { useAlert } from "react-alert";

const CheckoutPage = () => {
  const { error, isLoading, Razorpay } = useRazorpay();
  const alert = useAlert();
  const token = localStorage.getItem("zxcvbnm@#");
  const [visible, setVisible] = useState(false);
  const [getAddress, setGetAddress] = useState([]);
  const [viewForm, setViewFarm] = useState(false);
  const [state, setState] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState("Home");
  const [paymentLoading, setPaymentLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const stateFetch = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/state`);
      setState(response.data);
    } catch (error) {
      console.error("Error fetching property types:", error);
    }
  };
  useEffect(() => {
    stateFetch();
    dispatch(cardGetThunk());
  }, []);

  const shoppingCardDatas = useSelector((state) => state.cart.cartItems);
  const cartLoading = useSelector((state) => state.cart.loading);
  const [parsedCardValues, setParsedCardValues] = useState([]);

  useEffect(() => {
    if (shoppingCardDatas && shoppingCardDatas.length > 0) {
      const charges = shoppingCardDatas[0]?.charges;
      try {
        if (typeof charges === "string") {
          setParsedCardValues(JSON.parse(charges));
        } else {
          setParsedCardValues([]);
        }
      } catch (error) {
        console.error("Error parsing charges JSON:", error);
        setParsedCardValues([]);
      }
    }
  }, [shoppingCardDatas]);

  const fetch = async () => {
    try {
      const response = await axiosInstance.get(`/vendor/address`);
      setGetAddress(response.data);
    } catch (error) {
      console.error("Error fetching invoice:", error);
    }
  };
  const [couponsData, setCouponsData] = useState();
  const fetchCoupons = async () => {
    try {
      const response = await axiosInstance.get(`/vendor/coupons`);
      setCouponsData(response.data);
    } catch (error) {
      console.error("Error fetching invoice:", error);
    }
  };
  console.log("couppns", couponsData);
  useEffect(() => {
    if (token) {
      fetch();
      fetchCoupons();
    }
  }, []);

  const onSubmit = async (values) => {
    const payload = {
      ...values,
    };
    try {
      const response = await axiosInstance.post("/vendor/address", payload, {});
      formik.resetForm();
      fetch();
      setViewFarm(false);
    } catch (error) {
      console.error(error);
    }
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      mobile: "",
      pincode: "",
      state: "",
      city: "",
      house: "",
      area: "",
    },
    validationSchema: yup.object().shape({
      name: yup.string().required("name is required !!"),
      mobile: yup
        .string()
        .matches(/^[0-9]+$/, "Mobile number must be digits only")
        .length(10, "Mobile number must be exactly 10 digits")
        .required("Mobile is required !!"),
      pincode: yup.string().required("pincode is required !!"),
      state: yup.string().required("state is required !!"),
      city: yup.string().required("city is required !!"),
      house: yup.string().required("house is required !!"),
      area: yup.string().required("area is required !!"),
    }),
    onSubmit,
  });

  const [selectedAddressId, setSelectedAddressId] = useState(null);

  const handleAddressSelect = (id) => {
    setSelectedAddressId((prevId) => (prevId === id ? null : id));
  };

  const handleSubmit = () => {
    if (selectedAddressId) {
      const selectedItem = getAddress.find(
        (item) => item.id === selectedAddressId
      );
      localStorage.setItem("address", JSON.stringify(selectedItem));
      setVisible(false);
    } else {
      alert("Please select an address.");
    }
  };

  const getAddressFromStorage = JSON.parse(localStorage.getItem("address"));
  const deleteLoadingId = useSelector((state) => state.cart.deleteLoadingId);

  const handleRemove = (id) => {
    dispatch(cardDeleteThunk(id)).then(() => {
      dispatch(cardListThunk(id));
      dispatch(cardGetThunk());
    });
  };

  const [remainingAmount, setReminingAmount] = useState([]);

  useEffect(() => {
    if (shoppingCardDatas) {
      const totalBookingAmount = shoppingCardDatas?.reduce((total, item) => {
        const amount = parseFloat(item.booking_amount);
        return total + (isNaN(amount) ? 0 : amount);
      }, 0);
      setReminingAmount(totalBookingAmount);
    }
  }, [shoppingCardDatas]);

  const handlePayment = async () => {
    const payload = {
      amount: remainingAmount,
      vacantid: shoppingCardDatas?.map((item) => item.vacantId),
    };
    setPaymentLoading(true);

    try {
      const response = await axiosInstance.post(`/vendor/ordercreate`, payload);
      const orderData = response.data;
      const options = {
        key: PAYMENT_KEY,
        key_secret: PAYMENT_KEY_SECRET,
        amount: remainingAmount * 100,
        currency: "INR",
        name: "Gharuda infotech",
        description: "for testing purpose",
        order_id: orderData.order_id,

        handler: async function (razorpayResponse) {
          const finalPayload = {
            cartId: shoppingCardDatas?.map((item) => item.cartId),
            invoiceId: orderData?.invoice_id,
            invoice: orderData.invoice_no,
            contact: payload_address?.contact,
            name: payload_address?.name,
            address: payload_address?.address,
            city: payload_address?.city,
            state: payload_address?.state,
            addressid: payload_address?.addressid,
          };
          setPaymentLoading(false);
          try {
            const finalResponse = await axiosInstance.put(
              `/vendor/shoppingcart/${razorpayResponse?.razorpay_payment_id}`,
              finalPayload
            );
            navigate("/properties");
          } catch (submitError) {
            console.error("Final API Error:", submitError);
          }
        },
        notes: {
          address: "Razorpay Corporate office",
        },
        theme: {
          color: "#3399cc",
        },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();

      localStorage.removeItem("address");
    } catch (error) {
      setPaymentLoading(false);
      console.error("Payment API Error:", error);
    } finally {
      setPaymentLoading(false);
    }
  };

  const payload_address = {
    contact: getAddressFromStorage
      ? getAddressFromStorage?.mobile
      : getAddress[0]?.mobile,
    name: getAddressFromStorage
      ? getAddressFromStorage?.name
      : getAddress[0]?.name,
    address: getAddressFromStorage
      ? `${getAddressFromStorage?.house_no},${getAddressFromStorage?.area_colony}`
      : `${getAddress[0]?.house_no},${getAddress[0]?.area_colony}`,
    city: getAddressFromStorage
      ? getAddressFromStorage?.city
      : getAddress[0]?.city,
    state: getAddressFromStorage
      ? getAddressFromStorage?.state
      : getAddress[0]?.state,
    addressid: getAddressFromStorage
      ? getAddressFromStorage?.id
      : getAddress[0]?.id,
  };

  const total =
    shoppingCardDatas?.reduce((sum, item) => {
      const priceNum = parseFloat(item.price?.replace(/,/g, "")) || 0;
      return sum + priceNum;
    }, 0) || 0;

  const discountAmount =
    shoppingCardDatas?.reduce((sum, item) => {
      const valueStr =
        item.disc_status === "true" ? item.total_aft_disc : item.price;
      const valueNum = parseFloat(valueStr?.replace(/,/g, "")) || 0;
      return sum + valueNum;
    }, 0) || 0;

  const discount = total - discountAmount;

  const userMobile = localStorage.getItem("mobile");
  const userId = localStorage.getItem("userid");
  const [couponsCode, setCouponsCode] = useState("");
  const handleCouponClick = async () => {
    const payload = {
      coupon_code: couponsCode,
      cart_total: discountAmount,
      user_id: userId,
    };
    console.log("payload", payload);
    try {
      const response = await axiosInstance.post("/vendor/applyCoupon", payload);
      setCouponsCode("");
      alert.success("You coupon is successfully applied");
    } catch (error) {
      alert.error("Failed to apply your coupon!");
    }
  };
  return (
    <>
      <div className="container checkout-address p-3 p-lg-5 ">
        <div
          className="row"
          // style={{
          //   borderRadius: "10px",
          //   height: "470px",
          //   overflow: "scroll",
          //   scrollbarColor: "white",
          //   scrollbarWidth: "none",
          // }}
        >
          <div
            className=" col-lg-7 col-12  p-0 "
            style={{
              borderRadius: "10px",
              height: "470px",
              overflow: "scroll",
              scrollbarColor: "white",
              scrollbarWidth: "none",
            }}
          >
            <div
              className="card p-0"
              style={{
                height: "70px",
                position: "sticky",
                top: "0",
                zIndex: "1",
              }}
            >
              {cartLoading ? (
                <div className="pt-3 ps-3 pe-3">
                  <Skeleton height="2.5rem" width="100%" className="mb-1" />
                </div>
              ) : getAddressFromStorage ? (
                <>
                  <div className="row p-2">
                    <div className="col-lg-10 col-12">
                      <h6 style={{ fontSize: "12x" }}>
                        Your Address :{" "}
                        <span>
                          <b>
                            {" "}
                            {getAddressFromStorage?.name} ,
                            {getAddressFromStorage?.mobile}{" "}
                          </b>{" "}
                        </span>
                      </h6>
                      <p style={{ color: "gray" }}>
                        {getAddressFromStorage?.house_no},{" "}
                        {getAddressFromStorage?.area_colony},
                        {getAddressFromStorage?.city} ,
                        {getAddressFromStorage?.pincode}{" "}
                      </p>
                    </div>
                    <div
                      className="col-lg-2 col-12 text-center"
                      style={{ alignItems: "center", alignContent: "center" }}
                    >
                      <button
                        className="btn text-primary"
                        style={{
                          border: "1px solid rgb(224, 224, 224)",
                          fontSize: "13px",
                          fontWeight: "600",
                        }}
                        onClick={() => setVisible(true)}
                      >
                        Change
                      </button>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="row p-2">
                    <div className="col-lg-10 col-12">
                      <h6 style={{ fontSize: "12x" }}>
                        Your Address :{" "}
                        <span>
                          <b>
                            {" "}
                            {getAddress[0]?.name} ,{getAddress[0]?.mobile}{" "}
                          </b>{" "}
                        </span>
                      </h6>
                      <p style={{ color: "gray" }}>
                        {getAddress[0]?.house_no}, {getAddress[0]?.area_colony},
                        {getAddress[0]?.city} ,{getAddress[0]?.pincode}{" "}
                      </p>
                    </div>
                    <div
                      className="col-lg-2 col-12 text-center"
                      style={{ alignItems: "center", alignContent: "center" }}
                    >
                      <button
                        className="btn text-primary"
                        style={{
                          border: "1px solid rgb(224, 224, 224)",
                          fontSize: "13px",
                          fontWeight: "600",
                        }}
                        onClick={() => setVisible(true)}
                      >
                        Change
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>

            {cartLoading ? (
              <>
                <div className="card shadow mt-1 " style={{ height: "200px" }}>
                  <div className="row p-4">
                    <div className="col-3">
                      <div className="pt-3 ps-3 pe-3">
                        <Skeleton
                          height="150px"
                          width="150px"
                          // className="mb-2 mt-3"
                        />
                      </div>
                    </div>
                    <div className="col-9">
                      <div className="pt-3 ps-3 ">
                        <Skeleton height="2rem" width="100%" className="mb-1" />
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
                </div>
                <div className="card shadow  mt-1" style={{ height: "200px" }}>
                  <div className="row p-4">
                    <div className="col-3">
                      <div className="pt-3 ps-3 pe-3">
                        <Skeleton
                          height="150px"
                          width="150px"
                          // className="mb-2 mt-3"
                        />
                      </div>
                    </div>
                    <div className="col-9">
                      <div className="pt-3 ps-3 ">
                        <Skeleton height="2rem" width="100%" className="mb-1" />
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
                </div>
              </>
            ) : shoppingCardDatas?.length > 0 ? (
              shoppingCardDatas?.map((item) => {
                return (
                  <div className="card mt-1 " style={{ height: "200px" }}>
                    <div className="row p-4">
                      <div className="col-3">
                        <img
                          src={`${IMG_PATH}enquiry/gallery/${item.image}`}
                          alt="land"
                          className="rounded"
                          style={{ width: "150px", height: "150px" }}
                        />
                      </div>
                      <div className="col-6">
                        <h6>
                          <strong>{item.propertyName} </strong>{" "}
                        </h6>
                        <h6 style={{ color: "gray", fontSize: "14px" }}>
                          Taluk : {item.taluk}
                        </h6>
                        <h6 style={{ color: "gray", fontSize: "14px" }}>
                          Village : {item.village}
                        </h6>
                        <h6 style={{ color: "gray", fontSize: "14px" }}>
                          Unit : {item.units}
                        </h6>
                        {item.disc_status === "true" ? (
                          <div>
                            Price :{" "}
                            <strike
                              className="mx-2"
                              style={{ color: "gray", fontSize: "14px" }}
                            >
                              ₹ {item.price}{" "}
                            </strike>
                            <span style={{ color: "gray", fontSize: "14px" }}>
                              {" "}
                              <b>₹{item.total_aft_disc} </b>
                            </span>
                          </div>
                        ) : (
                          <h6 style={{ color: "gray", fontSize: "14px" }}>
                            Price : ₹{item.price}
                          </h6>
                        )}

                        <h6>
                          <b>
                            {" "}
                            Booking Amount : ₹
                            {item.booking_amount ? item.booking_amount : 0}
                          </b>{" "}
                        </h6>
                      </div>
                      <div
                        className="col-3 d-flex flex-column justify-content-between"
                        style={{ minHeight: "100px" }}
                      >
                        <h6>
                          <strong>{item.landType}</strong>
                        </h6>
                        <button
                          className="btn text-danger card_remove_btn"
                          style={{
                            border: "1px solid rgb(217, 29, 29)",
                            fontSize: "13px",
                            fontWeight: "600",
                            outline: "none",
                          }}
                          onClick={() => handleRemove(item.id)}
                        >
                          {deleteLoadingId === item.id ? (
                            <Audio
                              height="20"
                              width="100"
                              color="rgb(217, 29, 29)"
                              ariaLabel="audio-loading"
                              wrapperStyle={{}}
                              wrapperClass="wrapper-class"
                              visible={true}
                            />
                          ) : (
                            "Remove"
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="text-center mt-5">
                <Message severity="info" text="Shopping Cart is Empty " />
              </div>
            )}
          </div>
          {/* <div className=" col-4 mx-4 p-0 d-flex flex-column ">
            <div
              className="card p-2 m-0"
              style={{
                height: "70px",
                position: "sticky",
                top: "0",
                zIndex: "1",
              }}
            >
              {cartLoading ? (
                <Skeleton height="2rem" width="100%" className="mb-1 mt-1" />
              ) : (
                <p
                  className="text-start p-0 mt-3"
                  style={{ fontSize: "16px", fontWeight: "600" }}
                >
                  PRICE DETAILS
                </p>
              )}
            </div>
            {cartLoading ? (
              <>
                <div className="card mt-1 p-3" style={{ height: "200px" }}>
                  <div className="row">
                    <div className="col-12">
                      <Skeleton height="2rem" width="100%" className="mb-1" />
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
                <div className="card mt-1 p-3" style={{ height: "200px" }}>
                  <div className="row">
                    <div className="col-12">
                      <Skeleton height="2rem" width="100%" className="mb-1" />
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
              </>
            ) : (
              shoppingCardDatas?.map((item) => {
                return (
                  <div className="card mt-1 p-3" style={{ height: "200px" }}>
                    <div className="row">
                      <div
                        className="col-8"
                        style={{ fontSize: "14px", fontWeight: "400" }}
                      >
                        <p style={{ fontSize: "14px", fontWeight: "600" }}>
                          {item.propertyName}{" "}
                        </p>
                        <p> Units </p>
                        <p
                          style={{
                            fontSize: "14px",
                            fontWeight: "600",
                            color: "gray",
                          }}
                        >
                          {" "}
                          Booking Amount{" "}
                        </p>
                        <p style={{ fontSize: "14px", fontWeight: "600" }}>
                          Total
                        </p>
                      </div>
                      <div className="col-4">
                        {item.disc_status === "true" ? (
                          <p
                            style={{
                              fontSize: "14px",
                              fontWeight: "600",
                              textAlign: "end",
                            }}
                          >
                            ₹ {item.total_aft_disc}
                          </p>
                        ) : (
                          <p
                            style={{
                              fontSize: "14px",
                              fontWeight: "600",
                              textAlign: "end",
                            }}
                          >
                            ₹ {item.price}
                          </p>
                        )}
                        <p
                          style={{
                            fontSize: "14px",
                            fontWeight: "400",
                            textAlign: "end",
                          }}
                        >
                          {item.units}
                        </p>
                        <p
                          style={{
                            fontSize: "14px",
                            fontWeight: "600",
                            color: "gray",
                            textAlign: "end",
                          }}
                        >
                          ₹ {item.booking_amount ? item.booking_amount : 0.0}{" "}
                        </p>
                        {item.disc_status === "true" ? (
                          <p
                            style={{
                              fontSize: "14px",
                              fontWeight: "600",
                              textAlign: "end",
                            }}
                          >
                            ₹
                            {(
                              parseFloat(item.total_aft_disc.replace(/,/g, "")) -
                              parseFloat(
                                item.booking_amount?.replace(/,/g, "") || 0
                              )
                            ).toFixed(2)}
                          </p>
                        ) : (
                          <p
                            style={{
                              fontSize: "14px",
                              fontWeight: "600",
                              textAlign: "end",
                            }}
                          >
                            ₹
                            {(
                              parseFloat(item.price.replace(/,/g, "")) -
                              parseFloat(
                                item.booking_amount?.replace(/,/g, "") || 0
                              )
                            ).toFixed(2)}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div> */}
          <div className=" col-4 mx-4 p-0 d-flex flex-column ">
            <div
              className="card p-2 m-0"
              style={{
                height: "70px",
                position: "sticky",
                top: "0",
                zIndex: "1",
              }}
            >
              {cartLoading ? (
                <Skeleton height="2rem" width="100%" className="mb-1 mt-1" />
              ) : (
                <p
                  className="text-start p-0 mt-3"
                  style={{ fontSize: "16px", fontWeight: "600" }}
                >
                  PRICE DETAILS
                </p>
              )}
            </div>
            {cartLoading ? (
              <>
                <div className="card mt-1 p-3" style={{ height: "400px" }}>
                  <div className="row">
                    <div className="col-12">
                      <Skeleton height="2rem" width="100%" className="mb-1" />
                      <Skeleton height="2rem" className="mb-1" />
                      <Skeleton height="2rem" className="mb-1" />
                      <Skeleton
                        height="2rem"
                        width="30%"
                        className="mt-3 mb-3"
                      />
                      <Skeleton height="2rem" className="mb-1" width="70%" />
                      <Skeleton height="2rem" className="mb-1" width="80%" />
                      <Skeleton height="2rem" className="mb-1" width="90%" />
                      <Skeleton height="2rem" className="mb-1" width="100%" />
                      <Skeleton height="2rem" className="mb-1" width="100%" />
                    </div>
                  </div>
                </div>
                {/* <div className="card mt-1 p-3" style={{ height: "200px" }}>
                  <div className="row">
                    <div className="col-12">
                      <Skeleton height="2rem" width="100%" className="mb-1" />
                      <Skeleton height="2rem" className="mb-1" />
                      <Skeleton height="2rem" className="mb-1" />
                      <Skeleton
                        height="2rem"
                        width="30%"
                        className="mt-3 mb-3"
                      />
                    </div>
                  </div>
                </div> */}
              </>
            ) : (
              <div className="card mt-1 p-3" style={{ minHeight: "420px" }}>
                <div className="row">
                  <div
                    className="col-8"
                    style={{ fontSize: "14px", fontWeight: "400" }}
                  >
                    <p style={{ fontSize: "14px", fontWeight: "600" }}>
                      {`Price (${shoppingCardDatas?.length} items)`}
                    </p>
                    <p
                      style={{
                        fontSize: "14px",
                        fontWeight: "600",
                      }}
                    >
                      Discount
                    </p>
                    <p
                      style={{
                        fontSize: "14px",
                        fontWeight: "600",
                      }}
                    >
                      Coupons
                    </p>
                    <p style={{ fontSize: "14px", fontWeight: "600" }}>
                      Sub Total
                    </p>
                  </div>
                  <div className="col-4">
                    <p
                      style={{
                        fontSize: "14px",
                        fontWeight: "600",
                        textAlign: "end",
                      }}
                    >
                      ₹{" "}
                      {total.toLocaleString("en-IN", {
                        minimumFractionDigits: 2,
                      })}
                    </p>

                    <p
                      style={{
                        fontSize: "14px",
                        fontWeight: "600",
                        textAlign: "end",
                        color: "green",
                      }}
                    >
                      -{" "}
                      {discount.toLocaleString("en-IN", {
                        minimumFractionDigits: 2,
                      })}
                    </p>
                    <p
                      style={{
                        fontSize: "14px",
                        fontWeight: "600",
                        color: "green",
                        textAlign: "end",
                      }}
                    >
                      ₹ -200
                    </p>

                    <p
                      style={{
                        fontSize: "14px",
                        fontWeight: "600",
                        textAlign: "end",
                      }}
                    >
                      ₹{" "}
                      {discountAmount.toLocaleString("en-IN", {
                        minimumFractionDigits: 2,
                      })}
                    </p>
                  </div>
                </div>
                <hr />
                <div className="row">
                  <div className="col-7">
                    <p
                      style={{
                        fontSize: "18px",
                        fontWeight: "600",
                      }}
                    >
                      Total
                    </p>
                    <p
                      style={{
                        fontSize: "14px",
                        fontWeight: "600",
                        color: "green",
                      }}
                    >
                      Total Booking Amount
                    </p>
                  </div>
                  <div className="col-5">
                    <p
                      style={{
                        fontSize: "18px",
                        fontWeight: "600",
                        textAlign: "end",
                      }}
                      id="total"
                    >
                      ₹
                      {discountAmount.toLocaleString("en-IN", {
                        minimumFractionDigits: 2,
                      })}
                    </p>
                    <p
                      style={{
                        fontSize: "14px",
                        fontWeight: "600",
                        color: "green",
                      }}
                      className="text-end"
                      id="booking-amount"
                    >
                      {" "}
                      ₹ {remainingAmount}
                    </p>
                  </div>
                </div>
                <div className="">
                  <label htmlFor="" className="form-label text-secondary">
                    <b> Enter a coupon code</b>
                  </label>
                  <div className="d-flex gap-3">
                    <input
                      type="text"
                      className="form-control"
                      value={couponsCode}
                      onChange={(e) => setCouponsCode(e.target.value)}
                      style={{
                        fontSize: "16px",
                        color: "gray",
                        fontWeight: "800",
                      }}
                    />
                    <button
                      className="apply-btn"
                      onClick={handleCouponClick}
                      disabled={!couponsCode}
                    >
                      Apply
                    </button>
                  </div>
                </div>
                <div className="mt-3">
                  <button
                    className="btn p-3 w-100 mb-2"
                    style={{
                      backgroundColor: "#fb641b",
                      fontSize: "16px",
                      fontWeight: "600",
                      color: "white",
                    }}
                    onClick={handlePayment}
                    disabled={paymentLoading}
                  >
                    {paymentLoading ? (
                      <ThreeDots
                        visible={true}
                        height="20"
                        width="80"
                        color="#ffffff"
                        radius="18"
                        ariaLabel="three-dots-loading"
                        wrapperStyle={{
                          justifyContent: "center",
                          fontSize: "12px",
                        }}
                        wrapperClass=""
                      />
                    ) : (
                      `PROCEED TO PAY ${remainingAmount}`
                    )}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
        {/* <div className="row mt-3">
          <div className="col-7"></div>
          <div className="col-4 mx-4">
            <label htmlFor="" className="form-label text-secondary">
              <b> Enter a coupon code</b>
            </label>
            <div className="d-flex gap-3">
              <input type="text" className="form-control" />
              <button className="apply-btn">Apply</button>
            </div>
          </div>
        </div> */}
        {/* <div className="row mt-1">
          <div className="col-7"></div>
          <div className="col-4 mx-4 mt-2 ">
            <p
              className="text-end"
              style={{ fontSize: "14px", fontWeight: "600", color: "green" }}
            >
              Total Booking Amount : ₹ {remainingAmount}
            </p>
          </div>
        </div> */}
        {/* <div className="row ">
          <div className="col-7"></div>
          <div className="col-4 mx-4 m">
            <button
              className="btn p-3 w-100 mb-2"
              style={{
                backgroundColor: "#fb641b",
                fontSize: "16px",
                fontWeight: "600",
                color: "white",
              }}
              onClick={handlePayment}
              disabled={paymentLoading}
            >
              {paymentLoading ? (
                <ThreeDots
                  visible={true}
                  height="20"
                  width="80"
                  color="#ffffff"
                  radius="18"
                  ariaLabel="three-dots-loading"
                  wrapperStyle={{
                    justifyContent: "center",
                    fontSize: "12px",
                  }}
                  wrapperClass=""
                />
              ) : (
                `PROCEED TO PAY ${remainingAmount}`
              )}
            </button>
          </div>
        </div> */}
      </div>
      <Dialog
        header="Address"
        visible={visible}
        style={{ width: "50vw", height: "80vh" }}
        onHide={() => {
          if (!visible) return;
          setVisible(false);
        }}
      >
        {viewForm ? (
          <>
            <form
              onSubmit={formik.handleSubmit}
              className="p-4 shadow-sm rounded bg-white"
            >
              <div className="row">
                <div className="col-6 mb-3">
                  <label className="form-label">Full Name *</label>
                  <input
                    type="text"
                    name="name"
                    className="form-control"
                    placeholder="Enter your Name"
                    value={formik.values.name}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.errors.name && formik.touched.name ? (
                    <p style={{ color: "red", fontSize: "12px" }}>
                      {formik.errors.name}
                    </p>
                  ) : null}
                </div>
                <div className="col-6 mb-3">
                  <label className="form-label">Mobile No *</label>
                  <input
                    type="text"
                    name="mobile"
                    className="form-control"
                    placeholder="Enter your mobile number"
                    value={formik.values.mobile}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.errors.mobile && formik.touched.mobile ? (
                    <p style={{ color: "red", fontSize: "12px" }}>
                      {formik.errors.mobile}
                    </p>
                  ) : null}
                </div>
                <div className="col-md-6 mb-3">
                  <label className="form-label">Pin Code *</label>
                  <input
                    type="text"
                    name="pincode"
                    value={formik.values.pincode}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className="form-control"
                    placeholder="Enter pin code"
                  />
                  {formik.errors.pincode && formik.touched.pincode ? (
                    <p style={{ color: "red", fontSize: "12px" }}>
                      {formik.errors.pincode}
                    </p>
                  ) : null}
                </div>
                <div className="col-md-6 mb-3">
                  <label className="form-label">State *</label>
                  <select
                    className="form-select"
                    name="state"
                    value={formik.values.state}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    style={{ height: "30px" }}
                  >
                    <option value="">Select...</option>
                    {state?.map((item) => (
                      <option key={item.id} value={item.id}>
                        {item.state_name}
                      </option>
                    ))}
                  </select>
                  {formik.errors.state && formik.touched.state ? (
                    <p style={{ color: "red", fontSize: "12px" }}>
                      {formik.errors.state}
                    </p>
                  ) : null}
                </div>
                <div className="col-md-6 mb-3">
                  <label className="form-label">City *</label>
                  <input
                    type="text"
                    name="city"
                    className="form-control"
                    placeholder="Enter city"
                    value={formik.values.city}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.errors.city && formik.touched.city ? (
                    <p style={{ color: "red", fontSize: "12px" }}>
                      {formik.errors.city}
                    </p>
                  ) : null}
                </div>
                <div className="col-6 mb-3">
                  <label className="form-label">
                    House No., Building Name *
                  </label>
                  <input
                    type="text"
                    name="house"
                    value={formik.values.house}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className="form-control"
                    placeholder="Enter address"
                  />
                  {formik.errors.house && formik.touched.house ? (
                    <p style={{ color: "red", fontSize: "12px" }}>
                      {formik.errors.house}
                    </p>
                  ) : null}
                </div>

                <div className="col-6 mb-3">
                  <label className="form-label">Area Colony *</label>
                  <input
                    type="text"
                    name="area"
                    className="form-control"
                    value={formik.values.area}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    placeholder="Enter area or colony"
                  />
                  {formik.errors.area && formik.touched.area ? (
                    <p style={{ color: "red", fontSize: "12px" }}>
                      {formik.errors.area}
                    </p>
                  ) : null}
                </div>
                <div className="col-6 mb-3">
                  <label className="form-label d-block">Type Of Address</label>
                  <div className="d-flex gap-2">
                    <button
                      type="button"
                      className={`btn ${
                        selectedAddress === "Home" ? "btn-dark" : "btn-light"
                      } border`}
                      onClick={() => setSelectedAddress("Home")}
                    >
                      <FontAwesomeIcon icon={faHome} className="me-2" />
                      Home
                    </button>
                    <button
                      type="button"
                      className={`btn ${
                        selectedAddress === "Work" ? "btn-dark" : "btn-light"
                      } border`}
                      onClick={() => setSelectedAddress("Work")}
                    >
                      <FontAwesomeIcon icon={faBriefcase} className="me-2" />
                      Work
                    </button>
                  </div>
                </div>
              </div>

              <div className="d-flex justify-content-end mt-3 gap-2">
                <button
                  className="btn btn-dark"
                  type="button"
                  onClick={() => {
                    setViewFarm(false);
                    formik.resetForm();
                  }}
                >
                  View Address
                </button>

                <button type="submit" className="btn btn-dark">
                  Save Address
                </button>
              </div>
            </form>
          </>
        ) : (
          <>
            <div className="text-end">
              <button
                className="btn text-primary"
                style={{
                  backgroundColor: "#fff",
                  color: "#333",
                  fontWeight: 600,
                  border: "1px solid #ddd",
                  borderRadius: "6px",
                  padding: "8px 16px",
                  fontSize: "14px",
                  boxShadow: "0 1px 4px rgba(0, 0, 0, 0.08)",
                  transition: "box-shadow 0.3s ease",
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.boxShadow =
                    "0 4px 12px rgba(0, 0, 0, 0.15)";
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.boxShadow =
                    "0 1px 4px rgba(0, 0, 0, 0.08)";
                }}
                onClick={() => setViewFarm(true)}
              >
                + Add New Address
              </button>
            </div>
            <div
              style={{
                maxHeight: "400px",
                overflow: "scroll",
                scrollbarColor: "white",
                scrollbarWidth: "none",
                msOverflowStyle: "none",
              }}
            >
              {getAddress?.map((item) => {
                return (
                  <div className="card p-0 mt-2">
                    <div className="row p-2">
                      <div className="col-10">
                        <h6 style={{ fontSize: "12x" }}>
                          Your Address :{" "}
                          <span>
                            <b>
                              {" "}
                              {item.name} ,{item.mobile}{" "}
                            </b>{" "}
                          </span>
                        </h6>
                        <p style={{ color: "gray" }}>
                          {item.house_no}, {item.area_colony},{item.city} ,
                          {getAddress[0]?.pincode}{" "}
                        </p>
                      </div>
                      <div
                        className="col-2 text-center"
                        style={{ alignItems: "center", alignContent: "center" }}
                      >
                        <Checkbox
                          onChange={() => handleAddressSelect(item.id)}
                          checked={selectedAddressId === item.id}
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="d-flex justify-content-end mt-3">
              <Button variant="contained" type="button" onClick={handleSubmit}>
                Submit
              </Button>
            </div>
          </>
        )}
      </Dialog>
    </>
  );
};

export default CheckoutPage;
