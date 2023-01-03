import React from 'react';
import { useAppDispatch } from 'store/hook';
import { setServicesModalHidden } from "store/slices/ui";
import s from './Notes.module.sass';
import { NotesAddForm } from './NotesAddForm';

export const Notes = () => {
    const dispatch = useAppDispatch();

    const openModal = () => {
        dispatch(setServicesModalHidden(false));
    }

    return (
        <>
            <input type="button" className={s.AddItem} value="+ add note" onClick={openModal} />

            <NotesAddForm />

            <div className={s.Main}>
                <div className={s.MainPlaceholder}>
                    <p>No notes...</p>
                </div>
            </div>

            <div className={s.Footer}>
                Notes service footer
            </div>
        </>
    );
};
