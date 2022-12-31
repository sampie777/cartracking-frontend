import React, {useEffect, useState} from "react";
import {TrackLog} from "../../logic/tracks/models";
import {TrackLogs} from "../../logic/tracks/tracks";
import TrackLogsList from "./TrackLogsList";
import './style.sass';

interface Props {
}

const DashboardView: React.FC<Props> = () => {
    const [fetchError, setFetchError] = useState<Error | undefined>();
    const [tracks, setTracks] = useState<TrackLog[]>([]);

    useEffect(() => {
        loadTrackLogs();
    }, [])

    const loadTrackLogs = () => {
        setFetchError(undefined)
        TrackLogs.fetchAll()
            .then(setTracks)
            .catch(setFetchError)
    }

    return <div className={"DashboardView"}>
        <h1>Dashboard</h1>

        {!fetchError ? null : <div>Error: {fetchError.name}</div>}

        <TrackLogsList tracks={tracks}/>
    </div>;
};

export default DashboardView;
