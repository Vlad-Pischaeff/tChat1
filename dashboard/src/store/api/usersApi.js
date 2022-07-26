import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const usersApi = createApi({
    reducerPath: 'usersApi',
    baseQuery: fetchBaseQuery({ 
        baseUrl: 'http://localhost:3000/api/',
        prepareHeaders: (headers, { getState }) => {
            const token = getState().auth.jwtToken;
            if (token) {
                headers.set('authorization', `Bearer ${token}`);
            }
            return headers;
        }
    }),
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