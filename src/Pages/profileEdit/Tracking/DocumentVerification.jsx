import React, { useState } from "react";
import axios from "axios";
import axiosInstance from "../../../Api/axiosInstance";
import { useAlert } from "react-alert";
import { IMG_PATH } from "../../../Api/api";


// import { Document, Page } from 'react-pdf';
// import { pdfjs } from 'react-pdf';

// pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;


// import { Document, Page,pdfjs  } from 'react-pdf';

// pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;


const DocumentVerification = ({ docdata, fetch }) => {

  const alert = useAlert();
  const [showFull, setShowFull] = useState(false);
  const [files, setFiles] = useState({});
  const [loading, setLoading] = useState({});


  const validTypes = [
    "application/pdf",
    "image/png",
    "image/jpeg",
    "image/jpg",
  ];


  const handleFileChange = (e, id) => {
    const file = e.target.files[0];

    if (!validTypes.includes(file.type)) {
      alert.error("Invalid file type. Please upload a PDF, PNG, JPEG, or JPG file.");
      return;
    }


    setFiles((prevFiles) => ({
      ...prevFiles,
      [id]: file,
    }));
  };

  // Handle file upload
  const handleFileUpload = async (id) => {


    if (!files[id]) {
      alert.error("Please select a file before submitting.");
      return;
    }

    setLoading((prevLoading) => ({
      ...prevLoading,
      [id]: true,
    }));


    const formData = new FormData();
    formData.append("document", files[id]);
    formData.append("id", id);


    try {
      const response = await axiosInstance.post(
        "/vendor/fileupdate",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            "Gl-Status": "user"
          },
        }
      );
      fetch()

      alert.success("Document submitted successfully!")

    } catch (error) {
      alert.error(
        "Error! Please try again later"
      );
      // } finally {
      //   setLoading((prevLoading) => ({
      //     ...prevLoading,
      //     [id]: false,
      //   }));
      // window.location.reload();
    }
  };

  const fileString = "https://webman.co.in/goolok/uploads/enquiry/1741340577_96cc8dab442b81b9f83a.pdf"
  const fileURLs = fileString.split(',');
  const firstPDF = fileURLs[0];
  // const baseURL = IMG_PATH;
  // const url = docdata.map((item) => item.document)

  // const fileURL = `${baseURL}${url}`;
  // const fileName = docdata.document;
  // const fileSize = "Unknown";


  return (
    <div className="row ">
      {docdata?.map((item, index) => (
        <div className="col-md-6 mt-3" key={item.id}>
          <section className="card p-4 cardheight text-center justify-content-center">
            <h6 className="mb-3 ">{item.doc_type}</h6>
            {item.document && item.status !== "redo" ?
              <div>
                <a
                  href={`${IMG_PATH}/enquiry/${item.document}`}
                  class="btn btn-warning ms-2"
                  download="download"
                >
                  {" "}
                  <i class="fa fa-download"></i>
                </a>
              </div>
              : (
                <>
                  <div>
                    <input
                      type="file"
                      className="form-control"
                      onChange={(e) => handleFileChange(e, item.id)}
                    />
                  </div>
                  <div className="mt-2 text-end">
                    <button
                      className="btn mt-3 text-white"
                      style={{ backgroundColor: "#2f4f4f" }}
                      onClick={() => handleFileUpload(item.id)}
                      disabled={loading[item.id]}
                    >
                      {loading[item.id] ? (
                        <>
                          <span className="spinner-border spinner-border-sm me-2" role="status" />
                          Submitting...
                        </>
                      ) : (
                        "Submit"
                      )}
                    </button>
                  </div>
                </>
              )}

          </section>
        </div>
      ))}
    </div>
  );
};

export default DocumentVerification;
