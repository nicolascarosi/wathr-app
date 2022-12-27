import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    favourites: [],
}

const cities = createSlice({
    name: 'cities',
    initialState: initialState,
    reducers: {
        setFavourites: (state, actions) => {
            state.favourites = actions.payload;
        },
    },
});

export const citiesActions = cities.actions;
export default cities.reducer;