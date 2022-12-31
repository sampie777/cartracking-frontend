import {TrackLog} from "./models";
import {api} from "../api";
import {throwErrorsIfNotOk} from "../apiUtils";

export namespace TrackLogs {
    export const fetchAll = (): Promise<TrackLog[]> => {
        return api.cars.logs.all()
            .then(throwErrorsIfNotOk)
            .then(response => response.json())
            .then((logs: TrackLog[]) => {
                return logs
            })
            .catch(error => {
                console.error("Failed to fetch track logs", error);
                throw error;
            })
    }
}
