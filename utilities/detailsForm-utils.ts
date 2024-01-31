import { ShippingFormData } from '../pages/checkoutPage'

export interface FormErrors {
    name?: string
    mobileNumber?: string
    email?: string
    address?: string
    zipCode?: string
    city?: string
    country?: string
    state?: string
}

export const validateForm = (formData: ShippingFormData): FormErrors => {
    const errors: FormErrors = {}

    if (formData.name.trim() === '') {
        errors.name = 'errorName'
    }

    if (formData.mobileNumber.trim() === '') {
        errors.mobileNumber = 'errorEmpty' // Indicate the field is empty
    } else if (!/^\d+$/.test(formData.mobileNumber)) {
        errors.mobileNumber = 'errorNumber2' // Indicate the field contains non-numeric characters
    }

    if (formData.email.trim() === '') {
        errors.email = 'errorEmail'
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
        errors.email = 'errorEmail2'
    }

    if (formData.address.trim() === '') {
        errors.address = 'errorAddress'
    }

    if (formData.zipCode.trim() === '') {
        errors.zipCode = 'errorZipcode'
    }

    if (formData.city.trim() === '') {
        errors.city = 'errorCity'
    }

    if (formData.city.trim() === '') {
        errors.country = 'errorCountry'
    }

    return errors
}
