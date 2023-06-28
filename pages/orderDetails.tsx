import {
  Box,
  CardBody,
  Divider,
  Flex,
  Stack,
  Text,
  Image,
  StackDivider,
} from "@chakra-ui/react";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Accordion from "../components/accordion/Accordion";
import { AppHeader } from "../components/appHeader/AppHeader";
import Button from "../components/button/Button";
import CallphoneIcon from "../public/images/CallphoneIcon.svg";
import locationIcon from "../public/images/locationIcon.svg";
import nameIcon from "../public/images/nameIcon.svg";
import Loader from "../components/loader/Loader";
import { useLanguage } from "../hooks/useLanguage";
import useRequest from "../hooks/useRequest";
import { TransactionIdRootState } from "../lib/types/cart";
import { RetailItem } from "../lib/types/products";
import { ResponseModel } from "../lib/types/responseModel";
import {
  getConfirmMetaDataForBpp,
  getInitMetaDataPerBpp,
  getOrderPlacementTimeline,
  getPayloadForConfirmRequest,
  getPayloadForStatusRequest,
} from "../utilities/confirm-utils";
import {
  getDataPerBpp,
  storeOrderDetails,
} from "../utilities/orderDetails-utils";

const OrderDetails = () => {
  const [confirmData, setConfirmData] = useState<ResponseModel[]>([]);
  const { t } = useLanguage();
  const confirmRequest = useRequest();
  const statusRequest = useRequest();
  const router = useRouter();

  const transactionId = useSelector(
    (state: { transactionId: TransactionIdRootState }) => state.transactionId
  );

  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  const initResponse = useSelector(
    (state: any) => state.initResponse.initResponse
  );

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
      setConfirmData(confirmRequest.data);
      storeOrderDetails(confirmRequest.data);

      const confirmOrderMetaDataPerBpp = getConfirmMetaDataForBpp(
        confirmRequest.data
      );
      const payloadForStatusRequest = getPayloadForStatusRequest(
        confirmOrderMetaDataPerBpp,
        transactionId
      );
      statusRequest.fetchData(
        `${apiUrl}/client/v2/status`,
        "POST",
        payloadForStatusRequest
      );
    }
  }, [confirmRequest.data]);

  if (confirmRequest.loading) {
    return <Loader loadingText="Confirming order" />;
  }

  if (!confirmData.length) {
    return <></>;
  }

  const confirmDataPerBpp = getDataPerBpp(confirmData);

  return (
    <>
      <AppHeader appHeaderText={t.selectPaymentMethod} />
      <Accordion>
        <CardBody pt={"unset"}>
          <Flex
            pt={"unset"}
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <Text>{"Placed at"}</Text>
            <Text>
              {getOrderPlacementTimeline(
                confirmData[0].message.responses[0].message.order.created_at
              )}
            </Text>
          </Flex>
        </CardBody>
        {Object.keys(confirmDataPerBpp).map((key) => (
          <Box key={confirmDataPerBpp[key].id}>
            <Divider />
            <CardBody>
              <Flex
                pt={4}
                justifyContent={"space-between"}
                alignItems={"center"}
              >
                <Text>{"Shipment Details"}</Text>
                <Text>Id - 456789120</Text>
              </Flex>
              <Flex
                pt={4}
                justifyContent={"space-between"}
                alignItems={"center"}
              >
                <Text>{"Status"}</Text>
                <Text>{confirmDataPerBpp[key].state}</Text>
              </Flex>
              <Flex
                pt={4}
                justifyContent={"space-between"}
                alignItems={"center"}
              >
                <Text>{"Item(s)"}</Text>
                <Text
                  border={"1px solid rgba(var(--color-primary))"}
                  padding={"5px 25px"}
                  borderRadius={"4px"}
                  color={"rgba(var(--color-primary))"}
                >
                  {confirmDataPerBpp[key].items.length} Item(s)
                </Text>
              </Flex>
              {confirmDataPerBpp[key].items.map((item: RetailItem) => (
                <Text key={item.id} pt={2} fontSize={"10px"}>
                  {item.descriptor.name}
                </Text>
              ))}

              <Link href={"/trackOrder"}>
                <Box
                  textAlign={"center"}
                  paddingTop={"15px"}
                  color="rgba(var(--color-primary))"
                  fontWeight={"500"}
                >
                  {t["trackOrder"]}
                </Box>
              </Link>
            </CardBody>
          </Box>
        ))}
      </Accordion>
      <Accordion>
        <CardBody pt={"unset"}>
          <Box padding={"0px 15px"}>
            <Stack divider={<StackDivider />} spacing="4">
              <Flex alignItems={"center"}>
                <Image src={nameIcon} pr={"12px"} />
                <Text fontSize={"17px"}>Lisa</Text>
              </Flex>
              <Flex alignItems={"center"}>
                <Image src={locationIcon} pr={"12px"} />
                <Text fontSize={"15px"}>Mercure Montmartre</Text>
              </Flex>
              <Flex alignItems={"center"}>
                <Image src={CallphoneIcon} pr={"12px"} />
                <Text fontSize={"15px"}>+91 9876543210</Text>
              </Flex>
            </Stack>
          </Box>
        </CardBody>
      </Accordion>
      <Accordion>
        <CardBody pt={"unset"} pb={"unset"}>
          <Flex
            pb={"15px"}
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <Text>Subtotal</Text>
            <Text>229.684</Text>
          </Flex>
          <Flex
            justifyContent={"space-between"}
            alignItems={"center"}
            pb={"20px"}
          >
            <Text>Delivery Charges</Text>
            <Text>0</Text>
          </Flex>
          <Divider />
        </CardBody>
        <CardBody pb={"unset"}>
          <Flex
            pb={"15px"}
            justifyContent={"space-between"}
            alignItems={"center"}
            fontSize={"17px"}
            fontWeight={"700"}
          >
            <Text>Total</Text>
            <Text>229.684</Text>
          </Flex>
          <Flex
            justifyContent={"space-between"}
            alignItems={"center"}
            pb={"15px"}
          >
            <Text>Status</Text>
            <Text>Not paid</Text>
          </Flex>
          <Flex
            justifyContent={"space-between"}
            alignItems={"center"}
            pb={"15px"}
          >
            <Text>Method</Text>
            <Text>Cash on Delivery</Text>
          </Flex>
        </CardBody>
      </Accordion>
      <Accordion>
        <CardBody pt={"unset"} pb={"unset"}>
          <Flex
            pb={"15px"}
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <Text>ID</Text>
            <Text>./retail.kira...</Text>
          </Flex>
        </CardBody>
      </Accordion>
      <Button
        buttonText={t.contactSupport}
        background={"rgba(var(--color-primary))"}
        color={"rgba(var(--text-color))"}
        handleOnClick={() => {}}
        isDisabled={false}
      />
    </>
  );
};

export default OrderDetails;
