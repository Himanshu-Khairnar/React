import React from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

const SplineChart = () => {
  const options = {
    chart: {
      type: "spline",
    },
    title: {
      text: "Monthly Average Temperature",
    },
    subtitle: {
      text: "Source: WorldClimate.com",
    },
    xAxis: {
      categories: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ],
    },
    yAxis: {
      title: {
        text: "Temperature (°C)",
      },
    },
    tooltip: {
      valueSuffix: "°C",
    },
    series: [
      {
        name: "Tokyo",
        data: [
          7, 6.9, 9.5, 14.5, 18.2, 21.5, 25.2, 26.5, 23.3, 18.3, 13.9, 9.6,
        ],
      },
      {
        name: "New York",
        data: [-0.2, 0.8, 5.7, 11.3, 17, 22, 24.8, 24.1, 20.1, 14.1, 8.6, 2.5],
      },
    ],
  };

  return <HighchartsReact highcharts={Highcharts} options={options} />;
};

export default SplineChart;
