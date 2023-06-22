import React from "react";
import Accordion from "../components/accordion/Accordion";
import { AppHeader } from "../components/appHeader/AppHeader";
import Button from "../components/button/Button";
import { useLanguage } from "../hooks/useLanguage";

const OrderDetails = () => {
  const { t } = useLanguage();
  return (
    <>
      <AppHeader appHeaderText={t.selectPaymentMethod} />
      <Accordion />
      <Button
        buttonText={t.contactSupport}
        background={"rgba(var(--color-primary))"}
        color={"rgba(var(--text-color))"}
        handleOnClick={() => {}}
      />
    </>
  );
};

export default OrderDetails;
