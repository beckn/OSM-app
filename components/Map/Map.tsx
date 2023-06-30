import { MapContainer, TileLayer, Marker, Popup, useMap, useMapEvents } from "react-leaflet";
import React, { useEffect, useState } from "react";
import Control from "react-leaflet-custom-control";
import "leaflet/dist/leaflet.css";
import {GiHamburgerMenu} from 'react-icons/gi'
import {data} from "./StoreMarkerData";
import Icon from "./store-marker.svg";
import SelectedIcon from './selectedMarker.svg'
import L from "leaflet";
import { isEmpty } from "lodash";



interface MapProps {

	coords: {lat:number, long:number}
	handleModalOpen: ()=>void;
	handleOptionDetailOpen: ()=>void;
	setSelectedStore: React.Dispatch<React.SetStateAction<any>>;
	selectedStore:any;
	// Using any for now since exact structure is not clear
	stores:any[];
}


const Map:React.FC<MapProps> = ({stores,selectedStore,coords,handleModalOpen,handleOptionDetailOpen,setSelectedStore})=> {

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

    return null;
  };


	


	const customIcon = new L.Icon({
		iconUrl: Icon,
		iconSize: [25, 35],
		iconAnchor: [5, 30]
	});


	const customSelectedIcon = new L.Icon({
		iconUrl: SelectedIcon,
		iconSize: [30, 40],
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
				<button onClick={(e)=>handleModalOpen()}><img src="/images/menuham.svg" alt="..." /></button>
				<button onClick={()=>setFlyToUserLocation(true)}><img src="/images/Location.svg" alt="..." /></button>
				</div>
  </Control>
			
			{
				!isEmpty(stores) && stores.map((item:any,index:number) => {
					const isSelected = item.lat === selectedStore?.lat && item.lon === selectedStore?.lon;
					const IconToUse = isSelected ? customSelectedIcon : customIcon
return (
						<Marker icon={IconToUse} key={item.lon}  position={[item.lat, item.lon]}
							eventHandlers={{
								click: () => {
									setSelectedStore(item);
									handleOptionDetailOpen()
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

// React memo not working for some reason
//TODO Needed because the map is re-rendered even if the co-ords are same causing a flickering issue on the map. Will fix this later
export default React.memo(Map, (prevProps, nextProps) => {
	if (prevProps.coords.lat === nextProps.coords.lat && prevProps.coords.long === nextProps.coords.long) {
		return true;
	}
	return false;
});