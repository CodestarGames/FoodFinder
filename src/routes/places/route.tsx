import {
    Outlet,
    createFileRoute,
    useNavigate, useSearch,
} from '@tanstack/react-router'
import {MapComponent} from "@/features/map";
import {cogentLocationTuple} from "@/utils/constants";
import {Marker, Popup} from "react-leaflet";
import {Suspense} from "react";
import {AppSidebar} from "@/features/app-sidebar";
import * as React from "react";
import {search} from "@/server/api";
import {PlacesAPIResultItem, PlacesSearchAPIResponse, PlacesSort} from "@/schema/placesApi";
import {getPlaceLatLon} from "@/utils/places";
import Leafet from "leaflet";

type PlacesSearch = {
    keywords: string;
    sortBy: PlacesSort;
    lucky: boolean
}


const markerIcon = new Leafet.Icon({
    iconUrl: "/map-pin.svg",
    iconSize: new Leafet.Point(40, 40),
});

export const Route = createFileRoute('/places')({
    validateSearch: (search): PlacesSearch => ({...search} as PlacesSearch),
    loaderDeps: ({search: {keywords, sortBy, lucky}}) => ({keywords, sortBy, lucky}),
    loader: async ({deps: {keywords = "", sortBy = "RELEVANCE", lucky = false}}) => search({
        data: {
            keywords,
            sortBy,
            lucky
        }
    }),
    ssr: false,
    component: PlacesComponent,
})

function PlaceMarker({place}: { place: PlacesAPIResultItem }) {
    const navigate = useNavigate();
    const routeSearch = useSearch({from: "/places"})
    const search = useSearch({from: "/places/$fsq_id", shouldThrow: false});

    const showPopup = search?.geo && (search.geo.latitude === place.geocodes.main.latitude && search.geo.longitude === place.geocodes.main.longitude);
    const eventHandlers = {
        click: (e: unknown) => {
            navigate({
                to: "/places/$fsq_id",
                params: {fsq_id: place.fsq_id},
                search: {...routeSearch, geo: place.geocodes.main}
            })
        }
    }

    return (
        <>
            <Marker icon={markerIcon} riseOnHover position={getPlaceLatLon(place.geocodes.main)} eventHandlers={eventHandlers}/>
            {
                showPopup && <Popup position={getPlaceLatLon(search.geo)} offset={[0, -8]}>
                    <div className="flex flex-col">
                        <strong>{place.name}</strong>
                        {place.categories[0].name}
                    </div>
                </Popup>
            }
        </>
    );

}

function PlacesComponent() {

    const data: PlacesSearchAPIResponse = Route.useLoaderData()
    const navigate = useNavigate();
    const routeSearch = Route.useLoaderDeps()
    const search = useSearch({from: "/places/$fsq_id", shouldThrow: false});
    const formattedGeo = search ? getPlaceLatLon(search.geo) : cogentLocationTuple

    return (
        <main className="w-full flex flex-row ">
            <Suspense>
                <AppSidebar places={data?.results}/>
            </Suspense>
            <Outlet/>
            <MapComponent center={cogentLocationTuple} focusPoint={formattedGeo}>
                {data?.results.map((place, index) => <PlaceMarker place={place} key={index}/>)}
            </MapComponent>
        </main>
    )
}
