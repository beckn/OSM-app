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
import { useRouter } from "next/router";

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

  const router = useRouter();
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
        <Box pb={"10px"}>
          <Text fontSize={"17px"}>{t.items}</Text>
        </Box>
        {cartItems.map((item) => (
          <DetailsCard key={item.id}>
            <ItemDetails
              title={item.descriptor.name}
              description={item.descriptor.short_desc}
              quantity={item.quantity}
              price={`${t.currencySymbol}${item.totalPrice}`}
            />
          </DetailsCard>
        ))}
      </Box>
      {/* end item details */}
      {/* start shipping detals */}
      {!initRequest.data ? (
        <Box>
          <Flex pb={"10px"} mt={"20px"} justifyContent={"space-between"}>
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
          <Flex pb={"10px"} mt={"20px"} justifyContent={"space-between"}>
            <Text fontSize={"17px"}>{t.shipping}</Text>
            <AddShippingButton
              imgFlag={!initRequest.data}
              formData={formData}
              setFormData={setFormData}
              addShippingdetailsBtnText={t.changeText}
              formSubmitHandler={formSubmitHandler}
            />
          </Flex>

          <ShippingDetails
            name={formData.name}
            location={formData.address}
            number={formData.mobileNumber}
          />
        </Box>
      )}
      {/* end shipping detals */}
      {/* start payment method */}
      <Box>
        <Flex pb={"10px"} mt={"20px"} justifyContent={"space-between"}>
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
            <Checkbox colorScheme={"red"} pr={"12px"} fontSize={"15px"}>
              {t.orderDetailsCheckboxText}
            </Checkbox>
          </Stack>
        </DetailsCard>
      </Box>
      {/* end payment method */}
      {/* start payment details */}
      {initRequest.data && (
        <Box>
          <Flex pb={"10px"} mt={"20px"} justifyContent={"space-between"}>
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
      <Box></Box>
      {/* end order policy */}
      {!initRequest.data ? (
        <Box position={"absolute"} left={"5%"} width={"90%"} bottom={"0"}>
          <ButtonComp
            buttonText={t.proceedToPay}
            background={"rgba(var(--color-primary))"}
            color={"rgba(var(--text-color))"}
            handleOnClick={() => {}}
            isDisabled={true}
          />
        </Box>
      ) : (
        <ButtonComp
          buttonText={t.proceedToCheckout}
          background={"rgba(var(--color-primary))"}
          color={"rgba(var(--text-color))"}
          handleOnClick={() => router.push("/paymentMode")}
          isDisabled={false}
        />
      )}
    </>
  );
};
export default CheckoutPage;
