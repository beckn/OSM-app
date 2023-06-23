import React, { useState } from "react";
import { Box, Button, Flex, Text, Image } from "@chakra-ui/react";
import { AppHeader } from "../components/appHeader/AppHeader";
import DetailsCard from "../components/detailsCard/DetailsCard";
import ItemDetails from "../components/detailsCard/ItemDetails";
import { useLanguage } from "../hooks/useLanguage";
import ShippingDetails from "../components/detailsCard/ShippingDetails";
import OrderDetailsCheckbox from "../components/detailsCard/OrderDetailsCheckbox";
import PaymentDetails from "../components/detailsCard/PaymentDetails";
import TextareaWithReadMore from "../components/detailsCard/TextareaWithReadMore";
import proceedToPay from "../public/images/proceedToPay.svg";
import AddShippingButton from "../components/detailsCard/AddShippingButton";
import rightArrow from "../public/images/rightArrow.svg";

const CheckoutPage = () => {
  const [formFlag, setFormFlag] = useState(true);

  const { t } = useLanguage();
  return (
    <>
      <AppHeader appHeaderText={t.checkout} />
      {/* start Item Details */}
      <Box>
        <Box pb={"20px"} mt={"-20px"}>
          <Text>{t.items}</Text>
        </Box>

        <DetailsCard>
          <ItemDetails
            title="JBL Xtrem 2"
            description="Waterproof bluetooth wireless speaker"
            quantity={"x1"}
            price={"€ 229.684"}
          />
        </DetailsCard>
      </Box>
      {/* end item details */}

      {/* start shipping detals */}
      {formFlag ? (
        <Box>
          <Flex pb={"20px"} mt={"20px"} justifyContent={"space-between"}>
            <Text fontSize={"17px"}>{t.shipping}</Text>
          </Flex>
          <DetailsCard>
            <AddShippingButton
              addShippingdetailsBtnText={t.addShippingdetailsBtnText}
            />
          </DetailsCard>
        </Box>
      ) : (
        <Box>
          <Flex pb={"20px"} mt={"20px"} justifyContent={"space-between"}>
            <Text fontSize={"17px"}>{t.shipping}</Text>
            <Text
              fontSize={"15px"}
              color={"rgba(var(--color-primary))"}
              cursor={"pointer"}
            >
              {t.changeText}
            </Text>
          </Flex>
          <DetailsCard>
            <ShippingDetails
              name={"Lisa"}
              location={"Mercure Montmartre"}
              number={"+91 9876543210"}
            />
          </DetailsCard>
        </Box>
      )}
      {/* end shipping detals */}
      {/* start payment method */}
      <Box>
        <Flex pb={"20px"} mt={"20px"} justifyContent={"space-between"}>
          <Text fontSize={"17px"}>{t.paymentText}</Text>
          <Text
            fontSize={"15px"}
            color={"rgba(var(--color-primary))"}
            cursor={"pointer"}
          >
            {t.changeText}
          </Text>
        </Flex>
        <DetailsCard>
          <OrderDetailsCheckbox
            orderDetailsCheckboxText={t.orderDetailsCheckboxText}
          />
        </DetailsCard>
      </Box>
      {/* end payment method */}
      {/* start payment details */}
      <Box>
        <Flex pb={"20px"} mt={"20px"} justifyContent={"space-between"}>
          <Text fontSize={"17px"}>{t.paymentText}</Text>
        </Flex>
        <DetailsCard>
          <PaymentDetails
            subtotalText={t.subtotalText}
            subtotalValue={t.subtotalvalue}
            deliveryChargesText={t.deliveryChargesText}
            deliveryChargesValue={t.deliveryChargesValue}
            totalText={t.totalText}
            totalValue={t.totalValue}
          />
        </DetailsCard>
      </Box>
      {/* end payment details */}
      {/* start order policy */}
      <Box>
        <Flex pb={"20px"} mt={"20px"} justifyContent={"space-between"}>
          <Text fontSize={"17px"}>{t.orderpolicyText}</Text>
        </Flex>
        <DetailsCard>
          <TextareaWithReadMore
            orderPolicyText={t.orderPolicyText}
            readMoreText={t.readMoreText}
            readLessText={t.readLessText}
          />
        </DetailsCard>
      </Box>
      {/* end order policy */}
      <Flex
        mt={"20px"}
        width={"99.8vw"}
        marginLeft={"-19px"}
        boxShadow={"0px -5px 40px rgba(0, 0, 0, 0.15)"}
      >
        <Button
          width={"50%"}
          height={"48px"}
          backgroundColor={""}
          color={""}
          __css={{ "&:active": {} }}
        >
          <Box w={["120px", "30%"]} margin={"0 auto"} textAlign={"left"}>
            <Text fontSize={"12px"} fontWeight={"700"}>
              Total
            </Text>
            <Flex alignItems={"center"}>
              <Text color={"rgba(var(--color-primary))"}>{t.totalValue}</Text>
              <Text fontSize={"10px"} pl={"2px"}>
                1 item
              </Text>
            </Flex>
          </Box>
        </Button>
        <Button
          isDisabled={formFlag}
          height={"48px"}
          fontSize={"14px"}
          backgroundColor={!formFlag ? "rgba(var(--color-primary))" : "#DFDFDF"}
          color={"rgba(var(--text-color))"}
          width={"50%"}
          __css={{ "&:active": {} }}
        >
          <Flex
            alignItems={"center"}
            justifyContent={"space-between"}
            p={"0 10px 0 15px"}
          >
            <Image src={proceedToPay} />
            <Text> {t.proceedToPay}</Text>
            <Image src={rightArrow} />
          </Flex>
        </Button>
      </Flex>
    </>
  );
};

export default CheckoutPage;
