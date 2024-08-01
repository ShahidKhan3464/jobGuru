import React from 'react';
import { primary } from 'theme/pallete';
import { Checkbox } from '@mui/material';

/**
 * CustomCheckbox Component
 *
 * @param {Object} sx - Custom styling properties for the Checkbox.
 * @param {string} color - Color for the Checkbox (default is primary.main from the theme).
 * @param {Object} rest - Additional props to be spread onto the Checkbox element.
 *
 * @example
 * // Example usage of CustomCheckbox component
 * <CustomCheckbox
 *   sx={{ margin: '5px' }}
 *   color="#3498db"
 *   checked={true}
 *   onChange={(event) => console.log('Checkbox checked!', event.target.checked)}
 * />
 */
const CustomCheckbox = ({ sx, color = primary.main, ...rest }) => {
  return (
    <Checkbox
      classes={{ checked: 'checked' }}
      sx={{
        '& .MuiSvgIcon-root': {
          color: { color }
        },
        width: '20px',
        height: '20px',
        ...sx
      }}
      {...rest}
    />
  );
};

export default CustomCheckbox;
