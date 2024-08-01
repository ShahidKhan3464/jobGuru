import React from 'react';
import { StyledInputField } from './style';
import { StyledFormLabel } from 'styles/global';

/**
 * InputField component for rendering a styled input field.
 *
 * @param {Object} props - Component properties.
 * @param {string} props.label - The label for the input field.
 * @param {Object} props.field - Formik field object for the input field.
 * @param {string} props.value - The current value of the input field.
 * @param {boolean} props.disabled - Whether the input field is disabled.
 * @param {Object} props.rest - Additional props to pass to the StyledInputField component.
 *
 * @example
 * // Example usage of InputField component within a Formik form
 * <InputField
 *   label="Username"
 *   field={formikProps.getFieldProps('username')}
 *   value={formikProps.values.username}
 *   disabled={false}
 *   placeholder="Enter your username"
 * />
 */

const InputField = ({ label, field, value, disabled = false, ...rest }) => {
  return (
    <React.Fragment>
      <StyledFormLabel>{label}</StyledFormLabel>
      <StyledInputField
        fullWidth
        {...rest}
        {...field}
        value={value}
        variant="outlined"
        disabled={disabled}
      />
    </React.Fragment>
  );
};

export default InputField;
