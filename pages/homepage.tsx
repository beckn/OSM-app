import React,{useEffect,useState} from 'react'
import dynamic from 'next/dynamic';


type Coords = {
  lat: number;
  long: number;
};

import MapSearch from '../components/Map/MapSearch';

 const  homepage = ()=> {

	const MapWithNoSSR = dynamic(() => import("../components/Map"), {
    ssr: false
  });

// create a state value called query in typescript
const [query,setQuery] = useState<string>("");
const [coords,setCoords] = useState<Coords>({ lat: 46.603354, long: 1.8883335 });


useEffect(() => {
	if(query.length < 1) return; 
	let url = "https://nominatim.openstreetmap.org/search?format=jsonv2" +
	"&q=" + query ;

fetch(url, {
	method: "GET",
	mode: 'cors',
	headers: {
		"Access-Control-Allow-Origin": "https://o2cj2q.csb.app"
	}
})
	.then((response) => response.json())
	.then((data) => {
		setCoords({lat: data[0].lat, long: data[0].lon})
	});
},[query])


	return (
		<div>
			<MapSearch setQuery={setQuery} />
			
			<MapWithNoSSR coords={coords}  />


		</div>
	)
}

export default homepage;
