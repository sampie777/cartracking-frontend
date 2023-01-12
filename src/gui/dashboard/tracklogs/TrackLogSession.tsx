import React, {useState} from "react";
import {format} from "../../../logic/utils";
import TrackLogItem from "./TrackLogItem";
import {TrackLog} from "../../../logic/tracks/models";
import TrackLogMap from "./TrackLogMap";
import RoundIconButton from "../../components/RoundIconButton";
import {faListUl, faMapMarkedAlt, faSlash} from "@fortawesome/free-solid-svg-icons";
import {TrackLogs} from "../../../logic/tracks/tracks";

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

    const firstTrack = tracks[tracks.length - 1];
    const lastTrack = tracks[0];
    const locationTracks = tracks.filter(it => it.location_satellites != null && it.location_satellites > 1);

    return <div className={"TrackLogSession"}>
        <div className={"sessionHeader"}
             title={`Session id: ${firstTrack.session_id}`}>
            {format(firstTrack.createdAt + "Z", "%d-%m-%YYYY")}

            <span className={"time"}>
                {format(firstTrack.createdAt + "Z", "%H:%MM")}
                {TrackLogs.areTrackTimesEqual(firstTrack, lastTrack) ? undefined : <>
                    {" - "}
                    {format(lastTrack.createdAt + "Z", "%H:%MM")}
                </>}
            </span>
        </div>

        <div className={"sessionActions"}>
            {locationTracks.length === 0 ? undefined :
                <RoundIconButton icon={faMapMarkedAlt}
                                 onClick={() => setShowMap(!showMap)}
                                 overlayIcon={!showMap ? undefined : faSlash}
                                 title={locationTracks.length === 0
                                     ? "No tracks with location available"
                                     : `${showMap ? "Hide" : "Show"} map for ${locationTracks.length} tracks`}
                                 label={locationTracks.length === 0 ? undefined : `${locationTracks.length}x`}/>
            }

            <RoundIconButton icon={faListUl}
                             onClick={() => setShowList(!showList)}
                             overlayIcon={!showList ? undefined : faSlash}
                             title={`${showList ? "Hide" : "Show"} all ${tracks.length} tracks`}
                             label={`${tracks.length}x`}/>
        </div>

        {locationTracks.length === 0 ? undefined : <div>
            {!showMap ? undefined : <TrackLogMap tracks={locationTracks}/>}
        </div>}

        {!showList ? undefined : <div>
            {tracks.map(it => <TrackLogItem key={it.id} item={it}/>)}
        </div>}

        {!showMap && !showList ? undefined : <div className={"sessionFooter"}/>}
    </div>;
};

export default TrackLogSession;
