import { useSuspenseQuery } from '@tanstack/react-query'
import { ErrorComponent, createFileRoute } from '@tanstack/react-router'
import type { ErrorComponentProps } from '@tanstack/react-router'
import { NotFound } from '~/components/NotFound'
import { placeQueryOptions } from '~/utils/places'

export const Route = createFileRoute('/places/$fsq_id')({
  loader: async ({ context, params: { fsq_id } }) => {
    await context.queryClient.ensureQueryData(placeQueryOptions(fsq_id))
  },
  errorComponent: UserErrorComponent,
  component: PlaceComponent,
  notFoundComponent: () => {
    return <NotFound>Place not found</NotFound>
  },
})

export function UserErrorComponent({ error }: ErrorComponentProps) {
  return <ErrorComponent error={error} />
}

function PlaceComponent() {
  const params = Route.useParams()
  const placeQuery = useSuspenseQuery(placeQueryOptions(params.fsq_id))
  const place = placeQuery.data

  return (
    <div className="space-y-2">
      <h4 className="text-xl font-bold underline">{place.name}</h4>
      <div className="text-sm">{JSON.stringify(place, null, 2)}</div>
    </div>
  )
}
