import React from 'react';
import { MENU } from './Types';
import { Todos } from 'pages/Dashboard/Services/Todos';
import { Mail } from 'pages/Dashboard/Services/Mail';
import { Notes } from 'pages/Dashboard/Services/Notes';
import { Answers } from 'pages/Dashboard/Services/Answers';

export const BODY = [
    { name: MENU[0], render: () => <Todos /> },
    { name: MENU[1], render: () => <Notes /> },
    { name: MENU[2], render: () => <Mail /> },
    { name: MENU[3], render: () => <Answers /> },
];

interface iSymbol{
    [name: string]: () => JSX.Element
}

export const BODY_OBJ = BODY.reduce((next: iSymbol, val) => {
    next[val.name] = val.render;
    return next;
}, {});
