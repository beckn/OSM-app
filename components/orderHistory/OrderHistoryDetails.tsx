import React, { useState } from "react";
import { Box, Flex, Text, Image } from "@chakra-ui/react";
import pendingIcon from "../../public/images/pending.svg";
import completedIcon from "../../public/images/completed.svg";
import canceledIcon from "../../public/images/cancelled.svg";

interface OrderHistoryDetailsPropsModel {
  createdAt: string;
  orderId: string;
  totalAmount: number;
  quantity: number;
}

const OrderHistoryDetails: React.FC<OrderHistoryDetailsPropsModel> = (
  props
) => {
  const [orderHistory, setOrderHistory] = useState("pending");
  return (
    <Box>
      <Text pb={"5px"} fontSize={"10px"}>
        Placed at {props.createdAt}
      </Text>
      <Text fontWeight="600" pb={"5px"} fontSize={"12px"}>
        Order Details Id{" "}
        <span style={{ fontWeight: "700" }}>{props.orderId}</span>
      </Text>
      <Text fontWeight="600" pb={"5px"} fontSize={"10px"}>
        Order in progress
      </Text>
      <Text fontWeight="600" pb={"5px"} fontSize={"12px"}>
        € {props.totalAmount}
      </Text>
      <Flex
        fontSize={"10px"}
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        <Text>{props.quantity} items</Text>
        <Flex>
          {orderHistory === "pending" ? (
            <Image src={pendingIcon} paddingRight={"6px"} />
          ) : orderHistory === "completed" ? (
            <Image src={completedIcon} paddingRight={"6px"} />
          ) : (
            <Image src={canceledIcon} paddingRight={"6px"} />
          )}{" "}
          <Text>Pending</Text>
        </Flex>
      </Flex>
    </Box>
  );
};

export default OrderHistoryDetails;
