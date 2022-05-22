import { useState } from "react";
import ChartCinemaRanking from "./ChartCinemaRanking";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import BarChart from "./d3barchart/BarChart";

const CinemaIndex = ({ divClassName, activeCinemaID }) => {
  const [opened, setOpened] = useState(false);

  const toggleDrawer = (state) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setOpened(state);
  };

  console.log(`divClassName = ${divClassName}`);

  return (
    <div>
      <Button onClick={toggleDrawer(true)}>Cinema Index</Button>
      <Drawer
        className={divClassName}
        anchor="right"
        open={opened}
        onClose={toggleDrawer(false)}
      >
        <div>
          {/* <BarChart /> */}
          <ChartCinemaRanking TheatreID={activeCinemaID} />
        </div>
      </Drawer>
    </div>
  );
};

export default CinemaIndex;
