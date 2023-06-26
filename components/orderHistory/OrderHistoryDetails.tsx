import React, { useState } from "react";
import { Box, Flex, Text, Image } from "@chakra-ui/react";
import pendingIcon from "../../public/images/pending.svg";
import completedIcon from "../../public/images/completed.svg";
import canceledIcon from "../../public/images/cancelled.svg";

const OrderHistoryDetails = () => {
  const [orderHistory, setOrderHistory] = useState("pending");
  return (
    <Box>
      <Text pb={"5px"} fontSize={"10px"}>
        Placed at 21st Jun 2021, 3.30pm
      </Text>
      <Text fontWeight="600" pb={"5px"} fontSize={"12px"}>
        Order Details Id <span style={{ fontWeight: "700" }}>456788123</span>
      </Text>
      <Text fontWeight="600" pb={"5px"} fontSize={"10px"}>
        Order in progress
      </Text>
      <Text fontWeight="600" pb={"5px"} fontSize={"12px"}>
        € 439.4
      </Text>
      <Flex
        fontSize={"10px"}
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        <Text>2 items</Text>
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
