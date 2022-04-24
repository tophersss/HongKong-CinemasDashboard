import * as React from "react";
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
import SVG, { Props as SVGProps } from "react-inlinesvg";
import { house_seatplans } from "../data/HouseSeatplans";

// ! - use to create Legends for seatplan frequency chart
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

export default function SeatplanDialog({ houseName }) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        Open Seatplan
      </Button>
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
          Seatplan - {houseName}
        </BootstrapDialogTitle>
        <DialogContent dividers>
          <Typography>Darker = More Popular</Typography>
          <SVG
            src={house_seatplans.filter((d) => d.name === houseName)[0].svg}
          />
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
