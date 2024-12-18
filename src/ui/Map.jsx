/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import {
  Link,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import styles from "./Map.module.css";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
  useMapEvents,
} from "react-leaflet";
// import "leaflet/dist/leaflet.css";

import { useHotels } from "../features/hotels/useHotels";
import { useHotel } from "../features/hotels/useHotel";
import { useState } from "react";

function Map() {
  // const { hotel, isLoading } = useHotels(); this is needed for the map marker for them to stand out

  const { hotel } = useHotel();
  const { hotels } = useHotels();
  const [searchParams, setSearchParams] = useSearchParams();
  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");
  const navigate = useNavigate();
  const [mapContainer, setMapContainer] = useState([lat, lng]);
  return (
    <MapContainer
      center={mapContainer}
      zoom={13}
      scrollWheelZoom={true}
      className="w-full h-full"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
      />
      {mapContainer &&
        hotels?.map((hotel) => (
          <Marker
            position={[hotel.location._lat, hotel.location._long]}
            key={hotel.id}
          >
            <Popup className="bg-white text-black">
              <div
                onClick={() => {
                  // Navigate to hotel detail and set map center to the hotel's location
                  navigate(
                    `/hotel/${hotel.id}?lat=${hotel.location._lat}&lng=${hotel.location._long}`
                  );
                  setMapContainer([hotel.location._lat, hotel.location._long]);
                }}
                style={{ cursor: "pointer", fontWeight: "bold" }}
              >
                {hotel.name}
              </div>
            </Popup>
          </Marker>
        ))}
    </MapContainer>
  );
}
export default Map;

// const [mapPostion, setmapPosition] = useState([
//   9.025665694903497, 38.752291314303875,
// ]);
// const { hotel, isLoading } = useHotels();
// const [mapLat, mapLng] = useUrlPosition();

// const {
//   position: geolocationposition,
//   isLoading: isLoadingpostion,
//   getPosition,
// } = useGeolocation();

// useEffect(
//   function () {
//     if (mapLat && mapLng) setmapPosition([mapLat, mapLng]);
//   },
//   [mapLat, mapLng]
// );
// useEffect(
//   function () {
//     if (geolocationposition)
//       setmapPosition([geolocationposition.lat, geolocationposition.lng]);
//   },
//   [geolocationposition]
// );
// if (isLoading) return <Spinner />;
// return (
//   <div className={styles.mapContainer}>
//     {!geolocationposition && (
//       <Button size="medium" onClick={getPosition}>
//         {isLoadingpostion ? "Loading..." : "use your location"}
//       </Button>
//     )}
//     <MapContainer
//       center={mapPostion}
//       zoom={6}
//       scrollWheelZoom={true}
//       className={styles.map}
//     >
//       <TileLayer
//         attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//         url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
//       />
//       {hotel?.map((hotel) => (
//         <Marker
//           position={[hotel.location._lat, hotel.location._long]}
//           key={hotel.id}
//         >
//           <Popup>
//             <span>{hotel.name}</span>
//           </Popup>
//         </Marker>
//       ))}
//       ;
//       <ChangeCenter position={mapPostion} />
//       <DetectClick />
//     </MapContainer>
//   </div>
// );
// }
// function ChangeCenter({ position }) {
// const map = useMap();
// map.setView(position);
// return null;
// }
// function DetectClick() {
// const navigate = useNavigate();
// useMapEvents({
//   click: (e) => navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`), //this is correctable
// });
// }
