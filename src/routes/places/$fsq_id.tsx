import {ErrorComponent, createFileRoute} from '@tanstack/react-router'
import type {ErrorComponentProps} from '@tanstack/react-router'
import * as React from "react";
import {DetailsSidebar} from "@/features/details-sidebar";
import {z} from 'zod';
import {PlacesDetailAPIResponse} from "@/schema/placesApi";
import {getPlace} from "@/server/api";

const geoSearchSchema = z.object({
    geo: z.object({latitude: z.number(), longitude: z.number()}),
})

export const Route = createFileRoute('/places/$fsq_id')({
    validateSearch: geoSearchSchema,
    loader: async ({context, params: {fsq_id}}) => getPlace({data: {fsq_id}}),
    ssr: true,
    errorComponent: PlaceErrorComponent,
    component: PlaceComponent,
})

export function PlaceErrorComponent({error}: ErrorComponentProps) {
    return <ErrorComponent error={error}/>
}

function PlaceComponent() {
    const place: PlacesDetailAPIResponse = Route.useLoaderData();
    return <DetailsSidebar place={place}/>

}
