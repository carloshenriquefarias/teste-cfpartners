import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import Snackbar from "@mui/material/Snackbar";
import Alert from '@mui/material/Alert';
import { useState } from 'react';

export default function Modal({ open, handleClose, handleDeleteUserById } : any) {
  const [openSnack, setOpenSnack] = useState(false);

  const handleClickSnack = () => {
    setOpenSnack(true);
  };

  const handleCloseSnack = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenSnack(false);
  };

  return (
    <React.Fragment>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Are you sure really delete this user?"}
        </DialogTitle>

        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Once deleted, it is not possible to recover the user. 
            So please, be certanly you wanna do that.
          </DialogContentText>
        </DialogContent>

        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleDeleteUserById} autoFocus>
            Delete
          </Button>
        </DialogActions>

        <Snackbar open={openSnack} autoHideDuration={3000} onClose={handleCloseSnack}>
          <Alert
            onClose={handleCloseSnack}
            severity="success"
            variant="filled"
            sx={{ width: '100%'}}
          >
            User deleted successfully!
          </Alert>
        </Snackbar>
      </Dialog>
    </React.Fragment>
  );
}