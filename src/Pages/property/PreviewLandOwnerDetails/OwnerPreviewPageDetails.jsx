import React from "react";

const LandOwnerPreview = ({ property }) => {
  return (
    <ul className="list-group">
      <li className="list-group-item d-flex justify-content-between">
        <span>Property ID</span>
        <span className="text-center">{property.property_id}</span>
      </li>
      <li className="list-group-item d-flex justify-content-between">
        <span>District</span> <span>{property.district} </span>
      </li>
      <li className="list-group-item d-flex justify-content-between">
        <span>Taluk</span> <span>{property.taluk} </span>
      </li>
      <li className="list-group-item d-flex justify-content-between">
        <span>Village</span> <span>{property.village} </span>
      </li>
      <li className="list-group-item d-flex justify-content-between">
        <span>Pincode</span> <span>{property.pincode} </span>
      </li>
      <li className="list-group-item d-flex justify-content-between">
        <span>Land classification</span> <span>{property.classification} </span>
      </li>
      <li className="list-group-item d-flex justify-content-between">
        <span>Total Extent in Units</span> <span>{property.units} </span>
      </li>
      <li className="list-group-item d-flex justify-content-between">
        <span>Road Frontage</span> <span>{property.road_frontage} </span>
      </li>
      <li className="list-group-item d-flex justify-content-between">
        <span>Road Facing</span> <span>{property.road_facing} </span>
      </li>
      <li className="list-group-item d-flex justify-content-between">
        <span>Road Width</span> <span>{property.road_width} </span>
      </li>
      <li className="list-group-item d-flex justify-content-between">
        <span>Boundary Wall</span> <span>{property.boundary_wall} </span>
      </li>
    </ul>
  );
};

const ApartmentOwnerPre = ({ property }) => {
  const data = property?.agreement || {};

  return (
    <div>
      <ul className="list-group">
        <li className="list-group-item d-flex justify-content-between">
          <span>Property ID</span>
          <span className="text-center">{data.property_id}</span>
        </li>
        <li className="list-group-item d-flex justify-content-between">
          <span>District</span> <span>{data.district_name} </span>
        </li>
        <li className="list-group-item d-flex justify-content-between">
          <span>Taluk</span> <span>{data.taluk_name} </span>
        </li>
        <li className="list-group-item d-flex justify-content-between">
          <span>Village</span> <span>{data.village_name} </span>
        </li>
        <li className="list-group-item d-flex justify-content-between">
          <span>Pincode</span> <span>{data.pincode} </span>
        </li>
        <li className="list-group-item d-flex justify-content-between">
          <span> CMDA / DTCP </span> <span>{data.approval_no} </span>
        </li>
        <li className="list-group-item d-flex justify-content-between">
          <span>RERA</span> <span>{data.rera_no} </span>
        </li>
        <li className="list-group-item d-flex justify-content-between">
          <span>Building approval</span> <span>{data.building_permit} </span>
        </li>
        <li className="list-group-item d-flex justify-content-between">
          <span>Project Name</span> <span>{data.project_name} </span>
        </li>
        <li className="list-group-item d-flex justify-content-between">
          <span>Land extent in units</span> <span>{data.road_width} </span>
        </li>
        <li className="list-group-item d-flex justify-content-between">
          <span>Builtup area in units</span> <span>{data.builtup_area} </span>
        </li>
        <li className="list-group-item d-flex justify-content-between">
          <span>No. of BHK</span> <span>{data.bhk_count} </span>
        </li>
        <li className="list-group-item d-flex justify-content-between">
          <span> Floors </span> <span>{data.floor} </span>
        </li>
        <li className="list-group-item d-flex justify-content-between">
          <span>Price per Sq.ft</span> <span>{data.sqft_price} </span>
        </li>
        <li className="list-group-item d-flex justify-content-between">
          <span>Total Flat Cost </span>
          <span>{data.total_apartment_cost} </span>
        </li>
        <li className="list-group-item d-flex justify-content-between">
          <span>Direction Facing</span> <span>{data.direct_facing} </span>
        </li>
        <li className="list-group-item d-flex justify-content-between">
          <span>Road Frontage</span> <span>{data.road_frontage} </span>
        </li>
        <li className="list-group-item d-flex justify-content-between">
          <span>Road Facing</span> <span>{data.facing} </span>
        </li>
        <li className="list-group-item d-flex justify-content-between">
          <span>Road width</span> <span>{data.road_width} </span>
        </li>
        <li className="list-group-item d-flex justify-content-between">
          <span>Car parking</span> <span>{data.car_parking} </span>
        </li>
      </ul>
    </div>
  );
};

