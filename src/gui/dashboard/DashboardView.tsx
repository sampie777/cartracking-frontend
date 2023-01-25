import React, {useEffect, useState} from "react";
import {TrackLog} from "../../logic/tracks/models";
import {TrackLogs} from "../../logic/tracks/tracks";
import TrackLogsList from "./tracklogs/TrackLogsList";
import './style.sass';
import LoadingOverlay from "../components/LoadingOverlay";

interface Props {
}

const DashboardView: React.FC<Props> = () => {
    const [fetchError, setFetchError] = useState<Error | undefined>();
    const [tracks, setTracks] = useState<TrackLog[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        loadTrackLogs();
    }, [])

    const loadTrackLogs = () => {
        setIsLoading(true);
        setFetchError(undefined)
        TrackLogs.fetchAll()
            .then(setTracks)
            .catch(setFetchError)
            .finally(() => setIsLoading(false))
    }

    return <div className={"DashboardView"}>
        <h1>Dashboard</h1>

        {!fetchError ? null : <div>Error: {fetchError.name}</div>}

        {!isLoading ? null : <LoadingOverlay backgroundColor={"#ffffff00"}/>}
        {isLoading ? null : <TrackLogsList tracks={tracks}/>}
    </div>;
};

export default DashboardView;
