import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { useState, useEffect, useRef } from "react";
import { cinemas_performance_overview } from "../data/CinemasPerformanceOverview";
import { abbrNum } from "../utils/NumberUtils";

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

    console.log(`==================================`);
    console.log(`printing top 5 cinemas: `);
    console.log(topCinemas);
    console.log(`==================================`);

    return topCinemas;
  };

  const isMounted = useRef(false);

  const [chartOptions, setChartOptions] = useState({
    chart: {
      animation: { duration: 200 },
      height: 250,
      type: "bar",
    },
    title: {
      text: `Cinemas Popularity Ranking`,
    },
    xAxis: {
      categories: [],
      labels: {
        style: {
          fontSize: "13px",
        },
      },
    },
    yAxis: [
      {
        title: {
          text: "Number of Tickets Sold (in thousands)",
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

        color: "gold",
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
    console.log(`useEffect triggered updateSeries()`);

    setChartOptions((prevState) => ({
      ...prevState,
      title: {
        text: `Cinemas Popularity Ranking`,
      },
      xAxis: {
        categories: CinemasList.map((d) => d.theatreTC),
      },
      series: {
        data: CinemasList.map((d) => d.OverallTicketsSold),
      },
    }));
  };

  return (
    <div>
      <HighchartsReact highcharts={Highcharts} options={chartOptions} />
    </div>
  );
};

export default ChartCinemaRanking;
