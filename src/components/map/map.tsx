import {Circle, MapContainer, Marker, Popup, TileLayer, useMapEvents} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import Leafet, {LatLngExpression, LatLngTuple, Map} from "leaflet";
import {useEffect, useRef} from "react";
import {useNavigate} from "@tanstack/react-router";

type MapComponentInput = {
    center: LatLngTuple;
    children: React.ReactNode;
    focusPoint?: LatLngTuple;
};

const cogentIcon = new Leafet.Icon({
    iconUrl: "/cogent.svg",
    iconSize: new Leafet.Point(40, 40),
});

export function CogentMarker({position, children}: { position: LatLngTuple; children: React.ReactNode }) {
    return (
        <Marker position={position} icon={cogentIcon}>
            {children}
        </Marker>
    );
}

export function MapComponent({
                                 center,
                                 children,
                                 focusPoint,
                             }: Readonly<MapComponentInput>) {
    
    const mapRef = useRef<Map>(null);
    const containerRef = useRef(null);
    
    useEffect(() => {
        const map = mapRef.current;

        const container = containerRef.current;
        if(container) {
            const resizeObserver = new ResizeObserver(() => {
                if (map) {
                    map.invalidateSize();
                }
            });

            resizeObserver.observe(container);

            return () => {
                resizeObserver.unobserve(container);
            };
        }
    }, []);


    useEffect(() => {
        const map = mapRef.current;
        if(map) { 
            map.flyTo(focusPoint as LatLngExpression);
            map.invalidateSize();
        }
    }, [focusPoint]);
    
    return (
        <div ref={containerRef} style={{width: '100%', height: '400px'}}>
            <MapContainer
                className="z-10"
                center={focusPoint ?? center}
                zoom={15}
                ref={mapRef}
                scrollWheelZoom={true}
                closePopupOnClick={true}
                style={{height: "100vh", width: "100%", minHeight: "100%"}}
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Circle
                    center={center}
                    radius={1000}
                    fillColor="#dec6ff"
                    fillOpacity={0.3}
                    color="#ab5cff"
                    opacity={0.6}
                ></Circle>
                <CogentMarker position={center}>
                    <Popup offset={[1.2, 0]}>
                        <div className="flex flex-col">
                            Hello from Cogent Labs!
                        </div>
                    </Popup>
                </CogentMarker>
                {children}
            </MapContainer>
        </div>
            );
}