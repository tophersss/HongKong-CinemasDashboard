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
import MoneyIcon from "@mui/icons-material/Money";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import ChartHousesSales from "../components/ChartHousesSales";
import LightbulbIcon from "@mui/icons-material/Lightbulb";
import CinemasGeoInfo from "../data/CinemasGeoInfo.json";
import { cinemas_performance_overview } from "../data/CinemasPerformanceOverview";
import DashboardCard from "./DashboardCard";
import ChartCinemaRanking from "./ChartCinemaRanking";
import ChartCinemasSalesOverHours from "./ChartCinemasSalesOverHours"
import StatCard from "./StatCard";
import { useEffect, useState } from "react";

const GetCinemaStats = (id, type) => {
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
      console.log(`updated cardContent...${activeCinema.TheatreID}`);
    }
    console.log(`done useEffect`);
  }, [activeCinema]);

  // useEffect(() => {
  //   if (activeCinema !== null && activeCinema !== undefined) {
  //     var CinemasStat = cinemas_performance_overview.map((d) => {
  //       if (d.theatre === activeCinema.name) {
  //         return {
  //           header: "STATISTICS",
  //           valueAtCurrentDate: "0",
  //           valueAtPrevDate: "0",
  //           dateUnit: "All Time",
  //         };
  //       }
  //     });
  //   }
  // }, [activeCinema]);

  return (
    <div className="infoPanel-left">
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
        <Autocomplete
          disablePortal
          autoSelect
          id="cinema-value"
          className="cinemaAutoComplete"
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

        {activeCinema === null ? (
          "Search or Click On A Cinema To Show Dashboard"
        ) : (
          <>
            <Grid
              container
              className="StatCard-container"
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
              className="Trivia-container"
              sx={{
                pt: 2,
                alignItems: "center",
                textAlign: "center",
                width: "75%",
                display: "inline-flex",
              }}
            >
              <LightbulbIcon />
              <Typography  className="Trivia-content" color="text.primary" variant="subtitle1">
                {" "}
                Do you know that Sunday 3pm is the most crowded session at{" "}
                {activeCinema.name}{" "}
              </Typography>
            </Box>
            <ChartCinemaRanking TheatreID={activeCinema?.TheatreID} />
            {/* <DashboardCard variant="outlined" content="what">
              {" "}
              Parent Content{" "}
            </DashboardCard> */}
            <ChartCinemasSalesOverHours hoveredTheatre={activeCinema.name}/>


            <ChartHousesSales
              hoveredCinema={activeCinema?.name}
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
