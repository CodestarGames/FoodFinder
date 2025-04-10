export type PlacesAPIResultItem = {
    fsq_id: string;
    geocodes: {
        main: {
            latitude: number;
            longitude: number;
        };
    };
    name: string;
    distance: number;
    price: number;
    categories: {
        id: string;
        name: string;
    }[];
    link: string;
    rating: number;
};

export type PlacesDetailAPIResponse = 
    PlacesAPIResultItem & {
    location: {
        formatted_address: string;
    };
    description: string;
    email: string;
    tel: string;
    hours: {
        display: string;
        open_now: boolean;
    };
    verified: boolean;
    website: string;
    menu: string;
};
    
export type PlacesSearchAPIResponse = {
    results: PlacesAPIResultItem[],
    context: {
        geo_bounds: {
            circle: {
                center: {
                    latitude: number,
                    longitude: number
                },
                radius: number
            }
        }
    }
};