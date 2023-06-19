import type { NextPage } from "next";
import { GetStaticProps } from "next";
import SearchBar from "../components/header/SearchBar";
import ProductList from "../components/productList/ProductList";
import useRequest from "../hooks/useRequest";
import { client } from "../lib/client";
import { IProduct } from "../lib/types/products";
import { useRouter } from "next/router";
import { useEffect } from "react";

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

const Search: NextPage<{
  products: IProduct[];
}> = ({ products }) => {
  const router = useRouter();

  const { keyword } = router.query;

  console.log("keyWord", keyword);
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  const { data, loading, error, fetchData } = useRequest();

  useEffect(() => {
    fetchData(`${apiUrl}/client/v2/search`, "POST", searchPayload);
  }, []);

  if (loading) {
    //TODO :- We modify this after the CORS issue is resolved and Kundan's MR is merged
    return <p>Loading....</p>;
  }

  return (
    <div>
      <SearchBar
        searchString={keyword}
        handleChange={(text: string) => console.log(text)}
      />
      <ProductList productList={products} />
    </div>
  );
};

export default Search;

//TODO :- will remove this after creating the data-models
export const getStaticProps: GetStaticProps = async (context) => {
  console.log("context", context);
  const category = "digital";
  const productQuery = `*[_type=='product'&& category[0]=="${category}"]`;
  const products = await client.fetch(productQuery);

  return {
    props: {
      products: products,
    },
  };
};
