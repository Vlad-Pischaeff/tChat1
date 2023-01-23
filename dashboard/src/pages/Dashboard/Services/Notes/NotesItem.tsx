import React from 'react';
import parse from 'html-react-parser';
import { useAppSelector, useAppDispatch } from 'store/hook';
import { selectUI, setItemServiceMenu } from "store/slices/ui";
import { NotesServiceMenu } from './NotesServiceMenu';
import { NotesMarkServiceMenu } from './NotesMarkServiceMenu';
import { removeContentEditableAttr } from 'assets/utils';
import { iNotes } from 'store/api/apiTypes';
import * as ICONS from 'assets/img';
import s from '../Services.module.sass';

interface iProps extends React.HtmlHTMLAttributes<HTMLDetailsElement> {
    note: iNotes
}

export const NotesItem = ({ note }: iProps) => {
    const dispatch = useAppDispatch();
    const ui = useAppSelector(selectUI);

    const showMenu = (e: React.MouseEvent<HTMLDivElement>) => {
        e.preventDefault();
        dispatch(setItemServiceMenu({ noteActions: note._id }));
    }

    return (
        <details className={s.Summary}>
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

                    { ui.serviceMenu.noteActions === note._id &&
                        <NotesServiceMenu note={note} />
                    }

                    { ui.serviceMenu.noteMark === note._id &&
                        <NotesMarkServiceMenu note={note} />
                    }
                </div>
            </summary>
            <div className={s.SummaryDescription}>
                {parse(removeContentEditableAttr(note.description))}
            </div>
        </details>
    );
};
