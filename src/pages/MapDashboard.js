import { useEffect, useRef, useState } from "react";
import "../App.css";
import CinemasGeoInfo from "../data/CinemasGeoInfo.json";
import MapBox from "../components/MapBox";
import MapInfoPanel from "../components/MapInfoPanel";

const MapDashboard = () => {
  const [activeCinema, setActiveCinema] = useState(null);
  const [activeCinemaTrigger, setActiveCinemaTrigger] = useState(true);
  const [activeHouseID, setActiveHouseID] = useState(null);
  const [activeDistance, setActiveDistance] = useState([
    [0, 0],
    [0, 0],
  ]);
  // const requestLocateToMap = useRef(true);
  const [locateToMapTrigger, setLocateToMapTrigger] = useState(true);

  const HandleActiveCinemaChange = (CinemaName) => {
    // note: if CinemaName is supplied and is different from activeCinema, then take actions
    if (
      CinemaName !== null &&
      CinemaName !== undefined &&
      CinemaName !== activeCinema?.name_en
    ) {
      setActiveHouseID(null);

      var MatchedCinemas = CinemasGeoInfo.filter((c) => c.name_en === CinemaName);
      if (MatchedCinemas.length === 0) {
        console.log(``)
        return false;
      }
      var CinemaObject = MatchedCinemas[0];

      setActiveCinema(CinemaObject);

      return true;
    }
    return false;
  };

  // useEffect(() => {
  //   setActiveHouse(null);
  // }, [activeCinema])

  return (
    <>
      <MapBox
        activeCinema={activeCinema}
        ActiveCinemaChangeHandler={HandleActiveCinemaChange}
        activeDistance={activeDistance}
        setActiveDistance={setActiveDistance}
        handleLocateToMapTrigger={locateToMapTrigger}
      />
      <MapInfoPanel
        activeCinema={activeCinema}
        ActiveCinemaChangeHandler={HandleActiveCinemaChange}
        activeHouseID={activeHouseID}
        handleSetActiveHouseID={setActiveHouseID}
        requestLocateToMap={setLocateToMapTrigger}
      />

      {/* <Paper sx={{ position: "relative", overflow: "hidden", minHeight: "100px", width: "20em", display: "inline-block" }}>
        <ChartHousesSales
          hoveredTheatre={activeCinema}
          activeHouse={activeHouse}
          setActiveHouse={setActiveHouse}
        />
      </Paper> */}

      {/* <Grid
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
        </Grid>
        <Grid item xs={12} md={4} sx={{ textAlign: "center" }}>
          <ChartHousesSales
            hoveredTheatre={activeCinema}
            activeHouse={activeHouse}
            setActiveHouse={setActiveHouse}
          /> */}
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
      {/* </Grid>
        <Grid item xs={12} md={2}>
          <div>
            <h3>Thurd Item</h3>
          </div>
        </Grid>
      </Grid> */}
    </>
  );
};

export default MapDashboard;
