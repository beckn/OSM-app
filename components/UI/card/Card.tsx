import React from "react";
import Link from "next/link";
import StarRatingComponent from "react-star-rating-component";
import { RetailItem } from "../../../lib/types/products";
import CardActions from "./CardActions";
import ProductPrice from "../ProductPrice";
import { toBinary } from "../../../utilities/common-utils";
import { Box, Flex, Text, Image } from "@chakra-ui/react";
import StarIcon from "../../../public/images/Star.svg";

interface Props {
  product: RetailItem;
}

const Card: React.FC<Props> = ({ product }) => {
  const encodedProduct = window.btoa(toBinary(JSON.stringify(product)));

  return (
    <Box
      minH={"168px"}
      maxH={"100%"}
      className="col-span-6 sm:col-span-3 md:col-span-4 lg:col-span-3 2xl:col-span-2 shadow-xl my-1 md:my-4 ltr:mr-2 rtl:ml-1 md:mx-6  bg-palette-card rounded-xl flex relative"
    >
      <Link
        href={{
          pathname: "/product",
          query: { productDetails: encodedProduct },
        }}
      >
        <a className="flex md:items-center md:flex-col relative w-full ">
          <Box
            w={"125px"}
            className=" md:w-full relative bg-slate-400/30  md:px-6  rounded-bl-xl rounded-tl-xl md:rounded-tr-xl md:rounded-bl-none rtl:order-2 rtl:md:order-none flex flex-col justify-between items-center"
          >
            <div className="flex items-center h-full  product-img-span">
              <Image
                src={product.descriptor.images[0]}
                width={"110px"}
                height={"133px"}
                alt={product.descriptor.name}
                className=" drop-shadow-xl object-contain hover:scale-110 transition-transform duration-300 ease-in-out "
              />
            </div>
          </Box>
          <Box
            p={"15px"}
            w={"63%"}
            position={"relative"}
            className="flex flex-col md:w-full md:px-3  md:py-4"
          >
            <Text
              fontWeight={"600"}
              fontSize={"15px"}
              mb={"10px"}
              noOfLines={2}
              textOverflow="ellipsis"
              whiteSpace="pre-wrap"
              overflowWrap="break-word"
            >
              Book very very long long name Book very very long long name
            </Text>

            <Flex fontSize={"12px"} alignItems={"center"} mb={"8px"}>
              <Text fontWeight={"600"}>Author:</Text>
              <Text
                pl={"3px"}
                noOfLines={1}
                textOverflow="ellipsis"
                whiteSpace="pre-wrap"
                overflowWrap="break-word"
              >
                {product.descriptor.name}
              </Text>
            </Flex>
            <Flex fontSize={"12px"} alignItems={"center"} mb={"8px"}>
              <Text fontWeight={"600"}>Sold by:</Text>
              <Text pl={"3px"}>{"<BPP name>"}</Text>
            </Flex>
            <Flex
              justifyContent={"space-between"}
              alignItems={"center"}
              position={"absolute"}
              bottom={"15px"}
              width={"calc(100% - 30px)"}
            >
              <ProductPrice price={parseFloat(product.price.value)} />
              <Flex alignItems={"center"} mt={"8px"}>
                <Image src={StarIcon} />
                <Text fontSize={"12px"} pl={"5px"}>
                  4.6
                </Text>
              </Flex>
            </Flex>
          </Box>
        </a>
      </Link>

      <CardActions product={product} />
    </Box>
  );
};

export default Card;
