import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import { usersApi } from "../api/usersApi";
import type { RootState } from '../store';

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
    },
    extraReducers: (builder) => {
        builder.addMatcher( isAnyOf(
                usersApi.endpoints.addUser.matchFulfilled,
                usersApi.endpoints.loginUser.matchFulfilled
            ),
            (state, { payload: { id, jwtToken } }) => {
                state.id = id;
                state.jwtToken = jwtToken;
                state.isAuthenticated = true;
            },
        )
    },
});

export const { logout } = slice.actions;

export default slice.reducer;

export const selectCurrentUser = (state: RootState) => state.auth;
