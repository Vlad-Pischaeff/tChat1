import React, { HTMLAttributes, PropsWithChildren, useEffect } from 'react';
import s from './Snack.module.sass';

interface iProps extends HTMLAttributes<HTMLDivElement> {
    message: string | undefined
}

export const Snack: React.FC<PropsWithChildren<iProps>> = ({ message }) => {
    return (
        <div className={s.container}>
            <div className={s.message}>
                {message}
            </div>
        </div>
    );
};
