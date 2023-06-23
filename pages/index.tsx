import React, { Profiler, useEffect, useState } from 'react'
import dynamic from 'next/dynamic';
import BottomModal from '../components/BottomModal';
import OptionCard from '../components/Map/OptionCard';
import { GiHospital } from 'react-icons/gi';
import { optionData } from '../components/Map/StoreMarkerData';
import { useRouter } from 'next/router'
 



type Coords = {
	lat: number;
	long: number;
};

import MapSearch from '../components/Map/MapSearch';

const homepage = () => {

	const MapWithNoSSR = dynamic(() => import("../components/Map"), {
		ssr: false
	});

	// create a state value called query in typescript
	const [query, setQuery] = useState<string>("");
	const [coords, setCoords] = useState<Coords>({ lat: 46.603354, long: 1.8883335 });
	const [isOptionModalOpen, setIsOptionModalOpen] = useState<boolean>(false);
	const [isOptionDetailOpen, setIsOptionDetailOpen] = useState<boolean>(false);
	const [option, setOption] = useState<{ tagName: string; tagValue: string; }>({
		tagName: "amenity",
		tagValue: "restaurant"
	});
	const [selectedStore, setSelectedStore] = useState<any>(null);
	const router = useRouter();



	//TODO Pseudo loading for now. Need to figure out to do this using map load events
	const [mapLoading,setMapLoading] = useState<boolean>(false);


	useEffect(()=>{
		setMapLoading(true);
		setTimeout(()=>{
			setMapLoading(false)
		},1000)

	},[query])



	 const handleModalOpen = () => {
		setIsOptionModalOpen((prevState) => (!prevState));
			 }

	const handleModalClose = () => {
		setIsOptionModalOpen(false);
	}


	const handleOptionDetailOpen = () => {
		setIsOptionDetailOpen((prevState) => (!prevState));
	}

	const handleOptionDetailClose = () => {
		setIsOptionDetailOpen(false);
	}


	const fetchLocationByQuery = (query: string) => {
		let url = "https://nominatim.openstreetmap.org/search?format=jsonv2" +
			"&q=" + query;
		fetch(url, {
			method: "GET",
			mode: 'cors',
			headers: {
				"Access-Control-Allow-Origin": "https://o2cj2q.csb.app"
			}
		})
			.then((response) => response.json())
			.then((data) => {
				setCoords({ lat: data[0].lat, long: data[0].lon })
			});

	}

	const fetchStoresByLocation = (lat: number, long: number, tagValue: string, tagName: string) => {

		// using fetch because axios showing cors error. Discuss with team
		let url = `https://api.osm-dev.becknprotocol.io/stores?tagName=${tagName}&tagValue=${tagValue}&latitude=${lat}&longitude=${long}`;

		fetch(url, {
			method: "GET",
			mode: 'no-cors',

		})
			.then((response) => console.log("Logging the stores data for now", response))


	}


	useEffect(() => {
		if (query.length < 1) return;
		fetchLocationByQuery(query);
	}, [query])

	useEffect(() => {
		fetchStoresByLocation(coords.lat, coords.long, option.tagValue, option.tagName);

	}, [coords, option])




	return (
		<div>
			<MapSearch loading={mapLoading} setQuery={setQuery} />

			<MapWithNoSSR coords={coords} handleModalOpen={handleModalOpen} handleOptionDetailOpen={handleOptionDetailOpen} setSelectedStore={setSelectedStore} />


			<BottomModal isOpen={isOptionModalOpen} onClose={handleModalClose} >
				<div className='flex justify-between py-5'>
					{

						optionData.map((currentOption, index) => {
							const isSelected = option.tagValue === currentOption.tagValue;
							const optionMeta = { tagName: currentOption.tagName, tagValue: currentOption.tagValue }
							const optionIcons = { iconUrl: currentOption.iconUrl, iconUrlLight: currentOption.iconUrl_light }
							return <OptionCard key={index} isSelected={isSelected} setOption={setOption} optionMeta={optionMeta}  optionIcons={optionIcons} />
						})
					}

				</div>
			</BottomModal>

			<BottomModal noTitle={true} isOpen={isOptionDetailOpen} onClose={handleOptionDetailClose} >
				<div className='flex flex-col gap-2' >
					<p className='text-[16px] leading-[20px]'>Local shops in <span className='font-bold'>ABC Mart</span> </p>
					<div className='flex'>
						<p className='block font-bold text-[12px] leading-[18px]'>ABC Mart - Shopping Mall</p>
					</div>
					<div className='flex justify-between gap-2'>
						<img src="/images/store-images/1.png" alt="store" />
						<img src="/images/store-images/2.png" alt="store" />
						<img src="/images/store-images/3.png" alt="store" />
						<img src="/images/store-images/4.png" alt="store" />

					</div>
					<p className='font-semibold text-[12px] leading-[18px]'>Shopping mall</p>
					<p className='text-[10px] leading-[15px]'>24 Bd des Batignolles, 75017 Paris, France </p>
					<div className='flex justify-between w-[80%] '>
						<div className='flex items-center'>

							<div className='h-3 w-3 bg-palette-primary mr-2 rounded-full'></div>
							<p className='text-[10px] leading-[15px]'>In-store-shopping</p>

						</div>
						<div className='flex items-center'>
							<div className='h-3 w-3 bg-palette-primary mr-2 rounded-full'></div>
							<p className='text-[10px] leading-[15px]'>Delivery</p>
						</div>

					</div>
					<button  onClick={()=>router.push("/category")} className='px-[47px] py-[12px] w-[50%] sm:w-[40%] bg-palette-primary rounded-md text-white' >
						Shop

					</button>

				</div>
			</BottomModal>


		</div>
	)
}

export default homepage;
