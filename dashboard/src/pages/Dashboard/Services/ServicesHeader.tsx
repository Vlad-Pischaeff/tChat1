import React from 'react';
import { useAppSelector, useAppDispatch } from 'store/hook';
import { setServiceMenuItem, selectUI } from "store/slices/ui";
import * as ICON from 'assets/img';
import { MENU, tServiceMenu} from './Types';
import s from './ServicesHeader.module.sass';

export const ServicesHeader = () => {
    const dispatch = useAppDispatch();
    const ui = useAppSelector(selectUI);

    const NAVIGATION = [
        { name: MENU[0], render: () => <ICON.TodosIcon active={ui.services === MENU[0]} />},
        { name: MENU[1], render: () => <ICON.NotesIcon active={ui.services === MENU[1]} />},
        { name: MENU[2], render: () => <ICON.MailIcon active={ui.services === MENU[2]} />},
        { name: MENU[3], render: () => <ICON.ChatIcon active={ui.services === MENU[3]} />},
    ];

    const handlerClick = (name: tServiceMenu) => {
        dispatch(setServiceMenuItem(name));
    }

    return (
        <div className={s.header}>
            { NAVIGATION.map(element =>
                <div key={element.name} onClick={() => handlerClick(element.name)}>
                    {element.render()}
                </div>
            )}
        </div>
    );
};
