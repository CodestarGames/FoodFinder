import { useSuspenseQuery } from '@tanstack/react-query'
import { Link, Outlet, createFileRoute } from '@tanstack/react-router'
import { placesQueryOptions } from '~/utils/places'

export const Route = createFileRoute('/places')({
  loader: async ({ context }) => {
    await context.queryClient.ensureQueryData(placesQueryOptions())
  },
  component: PlacesComponent,
})

function PlacesComponent() {
  const placesQuery = useSuspenseQuery(placesQueryOptions())
  console.log(placesQuery.data);
  return (
    <div className="p-2 flex gap-2">
      <ul className="list-disc pl-4">
        {[
          ...placesQuery.data.results,
        ].map((place) => {
          return (
            <li key={place.fsq_id} className="whitespace-nowrap">
              <Link
                to="/places/$fsq_id"
                params={{
                  fsq_id: String(place.fsq_id),
                }}
                className="block py-1 text-blue-800 hover:text-blue-600"
                activeProps={{ className: 'text-black font-bold' }}
              >
                <div>{place.name}</div>
              </Link>
            </li>
          )
        })}
      </ul>
      <hr />
      <Outlet />
    </div>
  )
}
