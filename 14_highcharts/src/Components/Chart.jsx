import React, { useState, useEffect } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

const Chart = ({ url }) => {
  const [seriesData, setChartOptions] = useState(null);
  const chartData = {
    chart: {
      type: "line",
    },
    title: {
      text: "WMS Graph",
      align: "center",
    },
    yAxis: {
      title: {
        text: "Value",
      },
    },
    xAxis: {
      categories: ["06:00", "06:01", "06:02", "06:03", "06:04"],
    },
    series: [
      { name: "GHI", data: [8, 1, 10, 21, 23] },
      { name: "Irradiance_GHI", data: [8, 12.71, 38.55, 3.62, 1.46] },
      { name: "Irradiance_POA", data: [10, 6, 23, 19, 26] },
    ],
    responsive: {
      rules: [
        {
          condition: { maxWidth: 500 },
          chartOptions: {
            legend: {
              layout: "horizontal",
              align: "center",
              verticalAlign: "bottom",
            },
          },
        },
      ],
    },
  };
  const alarmPiechartData = {
    chart: {
      type: "line",
    },
    title: {
      text: "MFM Chart",
    },
    xAxis: {
      type: "datetime",
      tickInterval: 3600 * 1000, // 1-hour intervals
      labels: {
        format: "{value:%H:%M}",
        rotation: -45,
        step: 2,
      },
    },
    series: [
      {
        name: "Total Export",
        data: [
          [Date.UTC(2024, 8, 1, 12, 0), 25.9],
          [Date.UTC(2024, 8, 1, 13, 0), 30.2],
          [Date.UTC(2024, 8, 1, 14, 0), 28.7],
        ],
        color: "red",
      },
    ],
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url);
        const res = await response.json();

        if (!res.series) {
          console.error("Invalid response format:", res);
          return;
        }

        setChartOptions(res);
        console.log("Fetched Data:", res);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      {seriesData ? (
        <HighchartsReact highcharts={Highcharts} options={seriesData} />
      ) : (
        <p>Loading chart...</p>
      )}
    </div>
  );
};

export default Chart;
