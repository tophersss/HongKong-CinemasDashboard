import { useEffect, useRef, useState } from "react";
import "../App.css";
import { groupBy } from "lodash";
import CinemasGeoInfo from "../data/CinemasGeoInfo.json";
import ico_goldenharvest from "../assets/golden_harvest.png";
import ico_cinemacity from "../assets/cinema_city.png";
import ico_broadway from "../assets/broadway.png";
import ico_mcl from "../assets/mcl.png";
import ico_emperor from "../assets/emperor.png";
import ico_other from "../assets/others.png";
import ico_mtr from "../assets/mtr.png";
import { useLeafletContext } from "@react-leaflet/core";
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  Polygon,
  Tooltip,
  Polyline,
  LayersControl,
  LayerGroup,
  FeatureGroup,
  useMap,
  useMapEvent
} from "react-leaflet";
import L from "leaflet";
import { Container } from "@mui/material";
import { act } from "@testing-library/react";


const fillBlueOptions = { fillColor: "blue" };
const purpleOptions = { color: "purple" };

const multiPolygon = [
  [
    [22.36795, 114.113],
    [22.36785, 114.1155],
    [22.36665, 114.1175],
  ],
  [
    [22.3679, 114.11445],
    [22.3679, 114.11444],
    [22.3679, 114.11443],
  ],
];

const getIcon = (org) => {
  const iconFilesRef = {
    Broadway: ico_broadway,
    MCL: ico_mcl,
    "Cinema City": ico_cinemacity,
    "Golden Harvest": ico_goldenharvest,
    "Emperor Cinema": ico_emperor,
    Others: ico_other,
    MTR: ico_mtr,
  };

  return L.icon({
    iconUrl: iconFilesRef[org],
    iconSize: 50,
  });
};

function SetViewOnClick() {
  const map = useMapEvent('click', (e) => {
    map.setView(e.latlng, map.getZoom(), {
      animate: true,
    })
  })

  return null
}

function HandleSetView({activeCinema}) {
  const map = useMap();

  useEffect(() => {
    if ( activeCinema !== null && activeCinema !== undefined ) {
      map.setView([activeCinema.latitude, activeCinema.longitude], map.getZoom());
    }
  }, [activeCinema]);

  return null;

}

const MapBox = ({ setActiveHouse, activeCinema, ActiveCinemaChangeHandler, activeDistance, setActiveDistance }) => {
  
  const addLine = (name) => {
    setActiveDistance([
      [activeCinema.latitude, activeCinema.longitude],
      activeCinema.closest_exits[0].coordinates,
    ]);
  };

  // https://stackoverflow.com/questions/66264472/react-leaflet-layerscontrol-overlay-with-multiple-markers
  const groupedByChain = groupBy(CinemasGeoInfo, "chain");

  return (
    <MapContainer center={[22.36797, 114.11453]} zoom={13} zoomControl={false}>
    <HandleSetView activeCinema={activeCinema} />
    <LayersControl position="topright">
      <LayersControl.BaseLayer checked name="OpenStreetMap.Mapnik">
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png"
        />
      </LayersControl.BaseLayer>

      {Object.keys(groupedByChain).map((chain) => (
        <LayersControl.Overlay
          checked={chain == "Golden Harvest" ? true : true}
          key={chain}
          name={chain}
        >
          <LayerGroup>
            {groupedByChain[chain].map((c) => (
              <Marker
                name={c.name}
                position={[c.latitude, c.longitude]}
                icon={getIcon(c.chain)}
                eventHandlers={{
                  // click: () => {},
                  click: (e) => {
                    // addLine(e.target.options.name);
                    ActiveCinemaChangeHandler(c.name);
                  },
                  // mouseout: () => {
                  //   // setActiveCinema(null);
                  //   setActiveHouse(null);
                  //   setActiveDistance(null);
                  // },
                }}
              >
                <Tooltip>{c.name}</Tooltip>
              </Marker>
            ))}
          </LayerGroup>
        </LayersControl.Overlay>
      ))}
      <LayersControl.Overlay checked={false} key="MTR Exits" name="MTR Exits">
        <LayerGroup>
          {CinemasGeoInfo.map((c) => (
            <Marker
              name={c.closest_exits[0].name}
              position={c.closest_exits[0].coordinates}
              icon={getIcon("MTR")}
            >
              <Tooltip>{c.closest_exits[0].name}</Tooltip>
            </Marker>
          ))}
        </LayerGroup>
      </LayersControl.Overlay>
      {activeDistance == null ? (
        <></>
      ) : (
        <Polyline
          positions={activeDistance}
          pathOptions={{ color: "rgb(224,179,66)" }}
        ></Polyline>
      )}
      <Polygon pathOptions={purpleOptions} positions={multiPolygon} />
    </LayersControl>
  </MapContainer>
  );
};

export default MapBox;
