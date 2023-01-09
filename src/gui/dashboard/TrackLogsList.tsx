import React from "react";
import {TrackLog} from "../../logic/tracks/models";
import TrackLogSession from "./TrackLogSession";

interface Props {
    tracks: TrackLog[]
}

const TrackLogsList: React.FC<Props> = ({tracks}) => {
    if (tracks.length === 0) {
        return <div className={"TrackLogsList"}>
            <center>
                <i>No tracking logs...</i>
            </center>
        </div>;
    }

    const groupedBySession = new Map<number, TrackLog[]>();
    tracks.filter(it => it.session_id != null)
        .forEach(it => {
            if (!groupedBySession.has(it.session_id!!)) {
                groupedBySession.set(it.session_id!!, []);
            }
            groupedBySession.get(it.session_id!!)?.push(it)
        })

    return <div className={"TrackLogsList"}>
        {Array.from(groupedBySession.values())
            .map(session => <TrackLogSession tracks={session}/>)
        }
    </div>;
};

export default TrackLogsList;
