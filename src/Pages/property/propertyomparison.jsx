import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChartLine,
  faHome,
  faMoneyBill,
  faWallet,
} from "@fortawesome/free-solid-svg-icons";
import PropertyImage from "./propertyimage";

const PropertyComparison = ({ property }) => {
  const data = Array.isArray(property) && property.length > 0 ? property : [];
  const strategy = data?.map((item) => item.strategy_type);

  const strategy_data = strategy
    ?.map((item) => {
      try {
        return item ? JSON.parse(item) : null;
      } catch (error) {
        console.error(error);
        return null;
      }
    })
    .filter(Boolean);

  return (
    <>
      <div className="row g-3 align-items-center">
        {data?.map((item) => {
          return (
            <div className="col-lg-6">
              <h2 className="investment-head ">
                <span>{item.strategyName} </span>
              </h2>
              <div className="agent-contact-form-sidebar">
                {/* <h2 className="gallery-head mt-2 mb-4">
                  Individual House For Sale in Porur With 2400 Sq.Ft 2BHK - 60 X 40.
                </h2> */}
                <div>
                  <p style={{ fontSize: "15px" }}> {item.strategyDes}</p>
                </div>
              </div>
            </div>
          );
        })}

        <div className="col-lg-6">
          <PropertyImage property={property} />
        </div>
      </div>

      <div className="row g-3 mb-4 mt-3">
        {strategy_data?.[0]?.map((item, index) => {
          return (
            <div className="col-md-6 PropertyComparison col-lg-3">
              <div
                className="card text-white bg-dark h-100 p-3 d-flex flex-column align-items-center justify-content-between"
                key={index}
              >
                <FontAwesomeIcon
                  icon={faMoneyBill}
                  className="icon me-3 fs-2"
                />
                <div className="text-end">
                  <div className="mb-2">
                    <h5>{item.strategy}</h5>
                    <p className="mb-0">{item.remark}</p>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default PropertyComparison;
