/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom";
import styles from "./Map.module.css";
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMap,
  useMapEvents,
} from "react-leaflet";
import { useEffect, useState } from "react";
import Button from "./Button";
import { useHotel } from "../features/hotels/useHotel";
import { useUrlPosition } from "../services/useUrlPosition";
import { useGeolocation } from "../services/useGeolocation";
import { useHotels } from "../features/hotels/useHotels";
import Spinner from "./Spinner";

function Map() {
  const [mapPostion, setmapPosition] = useState([
    9.025665694903497, 38.752291314303875,
  ]);
  const { hotel, isLoading } = useHotels();
  const [mapLat, mapLng] = useUrlPosition();

  const {
    position: geolocationposition,
    isLoading: isLoadingpostion,
    getPosition,
  } = useGeolocation();

  useEffect(
    function () {
      if (mapLat && mapLng) setmapPosition([mapLat, mapLng]);
    },
    [mapLat, mapLng]
  );
  useEffect(
    function () {
      if (geolocationposition)
        setmapPosition([geolocationposition.lat, geolocationposition.lng]);
    },
    [geolocationposition]
  );
  if (isLoading) return <Spinner />;
  return (
    <div className={styles.mapContainer}>
      {!geolocationposition && (
        <Button size="medium" onClick={getPosition}>
          {isLoadingpostion ? "Loading..." : "use your location"}
        </Button>
      )}
      <MapContainer
        center={mapPostion}
        zoom={6}
        scrollWheelZoom={true}
        className={styles.map}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
        />
        {hotel?.map((hotel) => (
          <Marker
            position={[hotel.location._lat, hotel.location._long]}
            key={hotel.id}
          >
            <Popup>
              <span>{hotel.name}</span>
            </Popup>
          </Marker>
        ))}
        ;
        <ChangeCenter position={mapPostion} />
        <DetectClick />
      </MapContainer>
    </div>
  );
}
function ChangeCenter({ position }) {
  const map = useMap();
  map.setView(position);
  return null;
}
function DetectClick() {
  const navigate = useNavigate();
  useMapEvents({
    click: (e) => navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`), //this is correctable
  });
}
export default Map;
