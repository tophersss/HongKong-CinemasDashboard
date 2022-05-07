import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { useState, useEffect, useRef } from "react";
import { cinemas_performance_overview } from "../data/CinemasPerformanceOverview";
import { abbrNum } from "../utils/NumberUtils";
import { PickChainColor } from "../utils/ColorUtils";

const ChartCinemaRanking = ({ TheatreID, associatedChain }) => {
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
      animation: { duration: 200 },
      height: 220,
      spacingTop: 20,
      type: "bar",
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
    plotOptions: {
      series: {
        animation: { duration: 3000 },

        // color: "gold",
        marker: {
          enabled: false,
          // fillColor: "{series.color}",
        },
      },
    },
  });

  useEffect(() => {
    if (TheatreID !== null) {
      const topCinemas = GetTopCinemas(TheatreID, 5);
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
