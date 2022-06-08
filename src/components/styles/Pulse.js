import { styled } from "@mui/material";
import { keyframes } from "@emotion/react";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

// note: not in use

const Pulse = ({ clickEvent }) => {
  const pulseEffects = keyframes({
    "0%": {
      transform: "scale(0.95)",
      boxShadow: "0 0 0 0 rgba(184, 255, 252, 0.5)",
    },
    "70%": {
      transform: "scale(1)",
      boxShadow: "0 0 0 10px rgba(184, 255, 252, 0)",
    },
    "100%": {
      transform: "scale(0.95)",
      boxShadow: "0 0 0 0 rgba(184, 255, 252, 0)",
    },
  });

  const Pulse = styled(ArrowDropDownIcon)({
    color: "RGBA(255, 165, 165, 0.77)",
    background: "RGBA(184, 255, 252, 0.2)",
    cursor: "pointer",
    borderRadius: "50%",
    margin: 10,
    height: 30,
    width: 30,
    boxShadow: "0 0 0 0 rgba(184, 255, 252, 1)",
    transform: "scale(1)",
    animation: `${pulseEffects} 2s infinite`,
    "&:hover": {
      color: "RGBA(255, 165, 165, 0.77)",
    },
  });

  return <Pulse onClick={clickEvent}></Pulse>;
};

export default Pulse;
