import {BoundingBoxCoords, TrackLog} from "./models";
import {api} from "../api";
import {throwErrorsIfNotOk} from "../apiUtils";
import {Coords} from "google-map-react";
import {format} from "../utils";
import {ChartDataSeriesOptions} from "canvasjs";

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

    export const findBoundingBoxForTracks = (tracks: TrackLog[]): BoundingBoxCoords => {
        const result: BoundingBoxCoords = {
            max: {lat: 0, lng: 0},
            min: {lat: 0, lng: 0}
        };

        if (tracks.length > 0) {
            result.max.lat = tracks[0].location_latitude!!;
            result.min.lat = tracks[0].location_latitude!!;
            result.max.lng = tracks[0].location_longitude!!;
            result.min.lng = tracks[0].location_longitude!!;
        }

        tracks.filter(it => it.location_latitude != null && it.location_longitude != null)
            .forEach(it => {
                if (it.location_latitude!! > result.max.lat)
                    result.max.lat = it.location_latitude!!;
                if (it.location_latitude!! < result.min.lat)
                    result.min.lat = it.location_latitude!!;
                if (it.location_longitude!! > result.max.lng)
                    result.max.lng = it.location_longitude!!;
                if (it.location_longitude!! < result.min.lng)
                    result.min.lng = it.location_longitude!!;
            })

        return result;
    }

    export const findCenterOfBoundingBox = (box: BoundingBoxCoords): Coords => {
        return {
            lat: box.min.lat + (box.max.lat - box.min.lat) / 2,
            lng: box.min.lng + (box.max.lng - box.min.lng) / 2,
        }
    }

    /**
     * Find optimal zoom using both lateral as longitude coordinates
     * Thanks to: https://stackoverflow.com/a/13274361/2806723
     * @param box
     * @param mapWidth
     * @param mapHeight
     */
    export const calculateZoomLevelForBoundingBox = (box: BoundingBoxCoords, mapWidth: number, mapHeight: number): number => {
        const WORLD_DIM = {height: 256, width: 256};
        const ZOOM_MAX = 21;

        function latRad(lat: number) {
            var sin = Math.sin(lat * Math.PI / 180);
            var radX2 = Math.log((1 + sin) / (1 - sin)) / 2;
            return Math.max(Math.min(radX2, Math.PI), -Math.PI) / 2;
        }

        function zoom(mapPx: number, worldPx: number, fraction: number) {
            return Math.floor(Math.log(mapPx / worldPx / fraction) / Math.LN2);
        }

        const ne = box.max;
        const sw = box.min;

        const latFraction = (latRad(ne.lat) - latRad(sw.lat)) / Math.PI;

        const lngDiff = ne.lng - sw.lng;
        const lngFraction = ((lngDiff < 0) ? (lngDiff + 360) : lngDiff) / 360;

        const latZoom = zoom(mapHeight, WORLD_DIM.height, latFraction);
        const lngZoom = zoom(mapWidth, WORLD_DIM.width, lngFraction);

        return Math.min(latZoom - 1, lngZoom - 1, ZOOM_MAX);
    }

    export const areTrackTimesEqual = (a: TrackLog, b: TrackLog, timeFormat: string = "%H:%MM"): boolean =>
        a === b ||
        format(a.createdAt + "Z", timeFormat) === format(b.createdAt + "Z", timeFormat);

    export const generateChartData = (tracks: TrackLog[]): Array<ChartDataSeriesOptions> => {
        const zeroHoursDate = new Date(0);
        zeroHoursDate.setHours(0);

        return [
            {
                type: "line",
                markerSize: 8,
                lineThickness: 1,
                color: "#6d78ad",
                dataPoints: tracks
                    .filter(it => it.uptimeMs != null && it.car_speed != null)
                    .map(it => {
                        return {
                            x: new Date(zeroHoursDate.getTime() + (it.uptimeMs ?? 0)),
                            y: it.car_speed ?? 0,
                        }
                    })
            }
        ]
    }

    export const isCoordinateInList = (track: TrackLog, tracks: TrackLog[]): boolean =>
        tracks.some(it => it !== track && it.location_latitude === track.location_latitude
            && it.location_longitude === track.location_longitude)

    /**
     * Filter all tracks with non-unique coordinates out and return the filtered list
     * @param tracks
     */
    export const getTracksUniqueByCoordinates = (tracks: TrackLog[]): TrackLog[] => {
        const result: TrackLog[] = [];
        tracks.forEach(it => {
            if (isCoordinateInList(it, result)) return;
            result.push(it)
        })
        return result;
    }
    export const removeTracksWithInvalidCoordinates = (tracks: TrackLog[], minSatellites: number = 2): TrackLog[] =>
        tracks.filter(it => it.location_satellites != null && it.location_satellites >= minSatellites)
            .filter(it => !(it.location_latitude == null || it.location_latitude === 90 || it.location_latitude === 0
                || it.location_longitude == null || it.location_longitude === 90 || it.location_longitude === 0))
}
