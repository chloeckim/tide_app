import React, { useContext } from "react";
import { TideContext } from "../context/TideContext";
import { TideTable } from "./TideTable";

export const TidePanel = props => {
  const { extremesPointByDate, seaLevelPointByDate } = useContext(TideContext);

  const tideTables = []
  for (const [key, value] of Object.entries(extremesPointByDate)) {
    console.log(key);
    console.log(value);

    tideTables.push(<td><TideTable data={value}/></td>);
  }
  return (
    <tbody>
      <tr>{tideTables}</tr>
    </tbody>
  )
}