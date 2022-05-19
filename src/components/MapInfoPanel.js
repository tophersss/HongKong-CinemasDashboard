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
import ChartCinemasSalesOverHours from "./ChartCinemasSalesOverHours";
import StatCard from "./StatCard";
import { PickChainColor } from "../utils/ColorUtils";
import { useEffect, useState } from "react";

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
  const mapInfoPanelClasses = `info-panel info-panel--${
    PickChainColor(activeCinema?.chain).color
  }`;

  // ! - Control Seatplan dialog open state
  const [isSeatplanOpen, setIsSeatplanOpen] = useState(false);

  return (
    <div className={mapInfoPanelClasses}>
      <Paper
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
          <button
            onClick={() => {
              console.log(`activeHouseID: ${activeHouseID}`);
            }}
          >
            {" "}
            show activeHouse{" "}
          </button>
          <AppBar position="static" className="palette-header">
            <Toolbar>
              <CinemaIndex activeCinemaID={activeCinema?.TheatreID} />
              <Autocomplete
                disablePortal
                autoSelect
                id="cinema-value"
                className="cinema-auto-complete"
                options={cinemaNames}
                renderInput={(params) => (
                  <div ref={params.InputProps.ref}>
                    <Input
                      type="text"
                      multiline={false}
                      placeholder="🔎 cinema"
                      {...params.inputProps}
                    ></Input>
                  </div>
                )}
                sx={{ paddingTop: "10px" }}
                value={activeCinema === null ? null : activeCinema.name}
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
              <LightbulbIcon />
              <Typography
                className="trivia__content"
                color="text.primary"
                variant="subtitle1"
              >
                {/* todo: https://www.google.com/search?q=infinite+scrolling+horizontal+text+codepen&sxsrf=ALiCzsYhY7ffnc-oXQ_rhCLF1boExoI2_Q%3A1652685130677&ei=SvmBYvH6KIqa0ASvhZX4Ag&oq=text+infinite+scro&gs_lcp=Cgdnd3Mtd2l6EAMYATIGCAAQCBAeMgYIABAIEB4yBggAEAgQHjIGCAAQCBAeMgYIABAIEB4yBggAEAgQHjIGCAAQCBAeMgYIABAIEB4yBggAEAgQHjIGCAAQCBAeOgcIABBHELADOgYIIxAnEBM6BAgjECc6CwgAEIAEELEDEIMBOgQIABBDOhEILhCABBCxAxCDARDHARDRAzoUCC4QgAQQsQMQgwEQxwEQ0QMQ1AI6EQguEIAEELEDEIMBEMcBEKMCOgUIABCABDoICAAQgAQQsQM6CggAELEDEIMBEEM6CAguEIAEELEDOgUIABDLAToECAAQHjoGCAAQChAeOgoIABAPEAUQChAeOgYIABAFEB46CAgAEAgQChAeSgQIQRgASgQIRhgAUO8MWJ8vYOA-aAFwAXgAgAFRiAGaCJIBAjE4mAEAoAEByAEKwAEB&sclient=gws-wiz */}{" "}
                Do you know that Sunday 3pm is the most crowded session at{" "}
                {activeCinema.name}{" "}
              </Typography>
            </Box>

            <ChartCinemasSalesOverHours
              activeCinemaID={activeCinema.TheatreID}
            />

            <ChartHousesSales
              activeCinemaName={activeCinema?.name}
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
