import React from "react";
import {format} from "../../../logic/utils";
import TrackLogItem from "./TrackLogItem";
import {TrackLog} from "../../../logic/tracks/models";

interface Props {
    tracks: TrackLog[]
}

const TrackLogSession: React.FC<Props> = ({tracks}) => {
    if (tracks.length === 0) return null;

    return <div className={"TrackLogSession"}>
        <div className={"sessionHeader"}
             title={`Session id: ${tracks[0].session_id}`}>
            {format(tracks[0].createdAt + "Z", "%d-%m-%YYYY")}
        </div>
        {tracks.map(it => <TrackLogItem key={it.id} item={it}/>)}
    </div>;
};

export default TrackLogSession;
