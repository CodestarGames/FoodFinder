import {createServerFn, json} from '@tanstack/react-start'
import {lruCache} from "@/api";
import axios, {type Options} from "redaxios";
import {PlacesAPIResultItem, PlacesDetailAPIResponse, type PlacesSearchAPIResponse} from "@/schema/placesApi";
import {cogentLocation, placesApiRoute, restaurantCategory} from "@/utils/constants";
import {z} from 'zod';

const Place = z.object({
    fsq_id: z.string(),
})

const options: Options = {
    headers: {
        accept: 'application/json',
        Authorization: import.meta.env.VITE_FOURSQUARE_API_KEY
    }
};

export const getPlace = createServerFn({
        method: 'GET',
        response: 'data',
    })
    .validator((place: unknown) => {
        return Place.parse(place)
    })
    .handler(async ({data}) => {

        const fields = "fsq_id,name,photos,tips,menu,geocodes,categories,location,tel,hours,rating,price,website,description";
        try {

            const cachedRes = lruCache.get(data.fsq_id);
            if (cachedRes) {
                console.info(`Returning cached place by id=${data.fsq_id}... `)
                return cachedRes;
            }
            console.info(`Fetching place by id=${data.fsq_id}... `)

            const res = await axios.get<PlacesDetailAPIResponse>(placesApiRoute + data.fsq_id + `?fields=${fields}`, options).then((r) => r.data);
            lruCache.set(data.fsq_id, res);

            return res;
        } catch (e) {
            throw e;
        }
    })

const PlaceSearch = z.object({
    keywords: z.string(),
    sortBy: z.string(),
    lucky: z.boolean(),
})

export const search = createServerFn({
        method: 'GET',
        response: 'data', 
    })
    .validator((placeSearch: unknown) => {
        return PlaceSearch.parse(placeSearch)
    })
    .handler(async ({data}) => {

        const fields = "fsq_id,name,photos,tips,menu,geocodes,categories,location,tel,hours,rating,price,website,description";
        try {

            const cachedRes = lruCache.get(data.keywords);
            if (!data.lucky && cachedRes) {
                console.info(`Returning cached place by id=${data.keywords}... `)
                if (data.lucky)
                    return getRandomPlace(cachedRes as PlacesSearchAPIResponse);

                return cachedRes;
            }

            console.info(`Fetching places by id=${data.keywords}... `)
            const res = await axios.get<PlacesSearchAPIResponse>(`${placesApiRoute}search?query=${data.keywords || ''}&ll=${cogentLocation}&categories=${restaurantCategory}&sortBy=${data.sortBy || "RELEVANCE"}&fields=${fields}&radius=1000&limit=20`, options)
                .then((r) => r.data);

            if (data.lucky)
                return getRandomPlace(res);

            lruCache.set(data.keywords, res);
            return res;
        } catch (e) {
            throw e;
        }
    })

function getRandomPlace(item: PlacesSearchAPIResponse): PlacesSearchAPIResponse {
    const index = Math.floor(Math.random() * item.results.length);
    return {results: [item.results[index]], context: item.context} as PlacesSearchAPIResponse;
}
