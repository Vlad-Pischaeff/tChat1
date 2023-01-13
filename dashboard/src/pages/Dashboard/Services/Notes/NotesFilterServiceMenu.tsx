import React from 'react';
import { useAppDispatch } from 'store/hook';
import { setItemServiceMenu, setNotesFilterColor } from "store/slices/ui";
import { COLORS } from './NotesVariables';
import * as ICONS from 'assets/img';
import s from '../Services.module.sass';

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
