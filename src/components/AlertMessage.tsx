import { useEffect, useState } from "react";
import { Alert, Snackbar } from '@mui/material';
import { useSelector } from 'react-redux';

interface IAlertMessage {
    message: string,
    status: 'success' | 'error',
}

const initialState: IAlertMessage = {
    message: "",
    status: "success"
}

const AlertMessage = () => {
    const [open, setOpen] = useState<boolean>(true);
    const [alertMessage, setAlertMessage] = useState(initialState);

    const alertMessageValue = useSelector((state: any) => state.generalParams.alertMessage);

    useEffect(() => {
        setOpen(true);
        setAlertMessage(alertMessageValue);
    }, [alertMessageValue]);

    const handleClose = () => {
        setOpen(false);
    }

    return (
        <>
            {alertMessage.message ?
                <Snackbar open={open} autoHideDuration={6000} onClose={handleClose} anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
                    <Alert icon={false} severity={alertMessage.status} onClose={handleClose}>
                        {alertMessage.message}
                    </Alert>
                </Snackbar>
            : null}
        </>
    )
}

export { AlertMessage }
