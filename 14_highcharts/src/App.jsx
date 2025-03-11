import React from "react";
import SplineChart from "./Components/SplineChart";
import WMSGraph from "./Components/WMSGraph";
import SMBGraph from "./Components/SMBGraph";

const App = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Highcharts Wms Chart</h1>
      <WMSGraph />
      <h1 className="text-2xl font-bold mb-4">Highcharts Wms Chart</h1>
      <SMBGraph />
    </div>
  );
};

export default App;
