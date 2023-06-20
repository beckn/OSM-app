import { MapContainer, TileLayer, Marker, Popup, useMap, useMapEvents } from "react-leaflet";
import React, { useEffect, useState } from "react";
import "leaflet/dist/leaflet.css";
import Icon from "./store-marker.svg";
import L from "leaflet";


const data = [
	{ "lat": 28.539, "long": 77.393 },
	{ "lat": 28.537, "long": 77.389 },
	{ "lat": 28.534, "long": 77.388 },
	{ "lat": 28.533, "long": 77.394 },
	{ "lat": 28.536, "long": 77.397 },
	{ "lat": 28.538, "long": 77.392 },
	{ "lat": 28.532, "long": 77.391 },
	{ "lat": 28.535, "long": 77.390 },
	{ "lat": 28.537, "long": 77.395 },
	{ "lat": 28.533, "long": 77.393 }
]


export default function Map({  }) {

	const coords = { latitude: 28.535, longitude: 77.393 };
	const { latitude, longitude } = coords;


	// const customIcon = new L.Icon({
	// 	iconUrl: Icon,
	// 	iconSize: [25, 35],
	// 	iconAnchor: [5, 30]
	// });

	function MapView() {
		let map = useMap();
		map.setView([latitude, longitude], map.getZoom());

		return null;
	}




	return (
		
			
				 <MapContainer
				 style={{ height: '100vh' }}
			center={[latitude, longitude]}
			zoom={13}
			scrollWheelZoom={true}
		>
			<TileLayer
				attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> 
        contributors'
				url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
			/>
			{/* {
				data.map((item) => {
					return (
						<Marker key={item.long}  position={[item.lat, item.long]}
							eventHandlers={{
								click: () => {
								},
							}}
						>
						</Marker>
					)
				})

			} */}
			<MapView />
		</MapContainer>

		
	);
}