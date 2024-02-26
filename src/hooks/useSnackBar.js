import { useState } from 'react';

const useSnackbar = () => {
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState('info');

    const openSnackbar = (message, severity='info') => {
        setSnackbarMessage(message);
        setSnackbarSeverity(severity)
        setSnackbarOpen(true);
    };

    const closeSnackbar = () => {
        setSnackbarOpen(false);
    };

    return {
        snackbarOpen,
        snackbarMessage,
        snackbarSeverity,
        setSnackbarMessage,
        openSnackbar,
        closeSnackbar
    };
};

export default useSnackbar;