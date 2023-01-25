import React from "react";
import {canvasJSChart, CanvasJSChart} from 'canvasjs-react-charts';
import {TrackLog} from "../../../logic/tracks/models";
import {TrackLogs} from "../../../logic/tracks/tracks";
import {format} from "../../../logic/utils";

interface Props {
    tracks: TrackLog[]
}

const TrackLogChart: React.FC<Props> = ({tracks}) => {
    if (tracks.length === 0) return null;

    const lastTrackPoint = tracks[tracks.length - 1];

    const zeroHoursDate = new Date(0);
    zeroHoursDate.setHours(0);

    const options: canvasJSChart.ExtendedChartOptions = {
        animationEnabled: true,
        exportEnabled: true,
        theme: "light2",
        backgroundColor: "#ffffff00",
        zoomEnabled: true,
        zoomType: "xy",
        title: {
            text: "",
            fontWeight: "normal",
            fontStyle: "italic",
            fontSize: 14,
        },
        toolTip: {
            content: (e) => {
                if (e == null || e.entries == null || e.entries.length === 0 || e.entries[0] == null)
                    return "";

                const dataPoint = e.entries[0].dataPoint;
                if (dataPoint == null || dataPoint.x == null || dataPoint.y == null)
                    return "";

                const speed = dataPoint.y.toFixed(0);
                const dateFormat = format(dataPoint.x as Date, (lastTrackPoint.uptimeMs ?? 0) > 3600000 ? "%H:%MM:%SS" : "%MM:%SS");
                return `${speed} km/h at ${dateFormat}`
            }
        },
        axisY: {
            title: "Speed (km/h)",
            titleFontSize: 14,
            includeZero: true,
            valueFormatString: "#0"
        },
        axisX: {
            title: `Duration (${(lastTrackPoint.uptimeMs ?? 0) > 3600000 ? "HH:mm" : "mm:ss"})`,
            titleFontSize: 14,
            prefix: "",
            minimum: zeroHoursDate.getTime(),
            valueFormatString: (lastTrackPoint.uptimeMs ?? 0) > 3600000 ? "HH:mm" : "mm:ss",
        },
        data: TrackLogs.generateChartData(tracks),
    };

    return <div className={"TrackLogChart"}>
        <CanvasJSChart options={options} containerProps={{
            height: "30vh",
            width: "100%",
            position: "relative"
        }}/>
    </div>;
};
export default TrackLogChart;
