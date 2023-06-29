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
  accordionHeader?: string;
}

const Accordion: React.FC<AccordionPropsModel> = (props) => {
  return (
    <>
      <Card marginBottom={"20px"}>
        <AccordionComp allowMultiple>
          <AccordionItem
            background={"unset"}
            border={"unset"}
            boxShadow={
              "0px 8px 10px -6px rgb(0 0 0 / 10%), 0px 20px 25px -5px rgb(0 0 0 / 10%)"
            }
          >
            <CardBody>
              <h2>
                <AccordionButton
                  padding={"unset"}
                  background={"unset !important"}
                  _expanded={{ color: "rgba(var(--color-primary))" }}
                >
                  <Box
                    as="span"
                    flex="1"
                    textAlign="left"
                    fontSize={"17px"}
                    fontWeight={"600"}
                  >
                    {props.accordionHeader}
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
            </CardBody>
            <AccordionPanel padding={"unset"}>{props.children}</AccordionPanel>
          </AccordionItem>
        </AccordionComp>
      </Card>
    </>
  );
};
export default Accordion;
