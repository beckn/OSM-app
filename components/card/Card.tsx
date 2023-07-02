import { Box, Card, CardBody, Text } from "@chakra-ui/react";
import React, { useState } from "react";

import styles from "./Card.module.css";

export interface CardWithCheckBoxPropsModel {
  paymentMethod: string;
}

const CardWithCheckBox: React.FC<CardWithCheckBoxPropsModel> = (props) => {
  const [checked, setChecked] = useState(false);

  const handleChange = () => {
    setChecked((prevValue) => !prevValue);
  };

  return (
    <Card className="border_radius_all">
      <CardBody padding={"15px 20px"}>
        <Box className={styles.checkbox} mb={"15px"} fontSize={"15px"}>
          <input
            type="checkbox"
            id="checkbox"
            checked={checked}
            onChange={handleChange}
          />
          <label htmlFor="checkbox">
            <Text
              mt={"-3px"}
              position={"absolute"}
              width={"50vw"}
              marginLeft="40px"
            >
              {props.paymentMethod}
            </Text>
          </label>
        </Box>
        <Box
          pointerEvents={"none"}
          opacity={"0.5"}
          className={styles.checkbox}
          fontSize={"15px"}
        >
          <input
            type="checkbox"
            id="checkbox_Click_Collect"
            // disabled={true}
            checked={false}
            onChange={handleChange}
          />
          <label htmlFor="checkbox_Click_Collect">
            <Text
              mt={"-3px"}
              position={"absolute"}
              width={"50vw"}
              marginLeft="40px"
            >
              Click & Collect
            </Text>
          </label>
        </Box>
      </CardBody>
    </Card>
  );
};

export default React.memo(CardWithCheckBox);
