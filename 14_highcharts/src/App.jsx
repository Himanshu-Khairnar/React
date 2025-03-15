import React from "react";
import SplineChart from "./Components/SplineChart";
import WMSGraph from "./Components/WMSGraph";
import SMBGraph from "./Components/SMBGraph";
import PieChart from "./Components/PieChart";
import InverterChart from "./Components/InverterChart";
import ChartData from "./Components/ChartData";
import MFMChart from "./Components/MFMChart";
import Chart from "./Components/Chart";

const App = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Highcharts Wms Chart</h1>
      <Chart url="http://172.20.43.9:84/api/wms/GetWMSChartData?plantId=39" />
      <h1 className="text-2xl font-bold mb-4">Highcharts SMB Chart</h1>
      <Chart url="http://172.20.43.9:84/api/smb/GetSMBGraphData?plantId=39&smbId=1" />
      <h1 className="text-2xl font-bold mb-4">Highcharts Event Chart</h1>
      <Chart url="http://172.20.43.9:84/api/event/getAlarmChartData?plantId=39&date=2025-03-12" />
      <h1 className="text-2xl font-bold mb-4">Highcharts Pie Event Chart</h1>
      <Chart url="http://172.20.43.9:84/api/event/getAlarmPieChartPerformance?plantId=39&date=2025-03-12" />
      <h1 className="text-2xl font-bold mb-4">Highcharts Inverter Chart</h1>
      <Chart
        url={
          "http://localhost:23835/api/graph/GetWindPowerCruveChart?plantId=39&wtgId=1"
        }
      />
      <h1 className="text-2xl font-bold mb-4">daily Inverter Chart</h1>
      <Chart
        url={
          "http://172.20.43.9:84/api/Portfolio/GetUserPlantsPowerDetails?plantId=39"
        }
      />
      <h1 className="text-2xl font-bold mb-4">MFM Chart</h1>
      <Chart
        url={"http://localhost:23835/api/mfm/GetMFMGraphData?mId=1&plantId=39"}
      />
    </div>
  );
};

export default App;
