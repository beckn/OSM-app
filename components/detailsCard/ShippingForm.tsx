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

import style from "./ShippingForm.module.css";

import crossIcon from "../../public/images/crossIcon.svg";
import Button from "../button/Button";

export interface ShippingFormProps {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const ShippingForm: React.FC<ShippingFormProps> = (props) => {
  const [formData, setFormData] = useState({
    name: "",
    mobileNumber: "",
    email: "",
    address: "",
    buildingName: "",
    pincode: "",
    landmark: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const handleButtonClick = () => {
    // Handle button click logic here
    console.log("Form Data:", formData);
  };

  const isFormValid = Object.values(formData).every(
    (value) => value.trim() !== ""
  );
  console.log(isFormValid);

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
                  value={formData.name}
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
                  value={formData.mobileNumber}
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
                  value={formData.email}
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
                  value={formData.address}
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
                  value={formData.buildingName}
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
                  value={formData.pincode}
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
                  value={formData.landmark}
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