const HouseOwnerPreview = ({ property }) => {
   const data = property?.agreement || {};
  return (
    <div>
      <ul className="list-group">
        <li className="list-group-item d-flex justify-content-between">
          <span>Property ID</span>
          <span className="text-center">{data.property_id}</span>
        </li>
        <li className="list-group-item d-flex justify-content-between">
          <span>District</span> <span>{data.district_name} </span>
        </li>
        <li className="list-group-item d-flex justify-content-between">
          <span>Taluk</span> <span>{data.taluk_name} </span>
        </li>
        <li className="list-group-item d-flex justify-content-between">
          <span>Village</span> <span>{data.taluk_name} </span>
        </li>
        <li className="list-group-item d-flex justify-content-between">
          <span>Pincode</span> <span>{data.pincode} </span>
        </li>
        <li className="list-group-item d-flex justify-content-between">
          <span> CMDA / DTCP </span> <span>{data.aprovalno} </span>
        </li>
        <li className="list-group-item d-flex justify-content-between">
          <span>RERA</span> <span>{data.rerano} </span>
        </li>
        <li className="list-group-item d-flex justify-content-between">
          <span>Building approval</span> <span>{data.road_frontage} </span>
        </li>
        {property.subpro_name !== "Independent House" && (
          <li className="list-group-item d-flex justify-content-between">
            <span>Project Name</span> <span>{data.projectname} </span>
          </li>
        )}
        <li className="list-group-item d-flex justify-content-between">
          <span>Land extent in units</span> <span>{data.extebt} </span>
        </li>
        <li className="list-group-item d-flex justify-content-between">
          <span>Builtup area in units</span> <span>{data.built_up_area} </span>
        </li>
        <li className="list-group-item d-flex justify-content-between">
          <span>No. of BHK</span> <span>{data.no_bhk} </span>
        </li>
        <li className="list-group-item d-flex justify-content-between">
          <span>Villa type</span> <span>{data.boundary_wall} </span>
        </li>
        {property.subpro_name === "Farm House" &&
          property.subpro_name === "Beach House" && (
            <li className="list-group-item d-flex justify-content-between">
              <span>No. of Floors </span> <span>{data.no_floors} </span>
            </li>
          )}
        <li className="list-group-item d-flex justify-content-between">
          <span>Price per Sq.ft</span> <span>{data.price_per_sqft} </span>
        </li>
        <li className="list-group-item d-flex justify-content-between">
          <span>{`Total ${
            property?.subpro_name === "Villa" ? "Villa" : "House"
          } Cost`}</span>{" "}
          <span>{data.total_cost} </span>
        </li>
        <li className="list-group-item d-flex justify-content-between">
          <span>Dimension</span> <span>{data.boundary_wall} </span>
        </li>
        <li className="list-group-item d-flex justify-content-between">
          <span>Road Frontage</span> <span>{data.road_frontage} </span>
        </li>
        <li className="list-group-item d-flex justify-content-between">
          <span>Road Facing</span> <span>{data.boundary_wall} </span>
        </li>
        <li className="list-group-item d-flex justify-content-between">
          <span>Road width</span> <span>{data.road_width} </span>
        </li>
        <li className="list-group-item d-flex justify-content-between">
          <span>Corner Villa</span> <span>{data.corner_property} </span>
        </li>
        <li className="list-group-item d-flex justify-content-between">
          <span>Boundary Wall</span> <span>{data.boundary_wall} </span>
        </li>
      </ul>
    </div>
  );
};

