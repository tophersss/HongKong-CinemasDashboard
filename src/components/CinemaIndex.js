import { useState } from "react";
import ChartCinemaRanking from "./charts/ChartCinemaRanking";
import Drawer from "@mui/material/Drawer";
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import ListAltTwoToneIcon from '@mui/icons-material/ListAltTwoTone';


const CinemaIndex = ({
  divClassName,
  activeCinemaID,
  handleActiveCinemaChange,
}) => {
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


  return (
    <>
      <Tooltip arrow title={<Typography variant="subtitle2">Show Cinema Index</Typography>}>
        <ListAltTwoToneIcon style={{cursor: "pointer"}} onClick={toggleDrawer(true)} /> 
      </Tooltip>
      {/* <Button onClick={toggleDrawer(true)}>Cinema Index</Button> */}
      <Drawer
        className={divClassName}
        anchor="right"
        open={opened}
        onClose={toggleDrawer(false)}
      >
        <div>
          {/* <BarChart /> */}
          <ChartCinemaRanking
            TheatreID={activeCinemaID}
            handleActiveCinemaChange={handleActiveCinemaChange}
          />
        </div>
      </Drawer>
    </>
  );
};

export default CinemaIndex;
