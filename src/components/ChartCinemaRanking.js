// import Highcharts from "highcharts";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import CustomEvents from "highcharts-custom-events";
import { useState, useEffect, useRef } from "react";
import { cinemas_performance_overview } from "../data/CinemasPerformanceOverview";
import { abbrNum, commaSeparator } from "../utils/NumberUtils";
import { PickChainColor } from "../utils/ColorUtils";

CustomEvents(Highcharts);

const ChartCinemaRanking = ({ TheatreID, handleActiveCinemaChange }) => {
  const GetTopCinemas = (TheatreID, topN) => {
    /**
     * when activeCinema already in topN, do nothing
     * when activeCinema > topN (i.e. not in topN), remove last item from topN, append activeCinema
     */
    var topCinemas = cinemas_performance_overview
      .sort(
        (a, b) =>
          parseFloat(b.OverallTicketsSold) - parseFloat(a.OverallTicketsSold)
      )
      .slice(0, topN);
    const activeCinemaStatsObj = cinemas_performance_overview.filter(
      (d) => d.TheatreID === TheatreID
    )[0];

    // ! - check if activeCinema already in topN list
    const IsCinemaInArray = topCinemas.some((element) => {
      if (element.TheatreID === activeCinemaStatsObj.TheatreID) {
        return true;
      }
      return false;
    });

    if (!IsCinemaInArray) {
      topCinemas.pop();
      topCinemas.push(activeCinemaStatsObj);
    }

    return topCinemas;
  };

  const GetCinemas = () => {
    /**
     * when activeCinema already in topN, do nothing
     * when activeCinema > topN (i.e. not in topN), remove last item from topN, append activeCinema
     */
    var topCinemas = cinemas_performance_overview
      .sort(
        (a, b) =>
          parseFloat(b.OverallTicketsSold ?? 0) - parseFloat(a.OverallTicketsSold ?? 0)
      );

    return topCinemas;
  };


  const [chartOptions, setChartOptions] = useState({
    chart: {
      height: 1500,
      spacingTop: 20,
      type: "bar",
      // scrollablePlotArea: {
      //   minHeight: 8000,
      // },
    },
    title: {
      text: `CINEMA INDEX`,
      align: "left",
      style: {
        fontSize: "1.05rem",
      },
      x: 10,
      margin: 5,
    },
    subtitle: {
      text: "Tickets Sold (k)",
      align: "right",
      y: 10,
      margin: 0,
    },
    legend: {
      enabled: false,
    },
    xAxis: {
      categories: [],
      className: "palette-secondary xaxis-labels",
      labels: {
        style: {
          fontSize: "0.75rem",
        },
        useHTML: true,
        events: {
          click: (e) => {
            console.log(`xaxis label clicked`);
            // console.log(e);
            console.log(e.srcElement.innerHTML);
            handleActiveCinemaChange(e.srcElement.innerHTML);
          },
        },
      },
      gridLineWidth: 0,
      // scrollbar: {
      //   enabled: true
      // },
    },
    yAxis: [
      {
        title: {
          // text: "Number of Tickets Sold (in thousands)",
          enabled: false,
        },
        labels: {
          formatter: function () {
            var label = this.axis.defaultLabelFormatter.call(this);
            return abbrNum(parseFloat(label), 0);
          },
          style: {
            color: Highcharts.getOptions().colors[1],
          },
        },
        gridLineWidth: 1,
        lineWidth: 0,
        tickAmount: 2,
        // tickAmount: 5,
      },
    ],
    series: [],
    tooltip: {
      outside: false,
      useHTML: true,
    },
    plotOptions: {
      series: {
        animation: { duration: 1200 },

        // color: "gold",
        marker: {
          enabled: true,
          // fillColor: "{series.color}",
        },
      },
      bar: {
        // groupPadding: 0.1,
        pointPadding: 0,
        borderWidth: 0,
        borderRadius: 5,
        grouping: false,
        events: {
          click: (e) => {
            console.log(`bar clicked`);
            console.log(e);
            handleActiveCinemaChange(e.point.name);
          },
        },
      },
    },
  });

  useEffect(() => {
    // console.log(`cinema index - theatreID = ${TheatreID}; =undefined? : ${TheatreID === undefined}`)
    // if (TheatreID !== null && TheatreID !== undefined) {
    //   // const topCinemas = GetTopCinemas(TheatreID, 500);
    //   const topCinemas = GetCinemas();
    //   console.log(`topCinemas:`)
    //   console.log(topCinemas);
    //   updateSeries(topCinemas);
    // };
    const topCinemas = GetCinemas();
    console.log(`topCinemas:`)
    console.log(topCinemas);
    updateSeries(topCinemas);
  }, [TheatreID]);

  const updateSeries = (CinemasList) => {
    setChartOptions((prevState) => ({
      ...prevState,
      // title: {
      //   text: `Cinemas Popularity Ranking`,
      // },
      xAxis: {
        categories: CinemasList.map((d) => d.theatreEN),
        scrollbar: {
          enabled: true,
        },
        tickPixelInterval: 20,
      },
      series: {
        data: CinemasList.map((d) => {
          return {
            id: d.TheatreID,
            name: d.theatreEN,
            className:
              TheatreID === d.TheatreID
                ? `palette-primary`
                : `palette-secondary`,
            y: d.OverallTicketsSold,
            events: {
              click: (e) => {
                console.log(`bar clicked`);
                // console.log(e);
                // handleActiveCinemaChange(e.point.name);
              },
            },
          };
        }),
      },
      tooltip: {
        outside: false,
        useHTML: true,
        backgroundColor: {
          linearGradient: [0, 0, 0, 60],
          stops: [
            [0, "#FFFFFF"],
            [1, "#E0E0E0"],
          ],
        },
        borderRadius: 4,
        style: {
          color: "#f8f8ff",
        },
        headerFormat: "<table>",
        formatter: function () {
          // console.log(`tooltip hover: printing this.point`);
          // console.log(this.point);
          const activeCinemaStatsObj = CinemasList.filter(
            (d) => d.TheatreID === this.point.id
          )[0];

          return (
            `<table><tr><th colspan="2"><h3>${this.point.name}</h3></th></tr>` +
            `<tr><th>Tickets Sold:</th><td> ${
              // note: refer to the note in "updateSeries() setChartOption => series.data" section
              this.point.y === 0 ? "Unknown" : `${commaSeparator(this.point.y)}`
            }</td></tr>` +
            `<tr><th>Sales:</th><td> ${
              // note: refer to the note in "updateSeries() setChartOption => series.data" section
              activeCinemaStatsObj.OverallSales === 0
                ? "Unknown"
                : `HK$${commaSeparator(activeCinemaStatsObj.OverallSales)}`
            }</td></tr>` +
            `</table>`
          );
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

export default ChartCinemaRanking;
