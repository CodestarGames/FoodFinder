import {PlacesDetailAPIResponse} from "@/schema/placesApi";
import {SidebarHeader} from "@/components/ui/sidebar";
import {Button} from "@/components/ui/button";
import {ChevronLeft} from "lucide-react";
import {useLoaderDeps, useNavigate} from "@tanstack/react-router";
import {RatingStars} from "@/components/rating-stars";
export const DetailsSidebarHeader = ({place}: { place: PlacesDetailAPIResponse }) => {
    const navigate = useNavigate()
    const search = useLoaderDeps({from: "/places"});

    function onCloseSidebar() {
        return navigate({to: "/places", search});
    }
    
    return (
        <SidebarHeader className="p-3">
            <header className="text-lg">
                <Button onClick={() => onCloseSidebar()} className="mr-3" variant="outline" size="icon">
                    <ChevronLeft/>
                </Button>
                {place.name}
            </header>
            <span className="text-xs">{place.categories[0].name}</span>
            <p className="text-xs">{place.location.formatted_address}</p>
            <div className="flex text-sm flex-row items-center gap-2">
                <strong>Rating: {place.rating}</strong>
                <RatingStars rating={place.rating}></RatingStars>
            </div>
            <Button asChild>
                <a href={`https://www.google.com/maps/search/?api=1&query=${place.location.formatted_address} ${place.name}`}>
                    Navigate
                </a>
            </Button>
        </SidebarHeader>
    )

};