import React, { HTMLAttributes, PropsWithChildren, useEffect } from 'react';
import { useAppSelector, useAppDispatch } from 'store/hook';
import { resetMessage } from "store/slices/ui";
import { selectUI } from "store/slices/ui";
import { Snack } from './Snack';
import vars from 'assets/style/variables.module.sass';

interface iProps extends HTMLAttributes<HTMLDivElement> {
    message?: string | undefined
}

export const SnackBar: React.FC<PropsWithChildren<iProps>> = ({ message }) => {
    const dispatch = useAppDispatch();
    const ui = useAppSelector(selectUI);

    useEffect(() => {
        const timerId = setTimeout(
            () => dispatch(resetMessage()),
            +vars.DELAY
        );
        return () => { clearTimeout(timerId) };
    }, [ui.message]);

    return (message || ui.message)
        ?   <Snack message={ message ? message : ui.message } />
        :   null;
};
