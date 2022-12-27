/* eslint-disable react-hooks/exhaustive-deps */
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { IChecker, ICity } from 'interfaces';
import { useCitiesData } from 'hooks';
import { useEffect, useState } from 'react';

interface IModal {
    open: boolean;
    handleClose: () => void;
    city: ICity | null;
}

const ModalCheckers = ({open, handleClose, city}: IModal) => {

    const { addChecker } = useCitiesData();
    const [maxTemperature, setMaxTemperature] = useState<string>("0");

    useEffect(() => {
        if (city?.checkers) setMaxTemperature(city.checkers.max_temp)
    }, [])
    

    const handleChangeMaxTemperature = (e: React.ChangeEvent<HTMLInputElement>) => {
        setMaxTemperature(e.target.value)
    }

    const handleConfirm = () => {
        let checker: IChecker = {
            max_temp: maxTemperature
        }
        addChecker(checker, city);
        handleClose();
    }

    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Checkers</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Create a checker to get alerts of climate change for {city?.name}
                </DialogContentText>
                <TextField
                autoFocus
                margin="dense"
                id="name"
                label="Max temp. (°F)"
                type="number"
                fullWidth
                variant="standard"
                value={maxTemperature}
                onChange={handleChangeMaxTemperature}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={handleConfirm}>Confirm</Button>
            </DialogActions>
        </Dialog>
    );
}

export { ModalCheckers }