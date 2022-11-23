import { configureStore } from '@reduxjs/toolkit';
import { usersApi } from './api/usersApi';
import authReducer from './slices/auth';
import uiReducer from './slices/ui';

export const store = configureStore({
    reducer: {
        ui: uiReducer,
        auth: authReducer,
        [usersApi.reducerPath]: usersApi.reducer,
    },
    middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware().concat(usersApi.middleware)
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;