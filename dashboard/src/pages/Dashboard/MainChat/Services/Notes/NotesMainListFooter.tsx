import React from 'react';
import { useAppSelector, useAppDispatch } from 'store/hook';
import {
    setItemServiceMenu,
    selectUIServiceMenu,
    selectUINotesFilterColor
} from 'store/slices/ui';
import { NotesFilterServiceMenu } from './NotesFilterServiceMenu';
import * as ICONS from 'assets/icons';
import s from '../Services.module.sass';

export const NotesMainListFooter = () => {
    const dispatch = useAppDispatch();
    const notesFilterColor = useAppSelector(selectUINotesFilterColor);
    const serviceMenu = useAppSelector(selectUIServiceMenu);

    const handlerShowFilterMenu = (e: React.MouseEvent<HTMLDivElement>) => {
        dispatch(setItemServiceMenu({ notesFilter: 'none' }));
    }

    return (
        <div className={s.Footer}>
            <p>Filter notes by label</p>

            <div className={s.FooterIcon} onClick={handlerShowFilterMenu}>
                <ICONS.LabelIcon fill={notesFilterColor} />
            </div>

            { !!serviceMenu.notesFilter &&
                <NotesFilterServiceMenu />
            }
        </div>
    );
};
