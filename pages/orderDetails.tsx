import {
  Box,
  CardBody,
  Divider,
  Flex,
  Stack,
  Text,
  Image,
  StackDivider,
  Card,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import Accordion from "../components/accordion/Accordion";
import CallphoneIcon from "../public/images/CallphoneIcon.svg";
import locationIcon from "../public/images/locationIcon.svg";
import nameIcon from "../public/images/nameIcon.svg";
import { useLanguage } from "../hooks/useLanguage";
import { ResponseModel } from "../lib/types/responseModel";
import {
  getConfirmMetaDataForBpp,
  getOrderPlacementTimeline,
  getPayloadForStatusRequest,
} from "../utilities/confirm-utils";
import {
  getDataPerBpp,
  storeOrderDetails,
} from "../utilities/orderDetails-utils";
import { getSubTotalAndDeliveryChargesForOrder } from "../utilities/orderHistory-utils";
import lineBlack from "../public/images/lineBlack.svg";
import TrackIcon from "../public/images/TrackIcon.svg";
import ViewMoreOrderModal from "../components/orderDetails/ViewMoreOrderModal";
import { useSelector } from "react-redux";
import { TransactionIdRootState } from "../lib/types/cart";
import useRequest from "../hooks/useRequest";

const OrderDetails = () => {
  const [allOrderDelivered, setAllOrderDelivered] = useState(false);
  const [confirmData, setConfirmData] = useState<ResponseModel[]>([]);
  const [statusResponse, setStatusResponse] = useState([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [formData, setFormData] = useState();
  const transactionId = useSelector(
    (state: { transactionId: TransactionIdRootState }) => state.transactionId
  );
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const statusRequest = useRequest();

  const { t } = useLanguage();

  useEffect(() => {
    if (localStorage) {
      const stringifiedConfirmData = localStorage.getItem("confirmData");
      if (stringifiedConfirmData) {
        const parsedConfirmedData = JSON.parse(stringifiedConfirmData);
        setConfirmData(parsedConfirmedData);
        storeOrderDetails(parsedConfirmedData);

        const confirmOrderMetaDataPerBpp =
          getConfirmMetaDataForBpp(parsedConfirmedData);
        const payloadForStatusRequest = getPayloadForStatusRequest(
          confirmOrderMetaDataPerBpp,
          transactionId
        );

        const intervalId = setInterval(() => {
          statusRequest.fetchData(
            `${apiUrl}/client/v2/status`,
            "POST",
            payloadForStatusRequest
          );
        }, 2000);

        return () => {
          clearInterval(intervalId);
        };
      }
    }
  }, []);

  useEffect(() => {
    if (statusRequest.data) {
      setStatusResponse(statusRequest.data as any);
    }
  }, [statusRequest.data]);

  if (!confirmData.length) {
    return <></>;
  }

  const confirmDataPerBpp = getDataPerBpp(confirmData);

  const orderFromConfirmData =
    confirmData[0].message.responses[0].message.order;

  const shippingDetails = {
    name: orderFromConfirmData.billing.name.replace(/^\.+/, "").trim(),
    address: orderFromConfirmData.billing.address.state,
    phone: orderFromConfirmData.billing.phone,
  };

  const { subTotal, totalDeliveryCharge } =
    getSubTotalAndDeliveryChargesForOrder(confirmData);

  const orderState = orderFromConfirmData.payment.status;

  const fulfillmentId = orderFromConfirmData.fulfillment.id;

  const totalQuantityOfOrder = (res: any) => {
    let count = 0;
    res.message.order.items.forEach((item: any) => {
      count += item.quantity.count;
    });
    return count;
  };

  return (
    <>
      {/* <AppHeader appHeaderText={t.selectPaymentMethod} /> */}
      {allOrderDelivered ? (
        <Card
          mb={"20px"}
          border={"1px solid rgba(94, 196, 1, 1)"}
          className="border_radius_all"
        >
          <CardBody padding={"15px 20px"}>
            <Flex alignItems={"center"} pb={"3px"}>
              <Image width={"12px"} height={"13px"} src={TrackIcon} />
              <Text pl={"8px"} fontSize={"17px"} fontWeight={"600"}>
                All orders delivered!
              </Text>
            </Flex>
            <Flex alignItems={"center"} fontSize={"15px"} pl={"20px"}>
              <Text>How did we do?</Text>
              <Text pl={"10px"} color={"rgba(var(--color-primary))"}>
                Rate Us
              </Text>
            </Flex>
          </CardBody>
        </Card>
      ) : null}
      <Accordion
        accordionHeader={
          <Box>
            <Text>Order Summary</Text>
          </Box>
        }
      >
        <CardBody pt={"unset"} fontSize={"15px"}>
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
          {Object.keys(confirmDataPerBpp).map((key) => (
            <Box key={confirmDataPerBpp[key].id}>
              <Flex
                pt={4}
                justifyContent={"space-between"}
                alignItems={"center"}
              >
                <Text>Orders Fulfilled</Text>
                <Box>
                  <Text as={"span"} pr={"2px"}>
                    {
                      statusResponse.filter(
                        (res: any) => res.message.order.state !== '"DELIVERED"'
                      ).length
                    }
                  </Text>
                  <Text as={"span"}>of</Text>
                  <Text as={"span"} pl={"2px"}>
                    {statusResponse.length}
                  </Text>
                </Box>
              </Flex>
            </Box>
          ))}
        </CardBody>
      </Accordion>

      {statusResponse.map((res: any) => (
        <Accordion
          accordionHeader={
            <Box>
              <Text mb={"15px"}>Order ID #123456789102 </Text>
              <Flex justifyContent={"space-between"} alignItems={"center"}>
                <Flex>
                  <Text
                    textOverflow={"ellipsis"}
                    overflow={"hidden"}
                    whiteSpace={"nowrap"}
                    width={"70%"}
                    fontSize={"12px"}
                    fontWeight={"400"}
                  >
                    {res.message.order.items[0].descriptor.name}
                  </Text>
                  <Text
                    pl={"5px"}
                    color={"rgba(var(--color-primary))"}
                    fontSize={"12px"}
                    fontWeight={"600"}
                    onClick={onOpen}
                  >
                    +{totalQuantityOfOrder(res) - 1}
                  </Text>
                </Flex>

                <Text fontSize={"15px"} fontWeight={"600"}>
                  Pending
                </Text>
              </Flex>
            </Box>
          }
        >
          <ViewMoreOrderModal
            isOpen={isOpen}
            onOpen={onOpen}
            onClose={onClose}
          />
          <Divider mb={"20px"} />
          <CardBody pt={"unset"}>
            <Box>
              <Flex alignItems={"center"} justifyContent={"space-between"}>
                <Flex alignItems={"center"}>
                  <Image width={"12px"} height={"13px"} src={TrackIcon} />
                  <Text
                    paddingLeft={"10px"}
                    fontSize={"15px"}
                    fontWeight={"600"}
                  >
                    {t.orderConfirmed}
                  </Text>
                </Flex>
              </Flex>
              <Flex>
                <Image src={lineBlack} width={"12px"} height={"40px"} />
                <Text paddingLeft={"10px"} fontSize={"10px"} pt={"10px"}>
                  21st Jun 2021, 12:11pm
                </Text>
              </Flex>
            </Box>
            <Box>
              <Flex alignItems={"center"} justifyContent={"space-between"}>
                <Flex alignItems={"center"}>
                  <Image width={"12px"} height={"13px"} src={TrackIcon} />
                  <Text
                    paddingLeft={"10px"}
                    fontSize={"15px"}
                    fontWeight={"600"}
                  >
                    Order Packed
                  </Text>
                </Flex>
              </Flex>
              <Flex>
                <Image src={lineBlack} width={"12px"} height={"40px"} />
                <Text paddingLeft={"10px"} fontSize={"10px"} pt={"10px"}>
                  21st Jun 2021, 12:21pm
                </Text>
              </Flex>
            </Box>
            <Box>
              <Flex alignItems={"center"} justifyContent={"space-between"}>
                <Flex alignItems={"center"}>
                  <Image width={"12px"} height={"13px"} src={TrackIcon} />
                  <Text
                    paddingLeft={"10px"}
                    fontSize={"15px"}
                    fontWeight={"600"}
                  >
                    Order Out for Delivery
                  </Text>
                </Flex>
                <Text fontSize={"15px"} color={"rgba(var(--color-primary))"}>
                  Track
                </Text>
              </Flex>
              <Flex>
                <Text paddingLeft={"22px"} fontSize={"10px"} pt={"10px"}>
                  21st Jun 2021, 12:31pm
                </Text>
              </Flex>
            </Box>
          </CardBody>
        </Accordion>
      ))}

      <Accordion accordionHeader={t.shipping}>
        <CardBody pt={"unset"} pb={"15px"}>
          <Box>
            <Stack divider={<StackDivider />} spacing="4">
              <Flex alignItems={"center"}>
                <Image src={nameIcon} pr={"12px"} />
                <Text fontSize={"17px"}>{shippingDetails.name}</Text>
              </Flex>
              <Flex alignItems={"center"}>
                <Image src={locationIcon} pr={"12px"} />
                <Text fontSize={"15px"}>{shippingDetails.address}</Text>
              </Flex>
              <Flex alignItems={"center"}>
                <Image src={CallphoneIcon} pr={"12px"} />
                <Text fontSize={"15px"}>{shippingDetails.phone}</Text>
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
            <Text>Rs.{subTotal}</Text>
          </Flex>
          <Flex
            justifyContent={"space-between"}
            alignItems={"center"}
            pb={"20px"}
          >
            <Text>Delivery Charges</Text>
            <Text>Rs.{totalDeliveryCharge}</Text>
          </Flex>
          <Divider />
        </CardBody>
        <CardBody pb={"unset"} pt={"15px"}>
          <Flex
            pb={"15px"}
            justifyContent={"space-between"}
            alignItems={"center"}
            fontSize={"17px"}
            fontWeight={"600"}
          >
            <Text>Total</Text>
            <Text>Rs.{subTotal + totalDeliveryCharge}</Text>
          </Flex>
          <Flex
            fontSize={"15px"}
            justifyContent={"space-between"}
            alignItems={"center"}
            pb={"15px"}
          >
            <Text>Status</Text>
            <Text>{orderState}</Text>
          </Flex>
          <Flex
            fontSize={"15px"}
            justifyContent={"space-between"}
            alignItems={"center"}
            pb={"15px"}
          >
            <Text>Payment Method</Text>
            <Text>Cash on Delivery</Text>
          </Flex>
        </CardBody>
      </Accordion>
    </>
  );
};

export default OrderDetails;
