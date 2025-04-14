import {SidebarHeader} from "@/components/ui/sidebar";
import {DicesIcon, PizzaIcon} from "lucide-react";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {ToggleGroup, ToggleGroupItem} from "@/components/ui/toggle-group";
import {useState} from "react";
import {useNavigate, useSearch} from "@tanstack/react-router";
import {PlacesSort} from "@/schema/placesApi";

export const AppSidebarSearch: React.FC<{
    onSearch: (str: string, sortBy: PlacesSort, lucky: boolean) => void
}> = ({onSearch}) => {
    const search = useSearch({from: "/places"})
    const navigate = useNavigate();
    
    const [keywords, setKeywords] = useState<string>(search.keywords);
    const [sortBy, setSortBy] = useState<PlacesSort>("RELEVANCE");


    function onSearchTextChange(e: React.ChangeEvent<HTMLInputElement>) {
        setKeywords(e.target.value);
    }

    function handleSearch(lucky: boolean) {
        onSearch(keywords, sortBy, lucky);
    }

    function onLogoClick() {
        return navigate({to: "/places", search: {keywords: "", sortBy: "RELEVANCE", lucky: false}});
    }

    function onKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
        if (event.keyCode === 13) handleSearch(false);
    }

    function onSortValueChange(str: string) {
        return setSortBy(str as PlacesSort);
    }

    return (
        <SidebarHeader className="p-3">
            <div onClick={() => onLogoClick()} className="flex flex-row gap-2 mb-2 cursor-pointer w-1/2">
                <PizzaIcon/> Food Finder
            </div>
            <Input type="text" value={keywords} onChange={onSearchTextChange} onKeyDown={onKeyDown}
                   placeholder="Search keywords..."/>
            <Button type="submit" onClick={() => handleSearch(false)}>Search</Button>
            <Button variant="outline" onClick={() => handleSearch(true)} type="submit"><DicesIcon></DicesIcon>I'm
                feeling
                lucky</Button>
            <ToggleGroup className="w-full" variant="outline" type="single" value={sortBy}
                         onValueChange={onSortValueChange}>
                <ToggleGroupItem value="RELEVANCE" aria-label="Toggle bold">
                    <span className="p-2">Relevance</span>
                </ToggleGroupItem>
                <ToggleGroupItem value="RATING" aria-label="Toggle italic">
                    <span className="p-2">Rating</span>
                </ToggleGroupItem>
                <ToggleGroupItem value="DISTANCE" aria-label="Toggle underline">
                    <span className="p-2">Distance</span>
                </ToggleGroupItem>
            </ToggleGroup>
        </SidebarHeader>
    )
}