import { createSlice, PayloadAction  } from "@reduxjs/toolkit";
import { usersApi } from "../api/usersApi";
import type { RootState } from '../store';

const slice = createSlice({
    name: "ui",
    initialState: {
        message: '',
    },
    reducers: {
        resetMessage: (state) => {
            state.message = '';
        },
        setMessage: (state, action: PayloadAction<string>) => {
            state.message = action.payload;
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

export const selectUI = (state: RootState) => state.ui

export type UIType = {
    message: string;
}