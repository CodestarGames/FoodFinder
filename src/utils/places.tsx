import { queryOptions } from '@tanstack/react-query'

import {getPlace, search} from "@/server/api";
import {LatLngTuple} from "leaflet";

export const DEPLOY_URL = 'http://localhost:3000'

export function getPlaceLatLon({latitude, longitude}: { latitude: number, longitude: number }): LatLngTuple {
    return [latitude, longitude];
}
export const placesQueryOptions = (keywords="") =>
  queryOptions({
    queryKey: ['places', {keywords}],
    queryFn: () => search({data: {keywords}})
  })

export const placeQueryOptions = (fsq_id: string) =>
  queryOptions({
    queryKey: ['place', fsq_id],
    queryFn: () => getPlace({data:{fsq_id}})
  })
