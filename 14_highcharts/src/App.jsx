import React from "react";
import SplineChart from "./Components/SplineChart";
import WMSGraph from "./Components/WMSGraph";

const App = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Highcharts Spline Chart</h1>
      <SplineChart />
      <WMSGraph/>
    </div>
  );
};

export default App;
