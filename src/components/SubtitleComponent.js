import React from "react";
import ReactDom from "react-dom";
import { createPortal } from "react-dom";
import { useState } from "react";

const SubtitleComponent = ({ open, handleOpen, subtitle }) => {
  const [cnt, setCnt] = useState(0);
  // console.log(`printing subtitle in SubtitleComponent.js`);
  // console.log(subtitle);

  const handleClick = () => {
    setCnt((prevState) => {
      return prevState + 1;
    });
    handleOpen(true);
  };

  return createPortal(
    <span id="chart-seat-plan-button" onClick={handleClick}>View Seatplans</span>,
    subtitle.element
  );
};

export default SubtitleComponent;
