import React from 'react';
import Dialog from '@mui/material/Dialog';
import { customColors } from 'theme/pallete';
import { useMediaQuery } from 'react-responsive';

/**
 * CustomDialog Component
 *
 * @param {boolean} open - Determines whether the dialog is open or closed.
 * @param {ReactNode} children - The content to be displayed inside the dialog.
 * @param {function} setOpen - Callback function to open or close the dialog.
 * @param {number|string} maxWidth - Maximum width of the dialog (default is '400px').
 *
 * @example
 * // Example usage of CustomDialog component
 * <CustomDialog
 *   open={true}
 *   setOpen={(isOpen) => console.log('Dialog is open:', isOpen)}
 *   maxWidth={520}
 * >
 *   <DialogContent>Content goes here</DialogContent>
 * </CustomDialog>
 */
const CustomDialog = ({ open, children, setOpen, maxWidth }) => {
  const isMobile = useMediaQuery({ maxWidth: 520 });

  return (
    <Dialog
      open={open}
      onClose={() => setOpen(false)}
      PaperProps={{
        style: {
          width: '100%',
          borderRadius: '12px',
          justifyContent: 'center',
          maxWidth: maxWidth || '400px',
          background: customColors.white,
          boxShadow: '0px 1px 9px 0px rgba(0, 0, 0, 0.11)',

          // Apply margin if the screen is a mobile device
          ...(isMobile && {
            margin: '16px'
          })
        }
      }}
    >
      {children}
    </Dialog>
  );
};

export default CustomDialog;
