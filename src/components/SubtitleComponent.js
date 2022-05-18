import React from "react";
import ReactDom from "react-dom";
import { createPortal } from "react-dom";
import { useState } from "react";

// todo: Highcharts portal question https://github.com/highcharts/highcharts-react/issues/236
// todo: Highcharts portal example https://codesandbox.io/s/highcharts-react-demo-v22pd?file=/TitleComponent.jsx
// todo: React portal https://www.youtube.com/watch?v=LyLa7dU5tp8

const SubtitleComponent = ({ open, handleOpen, subtitle }) => {
  const [cnt, setCnt] = useState(0);
  // console.log(`printing subtitle in SubtitleComponent.js`);
  // console.log(subtitle);

  const handleClick = () => {
    setCnt(prevState => {return prevState + 1});
    handleOpen(true);
  }

  return createPortal(
    <span onClick={handleClick}>
      View Seatplans
    </span>,
    subtitle.element
  );
};

export default SubtitleComponent;
