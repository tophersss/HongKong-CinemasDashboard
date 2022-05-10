import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { useState, useEffect, useRef } from "react";
import { PickChainColor } from "../utils/ColorUtils";
import { cinemas_sales_over_hours } from "../data/CinemasSalesOverHours";
import '../highcharts_custom.css'

const ChartCinemasSalesOverHours = ({ hoveredTheatre }) => {
  const groupBy = (arr, key) => {
    const initialValue = {};
    return arr.reduce((acc, cval) => {
      const myAttribute = cval[key];
      acc[myAttribute] = [...(acc[myAttribute] || []), cval];
      return acc;
    }, initialValue);
  };
  // const groupBy = (x, f) => {
  //   return x.reduce((a, b) => ((a[f(b)] ||= []).push(b), a), {});
  // };
  const theatreGroups = groupBy(cinemas_sales_over_hours, "theatre");
  const isMounted = useRef(false);
  useEffect(() => {
    // if (isMounted.current) {
    //   // updateSeries();
    //   console.log(`usedEffect step`);
    // } else {
    //   isMounted.current = true;
    //   const groupBy = (x, f) => {
    //     return x.reduce((a, b) => ((a[f(b)] ||= []).push(b), a), {});
    //   };
    //   const theatreGroups = groupBy(cinemas_sales_over_hours, (v) => v.name);
    // }
  }, []);

  useEffect(() => {
    if (hoveredTheatre !== null) {
      updateSeries();
    }
  }, [hoveredTheatre]);

  const [chartOptions, setChartOptions] = useState({
    chart: {
      animation: { duration: 200 },
      height: 210,
      spacingTop: 20,
      // spacingBottom: 10,
      styledMode: true,
      // backgroundColor: 'gold',
    },
    title: {
      text: `Hourly Attendance`,
      align: "left",
      style: {
        fontSize: "1.05rem",
      },
      x: 10,
      margin: 0,
    },
    subtitle: {
      text: "Tickets Sold per Hour",
      align: "right",
      y: 10,
      margin: 0,
    },
    credits: {
      verticalAlign: "top",
    },
    legend: {
      enabled: false,
    },
    xAxis: {
      categories: [
        "08:00",
        "09:00",
        "10:00",
        "11:00",
        "12:00",
        "13:00",
        "14:00",
        "15:00",
        "16:00",
        "17:00",
        "18:00",
        "19:00",
        "20:00",
        "21:00",
        "22:00",
        "23:00",
        "24:00",
        "01:00",
      ],
      labels: {
        style: {
          fontSize: "0.65rem",
        },
      },
    },
    yAxis: {
      title: {
        enabled: false,
      },
      labels: {
        format: "{value}",
        style: {
          color: Highcharts.getOptions().colors[1],
          fontSize: "0.65rem",
        },
      },
      tickAmount: 5,
    },
    series: Object.keys(theatreGroups).map((groupName) => {
      if (groupName == hoveredTheatre) {
        return {
          type: "area",
          name: groupName,
          data: theatreGroups[groupName].map((groupData) => {
            return [groupData.label, groupData.ticket_sold];
          }),
          // marker: {
          //   fillColor: "gold",
          // },
        };
      }
      {
        return {};
      }
    }),
    plotOptions: {
      series: {
        animation: { duration: 3000 },
        connectNulls: true,
        // color: "gold",
        className: `palette-primary`,

        marker: {
          enabled: false,
          // fillColor: "{series.color}",
        },
      },
    },
    // https://jsfiddle.net/gh/get/library/pure/highcharts/highcharts/tree/master/samples/highcharts/plotoptions/area-fillcolor-gradient/
    defs: {
      gradient0: {
        tagName: "linearGradient",
        id: "gradient-0",
        class: `palette-primary`,
        x1: 0,
        y1: 0,
        x2: 0,
        y2: 1,
        children: [
          {
            tagName: "stop",
            offset: 0,
          },
          {
            tagName: "stop",
            offset: 1,
          },
        ],
      },
      gradient1: {
        tagName: "linearGradient",
        id: "gradient-end",
        x1: 0,
        y1: 0,
        x2: 0,
        y2: 1,
        children: [
          {
            tagName: "stop",
            offset: 0,
          },
          {
            tagName: "stop",
            offset: 1,
          },
        ],
      },
    },
  });

  const updateSeries = () => {
    // console.log(`useEffect triggered updateSeries()`);
    // console.log(theatreGroups);
    // const filteredTheatreObj = theatreGroups.filter((g) => g == hoveredTheatre);
    const hoveredTheatreObj = Object.keys(theatreGroups).map((groupName) => {
      if (groupName == hoveredTheatre) {
        return {
          type: "area",
          name: groupName,
          data: theatreGroups[groupName].map((groupData) => {
            return [groupData.label, groupData.ticket_sold];
          }),
        };
      }
    });
    // console.log(`filteredGroup:`);
    // console.log(theatreGroups[hoveredTheatre]);

    setChartOptions((prevState) => ({
      // ...prevState,
      // title: {
      //   text: `Popularity By Hours`,
      // },
      // series: [...matchingSteps.map((step_obj) => step_obj.series_obj)],
      series: {
        type: "area",
        name: hoveredTheatre,
        data: theatreGroups[hoveredTheatre].map((groupData) => {
          return [groupData.label, groupData.ticket_sold];
        }),
        // marker: {
        //   fillColor: "gold",
        // },
      },
      plotOptions: {
        series: {
          ...prevState.plotOptions.series,
          className: `palette-primary`,
        },
      },
    }));
  };

  return (
    <>
      <HighchartsReact
        highcharts={Highcharts}
        options={chartOptions}
        containerProps={{ className: "info-panel__chart" }}
      />
    </>
  );
};

export default ChartCinemasSalesOverHours;
