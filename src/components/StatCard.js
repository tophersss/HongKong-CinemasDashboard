import { useCallback, useEffect, useState } from "react";
import {
  Avatar,
  Box,
  Card,
  CardContent,
  Grid,
  Typography,
  Tooltip,
} from "@mui/material";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import AllInclusiveIcon from "@mui/icons-material/AllInclusive";
import { abbrNum, percIncrease } from "../utils/NumberUtils";
import { CopyAll } from "@mui/icons-material";

const StatCard = ({ cardProps, cardContent, Icon, statType }) => {
  const [displayContent, setDisplayContent] = useState(null);
  const [unitTypeID, setUnitTypeID] = useState(0);

  const allUnitTypes = {
    0: "overall",
    1: "month",
    2: "week",
  };

  const toggleUnitType = () => {
    setUnitTypeID((prevState) =>
      prevState + 1 > Object.keys(allUnitTypes).length - 1 ? 0 : prevState + 1
    );
    console.log(`unitType: ${unitTypeID} - ${allUnitTypes[unitTypeID]}`);
  };

  useEffect(() => {
    var content = {};
    var textColor = "";

    // console.log(
    //   "================================================================================================="
    // );
    // console.log(`printing cardContent:`);
    // console.log(cardContent);
    // console.log(
    //   "=================================================================================================="
    // );

    if (!cardContent) {
      return;
    }

    switch (allUnitTypes[unitTypeID]) {
      case "overall":
        content = {
          currentValue: cardContent.valueOverall,
          prevValue: -1,
          percentageChange: 0,
          unitDisplay: "All time",
          tooltipDisplayHeader: `Displaying ${statType.toLowerCase()} of all time.`,
        };
        break;
      case "month":
        content = {
          currentValue: cardContent.valueAtCurrentMonth,
          prevValue: cardContent.valueAtPrevMonth,
          percentageChange: percIncrease(
            cardContent.valueAtPrevMonth,
            cardContent.valueAtCurrentMonth
          ),
          unitDisplay: "Since last month",
          tooltipDisplayHeader: `Displaying ${statType.toLowerCase()} in this month.`,
        };
        break;
      case "week":
        console.log(
          `valueAtCurrentWeek - valueAtPrevWeek: ${cardContent.valueAtCurrentWeek} - ${cardContent.valueAtPrevWeek}`
        );
        console.log(
          `final result: ${
            ((cardContent.valueAtCurrentWeek - cardContent.valueAtPrevWeek) /
              cardContent.valueAtPrevWeek) *
            100.0
          }`
        );
        content = {
          currentValue: cardContent.valueAtCurrentWeek,
          prevValue: cardContent.valueAtPrevWeek,
          percentageChange: percIncrease(
            cardContent.valueAtPrevWeek,
            cardContent.valueAtCurrentWeek
          ),
          unitDisplay: "Since last week",
          tooltipDisplayHeader: `Displaying ${statType.toLowerCase()} in this week.`,
        };
        break;
      default:
        content = {
          currentValue: cardContent.valueOverall,
          prevValue: -1,
          percentageChange: 0,
          unitDisplay: "All time",
          tooltipDisplayHeader: `Displaying ${statType.toLowerCase()} of all time.`,
        };
        break;
    }

    if (content.percentageChange > 0) {
      textColor = "#30b362";
    } else if (content.percentageChange < 0) {
      textColor = "#f44336";
    } else {
      textColor = "#090845";
      textColor = "#d19d49";
    }

    content.textColor = textColor;

    setDisplayContent(content);
    // console.log(
    //   "================================================================================================="
    // );
    // console.log(`printing content for StatCard:`);
    // console.log(content);
    // console.log(
    //   "=================================================================================================="
    // );
  }, [cardContent, unitTypeID]);

  return (
    <Tooltip
      title={
        <>
          <Typography variant="subtitle2">
            {displayContent?.tooltipDisplayHeader}
          </Typography>
          Click to toggle.
        </>
      }
      enterDelay={100}
      enterNextDelay={100}
      leaveDelay={300}
      arrow
      followCursor={false}
    >
      <Card
        sx={{
          backgroundColor: "white",
          margin: "15px 10px",
          cursor: "pointer",
        }}
        {...cardProps}
        onClick={toggleUnitType}
      >
        <CardContent>
          <Grid container spacing={2} sx={{ justifyContent: "space-between" }}>
            <Grid item>
              <Typography color="textSecondary" gutterBottom variant="overline">
                {statType == null ? "loading" : statType}
              </Typography>
              <Typography
                className="stat-card__primaryvalue"
                color="textPrimary"
                variant="h5"
              >
                {displayContent == null
                  ? "loading"
                  : abbrNum(displayContent.currentValue, 1)}
              </Typography>
            </Grid>
            <Grid item>
              <Avatar
                sx={{
                  backgroundColor: "error.main",
                  height: 45,
                  width: 45,
                }}
              >
                <Icon />
              </Avatar>
            </Grid>
          </Grid>
          <Box
            sx={{
              pt: 2,
              display: "flex",
              alignItems: "center",
            }}
          >
            {
              (() => {
                if (allUnitTypes[unitTypeID] === "overall") {
                  console.log(
                    `statCard icon render based on unitType: ${allUnitTypes[unitTypeID]}`
                  );
                  return (
                    <AllInclusiveIcon htmlColor={displayContent?.textColor} />
                  );
                } else {
                  if (displayContent?.percentageChange > 0) {
                    return (
                      <ArrowUpwardIcon htmlColor={displayContent?.textColor} />
                    );
                  } else if (displayContent?.percentageChange < 0) {
                    return (
                      <ArrowDownwardIcon
                        htmlColor={displayContent?.textColor}
                      />
                    );
                  } else {
                    return (
                      <AllInclusiveIcon htmlColor={displayContent?.textColor} />
                    );
                  }
                }
              })()
              // unitType === "overall" ?
              //   <ArrowDownwardIcon color="error" /> :
              //   <ArrowUpwardIcon color="error" />
            }
            <Typography>&nbsp;</Typography>
            <Typography
              // htmlColor={displayContent.textColor}
              sx={{
                mr: 1,
                color: `${displayContent?.textColor}`,
              }}
              variant="body2"
            >
              {displayContent == null
                ? "loading"
                : displayContent.percentageChange}
              %
            </Typography>

            <Typography color="textSecondary" variant="caption">
              {displayContent == null ? "loading" : displayContent.unitDisplay}
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </Tooltip>
  );
};

StatCard.defaultProps = {
  cardContent: {
    header: "STATISTICS",
    valueOverall: 0,
    valueAtCurrentDay: 0,
    valueAtPrevDay: 0,
    valueAtCurrentMonth: 0,
    valueAtPrevMonth: 0,
    valueAtCurrentYear: 0,
    valueAtPrevYear: 0,
    dateUnit: "All Time",
  },
};

export default StatCard;
