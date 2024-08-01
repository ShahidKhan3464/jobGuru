import React from 'react';
import { StyledPhoneField } from './style';
import PhoneInput from 'react-phone-input-2';
import { StyledFormLabel } from 'styles/global';

/**
 * PhoneField component for handling phone number input using react-phone-input-2.
 *
 * @param {string} name - The name attribute for the input field.
 * @param {string} label - The label for the input field.
 * @param {string} placeholder - The placeholder text for the input field.
 * @param {Object} form - Formik form context.
 * @param {Object} error - Formik error object for the input field.
 * @param {Object} field - Formik field object for the input field.
 * @param {Object} rest - Additional props to pass to the PhoneInput component.
 *
 * @example
 * // Example usage of PhoneField component within a Formik form
 * <PhoneField
 *   name="phoneNumber"
 *   label="Phone Number"
 *   placeholder="Enter your phone number"
 *   form={formikProps}
 *   error={formikProps.errors.phoneNumber}
 *   field={formikProps.getFieldProps('phoneNumber')}
 *   // Additional props for PhoneInput component
 *   inputProps={{
 *     autoFocus: true,
 *   }}
 * />
 */
const PhoneField = ({
  name,
  label,
  form,
  error,
  field,
  placeholder,
  ...rest
}) => {
  return (
    <StyledPhoneField error={error}>
      <StyledFormLabel>{label}</StyledFormLabel>
      {/* react-phone-input-2 component for phone number input */}
      <PhoneInput
        {...rest}
        type="text"
        country=""
        value={field.value}
        placeholder={placeholder}
        onChange={(phone) => form.setFieldValue(name, phone)}
        inputProps={{
          name: name,
          autoFocus: true
        }}
      />
    </StyledPhoneField>
  );
};

export default PhoneField;
