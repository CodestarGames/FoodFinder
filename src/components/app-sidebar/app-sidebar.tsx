
import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel, SidebarHeader,
    SidebarMenuButton,
    SidebarMenuItem, SidebarSeparator,
} from "@/components/ui/sidebar"
import {FC, Suspense, useState} from "react";
import {useQuery, useQueryClient, useSuspenseQuery} from "@tanstack/react-query";
import {placesQueryOptions} from "@/utils/places";
import {useLoaderDeps, useNavigate, useRouteContext, useSearch} from "@tanstack/react-router";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {
    DicesIcon,
    JapaneseYen,
    PizzaIcon,
    StarIcon,
    StarOffIcon
} from "lucide-react";
import {Card, CardContent, CardTitle} from "@/components/ui/card"; 
import {AppSidebarSearch} from "@/components/app-sidebar/app-sidebar-search";
import {PlacesAPIResultItem} from "@/schema/placesApi";
import {PlacesSort} from "@/utils/constants";




export const AppSidebar: FC<{places:PlacesAPIResultItem[]}> = ({places}) => {

    const navigate = useNavigate();
    const search  = useLoaderDeps({from:"/places" });

    const handleSearch = (str: string, sortBy: PlacesSort, lucky: boolean) => {
        navigate({to:"/places", search:{keywords:str, sortBy, lucky}})
    }
    
    return (
        <Sidebar collapsible="none" className="z-50 w-1/3 max-h-screen overflow-y-scroll overflow-x-hidden outline-1">
            <AppSidebarSearch onSearch={handleSearch}></AppSidebarSearch>
            <SidebarSeparator></SidebarSeparator>
            <SidebarContent className="overflow-x-hidden">
                <SidebarGroup>
                <SidebarGroupLabel>Results</SidebarGroupLabel>
                    <SidebarGroupContent className="flex flex-col gap-2.5">
                        {places.map(place => <SidebarMenuItem key={place.name}>
                            <SidebarMenuButton className="h-[80]" asChild>
                                <Card className="cursor-pointer" onClick={() => navigate({to:"/places/$fsq_id", params: {fsq_id: place.fsq_id}, search: {...search, geo: place.geocodes.main }})}>
                                    <CardTitle className="w-full flex flex-row items-center justify-between">
                                        {place.name}
                                        <div className="flex flex-row-1">{
                                            Array.from({length: 5}).map((_, index) => index <= Math.floor(place.rating / 2) ?
                                                <StarIcon key={index} size="16"/> : <StarOffIcon key={index} size="16"/>)
                                        }</div>
                                    </CardTitle>
                                    <CardContent className="w-full p-0">
                                        <div className="flex flex-row items-center justify-between">
                                        {place.categories[0].name}
                                        <div className="flex flex-row-1">{Array.from({length:place.price}).map((_, index) => (<JapaneseYen  key={index} className="text-muted-foreground" size="12"/>))}</div>
                                        </div>
                                        </CardContent>
                                </Card>
                            </SidebarMenuButton></SidebarMenuItem>)}

                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
        </Sidebar>
    )
}
