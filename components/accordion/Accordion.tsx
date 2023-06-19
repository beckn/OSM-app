import React from "react";
import {
  Accordion as AccordionComp,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Card,
  Text,
  CardBody,
  Flex,
  Divider,
} from "@chakra-ui/react";

import { accordionData } from "./AccordionData";

const Accordion = () => {
  return (
    <>
      {accordionData.map((ele, ind) => {
        return (
          <Card marginBottom={"20px"}>
            <AccordionComp defaultIndex={[ind]} allowMultiple>
              <AccordionItem background={"unset"} border={"unset"}>
                <CardBody>
                  <h2>
                    <AccordionButton
                      padding={"unset"}
                      background={"unset !important"}
                    >
                      <Box
                        as="span"
                        flex="1"
                        textAlign="left"
                        fontSize={"17px"}
                        fontWeight={"600"}
                      >
                        {ele.accordion_header}
                      </Box>
                      <AccordionIcon />
                    </AccordionButton>
                  </h2>
                </CardBody>
                <AccordionPanel padding={"unset"} pt={2}>
                  <CardBody pt={"unset"}>
                    <Flex
                      pt={"unset"}
                      justifyContent={"space-between"}
                      alignItems={"center"}
                    >
                      <Text>{ele.key_1}</Text>
                      <Text>21st Jun 2021, 12:21pm</Text>
                    </Flex>
                  </CardBody>
                  <Divider />
                  <CardBody>
                    <Flex
                      pt={4}
                      justifyContent={"space-between"}
                      alignItems={"center"}
                    >
                      <Text>{ele.key_2}</Text>
                      <Text>Id - 456789120</Text>
                    </Flex>
                    <Flex
                      pt={4}
                      justifyContent={"space-between"}
                      alignItems={"center"}
                    >
                      <Text>{ele.key_3}</Text>
                      <Text>Confirmed</Text>
                    </Flex>
                    <Flex
                      pt={4}
                      justifyContent={"space-between"}
                      alignItems={"center"}
                    >
                      <Text>{ele.key_4}</Text>
                      <Text
                        border={"1px solid rgba(var(--color-primary))"}
                        padding={"5px 25px"}
                        borderRadius={"4px"}
                        color={"rgba(var(--color-primary))"}
                      >
                        1 Item
                      </Text>
                    </Flex>
                    <Text pt={2} fontSize={"10px"}>
                      JBL Xtreme 2 Rugged Waterproof Bluetooth Speaker X 1
                    </Text>
                    <Box
                      textAlign={"center"}
                      paddingTop={"15px"}
                      color="rgba(var(--color-primary))"
                      fontWeight={"500"}
                    >
                      {ele.key_5}
                    </Box>
                  </CardBody>
                </AccordionPanel>
              </AccordionItem>
            </AccordionComp>
          </Card>
        );
      })}
    </>
  );
};
export default Accordion;
