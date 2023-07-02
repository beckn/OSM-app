import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import BottomModal from "../BottomModal";
import Logo from "./Logo";
import { Box, Image, Text } from "@chakra-ui/react";
import Settings from "./Settings";
import CartIcon from "../cart/CartIcon";
import { useRouter } from "next/router";
import Link from "next/link";
import { useLanguage } from "../../hooks/useLanguage";
import Language from "./language/Language";

const UserBox = dynamic(() => import("./user"), {
  ssr: false,
});
const Theme = dynamic(() => import("./theme/Theme"), {
  ssr: false,
});

const cartIconBlackList = [
  "/orderConfirmation",
  "/orderDetails",
  "/trackOrder",
  "/feedback",
  "/orderHistory",
  "/",
  "/mobileOtp",
  "/cart",
  "/checkoutPage",
  "/paymentMode",
];

const backIconList = ["/", "/orderDetails"];

const homeIconWhiteList = ["/orderHistory", "/"];

const storeHeaderBlackList = [
  "/checkoutPage",
  "/orderHistory",
  "/orderDetails",
  "/cart",
  "/homePage",
  "/orderConfirmation",
  "feedback",
  "/",
  "/mobileOtp",
  "/paymentMode",
];
const headerValues = {
  "/checkoutPage": "Billing & Shipping",
  "/orderHistory": "Order History",
  "/orderDetails": "Order Details",
  "/": "Sign In",
  "/mobileOtp": "Sign In",
  "/cart": "Cart",
  "/paymentMode": "Select Payment Method",
  feedback: "Feedback",
};

const topHeaderBlackList: string[] = [];

const bottomHeaderBlackList = ["/homePage", "/orderConfirmation"];

const menuIconWhiteList = ["/homePage"];

const languageIconWhiteList = ["/homePage"];

const getHeaderTitleForPage = (
  name: string,
  logo: string,
  pathName: string
) => {
  switch (true) {
    case storeHeaderBlackList.includes(pathName):
      return <Text>{headerValues[pathName]}</Text>;
    default:
      return (
        <Box width={"260px"} className="md:hidden ml-2    flex gap-1 my-2">
          <Text
            margin={"0 auto"}
            textAlign={"center"}
            fontSize={"17px"}
            textOverflow={"ellipsis"}
            whiteSpace={"nowrap"}
            overflow={"hidden"}
          >
            {name}
          </Text>
        </Box>
      );
  }
};

export interface TopHeaderProps {
  handleMenuClick?: () => void;
}

const TopHeader: React.FC<TopHeaderProps> = ({ handleMenuClick }) => {
  const [isMenuModalOpen, setMenuModalOpen] = useState(false);
  const { t, locale } = useLanguage();
  const router = useRouter();

  const handleMenuModalClose = () => {
    setMenuModalOpen(false);
  };

  return (
    <>
      <div className="h-7 w-full bg-[#efefef]">
        <div className="px-5 h-full flex items-center">
          <div>
            <Image src="/images/CommerceLogo.svg" alt="App logo" />
          </div>
          <div className="ml-auto flex gap-4">
            {languageIconWhiteList.includes(router.pathname) && <Settings />}

            {menuIconWhiteList.includes(router.pathname) && (
              <Image
                onClick={() => setMenuModalOpen(true)}
                className="block"
                src="/images/3-dots.svg"
                alt="menu icon"
              />
            )}

            {!homeIconWhiteList.includes(router.pathname) && (
              <Link href="/">
                <Image src="/images/Home_icon.svg" alt="home Icon" />
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Menu Modal */}
      <BottomModal isOpen={isMenuModalOpen} onClose={handleMenuModalClose}>
        <div
          onClick={() => {
            router.push("/orderHistory");
          }}
          className="flex gap-2 py-5"
        >
          <Image src="/images/orderHistory.svg" alt="Order history icon" />
          {t["orderHistory"]}
        </div>
      </BottomModal>
    </>
  );
};

const BottomHeader = () => {
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
            {!backIconList.includes(router.pathname) && (
              <div onClick={() => router.back()}>
                <Image src="/images/Back.svg" alt="Back icon" />
              </div>
            )}
          </div>

          {getHeaderTitleForPage(
            optionTags?.name,
            optionTags?.logo,
            router.pathname
          )}
          <div className="flex gap-4">
            {!cartIconBlackList.includes(router.pathname) && <CartIcon />}
          </div>
        </div>
      </div>
    </header>
  );
};

const Header = () => {
  const router = useRouter();

  const renderTopHeader = !topHeaderBlackList.includes(router.pathname);
  const renderBottomHeader = !bottomHeaderBlackList.includes(router.pathname);

  return (
    <div>
      {renderTopHeader && <TopHeader />}
      {renderBottomHeader && <BottomHeader />}
    </div>
  );
};

export default Header;
