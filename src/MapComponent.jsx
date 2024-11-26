import React, { useState } from "react";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const MapComponent = ({ setCoordinates }) => {
  const [markers, setMarkers] = useState({ start: null, end: null });

  const MapClickHandler = () => {
    useMapEvents({
      click(e) {
        const newMarker = [e.latlng.lat, e.latlng.lng];
        if (!markers.start) {
          setMarkers((prev) => ({ ...prev, start: newMarker }));
          setCoordinates((prev) => [newMarker, prev[1]]);
        } else if (!markers.end) {
          setMarkers((prev) => ({ ...prev, end: newMarker }));
          setCoordinates((prev) => [prev[0], newMarker]);
        }
      },
    });
    return null;
  };

  return (
    <MapContainer center={[27.691610,85.2743222]} zoom={14} style={{ height: "400px", width: "100%" }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="&copy; OpenStreetMap contributors"
      />
      <MapClickHandler />
      {markers.start && <Marker position={markers.start}></Marker>}
      {markers.end && <Marker position={markers.end}></Marker>}
    </MapContainer>
  );
};

export default MapComponent;
