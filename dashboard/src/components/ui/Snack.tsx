import React, { HTMLAttributes } from 'react';
import { useAppDispatch } from 'store/hook';
import { resetMessage } from "store/slices/ui";
import s from './Snack.module.sass';

interface iProps extends HTMLAttributes<HTMLDivElement> {
    message: string
}

export const Snack = ({ message }: iProps) => {
    const dispatch = useAppDispatch();

    const handleAnimationEnd = () => {
        dispatch(resetMessage());
    };

    return (
        <div className={s.container} onAnimationEnd={handleAnimationEnd}>
            <div className={s.message}>
                {message}
            </div>
        </div>
    );
};
