import { queryOptions } from '@tanstack/react-query'

import {getPlace, search} from "@/server/api";

export const DEPLOY_URL = 'http://localhost:3000'

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
