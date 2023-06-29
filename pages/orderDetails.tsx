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
import Accordion from "../components/accordion/Accordion";
import CallphoneIcon from "../public/images/CallphoneIcon.svg";
import locationIcon from "../public/images/locationIcon.svg";
import nameIcon from "../public/images/nameIcon.svg";
import { useLanguage } from "../hooks/useLanguage";
import { RetailItem } from "../lib/types/products";
import { ResponseModel } from "../lib/types/responseModel";
import { getOrderPlacementTimeline } from "../utilities/confirm-utils";
import {
  getDataPerBpp,
  storeOrderDetails,
} from "../utilities/orderDetails-utils";
import {
  getSubTotalAndDeliveryChargesForOrder,
  retrieveArrayById,
} from "../utilities/orderHistory-utils";

const OrderDetails = () => {
  const [confirmData, setConfirmData] = useState<ResponseModel[]>([]);
  const { t } = useLanguage();
  const router = useRouter();

  const { orderId } = router.query;

  useEffect(() => {
    if (orderId && localStorage) {
      const stringifiedStoredOrders = localStorage.getItem("orders");
      if (stringifiedStoredOrders) {
        const parsedStoredOrders = JSON.parse(stringifiedStoredOrders);
        const orderById = retrieveArrayById(
          orderId as string,
          parsedStoredOrders
        );

        setConfirmData(orderById);
      }
    }
  }, []);

  useEffect(() => {
    if (localStorage) {
      const stringifiedConfirmData = localStorage.getItem("confirmData");

      if (stringifiedConfirmData) {
        const parsedConfirmedData = JSON.parse(stringifiedConfirmData);
        setConfirmData(parsedConfirmedData);
        storeOrderDetails(parsedConfirmedData);
      }
    }
  }, []);

  if (!confirmData.length) {
    return <></>;
  }

  const confirmDataPerBpp = getDataPerBpp(confirmData);

  const orderFromConfirmData =
    confirmData[0].message.responses[0].message.order;

  const shippingDetails = () => {
    const name: string = orderFromConfirmData.billing.name;
    const parts = name.split("/").filter((part) => part !== "");
    const parsedName = parts[parts.length - 2];

    return {
      name: parsedName,
      address: orderFromConfirmData.billing.address.state,
      phone: orderFromConfirmData.billing.phone,
    };
  };

  const { subTotal, totalDeliveryCharge } =
    getSubTotalAndDeliveryChargesForOrder(confirmData);

  const orderState = orderFromConfirmData.payment.status;

  const fulfillmentId = orderFromConfirmData.fulfillment.id;

  return (
    <>
      <Accordion accordionHeader={t.order}>
        <CardBody pt={"unset"}>
          <Flex
            pt={"unset"}
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <Text>{"Placed at"}</Text>
            <Text>
              {getOrderPlacementTimeline(orderFromConfirmData.created_at)}
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

      <Accordion accordionHeader={t.shipping}>
        <CardBody pt={"unset"}>
          <Box padding={"0px 15px"}>
            <Stack divider={<StackDivider />} spacing="4">
              <Flex alignItems={"center"}>
                <Image src={nameIcon} pr={"12px"} />
                <Text fontSize={"17px"}>{shippingDetails().name}</Text>
              </Flex>
              <Flex alignItems={"center"}>
                <Image src={locationIcon} pr={"12px"} />
                <Text fontSize={"15px"}>{shippingDetails().address}</Text>
              </Flex>
              <Flex alignItems={"center"}>
                <Image src={CallphoneIcon} pr={"12px"} />
                <Text fontSize={"15px"}>{shippingDetails().phone}</Text>
              </Flex>
            </Stack>
          </Box>
        </CardBody>
      </Accordion>

      <Accordion accordionHeader={t.paymentText}>
        <CardBody pt={"unset"} pb={"unset"}>
          <Flex
            pb={"15px"}
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <Text>Subtotal</Text>
            <Text>{t.currencySymbol}{subTotal}</Text>
          </Flex>
          <Flex
            justifyContent={"space-between"}
            alignItems={"center"}
            pb={"20px"}
          >
            <Text>Delivery Charges</Text>
            <Text>{t.currencySymbol}{totalDeliveryCharge}</Text>
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
            <Text>{t.currencySymbol}{subTotal + totalDeliveryCharge}</Text>
          </Flex>
          <Flex
            justifyContent={"space-between"}
            alignItems={"center"}
            pb={"15px"}
          >
            <Text>Status</Text>
            <Text>{orderState}</Text>
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
      <Accordion accordionHeader={t.fulfillment}>
        <CardBody pt={"unset"} pb={"unset"}>
          <Flex
            pb={"15px"}
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <Text>ID</Text>
            <Text
              overflow={"hidden"}
              textOverflow={"ellipsis"}
              width={"150px"}
              whiteSpace={"nowrap"}
            >
              {fulfillmentId}
            </Text>
          </Flex>
        </CardBody>
      </Accordion>
    </>
  );
};

export default OrderDetails;
