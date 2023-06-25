import { useRouter } from "next/router";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import CartList from "../components/cart/CartList";
import OrderSummaryBox from "../components/cart/OrderSummaryBox";
import Loader from "../components/loader/Loader";
import useRequest from "../hooks/useRequest";
import {
  DataPerBpp,
  CartItemForRequest,
  ICartRootState,
  TransactionIdRootState,
} from "../lib/types/cart";
import { responseDataActions } from "../store/responseData-slice";
import {
  getCartItemsPerBpp,
  getPayloadForQuoteRequest,
} from "../utilities/cart-utils";

const Cart = () => {
  const quoteRequest = useRequest();
  const dispatch = useDispatch();
  const router = useRouter();
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  const cartItems = useSelector((state: ICartRootState) => state.cart.items);
  const transactionId = useSelector(
    (state: { transactionId: TransactionIdRootState }) => state.transactionId
  );
  const cartItemsPerBppPerProvider: DataPerBpp = getCartItemsPerBpp(
    cartItems as CartItemForRequest[]
  );
  const payLoadForQuoteRequest = getPayloadForQuoteRequest(
    cartItemsPerBppPerProvider,
    transactionId
  );

  const onOrderClick = () => {
    quoteRequest.fetchData(
      `${apiUrl}/client/v2/get_quote`,
      "POST",
      payLoadForQuoteRequest
    );
  };

  useEffect(() => {
    if (quoteRequest.data) {
      dispatch(responseDataActions.addQuoteResponse(quoteRequest.data));
      router.push("/checkoutPage");
    }
  }, [quoteRequest.data]);

  if (quoteRequest.loading) {
    return <Loader loadingText="Getting Quotes" />;
  }

  return (
    <div>
      {/* <Breadcrumb /> */}
      <div className="flex justify-center flex-col md:flex-row items-start relative max-w-[2100px] mx-auto">
        <CartList />
        <OrderSummaryBox onOrderClick={onOrderClick} />
      </div>
    </div>
  );
};

export default Cart;
