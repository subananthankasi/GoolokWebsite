import { IMG_PATH } from "../../../Api/api";
import axiosInstance from "../../../Api/axiosInstance";
import React, { useEffect, useState } from "react";
import unsign from "../../../assets/images/profile/unsign.jpg";
import Skeleton from "react-loading-skeleton";
import VisibilityIcon from '@mui/icons-material/Visibility';
import DownloadIcon from '@mui/icons-material/Download';


export const LawyerOpinion = ({ id, tab }) => {
  const [lawyerData, setLawyerData] = useState({});
  const [loading, setLoading] = useState(true);

  const fetchLawyer = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get(`/vendor/opinionview/${id}`);
      setLawyerData(response.data);
    } catch (error) {
      console.error("Error fetching invoice:", error);
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    if (tab === 4 || tab ===1 || tab ===2) {
      fetchLawyer();
    }
  }, [tab]);
  const viewPdf = () => {
    const pdfUrl = `${IMG_PATH}enquiry/lawyer/${lawyerData[0]?.document}`;
    window.open(pdfUrl, '_blank');
  }







  return (
    <div>
      {loading ? (
        <div >
          <Skeleton
            height={450}
            style={{ marginBottom: "10px" }}
          />
        </div>) : !lawyerData || lawyerData.length === 0 ? (
          <div className="text-center mt-5">
          <h6 className="fw-bold">Waiting for your Lawyer Documents...</h6>
         
      </div>
        )


        :
        <div className="container my-4">
          <div className="text-center mb-4">
            <h6 className="fw-bold">Lawyer Opinion</h6>
            <p className="text-muted">
              Here is the opinion of the lawyer...click on below to view
            </p>
          </div>

          <div className="mb-3">
            <div
              className="p-3 border rounded shadow-sm cardheight"
              style={{ minHeight: "200px", maxWidth: "250px", margin: "auto" }}
            >
              <a
                href={`${IMG_PATH}/enquiry/lawyer/${lawyerData[0]?.document}`}
                target="_blank"
              >
                <img
                  src={unsign}
                  alt="Unsigned Agreement"
                  style={{ width: "100%", maxHeight: "170px", cursor: "pointer" }}
                />
              </a>
              <div className='d-flex mt-2 justify-content-end'>
                <button className='btn1 w-100' onClick={() => viewPdf()}>View & Download </button>

              </div>
            </div>
          </div>

          {/* <div className="mt-4">
          <h6>Positive opinion</h6>
          <div
            className="text-muted"
            style={{ textIndent: "50px" }}
            dangerouslySetInnerHTML={{ __html: lawyerData[0]?.positive }}
          />
        </div> */}
          {/* <div className="mt-4">
          <h6>Negative opinion</h6>
          <div
            className="text-muted"
            style={{ textIndent: "50px" }}
            dangerouslySetInnerHTML={{ __html: lawyerData[0]?.negative }}
          />
        </div> */}
        </div>
      }
    </div>
  );
};
