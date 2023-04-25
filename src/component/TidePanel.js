import React, { useContext } from "react";
import { TideContext } from "../context/TideContext";
import { TideTable } from "./TideTable";
import { TideChart } from "./TideChart";

export const TidePanel = props => {
  const { groupedExtremesPoint, groupedSeaLevelPoint } = useContext(TideContext);

  const tideTables = [];
  const tideCharts = [];

  for (const [key, value] of Object.entries(groupedExtremesPoint)) {
    tideTables.push(<td key={key}><TideTable data={value}/></td>);
  }

  for (const [key, value] of Object.entries(groupedSeaLevelPoint)) {
    tideCharts.push(<td key={key}><TideChart data={value}/></td>)
  }

  return (
    <table className="tide-panel">
      <tbody>
        <tr>{tideCharts}</tr>
        <tr>{tideTables}</tr>
      </tbody>
    </table>
  )
}