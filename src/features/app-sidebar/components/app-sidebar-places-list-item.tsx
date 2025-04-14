import {PlacesAPIResultItem} from "@/schema/placesApi";
import {useLoaderDeps, useNavigate} from "@tanstack/react-router";
import {SidebarMenuButton, SidebarMenuItem} from "@/components/ui/sidebar";
import {Card, CardContent, CardTitle} from "@/components/ui/card";
import {JapaneseYen} from "lucide-react";
import {FC} from "react";
import {RatingStars} from "@/components/rating-stars";


type props = {
    place: PlacesAPIResultItem;
}

const PriceRating: FC<{ price: number }> = ({price}) =>
    <div className="flex flex-row-1"> {
        Array.from({length: price}).map((_, index) => (<JapaneseYen key={index} className="text-muted-foreground" size="12"/>))
    }</div>

export const AppSidebarPlacesListItem: FC<props> = ({place}: { place: PlacesAPIResultItem }) => {
    const navigate = useNavigate();
    const search = useLoaderDeps({from: "/places"});

    function onPlaceClick(place: PlacesAPIResultItem) {
        return navigate({
            to: "/places/$fsq_id",
            params: {fsq_id: place.fsq_id},
            search: {...search, geo: place.geocodes.main}
        });
    }

    return <SidebarMenuItem>
        <SidebarMenuButton className="h-[80]" asChild>
            <Card className="cursor-pointer" onClick={() => onPlaceClick(place)}>
                <CardTitle className="w-full flex flex-row items-center justify-between">
                    {place.name}
                    <RatingStars rating={place.rating}></RatingStars>
                </CardTitle>
                <CardContent className="w-full p-0">
                    <div className="flex flex-row items-center justify-between">
                        {place.categories[0].name}
                        <PriceRating price={place.price}></PriceRating>
                    </div>
                </CardContent>
            </Card>
        </SidebarMenuButton>
    </SidebarMenuItem>
}