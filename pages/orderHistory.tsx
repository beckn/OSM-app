import { Box } from "@chakra-ui/react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import DetailsCard from "../components/detailsCard/DetailsCard";
import Loader from "../components/loader/Loader";
import OrderHistoryDetails from "../components/orderHistory/OrderHistoryDetails";
import useRequest from "../hooks/useRequest";
import { getOrderPlacementTimeline } from "../utilities/confirm-utils";
import {
  getTotalPriceOfSingleOrder,
  getTotalQuantityOfSingleOrder,
} from "../utilities/orderHistory-utils";

const OrderHistory = () => {
  const [orderHistoryList, setOrderHistoryList] = useState<any>([]);
  const { data, fetchData, loading, error } = useRequest();
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    if (localStorage && localStorage.getItem("userPhone")) {
      fetchData(
        `${apiUrl}/client/v2/orders?userId=${localStorage.getItem(
          "userPhone"
        )}`,
        "GET"
      );
    }
  }, []);

  useEffect(() => {
    if (data) {
      const ordersArray = (data as any).orders;
      localStorage.setItem("orderHistoryArray", JSON.stringify(ordersArray));
      setOrderHistoryList(ordersArray);
    }
  }, [data]);

  if (loading) {
    return <Loader />;
  }

  if (!orderHistoryList.length) {
    return <p>No orders placed</p>;
  }

  return orderHistoryList.map((orderInHistory: any, index: number) => {
    const createdAt = getOrderPlacementTimeline(
      orderInHistory.orders.length > 0
        ? orderInHistory.orders[0].message.order.created_at
        : ""
    );

    const totalQuantityOfSingleOrder = getTotalQuantityOfSingleOrder(
      orderInHistory.orders
    );
    const totalPriceOfSingleOrder = getTotalPriceOfSingleOrder(
      orderInHistory.orders
    );

    return (
      <Link
        key={index}
        href={{
          pathname: "/orderDetails",
          query: { orderId: orderInHistory.parentOrderId },
        }}
      >
        <Box pt={"20px"}>
          <DetailsCard>
            <OrderHistoryDetails
              createdAt={createdAt}
              orderId={orderInHistory.parentOrderId}
              quantity={totalQuantityOfSingleOrder}
              totalAmount={totalPriceOfSingleOrder}
            />
          </DetailsCard>
        </Box>
      </Link>
    );
  });
};

export default OrderHistory;
