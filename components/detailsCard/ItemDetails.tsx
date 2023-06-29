import React from "react";
import { Text, Box, Image, Flex } from "@chakra-ui/react";

export interface ItemDetailProps {
  title: string;
  description: string;
  quantity: number;
  price: string | number;
  itemImage: string;
}

const ItemDetails: React.FC<ItemDetailProps> = (props) => {
  return (
    <>
      <Flex alignItems={"center"}>
        <Box pr={"10px"} width={"160px"}>
          <Image
            src={props.itemImage}
            margin={"0 auto"}
            maxW={"120px"}
            height={"120px"}
          />
        </Box>
        <Box>
          <Text fontSize={"13px"} fontWeight={"700"} pb={"5px"}>
            {props.title}
          </Text>
          <Text fontSize={"8px"} pb={"5px"}>
            {props.description}
          </Text>
          <Text fontSize={"10px"} fontWeight={"700"} pb={"5px"}>
            x{props.quantity}
          </Text>
          <Text color={"rgba(var(--color-primary))"}>{props.price}</Text>
        </Box>
      </Flex>
    </>
  );
};

export default ItemDetails;
