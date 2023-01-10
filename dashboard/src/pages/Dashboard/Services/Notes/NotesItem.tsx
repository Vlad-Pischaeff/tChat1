import React, { useState } from 'react';
import * as ICONS from 'assets/img';
import { iNotes } from 'store/api/apiTypes';
import s from './Notes.module.sass';
import { NotesServiceMenu } from './NotesServiceMenu';

interface iProps extends React.HtmlHTMLAttributes<HTMLDetailsElement> {
    note: iNotes
}

export const NotesItem = ({note}: iProps) => {
    const [ isMenuVisible, setMenuVisible ] = useState(false);

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
