import React from 'react';
import { StyledSelectField } from './style';
import { StyledFormLabel } from 'styles/global';
import { FormControl, MenuItem, OutlinedInput } from '@mui/material';

/**
 * SelectField component for rendering a styled select input.
 *
 * @param {string} label - The label for the select input.
 * @param {Object} field - Formik field object for the select input.
 * @param {Array} options - An array of options for the select input.
 * @param {function} onChange - Callback function to handle select input change.
 * @param {string} placeholder - Placeholder text for the select input.
 * @param {string} value - The current value of the select input.
 * @param {Object} rest - Additional props to pass to the StyledSelectField component.
 *
 * @example
 * // Example usage of SelectField component within a Formik form
 * <SelectField
 *   label="Select Option"
 *   field={formikProps.getFieldProps('selectField')}
 *   options={[
 *     { text: 'Option 1', value: 'option1' },
 *     { text: 'Option 2', value: 'option2' },
 *     // ... other options
 *   ]}
 *   onChange={formikProps.handleChange}
 *   placeholder="Select an option"
 *   value={formikProps.values.selectField}
 * />
 */
const SelectField = ({
  name,
  label,
  field,
  options,
  onChange,
  value = '',
  placeholder,
  ...rest
}) => {

  return (
    // Material-UI FormControl component for styling
    <FormControl fullWidth>
      <StyledFormLabel>{label}</StyledFormLabel>
      <StyledSelectField
        {...rest}
        {...field}
        name={name}
        displayEmpty
        value={value}
        onChange={onChange}
        input={<OutlinedInput />}
        renderValue={(selected) => {
          if (!value) {
            return <em>{placeholder}</em>;
          }
          return selected;
        }}
      >
        {options?.map((option, index) => (
          <MenuItem key={index} value={option._id ? option : option.value}>
            {option.text}
          </MenuItem>
        ))}
      </StyledSelectField>
    </FormControl>
  );
};

export default SelectField;
