import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/places/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/places/"!</div>
}
