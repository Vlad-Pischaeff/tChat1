import { createSlice, PayloadAction  } from "@reduxjs/toolkit";
import { usersApi } from "../api/usersApi";
import type { RootState } from '../store';

export type UIType = {
    message: string;
}

const initialState: UIType = {
    message: ''
}

const slice = createSlice({
    name: "ui",
    initialState,
    reducers: {
        resetMessage: (state) => {
            state.message = '';
        },
        setMessage: (state, { payload }: PayloadAction<string>) => {
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

export const { resetMessage, setMessage } = slice.actions;

export default slice.reducer;

export const selectUI = (state: RootState) => state.ui;
