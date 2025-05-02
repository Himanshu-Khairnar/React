import React from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import AnnotationsModule from "highcharts/modules/annotations";

// Initialize the Annotations module

const CombinationChart = () => {
  const chartData = {
    chart: {
      type: "column",
    },
    title: {
      text: "MFM Chart",
      description: "descc",
    },
    xAxis: {
      title: {
        text: "Timing / Day / Month",
        description: null,
      },
      categories: [
        "2025-04-16 04",
        "2025-04-16 05",
        "2025-04-16 06",
        "2025-04-16 07",
        "2025-04-16 08",
      ],
    },
    yAxis: [
      {
        title: {
          text: "X-Axis Values",
          description: null,
        },
        opposite: false,
        min: 0,
        max: 100,
        tickInterval: 10,
      },
      {
        title: {
          text: "Y-Axis Values",
          description: null,
        },
        opposite: true,
        min: null,
        max: null,
        tickInterval: null,
      },
    ],
    series: [
      {
        name: "B_kVAr",
        type: "line",
        data: [47.31, 50.35, 46.7, 49.1, 49.9],
        color: "#FF5733",
        yAxis: 1,
      },
      {
        name: "VR_PH",
        type: "line",
        data: [51.98, 50.37, 51.82, 47.03, 43.85],
        color: "#33B5FF",
        yAxis: 0,
      },
      {
        name: "SES",
        type: "column",
        data: [46.65, 44.88, 57.13, 48.65, 47.45],
        color: "#8D33FF",
        yAxis: 0,
      },
      {
        name: "VR_PH",
        type: "line",
        data: [51.98, 50.37, 51.82, 47.03, 43.85],
        color: "#33FF57",
        yAxis: 0,
      },
      {
        name: "VR_PH",
        type: "column",
        data: [51.98, 50.37, 51.82, 47.03, 43.85],
        color: "#FFC300",
        yAxis: 0,
      },
    ],
  };  
  return (
    <div>
      <HighchartsReact
        highcharts={Highcharts}
        options={chartData}
      />
    </div>
  );
};

export default CombinationChart;