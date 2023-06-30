import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Box,
  Button,
  Flex,
  Text,
  Image,
  Stack,
  Checkbox,
} from "@chakra-ui/react";
import Link from "next/link";
import DetailsCard from "../components/detailsCard/DetailsCard";
import ItemDetails from "../components/detailsCard/ItemDetails";
import ButtonComp from "../components/button/Button";
import { useLanguage } from "../hooks/useLanguage";
import ShippingDetails from "../components/detailsCard/ShippingDetails";
import PaymentDetails from "../components/detailsCard/PaymentDetails";
import TextareaWithReadMore from "../components/detailsCard/TextareaWithReadMore";
import proceedToPay from "../public/images/proceedToPay.svg";
import AddShippingButton from "../components/detailsCard/AddShippingButton";
import rightArrow from "../public/images/rightArrow.svg";
import {
  CartItemForRequest,
  DataPerBpp,
  ICartRootState,
  TransactionIdRootState,
} from "../lib/types/cart";
import { getCartItemsPerBpp } from "../utilities/cart-utils";
import useRequest from "../hooks/useRequest";
import { responseDataActions } from "../store/responseData-slice";
import {
  getPayloadForInitRequest,
  getSubTotalAndDeliveryCharges,
  getTotalCartItems,
} from "../utilities/checkout-utils";
import Loader from "../components/loader/Loader";

export type ShippingFormData = {
  name: string;
  mobileNumber: string;
  email: string;
  address: string;
  buildingName: string;
  pincode: string;
  landmark: string;
};

const CheckoutPage = () => {
  const [formData, setFormData] = useState<ShippingFormData>({
    name: "",
    mobileNumber: "",
    email: "",
    address: "",
    buildingName: "",
    pincode: "",
    landmark: "",
  });

  const initRequest = useRequest();
  const dispatch = useDispatch();
  const { t, locale } = useLanguage();
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const cartItems = useSelector((state: ICartRootState) => state.cart.items);
  const transactionId = useSelector(
    (state: { transactionId: TransactionIdRootState }) => state.transactionId
  );

  useEffect(() => {
    if (initRequest.data) {
      dispatch(responseDataActions.addInitResponse(initRequest.data));
    }
  }, [initRequest.data]);
  const formSubmitHandler = () => {
    if (formData) {
      const cartItemsPerBppPerProvider: DataPerBpp = getCartItemsPerBpp(
        cartItems as CartItemForRequest[]
      );
      const payLoadForInitRequest = getPayloadForInitRequest(
        cartItemsPerBppPerProvider,
        transactionId,
        formData
      );
      initRequest.fetchData(
        `${apiUrl}/client/v2/initialize_order`,
        "POST",
        payLoadForInitRequest
      );
    }
  };

  const totalItems = getTotalCartItems(cartItems);
  if (initRequest.loading) {
    return <Loader loadingText={t["initializingOrderLoader"]} />;
  }

  return (
    <>
      {/* <AppHeader appHeaderText={t.checkout} /> */}
      {/* start Item Details */}
      <Box>
        <Box pb={"20px"}>
          <Text>{t.items}</Text>
        </Box>
        {cartItems.map((item) => (
          <DetailsCard key={item.id}>
            <ItemDetails
              title={item.descriptor.name}
              description={item.descriptor.short_desc}
              quantity={item.quantity}
              price={`${t.currencySymbol}${item.totalPrice}`}
              itemImage={item.descriptor.images[0]}
            />
          </DetailsCard>
        ))}
      </Box>
      {/* end item details */}
      {/* start shipping detals */}
      {!initRequest.data ? (
        <Box>
          <Flex pb={"20px"} mt={"20px"} justifyContent={"space-between"}>
            <Text fontSize={"17px"}>{t.shipping}</Text>
          </Flex>
          <DetailsCard>
            <AddShippingButton
              imgFlag={!initRequest.data}
              formData={formData}
              setFormData={setFormData}
              addShippingdetailsBtnText={t.addShippingdetailsBtnText}
              formSubmitHandler={formSubmitHandler}
            />
          </DetailsCard>
        </Box>
      ) : (
        <Box>
          <Flex pb={"20px"} mt={"20px"} justifyContent={"space-between"}>
            <Text fontSize={"17px"}>{t.shipping}</Text>
            <AddShippingButton
              imgFlag={!initRequest.data}
              formData={formData}
              setFormData={setFormData}
              addShippingdetailsBtnText={t.changeText}
              formSubmitHandler={formSubmitHandler}
            />
          </Flex>
          <DetailsCard>
            <ShippingDetails
              name={formData.name}
              location={formData.address}
              number={formData.mobileNumber}
            />
          </DetailsCard>
        </Box>
      )}
      {/* end shipping detals */}
      {/* start payment method */}
      <Box>
        <Flex pb={"20px"} mt={"20px"} justifyContent={"space-between"}>
          <Text fontSize={"17px"}>{t.billing}</Text>
          {/* TODO :- Will enable this button after demo */}
          {/* <Text
            fontSize={"15px"}
            color={"rgba(var(--color-primary))"}
            cursor={"pointer"}
          >
            {t.changeText}
          </Text> */}
        </Flex>
        <DetailsCard>
          {/* <OrderDetailsCheckbox
            orderDetailsCheckboxText={t.orderDetailsCheckboxText}
          /> */}
          <Stack spacing={5} direction="row">
            <Checkbox colorScheme={"red"} pr={"12px"} fontSize={"17px"}>
              {t.orderDetailsCheckboxText}
            </Checkbox>
          </Stack>
        </DetailsCard>
      </Box>
      {/* end payment method */}
      {/* start payment details */}
      {initRequest.data && (
        <Box>
          <Flex pb={"20px"} mt={"20px"} justifyContent={"space-between"}>
            <Text fontSize={"17px"}>{t.paymentText}</Text>
          </Flex>
          <DetailsCard>
            <PaymentDetails
              subtotalText={t.subtotalText}
              subtotalValue={`${t.currencySymbol} ${
                getSubTotalAndDeliveryCharges(initRequest.data).subTotal
              }`}
              deliveryChargesText={t.deliveryChargesText}
              deliveryChargesValue={`${t.currencySymbol} ${
                getSubTotalAndDeliveryCharges(initRequest.data)
                  .totalDeliveryCharge
              }`}
              totalText={t.totalText}
              totalValue={`${
                getSubTotalAndDeliveryCharges(initRequest.data).subTotal
              }`}
            />
          </DetailsCard>
        </Box>
      )}
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
      {!initRequest.data ? (
        <ButtonComp
          buttonText={t.proceedToPay}
          background={"rgba(var(--color-primary))"}
          color={"rgba(var(--text-color))"}
          handleOnClick={() => {}}
          isDisabled={true}
        />
      ) : (
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
                <Text color={"rgba(var(--color-primary))"}>{`${
                  t.currencySymbol
                } ${
                  getSubTotalAndDeliveryCharges(initRequest.data).subTotal
                }`}</Text>
                <Text fontSize={"10px"} pl={"2px"}>
                  {totalItems} item(s)
                </Text>
              </Flex>
            </Box>
          </Button>
          <Link href={"/paymentMode"}>
            <Button
              isDisabled={!initRequest.data}
              height={"48px"}
              fontSize={"14px"}
              backgroundColor={
                initRequest.data ? "rgba(var(--color-primary))" : "#DFDFDF"
              }
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
          </Link>
        </Flex>
      )}
    </>
  );
};
export default CheckoutPage;
