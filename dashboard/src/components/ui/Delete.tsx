import React, { HTMLAttributes, PropsWithChildren } from 'react';
import s from './Delete.module.sass';

interface iProps extends HTMLAttributes<HTMLDivElement> {
    checked: boolean,
    onClick: () => void
}

export const Delete: React.FC<PropsWithChildren<iProps>> = ({ checked, onClick }) => {
    return (
        <div className={s.container} onClick={onClick}>
            <div className={`${checked ? s.itemDone : s.item}`}>
                &nbsp;
            </div>
        </div>
    );
};
