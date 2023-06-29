import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import Logo from "./Logo";
import { Image, Text } from "@chakra-ui/react";
import Settings from "./Settings";
import { useRouter } from "next/router";
import CartIcon from "../cart/CartIcon";
import Link from "next/link";
import Language from "./language/Language";

const UserBox = dynamic(() => import("./user"), {
  ssr: false,
});
const Theme = dynamic(() => import("./theme/Theme"), {
  ssr: false,
});

const storeHeaderBlackList = [
  "/checkoutPage",
  "/orderHistory",
  "orderDetails",
  "feedback",
];
const headerValues = {
  "/checkoutPage": "Checkout",
  "/orderHistory": "Order History",
  "/orderDetails": "Order Details",
  feedback: "Feedback",
};

const getHeaderTitleForPage = (
  name: string,
  logo: string,
  pathName: string
) => {
  switch (true) {
    case storeHeaderBlackList.includes(pathName):
      return (
        <Text className="text-xl  truncate">{headerValues[pathName]}</Text>
      );
    default:
      return (
        <div className="md:hidden ml-2  max-w-[12rem]  flex gap-1 my-2">
          <Image
            className="max-h-[34px] max-w-[160px] rounded-lg"
            src={logo}
            alt="Logo"
          />
          <Text className="text-xl text-palette-primary truncate">{name}</Text>
        </div>
      );
  }
};

const Index = () => {
  const [optionTags, setOptionTags] = useState<any>();

  useEffect(() => {
    setOptionTags(JSON.parse(localStorage.getItem("optionTags") as string));
  }, []);

  const router = useRouter();

  return (
    <header className="md:fixed left-0 right-0 mb-4 top-0 md:bg-palette-fill shadow-sm pt-4 z-[1000] app_header_b ">
      <div className="flex flex-col md:px-4 mb-2">
        <div className="flex items-center justify-between md:order-2 md:mt-2 py-4  relative">
          <div className="flex gap-4 items-center">
            <div onClick={() => router.back()}>
              <Image src="/images/Back.svg" />
            </div>
            <Link href="/">
              <Image src="/images/Home_icon.svg" />
            </Link>
          </div>

          {getHeaderTitleForPage(
            optionTags?.name,
            optionTags?.logo,
            router.pathname
          )}
          <div className="flex gap-4">
            <CartIcon />
            <Settings /> {/* 👈settings: md:hidden */}
          </div>
          <div className="hidden md:flex md:items-center md:justify-between">
            <Language />
          </div>
        </div>
        {/* Might need this code so commenting it out for now */}
        {/* <hr className="md:hidden" /> */}
        {/* <div className="mb-2 mt-4 md:mt-0 flex  items-center md:order-1"> */}
        {/* <div className="hidden md:block">
            <Logo />
          </div> */}
        {/* <div className="flex-grow">
            <SearchBar />
          </div> */}
        {/* <div className="ltr:ml-2 rtl:mr-2 sm:ltr:ml-4 sm:rtl:mr-4 flex items-center justify-between ">
            <UserBox />
            <CartIcon />
          </div> */}
        {/* </div> */}
      </div>
    </header>
  );
};

export default Index;
