import React, { useState, useCallback, useEffect } from 'react';
import { GoogleMap, useJsApiLoader, MarkerClusterer, Marker, InfoWindow, Polygon } from '@react-google-maps/api';
import { markers } from './markers';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import { Row, Col, Card } from "react-bootstrap";
import MapPolygon from './map/Draw';
import { IMG_PATH } from '../../Api/api';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const containerStyle = {
  width: '100%',
  height: '100%'
};

const center = {
  lat: 13.078187,
  lng: 79.972347
};


// const loaderOptions = {
//   id: 'google-map-script',
//   googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
//   libraries: ['geometry'],
// };
const loaderOptions = {
  id: "google-map-script",
  googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
  libraries: ["places", "geometry"],
};

const SearchLocation = ({ propertyData }) => {

  // box border start
  const [boxdata, setBoxdata] = useState([]);
  const [activeMarker, setActiveMarker] = useState(null);
  const navigate = useNavigate()

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await axios.get(
  //         `https://sourcingbook.boolok.com/sourcingbookapi/api/areaprice`
  //       );
  //       setBoxdata(response.data);
  //     } catch (error) { }
  //   };
  //   fetchData()
  // }, [])

  // color base on price
  const colorBasedOnPrice = (amount) => {
    const price = amount[0].price
    let color;
    if (price <= 1000) {
      color = "#921309";
    } else if (price > 1000) {
      color = "#34a853";
    } else {
      color = "#fff";
    }

    return color;
  };


  const data = Array.isArray(propertyData) && propertyData.length > 0 ? propertyData : [];

  // const locations = data.map((item) => {
  //   if (!item.location || typeof item.location !== "string") {
  //     console.error(`Invalid location for item:`, item);
  //     return { ...item, loc: null };
  //   }

  //   const [latitude, longitude] = item.location?.split(',').map(Number);

  //   if (isNaN(latitude) || isNaN(longitude)) {
  //     console.error(`Invalid coordinates for item:`, item);
  //     return { ...item, loc: null };
  //   }

  //   return {
  //     ...item,
  //     loc: {
  //       lat: latitude,
  //       lng: longitude
  //     }
  //   };
  // }).filter(item => item.loc !== null);




  // const finalData = data?.map((item, index) => ({
  //   ...item,  
  //   loc: location[index]  
  // }));  

  const { isLoaded } = useJsApiLoader(loaderOptions);
  const [map, setMap] = useState(null);
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [mapRef, setMapRef] = useState(null);

  const onLoad = useCallback((map) => {
    setMap(map);
  }, []);

  const onUnmount = useCallback(() => {
    setMap(null);
  }, []);

  // const handleMarkerClick = (marker) => {
  //   setSelectedMarker(marker);
  // };

  const handleCloseClick = () => {
    setSelectedMarker(null);
  };
  const handleMarkerClick = (lat, lng) => {
    if (mapRef) {
      mapRef.panTo({ lat, lng });
      mapRef.setZoom(15);
    }
  };

  const handleMarkerHover = (index) => {
    setActiveMarker((prevIndex) => {
      if (prevIndex === index) {
        return null;
      }
      return null;
    });


    setTimeout(() => {
      setActiveMarker(index);
    }, 0);
  };

  const mapClick = (id) => {
    navigate(`/property/${id}`)
  }
  const closeClick = (id) => {
    setActiveMarker(null)
  }
  const mapTheme = [
  {
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#242f3e"
      }
    ]
  },
  {
    "elementType": "geometry.fill",
    "stylers": [
      {
        "color": "#2f4f4f"
      },
      {
        "visibility": "on"
      }
    ]
  },
  {
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#746855"
      }
    ]
  },
  {
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "color": "#242f3e"
      }
    ]
  },
  {
    "featureType": "administrative",
    "elementType": "geometry.fill",
    "stylers": [
      {
        "color": "#ffeb3b"
      },
      {
        "visibility": "on"
      },
      {
        "weight": 8
      }
    ]
  },
  {
    "featureType": "administrative",
    "elementType": "geometry.stroke",
    "stylers": [
      {
        "visibility": "on"
      }
    ]
  },
  {
    "featureType": "administrative.country",
    "elementType": "geometry.fill",
    "stylers": [
      {
        "color": "#ffeb3b"
      },
      {
        "visibility": "on"
      },
      {
        "weight": 8
      }
    ]
  },
  {
    "featureType": "administrative.locality",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#d59563"
      }
    ]
  },
  {
    "featureType": "administrative.neighborhood",
    "elementType": "geometry.fill",
    "stylers": [
      {
        "color": "#ffeb3b"
      },
      {
        "visibility": "on"
      },
      {
        "weight": 8
      }
    ]
  },
  {
    "featureType": "administrative.neighborhood",
    "elementType": "geometry.stroke",
    "stylers": [
      {
        "visibility": "on"
      }
    ]
  },
  {
    "featureType": "administrative.neighborhood",
    "elementType": "labels.icon",
    "stylers": [
      {
        "visibility": "on"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#d59563"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#263c3f"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#6b9a76"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#38414e"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "geometry.stroke",
    "stylers": [
      {
        "color": "#212a37"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#9ca5b3"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#746855"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "geometry.stroke",
    "stylers": [
      {
        "color": "#1f2835"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#f3d19c"
      }
    ]
  },
  {
    "featureType": "transit",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#2f3948"
      }
    ]
  },
  {
    "featureType": "transit.station",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#d59563"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#17263c"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#515c6d"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "color": "#17263c"
      }
    ]
  }
]
const mapOptions = {
  styles: mapTheme,
  disableDefaultUI: false,
  zoomControl: true,
};

  return isLoaded ? (
    <section style={{ marginTop: "0px" }}>
      <div className="">
        <div className="map-container">
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={10}
            onLoad={onLoad}
            onUnmount={onUnmount}
            options={mapOptions}
          >
            {data?.map((item, index) => {
              // const [lat, lng] = item.location?.split(",").map(parseFloat);
              if (!item.location || !item.location.includes(",")) {
                console.warn("Invalid location format:", item.location);
                return null;
              }


              const [lat, lng] = item.location?.split(",").map(Number);


              if (isNaN(lat) || isNaN(lng)) {
                console.warn("Invalid coordinates:", { lat, lng });
                return null;
              }

              
              return (
                <Marker
                  key={index}
                  position={{ lat, lng }}
                  onClick={() => handleMarkerHover(index)}

                >
                  {activeMarker === index && (
                    <InfoWindow
                      position={{ lat, lng }}
                      options={{
                        pixelOffset: new window.google.maps.Size(0, 5),
                        maxWidth: 500,
                      }}
                      onCloseClick={() => closeClick()}
                    >
                      <div style={{ textAlign: "center", height: "auto", width: "270px", overflow: "hidden" }}>
                        {data
                          .filter((product) => product.id === item.id)
                          .map((product) => (
                            <div className="" key={product.id} style={{ border: 'none' }}>
                              <Link to={`/property/${product.id}/${product.propertyType}`}>
                                <div className="">
                                  <div className="">
                                    <img
                                      src={`${IMG_PATH}enquiry/gallery/${product.image}`}
                                      alt="home-1"
                                      className="img-"
                                      style={{
                                        // boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
                                        objectFit: "cover",
                                        height: "150px",
                                        width: "250px"
                                      }}
                                    />
                                  </div>
                                  <div className="p-2" style={{ textAlign: 'start' }}>
                                    <h5 className='text-dark ' style={{
                                      wordWrap: "break-word",
                                      overflowWrap: "break-word",
                                      whiteSpace: "normal",
                                      fontSize: "15px"
                                    }}>{product.propertyName} </h5>
                                    <p className='text-dark ' >  <i className="fa fa-map-marker" style={{ marginRight: "7px" }} />{product.village}, {product.taluk} </p>
                                    <p className='text-dark' style={{ textAlign: 'start' }}> <i className="fa-solid fa-ruler-combined"></i>  <span>{product.units} </span> </p>
                                    <p className='text-dark' style={{ textAlign: 'start', fontWeight: '600' }}> <i className="fa fa-inr" aria-hidden="true" style={{ fontSize: 12 }} />  {product.price}  </p>
                                  </div>
                                </div>
                              </Link>
                            </div>
                          ))}
                      </div>
                    </InfoWindow>
                  )}
                </Marker>
              );
            })}
          </GoogleMap>

        </div>
      </div>
    </section>
  ) : null;
}

export default SearchLocation;
