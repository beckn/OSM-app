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

export interface ShippingFormProps {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  setFormData: Function;
  formData: ShippingFormData;
  formSubmitHandler: Function;
}

const ShippingForm: React.FC<ShippingFormProps> = (props) => {
  const dispatch = useDispatch();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    props.setFormData((prevFormData: ShippingFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleButtonClick = () => {
    dispatch(responseDataActions.addCustomerDetails(props.formData));
    props.setFormData(props.formData);
    props.formSubmitHandler();
  };

  const isFormValid = Object.values(props.formData).every(
    (value) => value.trim() !== ""
  );

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
            <Text>Search</Text>
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
                  value={props.formData.name}
                  onChange={handleInputChange}
                />
                <label className={style.did_floating_label}>Name</label>
              </div>
              <div className={style.did_floating_label_content}>
                <input
                  className={style.did_floating_input}
                  type="text"
                  placeholder=" "
                  name="mobileNumber"
                  value={props.formData.mobileNumber}
                  onChange={handleInputChange}
                />
                <label className={style.did_floating_label}>
                  Mobile Number
                </label>
              </div>
              <div className={style.did_floating_label_content}>
                <input
                  className={style.did_floating_input}
                  type="text"
                  placeholder=" "
                  name="email"
                  value={props.formData.email}
                  onChange={handleInputChange}
                />
                <label className={style.did_floating_label}>Email ID</label>
              </div>
              <div className={style.did_floating_label_content}>
                <input
                  className={style.did_floating_input}
                  type="text"
                  placeholder=" "
                  name="address"
                  value={props.formData.address}
                  onChange={handleInputChange}
                />
                <label className={style.did_floating_label}>
                  Complete Address
                </label>
              </div>
              <div className={style.did_floating_label_content}>
                <input
                  className={style.did_floating_input}
                  type="text"
                  placeholder=" "
                  name="buildingName"
                  value={props.formData.buildingName}
                  onChange={handleInputChange}
                />
                <label className={style.did_floating_label}>
                  Buinding Name/Floor
                </label>
              </div>
              <div className={style.did_floating_label_content}>
                <input
                  className={style.did_floating_input}
                  type="text"
                  placeholder=" "
                  name="pincode"
                  value={props.formData.pincode}
                  onChange={handleInputChange}
                />
                <label className={style.did_floating_label}>Pincode</label>
              </div>
              <div className={style.did_floating_label_content}>
                <input
                  className={style.did_floating_input}
                  type="text"
                  placeholder=" "
                  name="landmark"
                  value={props.formData.landmark}
                  onChange={handleInputChange}
                />
                <label className={style.did_floating_label}>
                  Landmark (Optional)
                </label>
              </div>
            </div>
            <Button
              buttonText={"Add Shipping Details"}
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

export default ShippingForm;
