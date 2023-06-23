import React from "react";
import { Text, Box, Image, Flex } from "@chakra-ui/react";
import speakerImg from "../../public/images/speaker.svg";

export interface ItemDetailProps {
  title: string;
  description: string;
  quantity: string;
  price: string | number;
}

const ItemDetails: React.FC<ItemDetailProps> = (props) => {
  return (
    <>
      <Flex alignItems={"center"}>
        <Box pr={"10px"}>
          <Image src={speakerImg} margin={"0 auto"} />
        </Box>
        <Box>
          <Text fontSize={"13px"} fontWeight={"700"} pb={"5px"}>
            {props.title}
          </Text>
          <Text fontSize={"8px"} pb={"5px"}>
            {props.description}
          </Text>
          <Text fontSize={"10px"} fontWeight={"700"} pb={"5px"}>
            {props.quantity}
          </Text>
          <Text color={"rgba(var(--color-primary))"}>{props.price}</Text>
        </Box>
      </Flex>
    </>
  );
};

export default ItemDetails;
