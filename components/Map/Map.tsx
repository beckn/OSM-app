import { MapContainer, TileLayer, Marker, Popup, useMap, useMapEvents } from "react-leaflet";
import React, { useEffect, useState } from "react";
import "leaflet/dist/leaflet.css";
import {data} from "./StoreMarkerData";
import Icon from "./store-marker.svg";
import L from "leaflet";



interface MapProps {

	coords: {lat:number, long:number}
}


const Map:React.FC<MapProps> = ({coords})=> {

	const { lat, long } = coords;
	


	const customIcon = new L.Icon({
		iconUrl: Icon,
		iconSize: [25, 35],
		iconAnchor: [5, 30]
	});

	function MapView() {
		let map = useMap();
		map.setView([lat, long], map.getZoom());

		return null;
	}




	return (
		
			
				 <MapContainer
				 style={{ height: '100vh' }}
			center={[lat, long]}
			zoom={13}
			scrollWheelZoom={true}
		>
			<TileLayer
				attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> 
        contributors'
				url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
			/>
			{
				data.elements.map((item:any) => {
					return (
						<Marker icon={customIcon} key={item.lon}  position={[item.lat, item.lon]}
							eventHandlers={{
								click: () => {
								},
							}}
						>
						</Marker>
					)
				})

			}
									<Marker icon={customIcon}   position={[46.603354, 1.8883335]}
							eventHandlers={{
								click: () => {
								},
							}}
						>
						</Marker>
			
			<MapView />
		</MapContainer>

		
	);
}

export default Map;