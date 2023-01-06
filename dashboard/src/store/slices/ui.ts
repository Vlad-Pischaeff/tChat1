import { createSlice, PayloadAction, isAnyOf  } from '@reduxjs/toolkit';
import { usersApi } from 'store/api/usersApi';
import { todosApi } from 'store/api/todosApi';
import { notesApi } from 'store/api/notesApi';
import { tTheme } from 'assets/style/utils';
import { iNotes } from 'store/api/apiTypes';
import { tServiceMenu } from 'pages/Dashboard/Services/Types';
import type { RootState } from 'store/store';

export enum eModal {
    todo = 'TODO',
    note = 'NOTE',
    mail = 'MAIL',
    ask = 'ASK',
    none = 'NONE'
}

export type UIType = {
    theme: tTheme;
    message: string;
    type: 'error' | 'warning' | 'info';  // TODO use for styling SnackBar
    services: tServiceMenu;
    servicesModal: eModal;
    editedNote: iNotes | null
}

const initialState: UIType = {
    theme: 'dark',
    message: '',
    type: 'info',
    services: 'Todos',
    servicesModal: eModal.none,
    editedNote: null
}

const slice = createSlice({
    name: 'ui',
    initialState,
    reducers: {
        resetMessage: (state) => {
            state.message = '';
        },
        setMessage: (state, { payload }: PayloadAction<string>) => {
            state.message = payload;
        },
        setTheme: (state, { payload }: PayloadAction<tTheme>) => {
            state.theme = payload;
        },
        setServiceMenuItem: (state, { payload }: PayloadAction<tServiceMenu>) => {
            state.services = payload;
        },
        setServicesModal: (state, { payload }: PayloadAction<eModal>) => {
            state.servicesModal = payload;
        },
        setEditedNote: (state, { payload }: PayloadAction<iNotes | null>) => {
            state.editedNote = payload;
        },
    },
    extraReducers: (builder) => {
        builder.addMatcher( isAnyOf(
                usersApi.endpoints.loginUser.matchRejected,
                usersApi.endpoints.addUser.matchRejected,
                usersApi.endpoints.resetUserPassword.matchRejected,
                usersApi.endpoints.getUserIdFromToken.matchRejected,
                todosApi.endpoints.getTodo.matchRejected,
                todosApi.endpoints.addTodo.matchRejected,
                todosApi.endpoints.deleteTodo.matchRejected,
                todosApi.endpoints.editTodo.matchRejected,
                notesApi.endpoints.deleteNote.matchRejected,
                notesApi.endpoints.editNote.matchRejected,
            ),
            (state, { payload } ) => {
                if (payload && 'data' in payload) {
                    const { message } = payload.data as UIType;
                    state.message = message;
                    state.type = 'error';
                }
            },
        )
        builder.addMatcher( isAnyOf(
                usersApi.endpoints.resetUserPassword.matchFulfilled,
                todosApi.endpoints.deleteTodo.matchFulfilled,
                notesApi.endpoints.deleteNote.matchFulfilled,
                notesApi.endpoints.editNote.matchFulfilled,
            ),
            (state, { payload } ) => {
                if (payload && 'message' in payload) {
                    const { message } = payload;
                    state.message = message;
                    state.type = 'info';
                }
            },
        )
    },
});

export const {
    resetMessage,
    setMessage,
    setTheme,
    setServiceMenuItem,
    setServicesModal,
    setEditedNote
} = slice.actions;

export default slice.reducer;

export const selectUI = (state: RootState) => state.ui;
