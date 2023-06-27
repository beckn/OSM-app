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
  const [formErrors, setFormErrors] = useState<FormErrors>({});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "mobileNumber" && !/^\d*$/.test(value)) {
      return;
    }
    props.setFormData((prevFormData: ShippingFormData) => ({
      ...prevFormData,
      [name]: value,
    }));

    const updatedFormData = {
      ...props.formData,
      [name]: value,
    };

    const errors = validateForm(updatedFormData);
    setFormErrors((prevErrors) => ({
      ...prevErrors,
      [name]: errors[name] || "",
    }));
  };

  const handleButtonClick = () => {
    const errors = validateForm(props.formData);
    setFormErrors(errors);
    if (Object.keys(errors).length === 0) {
      dispatch(responseDataActions.addCustomerDetails(props.formData));
      props.setFormData(props.formData);
      props.formSubmitHandler();
    } else {
      setFormErrors(errors);
    }
  };

  const isFormValid = Object.entries(props.formData)
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
                  value={props.formData.mobileNumber}
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
                  value={props.formData.email}
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
                  value={props.formData.address}
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
                  name="buildingName"
                  value={props.formData.buildingName}
                  onChange={handleInputChange}
                />
                <label className={style.did_floating_label}>
                  Building Name/Floor
                </label>
                {formErrors.buildingName && (
                  <span className={style.error}>{formErrors.buildingName}</span>
                )}
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
                {formErrors.pincode && (
                  <span className={style.error}>{formErrors.pincode}</span>
                )}
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
