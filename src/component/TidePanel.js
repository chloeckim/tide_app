import React, { useContext } from "react";
import { TideContext } from "../context/TideContext";
import { TideTable } from "./TideTable";
import { TideChart } from "./TideChart";

export const TidePanel = props => {
  const { extremesPointByDate, seaLevelPointByDate } = useContext(TideContext);

  const tideTables = [];
  const tideCharts = [];
  for (const [key, value] of Object.entries(extremesPointByDate)) {
    tideTables.push(<td><TideTable date={key} data={value}/></td>);
    tideCharts.push(<td><TideChart date={key} data={seaLevelPointByDate[key]}/></td>)
  }

  return (
    <tbody className="tide-panel">
      <tr>{tideCharts}</tr>
      <tr>{tideTables}</tr>
    </tbody>
  )
}