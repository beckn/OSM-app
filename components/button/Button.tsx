import React from "react";
import { Button as ButtonComp } from "@chakra-ui/react";

export interface ButtonPropsModel {
  buttonText: string;
  background: string;
  color: string;
  handleOnClick: () => void;
}

const Button: React.FC<ButtonPropsModel> = (props) => {
  return (
    <>
      <ButtonComp
        height={"48px"}
        backgroundColor={props.background}
        color={props.color}
        width={"100%"}
        borderRadius={"12px"}
        border={"1px solid rgba(var(--color-primary))"}
        marginBottom={"12px"}
        __css={{ "&:active": {} }}
        onClick={props.handleOnClick}
      >
        {props.buttonText}
      </ButtonComp>
    </>
  );
};

export default Button;
