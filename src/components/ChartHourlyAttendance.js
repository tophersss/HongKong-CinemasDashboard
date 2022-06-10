import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { useState, useEffect } from "react";
import { groupBy } from "../utils/ArrayUtils";
import { commaSeparator } from "../utils/NumberUtils";
import { cinemas_sales_over_hours } from "../data/CinemasSalesOverHours";
import '../highcharts_custom.css'

const ChartHourlyAttendance = ({ activeCinemaID }) => {
  const theatreGroups = groupBy(cinemas_sales_over_hours, "theatreID");

  useEffect(() => {
    if (activeCinemaID !== null) {
      updateSeries();
    }
  }, [activeCinemaID]);

  const [chartOptions, setChartOptions] = useState({
    chart: {
      animation: { duration: 200 },
      height: 210,
      spacingTop: 20,
      // spacingBottom: 10,
      styledMode: true,
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
      text: "Tickets sold per hour",
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
      if (groupName == activeCinemaID) {
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
    tooltip: {
      useHTML: true,
      backgroundColor: {
        linearGradient: [0, 0, 0, 60],
        stops: [
          [0, "#FFFFFF"],
          [1, "#E0E0E0"],
        ],
      },
      style: {
        color: "#f8f8ff",
      },
      formatter: function () {
        const sumTicketsSold = this.series.data.reduce((sum, d) => sum + +d.y, 0);
        
        return (
          `<table><tr><th colspan="2"><h3>${this.point.category}</h3></th></tr>` +
          `<tr><th>Tickets Sold:</th><td> ${
            // note: refer to the note in "updateSeries() setChartOption => series.data" section
            sumTicketsSold === 0
              ? "Unknown"
              : `${commaSeparator(this.point.y)}`
          }</td></tr>` +
          `</table>`
        );
      },
    },
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
    // const filteredTheatreObj = theatreGroups.filter((g) => g == activeCinemaID);
    const activeCinemaObj = Object.keys(theatreGroups).map((groupName) => {
      if (groupName == activeCinemaID) {
        return {
          type: "area",
          name: groupName,
          data: theatreGroups[groupName].map((groupData) => {
            return [groupData.label, groupData.ticket_sold];
          }),
        };
      }
    });

    setChartOptions((prevState) => ({
      // ...prevState,
      // title: {
      //   text: `Popularity By Hours`,
      // },
      // series: [...matchingSteps.map((step_obj) => step_obj.series_obj)],
      series: {
        type: "area",
        name: theatreGroups[activeCinemaID].theatre,
        // name: "hahaha",
        data: theatreGroups[activeCinemaID].map((groupData) => {
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
        containerProps={{ className: "info-panel__chart chart-hourly-attendance" }}
      />
    </>
  );
};

export default ChartHourlyAttendance;
