import React, { useState } from 'react';
import Menu from '@mui/material/Menu';
import { customColors } from 'theme/pallete';
import MenuItem from '@mui/material/MenuItem';
import { useMediaQuery } from 'react-responsive';
import IconButton from '@mui/material/IconButton';
import MoreVertIcon from '@mui/icons-material/MoreVert';

/**
 * TableMenu component for rendering a menu with options for a table row.
 *
 * @param {string} id - The identifier for the table row.
 * @param {Array} options - An array of menu options with text and icon.
 * @param {function} handleTableMenu - Callback function to handle menu item selection.
 *
 * @example
 * // Example usage of TableMenu component
 * <TableMenu
 *   id="unique-row-id"
 *   options={[
 *     { text: 'Edit', icon: '/path/to/edit-icon.png' },
 *     { text: 'Delete', icon: '/path/to/delete-icon.png' },
 *     // ... other options
 *   ]}
 *   handleTableMenu={(id, selectedOption) => console.log(`Row with ID ${id} selected ${selectedOption}`)}
 * />
 */
const TableMenu = ({ id = null, options, handleTableMenu }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const isMobile = useMediaQuery({ maxWidth: 520 });

  // Open the menu when the icon button is clicked
  const handleIconButton = (e) => {
    e.stopPropagation();
    setAnchorEl(e.currentTarget);
  };

  // Handle menu item click
  const handleMenuItem = (e, option) => {
    setAnchorEl(null);
    e.stopPropagation();
    handleTableMenu(id, option);
  };

  // Close the menu
  const handleCloseMenu = (e) => {
    setAnchorEl(null);
    e.stopPropagation();
  };

  return (
    <React.Fragment>
      {/* IconButton for opening the menu */}
      <IconButton
        aria-haspopup="true"
        onClick={handleIconButton}
        aria-expanded={open ? 'true' : undefined}
        aria-controls={open ? 'long-menu' : undefined}
      >
        <MoreVertIcon sx={{ color: customColors.black }} />
      </IconButton>
      {/* Material-UI Menu component for rendering menu options */}
      <Menu
        open={open}
        anchorEl={anchorEl}
        onClose={handleCloseMenu}
        MenuListProps={{ style: { padding: 0 } }}
        PaperProps={{
          style: {
            width: '170px',
            borderRadius: '8px',
            padding: '15px 15px 0',
            color: customColors.black,
            background: customColors.white,
            border: `1px solid ${customColors.grey}`,
            boxShadow: '0px 3px 10px 0px rgba(51, 48, 48, 0.15)',
            ...(isMobile && {
              padding: '0 10px'
            })
          }
        }}
      >
        {options?.map((option, index) => (
          <MenuItem
            key={index}
            onClick={(e) => handleMenuItem(e, option.text)}
            sx={{
              gap: '8px',
              fontSize: '14px',
              fontWeight: '500',
              padding: '0 0 20px',
              fontStyle: 'normal',
              lineHeight: 'normal',
              borderBottom: 'none',
              fontFamily: 'Plus Jakarta Sans',
              '&:hover': { backgroundColor: 'transparent', color: 'inherit' },
              '&:focus-visible': {
                backgroundColor: 'transparent'
              },

              ...(isMobile && {
                padding: 0,
                minHeight: '42px'
              })
            }}
          >
            <img src={option.icon} alt="icon" />
            <span
              style={{ color: option.text === 'Delete' && customColors.danger }}
            >
              {option.text}
            </span>
          </MenuItem>
        ))}
      </Menu>
    </React.Fragment>
  );
};

export default TableMenu;
