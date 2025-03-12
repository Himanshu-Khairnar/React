import React, { useState, useEffect } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

const PieChart = () => {
  const [seriesData, setChartOptions] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "http://172.20.43.9:84/api/event/getAlarmPieChartPerformance?plantId=39&date=2025-03-12"
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
      type: "pie",
      options3d: {
        enabled: true,
        alpha: 45,
        beta: 0,
      },
      height: 250,
    },
    title: { text: "Equipment Alarm" },
    plotOptions: {
      pie: {
        innerSize: 60, // Reduced from 100 to improve visibility
        depth: 15, // Slightly increased depth for better 3D effect
        dataLabels: {
          enabled: true, // Ensure labels are visible
          format: "{point.name}: {point.y}%", // Show category & percentage
        },
      },
    },
    series: [
      {
        name: "Alarms",
        data: [
          ["Inverter", 40],
          ["String", 60],
         
        ],
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

export default PieChart;
