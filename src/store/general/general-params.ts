import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    alertMessage: '',
}

const generalParams = createSlice({
    name: 'generalParams',
    initialState: initialState,
    reducers: {
        setAlertMessage: (state, actions) => {
            state.alertMessage = actions.payload;
        }
    },
});

export const generalParamsActions = generalParams.actions;
export default generalParams.reducer;