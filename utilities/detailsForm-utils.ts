import { ShippingFormData } from "../pages/checkoutPage";

export interface FormErrors {
  name?: string;
  mobileNumber?: string;
  email?: string;
  address?: string;
  zipCode?: string;
}

export const validateForm = (formData: ShippingFormData): FormErrors => {
  const errors: FormErrors = {};

  if (formData.name.trim() === "") {
    errors.name = "Name is required";
  }

  if (formData.mobileNumber.trim() === "") {
    errors.mobileNumber = "Mobile Number is required";
  } else if (!/^\d{10}$/.test(formData.mobileNumber)) {
    errors.mobileNumber = "Invalid Mobile Number";
  }

  if (formData.email.trim() === "") {
    errors.email = "Email ID is required";
  } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
    errors.email = "Invalid Email ID";
  }

  if (formData.address.trim() === "") {
    errors.address = "Complete Address is required";
  }

  if (formData.zipCode.trim() === "") {
    errors.zipCode = "Pincode is required";
  } else if (!/^\d{5}$/.test(formData.zipCode)) {
    errors.zipCode = "Invalid Pincode";
  }

  return errors;
};
