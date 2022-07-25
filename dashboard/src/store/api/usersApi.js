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
    endpoints: (builder) => ({
        Users: builder.query({
            query: () => ({
                url: 'users'
            }),
        }),
        addUser: builder.mutation({
            query: (user) => ({
                url: 'users/register',
                method: 'PUT',
                body: user
            })
        }),
        loginUser: builder.mutation({
            query: (user) => ({
                url: 'users/login',
                method: 'POST',
                body: user
            })
        })
    }),
});

export const {
    useUsersQuery,
    useLazyUsersQuery, 
    useAddUserMutation, 
    useLoginUserMutation 
} = usersApi;