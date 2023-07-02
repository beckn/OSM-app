import React from "react";
import {
  Flex,
  Image,
  Text,
  Stack,
  StackDivider,
  Box,
  CardBody,
} from "@chakra-ui/react";
import CallphoneIcon from "../../public/images/CallphoneIcon.svg";
import locationIcon from "../../public/images/locationIcon.svg";
import nameIcon from "../../public/images/nameIcon.svg";
import Accordion from "../accordion/Accordion";

export interface ShippingDetailsProps {
  name: string;
  location: string;
  number: number | string;
}

const ShippingDetails: React.FC<ShippingDetailsProps> = (props) => {
  return (
    <Accordion accordionHeader={"Shipping"}>
      <CardBody pt={"unset"} pb={"15px"}>
        <Box>
          <Stack divider={<StackDivider />} spacing="4">
            <Flex alignItems={"center"}>
              <Image src={nameIcon} pr={"12px"} />
              <Text fontSize={"15px"}>Lisa</Text>
            </Flex>
            <Flex alignItems={"center"}>
              <Image src={locationIcon} pr={"12px"} />
              <Text fontSize={"15px"}>
                94 bis, Boulevard d'Aulnay, Villemomble
              </Text>
            </Flex>
            <Flex alignItems={"center"}>
              <Image src={CallphoneIcon} pr={"12px"} />
              <Text fontSize={"15px"}>+33 9876543210</Text>
            </Flex>
          </Stack>
        </Box>
      </CardBody>
    </Accordion>
  );
};

export default ShippingDetails;
