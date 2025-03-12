import React from "react";
import SplineChart from "./Components/SplineChart";
import WMSGraph from "./Components/WMSGraph";
import SMBGraph from "./Components/SMBGraph";
import PieChart from "./Components/PieChart";

const App = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Highcharts Wms Chart</h1>
      <WMSGraph />
      <h1 className="text-2xl font-bold mb-4">Highcharts Wms Chart</h1>
      <SMBGraph />
      <h1 className="text-2xl font-bold mb-4">Highcharts Event Chart</h1>
      <SplineChart />
      <h1 className="text-2xl font-bold mb-4">Highcharts Pie Event Chart</h1>
      <PieChart />
    </div>
  );
};

export default App;
