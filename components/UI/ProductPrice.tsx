import React from "react";
import { useLanguage } from "../../hooks/useLanguage";

interface Props {
  price: number;
  discount?: number;
  isLargeSize?: boolean;
  isInSlider?: boolean;
}
const ProductPrice: React.FC<Props> = ({
  price,
  isLargeSize = false,
  isInSlider,
}) => {
  const { t, locale } = useLanguage();

  //style base on component position
  const textMainPriceSize = isLargeSize
    ? "text-xl md:text-3xl"
    : "text-md md:text-lg";
  const textDiscountPriceSize = isLargeSize
    ? "text-md md:text-xl"
    : "text-[12px] md:text-md";
  const justifyContent = isInSlider && locale === "fa" ? "flex-start" : "";
  const flexDirection = "row";

  return (
    <div>
      <div
        className={`flex rtl:justify-end rtl:self-end ltr:self-start text-left mt-2`}
        style={{ justifyContent }}
      >
        <div>
          {/* ☝slider cards (.slick-slide=>Slider component) are float and because of that, they don't accept height so, for making cards the same height, I have to do this hack*/}
          <div
            className={`flex items-center ${textMainPriceSize} font-bold no-underline`}
            style={{ flexDirection }}
          >
            <sup className="mr-1 rtl:block">
              {locale === "en" ? "Rs." : "£"}
            </sup>
            <span>{price}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPrice;
