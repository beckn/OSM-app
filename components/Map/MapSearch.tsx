import React, { useState,useEffect } from "react";

import { GoSearch } from "react-icons/go";
import { useLanguage } from "../../hooks/useLanguage";
import useDebounce from "../../hooks/useDebounce";


interface SearchBarProp {
  setQuery: React.Dispatch<React.SetStateAction<string>>;
}

const SearchBar: React.FC<SearchBarProp> = ({setQuery}) => {
  const { t } = useLanguage();
	const [value,setValue] = useState<string>("");
	const debouncedQuery = useDebounce(value, 500);

	useEffect(() => {
		setQuery(debouncedQuery)
	}, [debouncedQuery]);

  return (
    <div className="max-w-[50rem] w-full md:w-[90%] px-4 mb-5 md:ltr:ml-4 md:rtl:mr-4 rounded-lg bg-slate-600/10 dark:bg-slate-800 flex items-center flex-grow">
      <GoSearch style={{ color: "rgb(156 163 175)" }} />
      <input
        className="px-4 py-2 md:py-3 bg-transparent outline-none w-full "
        type="search"
        placeholder={`${t.search}`}
				onChange={(e)=>setValue(e.target.value)}
				// If you want to use the enter key to submit the search query, uncomment the following line:
				// onKeyDown={(e)=>{if(e.key === "Enter") console.log("Enter")}}
				 />
    </div>
  );
};

export default SearchBar;
