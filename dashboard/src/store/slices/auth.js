import { createSlice, isAnyOf, PayloadAction  } from "@reduxjs/toolkit";
import { usersApi } from "../api/usersApi";
import type { RootState } from '../store';

const slice = createSlice({
    name: "auth",
    initialState: {
        id: null,
        name: null,
        email: null,
        photo: null,
        jwtToken: null,
        isAuthenticated: false,
    },
    reducers: {
        logout: (state) => {
            state.id = null;
            state.name = null;
            state.email = null;
            state.photo = null;
            state.jwtToken = null;
            state.isAuthenticated = false;
        },
    },
    extraReducers: (builder) => {
        builder.addMatcher( isAnyOf(
                usersApi.endpoints.addUser.matchFulfilled,
                usersApi.endpoints.loginUser.matchFulfilled
            ),
            (state, { payload: { id, name, email, photo, jwtToken } }) => {
                state.id = id;
                state.name = name;
                state.email = email;
                state.photo = photo;
                state.jwtToken = jwtToken;
                state.isAuthenticated = true;
            },
        )
    },
});

export const { logout } = slice.actions

export default slice.reducer

export const selectCurrentUser = (state: RootState) => state.auth
