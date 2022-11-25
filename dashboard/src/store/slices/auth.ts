import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import { usersApi } from "store/api/usersApi";
import type { RootState } from 'store/store';

export type IUser = {
    id: string;
    jwtToken: string;
    isAuthenticated: boolean;
}

const initialState: IUser = {
    id: '',
    jwtToken: '',
    isAuthenticated: false,
}

const slice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        logout: (state) => {
            state.id = '';
            state.jwtToken = '';
            state.isAuthenticated = false;
        },
        setCredentials: (state, { payload }) => {
            state.id = payload.id;
            state.jwtToken = payload.accessToken;
        }
    },
    extraReducers: (builder) => {
        builder.addMatcher( isAnyOf(
                usersApi.endpoints.addUser.matchFulfilled,
                usersApi.endpoints.loginUser.matchFulfilled
            ),
            (state, { payload }) => {
                state.id = payload.id;
                state.jwtToken = payload.accessToken;
                state.isAuthenticated = true;
            },
        )
    },
});

export const { logout, setCredentials } = slice.actions;

export default slice.reducer;

export const selectCurrentUser = (state: RootState) => state.auth;
