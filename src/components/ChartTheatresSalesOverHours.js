import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { useState, useEffect, useRef } from "react";
import { theatres_sales_over_hours } from "../data/TheatresSalesOverHours";

const ChartTheatresSalesOverHours = ({ hoveredTheatre }) => {
  console.log(`chart: hovering over ${hoveredTheatre}`);
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
  const theatreGroups = groupBy(theatres_sales_over_hours, "theatre");
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
    //   const theatreGroups = groupBy(theatres_sales_over_hours, (v) => v.name);
    // }
  }, []);

  useEffect(() => {
    if (hoveredTheatre !== null) {
      updateSeries();
      console.log(`updateSeries() finished.`);
    }
  }, [hoveredTheatre]);

  const [chartOptions, setChartOptions] = useState({
    chart: {
      animation: { duration: 200 },
      height: 350,
    },
    title: {
      text: `Number of Tickets Sold In A Day`,
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
    },
    yAxis: [
      {
        title: {
          text: "Number of Tickets Sold",
        },
        labels: {
          format: "{value}",

          style: {
            color: Highcharts.getOptions().colors[1],
          },
        },
        tickAmount: 5,
      },
    ],
    series: Object.keys(theatreGroups).map((groupName) => {
      if (groupName == hoveredTheatre) {
        return {
          type: "line",
          name: groupName,
          data: theatreGroups[groupName].map((groupData) => {
            return [groupData.label, groupData.ticket_sold];
          }),
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
        color: "gold",
        marker: {
          enabled: false,
          // fillColor: "{series.color}",
        },
      },
    },
  });

  const updateSeries = () => {
    console.log(`useEffect triggered updateSeries()`);
    console.log(theatreGroups);
    // const filteredTheatreObj = theatreGroups.filter((g) => g == hoveredTheatre);
    const hoveredTheatreObj = Object.keys(theatreGroups).map((groupName) => {
      if (groupName == hoveredTheatre) {
        return {
          type: "line",
          name: groupName,
          data: theatreGroups[groupName].map((groupData) => {
            return [groupData.label, groupData.ticket_sold];
          }),
        };
      }
    });
    console.log(`filteredGroup:`);
    console.log(theatreGroups[hoveredTheatre]);

    setChartOptions((prevState) => ({
      ...prevState,
      title: {
        text: `Popularity By Hours`,
      },
      // series: [...matchingSteps.map((step_obj) => step_obj.series_obj)],
      series: {
        type: "line",
        name: hoveredTheatre,
        data: theatreGroups[hoveredTheatre].map((groupData) => {
          return [groupData.label, groupData.ticket_sold];
        }),
      },
      // series: Object.keys(theatreGroups).map((groupName) => {
      //   if (groupName == hoveredTheatre) {
      //     return {
      //       type: "line",
      //       name: groupName,
      //       data:theatreGroups[hoveredTheatre].map((groupData) => {
      //         return [groupData.label, groupData.ticket_sold];
      //       }),
      //     };
      //   }
      // }),
    }));
  };

  return (
    <div>
      <HighchartsReact highcharts={Highcharts} options={chartOptions} />
    </div>
  );
};

export default ChartTheatresSalesOverHours;
