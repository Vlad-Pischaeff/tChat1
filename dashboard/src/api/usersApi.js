import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
let { jwtToken } = JSON.parse(localStorage.getItem('token'));

export const usersApi = createApi({
    reducerPath: 'usersApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000/api/' }),
    endpoints: (builder) => ({
        Users: builder.query({
            query: () => ({
                url: 'users',
                headers: {
                    "Authorization": `Bearer ${jwtToken}`
                }
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