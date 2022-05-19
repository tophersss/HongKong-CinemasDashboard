import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { useState, useEffect, useRef } from "react";

// todo: add houseID to HouseSales.js
import { houses_sales } from "../data/HousesSales";
import addTreemapModule from "highcharts/modules/treemap";
import HighchartsHeatmap from "highcharts/modules/heatmap";
import { groupBy } from "../utils/ArrayUtils";
import { PickChainColor } from "../utils/ColorUtils";
import { commaSeparator } from "../utils/NumberUtils";
import TableHouseDetails from "./TableHouseDetails";

import SubtitleComponent from "./SubtitleComponent";
import { set } from "lodash";

addTreemapModule(Highcharts);
HighchartsHeatmap(Highcharts);

const ChartHousesSales = ({
  activeCinemaName,
  associatedChain,
  activeHouseID,
  handleSetActiveHouseID,
  open,
  handleOpen,
}) => {
  const [chartElement, setChartElement] = useState(null);

  var theatreGroups = {};
  const isMounted = useRef(false);
  if (isMounted.current) {
  }
  {
    console.log(`isMounted.current: ${isMounted.current}`);
    theatreGroups = groupBy(houses_sales, "theatre");
    isMounted.current = true;
    console.log(`isMounted.current: ${isMounted.current}`);
  }

  const afterChartCreated = (chartCallback) => {
    setChartElement(chartCallback);
    // console.log(chartCallback);
  };

  const [activeHouseName, setActiveHouseName] = useState(null);

  function createHouseData(id) {
    var houseDetails = theatreGroups[activeCinemaName].filter(
      (d) => d.HouseID === id
    )[0];

    console.log(
      `Object.key(houseDetails).length: ${Object.keys(houseDetails).length}`
    );
    console.log(houseDetails);
    return houseDetails;
  }

  useEffect(() => {
    if (activeCinemaName !== null) {
      updateSeries();

      // note: assign the first house of a cinema to be activeHouse
      console.log(`assigning houseID in ChartHouseSales`);
      if (Object.keys(theatreGroups[activeCinemaName]).length > 0) {
        const activeCinemaObj = theatreGroups[activeCinemaName][0];
        handleSetActiveHouseID(activeCinemaObj.HouseID);
        setActiveHouseName(activeCinemaObj.house_name);
      }

      // setClickedHouse(null);
    }
  }, [activeCinemaName]);

  useEffect(() => {
    if (activeHouseID !== null) {
      console.log(`activeHouseID: ${activeHouseID}`);
      console.log(`activeCinemaName: ${activeCinemaName}`);
      const name = theatreGroups[activeCinemaName].filter(
        (d) => d.HouseID === activeHouseID
      )[0].house_name;
      setActiveHouseName(name);
    }
  }, [activeHouseID]);

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
      // text: '',
      align: "left",
      style: {
        fontSize: "1.15rem",
      },
      x: 10,
      margin: 0,
      useHTML: true,
    },
    subtitle: {
      text: "",
      align: "right",
      y: 10,
      margin: 0,
      useHTML: true,
      style: {
        // note: refer to App.css
      },
    },
    colorAxis: {
      minColor: "#FFFFFF",
      maxColor: "#da2089",
      labels: {
        rotation: -45,
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
      plotOptions: {
        treemap: {
          events: {
            click: (e) => {
              // const targetName = e.point.name;
              console.log(e);
              console.log(`clicked houseID = ${e.point.options.id}`);
              handleSetActiveHouseID(e.point.options.id);
            },
          },
        },
      },
      series: {
        type: "treemap",
        layoutAlgorithm: "squarified",
        data: theatreGroups[activeCinemaName].map((groupData, idx) => {
          return {
            name: groupData.house_name,
            // note: if house sale is 0, point.value will be set to 1 to make the houses present in chart. In reality, house sale is unknown.
            value: groupData.profit === 0 ? 1 : groupData.profit,
            colorValue: groupData.profit === 0 ? 1 : groupData.profit,
            id: groupData.HouseID,
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
          rotation: -30,
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
          console.log(`printing this.point`);
          console.log(this.point);
          const houseData = createHouseData(this.point.id);
          return (
            `<table><tr><th colspan="2"><h3>${this.point.name}</h3></th></tr>` +
            `<tr><th>Sales:</th><td> ${
              // note: refer to the note in "updateSeries() setChartOption => series.data" section
              this.point.value === 1
                ? "Unknown"
                : `HK$${commaSeparator(this.point.value)}`
            }</td></tr>` +
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
        callback={afterChartCreated.bind(this)}
      />
      {chartElement ? (
        <SubtitleComponent
          open={open}
          handleOpen={handleOpen}
          subtitle={chartElement.subtitle}
        />
      ) : (
        ""
      )}
      {/* <TableHouseDetails /> */}
      {activeHouseName == null ? "" : <h4>{activeHouseName}</h4>}
      {/* {activeHouseName !== null ? (
        <TableHouseDetails houseDetailsObj={createHouseData(activeHouseName)} />
      ) : (
        ""
      )} */}
    </div>
  );
};

export default ChartHousesSales;
