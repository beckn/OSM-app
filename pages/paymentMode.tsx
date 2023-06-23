import { Box, Text } from "@chakra-ui/react";
import React from "react";
import { AppHeader } from "../components/appHeader/AppHeader";
import Button from "../components/button/Button";
import CardWithCheckBox from "../components/card/Card";
import { useLanguage } from "../hooks/useLanguage";

function PaymentMode() {
  const { t } = useLanguage();
  return (
    <>
      <Box height={"72vh"} position={"relative"}>
        <AppHeader appHeaderText={t.selectPaymentMethod} />
        <Text marginBottom={"10px"}>Other</Text>
        <CardWithCheckBox paymentMethod={t.cashOnDelivery} />
      </Box>
      <Button
        buttonText={t.proceedToPay}
        background={"rgba(var(--color-primary))"}
        color={"rgba(var(--text-color))"}
        handleOnClick={() => {}}
        isDisabled={false}
      />
    </>
  );
}

export default PaymentMode;
