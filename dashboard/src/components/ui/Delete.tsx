import React, { HTMLAttributes } from 'react';
import s from './Delete.module.sass';

interface iProps extends HTMLAttributes<HTMLDivElement> {
    checked?: boolean,
    onClick?: () => void
}

export const Delete = ({ checked, onClick }: iProps) => {
    return (
        <div className={s.container} onClick={onClick}>
            <div className={`${checked ? s.itemDone : s.item}`}>
                &nbsp;
            </div>
        </div>
    );
};
