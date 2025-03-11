    import React, { useState, useEffect } from "react";
    import Highcharts from "highcharts";
    import HighchartsReact from "highcharts-react-official";
    
    const SMBGraph = () => {
      const [seriesData, setChartOptions] = useState(null); 
    
      useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await fetch(
              "http://172.20.43.9:84/api/smb/GetSMBGraphData?plantId=39&smbId=1"
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
    
    export default SMBGraph;
    