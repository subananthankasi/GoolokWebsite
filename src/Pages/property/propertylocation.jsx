import React, { useEffect, useState } from "react";
import {
  GoogleMap,
  useJsApiLoader,
  Marker,
  InfoWindow,
  Polyline,
  Polygon,
} from "@react-google-maps/api";
import { ConfirmPopup, confirmPopup } from "primereact/confirmpopup";
import { Tooltip } from "primereact/tooltip";
import LocationOnIcon from "@mui/icons-material/LocationOn";
const loaderOptions = {
  id: "google-map-script",
  googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
  libraries: ["places", "geometry"],
};

const containerStyle = {
  width: "100%",
  height: "50vh",
};

const center = {
  lat: 13.078187,
  lng: 79.972347,
};

function Propertylocation({ property }) {
  const { isLoaded } = useJsApiLoader(loaderOptions);
  const [clickedMarker, setClickedMarker] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("all");

  const data = Array.isArray(property) && property.length > 0 ? property : [];
  const [center, setCenter] = useState({ lat: 0, lng: 0 });

  useEffect(() => {
    if (data.length > 0) {
      const [lat, lng] = data[0].location.split(",").map(parseFloat);
      setCenter({ lat, lng });
    }
  }, [data]);

  // const localities = data.map((item) => item.nearByLocalities)
  const localities = data.map((item) => item.nearByLocalities).flat();
  const [mapRef, setMapRef] = useState(null);
  const [hoveredMarker, setHoveredMarker] = useState(null);
  const handleMarkerHover = (index) => {
    setHoveredMarker(index);
  };
  const mainLocation = data[0]?.location.split(",").map(parseFloat) || [0, 0];

  // const calculateDistance = (lat, lng) => {
  //   const centerLatLng = new window.google.maps.LatLng(
  //     mainLocation[0],
  //     mainLocation[1]
  //   );
  //   const markerLatLng = new window.google.maps.LatLng(lat, lng);
  //   const distanceInMeters =
  //     window.google.maps.geometry.spherical.computeDistanceBetween(
  //       centerLatLng,
  //       markerLatLng
  //     );
  //   return (distanceInMeters / 1000).toFixed(2);
  // };
  const calculateDistance = (lat, lng) => {
    if (!isLoaded || !window.google?.maps?.geometry?.spherical) return 0;

    const centerLatLng = new window.google.maps.LatLng(
      mainLocation[0],
      mainLocation[1]
    );
    const markerLatLng = new window.google.maps.LatLng(lat, lng);
    const distanceInMeters =
      window.google.maps.geometry.spherical.computeDistanceBetween(
        centerLatLng,
        markerLatLng
      );
    return (distanceInMeters / 1000).toFixed(2);
  };

  const closeClick = () => {
    setHoveredMarker(null);
  };

  const [handleMarker, setHandleMarker] = useState(null);

  const handleMarking = (index) => {
    setHandleMarker(index);
  };

  useEffect(() => {}, [hoveredMarker]);

  const marking = data[0]?.locationAll || [];

  const [activeMarkerId, setActiveMarkerId] = useState(null);

  const handleMarkerClick = (markerId) => {
    setActiveMarkerId((prevMarkerId) =>
      prevMarkerId === markerId ? null : markerId
    );
  };

  const mapTheme = [
    {
      elementType: "geometry",
      stylers: [
        {
          color: "#242f3e",
        },
      ],
    },
    {
      elementType: "geometry.fill",
      stylers: [
        {
          color: "#2f4f4f",
        },
        {
          visibility: "on",
        },
      ],
    },
    {
      elementType: "labels.text.fill",
      stylers: [
        {
          color: "#746855",
        },
      ],
    },
    {
      elementType: "labels.text.stroke",
      stylers: [
        {
          color: "#242f3e",
        },
      ],
    },
    {
      featureType: "administrative",
      elementType: "geometry.fill",
      stylers: [
        {
          color: "#ffeb3b",
        },
        {
          visibility: "on",
        },
        {
          weight: 8,
        },
      ],
    },
    {
      featureType: "administrative",
      elementType: "geometry.stroke",
      stylers: [
        {
          visibility: "on",
        },
      ],
    },
    {
      featureType: "administrative.country",
      elementType: "geometry.fill",
      stylers: [
        {
          color: "#ffeb3b",
        },
        {
          visibility: "on",
        },
        {
          weight: 8,
        },
      ],
    },
    {
      featureType: "administrative.locality",
      elementType: "labels.text.fill",
      stylers: [
        {
          color: "#d59563",
        },
      ],
    },
    {
      featureType: "administrative.neighborhood",
      elementType: "geometry.fill",
      stylers: [
        {
          color: "#ffeb3b",
        },
        {
          visibility: "on",
        },
        {
          weight: 8,
        },
      ],
    },
    {
      featureType: "administrative.neighborhood",
      elementType: "geometry.stroke",
      stylers: [
        {
          visibility: "on",
        },
      ],
    },
    {
      featureType: "administrative.neighborhood",
      elementType: "labels.icon",
      stylers: [
        {
          visibility: "on",
        },
      ],
    },
    {
      featureType: "poi",
      elementType: "labels.text.fill",
      stylers: [
        {
          color: "#d59563",
        },
      ],
    },
    {
      featureType: "poi.park",
      elementType: "geometry",
      stylers: [
        {
          color: "#263c3f",
        },
      ],
    },
    {
      featureType: "poi.park",
      elementType: "labels.text.fill",
      stylers: [
        {
          color: "#6b9a76",
        },
      ],
    },
    {
      featureType: "road",
      elementType: "geometry",
      stylers: [
        {
          color: "#38414e",
        },
      ],
    },
    {
      featureType: "road",
      elementType: "geometry.stroke",
      stylers: [
        {
          color: "#212a37",
        },
      ],
    },
    {
      featureType: "road",
      elementType: "labels.text.fill",
      stylers: [
        {
          color: "#9ca5b3",
        },
      ],
    },
    {
      featureType: "road.highway",
      elementType: "geometry",
      stylers: [
        {
          color: "#746855",
        },
      ],
    },
    {
      featureType: "road.highway",
      elementType: "geometry.stroke",
      stylers: [
        {
          color: "#1f2835",
        },
      ],
    },
    {
      featureType: "road.highway",
      elementType: "labels.text.fill",
      stylers: [
        {
          color: "#f3d19c",
        },
      ],
    },
    {
      featureType: "transit",
      elementType: "geometry",
      stylers: [
        {
          color: "#2f3948",
        },
      ],
    },
    {
      featureType: "transit.station",
      elementType: "labels.text.fill",
      stylers: [
        {
          color: "#d59563",
        },
      ],
    },
    {
      featureType: "water",
      elementType: "geometry",
      stylers: [
        {
          color: "#17263c",
        },
      ],
    },
    {
      featureType: "water",
      elementType: "labels.text.fill",
      stylers: [
        {
          color: "#515c6d",
        },
      ],
    },
    {
      featureType: "water",
      elementType: "labels.text.stroke",
      stylers: [
        {
          color: "#17263c",
        },
      ],
    },
  ];
  const mapOptions = {
    styles: mapTheme,
    disableDefaultUI: false,
    zoomControl: true,
  };

  return isLoaded ? (
    <div>
      {/* <div className="d-flex gap-4">
        <div className="d-flex gap-2">
          <p
            style={{
              backgroundColor: "rgb(47, 79, 79)",
              height: "15px",
              width: "15px",
              cursor: "pointer",
            }}
            onClick={() => setSelectedCategory("all")}
          ></p>
          <p style={{ fontSize: "13px" }}>All</p>
        </div>

        <div className="d-flex gap-2">
          <p
            style={{
              backgroundColor: "rgb(110, 151, 255)",
              height: "15px",
              width: "15px",
              cursor: "pointer",
            }}
            onClick={() => setSelectedCategory("school & colleges")}
          ></p>
          <p style={{ fontSize: "13px" }}>School & Colleges</p>
        </div>
        <div className="d-flex gap-2">
          <p
            style={{
              backgroundColor: "rgb(0, 230, 77)",
              height: "15px",
              width: "15px",
              cursor: "pointer",
            }}
            onClick={() => setSelectedCategory("transport facility")}
          ></p>
          <p style={{ fontSize: "13px" }}>Transport Facility</p>
        </div>

        <div className="d-flex gap-2">
          <p
            style={{
              backgroundColor: "rgb(252, 245, 106)",
              height: "15px",
              width: "15px",
              cursor: "pointer",
            }}
            onClick={() => setSelectedCategory("majar")}
          ></p>
          <p style={{ fontSize: "13px" }}>Major Land Mark</p>
        </div>
        <div className="d-flex gap-2">
          <p
            style={{
              backgroundColor: "rgb(255, 153, 0)",
              height: "15px",
              width: "15px",
              cursor: "pointer",
            }}
            onClick={() => setSelectedCategory("new developments")}
          ></p>
          <p style={{ fontSize: "13px" }}>New Developments</p>
        </div>
      </div> */}
      <div className="d-flex flex-wrap gap-3 flex-md-row flex-column mb-2">
        {[
          { label: "All", color: "rgb(47, 79, 79)", key: "all" },
          {
            label: "School & Colleges",
            color: "rgb(110, 151, 255)",
            key: "school & colleges",
          },
          {
            label: "Transport Facility",
            color: "rgb(0, 230, 77)",
            key: "transport facility",
          },
          {
            label: "Major Land Mark",
            color: "rgb(252, 245, 106)",
            key: "majar",
          },
          {
            label: "New Developments",
            color: "rgb(255, 153, 0)",
            key: "new developments",
          },
        ].map((item) => (
          <div className="d-flex align-items-center gap-2" key={item.key}>
            <strong
              style={{
                backgroundColor: item.color,
                height: "15px",
                width: "15px",
                cursor: "pointer",
              }}
              onClick={() => setSelectedCategory(item.key)}
            ></strong>
            <p style={{ fontSize: "13px", marginBottom: "0" }}>{item.label}</p>
          </div>
        ))}
      </div>

      <div className="property-location map">
        <div className="divider-fade" />
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={9}
          onLoad={(map) => setMapRef(map)}
          options={mapOptions}
        >
          {marking.length > 0 && (
            <Polygon
              path={marking
                .filter((item) => item.location)
                .map((item) => {
                  const [lat, lng] = item.location.split(",").map(parseFloat);
                  return { lat, lng };
                })}
              options={{
                fillColor: "#00cccc",
                fillOpacity: 0.7,
                strokeColor: "#rgb(47, 79, 79)",
                strokeOpacity: 1,
                strokeWeight: 2,
              }}
            />
          )}

          {marking?.map((item, index) => {
            if (!item.location) return null;
            const [lat, lng] = item.location.split(",").map(parseFloat);
            return (
              <React.Fragment key={item.id}>
                <Marker
                  position={{ lat, lng }}
                  onClick={() => {
                    setHandleMarker(index);
                    setHoveredMarker(null);
                  }}
                  tooltip="Confirm to proceed"
                />
                {handleMarker === index && (
                  <InfoWindow
                    position={{ lat, lng }}
                    options={{
                      pixelOffset: new window.google.maps.Size(0, -30),
                      maxWidth: 500,
                    }}
                    onCloseClick={() => setHandleMarker(null)}
                  >
                    <div
                      style={{
                        textAlign: "center",
                        height: "50px",
                        overflow: "hidden",
                      }}
                      className="p-0"
                    >
                      <h6 style={{ fontWeight: "400", fontSize: "15px" }}>
                        {" "}
                        Surveyggg No : {item.survey_no}
                      </h6>
                      <p>
                        <LocationOnIcon sx={{ color: "red", fontSize: 17 }} />{" "}
                        {item.location}{" "}
                      </p>
                    </div>
                  </InfoWindow>
                )}
              </React.Fragment>
            );
          })}

          {localities?.map((item, index) => {
            if (item.location && typeof item.location === "string") {
              const [lat, lng] = item.location.split(",").map(parseFloat);
              const distance = calculateDistance(lat, lng);

              const markerColor =
                item.division === "school & colleges"
                  ? "http://maps.google.com/mapfiles/ms/icons/blue-dot.png"
                  : item.division === "transport facility"
                  ? "http://maps.google.com/mapfiles/ms/icons/green-dot.png"
                  : item.division === "majar"
                  ? "http://maps.google.com/mapfiles/ms/icons/yellow-dot.png"
                  : item.division === "new developments"
                  ? "http://maps.google.com/mapfiles/ms/icons/orange-dot.png"
                  : "http://maps.google.com/mapfiles/ms/icons/red-dot.png";

              if (
                selectedCategory === "all" ||
                item.division === selectedCategory
              ) {
                return (
                  <React.Fragment key={item.id}>
                    <Marker
                      position={{ lat, lng }}
                      icon={markerColor}
                      onClick={() => {
                        setHoveredMarker(index);
                        setHandleMarker(null);
                      }}
                      tooltip="Confirm to proceed"
                    />
                    {hoveredMarker === index && (
                      <InfoWindow
                        position={{ lat, lng }}
                        options={{
                          pixelOffset: new window.google.maps.Size(0, -30),
                          maxWidth: 500,
                        }}
                        onCloseClick={() => setHoveredMarker(null)}
                      >
                        <div
                          style={{
                            textAlign: "center",
                            height: "50px",
                            overflow: "hidden",
                          }}
                          className="p-0"
                        >
                          <h6 style={{ fontWeight: "400", fontSize: "15px" }}>
                            {item.title}
                          </h6>
                          <p>
                            <LocationOnIcon
                              sx={{ color: "red", fontSize: 17 }}
                            />{" "}
                            distance from {distance} km{" "}
                          </p>
                        </div>
                      </InfoWindow>
                    )}
                  </React.Fragment>
                );
              }
            }
            return null;
          })}
        </GoogleMap>

        <div />
      </div>
    </div>
  ) : null;
}

export default Propertylocation;
