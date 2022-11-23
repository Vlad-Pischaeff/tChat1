import { fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { setCredentials, logout } from '../slices/auth';
import { RootState } from '../store';

const baseQuery = fetchBaseQuery({
    baseUrl: 'http://localhost:3000/api/',
    credentials: 'include',     //! will send back "httpOnly cookie" for every request
    prepareHeaders: (headers, { getState }) => {
        const token = (getState() as RootState).auth.jwtToken;
        if (token) {
            headers.set('authorization', `Bearer ${token}`);
        }
        return headers;
    },
});

export const baseQueryWithReAuth = async (args: string, api: any, extraOptions: any) => {
    let result = await baseQuery(args, api, extraOptions);
    console.log('result => ', result);

    if (result?.error?.status === 403 ||
        result?.error?.status === 401 ) {
        console.log('sending refresh token...');
        //! send refresh token to get new access token
        const refreshResult = await baseQuery('/users/refresh', api, extraOptions);
        console.log('refreshResult =>', refreshResult);

        if (refreshResult?.data) {
            const id = api.getState().auth.id;
            //! store new token
            api.dispatch(setCredentials({ ...refreshResult.data, id }));
            //! retry the original query with new access token
            result = await baseQuery(args, api, extraOptions);
        } else {
            api.dispatch(logout());
        }
    }

    return result;
};