// todo: implement dashboard
// https://github.com/devias-io/material-kit-react

import {
  Autocomplete,
  Card,
  Grid,
  Paper,
  TextField,
  Input,
  Typography,
  Box,
  Tooltip,
} from "@mui/material";
import CinemaIndex from "./CinemaIndex";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import ChartHousesSales from "../components/ChartHousesSales";
import MoneyIcon from "@mui/icons-material/Money";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import LightbulbIcon from "@mui/icons-material/Lightbulb";
import SeatplanDialog from "./DialogBox";
import MyLocationRoundedIcon from "@mui/icons-material/MyLocationRounded";
import DirectionsSubwayTwoToneIcon from "@mui/icons-material/DirectionsSubwayTwoTone";
import CinemasGeoInfo from "../data/CinemasGeoInfo.json";
import { cinemas_performance_overview } from "../data/CinemasPerformanceOverview";
import ChartHourlyAttendance from "./ChartHourlyAttendance";
import StatCard from "./StatCard";
import SVG from "react-inlinesvg";
import { PickChainColor } from "../utils/ColorUtils";
import { useEffect, useState } from "react";
import Trivia from "./Trivia";


// note: helper function
const GetCinemaStats = (id, type) => {
  /**
   * generate an Object template that will be passed to Stat card as prop
   */
  const cinemaStatsObj = cinemas_performance_overview.filter(
    (d) => d.TheatreID === id
  )[0];

  switch (type.toLowerCase()) {
    case "sales":
      // console.log(`found sales...`);
      return {
        header: type.toUpperCase(),
        valueOverall: cinemaStatsObj.OverallSales,
        valueAtCurrentMonth: cinemaStatsObj.CurrentMonthSales,
        valueAtCurrentWeek: cinemaStatsObj.CurrentWeekSales,
        valueAtPrevMonth: cinemaStatsObj.PrevMonthSales,
        valueAtPrevWeek: cinemaStatsObj.PrevWeekSales,
      };
    case "tickets_sold":
      // console.log(`found tickets sold...`);
      return {
        header: type.toUpperCase(),
        valueOverall: cinemaStatsObj.OverallTicketsSold,
        valueAtCurrentMonth: cinemaStatsObj.CurrentMonthTicketsSold,
        valueAtCurrentWeek: cinemaStatsObj.CurrentWeekTicketsSold,
        valueAtPrevMonth: cinemaStatsObj.PrevMonthTicketsSold,
        valueAtPrevWeek: cinemaStatsObj.PrevWeekTicketsSold,
      };
    default:
      break;
  }
};

