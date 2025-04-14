import {PlacesDetailAPIResponse} from "@/schema/placesApi";
import {SidebarGroup, SidebarGroupContent} from "@/components/ui/sidebar";

function PlaceInfoItem({label, valueLabel, value}: { label: string, valueLabel:string, value: string }) {
    if(!value) return null;
    return (
        <div className="flex flex-row align-middle justify-between">
            <p className="text-sm">{label}</p>
            <a href={value} className="text-sm text-muted-foreground underline">{valueLabel}</a>
        </div>
    )
}
export const DetailsSidebarInfoGroup = ({place}: { place: PlacesDetailAPIResponse }) => {
    return (
        <SidebarGroup>
            <SidebarGroupContent className="pl-2 pr-2">
                <p className="text-xs mb-2">{place.description}</p>
                <PlaceInfoItem label="Website:" valueLabel="Go to Website" value={place.website}></PlaceInfoItem>
                <PlaceInfoItem label="Menu:" valueLabel="Go to Menu" value={place.menu}></PlaceInfoItem>
                <PlaceInfoItem label="Tel:" valueLabel={place.tel} value={"tel:+" + place.menu}></PlaceInfoItem>
                <div className="flex flex-row align-middle  justify-between">
                    <p className="text-sm">
                        Hours:
                    </p>
                    <ol className="text-sm at text-muted-foreground flex flex-col text-right">
                        {place.hours.display?.split(";").map((item, index) => <li key={index}>{item}</li>)}
                    </ol>
                </div>
            </SidebarGroupContent>
        </SidebarGroup>
    );
};