import { Spinner, Text } from "@chakra-ui/react";
import React from "react";

interface LoaderPropsModel {
  loadingText?: string;
}

const Loader: React.FC<LoaderPropsModel> = (props) => {
  return (
    <div className="flex flex-col justify-center items-center h-[60vh]">
      <Spinner
        thickness="4px"
        speed="0.65s"
        emptyColor="gray.200"
        color="#A71B4A"
        size="xl"
      />
      {props.loadingText && <Text marginTop={"21px"}>{props.loadingText}</Text>}
    </div>
  );
};

export default React.memo(Loader);
