import { Box, Image, Input } from "@chakra-ui/react";
import React, { useState } from "react";
import CommerceLogo from "../public/images/CommerceLogo.svg";
import style from "../components/detailsCard/ShippingForm.module.css";
import Button from "../components/button/Button";

const MobileLogin = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [phoneNumberError, setPhoneNumberError] = useState("");

  const handlePhoneNumberChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = event.target.value;
    const sanitizedValue = value.replace(/\D/g, "");
    setPhoneNumber(sanitizedValue);
    setPhoneNumberError(validatePhoneNumber(sanitizedValue));
  };

  const validatePhoneNumber = (value: any) => {
    if (!value) {
      return "Phone number is required";
    }

    if (value.length !== 10) {
      return "Phone number must have 10 digits";
    }
    return "";
  };

  const handleFormSubmit = () => {
    setPhoneNumber("");
    setPhoneNumberError("");
  };

  return (
    <Box padding={"0 11px"}>
      <Box mt={"80px"}>
        <Image
          src={CommerceLogo}
          w={"305px"}
          height={"26px"}
          margin={"0 auto"}
        />
      </Box>
      <Box mt={"60px"} mb={"37px"}>
        <div className={style.container}>
          <div className={style.did_floating_label_content}>
            <input
              className={`${style["did_floating_input"]} {$style["otp_number_input"]}`}
              type="text"
              placeholder=" "
              name="mobileNumber"
              value={phoneNumber}
              onChange={handlePhoneNumberChange}
            />

            {phoneNumberError && (
              <span className={style.error}>{phoneNumberError}</span>
            )}

            <label
              className={`${style["did_floating_label"]} ${style["otp_number"]}`}
            >
              Mobile Number
            </label>
          </div>
        </div>
      </Box>

      <Button
        buttonText={"Send OTP"}
        background={"rgba(var(--color-primary))"}
        color={"rgba(var(--text-color))"}
        isDisabled={phoneNumber.length === 0 || phoneNumberError.length !== 0}
        handleOnClick={handleFormSubmit}
      />
    </Box>
  );
};

export default MobileLogin;
