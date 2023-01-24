import React from 'react';
import { useAppDispatch } from 'store/hook';
import { setServicesModal, setEditedNote, setItemServiceMenu, eModal } from "store/slices/ui";
import { useDeleteNoteMutation } from 'store/api/notesApi';
import * as ICONS from 'assets/icons';
import { iNotes } from 'store/api/apiTypes';
import s from '../Services.module.sass';

interface iProps extends React.HTMLAttributes<HTMLDivElement> {
    note: iNotes
}

export const NotesServiceMenu = ({ note }: iProps) => {
    const dispatch = useAppDispatch();
    const [ deleteNote ] = useDeleteNoteMutation();

    const handlerEditNote = ( e: React.MouseEvent<HTMLDivElement>) => {
        e.preventDefault();
        dispatch(setEditedNote(note));
        dispatch(setServicesModal(eModal.note));
        handlerHideMenu(e);    // ✅ hide menu after editing
    }

    const handlerMarkNote = ( e: React.MouseEvent<HTMLDivElement>) => {
        e.preventDefault();
        dispatch(setItemServiceMenu({ noteMark: note._id }));
    }

    const handlerDeleteNote = ( e: React.MouseEvent<HTMLDivElement>) => {
        e.preventDefault();
        deleteNote({ id: note._id });
        handlerHideMenu(e);    // ✅ hide menu after deleting
    }

    const handlerHideMenu = (e: React.MouseEvent<HTMLDivElement>) => {
        e.preventDefault();
        dispatch(setItemServiceMenu(null));
    }

    const handlerOpenEditor = () => {
        dispatch(setEditedNote(note));
        dispatch(setServicesModal(eModal.editor));
    }

    return (
        <div className={s.ServiceMenuContainer}>
            <div className={s.ServiceMenuBG} onClick={handlerHideMenu}></div>

            <div className={s.ServiceMenuWrap} role="menu">
                <div className={s.ServiceMenuItem} role="menuitem" onClick={handlerEditNote}>
                    <ICONS.EditIcon />
                    <p>Edit note</p>
                </div>

                <div className={s.ServiceMenuItem} role="menuitem" onClick={handlerOpenEditor}>
                    <ICONS.OpenEditorIcon />
                    <p>Edit note in Editor</p>
                </div>

                <div className={s.ServiceMenuItem} role="menuitem" onClick={handlerMarkNote}>
                    <ICONS.LabelIcon />
                    <p>Mark note</p>
                </div>

                <div className={s.ServiceMenuItem} role="menuitem" onClick={handlerDeleteNote}>
                    <ICONS.TrashIcon />
                    <p>Delete note</p>
                </div>
            </div>
        </div>
    );
};
