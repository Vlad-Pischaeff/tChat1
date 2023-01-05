import React from 'react';
import { useEditNoteMutation } from 'store/api/notesApi';
import { iNotes } from 'store/api/apiTypes';
import s from './Notes.module.sass';

interface iProps extends React.HtmlHTMLAttributes<HTMLDetailsElement> {
    note: iNotes
}

export const NotesItem = ({note}: iProps) => {
    const [ updateNote ] = useEditNoteMutation();

    const selectType = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const body = { type: e.target.value };
        const data = { id: note._id, ...body };
        updateNote(data);
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
                    {/* <div className={s.SummaryType} onClick={selectType}></div> */}

                    <select
                        className={s.SummarySelect}
                        onChange={selectType}
                        value={note.type}
                    >
                        <option disabled>Choose color</option>
                        <option value="none" className={s.TypeImportant}>none</option>
                        <option value="orange" className={s.TypeImportant}>orange</option>
                        <option value="tomato" className={s.TypeWarning}>tomato</option>
                        <option value="darkred" className={s.TypeInfo}>dark red</option>
                        <option value="lawngreen" className={s.TypeInfo}>lawngreen</option>
                        <option value="aqua" className={s.TypeInfo}>aqua</option>
                        <option value="gray" className={s.TypeInfo}>gray</option>
                    </select>
                </div>
            </summary>
            <p>
                {note.description}
            </p>
        </details>
    );
};
