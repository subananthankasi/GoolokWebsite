import React, { useState } from "react";
import gallery1 from "../../assets/images/person.jpg";
import gallery2 from "../../assets/images/land2.jpg";
import gallery3 from "../../assets/images/land3.jpg";
import gallery4 from "../../assets/images/land4.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBackward,
  faComment,
  faDownload,
  faEnvelope,
  faEye,
  faHeart,
  faHome,
  faPrint,
} from "@fortawesome/free-solid-svg-icons";
import {
  faAndroid,
  faApple,
  faFacebook,
  faPinterest,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import PdfDownloadPage from "../../Test/PdfDownloadPage";
import { IMG_PATH } from "../../Api/api";
import { Dialog } from "primereact/dialog";

function Propertyagent({ property }) {
  const data = Array.isArray(property) && property.length > 0 ? property : [];
  const [pdfVisible, setPdfVisible] = useState(false);
  const [pdfUrl, setPdfUrl] = useState(null);

  const broucherDownload = (url) => {
    if (url) {
      setPdfUrl(url);
      setPdfVisible(true);
    }
  };
  const layoutsDownload = (url) => {
    if (url) {
      setPdfUrl(url);
      setPdfVisible(true);
    }
  };
  const floorDownload = (url) => {
    if (url) {
      setPdfUrl(url);
      setPdfVisible(true);
    }
  };
  const buildingDownload = (url) => {
    if (url) {
      setPdfUrl(url);
      setPdfVisible(true);
    }
  };

  return (
    <>
      <div className="widget-boxed-header">
        <h6 class="mb-4 agent-name">Links</h6>
      </div>
      <div className="widget-boxed-body">
        <div className="sidebar-widget author-widget2">
          <div className="agent-contact-form-sidebar">
            <form name="contact_form" method="post">
              <div className="icon-container">
                {data?.map((item) => {
                  const document = item.documents;
                  return (
                    <>
                      {document?.brochures && (
                        <button
                          type="button"
                          data-toggle="modal"
                          data-target="#exampleModal1"
                          className="message-btn "
                          onClick={() =>
                            broucherDownload(
                              `${IMG_PATH}/enquiry/attach/${document?.brochures}`
                            )
                          }
                        >
                          <FontAwesomeIcon
                            icon={faDownload}
                            style={{ marginRight: "10px" }}
                          />
                          Broucher
                        </button>
                      )}

                      {document?.layouts && (
                        <button
                          type="button"
                          data-toggle="modal"
                          data-target="#exampleModal1"
                          className="message-btn "
                          onClick={() =>
                            layoutsDownload(
                              `${IMG_PATH}/enquiry/attach/${document?.layouts}`
                            )
                          }
                        >
                          <FontAwesomeIcon
                            icon={faDownload}
                            style={{ marginRight: "10px" }}
                          />
                          layouts
                        </button>
                      )}

                      {document?.floor && (
                        <button
                          type="button"
                          data-toggle="modal"
                          data-target="#exampleModal1"
                          className="message-btn "
                          onClick={() =>
                            floorDownload(
                              `${IMG_PATH}/enquiry/attach/${document?.floor}`
                            )
                          }
                        >
                          <FontAwesomeIcon
                            icon={faDownload}
                            style={{ marginRight: "10px" }}
                          />
                          Floor
                        </button>
                      )}

                      {document?.building && (
                        <button
                          type="button"
                          data-toggle="modal"
                          data-target="#exampleModal1"
                          className="message-btn "
                          onClick={() =>
                            buildingDownload(
                              `${IMG_PATH}/enquiry/attach/${document?.building}`
                            )
                          }
                        >
                          <FontAwesomeIcon
                            icon={faDownload}
                            style={{ marginRight: "10px" }}
                          />
                          Building
                        </button>
                      )}
                    </>
                  );
                })}

                {/* <button
                  type="button"
                  data-toggle="modal"
                  data-target="#exampleModal1"
                  className="message-btn " 
                >
                  <FontAwesomeIcon icon={faDownload} style={{ marginRight: '10px' }} />
                  Print Flyer
                </button> */}
              </div>
            </form>
          </div>
        </div>
      </div>

      <Dialog
        header={
          <div className="d-flex" style={{ justifyContent: "space-between" }}>
            <h4> PDF Preview </h4>
          </div>
        }
        visible={pdfVisible}
        onHide={() => setPdfVisible(false)}
        style={{ width: "70rem", height: "70rem" }}
        breakpoints={{ "1440px": "80vw", "960px": "75vw", "641px": "100vw" }}
      >
        <div style={{ height: "100%" }}>
          {pdfUrl ? (
            <iframe
              src={pdfUrl}
              title="PDF Preview"
              style={{ border: "none", height: "550px" }}
            />
          ) : (
            <p style={{ textAlign: "center" }}>No PDF to display.</p>
          )}
        </div>
      </Dialog>
    </>
  );
}

export default Propertyagent;
