import {
  Modal,
  ModalOverlay,
  ModalContent,
  Flex,
  ModalCloseButton,
  Divider,
  ModalBody,
  Button,
  Box,
  Text,
  Image,
} from "@chakra-ui/react";
import React from "react";
import ButtonComp from "../button/Button";

import crossIcon from "../../public/images/crossIcon.svg";

export interface ViewMoreOrderModalProps {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const ViewMoreOrderModal: React.FC<ViewMoreOrderModalProps> = (props) => {
  return (
    <>
      <Modal
        isCentered
        onClose={props.onClose}
        isOpen={props.isOpen}
        scrollBehavior="outside"
        motionPreset="slideInBottom"
      >
        <ModalOverlay height="100vh" />
        <ModalContent
          position="fixed"
          bottom="0px"
          mb="0"
          borderRadius="0.75rem 0.75rem 0px 0px"
          maxW="lg"
        >
          <Flex
            justifyContent={"space-between"}
            alignItems={"center"}
            padding={"15px 20px"}
            fontSize={"17px"}
          >
            <Text>Search</Text>
            <ModalCloseButton position={"unset"}>
              <Image src={crossIcon} />
            </ModalCloseButton>
          </Flex>
          <Box>
            <Divider />
          </Box>

          <ModalBody padding={"15px 20px"}>
            <Flex mb={"20px"} justifyContent={"space-between"}>
              <Box>
                <Text>Rosie Carpe by Marie N Diaye</Text>
                <Text fontSize={"12px"} fontWeight={"600"} pt={"5px"}>
                  x 2
                </Text>
              </Box>
              <Text
                fontSize={"15px"}
                fontWeight={"600"}
                color={"rgba(var(--color-primary))"}
              >
                € 6.48
              </Text>
            </Flex>
            <Flex mb={"20px"} justifyContent={"space-between"}>
              <Box>
                <Text>Rosie Carpe by Marie N Diaye</Text>
                <Text fontSize={"12px"} fontWeight={"600"} pt={"5px"}>
                  x 2
                </Text>
              </Box>
              <Text
                fontSize={"15px"}
                fontWeight={"600"}
                color={"rgba(var(--color-primary))"}
              >
                € 6.48
              </Text>
            </Flex>

            <ButtonComp
              buttonText={"Close"}
              background={"rgba(var(--color-primary))"}
              color={"rgba(var(--text-color))"}
              isDisabled={false}
              handleOnClick={props.onClose}
            />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ViewMoreOrderModal;
