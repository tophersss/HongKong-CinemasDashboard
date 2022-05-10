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
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import ChartHousesSales from "../components/ChartHousesSales";
import MoneyIcon from "@mui/icons-material/Money";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import LightbulbIcon from "@mui/icons-material/Lightbulb";
import MyLocationRoundedIcon from "@mui/icons-material/MyLocationRounded";
import DirectionsSubwayTwoToneIcon from "@mui/icons-material/DirectionsSubwayTwoTone";
import CinemasGeoInfo from "../data/CinemasGeoInfo.json";
import { cinemas_performance_overview } from "../data/CinemasPerformanceOverview";
import ChartCinemaRanking from "./ChartCinemaRanking";
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
      console.log(`found sales...`);
      return {
        header: type.toUpperCase(),
        valueOverall: cinemaStatsObj.OverallSales,
        valueAtCurrentMonth: cinemaStatsObj.CurrentMonthSales,
        valueAtCurrentWeek: cinemaStatsObj.CurrentWeekSales,
        valueAtPrevMonth: cinemaStatsObj.PrevMonthSales,
        valueAtPrevWeek: cinemaStatsObj.PrevWeekSales,
      };
    case "tickets_sold":
      console.log(`found tickets sold...`);
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
  activeHouse,
  setActiveHouse,
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
  const mapInfoPanelClasses = `info-panel info-panel--${PickChainColor(
    activeCinema?.chain
  ).color}`;

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
                  unitType="overall"
                  statType="SALES"
                ></StatCard>
              </Grid>
              <Grid item xs>
                <StatCard
                  cardProps={{ variant: "outlined", raised: true }}
                  cardContent={cardContentTicketsSold}
                  Icon={MoneyIcon}
                  unitType="overall"
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
                {" "}
                Do you know that Sunday 3pm is the most crowded session at{" "}
                {activeCinema.name}{" "}
              </Typography>
            </Box>
            <ChartCinemaRanking
              TheatreID={activeCinema?.TheatreID}
            />
            {/* <DashboardCard variant="outlined" content="what">
              {" "}
              Parent Content{" "}
            </DashboardCard> */}
            <ChartCinemasSalesOverHours
              hoveredTheatre={activeCinema.name}
            />

            <ChartHousesSales
              hoveredCinema={activeCinema?.name}
              associatedChain={activeCinema?.chain}
              activeHouse={activeHouse}
              setActiveHouse={setActiveHouse}
            />
          </>
        )}
      </Paper>
    </div>
  );
};

export default MapInfoPanel;
