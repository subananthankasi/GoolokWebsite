import React, { useEffect, useState } from "react";
import axiosInstance from "../../../Api/axiosInstance";
import Skeleton from "react-loading-skeleton";
import { FaHandshakeSimple } from "react-icons/fa6";
import { ThreeDots } from "react-loader-spinner";
import { useAlert } from "react-alert";
import unsign from "../../../assets/images/profile/unsign.jpg";
import { IMG_PATH } from "../../../Api/api";
import { DateFormateCustom } from "../../../Utils/DateFormateCustom";
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useNavigate } from "react-router-dom";
import img from '../../../assets/images/BEACH.png'
// import { Worker, Viewer } from "@react-pdf-viewer/core";
// import "@react-pdf-viewer/core/lib/styles/index.css";
// import "@react-pdf-viewer/default-layout/lib/styles/index.css";
import { useDispatch, useSelector } from "react-redux";
import { landAgreePdfThunk } from "../../../Redux/Action/LandOwnerAgreement";


export const LandOwnerAgreement = ({ id, tab }) => {
  const alert = useAlert();
  const [isChecked, setIsChecked] = useState(false);
  const [agreeLoading, setAgreeLoading] = useState(false);
  const [ownerData, setOwnerData] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const fetchProposal = async () => {
    try {
      const response = await axiosInstance.get(`/vendor/agreeview/${id}`);
      setOwnerData(response.data);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (tab == 6 || tab == 5) {
      fetchProposal();
    }
  }, [tab]);
  const handleAgree = async () => {

    if (!isChecked) {
      alert.error("You must agree to the terms and conditions to proceed.");
      return;
    }
    setAgreeLoading(true);

    try {
      dispatch(landAgreePdfThunk({ id: ownerData.id }));

      // await axiosInstance.post(
      //   `/vendor/signedproposal`,
      //   { id: ownerData[0].id },

      //   {
      //     headers: {
      //       "Content-Type": "application/json",
      //     },
      //   }
      // );
      alert.success("Agreement has been successfully sent!");
    } catch {
      alert.error("Error! Please try again!");
    } finally {
      setAgreeLoading(false);
      fetchProposal();
    }
  };
  const postLoading = useSelector((state) => state.agreeSigned?.loading)

  const viewPdf = () => {
    const pdfUrl = `${IMG_PATH}/enquiry/agreement/${ownerData.agreement_file}`;
    window.open(pdfUrl, '_blank');
  }
  return (
    <div>
      {loading ? (
        <div className="mt-5" style={{ maxWidth: "400px", margin: "auto" }}>
          <Skeleton height={150} style={{ marginBottom: "10px" }} />
        </div>
      ) : !ownerData || ownerData.length === 0 ? (
        <div className="text-center mt-5">
          <h6 className="fw-bold">Waiting for your Agreement ...</h6>

        </div>
      ) : (
        <>
          {/* {ownerData?.status == "signed" ? ( */}

          {/* <div className="container my-4">
                <div className="text-center mb-4">
                  <h6 className="fw-bold">Land Owner Agreement</h6>
                  <p className="text-muted">
                    Here are the details for the Land Owner Agreement...
                  </p>
                </div>

                <div style={{ maxWidth: "400px", margin: "auto" }}>
                  <div
                    className="p-3 text-center border rounded shadow-sm cardheight"
                    style={{ minHeight: "160px" }}
                  >
                    <div>
                      <FaHandshakeSimple
                        size={30}
                        color="#2f4f4f"
                        style={{
                          width: "50px",
                          height: "50px",
                          border: "1px solid #7a8b8b",
                          borderRadius: "50%",
                          padding: "5px",
                        }}
                      />
                    </div>
                    <p className="mt-3">
                      Your Agreement has been successfully
                      submitted. We have received your agreement and will proceed
                      with the next steps. Thank you for your confirmation.
                    </p>
                  </div>
                </div>
              </div> */}
          {/* ) : ( */}
          <div className="container my-4">
            <div className="text-center mb-4">
              <h6 className="fw-bold">Land Owner Agreement</h6>
              <p className="text-muted">
                Here are the details for the Land Owner Agreement...
              </p>
            </div>
            <div className="row ">
              {/* Unsigned Image */}
              <div className="col-md-6 mb-3">
                <div
                  className="p-3 border rounded shadow-sm cardheight"
                  style={{ minHeight: "160px" }}
                >
                  <a
                    href={`${IMG_PATH}/enquiry/agreement/${ownerData.agreement_file}`}
                    target="_blank"
                  >
                    <img
                      src={unsign}
                      alt="Unsigned Agreement"
                      style={{
                        width: "100%",
                        maxHeight: "100%",
                        cursor: "pointer",
                        height: "95%"
                      }}

                    />
                  </a>
                  <div className='d-flex  justify-content-end'>
                    <button className='btn1 w-100' onClick={() => viewPdf()}>View & Download </button>

                  </div>
                </div>
              </div>

              {/* Signed Image */}
              <div className="col-md-6 mb-3">
                <div className="p-3 border rounded shadow-sm cardheight">
                  <div className="row mt-3">
                    <div className="col-6">Classification:</div>
                    <div className="col-6">
                      <b>{ownerData?.classification}</b>
                    </div>
                  </div>

                  <div className="row mt-3">
                    <div className="col-6">Units:</div>
                    <div className="col-6">
                      <b>{ownerData?.units}</b>
                    </div>
                  </div>

                  <div className="row mt-3">
                    <div className="col-6">Price:</div>
                    <div className="col-6">
                      <b>₹ {ownerData?.price}</b>
                    </div>
                  </div>

                  <div className="row mt-3">
                    <div className="col-6">Total cost:</div>
                    <div className="col-6">
                      <b>₹ {ownerData?.total_cost}</b>
                    </div>
                  </div>
                  <div className="row mt-3">
                    <div className="col-6">Road frontage:</div>
                    <div className="col-6">
                      <b>{ownerData?.road_frontage}</b>
                    </div>
                  </div>
                  <div className="row mt-3">
                    <div className="col-6">Road facing:</div>
                    <div className="col-6">
                      <b>{ownerData?.road_facing}</b>
                    </div>
                  </div>
                  <div className="row mt-3">
                    <div className="col-6">Road width:</div>
                    <div className="col-6">
                      <b>{ownerData?.road_width}</b>
                    </div>
                  </div>
                  <div className="row mt-3">
                    <div className="col-6">Boundary wall:</div>
                    <div className="col-6">
                      <b>{ownerData?.boundary_wall}</b>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {ownerData?.status == "signed" ? (null) : (
              <>
                <div className="flex items-center mb-4 text-center">
                  <input
                    type="checkbox"
                    id="agree"
                    className="mr-2"
                    checked={isChecked}
                    onChange={(e) => setIsChecked(e.target.checked)}
                  />
                  &nbsp;
                  <label htmlFor="agree" className="text-sm">
                    I agree to the terms of the Land Owner Agreement
                  </label>
                </div>

                <div className="text-center">
                  <a
                    className="btn_1 rounded mb-5"
                    style={{ minWidth: "220px" }}
                    onClick={!postLoading ? handleAgree : undefined}
                    disabled={postLoading}
                  >
                    {postLoading ? (
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
                      "Agree"
                    )}
                  </a>
                </div>
              </>
            )}

          </div>
          {/* )} */}
        </>
      )
      }
    </div >
  );
};
