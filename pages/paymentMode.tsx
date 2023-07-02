import React, { useEffect, useState } from "react";
import { Box, Flex, Text, Image, Card, CardBody } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { AppHeader } from "../components/appHeader/AppHeader";
import Button from "../components/button/Button";
import CardWithCheckBox from "../components/card/Card";
import { useLanguage } from "../hooks/useLanguage";
import { useSelector } from "react-redux";
import { getSubTotalAndDeliveryCharges } from "../utilities/checkout-utils";
import creditCardImg from "../public/images/creditCardImg.svg";

function PaymentMode() {
  const [totalPrice, setTotalPrice] = useState(0);
  const { t } = useLanguage();
  const router = useRouter();

  const initData = useSelector((state: any) => state.initResponse.initResponse);

  useEffect(() => {
    if (initData) {
      const { subTotal, totalDeliveryCharge } =
        getSubTotalAndDeliveryCharges(initData);
      setTotalPrice(subTotal + totalDeliveryCharge);
    }
  }, []);

  return (
    <>
      <Box height={"72vh"} position={"relative"}>
        {/* <AppHeader appHeaderText={t.selectPaymentMethod} /> */}
        <Box>
          <Flex
            justifyContent={"space-between"}
            alignItems={"center"}
            fontSize={"17px"}
            mb={"10px"}
          >
            <Text>Credit & Debit cards</Text>
            <Text color={"rgba(var(--color-primary))"} fontSize={"15px"}>
              Add Card
            </Text>
          </Flex>
          <Card className="border_radius_all" mb={"20px"}>
            <CardBody padding={"15px 20px"}>
              <Image src={creditCardImg} />
            </CardBody>
          </Card>
        </Box>
        <Text marginBottom={"8px"} fontSize={"17px"}>
          Other
        </Text>
        <CardWithCheckBox paymentMethod={t.cashOnDelivery} />
      </Box>
      <Box position={"absolute"} bottom={"10px"} width={"90%"}>
        <Button
          buttonText={t.confirmOrder}
          background={"rgba(var(--color-primary))"}
          color={"rgba(var(--text-color))"}
          isDisabled={false}
          handleOnClick={() => router.push("/orderConfirmation")}
        />
      </Box>
    </>
  );
}

export default PaymentMode;
