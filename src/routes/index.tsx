import {
    createFileRoute, useNavigate,
} from '@tanstack/react-router'
import {PizzaIcon} from "lucide-react";
import {ShimmerButton} from "@/components/magicui/shimmer-button";

export const Route = createFileRoute('/')({
    ssr: true,
    component: PlacesComponent,
})

function PlacesComponent() {
    const navigate = useNavigate();

    function onClickCTA() {
        return navigate({to: "/places", search: {keywords: "", sortBy: "RELEVANCE", lucky: false}});
    }

    return (
        <main className="w-full ">
            <div className="relative flex h-full w-full flex-col items-center justify-center overflow-hidden gap-5 rounded-lg border bg-background">
                <div className="flex flex-row items-center gap-5">
                    <PizzaIcon size={50}/>
                    <span className="pointer-events-none whitespace-pre-wrap bg-gradient-to-b from-black to-gray-500/90 bg-clip-text text-center text-6xl font-semibold leading-none text-transparent dark:from-white dark:to-slate-900/10">
                        Food Finder
                    </span>
                </div>
                <ShimmerButton onClick={onClickCTA} className="shadow-2xl">
                  <span className="whitespace-pre-wrap text-center text-sm font-medium leading-none tracking-tight text-white dark:from-white dark:to-slate-900/10 lg:text-lg">
                    Let's eat!
                  </span>
                </ShimmerButton>
            </div>
        </main>
    )


}
