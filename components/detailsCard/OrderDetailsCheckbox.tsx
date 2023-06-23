import React from "react";
import { Stack, Checkbox } from "@chakra-ui/react";

export interface OrderDetailsCheckboxProps {
  orderDetailsCheckboxText: string;
}

const OrderDetailsCheckbox: React.FC<OrderDetailsCheckboxProps> = (props) => {
  return (
    <Stack spacing={5} direction="row">
      <Checkbox colorScheme={"red"} pr={"12px"} fontSize={"17px"}>
        {props.orderDetailsCheckboxText}
      </Checkbox>
    </Stack>
  );
};

export default OrderDetailsCheckbox;
