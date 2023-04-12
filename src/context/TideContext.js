import React, { createContext, useState } from "react";
import { extremesPointSampleData, seaLevelPointSampleData } from "../api/sampleData";
// import { apiKey } from "../api/config";

export const TideContext = createContext();

export const TideContextProvider = props => {
  // const lat = 37.6328;
  // const lng = -122.4901;
  // const date = new Date();
  // const dateString = date.toISOString().slice(0, 10);

  const [extremesPoint, setExtremesPoint] = useState({});
  const [seaLevelPoint, setSeaLevelPoint] = useState({});

  const [extremesPointByDate, setExtremesPointByDate] = useState({});
  const [seaLevelPointByDate, setSeaLevelPointByDate] = useState({});

  const [loading, setLoading] = useState(true);

  const groupTideDataByDate = () => {
    setExtremesPointByDate(extremesPointSampleData.data.reduce((groups, extremePoint) => {
      const date = extremePoint.time.split('T')[0];
      if (!groups[date]) {
        groups[date] = [];
      }
      groups[date].push(extremePoint);
      return groups;
    }, {}));

    setSeaLevelPointByDate(seaLevelPointSampleData.data.reduce((groups, extremePoint) => {
      const date = extremePoint.time.split('T')[0];
      if (!groups[date]) {
        groups[date] = [];
      }
      groups[date].push(extremePoint);
      return groups;
    }, {}));
  }

  const getTideData = () => {
    // Commented out to reserve API usage.
    /*
    // Retrieve information about high and low tide for a single coordinate.
    // If nothing is specified, the returned values will be in relative to Mean Sea Level - MSL.
    // Timestamp in UTC
    fetch(`https://api.stormglass.io/v2/tide/extremes/point?lat=${lat}&lng=${lng}`, {
        headers: {
            'Authorization': apiKey
        }
    }).then((response) => response.json()).then((jsonData) => {
        console.log(jsonData);
        setExtremesPoint(jsonData);
    });
    
    // Retrieve the sea level given in meters hour by hour for a single coordinate.
    // If nothing is specified the returned values will be in relative to Mean Sea Level - MSL.
    //Timestamp in UTC
    fetch(`https://api.stormglass.io/v2/tide/sea-level/point?lat=${lat}&lng=${lng}`, {
        headers: {
            'Authorization': apiKey
        }
    }).then((response) => response.json()).then((jsonData) => {
        console.log(jsonData);
        setSeaLevelPoint(jsonData);
    });
    */

    setExtremesPoint(extremesPointSampleData);
    setSeaLevelPoint(seaLevelPointSampleData);

    groupTideDataByDate();

    setLoading(false);
  };

  return (
    <TideContext.Provider value={{ loading, extremesPoint, seaLevelPoint, extremesPointByDate, seaLevelPointByDate, getTideData }}>
      {props.children}
    </TideContext.Provider>
  );
};