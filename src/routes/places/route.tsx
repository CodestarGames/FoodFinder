import {useQuery, useQueryClient, useSuspenseQuery} from '@tanstack/react-query'
import {
    Outlet,
    createFileRoute,
    useNavigate, useSearch,
} from '@tanstack/react-router'
import {MapComponent} from "@/components/map/map";
import {cogentLocation, cogentLocationTuple, PlacesSort} from "@/utils/constants";
import {Marker, Popup} from "react-leaflet";
import {LatLngTuple} from "leaflet";
import {Suspense, useEffect, useState} from "react";
import {AppSidebar} from "@/components/app-sidebar/app-sidebar";
import * as React from "react";
import {search} from "@/server/api";
import {PlacesSearchAPIResponse} from "@/schema/placesApi";


type PlacesSearch = {
    keywords: string;
    sortBy: PlacesSort;
    lucky: boolean
}
export const Route = createFileRoute('/places')({
    validateSearch: (search) : PlacesSearch => {
        return {...search} as PlacesSearch
    },
    loaderDeps: ({ search: { keywords, sortBy, lucky } }) => ({ keywords, sortBy, lucky }),
    loader: async ({ context, deps: {keywords="", sortBy="RELEVANCE", lucky=false} }) => 
        search({data:{keywords, sortBy, lucky}}),
    ssr: false,
  component: PlacesComponent,
})

function PlacesComponent() {

    const data : PlacesSearchAPIResponse = Route.useLoaderData()
    const navigate = useNavigate();
    const routeSearch = Route.useLoaderDeps()

    function getPlaceLatLon({ latitude, longitude }: { latitude: number, longitude: number }) : LatLngTuple {
        return [ latitude, longitude];
    }

    const search  = useSearch({from:"/places/$fsq_id", shouldThrow: false });
    
    const formattedGeo = search ? getPlaceLatLon(search.geo): cogentLocationTuple

    return (
    <main className="w-full flex flex-row ">
        <Suspense>
        <AppSidebar places={data?.results} />
        </Suspense>
        <Outlet />
        <Suspense>
            <MapComponent center={cogentLocationTuple} focusPoint={formattedGeo}>
                { data?.results.map(place => (
                    <><Marker riseOnHover position={getPlaceLatLon(place.geocodes.main)}
                            eventHandlers={{
                                click: (e) => {
                                    navigate({to: "/places/$fsq_id", params: {fsq_id: place.fsq_id}, search: {...routeSearch, geo: place.geocodes.main }})
                                },
                            }}
                    >
                    </Marker>
                    {search?.geo && (search.geo.latitude === place.geocodes.main.latitude 
                    && search.geo.longitude === place.geocodes.main.longitude
                    ) && <Popup position={formattedGeo} offset={[0, -32]}>
                            <div className="flex flex-col">
                                <strong>{place.name}</strong>
                                {place.categories[0].name}
                            </div>
                        </Popup>}
                    </>)) }
            </MapComponent>
        </Suspense>
        

    </main>
  )
}
