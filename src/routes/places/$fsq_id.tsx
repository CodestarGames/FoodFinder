import {ErrorComponent, createFileRoute} from '@tanstack/react-router'
import type { ErrorComponentProps } from '@tanstack/react-router'
import { NotFound } from '@/components/error/NotFound'
import { placeQueryOptions } from '@/utils/places'
import * as React from "react";
import {DetailsSidebar} from "@/components/details-sidebar/details-sidebar";
import {z} from 'zod';
import {PlacesDetailAPIResponse} from "@/schema/placesApi";
import {getPlace} from "@/server/api";

const geoSearchSchema = z.object({
  geo: z.object({latitude: z.number(), longitude: z.number()}),
})

type GeoSearch = z.infer<typeof geoSearchSchema>

export const Route = createFileRoute('/places/$fsq_id')({
  validateSearch: geoSearchSchema,
  loader: async ({ context, params: { fsq_id } }) => getPlace({data:{fsq_id}}),
  errorComponent: PlaceErrorComponent,
  component: PlaceComponent,
  notFoundComponent: () => {
    return <NotFound>Place not found</NotFound>
  },
})

export function PlaceErrorComponent({ error }: ErrorComponentProps) {
  return <ErrorComponent error={error} />
}

function PlaceComponent() {
  const selectedPlace: PlacesDetailAPIResponse = Route.useLoaderData();
  
  
  return (
      <DetailsSidebar place={selectedPlace} />
  )
}
