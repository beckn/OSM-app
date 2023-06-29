import React, { useEffect, useState } from "react";
import { Box, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { AppHeader } from "../components/appHeader/AppHeader";
import Button from "../components/button/Button";
import CardWithCheckBox from "../components/card/Card";
import { useLanguage } from "../hooks/useLanguage";
import { useSelector } from "react-redux";
import { getSubTotalAndDeliveryCharges } from "../utilities/checkout-utils";

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
        <AppHeader appHeaderText={t.selectPaymentMethod} />
        <Text marginBottom={"10px"}>Other</Text>
        <CardWithCheckBox paymentMethod={t.cashOnDelivery} />
      </Box>

      <Button
        buttonText={`${t.proceedToPay} Rs.${totalPrice}`}
        background={"rgba(var(--color-primary))"}
        color={"rgba(var(--text-color))"}
        isDisabled={false}
        handleOnClick={() => router.push("/orderConfirmation")}
      />
    </>
  );
}

export default PaymentMode;
