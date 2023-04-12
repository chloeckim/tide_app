import React from "react";
import Plot from "react-plotly.js";

export const TideChart = props => {
  const data = [
    {
      x: props.data.map(point => point.time),
      y: props.data.map(point => point.sg),
      type: 'scatter'
    }
  ];

  return (
    <div className="tide-chart">
      <Plot data={data}/>
    </div>
  );
}