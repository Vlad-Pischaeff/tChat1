import React from 'react';
import { useAppDispatch } from 'store/hook';
import { useEditNoteMutation } from 'store/api/notesApi';
import { setItemServiceMenu } from "store/slices/ui";
import { iNotes } from 'store/api/apiTypes';
import { COLORS } from './NotesVariables';
import * as ICONS from 'assets/img';
import s from '../Services.module.sass';

interface iProps extends React.HTMLAttributes<HTMLDivElement> {
    note: iNotes
}

export const NotesMarkServiceMenu = ({ note }: iProps) => {
    const dispatch = useAppDispatch();
    const [ updateNote ] = useEditNoteMutation();

    const handlerSelectColor = (e: React.MouseEvent<HTMLDivElement>) => {
        e.preventDefault();
        const body = { type: e.currentTarget.id };
        const data = { id: note._id, ...body };
        updateNote(data);
        handlerHideMenu(e);    // ✅ hide menu after marking
    }

    const handlerHideMenu = (e: React.MouseEvent<HTMLDivElement>) => {
        e.preventDefault();
        dispatch(setItemServiceMenu(null));
    }

    return (
        <div className={s.ServiceMenuContainer}>
            <div className={s.ServiceMenuBG} onClick={handlerHideMenu}></div>

            <div className={s.ServiceMenuWrap} role="menu">
                { COLORS.map(color =>
                    <div
                        key={color.key}
                        id={color.value}
                        className={s.ServiceMenuItem}
                        role="menuitem"
                        onClick={handlerSelectColor}
                    >
                        <ICONS.LabelIcon fill={color.value} />
                        <p>{color.key}</p>
                    </div>
                )}
            </div>
        </div>
    );
};
