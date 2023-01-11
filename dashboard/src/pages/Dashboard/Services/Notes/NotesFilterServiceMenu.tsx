import React from 'react';
import { useAppDispatch } from 'store/hook';
import { setItemServiceMenu, setNotesFilterColor } from "store/slices/ui";
import { COLORS } from './NotesVariables';
import * as ICONS from 'assets/img';
import s from './Notes.module.sass';

export const NotesFilterServiceMenu = () => {
    const dispatch = useAppDispatch();

    const handlerSelectColor = (e: React.MouseEvent<HTMLDivElement>) => {
        dispatch(setNotesFilterColor(e.currentTarget.id));
        handlerHideMenu();         // ✅ hide menu after filtering
    }

    const handlerHideMenu = () => {
        dispatch(setItemServiceMenu(null));
    }

    return (
        <div className={s.ServiceMenuContainer}>
            <div className={s.ServiceMenuBG} onClick={handlerHideMenu}></div>

            <div className={s.ServiceMenuFooterWrap} role="menu">
                { Object.entries(COLORS).map(([key, value]) =>
                    <div
                        key={key}
                        id={value}
                        className={s.ServiceMenuItem}
                        role="menuitem"
                        onClick={handlerSelectColor}
                    >
                        <ICONS.LabelIcon fill={value} />
                        <p>{key}</p>
                    </div>
                )}
            </div>
        </div>
    );
};
