import React from 'react';
import { useAppDispatch } from 'store/hook';
import { setEditedNote, setServicesModal, eModal } from 'store/slices/ui';
import { useEditNoteMutation, useDeleteNoteMutation } from 'store/api/notesApi';
import * as ICONS from 'assets/img';
import { iNotes } from 'store/api/apiTypes';
import s from './Notes.module.sass';

const COLORS: Record<string, string> = {
    'none': 'none',
    'orange': 'orange',
    'tomato': 'tomato',
    'dark red': 'darkred',
    'lawn green': 'lawngreen',
    'aqua': 'aqua',
    'gray': 'gray',
};

interface iProps extends React.HtmlHTMLAttributes<HTMLDetailsElement> {
    note: iNotes
}

export const NotesItem = ({note}: iProps) => {
    const dispatch = useAppDispatch();
    const [ updateNote ] = useEditNoteMutation();
    const [ deleteNote ] = useDeleteNoteMutation();

    const selectType = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const body = { type: e.target.value };
        const data = { id: note._id, ...body };
        updateNote(data);
    }

    const removeNote = (e: React.MouseEvent<HTMLDivElement>) => {
        e.preventDefault();
        deleteNote({ id: note._id });
    }

    const editNote = (e: React.MouseEvent<HTMLDivElement>) => {
        e.preventDefault();
        dispatch(setEditedNote(note));
        dispatch(setServicesModal(eModal.note));
    }

    return (
        <details>
            <summary>
                <div className={s.SummaryContainer}>
                    <span className={s.SummaryTitle}
                        style={{ borderLeft: note.type !== 'none' ? `5px solid ${COLORS[note.type]}` : '' }}
                    >
                        {note.title}
                    </span>

                    <select
                        className={s.SummarySelect}
                        onChange={selectType}
                        value={note.type}
                    >
                        <option disabled>Choose color</option>
                        { Object.entries(COLORS).map(([key, value]) =>
                                <option
                                    key={key}
                                    value={key}
                                    className={s.TypeSelect}
                                    style={{ background: value }}
                                >
                                    &nbsp;
                                </option>
                            )
                        }
                    </select>

                    <div className={s.SummaryEdit} onClick={editNote}>
                        <ICONS.EditIcon />
                    </div>

                    <div className={s.SummaryDelete} onClick={removeNote}>
                        <ICONS.TrashIcon />
                    </div>

                </div>
            </summary>
            <p>
                {note.description}
            </p>
        </details>
    );
};
