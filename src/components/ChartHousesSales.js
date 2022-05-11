import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { useState, useEffect, useRef } from "react";
import { houses_sales } from "../data/HousesSales";
import addTreemapModule from "highcharts/modules/treemap";
import HighchartsHeatmap from "highcharts/modules/heatmap";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { PickChainColor } from "../utils/ColorUtils";
import TableHouseDetails from "./TableHouseDetails";
addTreemapModule(Highcharts);
HighchartsHeatmap(Highcharts);

const ChartHousesSales = ({ hoveredCinema, associatedChain, activeHouse, setActiveHouse }) => {
  const groupBy = (arr, key) => {
    const initialValue = {};
    return arr.reduce((acc, cval) => {
      const myAttribute = cval[key];
      acc[myAttribute] = [...(acc[myAttribute] || []), cval];
      return acc;
    }, initialValue);
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
      height: 300,
      // width: "100%",
      events: {
        load() {
          setTimeout(this.reflow.bind(this), 0);
        },
      },
      // styledMode: true,
    },
    title: {
      text: `Most Profittable Houses`,
    },
    subtitle: {
      text: "Click Rectangle To Show House Details",
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
            textOverflow: 'clip'
          }
        }
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
    }));
  };

  return (
    <div>
      <HighchartsReact
        highcharts={Highcharts}
        options={chartOptions}
        containerProps={{ className: "info-panel__chart" }}
      />
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
