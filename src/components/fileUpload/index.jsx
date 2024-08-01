import React from 'react';
import { Icons } from 'assets';
import { StyledFileUpload } from './style';
import { IconButton } from '@mui/material';
import { StyledFormLabel } from 'styles/global';
import ClearIcon from '@mui/icons-material/Clear';
import { capitalizeFirstLetter, formatBytes } from 'utils';

/**
 * FileUpload component for handling file input and display.
 *
 * @param {string} label - The label for the file input.
 * @param {boolean} multiple - Whether multiple files can be selected.
 * @param {string} previewURL - URL for previewing a single file.
 * @param {Object} selectedFile - The selected file object.
 * @param {Object} fileInputRef - Reference to the file input element.
 * @param {Array} fileMaterials - Array of file objects for multiple file uploads.
 * @param {function} handleFileUpload - Function to handle file upload.
 * @param {function} handleRemoveFile - Function to handle removing a file.
 *
 * @example
 * // Example usage of FileUpload component
 * <FileUpload
 *   label="Upload File"
 *   multiple={false}
 *   previewURL="/path/to/thumbnail.jpg"
 *   selectedFile={selectedFile}
 *   fileInputRef={fileInputRef}
 *   fileMaterials={fileMaterials}
 *   handleFileUpload={(e) => handleFileUpload(e)}
 *   handleRemoveFile={(id) => handleRemoveFile(id)}
 * />
 */
const FileUpload = ({
  error,
  label,
  multiple,
  isLoading,
  previewURL,
  selectedFile,
  fileMaterials,
  disabled = false,
  handleFileUpload,
  handleRemoveFile
}) => {
  const checkFileName = (item) => {
    const extension = item.name.split('.').pop().toLowerCase();
    if (extension !== 'pdf' && extension !== 'document') {
      return (
        <div className="file_uploaded_card_img">
          <img src={item.url} alt={item.name} />
        </div>
      );
    }
  };

  return (
    <StyledFileUpload disabled={disabled} error={error}>
      <StyledFormLabel>{label}</StyledFormLabel>
      <label
        htmlFor="file"
        className="fileUpload"
        style={{ height: multiple ? '105' : 'auto' }}
      >
        {isLoading ? (
          <p className="loading">Loading...</p>
        ) : !selectedFile ? (
          <React.Fragment>
            <input
              type="file"
              name="file"
              id="file-input"
              key={selectedFile}
              multiple={multiple}
              style={{ display: 'none' }}
              onChange={(e) => handleFileUpload(e)}
            />
            <div style={{ height: '100%' }}>
              <img
                alt="file"
                src={Icons.file}
                onClick={() => document.getElementById('file-input').click()}
                style={{
                  width: '100%',
                  height: '100%'
                }}
              />
            </div>
          </React.Fragment>
        ) : (
          <div className="file_uploaded">
            {/* Render multiple file cards for multiple file uploads */}
            {multiple ? (
              fileMaterials.map((item, index) => {
                return (
                  <div key={item.id} className="file_uploaded_card">
                    {checkFileName(item)}
                    <div className="file_uploaded_card_content">
                      <h6>{capitalizeFirstLetter(item.name)}</h6>
                      <p>{formatBytes(item.size)}</p>
                    </div>
                    <IconButton
                      size="large"
                      sx={{ padding: 0 }}
                      disabled={disabled}
                      onClick={() => handleRemoveFile(index)}
                    >
                      <ClearIcon />
                    </IconButton>
                  </div>
                );
              })
            ) : (
              // Render single file thumbnail for a single file upload
              <div className="file_uploaded_thumbnail">
                <img src={previewURL} alt="thumbnail" />
                <span onClick={() => handleRemoveFile()}>
                  <ClearIcon />
                </span>
              </div>
            )}
          </div>
        )}
      </label>
    </StyledFileUpload>
  );
};

export default FileUpload;
