import React, {useState} from "react";
import {format} from "../../../logic/utils";
import TrackLogItem from "./TrackLogItem";
import {TrackLog} from "../../../logic/tracks/models";
import TrackLogMap from "./TrackLogMap";

interface Props {
    tracks: TrackLog[]
    showMapInitially?: boolean
    showListInitially?: boolean
}

const TrackLogSession: React.FC<Props> = ({
                                              tracks,
                                              showMapInitially,
                                              showListInitially
                                          }) => {
    const [showMap, setShowMap] = useState(showMapInitially === true);
    const [showList, setShowList] = useState(showListInitially === true);

    if (tracks.length === 0) return null;

    const locationTracks = tracks.filter(it => it.location_satellites != null && it.location_satellites > 1);

    return <div className={"TrackLogSession"}>
        <div className={"sessionHeader"}
             title={`Session id: ${tracks[0].session_id}`}>
            {format(tracks[0].createdAt + "Z", "%d-%m-%YYYY")}
        </div>

        {locationTracks.length === 0 ? undefined : <div>
            <button onClick={() => setShowMap(!showMap)}>
                {showMap ? "Hide" : "Show"} map for {locationTracks.length} tracks
            </button>
            {!showMap ? undefined : <TrackLogMap tracks={locationTracks}/>}
        </div>}

        <button onClick={() => setShowList(!showList)}>
            {tracks.length} tracks
        </button>

        {!showList ? undefined :
            <div>
                {tracks.map(it => <TrackLogItem key={it.id} item={it}/>)}
            </div>
        }
    </div>;
};

export default TrackLogSession;
