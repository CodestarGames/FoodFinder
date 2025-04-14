import {Sidebar, SidebarContent, SidebarSeparator,} from "@/components/ui/sidebar"
import {FC} from "react";
import {PlacesDetailAPIResponse} from "@/schema/placesApi";
import {
    DetailsSidebarHeader,
    DetailsSidebarImagesGroup,
    DetailsSidebarInfoGroup,
    DetailsSidebarReviewsGroup
} from "./components";



// Menu items.
export const DetailsSidebar: FC<{ place: PlacesDetailAPIResponse }> = ({place}) => {
    return (
        <Sidebar collapsible="none" className="z-50 w-1/2 max-h-screen overflow-y-scroll overflow-x-hidden outline-1">
            <DetailsSidebarHeader place={place}></DetailsSidebarHeader>
            <SidebarSeparator></SidebarSeparator>
            <SidebarContent className="overflow-x-hidden">
                <DetailsSidebarInfoGroup place={place}></DetailsSidebarInfoGroup>
                <DetailsSidebarImagesGroup place={place}></DetailsSidebarImagesGroup>
                <DetailsSidebarReviewsGroup place={place}></DetailsSidebarReviewsGroup>
            </SidebarContent>
        </Sidebar>
    )
}
