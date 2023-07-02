import React from "react";
import { Flex, Image, Text, Stack, StackDivider, Box } from "@chakra-ui/react";
import CallphoneIcon from "../../public/images/CallphoneIcon.svg";
import locationIcon from "../../public/images/locationIcon.svg";
import nameIcon from "../../public/images/nameIcon.svg";

export interface ShippingOrBillingDetailsProps {
  name: string;
  location: string;
  number: number | string;
}

const ShippingOrBillingDetails: React.FC<ShippingOrBillingDetailsProps> = (
  props
) => {
  return (
    <Box padding={"0px 15px"}>
      <Stack divider={<StackDivider />} spacing="4">
        <Flex alignItems={"center"}>
          <Image src={nameIcon} pr={"12px"} />
          <Text fontSize={"17px"}>{props.name}</Text>
        </Flex>
        <Flex alignItems={"center"}>
          <Image src={locationIcon} pr={"12px"} />
          <Text fontSize={"15px"}>{props.location}</Text>
        </Flex>
        <Flex alignItems={"center"}>
          <Image src={CallphoneIcon} pr={"12px"} />
          <Text fontSize={"15px"}>{props.number}</Text>
        </Flex>
      </Stack>
    </Box>
  );
};

export default ShippingOrBillingDetails;
