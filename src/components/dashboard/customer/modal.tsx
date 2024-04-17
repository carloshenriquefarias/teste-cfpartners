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

  // const handleDeleteUserById = () => {
  //   try {
  //     // handleClickSnack();

  //     setTimeout(() => {
  //       handleClickSnack()
  //     }, 2000);

  //     // Chamada assíncrona para deletar o usuário pelo ID
  //     // await deleteUserById(userId);

  //     // Se a deleção for bem-sucedida, você pode exibir outra mensagem de snack ou notificação
  //     // handleCloseSnack(); // Fechar o snack após a deleção (opcional)

  //     // Você pode adicionar aqui qualquer lógica adicional após a deleção bem-sucedida
  //   } catch (error) {
  //     // Se ocorrer algum erro durante a deleção, o código cairá aqui
  //     console.error('Erro ao deletar usuário:', error);

  //     // Aqui você pode adicionar lógica para lidar com o erro, como exibir uma mensagem de erro
  //     // handleCloseSnack(); // Fechar o snack em caso de erro (opcional)

  //     // Por exemplo, você pode usar o setError para exibir um erro no formulário ou em outro componente
  //     // setError('root', { type: 'server', message: 'Erro ao deletar usuário.' });
  //   }
    
  //   // handleCloseSnack();
  //   handleClose();
  // };

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
            Once deleted, it´s possible to recover the user delete yet, do not worry. 
            Just access the user list excluded and bring back the user again.
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