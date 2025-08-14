import React, { useEffect, useState } from "react";
import Gallery from "../propertyDetails/gallery";
import Description from "../propertyDetails/description";
import Table from "../propertyDetails/table";
import RecentProperties from "../propertyDetails/recentProperties";
import Location from "../propertyDetails/location";
import Mapdetails from "../propertyDetails/mapdetails";
import ad from "../../assets/images/smallad.jpg";
import StreetView from "../propertyDetails/StreetView";
import MyGallery from "./propertygallery";
import Propertyaddress from "./propertyaddress";
import Propertybutton from "./propertybutton";
import Propertyagent from "./propertyagent";
import Propertylocation from "./propertylocation";
import PropertyStreetView from "./proprtystreetview";
import Propertyplot from "./propertyplot";
import PropertyComparison from "./propertyomparison";
import axios from "axios";
import API_BASE_URL from "../../Api/api";
import { useParams } from "react-router-dom";

function Propertyview() {
  const [products, SetProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { eid, landType } = useParams();

  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${API_BASE_URL}/properties/${eid}`, {
          headers: { "Gl-Type": landType },
        });
        SetProducts(response?.data || []);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching land data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, []);

  return (
    <div>
      <section className="section">
        <div className="container">
          <div className="row align-items-start">
            <div className="col-lg-8 col-md-12">
              <div className="row">
                <div className="col-md-12 ps-0 pe-0">
                  <div className="bg-white image_gal">
                    <MyGallery property={products} loading={loading} />
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-12">
              <div className="bg-white">
                <Propertybutton
                  property={products}
                  eid={eid}
                  loading={loading}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white pt-4 pb-4">
        <div className="container">
          <div className="row align-items-start">
            <div className=" col-lg-9 col-md-12 blog-posts">
              <Propertyaddress property={products} />
            </div>
            <div className="col-lg-3 col-md-12 car ">
              <Propertyagent property={products} />
            </div>
          </div>
        </div>
      </section>

      {products?.[0]?.strategyName && (
        <section className="bg-white pt-4 pb-4">
          <div className="container">
            <div className="row">
              <div className=" col-md-12 blog-posts">
                <PropertyComparison property={products} />
              </div>
            </div>
          </div>
        </section>
      )}

      <section className="bg-white pt-4 pb-4">
        <div className="container">
          <div className="row">
            <div className="col-md-12 blog-posts">
              <Propertylocation property={products} />
            </div>

            <div className="col-md-12 blog-posts">
              <PropertyStreetView property={products} />
            </div>

            <div className="col-md-12 blog-posts">
              <Propertyplot />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Propertyview;
