import { useState, useCallback, useEffect } from "react";
import PropTypes from "prop-types";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import SVG, { Props as SVGProps } from "react-inlinesvg";
import SeatplanLoader from "./SeatplanLoader";
import { houses_sales } from "../data/HousesSales";
// import { house_seatplans } from "../data/HouseSeatplans";

// todo: add cinemaID as prop, then create a list of houseNames for dropdown selection
// todo: add dynamic svg import https://stackoverflow.com/questions/61339259/how-to-dynamically-import-svg-and-render-it-inline

// note: use to create Legends for seatplan frequency chart
const level_color_dict = [
  { "freq-range": "0~24%", color: "rgb(228, 247, 212)" },
  { "freq-range": "25~44%", color: "rgb(239, 225, 186)" },
  { "freq-range": "45~59%", color: "rgb(246, 202, 160)" },
  { "freq-range": "60~74%", color: "rgb(250, 179, 135)" },
  { "freq-range": "75~79%", color: "rgb(253, 155, 110)" },
  { "freq-range": "80~84%", color: "rgb(253, 130, 86)" },
  { "freq-range": "85~89%", color: "rgb(251, 103, 62)" },
  { "freq-range": "90~94%", color: "rgb(248, 71, 38)" },
  { "freq-range": "95~100%", color: "rgb(244, 14, 9)" },
];

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogTitle-root": {
    backgroundColor: "#333434",
    color: "#e1e1cf",
  },
  "& .MuiDialogContent-root": {
    backgroundColor: "#6c7070",
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
  "&. MuiIconButton-root": {
    backgroundColor: "#937e7e45",
    color: "#e9e9e9",
  },
}));

const BootstrapDialogTitle = (props) => {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
            backgroundColor: "black",
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
};

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};

export default function SeatplanDialog({
  open,
  handleOpen,
  activeCinemaID,
  activeHouseID,
  handleSetActiveHouseID,
}) {
  // const [open, setOpen] = React.useState(false);
  const [houseList, setHouseList] = useState([]);

  useEffect(() => {
    if (activeHouseID !== null) {
      const list = houses_sales.filter((d) => d.TheatreID === activeCinemaID);
      // const
      setHouseList(list);
    }
  }, [activeHouseID]);

  const handleOnCompleted = useCallback(
    (iconName) => console.log(`${iconName} successfully loaded`),
    []
  );

  const handleIconError = useCallback((err) => console.error(err.message), []);

  const handleClickOpen = () => {
    handleOpen(true);
  };
  const handleClose = () => {
    handleOpen(false);
  };

  const handleDropboxChange = (event) => {
    // setAge(event.target.value);
    handleSetActiveHouseID(event.target.value);
    console.log(`dropdown selection changed: `);
    console.log(event);
  };

  return (
    <div>
      {/* <Button variant="outlined" onClick={handleClickOpen}>
        Open Seatplan
      </Button> */}
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
        fullWidth={true}
        maxWidth="lg"
      >
        <BootstrapDialogTitle
          id="customized-dialog-title"
          onClose={handleClose}
        >
          Seatplan
          {/* Seatplan - {houseName} */}
        </BootstrapDialogTitle>
        <DialogContent dividers>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Houses</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={activeHouseID}
              label="House"
              onChange={handleDropboxChange}
            >
              {houseList.length > 0 ? (
                houseList.map((d) => (
                  <MenuItem value={d.HouseID} name={d.house_name}>
                    {" "}
                    {d.house_name}{" "}
                  </MenuItem>
                ))
              ) : (
                <MenuItem> None </MenuItem>
              )}
            </Select>
          </FormControl>
          <Typography>Darker = More Popular</Typography>
          {activeHouseID === null ? (
            ""
          ) : (
            <SVG
              src={require(`../assets/seatplans/${activeHouseID}.svg`).default}
            />
          )}
          <Grid container alignItems="center" spacing={0}>
            {level_color_dict.map((d) => (
              <Grid
                item
                xs={3}
                sm={2}
                md={1}
                sx={{ display: "flex", margin: "0 10px" }}
              >
                <Typography sx={{ paddingRight: "5px" }}>
                  {d["freq-range"]}
                </Typography>
                <div>
                  <SVG
                    width="25"
                    height="25"
                    src={`<svg><rect width="25" height="25" style="fill:${d.color};stroke:${d.color};stroke-width:5" />Sorry, your browser does not support inline SVG.  </svg>`}
                  />
                </div>
              </Grid>
            ))}
          </Grid>
        </DialogContent>
      </BootstrapDialog>
    </div>
  );
}
