import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarSeparator,
} from "@/components/ui/sidebar"
import {FC} from "react";

import {useNavigate} from "@tanstack/react-router";

import {PlacesAPIResultItem, PlacesSort} from "@/schema/placesApi";
import {AppSidebarPlacesListItem, AppSidebarSearch} from "@/features/app-sidebar/components";

type props = {
    places: PlacesAPIResultItem[];
}

export const AppSidebar: FC<props> = ({places}) => {

    const navigate = useNavigate();

    const handleSearch = (str: string, sortBy: PlacesSort, lucky: boolean) => {
        navigate({to: "/places", search: {keywords: str, sortBy, lucky}})
    }
    
    return (
        <Sidebar collapsible="none" className="z-50 w-1/3 max-h-screen overflow-y-scroll overflow-x-hidden outline-1">
            <AppSidebarSearch onSearch={handleSearch}></AppSidebarSearch>
            <SidebarSeparator></SidebarSeparator>
            <SidebarContent className="overflow-x-hidden">
                <SidebarGroup>
                    <SidebarGroupLabel>Results</SidebarGroupLabel>
                    <SidebarGroupContent className="flex flex-col gap-2.5">
                        {
                            places.map((place, index) => <AppSidebarPlacesListItem key={index} place={place}/>)
                        }
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
        </Sidebar>
    )
}
