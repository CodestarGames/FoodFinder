import {
    Sidebar,
    SidebarContent, SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel, SidebarHeader, SidebarSeparator,
} from "@/components/ui/sidebar"
import {FC} from "react";
import { PlacesDetailAPIResponse} from "@/schema/placesApi";


import {
    Carousel, 
    CarouselMainContainer,
    CarouselNext,
    CarouselPrevious,
    CarouselThumbsContainer,
    SliderMainItem,
    SliderThumbItem
} from "@/components/ui/carousel";
import {Card, CardContent, CardFooter} from "@/components/ui/card";
import {Button} from "@/components/ui/button";
import {ChevronLeft, SidebarCloseIcon, StarIcon, StarOffIcon, UserCircleIcon, XIcon} from "lucide-react";
import {format, toDate} from "date-fns";
import {useLoaderDeps, useNavigate} from "@tanstack/react-router";

// Menu items.
export const DetailsSidebar: FC<{ place: PlacesDetailAPIResponse }> = ({place}) => {
    const navigate = useNavigate()
    const search  = useLoaderDeps({from:"/places" });
    return (
        <Sidebar collapsible="none" className="z-50 w-1/2 max-h-screen overflow-y-scroll overflow-x-hidden outline-1">
            <SidebarHeader className="p-3">
                <header className="text-lg"><Button onClick={() => navigate({to:"/places", search})} className="mr-3" variant="outline" size="icon"><ChevronLeft></ChevronLeft></Button>{place.name}</header>
                <span className="text-xs">{place.categories[0].name}</span>
                <p className="text-xs">{place.location.formatted_address}</p>
                <div className="flex text-sm flex-row items-center gap-2">
                    <strong>Rating: {place.rating}</strong>
                    {
                        Array.from({length: 5}).map((_, index) => index <= Math.floor(place.rating / 2) ?
                            <StarIcon key={index} size="16" /> : <StarOffIcon key={index} size="16" />)
                    }
                </div>

                <Button asChild><a href={`https://www.google.com/maps/search/?api=1&query=${place.location.formatted_address} ${place.name}`}>Navigate</a></Button>
            </SidebarHeader>
            <SidebarSeparator></SidebarSeparator>
            <SidebarContent className="overflow-x-hidden">
                {place.description && <SidebarGroup>
                    <SidebarGroupContent className="pl-2 pr-2">
                        <SidebarGroupLabel>Description</SidebarGroupLabel>
                        <p className="text-sm p-2">{place.description}</p>
                    </SidebarGroupContent>
                </SidebarGroup>}
                <SidebarSeparator></SidebarSeparator>
                <SidebarGroup>
                    <SidebarGroupContent className="pl-2 pr-2">
                        <div className="flex flex-row align-middle  justify-between">
                            <p className="text-sm">
                                Website
                            </p>
                            {place.website ?
                                <a href={place.website} className="text-sm text-muted-foreground underline">
                                    Go to site
                                </a> : <div/>}
                        </div>
                        <div className="flex flex-row align-middle justify-between">
                            <p className="text-sm">
                                Tel
                            </p>
                            <a href={"tel:+" + place.tel} className="text-sm text-muted-foreground underline">
                                {place.tel}
                            </a>
                        </div>
                        <div className="flex flex-row align-middle  justify-between">
                            <p className="text-sm">
                                Hours
                            </p>
                            <ol className="text-sm at text-muted-foreground flex flex-col text-right">
                                {place.hours.display?.split(";").map((item, index) => <li  key={index}>{item}</li>)}
                            </ol>
                        </div>
                    </SidebarGroupContent>
                </SidebarGroup>
                <SidebarGroup>
                <SidebarGroupContent className="pl-2 pr-2">
                        <SidebarGroupLabel>Photos</SidebarGroupLabel>
                        <Carousel>
                            <CarouselNext className="top-1/3 -translate-y-1/3"/>
                            <CarouselPrevious className="top-1/3 -translate-y-1/3"/>
                            <CarouselMainContainer className="h-60">
                                {place.photos?.map((photo, index) => (
                                    <SliderMainItem key={index} className="bg-transparent">
                                        <img className="outline outline-1 outline-border size-full flex items-center justify-center rounded-xl bg-background" alt={photo.id} src={photo.prefix + '480x360' + photo.suffix}/>
                                    </SliderMainItem>
                                ))}
                            </CarouselMainContainer>
                            <CarouselThumbsContainer>
                                {place.photos?.map((photo, index) => (
                                    <SliderThumbItem key={index} index={index} className="bg-transparent">
                                    <img className="outline outline-1 outline-border size-full flex items-center justify-center rounded-xl bg-background" alt={photo.id} src={photo.prefix + '320x240' + photo.suffix}/>
                                    </SliderThumbItem>
                                ))}
                            </CarouselThumbsContainer>
                        </Carousel>
                    </SidebarGroupContent>
                </SidebarGroup>
                <SidebarGroup className="">
                <SidebarGroupLabel>Reviews</SidebarGroupLabel>
                    <SidebarGroupContent className="flex flex-col gap-2.5 p-3">
                        {place.tips?.map(tip => (
                        <Card className="p-3">
                            <CardContent>
                                <div className="text-sm text-muted-foreground">
                                    {tip.text}
                                </div>
                            </CardContent>
                            <CardFooter className="flex flex-row items-center gap-2"><UserCircleIcon size="32" ></UserCircleIcon><span className="text-xs ">{format(toDate(tip.created_at), 'yyyy LLL dd')}</span></CardFooter>
                        </Card>
                        ))}
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
            <SidebarFooter>

            </SidebarFooter>
        </Sidebar>
    )
}
