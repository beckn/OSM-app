import { MapContainer, TileLayer, Marker, Popup, useMap, useMapEvents } from "react-leaflet";
import React, { useEffect, useState } from "react";
import Control from "react-leaflet-custom-control";
import "leaflet/dist/leaflet.css";
import {GiHamburgerMenu} from 'react-icons/gi'
import {data} from "./StoreMarkerData";
import Icon from "./store-marker.svg";
import L from "leaflet";
import { IoReloadCircleOutline } from "react-icons/io5";



interface MapProps {

	coords: {lat:number, long:number}
}


const Map:React.FC<MapProps> = ({coords})=> {

	const { lat, long } = coords;
	const [userLocation, setUserLocation] = useState<[number, number] | null>(null);
	const [flyToUserLocation, setFlyToUserLocation] = useState(false);

  useEffect(() => {
    // Get the user's current location using the browser's geolocation API
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setUserLocation([position.coords.latitude, position.coords.longitude]);
      },
      (error) => {
        console.error('Error getting user location:', error);
      }
    );
  }, []);

  // Custom hook to zoom the map to the user's location
  const ZoomToUserLocation = () => {
		let map = useMap();
    
    if (userLocation && flyToUserLocation ) {
      map.flyTo(userLocation, 12);
    }
		// if(flyToUserLocation) setFlyToUserLocation(false);

    return null;
  };


	


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
			zoomControl={false}
			scrollWheelZoom={true}
			zoomAnimation={true}
		>
			<TileLayer
				attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> 
        contributors'
				url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
			/>
			 <Control prepend position='topright'>
				<div className="flex flex-col basis-4">
				<button><img src="/images/hamburger1.svg" alt="..." /></button>
				<button onClick={()=>setFlyToUserLocation(true)}><img src="/images/Location.svg" alt="..." /></button>
				</div>
  </Control>
			
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
			
			<MapView />
			<ZoomToUserLocation />
		</MapContainer>

		
			
				 

		
	);
}

export default Map;