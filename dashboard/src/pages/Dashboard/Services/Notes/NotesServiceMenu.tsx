import React, { useState } from 'react';
import * as ICONS from 'assets/img';
import { NotesMarkServiceMenu } from './NotesMarkServiceMenu';
import { iNotes } from 'store/api/apiTypes';
import s from './Notes.module.sass';

interface iProps extends React.HTMLAttributes<HTMLDivElement> {
    note: iNotes,
    showMenu: (e: React.MouseEvent<HTMLDivElement>) => void
}

export const NotesServiceMenu = ({ note, showMenu }: iProps) => {
    const [ isVisibleMarkMenu, setVisibleMarkMenu ] = useState(false);

    const handlerEditNote = ( e: React.MouseEvent<HTMLDivElement>) => {
        e.preventDefault();
    }

    const handlerMarkNote = ( e: React.MouseEvent<HTMLDivElement>) => {
        e.preventDefault();
        setVisibleMarkMenu(true);
    }

    const handlerDeleteNote = ( e: React.MouseEvent<HTMLDivElement>) => {
        e.preventDefault();
    }

    return (
        <div className={s.ServiceMenuContainer}>
            <div className={s.ServiceMenuBG} onClick={showMenu}></div>

            { isVisibleMarkMenu
                ? <NotesMarkServiceMenu note={note} showMenu={showMenu}/>
                : <div className={s.ServiceMenuWrap} role="menu">
                    <div className={s.ServiceMenuItem} role="menuitem" onClick={handlerEditNote}>
                        <ICONS.EditIcon />
                        <p>Edit note</p>
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
            }

        </div>
    );
};
