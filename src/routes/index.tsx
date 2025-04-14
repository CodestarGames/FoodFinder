import {
    createFileRoute,
} from '@tanstack/react-router'
import { placesQueryOptions} from '@/utils/places'

export const Route = createFileRoute('/')({
    ssr: true,
  component: PlacesComponent,
})

function PlacesComponent() {

    return (
    <main className="w-full flex flex-row ">
        What you wanna eat?
    </main>
  )
}
