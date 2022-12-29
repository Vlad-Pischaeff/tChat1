import React, { useState } from 'react';
import * as ICON from 'assets/img';
import { MENU, tServiceMenu} from './Types';
import s from './ServicesHeader.module.sass';

export const ServicesHeader = () => {
    const [ select, setSelect ] = useState<tServiceMenu>('Todos');

    const NAVIGATION = [
        { name: MENU[0], render: () => <ICON.TodosIcon active={select === MENU[0]} />},
        { name: MENU[1], render: () => <ICON.NotesIcon active={select === MENU[1]} />},
        { name: MENU[2], render: () => <ICON.MailIcon active={select === MENU[2]} />},
        { name: MENU[3], render: () => <ICON.ChatIcon active={select === MENU[3]} />},
    ];

    const handlerClick = (name: tServiceMenu) => {
        setSelect(name);
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
