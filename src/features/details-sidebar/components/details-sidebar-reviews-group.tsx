import {PlacesDetailAPIResponse} from "@/schema/placesApi";
import {SidebarGroup, SidebarGroupContent, SidebarGroupLabel} from "@/components/ui/sidebar";
import {Card, CardContent, CardFooter} from "@/components/ui/card";
import {UserCircleIcon} from "lucide-react";
import {format, toDate} from "date-fns";

export const DetailsSidebarReviewsGroup = ({place}: { place: PlacesDetailAPIResponse }) => (
    <SidebarGroup>
        <SidebarGroupLabel>Reviews</SidebarGroupLabel>
        <SidebarGroupContent className="flex flex-col gap-2.5 p-3">
            {place.tips?.map(tip => (
                <Card className="p-3">
                    <CardContent className="text-sm text-muted-foreground">
                        {tip.text}
                    </CardContent>
                    <CardFooter className="flex flex-row items-center gap-2">
                        <UserCircleIcon size="32"/>
                        <span className="text-xs ">{format(toDate(tip.created_at), 'yyyy LLL dd')}</span>
                    </CardFooter>
                </Card>
            ))}
        </SidebarGroupContent>
    </SidebarGroup>
);