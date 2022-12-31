import React from "react";
import {TrackLog} from "../../logic/tracks/models";
import TrackLogItem from "./TrackLogItem";

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
            .filter(it => it.length > 0)
            .map(session =>
                <div>
                    <div className={"sessionId"}
                         title={"Session identifier"}>
                        {session[0].session_id}
                    </div>
                    {session.map(it => <TrackLogItem key={it.id} item={it}/>)}
                </div>)
        }
    </div>;
};

export default TrackLogsList;
