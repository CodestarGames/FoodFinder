import {LatLngTuple} from "leaflet";

export function getPlaceLatLon({latitude, longitude}: { latitude: number, longitude: number }): LatLngTuple {
    return [latitude, longitude];
}