import { createSlice } from "@reduxjs/toolkit";
import { usersApi } from "../api/usersApi";

const slice = createSlice({
    name: "ui",
    initialState: {
        message: null,
    },
    reducers: {
        resetMessage: (state) => {
            state.message = null;
        },
        setMessage: (state, { payload }) => {
            state.message = payload;
        },
    },
    extraReducers: (builder) => {
        builder.addMatcher(
            usersApi.endpoints.loginUser.matchRejected,
            (state, { payload }) => {
                state.message = payload.data.message;
            },
        )
        builder.addMatcher(
            usersApi.endpoints.addUser.matchRejected,
            (state, { payload }) => {
                state.message = payload.data.message;
            },
        )
    },
});

export const { resetMessage, setMessage } = slice.actions

export default slice.reducer

export const selectUI = state => state.ui
