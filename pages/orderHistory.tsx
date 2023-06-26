import { Box } from "@chakra-ui/react";
import React from "react";
import DetailsCard from "../components/detailsCard/DetailsCard";
import OrderHistoryDetails from "../components/orderHistory/OrderHistoryDetails";

const OrderHistory = () => {
  return (
    <Box pt={"20px"}>
      <DetailsCard>
        <OrderHistoryDetails />
      </DetailsCard>
    </Box>
  );
};

export default OrderHistory;
