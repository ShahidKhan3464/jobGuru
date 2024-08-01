import React from 'react';
import { IconButton } from '@mui/material';
import { StyledSelectionList } from './style';
import ClearIcon from '@mui/icons-material/Clear';

const SelectionList = ({ items, onRemoveItem, disabled = false }) => {
  return (
    <StyledSelectionList>
      {items.map((item, index) => (
        <div className="box" key={index}>
          <span className="box_text">{item.text || item}</span>
          <IconButton
            size="large"
            disabled={disabled}
            className="remove-btn"
            onClick={() => onRemoveItem(item._id || index)}
          >
            <ClearIcon />
          </IconButton>
        </div>
      ))}
    </StyledSelectionList>
  );
};

export default SelectionList;
