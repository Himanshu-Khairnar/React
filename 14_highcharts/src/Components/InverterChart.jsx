import React, { useState, useEffect } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

const InverterChart = () => {
  const [seriesData, setChartOptions] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "http://localhost:23835/api/graph/GetWindPowerCruveChart?plantId=39&wtgId=1"
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

export default InverterChart;
