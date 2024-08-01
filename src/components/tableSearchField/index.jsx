import React, { useRef } from 'react';
import { Icons } from 'assets/index';
import { StyledTableSearchField } from './style';

/**
 * TableSearchField component for handling search input in a table.
 *
 * @param {Object} props - Component properties.
 * @param {function} props.handleSearchQueryChange - Callback function to handle search query change.
 *
 * @example
 * // Example usage of TableSearchField component
 * <TableSearchField
 *   handleSearchQueryChange={(searchQuery) => handleSearch(searchQuery)}
 * />
 */
const TableSearchField = ({ handleSearchQueryChange }) => {
  const inputRef = useRef(null);

  /**
   * Handle the search operation when the input value changes.
   */
  const handleSearch = () => {
    const value = inputRef.current.value.toLowerCase();
    handleSearchQueryChange(value);
  };

  return (
    <StyledTableSearchField>
      <div className="field">
        <img src={Icons.search} alt="search-field" />
        <input
          type="text"
          ref={inputRef}
          placeholder="Search"
          onChange={handleSearch}
        />
      </div>
    </StyledTableSearchField>
  );
};

export default TableSearchField;
