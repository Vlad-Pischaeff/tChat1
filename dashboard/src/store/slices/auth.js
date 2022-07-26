import { createSlice, isAnyOf, PayloadAction  } from "@reduxjs/toolkit";
import { usersApi } from "../api/usersApi";
import type { RootState } from '../store';

const slice = createSlice({
    name: "auth",
    initialState: {
        id: '',
        jwtToken: '',
        isAuthenticated: false,
    },
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

export const { logout } = slice.actions

export default slice.reducer

export const selectCurrentUser = (state: RootState) => state.auth

export type IUser = {
    id: string;
    jwtToken: string;
    isAuthenticated: boolean;
}