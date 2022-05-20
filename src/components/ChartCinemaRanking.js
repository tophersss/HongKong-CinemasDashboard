// import Highcharts from "highcharts";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { useState, useEffect, useRef } from "react";
import { cinemas_performance_overview } from "../data/CinemasPerformanceOverview";
import { abbrNum } from "../utils/NumberUtils";
import { PickChainColor } from "../utils/ColorUtils";

const ChartCinemaRanking = ({ TheatreID }) => {
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

  const isMounted = useRef(false);

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
      text: `Cinemas Popularity Ranking`,
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
      labels: {
        style: {
          fontSize: "0.75rem",
        },
      },
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
        // tickAmount: 5,
      },
    ],
    series: [],
    tooltip: {
      outside: false,
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
        grouping: false,
      },
    },
  });

  useEffect(() => {
    if (TheatreID !== null) {
      const topCinemas = GetTopCinemas(TheatreID, 50);
      updateSeries(topCinemas);
    }
  }, [TheatreID]);

  const updateSeries = (CinemasList) => {
    setChartOptions((prevState) => ({
      ...prevState,
      title: {
        text: `Cinemas Popularity Ranking`,
      },
      xAxis: {
        categories: CinemasList.map((d) => d.theatreTC),
        scrollbar: {
          enabled: true,
        },
        tickPixelInterval: 20,
      },
      series: {
        data: CinemasList.map((d) => {
          return {
            name: d.theatreTC,
            className:
              TheatreID === d.TheatreID
                ? `palette-primary`
                : `palette-secondary`,
            y: d.OverallTicketsSold,
          };
        }),
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
