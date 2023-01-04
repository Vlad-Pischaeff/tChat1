import React from 'react';
import { iNotes } from 'store/api/apiTypes';
import s from './Notes.module.sass';

interface iProps extends React.HtmlHTMLAttributes<HTMLDetailsElement> {
    note: iNotes
}

let tType: "Any" | "Important" | "Warning" | "Info";

export const NotesItem = ({note}: iProps) => {

    const selectType = (e: React.ChangeEvent<HTMLSelectElement>) => {
        // e.preventDefault();
        console.log('select...', e.target.value)
    }

    return (
        <details key={note._id}>
            <summary>
                <div className={s.SummaryContainer}>
                    <span>{note.title}</span>
                    {/* <div className={s.SummaryType} onClick={selectType}></div> */}

                    <select className={s.SummarySelect} onChange={selectType}>
                        <option className="fa" selected disabled>
                            Choose type
                        </option>
                        <option value="Important" className={s.TypeImportant}>Important</option>
                        <option value="Warning" className={s.TypeWarning}>Warning</option>
                        <option value="Info" className={s.TypeInfo}>Info</option>
                    </select>
                </div>
            </summary>
            <p>
                {note.description}
            </p>
        </details>
    );
};