const PlotOwnerPreview = ({ property }) => {
   const data = property?.agreement || {};
  return (
    <div> 
      <ul className="list-group">
        <li className="list-group-item d-flex justify-content-between">
          <span>Property ID</span>
          <span className="text-center">{data.property_id}</span>
        </li>
        <li className="list-group-item d-flex justify-content-between">
          <span>District</span> <span>{data.district_name} </span>
        </li>
        <li className="list-group-item d-flex justify-content-between">
          <span>Taluk</span> <span>{data.taluk_name} </span>
        </li>
        <li className="list-group-item d-flex justify-content-between">
          <span>Village</span> <span>{data.village_name} </span>
        </li>
        <li className="list-group-item d-flex justify-content-between">
          <span>Pincode</span> <span>{data.pincode_name} </span>
        </li>
        <li className="list-group-item d-flex justify-content-between">
          <span>
            {" "}
            {`${
              property.subpro_name === "UnApproved Plot"
                ? "Localbody approved"
                : "CMDA / DTCP"
            } `}{" "}
          </span>{" "}
          <span>{data.aprovalno} </span>
        </li>
        {property.subpro_name !== "UnApproved Plot" && (
          <li className="list-group-item d-flex justify-content-between">
            <span>RERA</span> <span>{data.rera_no} </span>
          </li>
        )}
        <li className="list-group-item d-flex justify-content-between">
          <span>Project Name</span> <span>{data.projectname} </span>
        </li>
        <li className="list-group-item d-flex justify-content-between">
          <span>Plot No.</span> <span>{data.plotno} </span>
        </li>
        <li className="list-group-item d-flex justify-content-between">
          <span>Total No. of Plots</span> <span>{data.no_ofplots} </span>
        </li>
        <li className="list-group-item d-flex justify-content-between">
          <span>Overall project extent in units</span> <span>{data.extent_units} </span>
        </li>

        <li className="list-group-item d-flex justify-content-between">
          <span>Price per Sq.ft</span> <span>{data.sqft_price} </span>
        </li>
        <li className="list-group-item d-flex justify-content-between">
          <span>Total plot cost</span>{" "}
          <span>{data.total_saleable} </span>
        </li>
        <li className="list-group-item d-flex justify-content-between">
          <span>Dimension</span> <span>{data.boundary_l} </span>
        </li>
        <li className="list-group-item d-flex justify-content-between">
          <span>Road Frontage</span> <span>{data.roadfrontage} </span>
        </li>
        <li className="list-group-item d-flex justify-content-between">
          <span>Road Facing</span> <span>{data.boun} </span>
        </li>
        <li className="list-group-item d-flex justify-content-between">
          <span>Road width</span> <span>{data.roadwidth} </span>
        </li>
        <li className="list-group-item d-flex justify-content-between">
          <span>Corner Plot</span> <span>{data.cornerproperty} </span>
        </li>
        <li className="list-group-item d-flex justify-content-between">
          <span>Boundary Wall</span> <span>{data.boundarywall} </span>
        </li>
      </ul>
    </div>
  );
};

