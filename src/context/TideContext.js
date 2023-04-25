import React, { createContext, useState } from "react";
import { extremesPointSampleData, seaLevelPointSampleData } from "../api/sampleData";
// import { apiKey } from "../api/config";

class ExtremesPoint {
  constructor(data) {
    this.height = data.height * 3.2808;
    this.time = new Date(data.time);
    this.type = data.type;
  }
}

class SeaLevelPoint {
  constructor(data) {
    this.time = new Date(data.time);
    this.sg = data.sg * 3.2808;
  }
}

export const TideContext = createContext();

export const TideContextProvider = props => {
  // const lat = 37.6328;
  // const lng = -122.4901;
  // const date = new Date();
  // const dateString = date.toISOString().slice(0, 10);

  const [groupedExtremesPoint, setGroupedExtremesPoint] = useState({});
  const [groupedSeaLevelPoint, setGroupedSeaLevelPoint] = useState({});

  const [loading, setLoading] = useState(true);

  const formatData = (extremesPointData, seaLevelPointData) => {
    setGroupedExtremesPoint(extremesPointData.reduce((groups, data) => {
      const datetime = new Date(data.time);
      const date = datetime.toDateString();
      if (!groups[date]) {
        groups[date] = [];
      }
      groups[date].push(new ExtremesPoint(data));
      return groups;
    }, {}));

    setGroupedSeaLevelPoint(seaLevelPointData.reduce((groups, data) => {
      const datetime = new Date(data.time);
      const date = datetime.toDateString();
      if (!groups[date]) {
        groups[date] = [];
      }
      groups[date].push(new SeaLevelPoint(data));
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

    formatData(extremesPointSampleData.data, seaLevelPointSampleData.data);

    setLoading(false);
  };

  return (
    <TideContext.Provider value={{ loading, groupedExtremesPoint, groupedSeaLevelPoint, getTideData }}>
      {props.children}
    </TideContext.Provider>
  );
};