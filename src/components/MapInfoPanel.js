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


// ! - helper function
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

// ! - Component function
const MapInfoPanel = ({
  activeCinema,
  ActiveCinemaChangeHandler,
  activeHouseID,
  handleSetActiveHouseID,
  requestLocateToMap,
}) => {
  // ! - options for Autocomplete drop-down list
  var cinemaNames = CinemasGeoInfo.map((d) => d.name);

  // ! - pass to StatCard and refresh whenever activeCinema updates
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

  // ! - Identify active cinema's chain to define a Class for theming
  const mapInfoPanelColorClass = `info-panel--${PickChainColor(activeCinema?.chain).color
    }`;

  // ! - Control Seatplan dialog open state
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
              className="trivia__container"
              sx={{
                pt: 2,
                alignItems: "center",
                textAlign: "center",
                width: "75%",
                display: "inline-flex",
              }}
            >

              <Tooltip arror title="View Seatplans">
                <div className="info-panel__util-icons-container" style={{ display: "flex" }}>
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

              <Tooltip arror title="Locate On Map">
                <div className="info-panel__util-icons-container" style={{ display: "flex" }}>
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
              <Tooltip title="Show Me">
                <LightbulbIcon style={{ fontSize: "29px" }} />
              </Tooltip>
              <Trivia TheatreID={activeCinema.TheatreID} name={activeCinema.name_en} />
                {/* todo: https://www.google.com/search?q=infinite+scrolling+horizontal+text+codepen&sxsrf=ALiCzsYhY7ffnc-oXQ_rhCLF1boExoI2_Q%3A1652685130677&ei=SvmBYvH6KIqa0ASvhZX4Ag&oq=text+infinite+scro&gs_lcp=Cgdnd3Mtd2l6EAMYATIGCAAQCBAeMgYIABAIEB4yBggAEAgQHjIGCAAQCBAeMgYIABAIEB4yBggAEAgQHjIGCAAQCBAeMgYIABAIEB4yBggAEAgQHjIGCAAQCBAeOgcIABBHELADOgYIIxAnEBM6BAgjECc6CwgAEIAEELEDEIMBOgQIABBDOhEILhCABBCxAxCDARDHARDRAzoUCC4QgAQQsQMQgwEQxwEQ0QMQ1AI6EQguEIAEELEDEIMBEMcBEKMCOgUIABCABDoICAAQgAQQsQM6CggAELEDEIMBEEM6CAguEIAEELEDOgUIABDLAToECAAQHjoGCAAQChAeOgoIABAPEAUQChAeOgYIABAFEB46CAgAEAgQChAeSgQIQRgASgQIRhgAUO8MWJ8vYOA-aAFwAXgAgAFRiAGaCJIBAjE4mAEAoAEByAEKwAEB&sclient=gws-wiz */}{" "}
                {/* Do you know that Sunday 3pm is the most crowded session at{" "} */}
                {/* {activeCinema.name_en}{" "} */}
              
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
