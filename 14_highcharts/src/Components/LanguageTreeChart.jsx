import React, { useEffect } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import Networkgraph from "highcharts/modules/networkgraph";

// Initialize networkgraph module
Networkgraph(Highcharts);

const LanguageTreeChart = () => {
  // Register the Highcharts event once
  useEffect(() => {
    Highcharts.addEvent(Highcharts.Series, "afterSetOptions", function (e) {
      const colors = Highcharts.getOptions().colors;
      const nodes = {};
      let i = 0;

      if (
        this instanceof Highcharts.Series.types.networkgraph &&
        e.options.id === "lang-tree"
      ) {
        e.options.data.forEach(function (link) {
          if (link[0] === "Proto Indo-European") {
            nodes["Proto Indo-European"] = {
              id: "Proto Indo-European",
              marker: {
                radius: 20,
              },
            };
            nodes[link[1]] = {
              id: link[1],
              marker: {
                radius: 10,
              },
              color: colors[i++],
            };
          } else if (nodes[link[0]] && nodes[link[0]].color) {
            nodes[link[1]] = {
              id: link[1],
              color: nodes[link[0]].color,
            };
          }
        });

        e.options.nodes = Object.keys(nodes).map((id) => nodes[id]);
      }
    });
  }, []);

  const options = {
    chart: {
      type: "networkgraph",
      height: "100%",
    },
    title: {
      text: "The Indo-European Language Tree",
      align: "left",
    },
    subtitle: {
      text: "A Force-Directed Network Graph in Highcharts",
      align: "left",
    },
    plotOptions: {
      networkgraph: {
        keys: ["from", "to"],
        layoutAlgorithm: {
          enableSimulation: true,
          friction: -0.9,
          gravitationalConstant: window.innerWidth < 500 ? 0.2 : 0.06,
        },
      },
    },
    series: [
      {
        accessibility: {
          enabled: false,
        },
        dataLabels: {
          enabled: true,
          linkFormat: "",
          style: {
            fontSize: "0.8em",
            fontWeight: "normal",
          },
        },
        id: "lang-tree",
        data: [
          /* Paste your full data array here */
        ],
      },
    ],
  };

  return (
    <div style={{ height: "100vh" }}>
      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  );
};

export default LanguageTreeChart;
