import React, { useEffect, useState } from "react";
import a2 from "../../assets/images/apartment3.jpg";
import FilterLapView from "./FilterLapView";
import MapViewlist from "./Mapviewlist";
import SidebarFilter from "./sidebarfilter";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import API_BASE_URL, { IMG_PATH } from "../../Api/api";
import { Skeleton } from "primereact/skeleton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";
import AutorenewIcon from "@mui/icons-material/Autorenew";
import Slider from "@mui/material/Slider";
import SearchOffIcon from "@mui/icons-material/SearchOff";
import { MagnifyingGlass } from "react-loader-spinner";
import { Paginator } from "primereact/paginator";

const ProductGrid = ({ landType }) => {

  const [products, SetProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [isCategoryOpen, setCategoryOpen] = useState(true);
  const [isPriceOpen, setPriceOpen] = useState(false);
  const [fillData, setFillData] = useState([]);
  const [value, setValue] = useState(
    JSON.parse(sessionStorage.getItem("priceRange")) || [0, 0]
  );

  const [selectedFilters, setSelectedFilters] = useState(
    JSON.parse(sessionStorage.getItem("selectedFilters")) || []
  );
  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/subproperty`, {
          headers: {
            "Pr-Root": landType,
          },
        });
        setFillData(response.data || []);
      } catch (error) {
        console.error("Error fetching land data:", error);
      }
    };
    fetch();
  }, []);
  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/properties`, {
          headers: {
            "Pr-Root": landType,
          },
        });
        SetProducts(response.data);
      } catch (error) {
        console.error("Error fetching land data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, []);

  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    setSelectedFilters((prev) =>
      checked ? [...prev, value] : prev.filter((item) => item !== value)
    );
  };

  const [filterLoading, setFilterLoading] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setFilterLoading(true);
    try {
      const response = await axios.get(`${API_BASE_URL}/properties`, {
        headers: {
          Level: selectedFilters.join(","),
          "Pr-Start": parseInt(value?.[0], 10),
          "Pr-End": parseInt(value?.[1], 10),
          "Pr-Root": landType,
        },
      });
      SetProducts(response.data);
      setFilterLoading(false);
    } catch (error) {
      console.error("Error fetching land data:", error);
      setFilterLoading(false);
    }
  };

  useEffect(() => {
    sessionStorage.setItem("selectedFilters", JSON.stringify(selectedFilters));
  }, [selectedFilters]);

  useEffect(() => {
    sessionStorage.setItem("priceRange", JSON.stringify(value));
  }, [value]);

  const clearFilter = async () => {
    setSelectedFilters([]);
    setValue([0, 8000000]);
    sessionStorage.removeItem("selectedFilters");
    sessionStorage.removeItem("priceRange");
    try {
      const response = await axios.get(`${API_BASE_URL}/properties`, {
        headers: {
          "Pr-Root": landType,
        },
      });
      SetProducts(response.data);
    } catch (error) {
      console.error("Error fetching land data:", error);
    }
  };

  const [first, setFirst] = useState(0);
  const [rows, setRows] = useState(6);

  const onPageChange = (event) => {
    setFirst(event.first);
    setRows(event.rows);
  };
  const paginatedProducts = products.slice(first, first + rows);
  return (
    <>
      <section className="section">
        <div className="container">
          <div className="product-grid">
            <div className="row d-flex justify-content-between align-items-center mb-4">
              <div className=" col-md-5 pe-0">
                <h2>All Properties</h2>
              </div>
              <div className=" col-md-7 ">
                <div className="d-flex align-items-center justify-content-end">
                  <div className="me-3">
                    <Link
                      // to={`/propertymap?level=${selectedFilters.join(
                      //   ","
                      // )}&pr-start=${value[0]}&pr-end=${value[1]}&pr-root=${landType}`}
                      to={
                        `/propertymap?level=${selectedFilters.join(",")}` +
                        `&pr-start=${value[0]}` +
                        `&pr-end=${value[1]}` +
                        (landType ? `&pr-root=${landType}` : "")
                      }
                      className="btn"
                      style={{ backgroundColor: "#2b2e3a", color: "white" }}
                    >
                      Map View
                    </Link>
                  </div>
                  <label
                    className="mb-0 me-2 d-none d-lg-block"
                    style={{ whiteSpace: "nowrap" }}
                  >
                    Sort By:
                  </label>
                  <select className="form-select w-auto d-none d-lg-block">
                    <option value="relevance">Relevance</option>
                    <option value="price-low-to-high">
                      Price: Low to High
                    </option>
                    <option value="price-high-to-low">
                      Price: High to Low
                    </option>
                  </select>
                </div>
              </div>
            </div>

            <div className="row">
              <div className=" col-lg-3 col-md-6 d-none d-lg-block ">
                {/* <FilterLapView /> */}

                <div className="sidebar">
                  <div className="d-flex justify-content-between">
                    <h4>Find Your Property</h4>
                    <AutorenewIcon
                      sx={{ fontSize: 25, cursor: "pointer" }}
                      onClick={() => clearFilter()}
                    />
                    {/* <i className="pi pi-sync" style={{ fontSize: '1rem', cursor: "poiter" }} onClick={() => clearFilter()}></i> */}
                  </div>
                  <form action="" onSubmit={handleSubmit}>
                    <div className="filter-section">
                      <div
                        className="filter-header"
                        onClick={() => setCategoryOpen(!isCategoryOpen)}
                      >
                        <h5>Property Type</h5>
                        <FontAwesomeIcon
                          icon={isCategoryOpen ? faMinus : faPlus}
                        />
                      </div>
                      {/* {isCategoryOpen && (
                        <div className=" mt-4">
                          <div className="form-check">
                            {fillData?.map((item) => {
                              return (
                                <div>
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                    defaultValue
                                    id={`checkbox-${item.id}`}
                                    value={item.id}
                                    checked={selectedFilters.includes(
                                      item.id.toString()
                                    )}
                                    onChange={handleCheckboxChange}
                                  />
                                
                                  <label
                                    className="form-check-label"
                                    htmlFor="exampleCheckbox1"
                                  >
                                    {item.subproperty}
                                  </label>
                                  
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      )} */}
                      {isCategoryOpen && (
                        <div className="mt-4">
                          <div className="form-check">
                            {Object.entries(
                              fillData.reduce((acc, item) => {
                                if (!acc[item.property_type]) {
                                  acc[item.property_type] = [];
                                }
                                acc[item.property_type].push(item);
                                return acc;
                              }, {})
                            ).map(([propertyType, items]) => (
                              <div key={propertyType} className="mb-3">
                                <h6 className="fw-bold text-uppercase">
                                  {propertyType}
                                </h6>
                                {items.map((item) => (
                                  <div key={item.id} className="form-check">
                                    <input
                                      className="form-check-input"
                                      type="checkbox"
                                      id={`checkbox-${item.id}`}
                                      value={item.id}
                                      checked={selectedFilters.includes(
                                        item.id.toString()
                                      )}
                                      onChange={handleCheckboxChange}
                                    />
                                    <label
                                      className="form-check-label"
                                      htmlFor={`checkbox-${item.id}`}
                                    >
                                      {item.subproperty}
                                    </label>
                                  </div>
                                ))}

                                <hr />
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="filter-section">
                      <div
                        className="filter-header"
                        onClick={() => setPriceOpen(!isPriceOpen)}
                      >
                        <h5>Price</h5>
                        <FontAwesomeIcon
                          icon={isPriceOpen ? faMinus : faPlus}
                        />
                      </div>
                      {isPriceOpen && (
                        <div>
                          <Slider
                            getAriaLabel={() => "Temperature range"}
                            value={value}
                            onChange={(e, newValue) => setValue(newValue)}
                            valueLabelDisplay="auto"
                            min={0}
                            max={5000000}
                            step={100}
                          />
                        </div>
                      )}
                    </div>
                    <div className=" no-pds">
                      <div className="at-col-default-mar">
                        <button
                          className="btn-default hvr-bounce-to-right w-100"
                          type="submit"
                        >
                          Filter
                        </button>
                      </div>
                    </div>
                  </form>
                </div>

                {/* <SidebarFilter /> */}
              </div>
              <div className="col-lg-9">
                <div className="row">
                  {loading ? (
                    <>
                      <div className="col-md-6 col-lg-4">
                        <Skeleton height={271} />
                        <Skeleton
                          height={20}
                          width="100%"
                          style={{ marginTop: 10 }}
                        />
                        <Skeleton height={15} width="100%" />
                        <Skeleton
                          height={20}
                          width="100%"
                          style={{ marginTop: 10 }}
                        />
                      </div>
                      <div className="col-md-6 col-lg-4">
                        <Skeleton height={271} />
                        <Skeleton
                          height={20}
                          width="100%"
                          style={{ marginTop: 10 }}
                        />
                        <Skeleton height={15} width="100%" />
                        <Skeleton
                          height={20}
                          width="100%"
                          style={{ marginTop: 10 }}
                        />
                      </div>
                      <div className="col-md-6 col-lg-4">
                        <Skeleton height={271} />
                        <Skeleton
                          height={20}
                          width="100%"
                          style={{ marginTop: 10 }}
                        />
                        <Skeleton height={15} width="100%" />
                        <Skeleton
                          height={20}
                          width="100%"
                          style={{ marginTop: 10 }}
                        />
                      </div>
                    </>
                  ) : filterLoading ? (
                    <div
                      className="d-flex justify-content-center align-items-center"
                      style={{ height: "60vh" }}
                    >
                      <div style={{ textAlign: "center" }}>
                        <MagnifyingGlass
                          visible={true}
                          height="100"
                          width="100"
                          ariaLabel="magnifying-glass-loading"
                          wrapperStyle={{}}
                          wrapperClass="magnifying-glass-wrapper"
                          glassColor="#efefef"
                          color="#2b2e3a"
                        />
                      </div>
                    </div>
                  ) : paginatedProducts.length > 0 ? (
                    paginatedProducts.map((product) => (
                      <div className="col-md-6 col-lg-4" key={product.id}>
                        <Link
                          to={`/property/${product.id}/${product.propertyType}`}
                          onClick={() =>
                            localStorage.setItem("cartId", product.id)
                          }
                        >
                          <div className="project-grid">
                            <div className="landscapes">
                              <div className="project-single">
                                <div className="product-img">
                                  <div className="homes">
                                    <div className="homes-img">
                                      <div className="image-wrapper">
                                        <img
                                          src={`${IMG_PATH}enquiry/gallery/${product.image}`}
                                          alt="home-1"
                                          className="img-responsive"
                                          style={{
                                            boxShadow:
                                              "rgba(0, 0, 0, 0.35) 0px 5px 15px",
                                            objectFit: "cover",
                                            height: "271px",
                                            width: "100%",
                                          }}
                                        />
                                        {/* <p className="offer_tag">{product?.disc_percentage} % </p> */}
                                        {product?.disc_percentage && product?.disc_status ==="true" && (
                                          <p className="offer_tag">
                                            {Math.floor(
                                              product?.disc_percentage
                                            )}
                                            %
                                          </p>
                                        )}
                                        
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div
                                  className="homes-content"
                                  style={{ height: "200px" }}
                                >
                                  <h3>
                                    <a href="#">{product.propertyName}</a>
                                  </h3>
                                  <ul className="homes-list homes-list1 clearfix mb-2 mt-3">
                                    <li className="the-icons">
                                      <i className="fa-solid fa-ruler-combined"></i>
                                      <span>{product.units}</span>
                                    </li>
                                  </ul>
                                  <ul className="homes-list homes-list1 clearfix pb-1">
                                    <a href="javascript:void(0)">
                                      <li className="the-icons">
                                        <i className="fa fa-map-marker" />
                                        <span>
                                          {product.village}, {product.taluk}
                                        </span>
                                      </li>
                                    </a>
                                  </ul>
                                  <div className="price-properties footer pt-2 pb-0">
                                    {product?.disc_status === "true" ? (
                                      <p className="bottom_price mb-0">
                                        {/* <i
                                          className="fa fa-inr"
                                          aria-hidden="true"
                                          style={{ fontSize: 12 }}
                                        /> */}
                                        <span>₹ {product.total_aft_disc}</span>
                                        <span
                                          style={{
                                            color: "gray",
                                            fontSize: "12px",
                                            textDecoration: "line-through",
                                            marginLeft: "8px",
                                          }}
                                        >
                                          ₹ {product.price}
                                        </span>
                                      </p>
                                    ) : (
                                      <p className="bottom_price mb-0">
                                        <i
                                          className="fa fa-inr"
                                          aria-hidden="true"
                                          style={{ fontSize: 12 }}
                                        />

                                        {product.price}
                                      </p>
                                    )}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </Link>
                      </div>
                    ))
                  ) : (
                    <div
                      className="d-flex justify-content-center align-items-center"
                      style={{ height: "60vh" }}
                    >
                      <div style={{ textAlign: "center" }}>
                        <SearchOffIcon sx={{ fontSize: 60 }} />
                        <h6>No Data Found </h6>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="d-flex justify-content-center mt-4">
              {!loading && (
                <Paginator
                  first={first}
                  rows={rows}
                  totalRecords={products.length}
                  onPageChange={onPageChange}
                />
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ProductGrid;
