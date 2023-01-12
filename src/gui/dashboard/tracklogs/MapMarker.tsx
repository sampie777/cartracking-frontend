import React from "react";
import {Coords} from "google-map-react";

interface Props {
}

const MapMarker: React.FC<Props & Coords> = () => {
    return <div className={"MapMarker"}/>;
};

export default MapMarker;
