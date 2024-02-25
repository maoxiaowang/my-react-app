import { useState } from 'react';

const useSnackbar = () => {
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');

    const openSnackbar = (message) => {
        setSnackbarMessage(message);
        setSnackbarOpen(true);
    };

    const closeSnackbar = () => {
        setSnackbarOpen(false);
    };

    return { snackbarOpen, snackbarMessage, setSnackbarMessage, openSnackbar, closeSnackbar };
};

export default useSnackbar;