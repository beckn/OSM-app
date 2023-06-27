import { Box } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import DetailsCard from "../components/detailsCard/DetailsCard";
import OrderHistoryDetails from "../components/orderHistory/OrderHistoryDetails";
import { getOrderPlacementTimeline } from "../utilities/confirm-utils";
import {
  getTotalPriceOfSingleOrder,
  getTotalQuantityOfSingleOrder,
} from "../utilities/orderHistory-utils";

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const orderHistory = localStorage.getItem("orders");
    if (orderHistory) {
      setOrders(JSON.parse(orderHistory));
    }
  }, []);

  if (!orders.length) {
    return <p>No orders placed</p>;
  }
  return orders.map((order, index) => {
    const keyOfOrder = Object.keys(order);

    const createdAt = getOrderPlacementTimeline(
      (order[keyOfOrder[0]][0] as any).message.responses[0].message.order
        .created_at
    );

    const totalQuantityOfSingleOrder = getTotalQuantityOfSingleOrder(
      order[keyOfOrder[0]]
    );
    const totalPriceOfSingleOrder = getTotalPriceOfSingleOrder(
      order[keyOfOrder[0]]
    );

    return (
      <Box key={index} pt={"20px"}>
        <DetailsCard>
          <OrderHistoryDetails
            createdAt={createdAt}
            orderId={keyOfOrder[0]}
            quantity={totalQuantityOfSingleOrder}
            totalAmount={totalPriceOfSingleOrder}
          />
        </DetailsCard>
      </Box>
    );
  });
};

export default OrderHistory;