const CommercialOwnerPreview = ({ property }) => {
 const data = property?.agreement || {};

  return (
    <div>
      <ul className="list-group">
        <li className="list-group-item d-flex justify-content-between">
          <span>Property ID</span>
          <span className="text-center">{data.property_id}</span>
        </li>
        <li className="list-group-item d-flex justify-content-between">
          <span>District</span> <span>{data.district_name} </span>
        </li>
        <li className="list-group-item d-flex justify-content-between">
          <span>Taluk</span> <span>{data.taluk_name} </span>
        </li>
        <li className="list-group-item d-flex justify-content-between">
          <span>Village</span> <span>{data.village_name} </span>
        </li>
        <li className="list-group-item d-flex justify-content-between">
          <span>Pincode</span> <span>{data.pincode} </span>
        </li>
        {property?.subpro_name === "Land" && (
          <li className="list-group-item d-flex justify-content-between">
            <span>Land classification</span> <span>{data.pinc} </span>
          </li>
        )}
        <li className="list-group-item d-flex justify-content-between">
          <span> CMDA / DTCP </span> <span>{data.aprovalno} </span>
        </li>
        <li className="list-group-item d-flex justify-content-between">
          <span>RERA</span> <span>{data.rerano} </span>
        </li>
        {property?.subpro_name !== "Land" && (
          <li className="list-group-item d-flex justify-content-between">
            <span>Building approval</span>{" "}
            <span>{data.road_frontage} </span>
          </li>
        )}
        <li className="list-group-item d-flex justify-content-between">
          <span>Project Name</span> <span>{data.projectname} </span>
        </li>

        {property?.subpro_name === "Land" && (
          <>
            <li className="list-group-item d-flex justify-content-between">
              <span>Plot No </span> <span>{data.plotno} </span>
            </li>
            <li className="list-group-item d-flex justify-content-between">
              <span>Total No. of Plots </span>{" "}
              <span>{data.no_floors} </span>
            </li>
            <li className="list-group-item d-flex justify-content-between">
              <span>Overall project extent in units </span>{" "}
              <span>{data.extent_in_units} </span>
            </li>
          </>
        )}
        {property?.subpro_name !== "Land" && (
          <>
            <li className="list-group-item d-flex justify-content-between">
              <span>Land extent in units</span>{" "}
              <span>{data.extent_in_units} </span>
            </li>
            <li className="list-group-item d-flex justify-content-between">
              <span>Builtup area in units</span>{" "}
              <span>{data.built_up_area} </span>
            </li>
            <li className="list-group-item d-flex justify-content-between">
              <span>Floor</span> <span>{data.no_floors} </span>
            </li>
          </>
        )}
        <li className="list-group-item d-flex justify-content-between">
          <span>Price per Sq.ft</span> <span>{data.price_per_sqft} </span>
        </li>
        <li className="list-group-item d-flex justify-content-between">
          <span>{`Total ${
            property?.subpro_name === "Land" ? "Plot" : "Shop"
          } Cost`}</span>{" "}
          <span>{data.total_cost} </span>
        </li>

        {property?.subpro_name === "Land" && (
          <li className="list-group-item d-flex justify-content-between">
            <span>Dimension</span> <span>{data.boundary_wall} </span>
          </li>
        )}
        {property?.subpro_name !== "Land" && (
          <li className="list-group-item d-flex justify-content-between">
            <span>Direction facing</span> <span>{data.boundary_wall} </span>
          </li>
        )}
        <li className="list-group-item d-flex justify-content-between">
          <span>Road Frontage</span> <span>{data.road_frontage} </span>
        </li>
        {property?.subpro_name === "Land" && (
          <li className="list-group-item d-flex justify-content-between">
            <span>Road Facing</span> <span>{data.door_facing} </span>
          </li>
        )}
        <li className="list-group-item d-flex justify-content-between">
          <span>Road width</span> <span>{data.road_width} </span>
        </li>
        {property?.subpro_name === "Land" && (
          <li className="list-group-item d-flex justify-content-between">
            <span>Corner Plot</span> <span>{data.corner_property} </span>
          </li>
        )}
        {property?.subpro_name !== "Land" && (
          <li className="list-group-item d-flex justify-content-between">
            <span>Car parking </span> <span>{data.carparking} </span>
          </li>
        )}
        {property?.subpro_name === "Land" && (
          <li className="list-group-item d-flex justify-content-between">
            <span>Boundary Wall</span> <span>{data.boundary_wall} </span>
          </li>
        )}
      </ul>
    </div>
  );
};

const LayoutOwnerPreview = ({ property }) => {
    const data = property?.agreement || {};

  return (
    <div>
      <ul className="list-group">
        <li className="list-group-item d-flex justify-content-between">
          <span>Property ID</span>
          <span className="text-center">{data.property_id}</span>
        </li>
        <li className="list-group-item d-flex justify-content-between">
          <span>District</span> <span>{data.district_name} </span>
        </li>
        <li className="list-group-item d-flex justify-content-between">
          <span>Taluk</span> <span>{data.taluk_name} </span>
        </li>
        <li className="list-group-item d-flex justify-content-between">
          <span>Village</span> <span>{data.village_name} </span>
        </li>
        <li className="list-group-item d-flex justify-content-between">
          <span>Pincode</span> <span>{data.pincode} </span>
        </li>
        <li className="list-group-item d-flex justify-content-between">
          <span>Land classification</span> <span>{data.land_classification} </span>
        </li>
        <li className="list-group-item d-flex justify-content-between">
          <span>
            {" "}
            {property.subpro_name === "Approved"
              ? "CMDA / DTCP"
              : " Localbody approval"}{" "}
          </span>{" "}
          <span>{data.aprovalno} </span>
        </li>
        {property.subpro_name === "Approved" && (
          <li className="list-group-item d-flex justify-content-between">
            <span>RERA</span> <span>{data.rera_no} </span>
          </li>
        )}
        <li className="list-group-item d-flex justify-content-between">
          <span>Project Name</span> <span>{data.projectname} </span>
        </li>
        <li className="list-group-item d-flex justify-content-between">
          <span>Plot No.</span> <span>{data.road_width} </span>
        </li>
        <li className="list-group-item d-flex justify-content-between">
          <span>Total No. of Plots</span> <span>{data.total_seleable_plots} </span>
        </li>
        <li className="list-group-item d-flex justify-content-between">
          <span>Overall project extent in units</span>{" "}
          <span>{data.overall_extent_unit} </span>
        </li>
        <li className="list-group-item d-flex justify-content-between">
          <span>Price per Sq.ft</span> <span>{data.sqft_price} </span>
        </li>
        <li className="list-group-item d-flex justify-content-between">
          <span>Total plot cost</span> <span>{data.total_seleable_cost} </span>
        </li>
        <li className="list-group-item d-flex justify-content-between">
          <span>Dimension</span> <span>{data.boundary_w} </span>
        </li>
        <li className="list-group-item d-flex justify-content-between">
          <span>Road Frontage</span> <span>{data.road_frontage} </span>
        </li>
        <li className="list-group-item d-flex justify-content-between">
          <span>Road Facing</span> <span>{data.boundary_wall} </span>
        </li>
        <li className="list-group-item d-flex justify-content-between">
          <span>Road width</span> <span>{data.road_width} </span>
        </li>
        <li className="list-group-item d-flex justify-content-between">
          <span>Corner Plot</span> <span>{data.corner_property} </span>
        </li>
        <li className="list-group-item d-flex justify-content-between">
          <span>Boundary Wall</span> <span>{data.boundary_wall} </span>
        </li>
      </ul>
    </div>
  );
};

