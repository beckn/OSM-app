import React, { useState,useEffect } from "react";
import {Spinner} from '@chakra-ui/react'
import { GoSearch } from "react-icons/go";
import { useLanguage } from "../../hooks/useLanguage";
import useDebounce from "../../hooks/useDebounce";


export interface SearchBarProp {
  setQuery: React.Dispatch<React.SetStateAction<string>>;
	loading:boolean;
}

const SearchBar: React.FC<SearchBarProp> = ({setQuery,loading}) => {
  const { t } = useLanguage();


	const [value,setValue] = useState<string>("");

  return (
<div className="max-w-[50rem] w-[90%] md:w-[90%] px-4 mx-auto mt-4 mb-3 border border-[#C9C9C9] border-solid  md:ltr:ml-4 md:rtl:mr-4 rounded-[12px]  dark:bg-slate-800 flex items-center justify-center flex-grow">
      <GoSearch style={{ color: "rgb(156 163 175)" }} />
      <input
        className="px-4 py-2 md:py-3 bg-transparent outline-none w-full "
        type="search"
        placeholder={`${t.search}`}
				onChange={(e)=>setValue(e.target.value)}
				onKeyDown={(e)=>{if(e.key === "Enter") setQuery(value)}}
				 />
				 {loading && <Spinner color="#A71B4A" size="sm" />}

    </div>
    
  );
};

export default SearchBar;
