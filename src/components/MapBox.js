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
  useMapEvent,
} from "react-leaflet";
import L from "leaflet";
import { Container } from "@mui/material";
import { act } from "@testing-library/react";
import MarkerPulseEffect from "./MapComponents/MarkerPulseEffect";

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
  const iconDirectory = {
    Broadway: ico_broadway,
    MCL: ico_mcl,
    "Cinema City": ico_cinemacity,
    "Golden Harvest": ico_goldenharvest,
    "Emperor Cinema": ico_emperor,
    Others: ico_other,
    MTR: ico_mtr,
  };

  return L.icon({
    iconUrl: iconDirectory[org],
    iconSize: [45, 45],
    iconAnchor: [22, 42],
  });
};

function HandleSetView(map, activeCinema) {
  if (activeCinema !== null && activeCinema !== undefined) {
    map.setView(
      [activeCinema.latitude, activeCinema.longitude],
      map.getZoom(),
      {
        animate: true,
        pan: { duration: 1.2 },
      }
    );
  }

  return null;
}

function HandleMapManipulation({ activeCinema, handleLocateToMapTrigger }) {
  /** this is a functional component to create a reference for Leaflet map object
   * any function calls that need to manipulate the map object is centralized here
   */
  const map = useMap();

  useEffect(() => {
    HandleSetView(map, activeCinema);
  }, [activeCinema]);

  // note: center map to activeCinema when "Locate To Map" icon is clicked
  useEffect(() => {
    HandleSetView(map, activeCinema);
  }, [handleLocateToMapTrigger]);

  return null;
}

const MapBox = ({
  activeCinema,
  ActiveCinemaChangeHandler,
  activeDistance,
  setActiveDistance,
  handleLocateToMapTrigger,
}) => {
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
      <HandleMapManipulation
        activeCinema={activeCinema}
        handleLocateToMapTrigger={handleLocateToMapTrigger}
      />
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
                  name={c.name_en}
                  // title={c.TheatreID}
                  position={[c.latitude, c.longitude]}
                  icon={getIcon(c.chain)}
                  eventHandlers={{
                    // click: () => {},
                    click: (e) => {
                      // addLine(e.target.options.name);
                      ActiveCinemaChangeHandler(c.name_en);
                    },
                  }}
                >
                  <Tooltip>{c.name_en}</Tooltip>
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
        {activeDistance === null ? (
          <></>
        ) : (
          <Polyline
            positions={activeDistance}
            pathOptions={{ color: "rgb(224,179,66)" }}
          ></Polyline>
        )}
        <Polygon pathOptions={purpleOptions} positions={multiPolygon} />
        {activeCinema === null ? (
          <></>
        ) : (
          <MarkerPulseEffect
            coordinates={[activeCinema.latitude, activeCinema.longitude]}
          />
        )}
      </LayersControl>
    </MapContainer>
  );
};

export default MapBox;
