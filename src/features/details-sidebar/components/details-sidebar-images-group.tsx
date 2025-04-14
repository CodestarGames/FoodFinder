import {PlacesDetailAPIResponse} from "@/schema/placesApi";
import {SidebarGroup, SidebarGroupContent, SidebarGroupLabel} from "@/components/ui/sidebar";
import {
    Carousel,
    CarouselMainContainer,
    CarouselNext,
    CarouselPrevious, CarouselThumbsContainer,
    SliderMainItem, SliderThumbItem
} from "@/components/ui/carousel";

export const DetailsSidebarImagesGroup = ({place}: { place: PlacesDetailAPIResponse }) => (
    <SidebarGroup>
        <SidebarGroupContent className="pl-2 pr-2">
            <SidebarGroupLabel>Photos</SidebarGroupLabel>
            <Carousel>
                <CarouselNext className="top-1/3 -translate-y-1/3"/>
                <CarouselPrevious className="top-1/3 -translate-y-1/3"/>
                <CarouselMainContainer className="h-60">
                    {place.photos?.map((photo, index) => (
                        <SliderMainItem key={index} className="bg-transparent">
                            <img
                                className="outline outline-border size-full flex items-center justify-center rounded-xl bg-background"
                                alt={photo.id} src={photo.prefix + '480x360' + photo.suffix}/>
                        </SliderMainItem>
                    ))}
                </CarouselMainContainer>
                <CarouselThumbsContainer>
                    {place.photos?.map((photo, index) => (
                        <SliderThumbItem key={index} index={index} className="bg-transparent">
                            <img
                                className="outline outline-border size-full flex items-center justify-center rounded-xl bg-background"
                                alt={photo.id} src={photo.prefix + '320x240' + photo.suffix}/>
                        </SliderThumbItem>
                    ))}
                </CarouselThumbsContainer>
            </Carousel>
        </SidebarGroupContent>
    </SidebarGroup>
);
