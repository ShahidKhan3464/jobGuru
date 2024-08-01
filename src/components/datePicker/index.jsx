import React from 'react';
import { Icons } from 'assets';
import { StyledDatePicker } from './style';
import ReactDatePicker from 'react-datepicker';
import { StyledFormLabel } from 'styles/global';
import 'react-datepicker/dist/react-datepicker.css';

/**
 * CustomDatePicker Component
 *
 * @param {string} label - The label text for the DatePicker.
 * @param {Date} selectedDate - The selected date value for the DatePicker.
 * @param {function} onChange - Callback function to handle date change.
 * @param {string} placeholder - Placeholder text for the DatePicker input.
 * @param {Object} rest - Additional props to be spread onto the ReactDatePicker element.
 *
 * @example
 * // Example usage of CustomDatePicker component
 * <CustomDatePicker
 *   label="Select a Date"
 *   selectedDate={new Date()}
 *   onChange={(date) => console.log('Selected date:', date)}
 *   placeholder="DD-MM-YYYY"
 *   minDate={new Date()}
 *   dateFormat="dd-MM-yyyy"
 *   showPopperArrow={false}
 * />
 */
const CustomDatePicker = ({
  label,
  onChange,
  placeholder,
  selectedDate,
  ...rest
}) => {

  return (
    <StyledDatePicker>
      <StyledFormLabel>{label}</StyledFormLabel>
      <ReactDatePicker
        showIcon
        {...rest}
        onChange={onChange}
        minDate={new Date()}
        dateFormat="MM-dd-yyyy"
        showPopperArrow={false}
        selected={selectedDate}
        toggleCalendarOnIconClick
        placeholderText={placeholder}
        icon={<img src={Icons.datePicker} alt="date-picker" />}
      />
    </StyledDatePicker>
  );
};

export default CustomDatePicker;
