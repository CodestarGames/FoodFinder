import { queryOptions } from '@tanstack/react-query'
import axios from 'redaxios'
import {PlacesAPIResultItem, PlacesDetailAPIResponse, PlacesSearchAPIResponse} from "~/schema/placesApi";

export const DEPLOY_URL = 'http://localhost:3000'

export const placesQueryOptions = (keywords = "") =>
  queryOptions({
    queryKey: ['places'],
    queryFn: () =>
      axios
        .get<PlacesSearchAPIResponse>(DEPLOY_URL + '/api/places/search/' + keywords)
        .then((r) => r.data)
        .catch(() => {
          throw new Error('Failed to fetch places')
        }),
  })

export const placeQueryOptions = (fsq_id: string) =>
  queryOptions({
    queryKey: ['place', fsq_id],
    queryFn: () =>
      axios
        .get<PlacesDetailAPIResponse>(DEPLOY_URL + '/api/places/' + fsq_id)
        .then((r) => r.data)
        .catch(() => {
          throw new Error('Failed to fetch place')
        }),
  })
