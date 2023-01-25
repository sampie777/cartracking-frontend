import React from "react";
import {TrackLog} from "../../../logic/tracks/models";
import GoogleMapReact from 'google-map-react';
import MapMarker from "./MapMarker";
import {TrackLogs} from "../../../logic/tracks/tracks";
import auth from "../../../logic/auth/auth";

interface Props {
    tracks: TrackLog[]
}

const TrackLogMap: React.FC<Props> = ({tracks}) => {
    if (tracks.length === 0) return null;

    const API_KEY = auth.googleApiKey;
    if (API_KEY == null) {
        return <p>Missing Google API key</p>;
    }

    const boundingBox = TrackLogs.findBoundingBoxForTracks(tracks);
    const center = TrackLogs.findCenterOfBoundingBox(boundingBox);
    const zoomFit = TrackLogs.calculateZoomLevelForBoundingBox(boundingBox, 580, 364);

    return <div className={"TrackLogMap"}>
        <GoogleMapReact bootstrapURLKeys={{key: API_KEY}}
                        defaultCenter={center}
                        defaultZoom={zoomFit}
                        options={{
                            maxZoom: 18
                        }}>
            {tracks.map(it => <MapMarker key={it.id}
                                         lat={it.location_latitude ?? 0}
                                         lng={it.location_longitude ?? 0}/>)}
        </GoogleMapReact>
    </div>;
};

export default TrackLogMap;
