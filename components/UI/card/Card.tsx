import React from "react";
import Image from "next/image";
import Link from "next/link";
import StarRatingComponent from "react-star-rating-component";
import { RetailItem } from "../../../lib/types/products";
import CardActions from "./CardActions";
import ProductPrice from "../ProductPrice";
import { toBinary } from "../../../utilities/common-utils";

interface Props {
  product: RetailItem;
}

const Card: React.FC<Props> = ({ product }) => {
  const encodedProduct = window.btoa(toBinary(JSON.stringify(product)));

  return (
    <div className="col-span-6 sm:col-span-3 md:col-span-4 lg:col-span-3 2xl:col-span-2 shadow-xl my-1 md:my-4 ltr:mr-2 rtl:ml-1 md:mx-6  bg-palette-card rounded-xl flex relative">
      <Link
        href={{
          pathname: "/product",
          query: { productDetails: encodedProduct },
        }}
      >
        <a className="flex md:items-center md:flex-col relative w-full ">
          <div className="w-1/2 md:w-full relative bg-slate-400/30  md:px-6  rounded-bl-xl rounded-tl-xl md:rounded-tr-xl md:rounded-bl-none rtl:order-2 rtl:md:order-none flex flex-col justify-between items-center">
            <div className="flex items-center h-full  product-img-span">
              <Image
                src={product.descriptor.images[0]}
                width={280}
                height={300}
                alt={product.descriptor.name}
                className=" drop-shadow-xl object-contain hover:scale-110 transition-transform duration-300 ease-in-out rounded-tl-xl rounded-bl-xl "
              />
            </div>
          </div>
          <div className="flex flex-col justify-between  flex-grow  w-1/2 md:w-full  px-1 md:px-3 py-2 md:py-4">
            <div className="flex justify-center md:justify-start flex-col  flex-grow overflow-hidden">
              <div className="self-center">
                <StarRatingComponent
                  name={"anything"}
                  starCount={5}
                  value={Math.floor(Math.random() * 5) + 1}
                />
              </div>
              <h3 className="text-sm sm:text-[12px] md:text-sm text-center text-palette-mute  ">
                {product.descriptor.name}
              </h3>
            </div>
            <ProductPrice price={parseFloat(product.price.value)} />
          </div>
        </a>
      </Link>

      <CardActions product={product} />
    </div>
  );
};

export default Card;
