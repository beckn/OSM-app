import { Box, Flex, Text, Image } from "@chakra-ui/react";
import { getOrderPlacementTimeline } from "../../utilities/confirm-utils";
import lineBlack from "../../public/images/lineBlack.svg";
import TrackIcon from "../../public/images/TrackIcon.svg";

const orderStatusMap = {
  INITIATED: "Status Pending",
  ACKNOWLEDGED: "Items Confirmed",
  PACKED: "Order Packed",
  SHIPPED: "Order Out for Delivery",
  DELIVERED: "Order Delivered",
};

export const renderOrderStatusList = (res: any) => {
  const order = res.message.order;
  if (order.state === "INITIATED") {
    return (
      <Box>
        <Flex alignItems={"center"} justifyContent={"space-between"}>
          <Flex alignItems={"center"}>
            <Image width={"12px"} height={"13px"} src={TrackIcon} />
            <Text paddingLeft={"10px"} fontSize={"15px"} fontWeight={"600"}>
              {orderStatusMap["INITIATED"]}
            </Text>
          </Flex>
          {order.fulfillment.tracking && (
            <Text fontSize={"15px"} color={"rgba(var(--color-primary))"}>
              Track
            </Text>
          )}
        </Flex>
        <Flex>
          <Image src={lineBlack} width={"12px"} height={"40px"} />
          <Text paddingLeft={"10px"} fontSize={"10px"} pt={"10px"}>
            {getOrderPlacementTimeline(res.context.timestamp)}
          </Text>
        </Flex>
      </Box>
    );
  }
  if (order.state === "ACKNOWLEDGED") {
    return (
      <>
        <Box>
          <Flex alignItems={"center"} justifyContent={"space-between"}>
            <Flex alignItems={"center"}>
              <Image width={"12px"} height={"13px"} src={TrackIcon} />
              <Text paddingLeft={"10px"} fontSize={"15px"} fontWeight={"600"}>
                {orderStatusMap["INITIATED"]}
              </Text>
            </Flex>
          </Flex>
          <Flex>
            <Image src={lineBlack} width={"12px"} height={"40px"} />
            <Text paddingLeft={"10px"} fontSize={"10px"} pt={"10px"}>
              {getOrderPlacementTimeline(res.context.timestamp)}
            </Text>
          </Flex>
        </Box>
        <Box>
          <Flex alignItems={"center"} justifyContent={"space-between"}>
            <Flex alignItems={"center"}>
              <Image width={"12px"} height={"13px"} src={TrackIcon} />
              <Text paddingLeft={"10px"} fontSize={"15px"} fontWeight={"600"}>
                {orderStatusMap["ACKNOWLEDGED"]}
              </Text>
            </Flex>
          </Flex>
          <Flex>
            <Image src={lineBlack} width={"12px"} height={"40px"} />
            <Text paddingLeft={"10px"} fontSize={"10px"} pt={"10px"}>
              {getOrderPlacementTimeline(res.context.timestamp)}
            </Text>
          </Flex>
        </Box>
      </>
    );
  }
  if (order.state === "PACKED") {
    return (
      <>
        <Box>
          <Flex alignItems={"center"} justifyContent={"space-between"}>
            <Flex alignItems={"center"}>
              <Image width={"12px"} height={"13px"} src={TrackIcon} />
              <Text paddingLeft={"10px"} fontSize={"15px"} fontWeight={"600"}>
                {orderStatusMap["INITIATED"]}
              </Text>
            </Flex>
          </Flex>
          <Flex>
            <Image src={lineBlack} width={"12px"} height={"40px"} />
            <Text paddingLeft={"10px"} fontSize={"10px"} pt={"10px"}>
              {getOrderPlacementTimeline(res.context.timestamp)}
            </Text>
          </Flex>
        </Box>
        <Box>
          <Flex alignItems={"center"} justifyContent={"space-between"}>
            <Flex alignItems={"center"}>
              <Image width={"12px"} height={"13px"} src={TrackIcon} />
              <Text paddingLeft={"10px"} fontSize={"15px"} fontWeight={"600"}>
                {orderStatusMap["ACKNOWLEDGED"]}
              </Text>
            </Flex>
          </Flex>
          <Flex>
            <Image src={lineBlack} width={"12px"} height={"40px"} />
            <Text paddingLeft={"10px"} fontSize={"10px"} pt={"10px"}>
              {getOrderPlacementTimeline(res.context.timestamp)}
            </Text>
          </Flex>
        </Box>
        <Box>
          <Flex alignItems={"center"} justifyContent={"space-between"}>
            <Flex alignItems={"center"}>
              <Image width={"12px"} height={"13px"} src={TrackIcon} />
              <Text paddingLeft={"10px"} fontSize={"15px"} fontWeight={"600"}>
                {orderStatusMap["PACKED"]}
              </Text>
            </Flex>
          </Flex>
          <Flex>
            <Image src={lineBlack} width={"12px"} height={"40px"} />
            <Text paddingLeft={"10px"} fontSize={"10px"} pt={"10px"}>
              {getOrderPlacementTimeline(res.context.timestamp)}
            </Text>
          </Flex>
        </Box>
      </>
    );
  }
  if (order.state === "SHIPPED") {
    return (
      <>
        <Box>
          <Flex alignItems={"center"} justifyContent={"space-between"}>
            <Flex alignItems={"center"}>
              <Image width={"12px"} height={"13px"} src={TrackIcon} />
              <Text paddingLeft={"10px"} fontSize={"15px"} fontWeight={"600"}>
                {orderStatusMap["INITIATED"]}
              </Text>
            </Flex>
          </Flex>
          <Flex>
            <Image src={lineBlack} width={"12px"} height={"40px"} />
            <Text paddingLeft={"10px"} fontSize={"10px"} pt={"10px"}>
              {getOrderPlacementTimeline(res.context.timestamp)}
            </Text>
          </Flex>
        </Box>
        <Box>
          <Flex alignItems={"center"} justifyContent={"space-between"}>
            <Flex alignItems={"center"}>
              <Image width={"12px"} height={"13px"} src={TrackIcon} />
              <Text paddingLeft={"10px"} fontSize={"15px"} fontWeight={"600"}>
                {orderStatusMap["ACKNOWLEDGED"]}
              </Text>
            </Flex>
          </Flex>
          <Flex>
            <Image src={lineBlack} width={"12px"} height={"40px"} />
            <Text paddingLeft={"10px"} fontSize={"10px"} pt={"10px"}>
              {getOrderPlacementTimeline(order.context.timestamp)}
            </Text>
          </Flex>
        </Box>
        <Box>
          <Flex alignItems={"center"} justifyContent={"space-between"}>
            <Flex alignItems={"center"}>
              <Image width={"12px"} height={"13px"} src={TrackIcon} />
              <Text paddingLeft={"10px"} fontSize={"15px"} fontWeight={"600"}>
                {orderStatusMap["PACKED"]}
              </Text>
            </Flex>
          </Flex>
          <Flex>
            <Image src={lineBlack} width={"12px"} height={"40px"} />
            <Text paddingLeft={"10px"} fontSize={"10px"} pt={"10px"}>
              {getOrderPlacementTimeline(res.context.timestamp)}
            </Text>
          </Flex>
        </Box>
        <Box>
          <Flex alignItems={"center"} justifyContent={"space-between"}>
            <Flex alignItems={"center"}>
              <Image width={"12px"} height={"13px"} src={TrackIcon} />
              <Text paddingLeft={"10px"} fontSize={"15px"} fontWeight={"600"}>
                {getOrderPlacementTimeline(res.context.timestamp)}
              </Text>
            </Flex>
          </Flex>
          <Flex>
            <Image src={lineBlack} width={"12px"} height={"40px"} />
            <Text paddingLeft={"10px"} fontSize={"10px"} pt={"10px"}>
              {getOrderPlacementTimeline(res.context.timestamp)}
            </Text>
          </Flex>
        </Box>
      </>
    );
  }
  if (order.state === "DELIVERED") {
    return (
      <>
        <Box>
          <Flex alignItems={"center"} justifyContent={"space-between"}>
            <Flex alignItems={"center"}>
              <Image width={"12px"} height={"13px"} src={TrackIcon} />
              <Text paddingLeft={"10px"} fontSize={"15px"} fontWeight={"600"}>
                {orderStatusMap["INITIATED"]}
              </Text>
            </Flex>
          </Flex>
          <Flex>
            <Image src={lineBlack} width={"12px"} height={"40px"} />
            <Text paddingLeft={"10px"} fontSize={"10px"} pt={"10px"}>
              {getOrderPlacementTimeline(res.context.timestamp)}
            </Text>
          </Flex>
        </Box>
        <Box>
          <Flex alignItems={"center"} justifyContent={"space-between"}>
            <Flex alignItems={"center"}>
              <Image width={"12px"} height={"13px"} src={TrackIcon} />
              <Text paddingLeft={"10px"} fontSize={"15px"} fontWeight={"600"}>
                {orderStatusMap["ACKNOWLEDGED"]}
              </Text>
            </Flex>
          </Flex>
          <Flex>
            <Image src={lineBlack} width={"12px"} height={"40px"} />
            <Text paddingLeft={"10px"} fontSize={"10px"} pt={"10px"}>
              {getOrderPlacementTimeline(res.context.timestamp)}
            </Text>
          </Flex>
        </Box>
        <Box>
          <Flex alignItems={"center"} justifyContent={"space-between"}>
            <Flex alignItems={"center"}>
              <Image width={"12px"} height={"13px"} src={TrackIcon} />
              <Text paddingLeft={"10px"} fontSize={"15px"} fontWeight={"600"}>
                {orderStatusMap["PACKED"]}
              </Text>
            </Flex>
          </Flex>
          <Flex>
            <Image src={lineBlack} width={"12px"} height={"40px"} />
            <Text paddingLeft={"10px"} fontSize={"10px"} pt={"10px"}>
              {getOrderPlacementTimeline(res.context.timestamp)}
            </Text>
          </Flex>
        </Box>
        <Box>
          <Flex alignItems={"center"} justifyContent={"space-between"}>
            <Flex alignItems={"center"}>
              <Image width={"12px"} height={"13px"} src={TrackIcon} />
              <Text paddingLeft={"10px"} fontSize={"15px"} fontWeight={"600"}>
                {orderStatusMap["SHIPPED"]}
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
              <Text paddingLeft={"10px"} fontSize={"15px"} fontWeight={"600"}>
                {orderStatusMap["DELIVERED"]}
              </Text>
            </Flex>
          </Flex>
          <Flex>
            <Image src={lineBlack} width={"12px"} height={"40px"} />
            <Text paddingLeft={"10px"} fontSize={"10px"} pt={"10px"}>
              {getOrderPlacementTimeline(res.context.timestamp)}
            </Text>
          </Flex>
        </Box>
      </>
    );
  }
};
