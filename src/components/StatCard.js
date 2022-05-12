import { useCallback, useEffect, useState } from "react";
import {
  Avatar,
  Box,
  Card,
  CardContent,
  Grid,
  Typography,
} from "@mui/material";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import AllInclusiveIcon from '@mui/icons-material/AllInclusive';
import { abbrNum } from "../utils/NumberUtils";
import { CopyAll } from "@mui/icons-material";

const StatCard = ({ cardProps, cardContent, Icon, statType }) => {
  const [displayContent, setDisplayContent] = useState(null);
  const [unitType, setUnitType] = useState("overall");

  const allUnitTypes = {
    0: "overall",
    1: "month",
    2: "week",
  }

  const toggleUnitType = () => {
    setU
  }

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

    switch (unitType) {
      case "overall":
        content = {
          currentValue: cardContent.valueOverall,
          prevValue: -1,
          percentageChange: 0.0,
          unitDisplay: "All time",
        };
        break;
      case "month":
        content = {
          currentValue: cardContent.valueAtCurrentMonth,
          prevValue: cardContent.valueAtPrevMonth,
          percentageChange:
            ((cardContent.valueAtCurrentMonth - cardContent.valueAtPrevMonth) /
              cardContent.valueAtPrevMonth) *
            100.0,
          unitDisplay: "Since last month",
        };
        break;
      case "week":
        content = {
          currentValue: cardContent.valueAtCurrentWeek,
          prevValue: cardContent.valueAtPrevWeek,
          percentageChange:
            ((cardContent.valueAtCurrentWeek - cardContent.valueAtPrevWeek) /
              cardContent.valueAtPrevWeek) *
            100.0,
          unitDisplay: "Since last week",
        };
        break;
      default:
        content = {
          currentValue: cardContent.valueOverall,
          prevValue: -1,
          percentageChange: 0.0,
          unitDisplay: "All time",
        };
        break;
    }

    if ( content.percentageChange > 0 ) {
      textColor = "#69f0ae"
    } else if ( content.percentageChange < 0 ) {
      textColor = "#f44336"
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
  }, [cardContent, unitType]);

  return (
    <Card sx={{ backgroundColor: "white", margin: "15px 10px" }} {...cardProps} onClick={() => {console.log(`card clicked`)}}>
      <CardContent>
        <Grid container spacing={3} sx={{ justifyContent: "space-between" }}>
          <Grid item>
            <Typography color="textSecondary" gutterBottom variant="overline">
              {statType == null ? "loading" : statType}
            </Typography>
            <Typography className="stat-card__primaryvalue" color="textPrimary" variant="h5">
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
              if (unitType === "overall") {
                console.log(`statCard icon render based on unitType: ${unitType}`)
                return <AllInclusiveIcon htmlColor={displayContent?.textColor} /> 
              } 
              else {
                if (displayContent.percentageChange > 0) {
                  return <ArrowUpwardIcon htmlColor={displayContent?.textColor} />
                }
                else if (displayContent.percentageChange < 0) {
                  return <ArrowUpwardIcon htmlColor={displayContent?.textColor} />
                }
                else {
                  return <AllInclusiveIcon htmlColor={displayContent?.textColor} />
                }
              }
              
            }) ()
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
