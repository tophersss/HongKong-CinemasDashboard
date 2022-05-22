import L from "leaflet";
import { Marker } from "react-leaflet";

// note: pulse animation reference https://www.youtube.com/watch?v=X6bUnOt_KwA

const MarkerPulseEffect = ({ coordinates }) => {
  return (
    <Marker
      // position={[activeCinema.latitude, activeCinema.longitude]}
      position={coordinates}
      icon={L.divIcon({
        className: "map-pulse-container",
        html: '<div class="map-icon-pulse-effect"></div>',
        iconSize: [25, 26],
      })}
    />
  );
};

export default MarkerPulseEffect;
