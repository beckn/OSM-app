import React from "react";
import { Box, Image, Stack, Text } from "@chakra-ui/react";

import orderConfirmmark from "../public/images/orderConfirmmark.svg";
import Button from "../components/button/Button";
import { useLanguage } from "../hooks/useLanguage";

const orderConfirmation = () => {
  const { t } = useLanguage();
  return (
    <Box position={"relative"}>
      <Image src={orderConfirmmark} margin={"60px auto"} />
      <Text fontSize={"24px"} textAlign={"center"}>
        Order confirm!
      </Text>
      <Stack>
        <Text
          textAlign={"center"}
          marginTop={"15px"}
          marginBottom={"15px"}
          fontSize={"12px"}
          lineHeight={"21px"}
        >
          Thank you! Our delivery agent will deliver your order
          <span color="rgba(var(--color-primary))"> #456789120</span> shortly!
        </Text>
      </Stack>
      <Button
        buttonText={t.backToHome}
        background={"rgba(var(--color-primary))"}
        color={"rgba(var(--text-color))"}
      />
      <Button
        buttonText={t.orderDetails}
        background={"rgba(var(--text-color))"}
        color={"rgba(var(--color-primary))"}
      />
    </Box>
  );
};

export default orderConfirmation;
