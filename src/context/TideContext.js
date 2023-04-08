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

    const getTideData = () => {
        setExtremesPoint(extremesPointSampleData);
        setSeaLevelPoint(seaLevelPointSampleData);

        // Commented out to reserve API usage.
        /*
        fetch(`https://api.stormglass.io/v2/tide/extremes/point?lat=${lat}&lng=${lng}`, {
            headers: {
                'Authorization': apiKey
            }
        }).then((response) => response.json()).then((jsonData) => {
            console.log(jsonData);
            setExtremesPoint(jsonData);
        });
        
        fetch(`https://api.stormglass.io/v2/tide/sea-level/point?lat=${lat}&lng=${lng}`, {
            headers: {
                'Authorization': apiKey
            }
        }).then((response) => response.json()).then((jsonData) => {
            console.log(jsonData);
            setSeaLevelPoint(jsonData);
        });
        */
    };

    return (
        <TideContext.Provider value={{ extremesPoint, seaLevelPoint, getTideData }}>
            {props.children}
        </TideContext.Provider>
    );
};