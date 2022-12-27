import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    full_name: ""
}

const user = createSlice({
    name: 'user',
    initialState: initialState,
    reducers: {
        setFullName: (state, actions) => {
            state.full_name = actions.payload;
        },
    },
});

export const userActions = user.actions;
export default user.reducer;