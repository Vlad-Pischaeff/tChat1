import React, { HTMLAttributes, useEffect } from 'react';
import { useAppDispatch } from 'store/hook';
import { resetMessage } from "store/slices/ui";
import vars from 'assets/style/variables.module.sass';
import s from './Snack.module.sass';

interface iProps extends HTMLAttributes<HTMLDivElement> {
    message: string
}

export const Snack = ({ message }: iProps) => {
    const dispatch = useAppDispatch();

    useEffect(() => {
        const timerId = setTimeout(
            () => dispatch(resetMessage()),
            +vars.DELAY
        );
        return () => { clearTimeout(timerId) };
    }, [message, dispatch]);

    return (
        <div className={s.container}>
            <div className={s.message}>
                {message}
            </div>
        </div>
    );
};