const ApartmentProjectOwnerPreview = ({ property }) => {
  const data = property?.agreement || {};

  return (
    <div>
      <ul className="list-group">
        <li className="list-group-item d-flex justify-content-between">
          <span>Property ID</span>
          <span className="text-center">{data.property_id}</span>
        </li>
        <li className="list-group-item d-flex justify-content-between">
          <span>District</span> <span>{data.district_name} </span>
        </li>
        <li className="list-group-item d-flex justify-content-between">
          <span>Taluk</span> <span>{data.taluk_name} </span>
        </li>
        <li className="list-group-item d-flex justify-content-between">
          <span>Village</span> <span>{data.village_name} </span>
        </li>
        <li className="list-group-item d-flex justify-content-between">
          <span>Pincode</span> <span>{data.pincode} </span>
        </li>
        <li className="list-group-item d-flex justify-content-between">
          <span>CMDA / DTCP</span> <span>{data.approval_no} </span>
        </li>
        <li className="list-group-item d-flex justify-content-between">
          <span>RERA</span> <span>{data.rera_no} </span>
        </li>
        <li className="list-group-item d-flex justify-content-between">
          <span>Building approval</span> <span>{data.road_fron} </span>
        </li>
        <li className="list-group-item d-flex justify-content-between">
          <span>Project Name</span> <span>{data.project_name} </span>
        </li>
        <li className="list-group-item d-flex justify-content-between">
          <span>Land extent in units</span>{" "}
          <span>{data.total_land_extent} </span>
        </li>
        <li className="list-group-item d-flex justify-content-between">
          <span>Builtup area in units</span>{" "}
          <span>{data.built_up_area} </span>
        </li>
        <li className="list-group-item d-flex justify-content-between">
          <span>No. of BHK</span> <span>{data.no_of_bhk} </span>
        </li>
        <li className="list-group-item d-flex justify-content-between">
          <span>Floor</span> <span>{data.total_floors} </span>
        </li>
        <li className="list-group-item d-flex justify-content-between">
          <span>Price per Sq.ft</span> <span>{data.price_per_sqft} </span>
        </li>
        <li className="list-group-item d-flex justify-content-between">
          <span>Total Flat cost</span> <span>{data.total_apartment_cost} </span>
        </li>
        <li className="list-group-item d-flex justify-content-between">
          <span>Direction facing</span> <span>{data.boundary_wall} </span>
        </li>
        <li className="list-group-item d-flex justify-content-between">
          <span>Road frontage</span> <span>{data.road_frontage} </span>
        </li>
        <li className="list-group-item d-flex justify-content-between">
          <span>Road width</span> <span>{data.road_width} </span>
        </li>
        <li className="list-group-item d-flex justify-content-between">
          <span>Car parking</span> <span>{data.car_parking_cost} </span>
        </li>
      </ul>
    </div>
  );
};

export {
  ApartmentOwnerPre,
  HouseOwnerPreview,
  LandOwnerPreview,
  PlotOwnerPreview,
  CommercialOwnerPreview,
  LayoutOwnerPreview,
  ApartmentProjectOwnerPreview,
};
