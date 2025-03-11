import React, { useState, useEffect } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

const WMSGraph = () => {
  const [seriesData, setChartOptions] = useState(null); // Default state is null

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "http://localhost:23835/api/wms/GetWMSChartData?plantId=39"
        );
        const res = await response.json();

        if (!res.series) {
          console.error("Invalid response format:", res);
          return;
        }

        setChartOptions(res); // Store fetched data
        console.log("Fetched Data:", res); // Debugging purpose
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData(); // Call the function correctly
  }, []); // Empty dependency array ensures this runs once when the component mounts

  // Default chart options
//   const defaultOptions = {
//     title: {
//       text: "WMS Graph",
//       align: "center",
//     },
//     yAxis: {
//       title: { text: "Value" },
//     },
//     xAxis: {
//       type: "datetime",
//       labels: { format: "{value:%H:%M}" },
//       tickInterval: 3600000, // 1 hour in milliseconds
//       accessibility: { rangeDescription: "Time range from 06:00 to 08:01" },
//     },
//     plotOptions: {
//       series: {
//         label: { connectorAllowed: false },
//         pointStart: Date.UTC(2022, 8, 1, 6, 0), // Start at 06:00 UTC
//         pointInterval: 3600000, // Interval of 1 hour
//       },
//     },
//     series: seriesData?.series || [], // Use fetched data or empty array
//   };
const options = {
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
    type: "datetime",
    labels: {
      format: "{value:%H:%M}", // Format as HH:mm (06:00, 07:00, etc.)
    },
    tickInterval: 3600000, // 1 hour in milliseconds
    accessibility: {
      rangeDescription: "Time range from 06:00 to 08:01",
    },
  },
  plotOptions: {
    series: {
      label: {
        connectorAllowed: false,
      },
      pointStart: Date.UTC(2022, 8, 1, 6, 0), // Start at 06:00 UTC (Sep 1, 2022)
      pointInterval: 3600000,
    },
  },
  series: [
    {
      name: "GHI",
      data: [8, 1, 10, 21, 23, 1, 16], // Example data points
    },
    {
      name: "Irradiance_GHI",
      data: [8, 12.71, 38.55, 3.62, 1.46, 45.45, 21.84],
    },
    {
      name: "Irradiance_POA",
      data: [10, 6, 23, 19, 26, 22, 4],
    },
  ],
};
console.log(Date.UTC(2022, 8, 1, 6, 0));

  return (
    <div>
      {seriesData ? (
        <HighchartsReact highcharts={Highcharts} options={seriesData} />
      ) : (
        <p>Loading chart...</p> // Display loading message until data is fetched
      )}
    </div>
  );
};

export default WMSGraph;
