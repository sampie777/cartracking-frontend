import {Coords} from "google-map-react";

export interface TrackLog {
    uptimeMs?: number
    session_id?: number
    car_is_connected?: boolean
    car_is_controller_connected?: boolean
    car_is_braking?: boolean
    car_is_ignition_on?: boolean
    car_speed?: number
    car_rpm?: number
    car_odometer_start?: number
    car_odometer?: number
    car_gas_pedal_connected?: boolean
    car_gas_pedal?: number
    cruise_control_enabled?: boolean
    cruise_control_target_speed?: number
    cruise_control_virtual_gas_pedal?: number
    cruise_control_control_value?: number
    wifi_ssid?: String
    wifi_ip_addr?: number
    wifi_is_connected?: boolean
    bluetooth_connected?: boolean
    motion_connected?: boolean
    motion_accel_x?: number
    motion_accel_y?: number
    motion_accel_z?: number
    motion_gyro_x?: number
    motion_gyro_y?: number
    motion_gyro_z?: number
    motion_compass_x?: number
    motion_compass_y?: number
    motion_compass_z?: number
    motion_temperature?: number
    location_is_gps_on?: boolean
    location_quality?: number
    location_satellites?: number
    location_is_effective_positioning?: boolean
    location_latitude?: number
    location_longitude?: number
    location_altitude?: number
    location_ground_speed?: number
    location_ground_heading?: number
    location_time?: string
    modifiedAt?: string
    createdAt?: string
    id?: number
}

export interface BoundingBoxCoords {
    max: Coords
    min: Coords
}
