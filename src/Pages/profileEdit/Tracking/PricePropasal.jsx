import React, { useEffect, useState } from 'react'
import axiosInstance from '../../../Api/axiosInstance';
import Skeleton from "react-loading-skeleton";
import { FaHandshakeSimple } from "react-icons/fa6";
import unsign from "../../../assets/images/profile/unsign.jpg";
import { ThreeDots } from "react-loader-spinner";
import { IMG_PATH } from '../../../Api/api';
import { DateFormateCustom } from '../../../Utils/DateFormateCustom';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { Document, Page, pdfjs } from 'react-pdf';
import DownloadIcon from '@mui/icons-material/Download';

pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
const PricePropasal = ({ id, activeTab }) => {

    const [proposalData, setProposalData] = useState([])
    const [loadingProposal, setLoadingProposal] = useState(true)
    const [isChecked, setIsChecked] = useState(false);
    const [agreeLoading, setAgreeLoading] = useState(false)


    const handleAgree = async () => {
        if (!isChecked) {
            alert.error(
                "You must agree to the terms and conditions to proceed."
            );
            return
        }
        setAgreeLoading(true)

        try {
            await axiosInstance.post(`/vendor/signedproposal`, { id: proposalData[0].id }, {
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            alert.success("Agreement has been successfully sent!");
        } catch (error){
            console.error("error",error)
        } finally {
            setAgreeLoading(false)
            fetchProposal();
        }
    }
    const fetchProposal = async () => {
        try {
            const response = await axiosInstance.get(`/vendor/signedview/${id}`);
            setProposalData(response.data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoadingProposal(false);
        }
    };

    useEffect(() => {
        if (activeTab == 2) {
            fetchProposal();
        }
    }, [activeTab])


    const fileString = "https://webman.co.in/goolok/uploads/enquiry/proposal/1740473401_1fd82800d0d7634e7c62.pdf";


    const viewPdf = () => {
        const pdfUrl = `${IMG_PATH}/enquiry/proposal/${proposalData[0]?.document}`;
        window.open(pdfUrl, '_blank');
    }



    return (
        // <>
        //     {loadingProposal ? (
        //         <div className="mt-5" style={{ maxWidth: "400px", margin: "auto" }}>
        //             <Skeleton height={150} style={{ marginBottom: "10px" }} />
        //         </div>
        //     ) : (
        //         <>
        //             <div className="container my-4">
        //                 <div className="text-center mb-4">
        //                     <h6 className="fw-bold">Price Proposal Agreement</h6>
        //                     <p className="text-muted">
        //                         Here are the details for the Price Proposal Agreement...
        //                     </p>
        //                 </div>
        //                 <div className="row">

        //                     <div className="col-md-6 mb-3">
        //                         <div
        //                             className="p-3 border rounded shadow-sm cardheight"
        //                             style={{ minHeight: "160px" }}
        //                         >
        //                             <a
        //                                 href={`${IMG_PATH}/enquiry/proposal/${proposalData[0]?.document}`}
        //                                 target="_blank"
        //                             >
        //                                 <img
        //                                     src={unsign}
        //                                     alt="Unsigned Agreement"
        //                                     style={{
        //                                         width: "100%",
        //                                         maxHeight: "136px",
        //                                         cursor: "pointer",
        //                                     }}
        //                                 />
        //                             </a>
        //                             <div className='d-flex mt-3 justify-content-end'>
        //                                 <button className='btn1 w-100' onClick={() => viewPdf()}>View & Download  </button>
        //                             </div>
        //                         </div>

        //                     </div>

        //                     <div className="col-md-6 mb-3">
        //                         <div className="p-3 border rounded shadow-sm cardheight">
        //                             <div className="row">
        //                                 <div className="col-6">Name:</div>
        //                                 <div className="col-6">
        //                                     <b>{proposalData[0]?.customer}</b>
        //                                 </div>
        //                             </div>

        //                             <div className="row mt-3">
        //                                 <div className="col-6">Unit Price:</div>
        //                                 <div className="col-6">
        //                                     <b>₹ {proposalData[0]?.proposal_unit}/Sqft</b>
        //                                 </div>
        //                             </div>

        //                             <div className="row mt-3">
        //                                 <div className="col-6">Total Price:</div>
        //                                 <div className="col-6">
        //                                     <b>₹ {proposalData[0]?.proposal_price}</b>
        //                                 </div>
        //                             </div>

        //                             <div className="row mt-3">
        //                                 <div className="col-6">Date:</div>
        //                                 <div className="col-6">
        //                                     <b>{DateFormateCustom(proposalData[0]?.created_at)}</b>
        //                                 </div>
        //                             </div>
        //                         </div>
        //                     </div>
        //                 </div>
        //                 {proposalData[0]?.status === "signed" ? (null) : (
        //                     <>
        //                         <div className="flex items-center mb-4 text-center">
        //                             <input
        //                                 type="checkbox"
        //                                 id="agree"
        //                                 className="mr-2"
        //                                 checked={isChecked}
        //                                 onChange={(e) => setIsChecked(e.target.checked)}
        //                             />
        //                             &nbsp;
        //                             <label htmlFor="agree" className="text-sm">
        //                                 I agree to the terms of the Price Proposal Agreement
        //                             </label>
        //                         </div>

        //                         <div className="text-center">
        //                             <a
        //                                 className="btn_1 rounded mb-5"
        //                                 style={{ minWidth: "220px" }}
        //                                 onClick={!agreeLoading ? handleAgree : undefined}
        //                                 disabled={agreeLoading}
        //                             >
        //                                 {agreeLoading ? (
        //                                     <ThreeDots
        //                                         visible={true}
        //                                         height="20"
        //                                         width="80"
        //                                         color="#ffffff"
        //                                         radius="18"
        //                                         ariaLabel="three-dots-loading"
        //                                         wrapperStyle={{
        //                                             justifyContent: "center",
        //                                             fontSize: "12px",
        //                                         }}
        //                                         wrapperClass=""
        //                                     />
        //                                 ) : (
        //                                     "Agree"
        //                                 )}
        //                             </a>
        //                         </div>
        //                     </>
        //                 )}

        //             </div>
        //         </>

        //     )}
        // </>
        <>
            {loadingProposal ? (
                <div className="mt-5" style={{ maxWidth: "400px", margin: "auto" }}>
                    <Skeleton height={150} style={{ marginBottom: "10px" }} />
                </div>
            ) : proposalData.length === 0 || !proposalData[0] ? (
                <div className="text-center mt-5">
                    <h6 className="fw-bold">Waiting for your proposal...</h6>
                    <p className="text-muted">Your price proposal agreement is not yet available.</p>
                </div>
            ) : (
                <>
                    <div className="container my-4">
                        <div className="text-center mb-4">
                            <h6 className="fw-bold">Price Proposal Agreement</h6>
                            <p className="text-muted">
                                Here are the details for the Price Proposal Agreement...
                            </p>
                        </div>
                        <div className="row">
                            {/* Unsigned Image */}
                            <div className="col-md-6 mb-3">
                                <div
                                    className="p-3 border rounded shadow-sm cardheight"
                                    style={{ minHeight: "160px" }}
                                >
                                    <a
                                        href={`${IMG_PATH}/enquiry/proposal/${proposalData[0]?.document}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <img
                                            src={unsign}
                                            alt="Unsigned Agreement"
                                            style={{
                                                width: "100%",
                                                maxHeight: "136px",
                                                cursor: "pointer",
                                            }}
                                        />
                                    </a>
                                    <div className="d-flex mt-3 justify-content-end">
                                        <button className="btn1 w-100" onClick={() => viewPdf()}>
                                            View & Download
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* Signed Image */}
                            <div className="col-md-6 mb-3">
                                <div className="p-3 border rounded shadow-sm cardheight">
                                    <div className="row">
                                        <div className="col-6">Name:</div>
                                        <div className="col-6">
                                            <b>{proposalData[0]?.customer}</b>
                                        </div>
                                    </div>

                                    <div className="row mt-3">
                                        <div className="col-6">Unit Price:</div>
                                        <div className="col-6">
                                            <b>₹ {proposalData[0]?.proposal_unit}/Sqft</b>
                                        </div>
                                    </div>

                                    <div className="row mt-3">
                                        <div className="col-6">Total Price:</div>
                                        <div className="col-6">
                                            <b>₹ {proposalData[0]?.proposal_price}</b>
                                        </div>
                                    </div>

                                    <div className="row mt-3">
                                        <div className="col-6">Date:</div>
                                        <div className="col-6">
                                            <b>{DateFormateCustom(proposalData[0]?.created_at)}</b>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {proposalData[0]?.status === "signed" ? null : (
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
                                        I agree to the terms of the Price Proposal Agreement
                                    </label>
                                </div>

                                <div className="text-center">
                                    <a
                                        className="btn_1 rounded mb-5"
                                        style={{ minWidth: "220px" }}
                                        onClick={!agreeLoading ? handleAgree : undefined}
                                        disabled={agreeLoading}
                                    >
                                        {agreeLoading ? (
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
                </>
            )}
        </>

    )
}

export default PricePropasal