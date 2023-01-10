import React, { useState } from 'react';
import { useAppDispatch } from 'store/hook';
import { useEditNoteMutation, useDeleteNoteMutation } from 'store/api/notesApi';
import * as ICONS from 'assets/img';
import { iNotes } from 'store/api/apiTypes';
import s from './Notes.module.sass';
import { NotesServiceMenu } from './NotesServiceMenu';

interface iProps extends React.HtmlHTMLAttributes<HTMLDetailsElement> {
    note: iNotes
}

export const NotesItem = ({note}: iProps) => {
    const dispatch = useAppDispatch();
    const [ deleteNote ] = useDeleteNoteMutation();
    const [ isMenuVisible, setMenuVisible ] = useState(false);

    // const removeNote = (e: React.MouseEvent<HTMLDivElement>) => {
    //     e.preventDefault();
    //     deleteNote({ id: note._id });
    // }

    // const editNote = (e: React.MouseEvent<HTMLDivElement>) => {
    //     e.preventDefault();
    //     dispatch(setEditedNote(note));
    //     dispatch(setServicesModal(eModal.note));
    // }

    const showMenu = (e: React.MouseEvent<HTMLDivElement>) => {
        e.preventDefault();
        setMenuVisible(!isMenuVisible);
    }

    return (
        <details>
            <summary>
                <div className={s.SummaryContainer}>
                    <span className={s.SummaryTitle}
                        style={{ borderLeft: note.type !== 'none' ? `5px solid ${note.type}` : '' }}
                    >
                        {note.title}
                    </span>

                    <div className={s.SummaryMenu} onClick={showMenu}>
                        <ICONS.ServiceMenuIcon />
                    </div>

                    { isMenuVisible &&
                        <NotesServiceMenu showMenu={showMenu} note={note} />
                    }

                </div>
            </summary>
            <p>
                {note.description}
            </p>
        </details>
    );
};
