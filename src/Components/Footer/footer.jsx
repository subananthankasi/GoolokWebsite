import React from "react";
import "../Footer/footer.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import android from "../../assets/images/android.png";
import ios from "../../assets/images/appstore.png";
import { faRocketchat } from "@fortawesome/free-brands-svg-icons";

function Footer() {
  return (
    <>
      <footer className="first-footer">
        <div className="top-footer">
          <div className="container-fluid container-fluid1">
            <div className="row">
              <div className="col-md-6 col-lg-6">
                <h3>About Goolok</h3>
                <p>
                  Goolok is a full stack service provider for all real estate
                  needs, with 15+ services including home loans, pay rent,
                  packers and movers, legal assistance, property valuation, and
                  expert advice.
                </p>
              </div>
              <div className="col-md-6 col-lg-6">
                <h3>Properties in Chennai</h3>
                <p>
                  <a href="javascript:void(0);">Property in Aavadi</a> |&nbsp;
                  <a href="javascript:void(0);">Property in Tiruvallur</a>{" "}
                  |&nbsp;
                  <a href="javascript:void(0);">Property in Kadambathur</a>{" "}
                  |&nbsp;
                  <a href="javascript:void(0);">Property in Arakkonam</a>{" "}
                  |&nbsp;
                  <a href="javascript:void(0);">Property in Tiruttani</a>{" "}
                  |&nbsp;
                  <a href="javascript:void(0);">
                    Property in Tamaraipakkam
                  </a>{" "}
                  |&nbsp;
                  <a href="javascript:void(0);">
                    Property in Sriperumbudur
                  </a>{" "}
                  |&nbsp;
                  <a href="javascript:void(0);">Property in Villivakkam</a>
                </p>
              </div>
            </div>
            <div className="row mt-3">
              <div className="col-md-6 col-lg-6">
                <h3>More from our Network</h3>
                <div className="row">
                  <div className="col-lg-3 col-4 ">Times of India</div>
                  <div className="col-lg-3 col-4"> Economic Times</div>
                  <div className="col-lg-3 col-4"> Navbharat times</div>
                  <div className="col-lg-3 col-4">Filmfare</div>
                  <div className="col-lg-3 col-4">TimesJobs</div>
                  <div className="col-lg-3 col-4">Gadgets Now</div>
                </div>
                <div className="row mt-4">
                  <div className="col-lg-3 col-6 ">
                    <img src={android} width="140px" style={{ height: 45 }} />
                  </div>
                  <div className="col-lg-3 col-6">
                    <img
                      src={ios}
                      width="140px"
                      style={{ height: 45, borderRadius: 10 }}
                    />
                  </div>
                  <div className="col-lg-6 col-md-12 mt-lg-0 mt-4">
                    <div className=" ">
                      <section className="mb-4">
                        <a
                          className="btn text-white btn-floating m-1"
                          style={{ backgroundColor: "#3b5998" }}
                          href="#!"
                          role="button"
                        >
                          <i className="fab fa-facebook-f" />
                        </a>
                        <a
                          className="btn text-white btn-floating m-1"
                          style={{ backgroundColor: "#55acee" }}
                          href="#!"
                          role="button"
                        >
                          <i className="fab fa-twitter" />
                        </a>
                        <a
                          className="btn text-white btn-floating m-1"
                          style={{ backgroundColor: "#dd4b39" }}
                          href="#!"
                          role="button"
                        >
                          <i className="fab fa-google" />
                        </a>
                        <a
                          className="btn text-white btn-floating m-1"
                          style={{ backgroundColor: "#ac2bac" }}
                          href="#!"
                          role="button"
                        >
                          <i className="fab fa-instagram" />
                        </a>
                      </section>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-6 col-lg-6">
                <h3>New Project in Tamilnadu</h3>
                <p>
                  <a href="javascript:void(0);">New Projects in Trichy</a>{" "}
                  |&nbsp;
                  <a href="javascript:void(0);">
                    New Projects in Tiruvannamalai
                  </a>{" "}
                  |&nbsp;
                  <a href="javascript:void(0);">New Projects in Tirunelveli</a>{" "}
                  |&nbsp;<a href="javascript:void(0);">New Projects in Ooty</a>{" "}
                  |&nbsp;
                  <a href="javascript:void(0);">
                    New Projects in Kanyakumari
                  </a>{" "}
                  |&nbsp;
                  <a href="javascript:void(0);">New Projects in cuddalore</a>
                </p>
              </div>
            </div>
          </div>
          <div
            className="container-fluid"
            style={{ backgroundColor: "#454853", width: "100%" }}
          >
            <div className="mt-2">
              <div className="footer_policy justify-content-center flex-row bd-highlight mb-3">
                <div className="p-2 bd-highlight">Sitemap</div>
                <div className="p-2 bd-highlight">Terms &amp; Conditions</div>
                <div className="p-2 bd-highlight">Privacy Policy</div>
                <div className="p-2 bd-highlight">Blog</div>
                <div className="p-2 bd-highlight">Testimonials</div>
                <div className="p-2 bd-highlight">Testimonials</div>
                <div className="p-2 bd-highlight">Feedback</div>
                <div className="p-2 bd-highlight">Help Center</div>
              </div>
            </div>
          </div>
          <div className="container-fluid">
            <div style={{ textAlign: "justify" }}>
              <p>
                Disclaimer: Goolok Realty Services Limited is only an
                intermediary offering its platform to advertise properties of
                Seller for a Customer/Buyer/User coming on its Website and is
                not and cannot be a party to or privy to or control in any
                manner any transactions between the Seller and the
                Customer/Buyer/User. All the offers and discounts on this
                Website have been extended by various Builder(s)/Developer(s)
                who have advertised their products.{" "}
              </p>
            </div>
          </div>
        </div>
        <div className="second-footer">
          <div
            className="container"
            style={{ justifyContent: "center", color: "#2b2e3a" }}
          >
            <p>© - All Rights Reserved.</p>
          </div>
        </div>
      </footer>

      {/* <div className="chatbox-launch-button">
        <div
          className="chatbox-img-cont"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <FontAwesomeIcon
            icon={faRocketchat}
            style={{ fontSize: "35px", color: "white" }}
          />
          <span
            className="d-none d-md-block"
            style={{
              color: "white",
              fontSize: "15px",
              fontWeight: "bolder",
              marginLeft: "5px",
            }}
          >
            Chat With Me
          </span>
        </div>
      </div> */}
    </>
  );
}

export default Footer;
