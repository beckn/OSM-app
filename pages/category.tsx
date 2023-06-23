import type { NextPage } from "next";
import { useEffect } from "react";
import dynamic from "next/dynamic";
import { useDispatch } from "react-redux";
import { specialOfferProductsActions } from "../store/specialOfferProducts-slice";
import { newestProductsActions } from "../store/newestProduct-slice";
import { client } from "../lib/client";
const Category = dynamic(() => import("../components/category/Category"));

import { IProduct } from "../lib/types/products";

const Home: NextPage<{ products: IProduct[] }> = ({ products }) => {
  const dispatch = useDispatch();


  return (
    <div>
      {/* <Carousel /> */}
      {/* <Benefits /> */}
      {/* <Offers /> */}
      <Category />
      {/* <Newest /> */}
      {/* <Banners /> */}
      {/* <Brands /> */}
    </div>
  );
};

export default Home;

