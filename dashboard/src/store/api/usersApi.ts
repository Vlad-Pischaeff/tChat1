import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithReAuth } from './baseQuery';

export const usersApi = createApi({
    reducerPath: 'usersApi',
    baseQuery: baseQueryWithReAuth,
    tagTypes: ['User'],
    endpoints: (builder) => ({
        Users: builder.query({
            query: () => ({
                url: 'users'
            }),
        }),
        getUser: builder.query({
            query: (id) => ({
                url: `users/${id}`
            }),
            providesTags: ['User'],
        }),
        updateUser: builder.mutation({
            query: (arg) => ({
                url: `users/${arg.id}`,
                method: 'PATCH',
                body: { ...arg.body }
            }),
            invalidatesTags: ['User'],
        }),
        addUser: builder.mutation({
            query: (user) => ({
                url: 'users/register',
                method: 'PUT',
                body: user
            }),
            invalidatesTags: ['User'],
        }),
        loginUser: builder.mutation({
            query: (user) => ({
                url: 'users/login',
                method: 'POST',
                body: user
            }),
        }),
        resetUserPassword: builder.mutation({
            query: (email) => ({
                url: 'users/reset',
                method: 'POST',
                body: email
            }),
        }),
        getUserIdFromToken: builder.mutation({
            query: (token) => ({
                url: 'users/userid',
                method: 'POST',
                body: token
            }),
        })
    }),
});

export const {
    useUsersQuery,
    useLazyUsersQuery,
    useGetUserQuery,
    useLazyGetUserQuery,
    useAddUserMutation,
    useUpdateUserMutation,
    useLoginUserMutation,
    useResetUserPasswordMutation,
    useGetUserIdFromTokenMutation,
} = usersApi;
