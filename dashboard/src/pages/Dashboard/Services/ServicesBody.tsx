import React from 'react';
import { useAppSelector } from 'store/hook';
import { selectUI } from "store/slices/ui";
import { MENU } from './Types';
import { Todos } from 'pages/Dashboard/Services/Todos';
import { Mail } from 'pages/Dashboard/Services/Mail';
import { Notes } from 'pages/Dashboard/Services/Notes';
import { Answers } from 'pages/Dashboard/Services/Answers';
import s from './ServicesBody.module.sass';

export const ServicesBody = () => {
    const ui = useAppSelector(selectUI);

    const BODY = [
        { name: MENU[0], render: () => <Todos />},
        { name: MENU[1], render: () => <Notes />},
        { name: MENU[2], render: () => <Mail />},
        { name: MENU[3], render: () => <Answers />},
    ];

    return (
        <div>
            { BODY.map(element =>
                <div key={element.name}
                    className={`${s.body} ${ui.services !== element.name ? s.hidden : ''}`}>
                    {element.render()}
                </div>
            )}
        </div>
    );
};
