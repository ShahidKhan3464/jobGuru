import React, { useState } from 'react';
import Menu from '@mui/material/Menu';
import { StyledButton } from './style';
import { customColors } from 'theme/pallete';
import MenuItem from '@mui/material/MenuItem';
import { useMediaQuery } from 'react-responsive';
import ClearIcon from '@mui/icons-material/Clear';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

/**
 * CustomFilterDropdown Component
 *
 * @param {string} name - The name of the filter.
 * @param {Array} options - An array of options for the filter dropdown.
 * @param {string} value - The value for the filter.
 * @param {function} handleFilterChange - Callback function to handle filter changes.
 *
 * @example
 * // Example usage of CustomFilterDropdown component
 * <CustomFilterDropdown
 *   name="category"
 *   options={[
 *     { value: 'electronics', text: 'Electronics' },
 *     { value: 'clothing', text: 'Clothing' },
 *     // ... other options
 *   ]}
 *   value="All Categories"
 *   handleFilterChange={(name, value) => console.log(`Filter ${name} changed to ${value}`)}
 * />
 */
const CustomFilterDropdown = ({ name, value, options, handleFilterChange }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [isSelect, setIsSelect] = useState(false);
  const isMobile = useMediaQuery({ maxWidth: 520 });
  const open = Boolean(anchorEl);

  const handleMenuItem = (value, text) => {
    setIsSelect(true);
    setAnchorEl(null);
    handleFilterChange(name, value);
  };

  const handleClearFilter = (e) => {
    setIsSelect(false);
    e.stopPropagation();
    handleFilterChange(name, '');
  };

  return (
    <React.Fragment>
      <StyledButton
        selected={isSelect}
        aria-haspopup="true"
        sx={{ color: customColors.lightGrey }}
        aria-expanded={open ? 'true' : undefined}
        onClick={(e) => setAnchorEl(e.currentTarget)}
        aria-controls={open ? 'demo-customized-menu' : undefined}
        endIcon={
          !isSelect ? (
            <KeyboardArrowDownIcon />
          ) : (
            <ClearIcon onClick={(e) => handleClearFilter(e)} />
          )
        }
      >
        {value}
      </StyledButton>
      <Menu
        open={open}
        anchorEl={anchorEl}
        onClose={() => setAnchorEl(null)}
        MenuListProps={{ style: { padding: 0 } }}
        PaperProps={{
          style: {
            borderRadius: '8px',
            padding: '15px 15px 0',
            color: customColors.black,
            background: customColors.white,
            border: `1px solid ${customColors.grey}`,
            boxShadow: '0px 3px 10px 0px rgba(51, 48, 48, 0.15)',
            ...(isMobile && {
              padding: '10px 10px 0'
            })
          }
        }}
      >
        {options.map((option, index) => (
          <MenuItem
            key={index}
            onClick={() => handleMenuItem(option.value, option.text)}
            sx={{
              gap: '10px',
              fontSize: '12px',
              fontWeight: '500',
              padding: '0 0 20px',
              fontStyle: 'normal',
              borderBottom: 'none',
              lineHeight: 'normal',
              fontFamily: 'Plus Jakarta Sans !important',
              '&:hover': { backgroundColor: 'transparent', color: 'inherit' },
              '&:focus-visible': {
                backgroundColor: 'transparent'
              },

              ...(isMobile && {
                minHeight: '30px',
                padding: '0 0 5px'
              })
            }}
          >
            <span>{option.text}</span>
          </MenuItem>
        ))}
      </Menu>
    </React.Fragment>
  );
};

export default CustomFilterDropdown;
