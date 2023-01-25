declare module "canvasjs-react-charts" {
    import * as React from 'react';
    import {ChartOptions} from "canvasjs";
    import {Chart, ChartDataPoint, ChartDataSeriesOptions, ChartToolTipOptions} from "canvasjs";

    export class CanvasJSChart extends React.Component<canvasJSChart.Props> {
    }

    namespace canvasJSChart {
        interface Props {
            options?: ExtendedChartOptions;
            containerProps?: ContainerProps;
        }

        interface ContainerProps {
            width: string;
            height?: string;
            position: "static" | "absolute" | "relative" | "fixed" | "sticky";
        }

        interface ExtendedChartOptions extends ChartOptions {
            toolTip?: ExtendedChartToolTipOptions;
            zoomType?: "x" | "y" | "xy";
        }

        interface ExtendedChartToolTipOptions extends ChartToolTipOptions{
            content?: string | ((e: ToolTipContentEvent) => string);
        }

        interface ToolTipContentEvent {
            chart: Chart;
            toolTip: ChartToolTipOptions;
            entries: ToolTipDataEntry[];
        }

        interface ToolTipDataEntry {
            dataPoint: ChartDataPoint;
            dataSeries: ChartDataSeriesOptions;
            distance: number;
            index: number;
        }
    }
}
