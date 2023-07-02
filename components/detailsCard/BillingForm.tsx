import {
  Flex,
  Modal,
  ModalBody,
  Text,
  ModalContent,
  Image,
  ModalOverlay,
  Divider,
  ModalCloseButton,
  Box,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import style from "./ShippingForm.module.css";
import crossIcon from "../../public/images/crossIcon.svg";
import Button from "../button/Button";
import { ShippingFormData } from "../../pages/checkoutPage";
import { responseDataActions } from "../../store/responseData-slice";
import { validateForm, FormErrors } from "../../utilities/detailsForm-utils";
import { useLanguage } from "../../hooks/useLanguage";

export interface ShippingFormProps {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  setBillingFormData: Function;
  billingFormData: ShippingFormData;
  formSubmitHandler: Function;
}

const BillingForm: React.FC<ShippingFormProps> = (props) => {
  const dispatch = useDispatch();
  const [formErrors, setFormErrors] = useState<FormErrors>({});

  const { t } = useLanguage();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "mobileNumber" && !/^\d*$/.test(value)) {
      return;
    }
    props.setBillingFormData((prevFormData: ShippingFormData) => ({
      ...prevFormData,
      [name]: value,
    }));

    const updatedFormData = {
      ...props.billingFormData,
      [name]: value,
    };

    const errors = validateForm(updatedFormData);
    setFormErrors((prevErrors) => ({
      ...prevErrors,
      [name]: errors[name] || "",
    }));
  };

  const handleButtonClick = () => {
    const errors = validateForm(props.billingFormData);
    setFormErrors(errors);
    if (Object.keys(errors).length === 0) {
      dispatch(responseDataActions.addCustomerDetails(props.billingFormData));
      props.setBillingFormData(props.billingFormData);
      props.formSubmitHandler();
    } else {
      setFormErrors(errors);
    }
  };

  const isFormValid = Object.entries(props.billingFormData)
    .filter(([key]) => key !== "landmark")
    .every(([_, value]) => value.trim() !== "");

  return (
    <>
      <Modal
        isCentered
        onClose={props.onClose}
        isOpen={props.isOpen}
        scrollBehavior="outside"
        motionPreset="slideInBottom"
      >
        <ModalOverlay height="100vh" />
        <ModalContent
          position="fixed"
          bottom="0px"
          mb="0"
          borderRadius="1.75rem 1.75rem 0px 0px"
          maxW="lg"
        >
          <Flex
            justifyContent={"space-between"}
            alignItems={"center"}
            padding={"22px 20px"}
          >
            <Text>{t.addBillingDetails}</Text>
            <ModalCloseButton position={"unset"}>
              <Image src={crossIcon} />
            </ModalCloseButton>
          </Flex>
          <Box>
            <Divider />
          </Box>

          <ModalBody>
            <div className={style.container}>
              <div className={style.did_floating_label_content}>
                <input
                  className={style.did_floating_input}
                  type="text"
                  placeholder=" "
                  name="name"
                  value={props.billingFormData.name}
                  onChange={handleInputChange}
                />
                <label className={style.did_floating_label}>Name</label>
                {formErrors.name && (
                  <div className={style.error}>{formErrors.name}</div>
                )}
              </div>
              <div className={style.did_floating_label_content}>
                <input
                  className={style.did_floating_input}
                  type="text"
                  placeholder=" "
                  name="mobileNumber"
                  value={props.billingFormData.mobileNumber}
                  onChange={handleInputChange}
                />
                <label className={style.did_floating_label}>
                  Mobile Number
                </label>
                {formErrors.mobileNumber && (
                  <span className={style.error}>{formErrors.mobileNumber}</span>
                )}
              </div>
              <div className={style.did_floating_label_content}>
                <input
                  className={style.did_floating_input}
                  type="text"
                  placeholder=" "
                  name="email"
                  value={props.billingFormData.email}
                  onChange={handleInputChange}
                />
                <label className={style.did_floating_label}>Email ID</label>
                {formErrors.email && (
                  <span className={style.error}>{formErrors.email}</span>
                )}
              </div>
              <div className={style.did_floating_label_content}>
                <input
                  className={style.did_floating_input}
                  type="text"
                  placeholder=" "
                  name="address"
                  value={props.billingFormData.address}
                  onChange={handleInputChange}
                />
                <label className={style.did_floating_label}>
                  Complete Address
                </label>
                {formErrors.address && (
                  <span className={style.error}>{formErrors.address}</span>
                )}
              </div>

              <div className={style.did_floating_label_content}>
                <input
                  className={style.did_floating_input}
                  type="text"
                  placeholder=" "
                  name="zipCode"
                  value={props.billingFormData.zipCode}
                  onChange={handleInputChange}
                />
                <label className={style.did_floating_label}>Zip Code</label>
                {formErrors.zipCode && (
                  <span className={style.error}>{formErrors.zipCode}</span>
                )}
              </div>
            </div>
            <Button
              buttonText={t.saveBillingDetails}
              background={"rgba(var(--color-primary))"}
              color={"rgba(var(--text-color))"}
              handleOnClick={handleButtonClick}
              isDisabled={!isFormValid}
            />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default BillingForm;