import { IMG_PATH } from "../../../Api/api";
import axiosInstance from "../../../Api/axiosInstance";
import React, { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";

export const FMBSketch = ({ id, tab }) => {
  const [sketchData, setSketchData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchSketch = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get(`/vendor/sketchview/${id}`);
      setSketchData(response.data);
    } catch (error) {
      console.error("Error fetching invoice:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (tab === 5) {
      fetchSketch();
    }
  }, [tab]);


  return (
    <div className="row ">
      {loading ? (
        Array(2)
          .fill(0)
          .map((_, index) => (
            <div className="col-md-6 mt-3 p-4 " key={index}>
              <Skeleton height={100} style={{ marginBottom: "10px" }} />
            </div>
          ))
      ) : sketchData.length === 0 || !sketchData[0] ? (
        <div className="text-center mt-5">
          <h6 className="fw-bold">Waiting for your FMB Sketch...</h6>
         
        </div>
      ) : (
        <>
          {sketchData?.map((item, index) => (
            <div className="col-md-6 mt-3" key={item.id}>
              <section className="card p-4 cardheight text-center justify-content-center">
                <h6 className="mb-3 ">Document {index + 1}</h6>

                <div>
                  <a
                    href={`${IMG_PATH}/enquiry/sketch/${item.document}`}
                    class="btn btn-warning ms-2"
                    download="download"
                    target="_blank"
                  >
                    <i class="fa fa-download"></i>
                  </a>
                </div>
              </section>
            </div>
          ))}
        </>
      )}
    </div>
  );
};
