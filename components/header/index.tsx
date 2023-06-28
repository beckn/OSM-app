import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import Logo from "./Logo";
import {Image} from "@chakra-ui/react"
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

const Index = () => {

  const [optionTags,setOptionTags] = useState<any>();

  useEffect(()=>{
    setOptionTags(JSON.parse(localStorage.getItem('optionTags') as string));
  },[])

  const router = useRouter();



  return (
    <header className="md:fixed left-0 right-0 top-0 md:bg-palette-fill shadow-sm pt-4 z-[1000]">
      <div className="flex flex-col md:px-4 mb-2">
        <div className="flex items-center justify-between md:order-2 md:mt-2  relative">
          {/* <Menu /> */}
          <div onClick={()=>router.back()}>
          <Image  src="/images/Back.svg" />
          </div>
          <div className="md:hidden text-lg text-palette-primary">
            {optionTags?.name}

          </div>
          <div className="flex gap-1">
             <Link href='/'>
          <Image  src="/images/Home_icon.svg" />
          </Link>
          <Settings /> {/* 👈settings: md:hidden */}
          </div>
          <div className="hidden md:flex md:items-center md:justify-between">
            <Language />
            <Theme />
          </div>
        </div>
        <hr className="md:hidden" />
        <div className="mb-2 mt-4 md:mt-0 flex  items-center md:order-1">
          <div className="hidden md:block">
            <Logo />
          </div>
          <div className="flex-grow">
            {/* commenting this code out because they are not required */}
            {/* <SearchBar /> */}
          </div>
          <div className="ltr:ml-2 rtl:mr-2 sm:ltr:ml-4 sm:rtl:mr-4 flex items-center justify-between ">
            {/* <UserBox /> */}
            <CartIcon />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Index;
