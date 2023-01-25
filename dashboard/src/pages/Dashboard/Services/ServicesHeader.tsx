import React from 'react';
import { useAppSelector, useAppDispatch } from 'store/hook';
import { setServiceMenuCategory, selectUIServices } from "store/slices/ui";
import * as ICON from 'assets/icons';
import { MENU, tServiceMenu} from './Types';
import s from './Services.module.sass';

export const ServicesHeader = () => {
    const dispatch = useAppDispatch();
    const services = useAppSelector(selectUIServices);

    const NAVIGATION = [
        { name: MENU[0], render: () => <ICON.TodosIcon active={services === MENU[0]} />},
        { name: MENU[1], render: () => <ICON.NotesIcon active={services === MENU[1]} />},
        { name: MENU[2], render: () => <ICON.MailIcon active={services === MENU[2]} />},
        { name: MENU[3], render: () => <ICON.ChatIcon active={services === MENU[3]} />},
    ];

    const handlerClick = (name: tServiceMenu) => {
        dispatch(setServiceMenuCategory(name));
    }

    return (
        <div className={s.header} role='navigation'>
            { NAVIGATION.map(element =>
                <div key={element.name} onClick={() => handlerClick(element.name)}>
                    {element.render()}
                </div>
            )}
        </div>
    );
};
