import { Card, CardBody, Text } from "@chakra-ui/react";
import React from "react";

import styles from "./Card.module.css";

export interface CardWithCheckBoxPropsModel {
  paymentMethod: string;
}

const CardWithCheckBox: React.FC<CardWithCheckBoxPropsModel> = (props) => {
  return (
    <Card>
      <CardBody>
        <div className={styles.checkbox}>
          <input type="checkbox" id="checkbox" />
          <label htmlFor="checkbox">
            <Text position={"absolute"} width={"50vw"} marginLeft="40px">
              {props.paymentMethod}
            </Text>
          </label>
        </div>
      </CardBody>
    </Card>
  );
};

export default React.memo(CardWithCheckBox);
