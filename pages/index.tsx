import React, { Profiler, useEffect, useState } from "react";
import dynamic from "next/dynamic";
import BottomModal from "../components/BottomModal";
import OptionCard from "../components/Map/OptionCard";
import { optionData } from "../components/Map/StoreMarkerData";
import { useRouter } from "next/router";
import useRequest from "../hooks/useRequest";
import { Image } from "@chakra-ui/react";
import MapHeader from "../components/Map/MapHeader";
import { useLanguage } from "../hooks/useLanguage";
import { useLocalStorage } from "../hooks/useLocalStorage";

type Coords = {
  lat: number;
  long: number;
};

type OptionType = {
  tagName: string;
  tagValue: string;
  title?: string;
};

const initialOption: OptionType = {
  tagName: "",
  tagValue: "",
};

import MapSearch from "../components/Map/MapSearch";
import { isEmpty } from "lodash";

const Homepage = () => {
  const MapWithNoSSR = dynamic(() => import("../components/Map"), {
    ssr: false,
  });

  const { t, locale } = useLanguage();

  // create a state value called query in typescript
  const [query, setQuery] = useState<string>("");
  const [coords, setCoords] = useState<Coords>({
    lat: 48.84619085,
    long: 2.346078521905153,
  });
  const [isOptionModalOpen, setIsOptionModalOpen] = useState<boolean>(false);
  const [isOptionDetailOpen, setIsOptionDetailOpen] = useState<boolean>(false);
  const [isMenuModalOpen, setIsMenuModalOpen] = useState<boolean>(false);
  const [option, setOption] = useState<OptionType>(initialOption);

  //TODO local store and coords states can be removed in further iterations
  const [stores, setStores] = useState<any>([]);
  // const [selectedStore, setSelectedStore] = useState<any>(null);
  const [selectedStore, setSelectedStore] = useState<any>(null);

  const {
    data: searchedLocationData,
    loading,
    error,
    fetchData,
  } = useRequest();
  const {
    data: storesByLocation,
    loading: loadingStores,
    error: errorStores,
    fetchData: fetchStores,
  } = useRequest();
  const router = useRouter();

  //TODO Pseudo loading for now. Need to figure out to do this using map load events
  const [mapLoading, setMapLoading] = useState<boolean>(false);

  useEffect(() => {
    setMapLoading(true);
    setTimeout(() => {
      setMapLoading(false);
    }, 1000);
  }, [query]);

  const handleModalOpen = () => {
    setIsOptionModalOpen((prevState) => !prevState);
  };

  const handleModalClose = () => {
    setIsOptionModalOpen(false);
  };

  const handleOptionDetailOpen = () => {
    setIsOptionDetailOpen((prevState) => !prevState);
  };

  const handleOptionDetailClose = () => {
    setIsOptionDetailOpen(false);
    setSelectedStore(null);
  };


  const handleMenuModalClose = () => {
    setIsMenuModalOpen(false);
  };

  const fetchLocationByQuery = (query: string) => {
    let url = `${process.env.NEXT_PUBLIC_NOMINATIM_URL}/search?format=jsonv2&q=${query}`;

    fetchData(url, "GET");
  };

  const fetchStoresByLocation = (
    lat: number,
    long: number,
    tagValue: string,
    tagName: string
  ) => {
    // let url = `${process.env.NEXT_PUBLIC_BECKN_API_URL}/stores?tagName=${tagName}&tagValue=${tagValue}&latitude=${lat}&longitude=${long}`;
    // static tagName and tagValue for now
    let url = `${process.env.NEXT_PUBLIC_BECKN_API_URL}/stores?tagName=becknified&tagValue=true&latitude=${lat}&longitude=${long}`;

    fetchStores(url, "GET");
  };

  useEffect(() => {
    if (searchedLocationData && !isEmpty(searchedLocationData)) {
      setCoords({
        lat: (searchedLocationData[0] as any).lat,
        long: (searchedLocationData[0] as any).lon,
      });
    }
  }, [searchedLocationData]);

  useEffect(() => {
    // Not refilling stores if option is empty
    if (storesByLocation && !isEmpty(option.tagValue)) {
      setStores(storesByLocation);
    }
  }, [storesByLocation]);

  useEffect(() => {
    if (query.length < 1) return;
    fetchLocationByQuery(query);
  }, [query]);

  useEffect(() => {
    if (!isEmpty(coords) && !isEmpty(option.tagValue)) {
      fetchStoresByLocation(
        coords.lat,
        coords.long,
        option.tagValue,
        option.tagName
      );
    }
  }, [coords, option]);

  //resetting option state and stores when location changes
  useEffect(() => {
    setOption(initialOption);
    setStores([]);
  }, [coords]);

  return (
    <div>
      <MapSearch loading={mapLoading} setQuery={setQuery} />

      <MapWithNoSSR
        stores={stores}
        coords={coords}
        selectedStore={selectedStore}
        handleModalOpen={handleModalOpen}
        handleOptionDetailOpen={handleOptionDetailOpen}
        setSelectedStore={setSelectedStore}
      />

      <BottomModal isOpen={isOptionModalOpen} onClose={handleModalClose}>
				<div>
					<h3 className="text-base/[20px]">{t.explorePlaces}</h3>
<div className="flex justify-between py-5">
          {optionData.map((currentOption, index) => {
            const isSelected = option
              ? option.tagValue === currentOption.tagValue
              : false;
            const optionMeta = {
              tagName: currentOption.tagName,
              tagValue: currentOption.tagValue,
              title: currentOption.title,
            };
            const optionIcons = {
              iconUrl: currentOption.iconUrl,
              iconUrlLight: currentOption.iconUrl_light,
            };
            return (
              <OptionCard
                key={index}
                isSelected={isSelected}
                setOption={setOption}
                optionMeta={optionMeta}
                optionIcons={optionIcons}
              />
            );
          })}
        </div>
				</div>
        
      </BottomModal>

      <BottomModal
        isOpen={isOptionDetailOpen}
        onClose={handleOptionDetailClose}
      >
        <div className="flex flex-col gap-2">
          <p className="text-[16px] leading-[20px]">
            {t["localStores"]}{" "}
            <span className="font-bold">{selectedStore?.tags.name}</span>{" "}
          </p>
          <div className="flex">
            <p className="block font-bold text-[12px] leading-[18px]">
              {selectedStore?.tags.name}
            </p>
          </div>
          <div className="flex justify-between gap-2">
            {[...Array(4)].map((_, i) => (
              <Image
                src={selectedStore?.tags[`image ${i + 1}`]}
                className="w-[75px] h-[75px] rounded-xl"
                alt="store"
                key={i}
              />
            ))}
          </div>
          <p className="font-semibold text-[12px] capitalize leading-[18px]">
            {selectedStore?.tags.category}
          </p>
          <p className="text-[10px] leading-[15px]">
            {selectedStore?.tags["addr:full"]}
          </p>
          <div className="flex justify-between w-[80%] ">
            <div className="flex items-center">
              <div className="h-3 w-3 bg-palette-primary mr-2 rounded-full"></div>
              <p className="text-[10px] leading-[15px]">In-store-shopping</p>
            </div>
            <div className="flex items-center">
              <div className="h-3 w-3 bg-palette-primary mr-2 rounded-full"></div>
              <p className="text-[10px] leading-[15px]">Delivery</p>
            </div>
          </div>
          <button
            onClick={() => {
              router.push("/search");
              localStorage.setItem(
                "optionTags",
                JSON.stringify(selectedStore?.tags)
              );
            }}
            className="px-[47px] py-[12px] w-[50%] sm:w-[40%] bg-palette-primary rounded-md text-white"
          >
            {t["shopButton"]}
          </button>
        </div>
      </BottomModal>


    </div>
  );
};

export default Homepage;
