import { json } from '@tanstack/react-start'
import { createAPIFileRoute } from '@tanstack/react-start/api'
import axios, { type Options} from 'redaxios'

import {type PlacesAPIResultItem, PlacesDetailAPIResponse} from "~/schema/placesApi";

const options: Options = {
  headers: {
    accept: 'application/json',
    Authorization: import.meta.env.VITE_FOURSQUARE_API_KEY
  }
};

export const APIRoute = createAPIFileRoute('/api/place/$fsq_id')({
  GET: async ({ request, params }) => {
    console.info(`Fetching place by id=${params.fsq_id}... @`, request.url)
    try {
      const res = await axios.get<PlacesDetailAPIResponse>('https://api.foursquare.com/v3/places/' + params.fsq_id, options);

      return json(res);
    } catch (e) {
      console.error(e)
      return json({ error: 'Place not found' }, { status: 404 })
    }
  },
})
