import React, { useEffect } from "react";
import { Box, Image, Stack, Text } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import orderConfirmmark from "../public/images/orderConfirmmark.svg";
import Button from "../components/button/Button";
import { useLanguage } from "../hooks/useLanguage";
import useRequest from "../hooks/useRequest";
import {
  getInitMetaDataPerBpp,
  getPayloadForConfirmRequest,
} from "../utilities/confirm-utils";
import Loader from "../components/loader/Loader";
import { TransactionIdRootState } from "../lib/types/cart";
import { useRouter } from "next/router";

const OrderConfirmation = () => {
  const { t } = useLanguage();
  const confirmRequest = useRequest();
  const router = useRouter();
  const initResponse = useSelector(
    (state: any) => state.initResponse.initResponse
  );

  const transactionId = useSelector(
    (state: { transactionId: TransactionIdRootState }) => state.transactionId
  );

  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    if (initResponse) {
      const initMetaDataPerBpp = getInitMetaDataPerBpp(initResponse);

      const payLoadForConfirmRequest = getPayloadForConfirmRequest(
        initMetaDataPerBpp,
        transactionId
      );
      confirmRequest.fetchData(
        `${apiUrl}/client/v2/confirm`,
        "POST",
        payLoadForConfirmRequest
      );
    }
  }, []);

  useEffect(() => {
    if (confirmRequest.data) {
      localStorage.setItem("confirmData", JSON.stringify(confirmRequest.data));
    }
  }, [confirmRequest.data]);

  if (confirmRequest.loading) {
    return <Loader loadingText="Confirming order" />;
  }

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
        handleOnClick={() => {}}
        isDisabled={false}
      />
      <Button
        buttonText={t.orderDetails}
        background={"rgba(var(--text-color))"}
        color={"rgba(var(--color-primary))"}
        handleOnClick={() => router.push("/orderDetails")}
        isDisabled={false}
      />
    </Box>
  );
};

export default OrderConfirmation;
