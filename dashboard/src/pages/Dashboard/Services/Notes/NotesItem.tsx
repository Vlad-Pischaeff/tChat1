import React from 'react';
import { useEditNoteMutation, useDeleteNoteMutation } from 'store/api/notesApi';
import * as UI from 'components/ui';
import { iNotes } from 'store/api/apiTypes';
import s from './Notes.module.sass';

const COLORS = [ "none", "orange", "tomato", "darkred", "lawngreen", "aqua", "gray" ] as const;
// type tColors = typeof COLORS[number];

interface iProps extends React.HtmlHTMLAttributes<HTMLDetailsElement> {
    note: iNotes
}

export const NotesItem = ({note}: iProps) => {
    const [ updateNote ] = useEditNoteMutation();
    const [ deleteNote ] = useDeleteNoteMutation();

    const selectType = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const body = { type: e.target.value };
        const data = { id: note._id, ...body };
        updateNote(data);
    }

    const removeNote = (e: React.MouseEvent<HTMLDivElement>) => {
        e.preventDefault();
        deleteNote({id: note._id });
    }

    return (
        <details>
            <summary>
                <div className={s.SummaryContainer}>
                    <span className={s.SummaryTitle}
                        style={{ borderLeft: note.type === 'none' ? '' : `5px solid ${note.type}` }}
                    >
                        {note.title}
                    </span>

                    <select
                        className={s.SummarySelect}
                        onChange={selectType}
                        value={note.type}
                    >
                        <option disabled>Choose color</option>
                        { COLORS.map(color =>
                                <option
                                    key={color}
                                    value={color}
                                    className={s.TypeSelect}
                                    style={{ background: color }}
                                >
                                    &nbsp;
                                </option>
                            )
                        }
                    </select>

                    <div className={s.SummaryDelete} onClick={removeNote}>
                        <UI.Delete />
                    </div>

                </div>
            </summary>
            <p>
                {note.description}
            </p>
        </details>
    );
};
