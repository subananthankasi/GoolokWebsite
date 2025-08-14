import { useJsApiLoader } from "@react-google-maps/api";
import React, { useEffect, useState } from "react";
// const loaderOptions = {
//   id: 'google-map-script',
//   apiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
//   version: "weekly",
// };
const loaderOptions = {
  id: "google-map-script",
  googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
  libraries: ["places", "geometry"],
};


function PropertyStreetView({ property }) {
 const { isLoaded } = useJsApiLoader(loaderOptions);

  const [isStreetViewAvailable, setIsStreetViewAvailable] = useState(true);
  const data = property ? property : {};
  const locationStringArray = data?.flat().map((item) => item.location) || []; 


  const locationString = locationStringArray.length > 0 ? locationStringArray[0] : null;

  const locationArray = locationString ? locationString.split(",") : [];

  const location =
  locationArray.length === 2
    ? { lat: parseFloat(locationArray[0].trim()), lng: parseFloat(locationArray[1].trim()) }
    : null;


  useEffect(() => {
    if (!location) return;

    const service = new window.google.maps.StreetViewService();
    service.getPanorama(
      { location, radius: 50 },
      (data, status) => {
        if (status === "OK") {
          setIsStreetViewAvailable(true);
        } else {
          setIsStreetViewAvailable(false);
        }
      }
    );
  }, [location]);


  const streetViewURL = location
    ? `https://www.google.com/maps/embed/v1/streetview?key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}&location=${location?.lat},${location?.lng}&heading=0&pitch=0&fov=90`
    : "";

  return isLoaded ?(
    <div>

      <div className="property-location map mt-5">
        <div className="divider-fade" />
        {isStreetViewAvailable && (
          <iframe
            src={streetViewURL}
            width="100%"
            height="350px"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            onError={() => setIsStreetViewAvailable(false)}
          />
        )}
        <div />
      </div>
    </div>
  ):null ;
}

export default PropertyStreetView;

// import React, { useEffect, useState, useCallback } from "react";
// import { LoadScript } from "@react-google-maps/api";

// const libraries = ['places'];

// function PropertyStreetView({ property }) {
//   const [isStreetViewAvailable, setIsStreetViewAvailable] = useState(true);

//   const data = property || {};
//   const locationStringArray = data?.flat().map((item) => item.location) || [];
//   const locationString = locationStringArray.length > 0 ? locationStringArray[0] : null;
//   const locationArray = locationString ? locationString.split(",") : [];

//   const location =
//     locationArray.length === 2
//       ? { lat: parseFloat(locationArray[0].trim()), lng: parseFloat(locationArray[1].trim()) }
//       : null;

//   const handleStreetViewCheck = useCallback(() => {
//     if (!window.google || !location) return;

//     const service = new window.google.maps.StreetViewService();
//     service.getPanorama({ location, radius: 50 }, (data, status) => {
//       if (status === "OK") {
//         setIsStreetViewAvailable(true);
//       } else {
//         setIsStreetViewAvailable(false);
//       }
//     });
//   }, [location]);

//   useEffect(() => {
//     if (location && window.google) {
//       handleStreetViewCheck();
//     }
//   }, [location, handleStreetViewCheck]);

//   const streetViewURL = location
//     ? `https://www.google.com/maps/embed/v1/streetview?key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}&location=${location.lat},${location.lng}&heading=0&pitch=0&fov=90`
//     : "";

//   return (
//     <LoadScript
//       googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}
//       libraries={libraries}
//     >
//       <div className="property-location map mt-5">
//         <div className="divider-fade" />
//         {isStreetViewAvailable && (
//           <iframe
//             src={streetViewURL}
//             width="100%"
//             height="350px"
//             style={{ border: 0 }}
//             allowFullScreen
//             loading="lazy"
//             referrerPolicy="no-referrer-when-downgrade"
//             onError={() => setIsStreetViewAvailable(false)}
//           />
//         )}
//       </div>
//     </LoadScript>
//   );
// }

// export default PropertyStreetView;
