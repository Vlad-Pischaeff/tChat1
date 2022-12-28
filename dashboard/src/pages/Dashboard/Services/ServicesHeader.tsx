import React from 'react';
import * as ICON from 'assets/img';
import s from './ServicesHeader.module.sass';

export const ServicesHeader = () => {
    return (
        <div className={s.header}>
            <ICON.TodosIcon active={false} />
            <ICON.NotesIcon active={false} />
            <ICON.ChatIcon active={true} />
            <ICON.MailIcon active={false} />
        </div>
    );
};
