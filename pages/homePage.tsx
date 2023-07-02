import React, { useRef, useEffect, useState } from "react";
import { Transition } from "react-transition-group";
import dynamic from "next/dynamic";
import BottomModal from "../components/BottomModal";
import OptionCard from "../components/Map/OptionCard";
import { optionData } from "../components/Map/StoreMarkerData";
import { useRouter } from "next/router";
import useRequest from "../hooks/useRequest";
import cs from "classnames";
import { Image } from "@chakra-ui/react";
import { useLanguage } from "../hooks/useLanguage";
import { toast } from "react-toastify";

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

const duration = 300;

const defaultStyle = {
  transition: `height ${duration}ms ease-in-out`,
  height: "4rem",
};

const transitionStyles = {
  entering: { height: "12rem" },
  entered: { height: "12rem" },
  exiting: { height: "3.8rem" },
  exited: { height: "3.8rem" },
};

const staticTagsList = ["In-store-shopping", "Delivery", "Click & Collect"];

import MapSearch from "../components/Map/MapSearch";
import { isEmpty } from "lodash";

const Homepage = () => {
  const MapWithNoSSR = dynamic(() => import("../components/Map"), {
    ssr: false,
  });

  const nodeRef = useRef(null);

  const { t, locale } = useLanguage();

  // create a state value called query in typescript
  const [query, setQuery] = useState<string>("");
  const [coords, setCoords] = useState<Coords>({
    lat: 48.84619085,
    long: 2.346078521905153,
  });
  const [isOptionModalOpen, setIsOptionModalOpen] = useState<boolean>(true);
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
    data: locationData,
    loading: loadingLocation,
    error: locationError,
    fetchData: fetchLocation,
  } = useRequest();
  const {
    data: storesByLocation,
    loading: loadingStores,
    error: errorStores,
    fetchData: fetchStores,
  } = useRequest();
  const router = useRouter();

  console.log("Dank", locationData);

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

  const fetchLocationNameByCoords = (lat: number, long: number) => {
    let url = `${process.env.NEXT_PUBLIC_NOMINATIM_URL}/reverse?format=jsonv2&lat=${lat}&lon=${long}`;

    fetchLocation(url, "GET");
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

    // Only fetch when Books are selected for now
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
    if (isEmpty(query) && !isEmpty(coords)) {
      fetchLocationNameByCoords(coords.lat, coords.long);
    }
  }, [coords]);

  useEffect(() => {
    if (
      !isEmpty(coords) &&
      !isEmpty(option.tagValue) &&
      option.tagValue === "Books"
    ) {
      fetchStoresByLocation(
        coords.lat,
        coords.long,
        option.tagValue,
        option.tagName
      );
    }
    if (option.tagValue !== "Books") {
      setStores([]);
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
      <div className="overflow-hidden max-h-[85vh]">
        <MapWithNoSSR
          stores={stores}
          coords={coords}
          selectedStore={selectedStore}
          handleModalOpen={handleModalOpen}
          handleOptionDetailOpen={handleOptionDetailOpen}
          setSelectedStore={setSelectedStore}
        />
      </div>

      <div className="bottom-0 absolute z-[1000] max-h-fit w-[100vw]  flex items-end justify-center  sm:p-0">
        {/* <div className="w-full  p-4 mx-auto bg-[#F3F4F5]  rounded-t-[1.5rem] shadow-lg sm:rounded-lg sm:overflow-hidden"> */}
        <Transition nodeRef={nodeRef} in={isMenuModalOpen} timeout={duration}>
          {(state) => (
            // <div className={cs("w-full   p-4 mx-auto bg-[#F3F4F5]  rounded-t-[1.5rem] shadow-lg sm:rounded-lg sm:overflow-hidden",{['h-[4rem]']:!isMenuModalOpen})}>
            <div
              ref={nodeRef}
              style={{ ...defaultStyle, ...transitionStyles[state] }}
              className={cs(
                "w-full   px-4 pb-4 pt-2 mx-auto bg-[#F3F4F5]  rounded-t-[1rem] shadow-lg sm:rounded-lg sm:overflow-hidden"
              )}
            >
              <div onClick={() => setIsMenuModalOpen((prev) => !prev)}>
                <Image
                  src="/images/Indicator.svg"
                  className="mx-auto mb-3"
                  alt="swipe indicator"
                />
                <h3 className="text-base/[20px]">{t.explorePlaces}</h3>
              </div>
              <div
                className={cs(
                  "justify-between  py-5",
                  { ["flex"]: isMenuModalOpen },
                  { ["hidden"]: !isMenuModalOpen }
                )}
              >
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
          )}
        </Transition>
      </div>

      <BottomModal
        isOpen={isOptionDetailOpen}
        onClose={handleOptionDetailClose}
      >
        <div className="flex flex-col gap-2">
          <p className="text-[16px] leading-[20px]">
            {t["localStores"]}{" "}
            <span className="font-bold">
              {query ? query : locationData?.name}
            </span>{" "}
          </p>
          <div className="flex">
            <p className="block  text-[12px] leading-[18px]">
              <span className="font-bold text-ellipsis max-w-[70%]">
                {selectedStore?.tags.name}
              </span>{" "}
              - Bookstore
            </p>
          </div>
          <div className="flex justify-between gap-2">
            {selectedStore?.tags?.image
              .split(",")
              .map((singleImage: string, i: number) => {
                if (i < 4)
                  return (
                    <Image
                      src={singleImage}
                      className="w-[75px] h-[75px] rounded-xl"
                      alt="store"
                      key={i}
                    />
                  );
                else null;
              })}
          </div>
          <p className="font-semibold text-[12px] capitalize leading-[18px]">
            {selectedStore?.tags.category}
          </p>
          <p className="text-[10px] leading-[15px]">
            {selectedStore?.tags["addr:full"]}
          </p>
          <div className="flex justify-between w-[90%] ">
            {staticTagsList.map((tag, i) => {
              return (
                <div key={tag} className="flex items-center">
                  <div className="h-2 w-2 bg-palette-primary mr-2 rounded-full"></div>
                  <p className="text-[10px] leading-[15px]">{tag}</p>
                </div>
              );
            })}
          </div>
          <button
            onClick={() => {
              router.push("/search");
              localStorage.setItem(
                "optionTags",
                JSON.stringify(selectedStore?.tags)
              );
            }}
            className="px-[47px] mt-1 py-[12px]  bg-palette-primary text-white border_radius_all"
          >
            {t["shopButton"]}
          </button>
        </div>
      </BottomModal>
    </div>
  );
};

export default Homepage;
