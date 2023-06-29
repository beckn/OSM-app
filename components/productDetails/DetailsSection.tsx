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
    <div className="bg-palette-card md:bg-transparent w-[100vw] md:w-auto px-5 flex-grow self-center lg:self-start mt-8 md:mt-0 !-mx-[1rem] lg:ltr:ml-4 lg:rtl:mr-4 py-5 md:py-0 rounded-tl-[4rem] rounded-tr-[3rem] flex flex-col z-10">
      <h2 className="text-palette-mute whitespace-normal text-center rtl:md:text-right ltr:md:text-left">
        {product.descriptor.name}
      </h2>
      <hr className="mt-1 hidden md:block" />
      <div className="flex items-start flex-wrap relative">
        <div className="flex-grow mt-6">
          <div className="flex items-center self-center">
            <StarRatingComponent
              name="product_rate"
              starCount={5}
              value={starCount}
            />
            <p className="text-sm text-palette-mute rtl:mr-2 ltr:ml-2">
              {starCount} {t.stars}
            </p>
          </div>
          <h3 className="text-lg mt-2">{t.details}</h3>

          <div
            dangerouslySetInnerHTML={{ __html: product.descriptor.long_desc }}
            className="mt-4"
          ></div>
        </div>
        <CallToAction product={product} />
      </div>
    </div>
  );
};

export default DetailsSection;
