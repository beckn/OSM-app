import React from "react";
import {
  Accordion as AccordionComp,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Card,
  CardBody,
} from "@chakra-ui/react";

interface AccordionPropsModel {
  children?: React.ReactNode;
}

const Accordion: React.FC<AccordionPropsModel> = (props) => {
  return (
    <>
      <Card marginBottom={"20px"}>
        <AccordionComp allowMultiple>
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
                    {"Summary"}
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
            </CardBody>
            <AccordionPanel padding={"unset"} pt={2}>
              {props.children}
            </AccordionPanel>
          </AccordionItem>
        </AccordionComp>
      </Card>
    </>
  );
};
export default Accordion;
