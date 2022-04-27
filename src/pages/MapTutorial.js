import { useEffect, useRef, useState } from "react";
import "../App.css";
import { groupBy } from "lodash";
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
} from "react-leaflet";
import L from "leaflet";
import { Grid } from "@mui/material";
import ChartTheatresSalesOverHours from "../components/ChartTheatresSalesOverHours";
import ChartHousesSales from "../components/ChartHousesSales";
import MapBox from "../components/MapBox";

const fillBlueOptions = { fillColor: "blue" };
const blackOptions = { color: "black" };
const limeOptions = { color: "lime" };
const purpleOptions = { color: "purple" };
const redOptions = { color: "red" };

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

  // console.log(`../assets/${iconFilesRef[org]}.png`);
  return L.icon({
    iconUrl: iconFilesRef[org],
    iconSize: 50,
  });
};

const MapTutorial = () => {
  const [activeCinema, setActiveCinema] = useState(null);
  const [activeHouse, setActiveHouse] = useState(null);
  const [activeDistance, setActiveDistance] = useState([
    [0, 0],
    [0, 0],
  ]);

  return (
    // <div>map</div>
    <Grid
      container
      sx={{
        height: "100%",
      }}
      alignItems="center"
      justifyContent="space-between"
    // spacing={10}
    // rowSpacing={12}
    >
      <Grid item xs={12} md={6}>
        <MapBox
          setActiveHouse={setActiveHouse}
          setActiveCinema={setActiveCinema}
          activeDistance={activeDistance}
          setActiveDistance={setActiveDistance}
        />
      </Grid>
      <Grid item xs={12} md={4} sx={{ textAlign: "center" }}>
        <ChartHousesSales
                hoveredTheatre={activeCinema}
                activeHouse={activeHouse}
                setActiveHouse={setActiveHouse}
              />
        {/* <Grid container direction="column" justifyContent="center">
          <Grid item>
            <h3> {activeCinema == null ? "-" : activeCinema} </h3>
          </Grid>
          <Grid item>
            <ChartHousesSales
              hoveredTheatre={activeCinema}
              activeHouse={activeHouse}
              setActiveHouse={setActiveHouse}
            />
          </Grid>
          <Grid item>
            <ChartTheatresSalesOverHours hoveredTheatre={activeCinema} />

          </Grid>
        </Grid> */}
      </Grid>
      <Grid item xs={12} md={2}>
        <div>
          <h3>Thurd Item</h3>
        </div>
      </Grid>
    </Grid>
  );
};

export default MapTutorial;
