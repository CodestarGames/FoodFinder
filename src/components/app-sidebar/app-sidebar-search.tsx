import {SidebarHeader} from "@/components/ui/sidebar";
import {DicesIcon, PizzaIcon} from "lucide-react";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {ToggleGroup, ToggleGroupItem} from "@/components/ui/toggle-group";
import {useEffect, useState} from "react";
import {PlacesSort} from "@/utils/constants";
export const AppSidebarSearch : React.FC<{onSearch: (str: string, sortBy: PlacesSort, lucky: boolean) => void}> = ({onSearch})=> {
    const [keywords, setKeywords] = useState<string>("");
    const [sortBy, setSortBy] = useState<PlacesSort>("RELEVANCE");

    function onSearchTextChange  (e) {
        setKeywords(e.target.value);
    }

    function handleSearch(lucky: boolean) {
        onSearch(keywords, sortBy, lucky);
    }

    return (<SidebarHeader className="p-3">
        <header className="flex flex-row gap-2 mb-2"><PizzaIcon/> Food Finder</header>
        <div className="flex w-full max-w-sm items-center space-x-2">
            <Input type="text" value={keywords} onChange={onSearchTextChange} placeholder="Search keywords..."/>
        </div>
        <Button type="submit" onClick={() => handleSearch(false)}>Search</Button>
        <Button variant="outline" onClick={() => handleSearch(true)} type="submit"><DicesIcon></DicesIcon>I'm feeling lucky</Button>
        <ToggleGroup  variant="outline" type="single" value={sortBy} onValueChange={(e) => setSortBy(e as PlacesSort)} >
            <ToggleGroupItem value="RELEVANCE" aria-label="Toggle bold">
                <span className="p-2">Relevance</span>
            </ToggleGroupItem>
            <ToggleGroupItem  value="RATING" aria-label="Toggle italic">
                <span className="p-2">Rating</span>
            </ToggleGroupItem>
            <ToggleGroupItem value="DISTANCE" aria-label="Toggle underline">
                <span className="p-2">Rating</span>
            </ToggleGroupItem>
        </ToggleGroup>
    </SidebarHeader>)
}