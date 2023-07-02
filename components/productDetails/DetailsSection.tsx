import { Box } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import StarRatingComponent from "react-star-rating-component";
import { useLanguage } from "../../hooks/useLanguage";
import { RetailItem } from "../../lib/types/products";
import CallToAction from "./CallToAction";

interface Props {
  product: RetailItem;
}
const DetailsSection: React.FC<Props> = ({ product }) => {
  const { t } = useLanguage();
  const [showComponent, setShowComponent] = useState(false);

  useEffect(() => {
    setShowComponent(true);
  }, []);

  const starCount = Math.floor(Math.random() * 5) + 1;

  if (!showComponent) {
    return <></>;
  }

  return (
    <Box
      padding={"15px 20px"}
      className="bg-palette-card md:bg-transparent  md:w-auto  flex-grow self-center lg:self-start md:mt-0  lg:ltr:ml-4 lg:rtl:mr-4 md:py-0 rounded-tl-xl rounded-tr-xl flex flex-col z-10"
    >
      <h2
        className="text-palette-mute whitespace-normal  rtl:md:text-right ltr:md:text-left"
        style={{ fontSize: "20px", fontWeight: "600", color: "#000" }}
      >
        {product.descriptor.name}
      </h2>
      <hr className="mt-1 hidden md:block" />
      <div className="flex items-start flex-wrap relative">
        <div className="flex-grow">
          <div className="flex items-center self-center">
            <StarRatingComponent
              name="product_rate"
              starCount={5}
              value={starCount}
            />
            <p className="text-sm text-palette-mute rtl:mr-2 ltr:ml-2 pl-1">
              {starCount} {t.stars}
            </p>
          </div>

          <div
            dangerouslySetInnerHTML={{ __html: product.descriptor.long_desc }}
            className="mt-4 product_description_text"
          ></div>
        </div>
        <CallToAction product={product} />
      </div>
    </Box>
  );
};

export default DetailsSection;
