import React from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

const CombinationChart = () => {
  const chartData = {
    chart: {
      type: "column",
    },
    title: {
      text: "FINAL testing of xyplotter ",
      description: "FINAL testing by himanshu",
    },
    xAxis: {
      categories: ["Point 1", "Point 2", "Point 3"],
    },
    yAxis: {
      title: {
        text: "Values",
        description: null,
      },
    },
    series: [
      {
        name: "kwh_till_date",
        type: "column",
        data: [42],
        color: "#2196F3",
      },
    ],
  };
  return (
    <div>
      <HighchartsReact highcharts={Highcharts} options={chartData} />
    </div>
  );
};
export default CombinationChart;
