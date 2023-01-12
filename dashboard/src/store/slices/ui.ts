import { createSlice, PayloadAction, isAnyOf  } from '@reduxjs/toolkit';
import { usersApi } from 'store/api/usersApi';
import { todosApi } from 'store/api/todosApi';
import { notesApi } from 'store/api/notesApi';
import { answersApi } from 'store/api/answersApi';
import { tTheme } from 'assets/style/utils';
import { iNotes } from 'store/api/apiTypes';
import { tServiceMenu } from 'pages/Dashboard/Services/Types';
import type { RootState } from 'store/store';

export interface iItemServiceMenu {
    noteActions?: string | false,
    noteMark?: string | false,
    notesFilter?: string | false,
}

export enum eModal {
    todo = 'TODO',
    note = 'NOTE',
    mail = 'MAIL',
    answer = 'ANSWER',
    none = 'NONE'
}

export type UIType = {
    theme: tTheme;
    message: string;
    type: 'error' | 'warning' | 'info';  // ❎✍⌛ TODO use for styling SnackBar
    services: tServiceMenu;
    servicesModal: eModal;
    editedNote: iNotes | null;
    serviceMenu: iItemServiceMenu;
    notesFilterColor: string;
}

const initialState: UIType = {
    theme: 'dark',
    message: '',
    type: 'info',
    services: 'Todos',
    servicesModal: eModal.none,
    editedNote: null,
    serviceMenu: {
        noteActions: false,
        noteMark: false,
        notesFilter: false,
    },
    notesFilterColor: 'none',
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
        setServiceMenuCategory: (state, { payload }: PayloadAction<tServiceMenu>) => {
            state.services = payload;
        },
        setServicesModal: (state, { payload }: PayloadAction<eModal>) => {
            state.servicesModal = payload;
        },
        setEditedNote: (state, { payload }: PayloadAction<iNotes | null>) => {
            state.editedNote = payload;
        },
        setItemServiceMenu: (state, { payload }: PayloadAction<iItemServiceMenu | null>) => {
            const obj = { ...state.serviceMenu };
            // ✅ reset all properties to "false"
            (Object.keys(obj) as (keyof typeof obj)[]).forEach(key => {
                state.serviceMenu[key] = false;
            })
            // ✅ if "payload" not "null" => set property
            if (payload !== null) {
                state.serviceMenu = { ...state.serviceMenu, ...payload };
            }
        },
        setNotesFilterColor: (state, { payload }: PayloadAction<string>) => {
            state.notesFilterColor = payload;
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
                answersApi.endpoints.deleteAnswer.matchRejected,
                answersApi.endpoints.editAnswer.matchRejected,
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
                answersApi.endpoints.deleteAnswer.matchFulfilled,
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
    setServiceMenuCategory,
    setServicesModal,
    setEditedNote,
    setItemServiceMenu,
    setNotesFilterColor
} = slice.actions;

export default slice.reducer;

export const selectUI = (state: RootState) => state.ui;
