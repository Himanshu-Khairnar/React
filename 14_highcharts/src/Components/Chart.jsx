import React, { useState, useEffect } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

const Chart = ({url}) => {
  const [seriesData, setChartOptions] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          url
        );
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

  console.log(Date.UTC(2022, 8, 1, 6, 0));

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
