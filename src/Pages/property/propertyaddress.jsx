import React, { useEffect, useState } from "react";
import PropertyComparison from "./propertyomparison";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { Loader } from "@googlemaps/js-api-loader";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import {
  ApartmentOwnerPre,
  ApartmentProjectOwnerPreview,
  CommercialOwnerPreview,
  HouseOwnerPreview,
  LandOwnerPreview,
  LayoutOwnerPreview,
  PlotOwnerPreview,
} from "./PreviewLandOwnerDetails/OwnerPreviewPageDetails";

const loaderOptions = {
  id: "google-map-script",
  apiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
  libraries: ["geometry", "places"],
};

function Propertyaddress({ property }) {
  const [locationNames, setLocationNames] = useState({});

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
                    resolve(results[0].formatted_address);
                  } else {
                    console.error(
                      `Geocoding failed for ${item.subpro_name}:`,
                      status
                    );
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

    fetchLocationNames();
  }, [property]);

  const amenitiesData = property ? property?.map((item) => item.amenities) : [];
  const generalFeatureData = property
    ? property.map((item) => item.general)
    : [];
  const interiorFeatureData = property
    ? property.map((item) => item.interior)
    : [];
  const exteriorFeatureData = property
    ? property.map((item) => item.exterior)
    : [];
  const localities = property
    ? property.map((item) => item.nearByLocalities)
    : [];

  const general = generalFeatureData.flat().map((item) => item);
  return (
    <>
      <div className="margin">
        {property?.map((item, index) => {
          const locationName = locationNames[index] || "not found location";
          return (
            <div className="single  homes-content1 details mb-30 " key={index}>
              {/* <p class="productdetails_heading mb-4">More Details</p> */}

              {/* Address */}
              <div className="row">
                <div className="col-md-6  ">
                  <h6 className=" head-text">ADDRESS</h6>
                  <h3 className="head-content">
                    {" "}
                    {/* Porur, Chennai - West, Tamil Nadu */}
                    {item.village},{item.taluk},{item.district},{item.pincode}
                    {/* {locationName} */}
                  </h3>
                </div>
                {/* <div className="col-md-3 ">
                  <h6 className=" head-text">Listing Type</h6>
                  <h3 className="head-content">Plot</h3>
                </div>
                <div className="col-md-3 ">
                  <h6 className=" head-text">Price</h6>
                  <h3 className="head-content">₹88.4 Lac</h3>
                </div> */}
              </div>

              {/* Property Attributes */}

              <div className="row mt-3">
                <div className="col-md-5">
                  <h6 className="head-text">Property Attributes</h6>
                  {/* <ul className="list-group">
                    <li className="list-group-item d-flex justify-content-between">
                      <span>Property ID</span>
                      <span className="text-center">{item.property_id}</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between">
                      <span>District</span> <span>{item.district} </span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between">
                      <span>Taluk</span> <span>{item.taluk} </span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between">
                      <span>Village</span> <span>{item.village} </span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between">
                      <span>Pincode</span> <span>{item.pincode} </span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between">
                      <span>Land classification</span> <span>{item.classification} </span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between">
                      <span>Total Extent in Units</span> <span>{item.units} </span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between">
                      <span>Road Frontage</span> <span>{item.road_frontage} </span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between">
                      <span>Road Facing</span> <span>{item.road_facing} </span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between">
                      <span>Road Width</span> <span>{item.road_width} </span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between">
                      <span>Boundary Wall</span> <span>{item.boundary_wall} </span>
                    </li>
                  </ul> */}
                  {item?.property_type === "Land" ? (
                    <LandOwnerPreview property={item} />
                  ) : item?.property_type === "Apartment" ? (
                    <ApartmentOwnerPre property={item} />
                  ) : item?.property_type === "House" ? (
                    <HouseOwnerPreview property={item} />
                  ) : item?.property_type === "Plot" ? (
                    <PlotOwnerPreview property={item} />
                  ) : item?.property_type === "Layout" ? (
                    <LayoutOwnerPreview property={item} />
                  ) : item?.property_type === "Commercial" ? (
                    <CommercialOwnerPreview property={item} />
                  ) : item?.property_type === "Apartment Project" ? (
                    <ApartmentProjectOwnerPreview property={item} />
                  ) : null}
                </div>

                <div className="col-md-7">
                  <h6 className="head-text">Property Description</h6>
                  <p style={{ textAlign: "justify" }}>{item.description}</p>
                  {/* <p style={{ textAlign: "justify" }}>
                    Ka. Sivathambi describes the essay (recording) as "a form for
                    analysis" and notes that "its nature lies in discussing and
                    elaborating." Similarly, Ka. Sokkalingam states that "an essay
                    is writing in which one organizes their thoughts after
                    reflecting on a subject." According to their views, the essay
                    has now become an appropriate form for both logical expression
                    and information exchange.
                  </p>
                  <p style={{ textAlign: "justify" }}>
                    For centuries, poetry (seyyul) was the predominant form used in
                    Tamil literature and philosophy. Prose, on the other hand, was
                    primarily used for grammar, explaining poetry, and recording
                    inscriptions. It was only in the 20th century that prose saw
                    significant development and began to be used to meet the diverse
                    needs of the people. The essay has become the most important
                    form of prose expression.
                  </p> */}
                </div>
              </div>

              {/* General Features */}

              <div className="Localities">
                <h5 className=" mb-2 mt-4">
                  <span>G</span>eneral Features
                </h5>

                {/* {generalFeatureData.flat().map((item,index) => {
                    return (
                      <div className="row" key={index}>
                        <div className="col-md-4 border p-2  mb-0 ">
                          <h6 className=" ">{item.general}</h6>
                        </div>
                        <div className="col-md-6 border p-2">
                          <p>{item.details}</p>
                        </div>
                      </div>
                    )
                  })
                  } */}
              </div>

              {/* Interior Features  */}

              <div className="Localities">
                <h5 className=" mb-2 mt-4">
                  <span>I</span>nterior Features
                </h5>
                {interiorFeatureData?.flat().map((item, index) => {
                  return (
                    <div className="row" key={index}>
                      <div className="col-md-4 border p-2 font-weight-bold mr-1">
                        <h6 className=" ">{item.interiorName}</h6>
                      </div>
                      <div className="col-md-4 border p-2">
                        <p>{item.interior_details}</p>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Exterior Features */}

              <div className="Localities">
                <h5 className=" mb-2 mt-4">
                  <span>E</span>xterior Features
                </h5>
                {exteriorFeatureData.flat().map((item, index) => {
                  return (
                    <div className="row" key={index}>
                      <div className="col-md-4 border p-2  mb-0">
                        <h6 className=" ">{item.exteriorName}</h6>
                      </div>
                      <div className="col-md-4 border p-2">
                        <p>{item.exterior_details}</p>
                      </div>
                    </div>
                  );
                })}
                {/* <div className="row mt-2  ">
                  <div className="col-md-4 border p-2  mb-0">
                    <h6 className=" ">Parking Features</h6>
                  </div>
                  <div className="col-md-4 border p-2">
                    <p>Driveway</p>
                  </div>
                </div> */}
                {/* <div className="row ">
                  <div className="col-md-4 border p-2 font-weight-bold mb-0">
                    <h6 className=" mt-2">Lot Features</h6>
                  </div>
                  <div className="col-md-4 border p-2">
                    <p>Landscaped</p>
                  </div>
                </div> */}

                {/* <div className="row ">
                  <div className="col-md-4 border p-2 font-weight-bold mb-0">
                    <h6 className=" ">Covered Spaces</h6>
                  </div>
                  <div className="col-md-4 border p-2">
                    <p>0.55</p>
                  </div>
                </div> */}
                {/* <div className="row  ">
                  <div className="col-md-4 border p-2 font-weight-bold mb-0">
                    <h6 className=" ">Road Frontage Type</h6>
                  </div>
                  <div className="col-md-4 border p-2">
                    <p>CityStreet</p>
                  </div>
                </div> */}
              </div>

              {/* Localities */}

              <div className="Localities">
                <h5 className=" mb-2 mt-4">
                  <span>L</span>ocalities
                </h5>

                <div className="row mt-2  ">
                  <div className="col-md-4 border p-2 font-weight-bold mr-1">
                    <h6 className=" ">Schools & Colleges</h6>
                  </div>
                  {/* <div className="col-md-4 border p-2">
                    {localities.flat().map((item, index) => {
                      if (item.division === "school & colleges") {
                        return (
                          <ul className="list-unstyled" key={index}>
                            <li>
                              <i className="fa-solid fa-angle-right"></i> {item.title}
                            </li>
                          </ul>
                        );
                      }
                      return null;
                    })}
                  </div> */}
                  <div className="col-md-4 border p-2">
                    {localities
                      .flat()
                      .filter((item) => item.division === "school & colleges")
                      .length > 0 ? (
                      localities.flat().map((item, index) => {
                        if (item.division === "school & colleges") {
                          return (
                            <ul className="list-unstyled" key={index}>
                              <li>
                                <i className="fa-solid fa-angle-right"></i>{" "}
                                {item.title}
                              </li>
                            </ul>
                          );
                        }
                        return null;
                      })
                    ) : (
                      <p>No data found</p>
                    )}
                  </div>
                </div>

                <div className="row ">
                  <div className="col-md-4 border p-2 font-weight-bold mr-1">
                    <h6 className=" mt-2">transport facility</h6>
                  </div>
                  {/* <div className="col-md-4 border p-2">
                    {localities.flat().map((item, index) => {
                      if (item.division === "transport facility") {
                        return (
                          <ul className="list-unstyled" key={index}>
                            <li>
                              <i className="fa-solid fa-angle-right"></i> {item.title}
                            </li>
                          </ul>
                        );
                      }
                      return null;
                    })}
                  </div> */}
                  <div className="col-md-4 border p-2">
                    {localities
                      .flat()
                      .filter((item) => item.division === "transport facility")
                      .length > 0 ? (
                      localities.flat().map((item, index) => {
                        if (item.division === "transport facility") {
                          return (
                            <ul className="list-unstyled" key={index}>
                              <li>
                                <i className="fa-solid fa-angle-right"></i>{" "}
                                {item.title}
                              </li>
                            </ul>
                          );
                        }
                        return null;
                      })
                    ) : (
                      <p>No data found</p>
                    )}
                  </div>
                </div>

                <div className="row ">
                  <div className="col-md-4 border p-2 font-weight-bold mr-1">
                    <h6 className=" ">Major landmarks</h6>
                  </div>
                  {/* <div className="col-md-4 border p-2">
                    {localities.flat().map((item, index) => {
                      if (item.division === "majar") {
                        return (
                          <ul className="list-unstyled" key={index}>
                            <li>
                              <i className="fa-solid fa-angle-right"></i> {item.title}
                            </li>
                          </ul>
                        );
                      }
                      return null;
                    })}

                  </div> */}
                  <div className="col-md-4 border p-2">
                    {localities
                      .flat()
                      .filter((item) => item.division === "majar").length >
                    0 ? (
                      localities.flat().map((item, index) => {
                        if (item.division === "majar") {
                          return (
                            <ul className="list-unstyled" key={index}>
                              <li>
                                <i className="fa-solid fa-angle-right"></i>{" "}
                                {item.title}
                              </li>
                            </ul>
                          );
                        }
                        return null;
                      })
                    ) : (
                      <p>No data found</p>
                    )}
                  </div>
                </div>
                <div className="row  ">
                  <div className="col-md-4 border p-2 font-weight-bold mr-1">
                    <h6 className=" ">New Developments</h6>
                  </div>
                  {/* <div className="col-md-4 border p-2">

                    {localities.flat().map((item, index) => {
                      if (item.division === "new developments") {
                        return (
                          <ul className="list-unstyled" key={index}>
                            <li>
                              <i className="fa-solid fa-angle-right"></i> {item.title}
                            </li>
                          </ul>
                        );
                      }
                      return null;
                    })}

                  </div> */}
                  <div className="col-md-4 border p-2">
                    {localities
                      .flat()
                      .filter((item) => item.division === "new developments")
                      .length > 0 ? (
                      localities.flat().map((item, index) => {
                        if (item.division === "new developments") {
                          return (
                            <ul className="list-unstyled" key={index}>
                              <li>
                                <i className="fa-solid fa-angle-right"></i>{" "}
                                {item.title}
                              </li>
                            </ul>
                          );
                        }
                        return null;
                      })
                    ) : (
                      <p>No data found</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Amenities */}
              {amenitiesData[0].length !==0 && (
                <div className="amenities">
                  <h5 className="mb-2 mt-4">
                    <span>A</span>menities
                  </h5>

                  <div className="row ">
                    {amenitiesData.flat().map((item, index) => {
                      return (
                        <div className="col-12 col-md-4 mt-3" key={index}>
                          {/* <i class="fa-solid fa-book"></i> */}
                          <ChevronRightIcon />
                          <span>{item}</span>
                        </div>
                      );
                    })}
                    {/* <div className="col-12 col-md-4 mt-3">
                    <i class="fa-solid fa-book"></i>
                    <span>{amenities}</span>
                  </div> */}

                    {/* <div className="col-12 col-md-4 mt-3">
                    <i class="fa-solid fa-dungeon"></i>
                    <span>Gated security 24/7</span>
                  </div> */}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </>
  );
}

export default Propertyaddress;
