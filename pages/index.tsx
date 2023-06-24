import React, { Profiler, useEffect, useState } from 'react'
import dynamic from 'next/dynamic';
import BottomModal from '../components/BottomModal';
import OptionCard from '../components/Map/OptionCard';
import { optionData } from '../components/Map/StoreMarkerData';
import { useRouter } from 'next/router'
import useRequest from '../hooks/useRequest';




type Coords = {
	lat: number;
	long: number;
};

type OptionType = {
	tagName: string;
	tagValue: string;
}

const initialOption:OptionType = {
	tagName: '',
	tagValue: ''
}

import MapSearch from '../components/Map/MapSearch';
import { isEmpty } from 'lodash';

const Homepage = () => {

	const MapWithNoSSR = dynamic(() => import("../components/Map"), {
		ssr: false
	});

	// create a state value called query in typescript
	const [query, setQuery] = useState<string>("");
	const [coords, setCoords] = useState<Coords>({ lat: 46.603354, long: 1.8883335 });
	const [isOptionModalOpen, setIsOptionModalOpen] = useState<boolean>(false);
	const [isOptionDetailOpen, setIsOptionDetailOpen] = useState<boolean>(false);
	const [option, setOption] = useState<OptionType>(initialOption);

	//TODO local store and coords states can be removed in further iterations
	const [stores, setStores] = useState<any>([]);
	const [selectedStore, setSelectedStore] = useState<any>(null);
	const { data: searchedLocationData, loading, error, fetchData } = useRequest();
	const { data: storesByLocation, loading:loadingStores, error:errorStores, fetchData:fetchStores } = useRequest();
	const router = useRouter();




	//TODO Pseudo loading for now. Need to figure out to do this using map load events
	const [mapLoading, setMapLoading] = useState<boolean>(false);


	useEffect(() => {
		setMapLoading(true);
		setTimeout(() => {
			setMapLoading(false)
		}, 1000)

	}, [query])



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
		let url = `${process.env.NEXT_PUBLIC_NOMINATIM_URL}/search?format=jsonv2&q=${query}`;

		fetchData(url, "GET");


	}

	const fetchStoresByLocation = (lat: number, long: number, tagValue: string, tagName: string) => {
		let url = `${process.env.NEXT_PUBLIC_BECKN_API_URL}/stores?tagName=${tagName}&tagValue=${tagValue}&latitude=${lat}&longitude=${long}`;

		fetchStores(url, "GET");
	}



	useEffect(() => {
		if (searchedLocationData && !isEmpty(searchedLocationData)) {
			setCoords({ lat: searchedLocationData[0].lat, long: searchedLocationData[0].lon });
		}

	}, [searchedLocationData])

	useEffect(()=>{
		// Not refilling stores if option is empty
		if(storesByLocation && !isEmpty(option.tagValue)){
			setStores(storesByLocation);
		}

	},[storesByLocation])


	useEffect(() => {
		if (query.length < 1) return;
		fetchLocationByQuery(query);
	}, [query])

	useEffect(() => {
		if(!isEmpty(coords) && !isEmpty(option.tagValue))
	{
fetchStoresByLocation(coords.lat, coords.long, option.tagValue, option.tagName);
	}	

	}, [coords, option])

	//resetting option state and stores when location changes
	useEffect(()=>{
		setOption(initialOption);
		setStores([]);
	},[coords])




	return (
		<div>
			<MapSearch loading={mapLoading} setQuery={setQuery} />

			<MapWithNoSSR stores={stores} coords={coords} handleModalOpen={handleModalOpen} handleOptionDetailOpen={handleOptionDetailOpen} setSelectedStore={setSelectedStore} />


			<BottomModal isOpen={isOptionModalOpen} onClose={handleModalClose} >
				<div className='flex justify-between py-5'>
					{

						optionData.map((currentOption, index) => {
							const isSelected = option ? option.tagValue === currentOption.tagValue : false;
							const optionMeta = { tagName: currentOption.tagName, tagValue: currentOption.tagValue }
							const optionIcons = { iconUrl: currentOption.iconUrl, iconUrlLight: currentOption.iconUrl_light }
							return <OptionCard key={index} isSelected={isSelected} setOption={setOption} optionMeta={optionMeta} optionIcons={optionIcons} />
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
					<button onClick={() => router.push("/category")} className='px-[47px] py-[12px] w-[50%] sm:w-[40%] bg-palette-primary rounded-md text-white' >
						Shop

					</button>

				</div>
			</BottomModal>


		</div>
	)
}

export default Homepage;
