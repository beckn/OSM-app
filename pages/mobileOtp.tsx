import { Box, Text } from "@chakra-ui/react";
import React, { useState } from "react";
import Button from "../components/button/Button";
import style from "../components/detailsCard/ShippingForm.module.css";

const MobileOtp = () => {
  const [OTP, setOTP] = useState("663423");
  const [OTPError, setOTPError] = useState("");
  const handleOTP = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    const sanitizedValue = value.replace(/\D/g, "");
    setOTP(sanitizedValue);
    setOTPError(validateOTP(sanitizedValue));
  };
  const validateOTP = (value: string) => {
    if (!value) {
      return "OTP is required";
    }

    if (value.length !== 6) {
      return "OTP must have 6 digits";
    }

    return "";
  };

  const handleFormSubmit = () => {
    if (!OTP || OTP.length !== 6) {
      setOTPError(validateOTP(OTP));
      return;
    }
    setOTP("");
    setOTPError("");
  };

  return (
    <>
      <Box padding={"40px 20px 37px 20px"}>
        <Text fontSize={"30px"} fontWeight={"600"}>
          Verify your mobile number
        </Text>
        <Text pt={"10px"} fontSize={"15px"}>
          Have sent an OTP to your mobile <br />
          number ending with 4321
        </Text>
      </Box>
      <Box padding={"32px 20px 0 20px"}>
        <div className={style.container}>
          <div className={style.did_floating_label_content}>
            <input
              className={`${style["did_floating_input"]} {$style["otp_number_input"]}`}
              type="text"
              placeholder=" "
              name="OTP"
              value={OTP}
              onChange={handleOTP}
            />

            {OTPError && <span className={style.error}>{OTPError}</span>}

            <label
              className={`${style["did_floating_label"]} ${style["otp_number"]}`}
            >
              Enter OTP here
            </label>
          </div>
        </div>
      </Box>
      <Button
        buttonText={"Login"}
        background={"rgba(var(--color-primary))"}
        color={"rgba(var(--text-color))"}
        isDisabled={false}
        handleOnClick={handleFormSubmit}
      />
    </>
  );
};

export default MobileOtp;