// note: Component function
const MapInfoPanel = ({
  activeCinema,
  ActiveCinemaChangeHandler,
  activeHouseID,
  handleSetActiveHouseID,
  requestLocateToMap,
}) => {
  // note: options for Autocomplete drop-down list
  var cinemaNames = CinemasGeoInfo.map((d) => d.name_en);

  // note: pass to StatCard and refresh whenever activeCinema updates
  const [cardContentSales, setCardContentSales] = useState(null);
  const [cardContentTicketsSold, setCardContentTicketsSold] = useState(null);
  useEffect(() => {
    if (activeCinema) {
      setCardContentSales(GetCinemaStats(activeCinema.TheatreID, "sales"));
      setCardContentTicketsSold(
        GetCinemaStats(activeCinema.TheatreID, "tickets_sold")
      );
    }
  }, [activeCinema]);

  // note: Identify active cinema's chain to define a Class for theming
  const mapInfoPanelColorClass = `info-panel--${PickChainColor(activeCinema?.chain).color
    }`;

  // note: Control Seatplan dialog open state
  const [isSeatplanOpen, setIsSeatplanOpen] = useState(false);

  return (
    <div className={`info-panel ${mapInfoPanelColorClass}`}>
      <Paper
        id="paper-backdrop"
        sx={{
          position: "relative",
          justifyContent: "center",
          overflow: "hidden",
          minHeight: "100px",
          width: "35em",
          display: "inline-block",
        }}
      >
        <Box sx={{ flexGrow: 1 }}>
          {/* <button
            onClick={() => {
              console.log(`activeHouseID: ${activeHouseID}`);
            }}
          >
            {" "}
            show activeHouse{" "}
          </button> */}
          <AppBar position="static" className="palette-header">
            <Toolbar>
              <Autocomplete
                disablePortal
                autoSelect
                id="cinema-value"
                className="cinema-auto-complete"
                options={cinemaNames}
                renderInput={(params) => (
                  <div ref={params.InputProps.ref}>
                    <CinemaIndex
                      divClassName={mapInfoPanelColorClass}
                      activeCinemaID={activeCinema?.TheatreID}
                      handleActiveCinemaChange={ActiveCinemaChangeHandler}
                    />
                    <Input
                      type="text"
                      multiline={false}
                      placeholder="🔎 cinema"
                      {...params.inputProps}
                    ></Input>
                  </div>
                )}
                sx={{ paddingTop: "10px" }}
                value={activeCinema === null ? null : activeCinema.name_en}
                onChange={(event, newValue) => {
                  ActiveCinemaChangeHandler(newValue);
                }}
              />
              {/* <MyLocationRoundedIcon />
            <DirectionsSubwayTwoToneIcon /> */}
            </Toolbar>
          </AppBar>
        </Box>

        {activeCinema === null ? (
          "Search or Click On A Cinema To Show Dashboard"
        ) : (
          <>
            <Grid
              container
              className="stat-card__container"
              justifyContent="space-evenly"
            >
              <Grid item xs>
                <StatCard
                  cardProps={{ variant: "outlined", raised: true }}
                  cardContent={cardContentSales}
                  Icon={AttachMoneyIcon}
                  statType="SALES"
                ></StatCard>
              </Grid>
              <Grid item xs>
                <StatCard
                  cardProps={{ variant: "outlined", raised: true }}
                  cardContent={cardContentTicketsSold}
                  Icon={MoneyIcon}
                  statType="TICKETS SOLD"
                ></StatCard>
              </Grid>
            </Grid>
            <Box
              className="util-bar__container"
              sx={{
                pt: 2,
                alignItems: "center",
                textAlign: "center",
                width: "75%",
                display: "inline-flex",
              }}
            >

              <Tooltip arrow title="View Seatplans">
                <div className="util-bar__item-container" style={{ display: "flex" }}>
                  <SVG
                    src={`${process.env.PUBLIC_URL}/assets/open-seatplan.svg`}
                    // src={require(`../assets/open-seatplan.svg`).default}
                    width={26}
                    height={26}
                    onClick={() => {
                      setIsSeatplanOpen(true);
                    }}
                  />
                </div>
              </Tooltip>

              <Tooltip arrow title="Locate On Map">
                <div className="util-bar__item-container" style={{ display: "flex" }}>
                  <SVG
                    // src={require(`../assets/locate-on-map.svg`).default}
                    src={`${process.env.PUBLIC_URL}/assets/locate-on-map.svg`}
                    width={26}
                    height={26}
                    onClick={() => {
                      requestLocateToMap((prevState) => !prevState);
                    }}
                  />
                </div>
              </Tooltip>
              <Trivia TheatreID={activeCinema.TheatreID} name={activeCinema.name_en} />              
            </Box>

            <ChartHourlyAttendance
              activeCinemaID={activeCinema.TheatreID}
            />

            <ChartHousesSales
              activeCinemaName={activeCinema?.name_en}
              associatedChain={activeCinema?.chain}
              activeHouseID={activeHouseID}
              handleSetActiveHouseID={handleSetActiveHouseID}
              open={isSeatplanOpen}
              handleOpen={setIsSeatplanOpen}
            />
            <SeatplanDialog
              open={isSeatplanOpen}
              handleOpen={setIsSeatplanOpen}
              activeCinemaID={activeCinema.TheatreID}
              activeHouseID={activeHouseID}
              handleSetActiveHouseID={handleSetActiveHouseID}
            />
          </>
        )}
      </Paper>
    </div>
  );
};

export default MapInfoPanel;
