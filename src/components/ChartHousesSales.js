import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { useState, useEffect, useRef } from "react";

import { houses_sales } from "../data/HousesSales";
import addTreemapModule from "highcharts/modules/treemap";
import HighchartsHeatmap from "highcharts/modules/heatmap";
import { PickChainColor } from "../utils/ColorUtils";
import { commaSeparator } from "../utils/NumberUtils";
import TableHouseDetails from "./TableHouseDetails";

import SubtitleComponent from "./SubtitleComponent";

addTreemapModule(Highcharts);
HighchartsHeatmap(Highcharts);

// todo: replace Highcharts subtitle with React element: https://github.com/highcharts/highcharts-react/issues/236

const ChartHousesSales = ({
  hoveredCinema,
  associatedChain,
  activeHouse,
  setActiveHouse,
}) => {
  const groupBy = (arr, key) => {
    const initialValue = {};
    return arr.reduce((acc, cval) => {
      const myAttribute = cval[key];
      acc[myAttribute] = [...(acc[myAttribute] || []), cval];
      return acc;
    }, initialValue);
  };

  const [chart, setChart] = useState(null);
  const afterChartCreated = (chartElement) => {
    console.log(`afterChartCreated started`);
    setChart(chartElement);
    console.log(`printing chart`);
    console.log(chartElement);
  };

  const theatreGroups = groupBy(houses_sales, "theatre");

  function createHouseData(house_name) {
    var houseDetails = theatreGroups[hoveredCinema].filter(
      (d) => d.house_name === house_name
    )[0];
    return houseDetails;
  }

  useEffect(() => {
    if (hoveredCinema !== null) {
      updateSeries();
      // setClickedHouse(null);
    }
  }, [hoveredCinema]);

  const [chartOptions, setChartOptions] = useState({
    chart: {
      animation: { duration: 200 },
      height: 285,
      // width: "100%",
      spacingTop: 20,
      events: {
        load() {
          setTimeout(this.reflow.bind(this), 0);
        },
      },
      // styledMode: true,
    },
    title: {
      text: `Houses`,
      align: "left",
      style: {
        fontSize: "1.15rem",
      },
      x: 10,
      margin: 0,
    },
    subtitle: {
      text: "Ordered by sales",
      align: "right",
      y: 10,
      margin: 0,
      useHTML: true,
      style: {
        backgroundColor: "darkslategray",
        color: "whitesmoke",
        borderRadius: "5px",
        padding: "4px",
        cursor: "pointer",
      },
    },
    colorAxis: {
      minColor: "#FFFFFF",
      maxColor: "#da2089",
      labels: {
        rotation: 30,
        // step: 1,
        // format: "{value:.1f}",
      },
    },
    series: [],
    plotOptions: {
      treemap: {
        events: {
          click: (e) => {},
        },
      },
    },
    // tooltip: {
    //   backgroundColor: {
    //     linearGradient: [0, 0, 0, 60],
    //     stops: [
    //         [0, '#FFFFFF'],
    //         [1, '#E0E0E0']
    //     ]
    //   },
    //   borderRadius: 4,
    //   style: {
    //     color: "#fff",
    //   },
    //   formatter: function () {
    //     console.log(this.series)
    //     console.log(this.point)
    //     const houseData = createHouseData(this.point.name);
    //     return 'The value for <b>' + this.point.name +
    //         '</b> is <b>' + this.point.value + '</b>' +
    //         '<br/> Average Ticket Price is $' + houseData.avg_price;
    //   }
    // },
  });

  const updateSeries = () => {
    setChartOptions((prevState) => ({
      ...prevState,
      // series: [...matchingSteps.map((step_obj) => step_obj.series_obj)],
      plotOptions: {
        treemap: {
          events: {
            click: (e) => {
              const targetName = e.point.name;
              setActiveHouse(targetName);
            },
          },
        },
      },
      series: {
        type: "treemap",
        layoutAlgorithm: "squarified",
        data: theatreGroups[hoveredCinema].map((groupData) => {
          return {
            name: groupData.house_name,
            value: groupData.profit,
            colorValue: groupData.profit,
          };
        }),
        dataLabels: {
          enabled: true,
          style: {
            textOverflow: "clip",
          },
        },
        // className: "palette-primary",
      },
      colorAxis: {
        minColor: "#FFFFFF",
        maxColor: PickChainColor(associatedChain).code,
        labels: {
          rotation: 30,
          // step: 1,
          // format: "{value:.1f}",
        },
      },
      tooltip: {
        backgroundColor: {
          linearGradient: [0, 0, 0, 60],
          stops: [
            [0, "#FFFFFF"],
            [1, "#E0E0E0"],
          ],
        },
        borderRadius: 4,
        style: {
          color: "#fff",
        },
        useHTML: true,
        headerFormat: "<table>",
        formatter: function () {
          const houseData = createHouseData(this.point.name);
          return (
            `<table><tr><th colspan="2"><h3>${this.point.name}</h3></th></tr>` +
            `<tr><th>Sales:</th><td> HK$${commaSeparator(
              this.point.value
            )}</td></tr>` +
            `<tr><th>Number of Tickets Sold:</th><td> ${
              houseData.ticket_sold === "undefined" ||
              houseData.ticket_sold === 0
                ? "Unknown"
                : `${commaSeparator(houseData.ticket_sold)}`
            }</td></tr>` +
            `<tr><th>Average Ticket Price:</th><td> ${
              houseData.avg_price === "undefined" || houseData.avg_price === 0
                ? "Unknown"
                : `HK$${Math.round(houseData.avg_price)}`
            }</td></tr>` +
            `<tr><th>Capacity:</th><td> ${
              houseData.capacity === "undefined" || houseData.capacity === 0
                ? "Unknown"
                : `${houseData.capacity}`
            }</td></tr>`
          );
        },
      },
    }));
  };

  return (
    <div>
      <HighchartsReact
        highcharts={Highcharts}
        containerProps={{ className: "info-panel__chart" }}
        options={chartOptions}
        callback={afterChartCreated}
      />
      {chart !== null ?? <SubtitleComponent subtitle={chart.title} />}
      {/* <button onClick={printhoveredCinema}> Show Hovered Theatre </button> */}
      {/* <TableHouseDetails /> */}
      {activeHouse == null ? "" : <h4>{activeHouse}</h4>}
      {activeHouse !== null ? (
        <TableHouseDetails houseDetailsObj={createHouseData(activeHouse)} />
      ) : (
        ""
      )}
    </div>
  );
};

export default ChartHousesSales;
