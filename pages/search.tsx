import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { GetStaticProps } from "next";
import { Spinner } from "@chakra-ui/react";
import SearchBar from "../components/header/SearchBar";
import ProductList from "../components/productList/ProductList";
import useRequest from "../hooks/useRequest";
import { client } from "../lib/client";
import { transactionIdActions } from "../store/transactionId-slice";
import { RetailItem } from "../lib/types/products";

//Mock data for testing search API. Will remove after the resolution of CORS issue
const searchPayload = {
  context: {
    domain: "retail",
  },
  message: {
    criteria: {
      dropLocation: "12.9715987,77.5945627",
      searchString: "trek",
      category_name: "TourismEnglish",
    },
  },
};

const Search = () => {
  const [items, setItems] = useState([]);
  const router = useRouter();
  const dispatch = useDispatch();

  const { keyword } = router.query;

  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  const { data, loading, error, fetchData } = useRequest();

  const fetchDataForSearch = () =>
    fetchData(`${apiUrl}/client/v2/search`, "POST", searchPayload);

  useEffect(() => {
    fetchData(`${apiUrl}/client/v2/search`, "POST", searchPayload);
  }, []);

  useEffect(() => {
    if (data) {
      dispatch(
        transactionIdActions.addTransactionId(data.context.transaction_id)
      );
      const allItems = data.message.catalogs.flatMap((catalog: any) => {
        if (
          catalog.message &&
          catalog.message.catalog &&
          catalog.message.catalog["bpp/providers"].length > 0
        ) {
          const providers = catalog.message.catalog["bpp/providers"];
          return providers.flatMap((provider: any) => {
            if (provider.items && provider.items.length > 0) {
              return provider.items.map((item: RetailItem) => {
                return {
                  bpp_id: catalog.context.bpp_id,
                  bpp_uri: catalog.context.bpp_uri,
                  ...item,
                  providerId: provider.id,
                  locations: provider.locations,
                };
              });
            }
            return [];
          });
        }
        return [];
      });
      setItems(allItems);
    }
  }, [data]);

  return (
    <div>
      <SearchBar
        searchString={keyword}
        handleChange={(text: string) => fetchDataForSearch()}
      />

      {loading ? (
        <div className="flex justify-center items-center h-[60vh]">
          <Spinner
            thickness="4px"
            speed="0.65s"
            emptyColor="gray.200"
            color="#A71B4A"
            size="xl"
          />
        </div>
      ) : (
        <ProductList productList={items} />
      )}
    </div>
  );
};

export default Search;
