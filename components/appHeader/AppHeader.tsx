import React from "react";
import Router from "next/router";
import { Box, Card, CardBody, Image, Text } from "@chakra-ui/react";
import backArrow from "/public/images/Back.svg";

export interface AppHeaderPropsModel {
  appHeaderText: string;
}

export const AppHeader: React.FC<AppHeaderPropsModel> = (props) => {
  const goBack = () => Router.back();
  return (
    <Card
      marginLeft={"-20px"}
      marginRight={"-20px"}
      borderRadius={"none"}
      marginBottom={"32px"}
    >
      <CardBody display={"flex"} alignItems={"center"}>
        <Box onClick={() => goBack()} cursor={"pointer"}>
          <Image src={backArrow} />
        </Box>
        <Text fontSize={"18px"} textAlign={"center"} width={"100%"}>
          {props.appHeaderText}
        </Text>
      </CardBody>
    </Card>
  );
};
