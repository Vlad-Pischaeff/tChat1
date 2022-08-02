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
            invalidatesTags: ['User']
        })
    }),
});

export const {
    useUsersQuery,
    useLazyUsersQuery,
    useGetUserQuery,
    useLazyGetUserQuery, 
    useAddUserMutation, 
    useLoginUserMutation 
} = usersApi;