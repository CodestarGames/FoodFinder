import { json } from '@tanstack/react-start'
import { createAPIFileRoute } from '@tanstack/react-start/api'
import axios, {type Options} from 'redaxios'

import {type PlacesSearchAPIResponse} from "~/schema/placesApi";
import {cogentLocation, restaurantCategory} from "~/utils/constants";

const options: Options = {
  headers: {
    accept: 'application/json',
    Authorization: import.meta.env.VITE_FOURSQUARE_API_KEY,
  }
};

export const APIRoute = createAPIFileRoute('/api/places/$keywords')({
  GET: async ({ request, params }) => {
    console.info(`Fetching places by id=${params.keywords}... @`, request.url)
    try {

      const res = await axios.get<PlacesSearchAPIResponse>(`https://api.foursquare.com/v3/places/search?query=${params.keywords || ''}&ll=${cogentLocation}&categories=${restaurantCategory}`, options)
      .then((r) => r.data);
      return json(res);
    } catch (e) {
      console.error(e)
      return json({ error: 'Places not found by keyword.' }, { status: 404 })
    }
  },
})
