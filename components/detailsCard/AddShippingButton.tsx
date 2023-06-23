import { Flex, Image, Text, useDisclosure } from "@chakra-ui/react";
import React from "react";
import addShippingBtn from "../../public/images/addShippingBtn.svg";
import ShippingForm from "./ShippingForm";

export interface AddShippingButtonProps {
  addShippingdetailsBtnText: string;
}

const AddShippingButton: React.FC<AddShippingButtonProps> = (props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Flex alignItems={"center"} onClick={onOpen}>
        <Image src={addShippingBtn} />
        <Text
          fontSize={"15px"}
          color={"rgba(var(--color-primary))"}
          pl={"10px"}
        >
          {props.addShippingdetailsBtnText}
        </Text>
      </Flex>
      <ShippingForm isOpen={isOpen} onOpen={onOpen} onClose={onClose} />
    </>
  );
};

export default AddShippingButton;
