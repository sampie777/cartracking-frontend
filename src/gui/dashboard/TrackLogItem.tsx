import React from "react";
import {TrackLog} from "../../logic/tracks/models";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    faCalendarPlus,
    faClock, faMapMarkerAlt, faRoute, faRuler, faSlash,
    faTachometerAltAverage,
    faTachometerAltFast
} from "@fortawesome/free-solid-svg-icons";
import {format} from "../../logic/utils";

interface Props {
    item: TrackLog
}

const TrackLogItem: React.FC<Props> = ({item}) => {
    return <div className={"TrackLogItem"}>
        <span>
            <FontAwesomeIcon icon={faCalendarPlus}/>
            {format(item.createdAt + "Z", "%H:%MM")}
        </span>

        {item.car_speed === undefined ? null :
            <span>
                <FontAwesomeIcon icon={item.car_speed === 0 ? faTachometerAltAverage : faTachometerAltFast}/>
                {item.car_speed?.toFixed(1)} km/h
            </span>
        }

        <span>
            <FontAwesomeIcon icon={faMapMarkerAlt}/>
            {item.location_satellites !== undefined && item.location_satellites > 0 ? null :
                <FontAwesomeIcon icon={faSlash}/>}
            {item.location_satellites === undefined || item.location_satellites === 0 ? null :
                <>
                    {item.location_satellites} sats @&nbsp;
                    <a href={`https://maps.google.com?q=${item.location_latitude},${item.location_longitude}`}
                       rel="noreferrer"
                       target={"_blank"}>
                        {item.location_latitude},{item.location_longitude}
                    </a>
                </>}
        </span>

        {item.car_odometer === undefined ? null :
            <span>
                <FontAwesomeIcon icon={faRuler}/>
                {item.car_odometer} km
            </span>
        }

        {item.car_odometer_start === undefined || item.car_odometer === undefined ? null :
            <span>
                <FontAwesomeIcon icon={faRoute}/>
                {item.car_odometer - item.car_odometer_start} km
            </span>
        }

        {item.location_time === undefined ? null :
            <span>
                <FontAwesomeIcon icon={faClock}/>
                {format(item.location_time + "Z", "%H:%MM")}
            </span>
        }

    </div>;
};

export default TrackLogItem;
